import TaskModel from '../models/taskModel.js'
import UserModel from '../models/userModel.js'
import MCPModel from '../models/mcpModel.js'
import TruckModel from '../models/truckModel.js'

export const getTasks = async (req, res) => {
    const { date, shift, state } = req.query
    try {
        let query = {}
        if (req.user.role == "collector") {
            query.collector = req.user._id;
        }
        else if (req.user.role == "janitor") {
            query.janitor = { $all: [[req.user._id]] }
        }

        if (date) query.date = date
        if (shift) query.shift = shift
        if (state) query.state = state

        const tasks = await TaskModel.find().sort({ date: -1 })
            .populate("taskmaster", "name role available avatar")
            .populate('collector', 'name role available avatar')
            .populate('truck', 'load cap')
            .populate('path.mcp', '-janitor')
            .populate('path.janitor', 'name role available avatar')

        res.status(200).json({ message: "Tasks fetched", result: tasks })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in getTasks process" });
        console.log(error)
    }
}

// export const getSingleTask = async (req, res) => {
//     const { id } = req.params
//     try {
//         const task = await TaskModel.findById(id)
//             .populate("taskmaster", "name role available")
//             .populate("collector", "name role available")
//             .populate("janitor", "name role available")
//             .populate("truck", "-path -nextMCP")
//             .populate("path", "-janitor")

//         if (!task) return res.status(404).json({ message: "Task not found" });
//         for (const i in task.janitor)
//             for (const k in task.janitor[i])
//                 task[i][k] = await UserModel.findById(task.janitor[i][k]).select("name role available")

//         res.status(200).json({ message: "Task fetched", result: task })
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong in getSingleTask process" });
//         console.log(error);
//     }
// };


export const createTask = async (req, res) => {
    let { collector, truck, path, date, shift } = req.body
    try {
        date = new Date(date);
        if (date.getUTCHours() != 17 || date.getUTCMinutes() != 0) return res.status(400).json({ message: "Date must be 0h:00 GMT+7" })

        collector = await UserModel.findById(collector).select("name role available task").populate("task");
        if (!collector) return res.status(404).json({ message: "Collector not found" });
        if (collector.role != "collector") return res.status(400).json({ message: "That is not a collector" });

        for (const i in collector.task) {
            if (collector.task[i].date == date && collector.task[i].shift == shift)
                return res.status(400).json({ message: "Collector is busy at that time" })
        }

        truck = await TruckModel.findById(truck)
        if (!truck) return res.status(404).json({ message: "Truck not found" });

        for (const i in path) {
            path[i].mcp = await MCPModel.findById(path[i].mcp).select("x y cap load")
            if (!path[i].mcp) return res.status(404).json({ message: `Invalid MCP path(${i}), please check again` })

            for (const k in path[i].janitor) {
                path[i].janitor[k] = await UserModel.findById(path[i].janitor[k]).select("name role available task");

                if (!path[i].janitor[k]) return res.status(404).json({ message: `Janitor for MCP ${path[i].mcp._id} not found` });
                if (path[i].janitor[k].role != "janitor") return res.status(400).json({ message: `${path[i].janitor[k].name} is not a janitor` });
                for (const l in path[i].janitor[k].task) {
                    if (path[i].janitor[k].task[l].date == date && path[i].janitor[k].task[l].shift == shift)
                        return res.status(400).json({ message: "Janitor is busy at that time" })
                }
            }
        }
        
        const newTask = await TaskModel.create({ taskmaster: req.user, collector, truck, path, date, shift })
        await UserModel.findByIdAndUpdate(collector._id, { $push: { task: newTask._id } })
        for (const i in path)
            for (const k in path[i].janitor)
                await UserModel.findByIdAndUpdate(path[i].janitor[k]._id, { $push: { task: newTask._id } })

        res.status(201).json({ message: "Task created", result: newTask })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in createTask process" });
        console.log(error);
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params
    let { date, shift } = req.body
    try {
        const task = await TaskModel.findById(id)
        if (!task) return res.status(404).json({ message: "Task not found" })
        if (task.state != "waiting") return res.status(404).json({ message: "Task is executing" })

        if (date) {
            date = new Date(date);
            if (date.getUTCHours() != 17 || date.getUTCMinutes() != 0) return res.status(400).json({ message: "Date must be 0h:00 GMT+7" })
            task.date = date
        }

        if (shift) task.shift = shift

        const newTask = await TaskModel.findByIdAndUpdate(id, task, { new: true, runValidators: true })

        res.status(200).json({ message: "Task updated", result: newTask })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in updateTask process" });
        console.log(error);
    }
};

export const checkTask = async (req, res) => {
    const { id } = req.params
    try {
        let task = await TaskModel.findById(id)
            .populate("taskmaster", "name role available")
            .populate("collector", "name role available")
            .populate("janitor", "name role available")
            .populate("truck", "-path -nextMCP")
            .populate("path", "-janitor")

        if (!task) return res.status(404).json({ message: "Task not found" })
        if (task.state == "done" || task.state == "fail") return res.status(400).json({ message: "Task is already finished" });

        // 6->9 || 9->12 || 12->15 || 15->18  diem danh duoc quyen tre nua tieng, diem danh ra duoc som nua tieng
        const checkinDeadline = task.date.getTime() + 3600000 * (task.shift * 3 + 3.5)
        const checkoutPoint = task.date.getTime() + 3600000 * (task.shift * 3 + 5.5)

        if (req.user.role == "collector") {
            if (!req.user.task.includes(task._id))
                return res.status(403).json({ message: "You are not belong to this task" })

            if (!task.checkIn) {
                if (Date.now() < checkinDeadline) {
                    if (checkinDeadline - Date.now() > 3600000)
                        return res.status(400).json({ message: "Too early to check" })
                    task.checkIn = Date.now()
                    task.state = "executing"

                    await UserModel.findByIdAndUpdate(req.user._id, { available: false })

                    await TruckModel.findByIdAndUpdate(task.truck._id, { nextMCP: task.path[1] })
                } else {
                    task.state = "fail"
                }
            }
            else if (task.checkIn && !task.checkOut) {
                if (Date.now() > checkoutPoint) {
                    task.checkOut = Date.now()
                    task.state = "done"
                }
                else return res.status(400).json({ message: "Wrong time to check" })

                await UserModel.findByIdAndUpdate(req.user._id, { available: true })
                await TruckModel.findByIdAndUpdate(task.truck._id, { driver: null, path: [], nextMCP: null })
            }
            else return res.status(400).json({ message: "Wrong time to check" })
        }
        else if (req.user.role == "janitor") {
            if (!req.user.task.includes(task._id))
                return res.status(403).json({ message: "You are not belong to this task" })

            const mcp = await MCPModel.findOne({ janitor: { $elemMatch: { $eq: req.user._id } } })

            if (Date.now() < checkinDeadline) {
                if (checkinDeadline - Date.now() > 3600000)
                    return res.status(400).json({ message: "Too early to check" })
                await UserModel.findByIdAndUpdate(req.user._id, { available: false })
            }
            else if (Date.now() > checkoutPoint) {
                if (!req.user.available)
                    await UserModel.findByIdAndUpdate(req.user._id, { available: true })
                await MCPModel.findByIdAndUpdate(mcp, { janitor: mcp.janitor.filter((jan) => jan != req.user._id) })
            }
            else
                return res.status(400).json({ message: "Too late to check" })
        }

        // thu don neu task fail
        if (task.state == "fail") {
            await TruckModel.findByIdAndUpdate(task.truck._id, { driver: null, path: [], nextMCP: null })

            let taskPath = []

            for (const i in task.janitor) {
                taskPath.push(await MCPModel.findById(task.path[Number(i) + 1]))
                for (const k in task.janitor[i]) {
                    taskPath[i].janitor = taskPath[i].janitor.filter((jan) => jan.toString() != task.janitor[i][k].toString())
                }
                await MCPModel.findByIdAndUpdate(task.path[Number(i) + 1]._id, taskPath[i])
            }
        }
        const newTask = await TaskModel.findByIdAndUpdate(id, task, { new: true, runValidators: true })

        res.status(200).json({ message: `Task checked, status: ${newTask.state}`, result: newTask })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in checkIn process" });
        console.log(error);
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        let task = await TaskModel.findById(id)
            .populate("collector", "name role available task")
            .populate("path.janitor", "name role available task")
        if (!task) return res.status(404).json({ message: "Task not found" })
        if (task.state != "waiting") return res.status(400).json({ message: "You can only delete waiting task" })

        await UserModel.findByIdAndUpdate(task.collector._id, { task: task.collector.task.filter(x => x != task._id) })

        for (const i in task.path) {
            for (const k in task.path[i].janitor) {
                await UserModel.findByIdAndUpdate(task.path[i].janitor[k]._id, { task: task.path[i].janitor[k].task.filter(x => x != task._id) })
            }
        }

        task = await TaskModel.findByIdAndRemove(id);

        res.status(200).json({ message: "Task deleted", result: task })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in deleteTask process" });
        console.log(error)
    }
}



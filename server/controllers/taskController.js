import TaskModel from '../models/taskModel.js'
import UserModel from '../models/userModel.js'
import MCPModel from '../models/mcpModel.js'
import TruckModel from '../models/truckModel.js'
import NotificationModel from '../models/notificationModel.js'
import { LocalConvenienceStoreOutlined } from '@mui/icons-material'

export const getTasks = async (req, res) => {
    const { date, shift, state } = req.query
    try {
        let query = {}
        if (req.user.role == "collector") {
            query.collector = req.user._id;
        }
        else if (req.user.role == "janitor") {
            query.path = { $elemMatch: { janitor: req.user._id } }
        }

        if (date) query.date = date
        if (shift) query.shift = shift
        if (state) query.state = state

        const tasks = await TaskModel.find(query).sort({ date: -1, shift: 1, state: -1 })
            .populate("taskmaster", "name role available")
            .populate('collector', 'name role available')
            .populate('truck', 'cap load')
            .populate('path.mcp', '-janitor')
            .populate('path.janitor', 'name role available')


        res.status(200).json({ message: "Tasks fetched", result: tasks })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in getTasks process" });
        console.log(error)
    }
}

export const createTask = async (req, res) => {
    let { collector, truck, path, date, shift } = req.body
    try {
        date = new Date(date);
        if (date.getUTCHours() != 17 || date.getUTCMinutes() != 0) return res.status(400).json({ message: "Date must be 0h:00 GMT+7" })

        collector = await UserModel.findById(collector).select("name role available task").populate("task");
        if (!collector) return res.status(404).json({ message: "Collector not found" });
        if (collector.role != "collector") return res.status(400).json({ message: "That is not a collector" });

        for (const i in collector.task) {
            if (collector.task[i].date.getTime() == date.getTime() && collector.task[i].shift == shift)
                return res.status(400).json({ message: `Collector ${collector.name} is busy at that time` })
        }

        truck = await TruckModel.findById(truck)
        if (!truck) return res.status(404).json({ message: "Truck not found" });
        const anotherTask = await TaskModel.findOne({ truck: truck._id, shift: shift, date: date })
        if (anotherTask) return res.status(400).json({ message: "Truck is busy at that time" })

        for (const i in path) {
            path[i].mcp = await MCPModel.findById(path[i].mcp).select("x y cap load")
            if (!path[i].mcp) return res.status(404).json({ message: `Invalid MCP path(${i}), please check again` })

            for (const k in path[i].janitor) {
                path[i].janitor[k] = await UserModel.findById(path[i].janitor[k]).select("name role available task").populate("task");

                if (!path[i].janitor[k]) return res.status(404).json({ message: `Janitor for MCP ${path[i].mcp._id} not found` });
                if (path[i].janitor[k].role != "janitor") return res.status(400).json({ message: `${path[i].janitor[k].name} is not a janitor` });
                for (const l in path[i].janitor[k].task) {
                    if (path[i].janitor[k].task[l].date.getTime() == date.getTime() && path[i].janitor[k].task[l].shift == shift)
                        return res.status(400).json({ message: `Janitor ${path[i].janitor[k].name} is busy at that time` })
                }
            }
        }

        const newTask = await TaskModel.create({ taskmaster: req.user, collector, truck, path, date, shift })
        await UserModel.findByIdAndUpdate(collector._id, { $push: { task: newTask._id } })
        await NotificationModel.create({
            receiver: collector._id, path: '/task',
            content: `You have a new task at ${date.toDateString()} shift ${shift}`
        })
        for (const i in path)
            for (const k in path[i].janitor) {
                await UserModel.findByIdAndUpdate(path[i].janitor[k]._id, { $push: { task: newTask._id } })
                await NotificationModel.create({
                    receiver: path[i].janitor[k]._id, path: '/task',
                    content: `You have a new task at ${date.toDateString()} shift ${shift}`
                })
            }
        res.status(201).json({ message: "Task created", result: newTask })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in createTask process" });
        console.log(error);
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params
    let { collector, truck, path, date, shift } = req.body
    try {
        const task = await TaskModel.findById(id)
            .populate("collector", "name role available task")
            .populate("path.janitor", "name role available task")
        if (!task) return res.status(404).json({ message: "Task not found" })
        if (task.state != "waiting") return res.status(404).json({ message: 'You can only update "waiting" task' })

        date = new Date(date);
        if (date.getUTCHours() != 17 || date.getUTCMinutes() != 0) return res.status(400).json({ message: "Date must be 0h:00 GMT+7" })

        collector = await UserModel.findById(collector).select("name role available task").populate("task");
        if (!collector) return res.status(404).json({ message: "Collector not found" });
        if (collector.role != "collector") return res.status(400).json({ message: "That is not a collector" });

        for (const i in collector.task) {
            if (collector.task[i]._id != task._id && collector.task[i].date.getTime() == date.getTime() && collector.task[i].shift == shift)
                return res.status(400).json({ message: `Collector ${collector.name} is busy at that time` })
        }

        truck = await TruckModel.findById(truck)
        if (!truck) return res.status(404).json({ message: "Truck not found" });
        const anotherTask = await TaskModel.findOne({ _id: { $ne: task._id }, truck: truck._id, shift: shift, date: date })
        console.log(anotherTask)
        if (anotherTask) return res.status(400).json({ message: "Truck is busy at that time" })

        for (const i in path) {
            path[i].mcp = await MCPModel.findById(path[i].mcp).select("x y cap load")
            if (!path[i].mcp) return res.status(404).json({ message: `Invalid MCP path(${i}), please check again` })

            for (const k in path[i].janitor) {
                path[i].janitor[k] = await UserModel.findById(path[i].janitor[k]).select("name role available task").populate("task");

                if (!path[i].janitor[k]) return res.status(404).json({ message: `Janitor for MCP ${path[i].mcp._id} not found` });
                if (path[i].janitor[k].role != "janitor") return res.status(400).json({ message: `${path[i].janitor[k].name} is not a janitor` });
                for (const l in path[i].janitor[k].task) {
                    if (path[i].janitor[k].task[l]._id != task._id && path[i].janitor[k].task[l].date.getTime() == date.getTime() && path[i].janitor[k].task[l].shift == shift)
                        return res.status(400).json({ message: `Janitor ${path[i].janitor[k].name} is busy at that time` })
                }
            }
        }

        const newTask = await TaskModel.findByIdAndUpdate(id, { collector, truck, path, date, shift }, { new: true, runValidators: true })
            .populate("taskmaster", "name role available")
            .populate('collector', 'name role available')
            .populate('truck', 'cap load')
            .populate('path.mcp', '-janitor')
            .populate('path.janitor', 'name role available')

        await UserModel.findByIdAndUpdate(task.collector._id, { task: task.collector.task.filter(x => x != task._id) })
        await NotificationModel.create({
            receiver: task.collector._id, path: '/task',
            content: `Your assigned task has been updated(${task._id}), go to task page for further information`
        })

        for (const i in task.path) {
            for (const k in task.path[i].janitor) {
                await UserModel.findByIdAndUpdate(task.path[i].janitor[k]._id, { task: task.path[i].janitor[k].task.filter(x => x != task._id) })
                await NotificationModel.create({
                    receiver: task.path[i].janitor[k]._id, path: '/task',
                    content: `Your assigned task has been updated(${task._id}), go to task page for further information`
                })
            }
        }

        await UserModel.findByIdAndUpdate(collector._id, { $push: { task: newTask._id } })
        await NotificationModel.create({
            receiver: collector._id, path: '/task',
            content: `You have an updated task at ${date.toDateString()} ${shift} shift, go to task page for further information`
        })

        for (const i in path)
            for (const k in path[i].janitor) {
                await UserModel.findByIdAndUpdate(path[i].janitor[k], { $push: { task: newTask._id } })
                await NotificationModel.create({
                    receiver: path[i].janitor[k]._id, path: '/task',
                    content: `You have an updated task at ${date.toDateString()} ${shift} shift, go to task page for further information`
                })
            }

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
            .populate('collector', 'name role available')
            .populate('truck', 'cap load')
            .populate('path.mcp', '-janitor')
            .populate('path.janitor', 'name role available')

        if (!task) return res.status(404).json({ message: "Task not found" })
        if (task.state == "done" || task.state == "fail") return res.status(400).json({ message: "Task is already finished" });

        // 6->9 || 9->12 || 12->15 || 15->18  diem danh duoc quyen tre nua tieng, diem danh ra duoc som nua tieng
        // const checkinDeadline = task.date.getTime() + 3600000 * (task.shift * 3 + 3.5)
        // const checkoutPoint = task.date.getTime() + 3600000 * (task.shift * 3 + 5.5)

        const checkinDeadline = Date.now() - 360000
        const checkoutPoint = Date.now() - 360000

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
                    await TruckModel.findByIdAndUpdate(task.truck._id,
                        { driver: req.user._id, path: task.path.map(x => x.mcp._id), nextMCP: task.path.length > 0 ? task.path[0].mcp._id : null })
                } else {
                    task.state = "fail"
                }
            }
            else if (task.checkIn && !task.checkOut) {
                if (Date.now() < checkoutPoint) {
                    return res.status(400).json({ message: "Too early to check" })
                }
                else {
                    task.checkOut = Date.now()
                    task.state = "done"
                }
                const backOfficer = await UserModel.find({ role: "backofficer" })
                for (const i in backOfficer) {
                    await NotificationModel.create({
                        receiver: backOfficer[i]._id, path: '/task',
                        content: `Collector ${req.user.name} just checked in task ${task._id}, task status: ${task.state}`
                    })
                }
                await UserModel.findByIdAndUpdate(req.user._id, { available: true })
                await TruckModel.findByIdAndUpdate(task.truck._id, { driver: null, path: [], nextMCP: null })
            }
            else return res.status(400).json({ message: "Wrong time to check" })
            const backOfficer = await UserModel.find({ role: "backofficer" })
            for (const i in backOfficer) {
                await NotificationModel.create({
                    receiver: backOfficer[i]._id, path: '/task',
                    content: `Collector ${req.user.name} just checked in task ${task._id}, task status: ${task.state}`
                })
            }

            await TaskModel.findByIdAndUpdate(id, task)
            // rut toan bo janitor ve neu task fail
            if (task.state == 'fail')
                for (const i in task.path) {
                    let mcpJan = task.path[i].janitor
                    for (const k in task.path[i].janitor) {
                        await UserModel.findByIdAndUpdate(task.path[i].janitor[k]._id, { available: true })
                        mcpJan = mcpJan.filter((jan) => jan._id != task.path[i].janitor[k]._id)
                        await NotificationModel.create({
                            receiver: task.path[i].janitor[k]._id, path: '/task',
                            content: `Your assigned task(${task._id}) has been failed, return to main headquarter`
                        })
                    }
                    await MCPModel.findByIdAndUpdate(task.path[i].mcp._id, { janitor: mcpJan })
                }

            res.status(200).json({ message: `Task checked, status: ${task.state}`, result: task })

        }
        else if (req.user.role == "janitor") {
            if (!req.user.task.includes(task._id))
                return res.status(403).json({ message: "You are not belong to this task" })

            const path = (task.path.find((x) => x.janitor.map(y => y._id.toString())
                .includes(req.user._id.toString())))

            const mcp = await MCPModel.findById(path.mcp._id)

            if (Date.now() < checkinDeadline) {
                if (checkinDeadline - Date.now() > 3600000)
                    return res.status(400).json({ message: "Too early to check" })
                if (path.timestamp != null) {
                    return res.status(400).json({ message: "The MCP's already collected. Checkin failed" })
                }
                await UserModel.findByIdAndUpdate(req.user._id, { available: false })
                await MCPModel.findByIdAndUpdate(mcp._id, { $push: { janitor: req.user._id } })
                const backOfficer = await UserModel.find({ role: "backofficer" })
                for (const i in backOfficer) {
                    await NotificationModel.create({
                        receiver: backOfficer[i]._id, path: '/task',
                        content: `Janitor ${req.user.name} just checked in task ${task._id}, task status: ${task.state}`
                    })
                }
                return res.status(200).json({ message: "Checkin successed", result: task })
            }
            else if (Date.now() > checkoutPoint) {
                if (path.timestamp == null) {
                    return res.status(400).json({ message: "The MCP is not collected yet. Checkout failed" })
                }

                await UserModel.findByIdAndUpdate(req.user._id, { available: true })
                await MCPModel.findByIdAndUpdate(mcp._id, { janitor: mcp.janitor.filter((jan) => jan.toString() != req.user._id) })
                const backOfficer = await UserModel.find({ role: "backofficer" })
                for (const i in backOfficer) {
                    await NotificationModel.create({
                        receiver: backOfficer[i]._id, path: '/task',
                        content: `Janitor ${req.user.name} just checked in task ${task._id}`
                    })
                }
                return res.status(200).json({ message: "Checkout successed", result: task })
            }
            else
                return res.status(400).json({ message: "Wrong time to check" })
        }
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
        await NotificationModel.create({
            receiver: task.collector._id, path: '/task',
            content: `Your assigned task ${task._id} has been deleted by admin`
        })

        for (const i in task.path) {
            let mcpJan = task.path[i].janitor
            for (const k in task.path[i].janitor) {
                await UserModel.findByIdAndUpdate(task.path[i].janitor[k]._id, { available: true, task: task.path[i].janitor[k].task.filter(x => x != task._id) })
                mcpJan = mcpJan.filter((jan) => jan._id != task.path[i].janitor[k]._id)
                await NotificationModel.create({
                    receiver: task.path[i].janitor[k]._id, path: '/task',
                    content: `Your assigned task ${task._id} has been deleted by admin`
                })
            }
            await MCPModel.findByIdAndUpdate(task.path[i].mcp, { janitor: mcpJan })
        }

        task = await TaskModel.findByIdAndRemove(id);

        res.status(200).json({ message: "Task deleted", result: task })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in deleteTask process" });
        console.log(error)
    }
}





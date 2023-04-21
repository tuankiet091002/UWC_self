// Chỉ dùng để đọc hiểu, hàm được lưu ở mongo, muốn thay đổi vui lòng liên hệ người viết


/////////////////////////////////// Task State Manager/////////////////////////////////
exports = async function () {
    const mongodb = context.services.get("Cluster");
    const db = mongodb.db("test");
    var collection = db.collection("tasks");
    var userCollection = db.collection("users");
    var mcpCollection = db.collection("mcps");

    try {
        const taskList = await collection.find().toArray();
        for (const i in taskList) {
            let task = taskList[i];

            const checkinDeadline = new Date(task.date.getTime() + 3600000 * (task.shift * 3 + 3.5));

            if (!task.checkIn && Date.now() > checkinDeadline.getTime()) {
                task.state = "fail"
                // thu don neu task fail
                for (const k in task.path) {
                    let mcpJan = task.path[k].janitor
                    for (const l in task.path[k].janitor) {
                        await userCollection.updateOne({ _id: task.path[k].janitor[l] }, { $set: { available: true } })
                        mcpJan = mcpJan.filter((jan) => jan.toString() != task.path[k].janitor[l])
                    }
                    await mcpCollection.updateOne({ _id: task.path[k].mcp }, { $set: { janitor: mcpJan } })
                }
                collection.updateOne({ _id: task._id }, { $set: task });
            }
        }
    } catch (error) {
        console.log(error)
    }
};

//////////////////////////////////// MCP Load Manager//////////////////////////////////
exports = async function () {
    const mongodb = context.services.get("Cluster");
    const db = mongodb.db("test");
    var mcpCollection = db.collection("mcps");
    var userCollection = db.collection("users");
    try {
        const mcpList = await mcpCollection.find().toArray();

        for (const i in mcpList) {
            const mcp = mcpList[i];
            let speed = 0;
            for (const k in mcp.janitor) {
                const janitor = await userCollection.findOne({ _id: mcp.janitor[k] });
                if (!janitor.available) speed++;
            }
            if (mcp.load < mcp.cap) {
                mcp.load = Math.min(mcp.load + 1 / 6 * speed, mcp.cap)
                mcpCollection.updateOne({ _id: mcp._id }, { $set: mcp });
            }
        }
    } catch (error) {
        console.log(error)
    }
};

/////////////////////////////Truck Location Manager/////////////////////////////////////////////
const SPEED_MODIFIER = 1;

function dToInt(a) {
    // type nội bộ mongo => type float của js
    return parseFloat(a.toString());
}

exports = async function () {
    const mongodb = context.services.get("Cluster");
    const db = mongodb.db("test")
    var truckCollection = db.collection("trucks");
    var mcpCollection = db.collection("mcps");
    var taskCollection = db.collection('tasks')
    var userCollection = db.collection("users");
    try {
        const truckList = await truckCollection.find().toArray();

        for (const i in truckList) {
            const truck = truckList[i];
            if (truck.nextMCP != null) {
                const index = (truck.path.indexOf(truck.nextMCP))
                console.log('index la', index)

                const driver = await userCollection.findOne({ _id: truck.driver })
                const task = await taskCollection.findOne({ _id: { $in: driver.task }, state: "executing" })

                const nextMCP = await mcpCollection.findOne({ _id: truck.nextMCP })

                const distance = Math.sqrt((nextMCP.x - truck.x) * (nextMCP.x - truck.x) + (nextMCP.y - truck.y) * (nextMCP.y - truck.y));
                const cos = (nextMCP.x - truck.x) / distance;
                const sin = (nextMCP.y - truck.y) / distance;

                if (distance <= SPEED_MODIFIER) {
                    // truong hop chua ve noi xuat phat
                    if (index != - 1) {
                        truck.x = nextMCP.x;
                        truck.y = nextMCP.y;
                        if (index != truck.path.length - 1)
                            truck.nextMCP = truck.path[index + 1];
                        else truck.nextMCP = 0
                        // thay doi load + xoa truck khoi danh sach 
                        let change = 0;

                        if (nextMCP.load + truck.load < truck.cap) {
                            change = nextMCP.load;
                            truck.load = dToInt(truck.load) + change;
                            nextMCP.load = 0;
                        } else {
                            change = truck.cap - truck.load
                            truck.load = truck.cap;
                            nextMCP.load = dToInt(nextMCP.load) - truck.cap + truck.load;
                        }

                        if (index != -1)
                            await taskCollection.updateOne({ _id: task._id }, {
                                $set:
                                {
                                    path: task.path.map((x, i) => i === index ?
                                        { ...task.path[i], timestamp: new Date(), amount: change } :
                                        task.path[i])
                                }
                            })

                    } else {
                        truck.path = [];
                        truck.load = 0;
                        truck.x = 0;
                        truck.y = 0;
                        truck.nextMCP = null;
                    }
                } else {
                    truck.x = dToInt(truck.x) + cos * SPEED_MODIFIER;
                    truck.y = dToInt(truck.y) + sin * SPEED_MODIFIER;
                }

                await truckCollection.updateOne({ _id: truck._id }, { $set: truck });
                await mcpCollection.updateOne({ _id: nextMCP._id }, { $set: nextMCP });
            }
        }
    } catch (error) {
        console.log(error)
    }
};
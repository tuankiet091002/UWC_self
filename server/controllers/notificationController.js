import NotificationModel from "../models/notificationModel.js";
import UserModel from "../models/userModel.js";

export const getNotifications = async (req, res) => {
    const { user } = req.query
    try {
        const receiver = await UserModel.findById(user).select("-password");
        if (!receiver) return res.status(404).json({ message: "User not found" });

        const notifications = await NotificationModel.find({ receiver: user }).sort({ read: 1, createdAt: -1 });

        res.status(201).json({ mesage: "Notications fetched", result: notifications });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in getNotifications process" });
        console.log(error);
    }
}

export const readAllNotifications = async (req, res) => {
    const { user } = req.query
    try {
        const receiver = await UserModel.findById(user).select("-password");
        if (!receiver) return res.status(404).json({ message: "User not found" });

        let notifications = await NotificationModel.find({ receiver: user });

        for (const i in notifications) {
            notifications[i] = await NotificationModel.findByIdAndUpdate(notifications[i]._id, { read: true }, { new: true, runValidators: true });
        }

        res.status(201).json({ mesage: "Notications fetched", result: notifications });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in readAllNotifications process" });
        console.log(error);
    }
}
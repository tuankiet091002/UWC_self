import ChatModel from '../models/chatModel.js'
import MessageModel from '../models/messageModel.js';

export const getMessages = async (req, res) => {
    const { id } = req.params
    try {
        const chat = await ChatModel.findById(id).sort({ createdAt: -1 })
            .populate("users", "name role available avatar")
            .populate("groupAdmin", "name role available avatar")
            .populate("latestMessage")
            .sort({ updateAt: -1 });
        if (!chat) return res.status(404).json({ message: "Chat not found" })
        if (!chat.users.map(x => x._id.toString()).includes(req.user._id.toString())) return res.status(403).json("You are not in this group");

        const messages = await MessageModel.find({ chat }).populate("sender", "name role available avatar")

        res.status(200).json({ message: "Messages fetched", result: messages })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in getMessages process" });
        console.log(error)
    }
}

export const sendMessage = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        let chat = await ChatModel.findById(id);
        if (!chat) return res.status(404).json({ message: "Chat not found" })
        if (!chat.users.map(x => x._id.toString()).includes(req.user._id.toString())) return res.status(403).json("You are not in this group");

        let message = await MessageModel.create({ sender: req.user._id, content, chat })
        await message.populate("sender", "name role available avatar")

        chat = await ChatModel.findByIdAndUpdate(chat._id, { latestMessage: message }, { new: true, runValidators: true })

        res.status(200).json({ message: "Message sent", result: message });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in sendMessage process" });
        console.log(error)
    }
}
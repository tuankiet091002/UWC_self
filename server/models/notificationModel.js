import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: String,
    path: {
        type: String, 
        default: '/',
        enum: ['/', '/task', '/mcp', '/map']
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("Notification", notificationSchema)
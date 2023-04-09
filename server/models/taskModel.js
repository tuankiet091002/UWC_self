import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);

const taskSchema = new mongoose.Schema({
    taskmaster: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collector: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    truck: {
        type: Number,
        ref: 'Truck',
        default: null,
    },
    path: [{
        mcp: { type: Number, ref: 'MCP', required: true },
        janitor: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
        timestamp: { type: Date, default: null },
        amount: { type: mongoose.Types.Decimal128, default: 0 },
    }],
    date: { type: Date, required: true, default: new Date() },
    shift: { type: Number, required: true, enum: [1, 2, 3, 4] },
    state: {
        type: String,
        enum: ["waiting", "executing", "done", "fail"],
        required: true,
        default: "waiting"
    },
    checkIn: { type: Date, default: null },
    checkOut: { type: Date, default: null }
}, { _id: false, versionKey: false })



taskSchema.plugin(AutoIncrement, { id: "task_seq", inc_field: '_id' });

export default mongoose.model("Task", taskSchema)
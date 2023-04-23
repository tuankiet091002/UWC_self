import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);

const truckSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    x: { type: mongoose.Types.Decimal128, required: true, default: () => (Math.random() * (10.881580 - 10.880000) + 10.881580).toFixed(6) },
    y: { type: mongoose.Types.Decimal128, required: true, default: () => (Math.random() * (106.805000 - 106.804887) + 106.804887).toFixed(6)},
    // duong di
    path: {
        type: [{ 
            type: Number,
            ref: 'MCP',
            required: true,    
        }],
        default: null
    },
    // dia diem ke tiep, nextMCP la index cua path
    nextMCP: { type: Number, ref: 'MCP', default: null },
    load: { type: mongoose.Types.Decimal128, default: 0},
    cap: { type: Number, required: true}
}, {_id: false, versionKey: false})

truckSchema.plugin(AutoIncrement, {id: "truck_seq", inc_field: '_id'});

export default mongoose.model("Truck", truckSchema)
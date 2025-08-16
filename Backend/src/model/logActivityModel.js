import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const logActivitySchema = new Schema({
    adminId: { 
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    type: {
        type: String,
        required: true,
        enum: ['error', 'info', 'warning', 'success'],
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const LogActivity = mongoose.model('LogActivity', logActivitySchema);
export default LogActivity;
import mongoose from 'mongoose';   
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        rel: 'Admin',
        required: true
    },
    loginTime: {
        type: Date,
        default: Date.now
    },
    logoutTime: { 
        type: Date,
        default: null
    },
    ipAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;
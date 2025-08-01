import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['super-admin', 'admin', 'operator'],
    default: 'operator',
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Only admins/super-admins can create other admins
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;

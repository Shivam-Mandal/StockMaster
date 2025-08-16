import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  isFirstLogin: {
    type: Boolean,
    default: true, // Indicates if it's the first login for the user
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
    default: 'admin',
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
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
  todayLoginCount: {
    type: Number,
    default: 0, // Count of logins today
  },
  lastLogin: {
    type: Date,
    default: null, 
  },
  todayLoginDuration: {
    type: Number,
    default: 0, 
  },
  totalLoginDuration: {
    type: Number,
    default: 0, 
  },
  lastPasswordChange: {
    type: Date,
    default: null, 
  },
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    regNo: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ['student', 'vendor', 'admin'],
      default: 'student'
    },
    outletAssigned: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

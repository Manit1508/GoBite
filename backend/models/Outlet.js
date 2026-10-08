const mongoose = require('mongoose');

const outletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    icon: {
      type: String,
      default: '🍔'
    },
    location: {
      type: String,
      default: 'Main Campus Food Court'
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    avgPrepTimeMinutes: {
      type: Number,
      default: 8
    },
    status: {
      type: String,
      enum: ['Normal', 'High Traffic', 'Closed'],
      default: 'Normal'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Outlet', outletSchema);

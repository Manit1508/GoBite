const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem'
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    qty: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderToken: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    studentName: {
      type: String,
      default: 'Campus Student'
    },
    regNo: {
      type: String,
      default: '24BBS0000'
    },
    outlet: {
      type: String,
      required: true
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'paid'
    },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'upi', 'cash'],
      default: 'razorpay'
    },
    razorpayOrderId: {
      type: String,
      default: null
    },
    razorpayPaymentId: {
      type: String,
      default: null
    },
    orderStatus: {
      type: String,
      enum: ['incoming', 'preparing', 'ready', 'completed', 'cancelled'],
      default: 'incoming'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);

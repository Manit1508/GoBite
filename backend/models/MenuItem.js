const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    outletName: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    veg: {
      type: Boolean,
      default: true
    },
    inStock: {
      type: Boolean,
      default: true
    },
    desc: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: 'General'
    },
    img: {
      type: String,
      default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);

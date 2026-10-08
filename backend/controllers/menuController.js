const MenuItem = require('../models/MenuItem');
const { isDbConnected } = require('../config/db');
const { initialMenuItems } = require('../data/seedData');

// In-memory cache for prototype when Atlas is not yet connected
let memoryMenuItems = initialMenuItems.map((item, index) => ({
  _id: `item_${index + 1}`,
  id: index + 1,
  ...item
}));

// @desc    Get menu items (with optional filters: outlet, veg, category)
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res) => {
  const { outlet, veg, category } = req.query;

  try {
    if (isDbConnected()) {
      const filter = {};
      if (outlet) filter.outletName = new RegExp(`^${outlet}$`, 'i');
      if (veg !== undefined) filter.veg = veg === 'true';
      if (category) filter.category = new RegExp(`^${category}$`, 'i');

      const items = await MenuItem.find(filter).sort({ name: 1 });
      return res.status(200).json({ success: true, count: items.length, source: 'atlas', data: items });
    }

    let items = [...memoryMenuItems];
    if (outlet) {
      items = items.filter(i => i.outletName.toLowerCase() === outlet.toLowerCase());
    }
    if (veg !== undefined) {
      const isVeg = veg === 'true';
      items = items.filter(i => i.veg === isVeg);
    }
    if (category) {
      items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }

    return res.status(200).json({ success: true, count: items.length, source: 'memory-prototype', data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single menu item by ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbConnected()) {
      const item = await MenuItem.findById(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      return res.status(200).json({ success: true, data: item });
    }

    const item = memoryMenuItems.find(i => String(i.id) === String(id) || String(i._id) === String(id));
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle item stock status (Vendor functionality)
// @route   PATCH /api/menu/:id/toggle-stock
// @access  Vendor/Admin
const toggleItemStock = async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbConnected()) {
      const item = await MenuItem.findById(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      item.inStock = !item.inStock;
      await item.save();
      return res.status(200).json({ success: true, data: item });
    }

    const item = memoryMenuItems.find(i => String(i.id) === String(id) || String(i._id) === String(id));
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    item.inStock = !item.inStock;
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  toggleItemStock
};

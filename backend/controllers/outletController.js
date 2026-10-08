const Outlet = require('../models/Outlet');
const { isDbConnected } = require('../config/db');
const { initialOutlets } = require('../data/seedData');

// In-memory cache for prototype when Atlas is not yet connected
let memoryOutlets = JSON.parse(JSON.stringify(initialOutlets));

// @desc    Get all campus food outlets
// @route   GET /api/outlets
// @access  Public
const getOutlets = async (req, res) => {
  try {
    if (isDbConnected()) {
      const outlets = await Outlet.find({}).sort({ name: 1 });
      return res.status(200).json({ success: true, count: outlets.length, source: 'atlas', data: outlets });
    }
    return res.status(200).json({ success: true, count: memoryOutlets.length, source: 'memory-prototype', data: memoryOutlets });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get outlet by code or ID
// @route   GET /api/outlets/:identifier
// @access  Public
const getOutletByIdentifier = async (req, res) => {
  const { identifier } = req.params;
  try {
    if (isDbConnected()) {
      const query = identifier.match(/^[0-9a-fA-F]{24}$/)
        ? { _id: identifier }
        : { code: identifier.toLowerCase() };
      const outlet = await Outlet.findOne(query);
      if (!outlet) {
        return res.status(404).json({ success: false, message: 'Outlet not found' });
      }
      return res.status(200).json({ success: true, data: outlet });
    }

    const outlet = memoryOutlets.find(
      o => o.code === identifier.toLowerCase() || o.name.toLowerCase() === identifier.toLowerCase()
    );
    if (!outlet) {
      return res.status(404).json({ success: false, message: 'Outlet not found' });
    }
    return res.status(200).json({ success: true, data: outlet });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update outlet status (Normal, High Traffic, Closed)
// @route   PATCH /api/outlets/:identifier/status
// @access  Admin/Vendor
const updateOutletStatus = async (req, res) => {
  const { identifier } = req.params;
  const { status, avgPrepTimeMinutes } = req.body;

  try {
    if (isDbConnected()) {
      const query = identifier.match(/^[0-9a-fA-F]{24}$/)
        ? { _id: identifier }
        : { code: identifier.toLowerCase() };

      const updateData = {};
      if (status) updateData.status = status;
      if (avgPrepTimeMinutes !== undefined) updateData.avgPrepTimeMinutes = avgPrepTimeMinutes;

      const updated = await Outlet.findOneAndUpdate(query, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Outlet not found' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const index = memoryOutlets.findIndex(
      o => o.code === identifier.toLowerCase() || o.name.toLowerCase() === identifier.toLowerCase()
    );
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Outlet not found' });
    }

    if (status) memoryOutlets[index].status = status;
    if (avgPrepTimeMinutes !== undefined) memoryOutlets[index].avgPrepTimeMinutes = avgPrepTimeMinutes;

    return res.status(200).json({ success: true, data: memoryOutlets[index] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getOutlets,
  getOutletByIdentifier,
  updateOutletStatus
};

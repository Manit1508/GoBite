const Order = require('../models/Order');
const Outlet = require('../models/Outlet');
const { isDbConnected } = require('../config/db');
const { initialOutlets, initialOrders } = require('../data/seedData');

// @desc    Get campus-wide admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Admin
const getAdminStats = async (req, res) => {
  try {
    let ordersList = [];
    let outletsList = [];

    if (isDbConnected()) {
      ordersList = await Order.find({});
      outletsList = await Outlet.find({});
    } else {
      ordersList = initialOrders;
      outletsList = initialOutlets;
    }

    const totalOrdersCount = ordersList.length + 480; // Baseline mock + dynamic orders
    const dynamicRevenue = ordersList.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const grossVolume = 55000 + dynamicRevenue;
    const activeOutletsCount = outletsList.filter(o => o.isOpen !== false).length;

    // Per outlet metrics breakdown
    const outletOverview = outletsList.map(outlet => {
      const outletOrders = ordersList.filter(o => o.outlet.toLowerCase() === outlet.name.toLowerCase());
      return {
        name: outlet.name,
        ordersCount: outletOrders.length + (outlet.name.includes('Food Court') ? 210 : 80),
        avgPrepTimeMinutes: outlet.avgPrepTimeMinutes || 7,
        status: outlet.status || 'Normal',
        isOpen: outlet.isOpen
      };
    });

    const auditLogs = [
      {
        type: 'RESOLVED',
        badgeColor: 'success',
        title: 'Razorpay payment gateway synced',
        time: '12 mins ago',
        meta: 'Latency: 38ms'
      },
      {
        type: 'MONITOR',
        badgeColor: 'warning',
        title: 'Peak orders detected on KC Food Court',
        time: '25 mins ago',
        meta: '12 queue tokens in prep'
      },
      {
        type: 'SYSTEM',
        badgeColor: 'success',
        title: isDbConnected() ? 'MongoDB Atlas cluster connected' : 'Database ready (Atlas URI standby)',
        time: 'Just now',
        meta: isDbConnected() ? 'Cluster status: Healthy' : 'Atlas Free Tier standby'
      }
    ];

    return res.status(200).json({
      success: true,
      data: {
        totalOrdersToday: totalOrdersCount,
        grossVolumeINR: grossVolume,
        activeOutlets: `${activeOutletsCount} / ${outletsList.length}`,
        systemStatus: 'Healthy',
        outletOverview,
        auditLogs
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAdminStats
};

const Order = require('../models/Order');
const { isDbConnected } = require('../config/db');
const { initialOrders } = require('../data/seedData');

// In-memory cache for prototype orders
let memoryOrders = JSON.parse(JSON.stringify(initialOrders));

const generateToken = () => {
  return `GB-${Math.floor(1000 + Math.random() * 9000)}`;
};

// @desc    Create a new order (after student checkout / Razorpay)
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const {
      studentName = 'Campus Student',
      regNo = '24BBS0000',
      outlet,
      items,
      totalAmount,
      paymentMethod = 'razorpay',
      razorpayPaymentId = null
    } = req.body;

    if (!outlet || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Outlet and at least one item are required to create an order.'
      });
    }

    const calculatedTotal = totalAmount !== undefined
      ? Number(totalAmount)
      : items.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty || 1)), 0);

    const token = generateToken();

    const orderData = {
      orderToken: token,
      studentName,
      regNo,
      outlet,
      items: items.map(i => ({
        name: i.name,
        price: Number(i.price),
        qty: Number(i.qty || 1)
      })),
      totalAmount: calculatedTotal,
      paymentStatus: 'paid',
      paymentMethod,
      razorpayPaymentId: razorpayPaymentId || `pay_${Date.now()}`,
      orderStatus: 'incoming',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isDbConnected()) {
      const newOrder = await Order.create(orderData);
      return res.status(201).json({
        success: true,
        source: 'atlas',
        message: 'Order created successfully!',
        data: newOrder
      });
    }

    // In-memory fallback
    const simulatedDoc = { _id: `ord_${Date.now()}`, ...orderData };
    memoryOrders.unshift(simulatedDoc);

    return res.status(201).json({
      success: true,
      source: 'memory-prototype',
      message: 'Order placed in prototype mode!',
      data: simulatedDoc
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (optional filtering by outlet, status, student regNo)
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res) => {
  try {
    const { outlet, status, regNo } = req.query;

    if (isDbConnected()) {
      const filter = {};
      if (outlet) filter.outlet = new RegExp(`^${outlet}$`, 'i');
      if (status) filter.orderStatus = status;
      if (regNo) filter.regNo = new RegExp(`^${regNo}$`, 'i');

      const orders = await Order.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: orders.length, source: 'atlas', data: orders });
    }

    let orders = [...memoryOrders];
    if (outlet) {
      orders = orders.filter(o => o.outlet.toLowerCase() === outlet.toLowerCase());
    }
    if (status) {
      orders = orders.filter(o => o.orderStatus === status);
    }
    if (regNo) {
      orders = orders.filter(o => o.regNo.toLowerCase() === regNo.toLowerCase());
    }

    return res.status(200).json({ success: true, count: orders.length, source: 'memory-prototype', data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order details by order token or ID
// @route   GET /api/orders/:identifier
// @access  Public
const getOrderByIdentifier = async (req, res) => {
  const { identifier } = req.params;

  try {
    if (isDbConnected()) {
      const query = identifier.startsWith('GB-')
        ? { orderToken: identifier.toUpperCase() }
        : { _id: identifier };

      const order = await Order.findOne(query);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      return res.status(200).json({ success: true, data: order });
    }

    const order = memoryOrders.find(
      o => o.orderToken.toUpperCase() === identifier.toUpperCase() || String(o._id) === identifier
    );
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (incoming -> preparing -> ready -> completed)
// @route   PATCH /api/orders/:identifier/status
// @access  Vendor/Admin
const updateOrderStatus = async (req, res) => {
  const { identifier } = req.params;
  const { status } = req.body;

  const validStatuses = ['incoming', 'preparing', 'ready', 'completed', 'cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  try {
    if (isDbConnected()) {
      const query = identifier.startsWith('GB-')
        ? { orderToken: identifier.toUpperCase() }
        : { _id: identifier };

      const updated = await Order.findOneAndUpdate(
        query,
        { orderStatus: status, updatedAt: new Date() },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const index = memoryOrders.findIndex(
      o => o.orderToken.toUpperCase() === identifier.toUpperCase() || String(o._id) === identifier
    );
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    memoryOrders[index].orderStatus = status;
    memoryOrders[index].updatedAt = new Date();
    return res.status(200).json({ success: true, data: memoryOrders[index] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderByIdentifier,
  updateOrderStatus
};

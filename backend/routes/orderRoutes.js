const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderByIdentifier,
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:identifier', getOrderByIdentifier);
router.patch('/:identifier/status', updateOrderStatus);

module.exports = router;

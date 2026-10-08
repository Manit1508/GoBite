const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getMenuItemById,
  toggleItemStock
} = require('../controllers/menuController');

router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);
router.patch('/:id/toggle-stock', toggleItemStock);

module.exports = router;

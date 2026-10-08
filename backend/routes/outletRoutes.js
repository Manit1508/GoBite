const express = require('express');
const router = express.Router();
const {
  getOutlets,
  getOutletByIdentifier,
  updateOutletStatus
} = require('../controllers/outletController');

router.get('/', getOutlets);
router.get('/:identifier', getOutletByIdentifier);
router.patch('/:identifier/status', updateOutletStatus);

module.exports = router;

const express = require('express');

const router = express.Router();

const { getOrderPage } = require('../controllers/order');
const { makeOrder } = require('../controllers/makeOrder');

router.get('/order', getOrderPage);
router.post('/order', makeOrder);

module.exports = router;

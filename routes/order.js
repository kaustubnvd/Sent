const express = require('express');

const router = express.Router();

const { getOrderPage, makeOrder, } = require('../controllers/order');

// Route Params
router.get('/order/:tripId', getOrderPage);

router.post('/order', makeOrder);

module.exports = router;

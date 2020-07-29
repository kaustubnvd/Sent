const express = require('express');

const router = express.Router();

const { getOrderPage } = require('../controllers/order');

router.get('/order', getOrderPage);

module.exports = router;

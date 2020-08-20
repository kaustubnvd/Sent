const express = require('express');

const router = express.Router();

const { getOrderPage, makeOrder, } = require('../controllers/order');
const { isAuth } = require('../middleware/is-auth');

// Route Params
router.get('/trip/:tripId', isAuth, getOrderPage);

router.post('/order', makeOrder);

module.exports = router;

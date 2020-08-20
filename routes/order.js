const express = require('express');

const router = express.Router();

const { getOrderPage, makeOrder, } = require('../controllers/order');
const { isAuth } = require('../middleware/is-auth');
const upload = require('../config/file');

// Route Params
router.get('/trip/:tripId', isAuth, getOrderPage);

router.post('/order', upload.single('image'), makeOrder);

module.exports = router;

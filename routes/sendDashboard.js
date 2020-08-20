const express = require('express');
const router = express.Router();

const { getSendDashboard } = require('../controllers/sendDashboard');
const { isAuth } = require('../middleware/is-auth');

router.get('/send-dashboard', isAuth, getSendDashboard);

module.exports = router;
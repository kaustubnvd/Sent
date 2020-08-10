const express = require('express');
const router = express.Router();

const { getSendDashboard } = require('../controllers/sendDashboard');

router.get('/send-dashboard', getSendDashboard);

module.exports = router;
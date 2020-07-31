const express = require('express');
const router = express.Router();

const { getCarryDashboard } = require('../controllers/carryDashboard');

router.get('/carry-dashboard', getCarryDashboard);

module.exports = router;

const express = require('express');
const router = express.Router();

const { getSendDashboard, cancelRequest } = require('../controllers/sendDashboard');
const { isAuth } = require('../middleware/is-auth');

router.get('/send-dashboard', isAuth, getSendDashboard);

router.post('/send-dashboard/delete/:packageId', isAuth, cancelRequest)

module.exports = router;
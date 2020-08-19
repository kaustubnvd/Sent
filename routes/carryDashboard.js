const express = require('express');
const router = express.Router();

const { getCarryDashboard, acceptOffer, declineOffer } = require('../controllers/carryDashboard');
const { isAuth } = require('../middleware/is-auth');

router.get('/carry-dashboard', getCarryDashboard);
router.post('/carry-dashboard/accept', isAuth, acceptOffer);
router.post('/carry-dashboard/decline', isAuth, declineOffer);

module.exports = router;

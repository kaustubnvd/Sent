const express = require('express');
const router = express.Router();

const { getCarrierIntroPage } = require('../controllers/carrier-intro');

router.get('/carrier-intro', getCarrierIntroPage);

module.exports = router;
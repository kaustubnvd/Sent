const express = require('express');
const router = express.Router();

const { getNewTripForm } = require('../controllers/new-trip');

router.get('/new-trip', getNewTripForm);

module.exports = router;
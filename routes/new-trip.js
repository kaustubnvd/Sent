const express = require('express');
const router = express.Router();

const { getNewTripForm, postNewTripForm } = require('../controllers/new-trip');

router.get('/new-trip', getNewTripForm);

router.post('/new-trip', postNewTripForm);

module.exports = router;
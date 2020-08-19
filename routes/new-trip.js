const express = require('express');
const router = express.Router();

const { getNewTripForm, postNewTripForm } = require('../controllers/new-trip');
const { isAuth } = require('../middleware/is-auth');

router.get('/new-trip', isAuth, getNewTripForm);

router.post('/new-trip', isAuth, postNewTripForm);

module.exports = router;

const express = require('express');
const router = express.Router();

const { getSignUpPage } = require('../controllers/sign-up');

router.get('/sign-up', getSignUpPage);

module.exports = router;
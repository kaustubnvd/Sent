const express = require('express');
const router = express.Router();

const { getSignUpPage, postSignUpPage } = require('../controllers/sign-up');

router.get('/sign-up', getSignUpPage);
router.post('/sign-up', postSignUpPage);

module.exports = router;
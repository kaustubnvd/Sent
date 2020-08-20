const express = require('express');
const router = express.Router();

const { getSignUpPage, postSignUpPage } = require('../controllers/sign-up');
const upload = require('../config/file');

router.get('/sign-up', getSignUpPage);

router.post('/sign-up', upload.single('image'), postSignUpPage);

module.exports = router;
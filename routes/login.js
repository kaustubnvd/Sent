const express = require('express');
const router = express.Router();

const { getLoginPage } = require('../controllers/login');

router.get('/login', getLoginPage);

module.exports = router;
const express = require('express');
const router = express.Router();

const { getLoginPage, postLoginPage, postLogout } = require('../controllers/login');

router.get('/login', getLoginPage);
router.post('/login', postLoginPage);
router.post('/logout', postLogout);

module.exports = router;
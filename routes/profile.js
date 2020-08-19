const express = require('express');
const router = express.Router();

const { isAuth } = require('../middleware/is-auth');

const { getProfile } = require('../controllers/profile');

router.get('/profile', isAuth, getProfile);

module.exports = router;

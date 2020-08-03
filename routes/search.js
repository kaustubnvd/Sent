const express = require('express');
const router = express.Router();

const { getSearch } = require('../controllers/search');

router.get('/search', getSearch);

module.exports = router;
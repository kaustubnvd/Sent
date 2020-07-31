const express = require('express');
const router = express.Router();

router.get('/search', (req, res, next) => {
  res.json(req.query);
});

module.exports = router;
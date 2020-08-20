const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body } = require('express-validator');

const { getSignUpPage, postSignUpPage } = require('../controllers/sign-up');
const upload = require('../config/file');

router.get('/sign-up', getSignUpPage);

router.post('/sign-up', upload.single('image'), [body('email').isEmail().withMessage('Please enter a valid email').custom(async (value, {req}) => {
  const user = await User.getUserByEmail(value);
  if (user) {
    return Promise.reject('An account with that email already exists');
  }
  return true;
}).normalizeEmail(), body('phoneNumber').isMobilePhone().withMessage('Please enter a valid phone number'), body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'), body('confirmPassword').custom((value, {req}) => {
  if (value !== req.body.password) {
    throw new Error('Passwords must match');
  }
  return true;
})], postSignUpPage);

module.exports = router;
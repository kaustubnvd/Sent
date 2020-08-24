const express = require('express');
const router = express.Router();
const upload = require('../config/file');
const { body } = require('express-validator');

const User = require('../models/User');

const { isAuth } = require('../middleware/is-auth');

const {
  getProfile,
  uploadProfilePic,
  updateUser,
} = require('../controllers/profile');

router.get('/profile', isAuth, getProfile);

// Should actually be PUT/PATCH request
router.post('/profile/pic', isAuth, upload.single('image'), uploadProfilePic);

router.post(
  '/profile/update',
  isAuth,
  [
    body('firstName')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please enter a valid first name'),
    body('lastName')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please enter a valid last name'),
    body('emailAddress')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (value, { req }) => {
        const user = await User.getUserByEmail(value);
        if (user) {
          return Promise.reject(
            'Another account with that email already exists'
          );
        }
        return true;
      })
      .normalizeEmail(),
    body('phoneNumber')
      .isMobilePhone()
      .withMessage('Please enter a valid phone number'),
  ],
  updateUser
);

module.exports = router;

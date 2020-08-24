const User = require('../models/User');
// const fs = require('fs/promises');
const path = require('path');
const { validationResult } = require('express-validator');

exports.getSignUpPage = (req, res, next) => {
  res.render('sign-up', { errors: [] });
};

exports.postSignUpPage = async (req, res, next) => {
  // Get the form data from the POST request body
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // await fs.unlink(path.join('.', req.file.path));
    return res.render('sign-up', {
      errors: errors.array(),
    });
  }
  // Create an instance of the user model
  let imageURL = '/assets/images/default_avatar.png';
  if (req.file) {
    imageURL = '/' + req.file.path;
  }
  const user = new User({
    firstName,
    lastName,
    email,
    phoneNum: phoneNumber,
    password,
    imageURL,
  });
  await user.save(); // Saves in database
  req.session.user = user;
  res.redirect('/');
};

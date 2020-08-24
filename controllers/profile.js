const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getProfile = (req, res, next) => {
  res.render('profile', {
    errors: [],
  });
};

exports.uploadProfilePic = async (req, res, next) => {
  if (!req.file) {
    return res.redirect('/profile');
  }
  const URL = '/' + req.file.path;
  await User.updateImgUrl(URL, req.session.user.id_user);
  req.session.user = await User.getUserById(req.session.user.id_user);
  res.redirect('/profile');
};

exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('profile', {
      errors: errors.array()
    });
  }
  await User.updateUserDetails(req.body, req.session.user.id_user);
  req.session.user = await User.getUserById(req.session.user.id_user);
  res.redirect('/profile');
};

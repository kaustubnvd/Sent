const User = require('../models/User');
const Package = require('../models/Package');
const { validationResult } = require('express-validator');

exports.getProfile = async (req, res, next) => {
  const sends = await Package.getPackagesSent(req.session.user.id_user);
  const carries = await Package.getPackagesCarried(req.session.user.id_user);
  const earnings = carries.reduce((sum, curr) => {
    sum += curr.price;
    return sum;
  }, 0);
  res.render('profile', {
    errors: [],
    sends,
    carries: carries.length,
    earnings,
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
      errors: errors.array(),
    });
  }
  await User.updateUserDetails(req.body, req.session.user.id_user);
  req.session.user = await User.getUserById(req.session.user.id_user);
  res.redirect('/profile');
};

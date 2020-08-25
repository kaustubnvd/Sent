const User = require('../models/User');
const Package = require('../models/Package');
const { validationResult } = require('express-validator');

let cache;
exports.getProfile = async (req, res, next) => {
  const sends = await Package.getPackagesSent(req.session.user.id_user);
  const carries = await Package.getPackagesCarried(req.session.user.id_user);
  const earnings = carries.reduce((sum, curr) => {
    sum += curr.price;
    return sum;
  }, 0);
  if (!cache) {
    cache = [sends, carries, earnings];
  }
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
    const [sends, carries, earnings] = cache;
    return res.status(422).render('profile', {
      errors: errors.array(),
      sends,
      carries: carries.length,
      earnings,
    });
  }
  res.redirect('/profile');
};

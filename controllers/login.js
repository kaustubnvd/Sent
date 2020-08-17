const User = require('../models/User');

exports.getLoginPage = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('login');
};

exports.postLoginPage = async (req, res, next) => {
  // Check login details
  const suket = await User.getUserById('23');
  req.session.user = suket;
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};

const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res, next) => {
  res.render('login');
};

exports.postLoginPage = async (req, res, next) => {
  // Check login details
  const { email, password } = req.body;
  const user = await User.getUserByEmail(email);
  if (!user) {
    return res.redirect('/login');
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.user = user;
    return res.redirect('/');
  }
  res.redirect('/login');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};

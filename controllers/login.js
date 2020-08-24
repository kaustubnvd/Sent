const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res, next) => {
  res.render('login', {
    email: '',
    error: null,
  });
};

exports.postLoginPage = async (req, res, next) => {
  // Check login details
  const { email, password } = req.body;
  const user = await User.getUserByEmail(email);
  if (!user) {
    return res.render('login', {
      email: '',
      error: 'Email not found',
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render('login', {
      email,
      error: 'Incorrect password',
    });
  }
  req.session.user = user;
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};

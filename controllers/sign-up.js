const User = require('../models/User');

exports.getSignUpPage = (req, res, next) => {
  res.render('sign-up');
};

exports.postSignUpPage = async (req, res, next) => {
  // Get the form data from the POST request body
  const { firstName, lastName, email, phoneNumber, password} = req.body;
  // Create an instance of the user model
  const user = new User({firstName, lastName, email, phoneNum: phoneNumber, password});
  await user.save(); // Saves in database
  req.session.user = user;
  res.redirect('/'); 
};
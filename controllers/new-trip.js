const Trip = require('../models/Trip');

exports.getNewTripForm = (req, res, next) => {
  res.render('new-trip', {
    pageTitle: 'Sent | Connecting Texas',
    apiKey: process.env.PLACES_AUTOCOMPLETE_KEY,
  });
};

exports.postNewTripForm = async (req, res, next) => {
  const { from, date, to, size, price } = req.body;
  const trip = new Trip({ carrierId: req.session.user.id_user, from, to, date, size, price });
  await trip.save();
  res.redirect('/carry-dashboard');
};

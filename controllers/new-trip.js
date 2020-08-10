exports.getNewTripForm = (req, res, next) => {
  res.render('new-trip', {
    pageTitle: 'Sent | Connecting Texas',
    apiKey: process.env.PLACES_AUTOCOMPLETE_KEY,
  });
};

exports.postNewTripForm = (req, res, next) => {
  res.redirect('/carry-dashboard');
};
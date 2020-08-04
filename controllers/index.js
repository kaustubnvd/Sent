exports.getHomePage = (req, res, next) => {
  res.render('home', {
    pageTitle: 'Sent | Connecting Texas',
    apiKey: process.env.PLACES_AUTOCOMPLETE_KEY,
  });
};

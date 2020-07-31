exports.getHomePage = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Sent | Connecting Texas',
    apiKey: process.env.PLACES_AUTOCOMPLETE_KEY,
  });
};

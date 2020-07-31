exports.getHomePage = (req, res, next) => {
  res.render('index', { pageTitle: 'Sent | Connecting Texas' });
};

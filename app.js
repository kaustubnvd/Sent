const express = require('express');
const bodyParser = require('body-parser');
const glob = require('glob');
const session = require('express-session');
const csrf = require('csurf');

const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
}));

// app.use(csrf());

app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  // res.locals.csrfToken = req.csrfToken();
  next();
});

glob.sync('./routes/*.js').forEach((file) => {
  app.use(require(path.resolve(file)));
});

app.listen(PORT, () => console.log(`🚀 Server started in ${process.env.NODE_ENV} mode at http://${process.env.HOST}:${PORT}`));

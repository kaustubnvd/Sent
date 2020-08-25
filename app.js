const express = require('express');
const bodyParser = require('body-parser');
const glob = require('glob');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const compression = require('compression');

const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());

app.use(express.static(path.resolve('public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MySQLStore({
  host: process.env.DATABASE_HOST,
  port: 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

glob.sync('./routes/*.js').forEach((file) => {
  app.use(require(path.resolve(file)));
});

// 404 Catch all
app.use((req, res, next) => {
  res.status(404).render('404');
});

// 500 Catch All
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render('500');
});

app.listen(PORT, () =>
  console.log(
    `🚀 Server started in ${process.env.NODE_ENV} mode at http://${process.env.HOST}:${PORT}`
  )
);

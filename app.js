require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const PORT = 8000;
// connect to mongo database via mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connection Open!!');
  })
  .catch((err) => {
    console.log(err);
  });

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Express session setup
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

// use express-flash for flash messages
app.use(flash());

// Middleware to expose flash messages to views
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  next();
});

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/diary', require('./server/routes/diary'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

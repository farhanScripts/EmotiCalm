const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const collection = require('./models/loginSchema');

const PORT = 8000;
// connect to mongo database via mongoose
mongoose
  .connect('mongodb://127.0.0.1:27017/emoticalm')
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

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});
app.post('/signup', async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  //cek apakah user sudah ada di database atau belum
  const userExistInDatabase = await collection.findOne({ email: data.email });
  if (userExistInDatabase) {
    res.send('User already exist. Please log in instead');
    // munculin notif pake sweet alert
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userData = await collection.insertMany(data);
    res.redirect('/login');
    console.log(userData);
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });
    if (!check) {
      res.send('user name cannot found');
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.redirect('/');
    } else {
      res.send('Wrong Password');
    }
  } catch (error) {
    res.send('Wrong Details');
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

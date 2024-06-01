const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const bcrypt = require('bcrypt');
const User = require('../models/loginSchema');
/**
 * GET /my
 * Home
 */

exports.myHomePage = (req, res) => {
  console.log('User Login Info : ', req.user);
  res.status(200).render('homeAfterLogin', {
    username: req.user.username,
  });
};

/**
 * GET /
 * Home
 */

exports.home = (req, res) => {
  res.status(200).render('home');
};

/**
 * GET
 * Sign Up Page
 */

exports.signup = (req, res) => {
  res.status(200).render('signup');
};

/**
 * POST REQUEST
 * Sign Up
 */

exports.signupPost = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };
  // cek apakah user sudah ada di database atau belum
  const userExistInDatabase = await User.findOne({ email: data.email });
  if (userExistInDatabase) {
    res.status(400).send('User already exist. Please log in instead');
    // munculin notif pake sweet alert
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userData = await User.insertMany(data);
    res.redirect('/login');
    console.log('User Data dari SignUp : ', userData);
  }
};

/**
 * GET /login
 */

exports.login = (req, res) => {
  res.render('login');
};

exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};

const User = require('../models/loginSchema');
const bcrypt = require('bcrypt');
/**
 * GET /
 * Home
 */

exports.home = (req, res) => {
  res.render('home');
};

/**
 * GET
 * Sign Up Page
 */

exports.signup = (req, res) => {
  res.render('signup');
};

/**
 * POST REQUEST
 * Sign Up
 */

exports.signupPost = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  //cek apakah user sudah ada di database atau belum
  const userExistInDatabase = await User.findOne({ email: data.email });
  if (userExistInDatabase) {
    res.send('User already exist. Please log in instead');
    // munculin notif pake sweet alert
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userData = await User.insertMany(data);
    res.redirect('/login');
    console.log(userData);
  }
};

/**
 * GET /login
 */

exports.login = (req, res) => {
  res.render('login');
};

/**
 * POST /login
 */

exports.loginPost = async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.email });
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
};

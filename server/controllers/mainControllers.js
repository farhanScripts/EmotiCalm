const User = require('../models/loginSchema');
const bcrypt = require('bcrypt');
/**
 * GET /my
 * Home
 */

exports.myHomePage = (req, res) => {
  console.log('User Login Info : ', req.user);
  res.status(200).render('homeAfterLogin');
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
  //cek apakah user sudah ada di database atau belum
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

/**
 * POST /login
 */

// exports.loginPost = async (req, res) => {
//   try {
//     const check = await User.findOne({ email: req.body.email });
//     if (!check) {
//       res.status(404).send('user name cannot found');
//     }

//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       check.password
//     );
//     if (isPasswordMatch) {
//       res.redirect('/my');
//     } else {
//       res.status(400).send('Wrong Password');
//     }
//   } catch (error) {
//     res.status(400).send('Wrong Details');
//   }
// };

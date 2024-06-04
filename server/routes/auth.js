const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mainController = require('../controllers/mainControllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/loginSchema');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect Email' });
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password Incorrect' });
        }
      } catch (error) {
        return done(e);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

router.get('/login', mainController.login);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/my',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/signup', mainController.signup);

router.post('/signup', mainController.signupPost);

module.exports = router;

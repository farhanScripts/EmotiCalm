const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

router.get('/', mainController.home);
router.get('/my', mainController.myHomePage);
router.get('/login', mainController.login);
router.post('/login', mainController.loginPost);
router.get('/signup', mainController.signup);
router.post('/signup', mainController.signupPost);

module.exports = router;

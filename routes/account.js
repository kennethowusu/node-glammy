var express = require('express');
var router = express.Router();
var accountController  = require('../controllers/accountController');




//signup
router.post('/signup',accountController.signup);


//signin
router.post('/signin',accountController.signin);














module.exports = router;

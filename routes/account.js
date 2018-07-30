var express = require('express');
var router = express.Router();
var accountController  = require('../controllers/accountController');

//functions
const user = require('../functions/userFunctions');

//middleware
var accountMiddleware = require('../middleware/account');



//render sign up form
router.get('/signup',accountController.getSignupForm)
//signup
router.post('/signup',accountController.signup);



//render sign inform
router.get('/signin',accountController.getSigninForm)
//signin
router.post('/signin',user.loggedIn,accountController.signin);



//change password when loggedIn
router.put('/profile/password',accountController.changePasswordLogin);


//send reset password
router.post('/profile/forgotpassword',accountController.sendResetCode);

//reset password
router.post('/profile/resetpassword',accountController.resetPassword);







module.exports = router;

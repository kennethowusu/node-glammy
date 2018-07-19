var express = require('express');
var router = express.Router();
var accountController  = require('../controllers/accountController');

//functions
const user = require('../functions/userFunctions');

//middleware
var accountMiddleware = require('../middleware/account');

//signup
router.post('/signup',accountController.signup);


//signin
router.post('/signin',user.loggedIn,accountController.signin);



//change password when loggedIn
router.put('/profile/password',accountController.changePasswordLogin);


//send reset password
router.post('/profile/forgotpassword',accountController.sendResetCode)







module.exports = router;

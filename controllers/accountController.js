const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

require('dotenv').config();
//models
var User = require('../models/userModel');
var Resetcode = require('../models/resetCodeModel');
//functions
var user = require('../functions/userFunctions');

module.exports.getSignupForm = function(req, res, next) {
  return res.render('account/signup');
}

module.exports.getSigninForm = function(req, res, next) {
  return res.render('account/signin');
}



//sign up
module.exports.signup = function(req, res, next) {
  //implement sign up
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = user.hashedPassword(password);

  //check if user already exist
  user.emailExist(email)
    .then(function(result) {
      if (result) {
        return res.send("User with Email already exist");
      } else {
        //store user in database
        User.sync({
            force: false
          }).then(() => {
            User.create({
              id: user.generateId(),
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hashedPassword
            }).then(person => {
              console.log(email)
              user.generateToken(req, res, next, person);
              res.send('registered');
              //redirect to the url
            })
          })
          .catch(err => {
            return res.send(err);
          })
      } //else
    })



}

//sign in
module.exports.signin = function(req, res, next) {
  var userToken = req.cookies.auth;
  //implement sign in
  var email = req.body.email;
  var password = req.body.password;

  // //check if email exist;
  User.findOne({
      where: {
        email: email
      }
    })
    .then(person => {
      if (!person) {
        return res.send("Email does not exist")
      }
      if (!user.passwordIsCorrect(password, person.password)) {
        return res.send("Invalid password");
      } else {
        user.generateToken(req, res, next, person);
        //send this for the cookie to work
        res.send('You are loggedIn');
        //redirect to a url
      } //else
    }) //then


} //module.exports


//change password when loggedIn
module.exports.changePasswordLogin = function(req, res, next) {
  const password = req.body.password;
  const newPassword = req.body.newpassword;
  const confirmPassword = req.body.confirmpassword;
  var email = user.getUser(req, res, next).email;

  User.findOne({
      where: {
        email: email
      }
    })
    .then(function(person) {
      console.log(person.password);
      var hash = person.password;
      if (!user.passwordIsCorrect(password, hash)) {
        return res.send('Your password is wrong');
      } else {
        //continue since user password is correct
        if (newPassword !== confirmPassword) {
          return res.send('New Passwords do not match');
        } else {

          //after password matches,replace old password with new password
          //hash password
          const newUserPassword = user.hashedPassword(newPassword);
          person.password = newUserPassword;
          person.save()
            .then(function() {
              return res.send("Your password change successfully");
            }) //person.save

        }
      }
    }) //then
}

//change password when loggedOut
module.exports.sendResetCode = function(req, res, next) {
  const email = req.body.email;
  user.emailExist(email)
    .then(function(result) {
      if (!result) {
        return res.send("No account exist with that email");
      } else {

        //send email
        //redirect to reset password;

        user.getUserId(email)
          .then(function(returnedId) {
            //insert resetcode to database adding userid as a foreign key
            Resetcode.sync({
                force: false
              })
              .then(() => {



                return Resetcode.create({
                  userId: returnedId.id,
                  resetcode: user.generateResetCode()
                })

              }).catch(err => {
                return res.send(err)
              })

          }).catch(err => {
            return res.send(err)

          })



      }
    })
}


//reset password
module.exports.resetPassword = (req,res,next)=>{
  return res.send('Password will be reseted here');
}

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mail = require('../mail/mail');
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
  const newUser = {
     firstname : req.body.firstname,
     lastname : req.body.lastname,
     email : req.body.email,
     password : req.body.password,
  }

  const  hashedPassword =  user.hashedPassword(newUser.password);
  const returnUrl  = req.query.returnUrl;
  //check if user already exist
  user.emailExist(newUser.email)
    .then(function(result) {
      if (result) {
        const emailError  = "Email Already Exists";
        return res.render('account/signup',{emailError:emailError,user:newUser});
      } else {
        //store user in database
        User.sync({
            force: false
          }).then(() => {
            User.create({
              id: user.generateId(),
              firstname: newUser.firstname,
              lastname: newUser.lastname,
              email: newUser.email,
              password: hashedPassword
            }).then(person => {
              user.generateToken(req, res, next, person);
              if(!returnUrl){
                 return res.redirect('/');
               }else{
               return res.redirect(returnUrl);
             }

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
  const email = req.body.email;

  user.getUserByEmail(email)
  .then(returnedUser=>{
  const email = returnedUser.email;
  console.log(returnedUser.password);

      var hash = returnedUser.password;
      if (!user.passwordIsCorrect(password, hash)) {
        return res.send('Your password is wrong');
      } else {
        //continue since user password is correct
        if (newPassword !== confirmPassword) {
          return res.send('New Passwords do not match');
        } else {

           user.resetPassword(newPassword,returnedUser)
           .then(savedUser=>{
             return res.send("Your password has been reseted successfully");
           })
        }
      }

  })



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
        const resetcode = user.generateResetCode();
        user.getUserByEmail(email)
          .then(function(returnedId) {
            //insert resetcode to database adding userid as a foreign key
            Resetcode.sync({
                force: false
              })
              .then(() => {


                mail.sendResetCode(resetcode);
                return Resetcode.create({
                  userId: returnedId.id,
                  resetcode: resetcode
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
  const resetcode = req.body.resetcode;
  //check first if rest code is present
  const email   = req.body.email;

  //password
  const password = req.body.password;

 user.getUserByEmail(email).then(returnedUser=>{
  const userId = returnedUser.id;

  Resetcode.find({where:{userId:userId,resetcode:resetcode}})
  .then(returnedCode=>{
    if(!returnedCode){
      return res.send('Reset code does not exist');
    }else{


      //see if password has expired;
      if(user.passwordHasExpired(returnedCode.createdAt)){

        return res.send('Reset code has expired');

      }//if

      user.resetPassword(password,returnedUser)
      .then(something=>{
        Resetcode.destroy({where:{userId:userId}})
        .then(deleted=>{
          res.send('password reset was successul');
        })
      });


    }//else;


  })

 })

}

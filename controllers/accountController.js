const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
//models
var User = require('../models/userModel');

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

       User.sync({force: false}).then(() => {
         User.create({
           firstname:firstname,
           lastname : lastname,
           email : email,
           password: hashedPassword
         }).then(savedUser=>{
           return res.send(savedUser);
         })
       })
       .catch(err=>{
         return res.send(err);
       })


}

//sign in
module.exports.signin = function(req, res, next) {
  var userToken = req.query.token;
//  implement sign in
 //  var email = req.body.email;
 //  var password = req.body.password;
 //  //check if email exist;
 //  User.findOne({where:{email:email}})
 //  .then(person=>{
 //    if(!person){return res.send("Email does not exist")}
 //    if(!user.passwordIsCorrect(password,person.password)){
 //      return res.send("Invalid password");
 //    }else{
 //      const payload = {
 //        email:person.email
 //      }//payload
 //
 //      const options = {
 //        expiresIn:"1h"
 //      }
 //      var token = jwt.sign(payload,process.env.JWTSECRET,options);
 //      res.append('token',token);
 //      res.send(token);

   jwt.verify(userToken, process.env.JWTSECRET, function(err, decoded) {
     if(err){return res.send(err)
     }else{
       return res.send(decoded)
     }

  });
 //    }//else
 //
 // })
 console.log(req.query.token)
}//module.exports

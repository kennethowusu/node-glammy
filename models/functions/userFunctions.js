const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//models
var User = require('../models/userModel');
module.exports = {
 generateId : ()=>{
	return	crypto.randomBytes(15).toString('hex');
},
  hashedPassword: function(plainPassword) {
    return bcrypt.hashSync(plainPassword, 10);
  },

  passwordIsCorrect: function(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash) ? true : false;
  },
   emailExist:function(email){
    return User.findOne({where:{email:email}})
     .then(function(person){
       if(person){
         return true;
       }else{
         return false;
       }
     })
     .catch(function(err){
       console.log(err)
     })
   },
  getDecodedToken: function(req, res, next) {
    const userToken = req.cookies.auth;

    var decoded = jwt.decode(userToken);
    return decoded; //verify token

  },
  getUserById:function(req,res,next){
    return User.find({where:{id:module.exports.getDecodedToken(req,res,next).id}});
  },
  getUserByEmail:email=>{
    return User.findOne({where:{email:email}});
  },
  generateToken : function(req,res,next,person){
         const payload = {
           id:person.id
         }//payload

         const options = {
           expiresIn:"1h"
         }
         var token = jwt.sign(payload,process.env.JWTSECRET,options);

         //save token in cookie
         res.cookie('auth',token);
       },
   loggedIn: function(req,res,next){
     var userToken = req.cookies.auth;
      if(userToken){
      module.exports.tokenIsValid(userToken).then(function(result){
        if(result){
          console.log(userToken)
          return res.send('token is valid');
        }else{
          module.exports.getEmail(req,res,next);
         return res.send('token is not valid');
        }
      })
      }
      next();
   },

  tokenIsValid: function(userToken){
      //verify token
    return new Promise(function(resolve,reject){
      jwt.verify(userToken, process.env.JWTSECRET, function(err, decoded){
          if (!err) {
           resolve(true);
          } else {
           resolve(false);
          } //else
        })
    })

  },//tokenIsValid

  generateResetCode: function(){
    var resetCode = Math.floor(Math.random() * 899999 + 100000);
    return resetCode;
  },
  resetPassword:(newPassword,returnedUser)=>{
    //after password matches,replace old password with new password
    //hash password
    const newUserPassword = module.exports.hashedPassword(newPassword);
    returnedUser.password = newUserPassword;
  return  returnedUser.save();

},
 passwordHasExpired:(time)=>{

    const createdDate = new Date(time).getTime();
    const now = Date.now();

    const DateDifference = now - createdDate;

    const tenMinute = 600000;
    //check if date difference is greater than 10 minutes
    const expired = (DateDifference>tenMinute)? true : false;
    return expired;

 }
}

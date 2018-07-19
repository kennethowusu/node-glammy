
const jwt = require('jsonwebtoken');

//dotenv
require('dotenv').config();

module.exports = {
  isAuthenticated : function(req,res,next){
    const userToken = req.cookies.auth;

    //verify token
   jwt.verify(userToken, process.env.JWTSECRET, function(err, decoded) {
       if(err){return res.send(err)
       }else{
         res.locals.currentUser = decoded;
         res.send(decoded);
       }
    });//verify token
    next();
  }//isAuthenticated

}

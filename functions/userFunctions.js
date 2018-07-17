
var bcrypt = require('bcrypt');


var bcrypt = require('bcrypt');
module.exports = {
  hashedPassword : function(plainPassword){
  return  bcrypt.hashSync(plainPassword, 10);
  },

passwordIsCorrect : function(plainPassword,hash){
    return bcrypt.compareSync(plainPassword, hash) ? true : false;
  }
}//module.exports

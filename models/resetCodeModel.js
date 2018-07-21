var Sequelize = require('Sequelize');
var db = require('../classes/database');
var User = require('./userModel');


var Resetcode = db.define('resetcode',{

   resetcode:{
     type:Sequelize.INTEGER,
     NotNull:true
   }



});



Resetcode.belongsTo(User);
module.exports = Resetcode;

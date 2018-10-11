const Sequelize = require('sequelize');
var db = require('../classes/database');



module.exports.getIndexPage = function(req,res,next){
  return res.render('index',{returnUrl:req.originalUrl});
}


module.exports.getMakeupPage = function(req,res,next){
  return res.render('makeup',{returnUrl:req.originalUrl});
}

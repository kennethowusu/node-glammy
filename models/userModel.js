var Sequelize = require('sequelize');
var db = require('../classes/database');

//define models
var User = db.define('user', {
  firstname: {
    type:Sequelize.STRING,
    notNull : true
  },
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
})


module.exports = User;

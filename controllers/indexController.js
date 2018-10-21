const Sequelize = require('sequelize');
var db = require('../classes/database');

//models
var Item  = require('../models/item_model.js');
var Image  = require('../models/images_model.js');
var Variant = require('../models/variant_model.js');
var Variant_Image = require('../models/variant_image_model.js');



module.exports.getIndexPage = function(req,res,next){
   Item.findAll({limit:9,
     include:{
       model:Image
     }

   })
   .then((items)=>{
     return res.render('index',{returnUrl:req.originalUrl,items:items});
   })

}


module.exports.getMakeupPage = function(req,res,next){

  Item.findAll({limit:9,
      order: Sequelize.literal('rand()'),
    include:{
      model:Image
    }

  })
  .then((items)=>{
    return res.render('makeup',{returnUrl:req.originalUrl,items:items});
  })
}

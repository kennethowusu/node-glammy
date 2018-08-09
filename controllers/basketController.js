

module.exports.getBasket = (req,res,next)=>{
  return res.render('basket');
}

module.exports.addToBasket = (req,res,next)=>{
  const hasvariant = req.body.hasvariant;

  const item_id = req.body.item_id;
  const item_name = req.body.item_name;
  const item_image = req.body.item_id;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const basket = req.cookies.basket;

  const variant_id = req.body.variant_id;
  const variant_name = req.body.item_name;
  const variant_image = req.body.item_image;


  if(!hasvariant){

      if(item_id in basket){
         basket[item_id].quantity = parseInt( basket[item_id].quantity) + parseInt(quantity);
      }else{
        //check wether object with key exist
        basket[item_id] = {
          name : item_name,
          quantity : quantity,
          price : price,
          variant : false

        };//basket

      }

    }else{
      if(variant_id in basket){
         basket[variant_id].quantity = parseInt( basket[variant_id].quantity) + parseInt(quantity);
      }else{

        basket[variant_id] = {
          name : variant_name,
          image : variant_image,
          quantity : quantity,
          price : price,
          variant : true
        }

      }
  }


 res.cookie('basket',basket);
 return res.send(req.cookies.basket);
}


module.exports.totalBasketQuantity = (req,res,next)=>{
  const basket = req.cookies.basket;
  var total = 0;
 Object.keys(basket).forEach((obj)=>{

   total = total + basket[obj].quantity;
 })
  return total;
}


module.exports.totalBasketPrice = (req,res,next)=>{
  const basket = req.cookies.basket;
  var total = 0;
  Object.keys(basket).forEach((obj)=>{

    total = total + (basket[obj].price  * parseInt(basket[obj].quantity));
  })

  return total;

}

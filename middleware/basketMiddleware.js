
module.exports.createBasketCookie = (req,res,next)=>{
  if(!req.cookies.basket){
    res.cookie('basket',{});
  }
  next();

}

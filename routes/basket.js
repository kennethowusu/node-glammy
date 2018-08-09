var express = require('express');
var router = express.Router();
const basketController = require('../controllers/basketController');

const basketfunc = require('../functions/basketfunc');
//============GET ROUTES ===================//

router.get('/',basketController.getBasket);



//=============POST ROUTES ===================//
router.post('/',basketController.addToBasket)

//=============PUT ROUTES==================//
router.put('/',basketController.updateBasket);

router.get('/total',basketfunc.totalBasketPrice);


//===========DELETE ROUTES===============//
router.delete('/',basketController.deletefromBasket);
module.exports = router;

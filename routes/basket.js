var express = require('express');
var router = express.Router();
const basketController = require('../controllers/basketController');


//============GET ROUTES ===================//

router.get('/',basketController.getBasket);



//=============PUT ROUTES==================//
router.put('/',basketController.addToBasket);


module.exports = router;

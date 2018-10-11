var express = require('express');
var router = express.Router();
var indexController  = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.getIndexPage);
module.exports = router;


/*GET makeup page*/
router.get('/makeup',indexController.getMakeupPage);

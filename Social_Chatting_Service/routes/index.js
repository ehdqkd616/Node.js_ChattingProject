var express = require('express');
var router = express.Router();



router.get('/introduce', function(req, res, next) {
  res.render('introduce');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;

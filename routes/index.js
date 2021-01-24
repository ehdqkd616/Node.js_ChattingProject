var express = require('express');
var router = express.Router();



router.get('/introduce', function(req, res, next) {

  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  }else{
    res.render('introduce');
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.is_logined == false || req.session.userId == undefined){
    res.render('index');
  }else{
    res.render('introduce');
  }
});



module.exports = router;

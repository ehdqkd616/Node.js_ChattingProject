var express = require('express');
var router = express.Router();



router.get('/introduce', function(req, res, next) {
  console.log("/introduce, req.session.is_logined : " + req.session.is_logined)
  console.log("/introduce, req.session.userId : " + req.session.userId)

  res.render('introduce');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("/, req.session.is_logined : " + req.session.is_logined)
  console.log("/, req.session.userId : " + req.session.userId)
  
  res.render('index');
});



module.exports = router;

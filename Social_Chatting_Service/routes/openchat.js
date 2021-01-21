var express = require('express');
var router = express.Router();



router.get('/roomlist', function(req, res, next) {
  res.render('openChatRoomList');
});

/* GET home page. */
router.get('/room', function(req, res, next) {
  res.render('index');
});



module.exports = router;

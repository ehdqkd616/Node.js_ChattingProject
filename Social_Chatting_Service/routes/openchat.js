var express = require('express');
var router = express.Router();


router.get('/roomlist', function(req, res, next) { // 채팅방 목록
  res.render('openChatRoomList', {});
});

router.get('/room', function(req, res, next) {  // 채팅방 
  
  var loginUser = req.session.userId;

  res.render('openChatRoom', {'loginUser': loginUser});
});

module.exports = router;

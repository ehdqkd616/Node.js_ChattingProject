var express = require('express');
var router = express.Router();

router.get('/roomlist', function(req, res, next) { // 채팅방 목록
  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  } else {  
    res.render('openChatRoomList', {});
  }
});

router.get('/room', function(req, res, next) {  // 채팅방 
  
  var room = `room${req.query.no}`;
  var loginUser = req.session.userId;
  
  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  } else {
    res.render('openChatRoom', {'loginUser': loginUser, 'room': room});
  }
});

module.exports = router;

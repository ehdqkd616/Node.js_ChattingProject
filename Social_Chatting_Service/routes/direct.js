var express = require('express');
var router = express.Router();
var db = require('../lib/db'); // 커넥션 연결

/* GET users listing. */
router.get('/', function(req, res, next) { // Direct 채팅방 입장
  var loginUser = req.session.userId;
  var partnerId = req.query.partnerId;
  var sql = `SELECT * FROM MESSAGE
  WHERE (MESSAGE_SENDER = ? AND MESSAGE_RECEIVER = ?) OR (MESSAGE_SENDER = ? AND MESSAGE_RECEIVER = ?) 
  ORDER BY MESSAGE_ID ASC;`

  db.query(sql, [loginUser, partnerId, partnerId, loginUser], function (err, message_list){
    if(err) {
      console.log(err);
    } else {
      res.render('direct', {message_list, partnerId, loginUser}); 
    }
  });

}); 

router.post('/insert_message', function(req, res, next) { 

  var message_sender = req.session.userId;
  var message_receiver = req.body.message_receiver;
  var message_content = message_sender + ": " + req.body.message_content;

  var sql = `INSERT INTO MESSAGE (MESSAGE_CONTENT, MESSAGE_SENDTIME, MESSAGE_SENDER, MESSAGE_RECEIVER)
  VALUES (?, NOW(), ?, ?)`;
  
  db.query(sql, [message_content, message_sender, message_receiver], function (err, result){
    if(err) {
      console.log(err);
    } else{
      res.send(result);
    } 
  });

});

module.exports = router;

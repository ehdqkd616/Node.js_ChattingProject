var express = require('express');
var router = express.Router();

/* 회원가입 폼 */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* 회원가입 */
router.post('/signup', function(req, res, next) {

  var body = req.body;
  var param = [body.userId, body.password];
  var sql = 'INSERT INTO USERS (USERID, PASSWORD, JOIN_DATE) VALUES(?,?,SYSDATE())';


  res.render('signup');

});

module.exports = router;

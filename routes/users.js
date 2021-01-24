var express = require('express');
const { connect } = require('../lib/db');
var router = express.Router();
var db = require('../lib/db'); // 커넥션 연결

router.post('/signin', function (req, res, next) { // 로그인

  console.log("signin, req.session.is_logined : " + req.session.is_logined)
  console.log("signin, req.session.userId : " + req.session.userId)

  var userId = req.body.userId;
  var password = req.body.password;
  var sql = 'SELECT * FROM USER WHERE USERID=?';

  db.query(sql, userId, function (err, result) {
    if (err) {
      console.log(err);
    } else if (!result[0]) { // DB에 아이디 없을 때
      return res.send('please check your id.');
    } else { // 아이디가 존재할 때
      if (password == result[0].PASSWORD) {
        req.session.is_logined = true;
        req.session.userId = result[0].USERID;
        console.log("/signin 직후 req.session.userId : " + req.session.userId);
        console.log("/signin 직후 req.session.is_logined : " + req.session.is_logined);
        
        res.redirect('/introduce');
      } else {
        return res.send('please check your password.');
      }
    }

  });
});


router.get('/signup', function (req, res, next) { // 회원가입 폼
  console.log("/signup, req.session.is_logined : " + req.session.is_logined)
  console.log("/signup, req.session.userId : " + req.session.userId) 
  res.render('signup');
});

router.post('/idCheck', function (req, res, next) { // 아이디 중복체크
  var userId = req.body.userId;

  var sql = "SELECT * FROM USER WHERE USERID = ?";
  
  db.query(sql, userId, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log(result);
      res.send(result);
    }
  });

});


router.post('/signup', function (req, res, next) { // 회원가입

  console.log("/signup, req.session.is_logined : " + req.session.is_logined)
  console.log("/signup, req.session.userId : " + req.session.userId)

  var body = req.body;
  var param = [body.userId, body.password];
  var sql = 'INSERT INTO USER (USERID, PASSWORD, JOIN_DATE) VALUES(?,?,SYSDATE())';

  db.query(sql, param, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.redirect('/');
    }
  });
});

router.get('/logout', function (req, res, next) {
  req.session.is_logined = false;
  req.session.destroy();
  console.log("req.session : " + req.session);
  res.redirect('/');
});

router.get('/allList', function (req, res, next) { // 유저 리스트
  
  console.log("/allList, req.session.is_logined : " + req.session.is_logined)
  console.log("/allList, req.session.userId : " + req.session.userId)
  
  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  }else{
    var loginUser = req.session.userId;
    var sql = `SELECT U.USERID, U.JOIN_DATE, (SELECT COUNT(*) FROM FOLLOW F2 WHERE F2.FOLLOW_FROM = U.USERID AND F2.STATUS = "Y") F_CNT, F.STATUS
              FROM USER U LEFT OUTER JOIN FOLLOW F ON U.USERID = F.FOLLOW_TO AND F.FOLLOW_FROM = ? WHERE USERID != ?`;
  
    db.query(sql, [loginUser, loginUser], function (err, userList) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        res.render('usersList', { 'userList': userList, 'loginUser': loginUser });
      }
    });  
  }

});

router.get('/followRequestList', function (req, res, next) { // 팔로우 요청자 리스트

  console.log("followRequestList, req.session.is_logined : " + req.session.is_logined)
  console.log("followRequestList, req.session.userId : " + req.session.userId)

  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  } else {
    var loginUser = req.session.userId;
    var sql = `SELECT F.FOLLOW_FROM, U.JOIN_DATE
              FROM USER U INNER JOIN FOLLOW F ON U.USERID = F.FOLLOW_FROM
              WHERE F.STATUS = 'W' AND F.FOLLOW_FROM != ? AND F.FOLLOW_TO = ?;
              `;
  
    db.query(sql, [loginUser, loginUser], function (err, followRequestList) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        res.render('followRequestList', { 'followRequestList': followRequestList });
      }
    });
  }
});

router.get('/friendsList', function (req, res, next) { // 친구 리스트

  console.log("/friendsList, req.session.is_logined : " + req.session.is_logined)
  console.log("/friendsList, req.session.userId : " + req.session.userId)

  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  } else {
    var loginUser = req.session.userId;
    var sql = `SELECT F.FOLLOW_FROM, U.JOIN_DATE
              FROM USER U INNER JOIN FOLLOW F ON U.USERID = F.FOLLOW_FROM
              WHERE F.STATUS = 'Y' AND F.FOLLOW_FROM != ? AND F.FOLLOW_TO = ?;
              `;
  
    db.query(sql, [loginUser, loginUser], function (err, friendsList) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        console.log(friendsList);
        res.render('friendsList', { 'friendsList': friendsList });
      }
    });
  }
});


router.get('/requestFollow', function (req, res, next) { // 팔로우 신청
  
  console.log("/requestFollow, req.session.is_logined : " + req.session.is_logined)
  console.log("/requestFollow, req.session.userId : " + req.session.userId)

  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  } else {
    var loginUser = req.session.userId;
    var follow_to = req.query.follow_to;

    var sql = `INSERT INTO FOLLOW (FOLLOW_FROM, FOLLOW_TO, STATUS) VALUES (?, ?, 'W')`;

    db.query(sql, [loginUser, follow_to], function (err, result) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        console.log(result);
        res.redirect('/users/allList');
      }
    });
  }
});

router.get('/acceptFollow', function (req, res, next) { // 팔로우 수락
 
  console.log("/acceptFollow, req.session.is_logined : " + req.session.is_logined)
  console.log("/acceptFollow, req.session.userId : " + req.session.userId)

  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  } else {
    var loginUser = req.session.userId;
    var follow_from = req.query.follow_from;
    console.log(follow_from);

    var sql = `INSERT INTO FOLLOW (FOLLOW_FROM, FOLLOW_TO, STATUS) VALUES (?, ?, 'Y')`;

    db.query(sql, [loginUser, follow_from], function (err, result) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        sql = `UPDATE FOLLOW SET STATUS='Y' WHERE FOLLOW_FROM = ? AND FOLLOW_TO = ?`;
        db.query(sql, [follow_from, loginUser], function (err, result) {
          if (err) {
            console.log(err);
            res.status(500);
          } else {
            console.log(result);
            res.redirect('/users/followRequestList');
          }
        });
      }
    });
  }
});

router.get('/rejectFollow', function (req, res, next) { // 팔로우 거절
  
  console.log("/rejectFollow, req.session.is_logined : " + req.session.is_logined)
  console.log("/rejectFollow, req.session.userId : " + req.session.userId)

  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  } else {
    var loginUser = req.session.userId;
    var follow_from = req.query.follow_from;

    var sql = `DELETE FROM FOLLOW WHERE FOLLOW_FROM = ? AND FOLLOW_TO = ? `;
    db.query(sql, [follow_from, loginUser], function (err, result) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        console.log(result);
        res.redirect('/users/followRequestList');
      }
    });
  }
});

router.get('/deleteFollow', function (req, res, next) { // 친구 삭제
  
  console.log("/deleteFollow, req.session.is_logined : " + req.session.is_logined)
  console.log("/deleteFollow, req.session.userId : " + req.session.userId)

  if(req.session.is_logined == false || req.session.userId == undefined){
    res.redirect('/');
  } else {
    var loginUser = req.session.userId;
    var follow_from = req.query.follow_from;

    var sql = `DELETE FROM FOLLOW WHERE FOLLOW_FROM = ? AND FOLLOW_TO = ?`;
    db.query(sql, [follow_from, loginUser], function (err, result) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        console.log(result);
        var sql = `DELETE FROM FOLLOW WHERE FOLLOW_TO = ? AND FOLLOW_FROM = ?`;
        db.query(sql, [follow_from, loginUser], function (err, result) {
          if (err) {
            console.log(err);
            res.status(500);
          } else {
            console.log(result);
            res.redirect('/users/friendsList');
          }
        });
      }
    });
  }
});

module.exports = router;
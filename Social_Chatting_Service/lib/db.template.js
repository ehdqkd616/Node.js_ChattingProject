var mysql = require('mysql');
var db = mysql.createConnection ({ // 커넥션 생성
  host: '',             // DB가 위치한 IP주소
  port: '',             // DB와 연결할 포트번호
  user: '',             // 계정 이름
  password: '',         // 계정 비밀번호
  database: ''          // 데이터베이스 이름
});
db.connect();
module.exports = db;
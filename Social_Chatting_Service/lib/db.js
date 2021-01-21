var mysql = require('mysql');
var db = mysql.createConnection ({ // 커넥션 생성
  host: 'localhost',          // DB가 위치한 IP주소
  port: 3306,                 // DB와 연결할 포트번호
  user: 'rudy',               // 계정 이름
  password: 'rudy',           // 계정 비밀번호
  database: 'chat_project'    // 데이터베이스 이름
});
db.connect();
module.exports = db;
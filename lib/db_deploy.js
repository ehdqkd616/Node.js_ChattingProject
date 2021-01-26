var mysql = require('mysql');
var db = mysql.createConnection ({        // 커넥션 생성
  host: 'us-cdbr-east-03.cleardb.com',    // DB가 위치한 IP주소
  port: 3306,                             // DB와 연결할 포트번호
  user: 'b5664ed13b89c2',                 // 계정 이름
  password: '2ecac563',                   // 계정 비밀번호
  database: 'heroku_429d1f922a70f92'      // 데이터베이스 이름
});
db.connect();
module.exports = db;
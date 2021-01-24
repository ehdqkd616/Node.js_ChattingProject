var createError = require('http-errors');     // errors 모듈
var express = require('express');             // expresss 모듈
var path = require('path');                   // path 모듈
var cookieParser = require('cookie-parser');      // 쿠키 모듈
var expressSession = require('express-session');  // 세션 모듈
var FileStore = require('session-file-store')(expressSession);
var http = require("http");
var app = express();

//세션 환경 세팅
app.use(expressSession({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false, // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장. 
  store: new FileStore()
  })
);

// req.session이 undefined 되는 문제
// app.use(expressSession) 구문을 라우터보다 먼저 사용
// saveUninitialized: true -> false 로 설정


var passport = require('passport')
, LocalStrategy = require('passport-local')
, Strategy;

var bodyParser = require('body-parser');      // body-parser 모듈 로드

var logger = require('morgan');               // 로거 모듈

var server = http.Server(app);
var io = require('socket.io')(server); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));                               // logger 모듈 사용
app.use(express.json());                              // json 모듈 사용
app.use(express.urlencoded({ extended: false }));     // express-parser 사용
app.use(bodyParser.urlencoded({ extended: false }));  // body-parser 사용

app.use(cookieParser());                                  // cookieParser 모듈 사용
app.use(express.static(path.join(__dirname, 'public')));  // 정적 파일 로드 사용

var indexRouter = require('./routes/index');  // index 라우터
var usersRouter = require('./routes/users');  // users 라우터
var chatRouter = require('./routes/openchat');  // chat 라우터
var directRouter = require('./routes/direct');  // direct 라우터

// use bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// set Rounter
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/openchat', chatRouter);
app.use('/direct', directRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

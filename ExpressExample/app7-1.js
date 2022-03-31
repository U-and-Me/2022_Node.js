// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var static = require('serve-static');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

app.use('/', static(path.join(__dirname, 'public')));
// redirect에서는 ./ 또는 / 이 publicㅇ르 가리킴

// 미들웨어에서 파라미터 확인
app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 요청을 처리함.');
    
    // index.html이 나옴
   // res.redirect('/');

   // login.html이 나옴
    res.redirect('./login.html');
   // res.redirect('/login.html');
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
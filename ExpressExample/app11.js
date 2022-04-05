// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var static = require('serve-static');
var cookieParser = require('cookie-parser');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 라우터 객체 참조
var router = express.Router();

// 라우팅 함수 등록
router.route('/process/setUserCookie').post(function(req, res){
    console.log('/process/setUserCookie 호출됨.');

    // 쿠키 설정
    res.cookie('user', {
        id : 'yuna',
        name : '김유나',
        authorized : true
    });

    // redirect로 응답
    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req, res){
    console.log('/process/showCookie 호출됨');

    res.send(req.cookies);
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
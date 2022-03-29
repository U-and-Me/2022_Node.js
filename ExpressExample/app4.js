// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');

// 익스프레스 객체 생성
var app = express();

// 직접 미들웨어 객체를 만들어 설정
app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 요청을 처리함.');

    var person = {name : '방탄소년단', age:20};
    res.send(person);

    var personStr = JSON.stringify(person);
    res.send(personStr);

    res.writeHead('200', {'Content-Type':'application/json; charset=utf8'});
    res.write(personStr);
    res.end();

});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
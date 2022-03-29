// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');

// 익스프레스 객체 생성
var app = express();

// 직접 미들웨어 객체를 만들어 설정
app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 요청을 처리함.');

    // 실습1 X  => var personStr = JSON.stringify(person); 를 안해줌 : 객체를 풀어줘야하는데 안하고 writeHead와 end를 사용
    /*
    var person = {name:'소녀시대', age:20};
    res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
    res.end(person);
    */

    // 실습2 O
    /*
    var person = {name:'소녀시대', age:20};
    var personStr = JSON.stringify(person);
    res.writeHead('200', {'Content-Type':'application/json; charset=utf8'});
    res.end(personStr);
    */

    // 실습3 X  => 한글이 깨짐
    /*
    var person = {name:'소녀시대', age:20};
    var personStr = JSON.stringify(person);
    res.end(personStr);
    */

    // 실습4 O
    /*
    var person = {name:'소녀시대', age:20};
    var personStr = JSON.stringify(person);
    res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
    res.end(personStr);
    */

    // 실습5 O
    /*
    var person = {name:'소녀시대', age:20};
    var personStr = JSON.stringify(person);
    res.send(personStr);
    */

    // 실습6 O
    /*
    var person = {name:'소녀시대', age:20};
    res.send(person);
    */

    // 실습7 O
    /*
    req.user = 'yuna';
    res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
    res.end('<h1>Express 서버에서 ' + req.user + '를 res, writeHead와 end로 응답한 결과입니다.</h1>');
    */

    // 실습8 O
    req.user = 'yuna';
    res.send('<h1>Express 서버에서 ' + req.user + '를 res, writeHead와 end로 응답한 결과입니다.</h1>');

});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
var http = require('http');

http.createServer(function(req, res){ // req : 요청객체, res : 응답객체
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('<h1>Hello World!</h1>');
    res.end(); // write()한 후 반드시 end() 해주기
}).listen(3000);
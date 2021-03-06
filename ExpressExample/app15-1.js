// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var static = require('serve-static');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

// 클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors = require('cors');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더와 uploads 폴더 오픈
app.use(static(path.join(__dirname, 'public')));
app.use(static(path.join(__dirname, 'uploads')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

app.use(cors());

// multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser => multer => router
// 파일 제한 : 10개, 1G
var storge = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads');
    },
    filename:function(req, file, callback){
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname);
        callback(null, basename, Date.now() + extension);
    }
});

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/login').post(function(req, res) {
	console.log('/process/login 호출됨.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	
	if (req.session.user) {
		// 이미 로그인된 상태
		console.log('이미 로그인되어 상품 페이지로 이동합니다.');
		
		res.redirect('/product.html');
	} else {
		// 세션 저장
		req.session.user = {
			id: paramId,
			name: '김유나',
			authorized: true
		};
		
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>로그인 성공</h1>');
		res.write('<div><p>Param id : ' + paramId + '</p></div>');
		res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
		res.write("<br><br><button type = button><a href='/process/product'>상품 페이지로 이동하기</a></button"); 
		res.write("<br><br><button type = button><a href='/photomulti3102.html'>파일업로드로 이동하기</a></button"); 
		res.end();
	}
});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route('/process/logout').get(function(req, res) {
	console.log('/process/logout 호출됨.');
	
	if (req.session.user) {
		// 로그인된 상태
		console.log('로그아웃합니다.');
		
		req.session.destroy(function(err) {
			if (err) {throw err;}
			
			console.log('세션을 삭제하고 로그아웃되었습니다.');
			res.redirect('/login2.html');
		});
	} else {
		// 로그인 안된 상태
		console.log('아직 로그인되어있지 않습니다.');
		
		res.redirect('/login2.html');
	}
});

// 상품정보 라우팅 함수
router.route('/process/product').get(function(req, res) {
	console.log('/process/product 호출됨.');
	
	if (req.session.user) {
		res.redirect('/product.html');
	} else {
		res.redirect('/login2.html');
	}
});

// 이동1
//multer 미들웨어 사용 : 미들웨어 사용 순서 중요  body-parser -> multer -> router
// 파일 제한 : 12개, 1G
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
        /*callback(null, file.originalname + Date.now())*/
		//callback(null, file.originalname)
		var extension = path.extname(file.originalname);
		var basename = path.basename(file.originalname, extension);
		callback(null, basename + Date.now() + extension);
	 }
});

var upload = multer({ 
    storage: storage,
    limits: {
		files: 12,
		fileSize: 1024 * 1024 * 1024 * 1024
	}
});

// 파일 업로드 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/photo12').post(upload.array('photo12', 12), function(req, res){
    console.log('/process/photomulti3102 호출됨.');

    res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});

    try{
        var files = req.files;

        // 현재 파일의 정보를 저장할 변수 선언
        var originalname = '',
        filename = '',
        mimetype = '',
        size = 0;

        // 배열에 들어간 경우 - 설정에서 1개의 파일도 배열에 넣게 했음
        if(Array.isArray(files)){
            console.log("배열에 들어있는 파일 갯수 : %d", files.length);

            for(var index = 0; index < files.length; index++){
                console.dir('#===== 업로드된 '+ (index + 1) + '번째 파일 정보 =====#');

                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;

                console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);

                // 클라이언트에 응답 전송
                res.write('<h3>김유나님 ' + (index + 1) + '번째 파일 업로드 성공</h3>');
                res.write('<hr/>');
                res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
                res.write('<p>MIME TYPE : ' + mimetype + '</p>');
                res.write('<p>파일 크기 : ' + size + '</p>');
                res.end();
            }
            
            res.write("<br><br><button><a href='/process/product'>상품페이지로 이동하기</a></button>");
        }  
    }catch(err){
        console.dir(err.stack);
    }
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

//404 에러페이지 처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
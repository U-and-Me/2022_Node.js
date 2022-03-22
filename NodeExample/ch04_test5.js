var fs = require('fs');

// 파일을 동기식 IO 방식으로 읽어 들인다.
var data = fs.readFileSync('./package.json', 'utf8');

// 읽어들인 데이터를 출력
console.log(data);
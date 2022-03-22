var Calc = require('./calc3'); // 사용자가 만든 Calc 모듈 사용
var calc = new Calc(); // Calc 객체 생성

calc.emit('stop');

console.log(Calc.title + "에 stop 이벤트 전달함.");
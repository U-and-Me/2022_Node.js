var Calc = require('./calc33'); 

var calc = new Calc();

calc.emit('start');
calc.emit('subtitle', '계산기');
calc.emit('cal', 'a', 'b');

var a = 10;
var b = 5;

console.log('a + b = ' + Calc.prototype.add(a, b));
console.log('a - b = ' + Calc.prototype.substract(a, b));
console.log('a * b = ' + Calc.prototype.multiply(a, b));
console.log('a / b = ' + Calc.prototype.divide(a, b));

console.log(Calc.title + '에 이벤트 종료됨');
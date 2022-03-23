var output = '안녕 1!';
var buffer1 = new Buffer.alloc(10);
var len = buffer1.write(output, 'utf8');

// 버퍼 객체를 문자열을 이용해 만듭니다.
console.log('첫 번째 버퍼의 문자열 : %s', buffer1.toString()); // 16진수 => 2진수

var buffer2 = new Buffer.from('안녕 2!', 'utf8');
console.log('두 번째 버퍼의 문자열 : %s', buffer2.toString());

// 타입 확인
console.log('버퍼 객체의 타입 : %s', Buffer.isBuffer(buffer1));

// 버퍼 객체에 들어있는 문자열 데이터를 문자열 변수로 만듭니다.
var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8', 0, byteLen);
var str2 = buffer2.toString('utf8');

// 두번째 버퍼 객체의 문자열에 첫 번째 버퍼 객체를 복사
buffer1.copy(buffer2, 0, 0, len);
console.log('두 번째 버퍼에 복사한 후의 문자열 : %s', buffer2.toString('utf8'));

// 두개의 버퍼를 붙여줍니다.
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('두 개의 버퍼를 붙인 후의 문자열 : %s', buffer3.toString('utf8'));
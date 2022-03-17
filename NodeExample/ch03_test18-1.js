function Person(name, age){
    this.name = name;
    this.age = age;
}

Person.prototype.go = function(place){
    console.log(place + '에 갑니다.');
}

Person.prototype.dance = function(song){
    console.log(song + '에 맞춰 춤을 춥니다.');
}

Person.prototype.drink = function(food){
    console.log(food + '를 마십니다.');
}

var person01 = new Person('3102 김유나', 19);
var person02 = new Person('블랙핑크', 22);
var person03 = new Person('방탄소년단', 23);

console.log(person01.name + ' 객체의 go("학교")을 호출합니다.');
person01.go('학교');

console.log(person02.name + ' 객체의 dance("뚜두 뚜두")을 호출합니다.');
person02.dance('뚜두 뚜두');

console.log(person03.name + ' 객체의 drink("orange juice")을 호출합니다.');
person03.drink('orange juice');
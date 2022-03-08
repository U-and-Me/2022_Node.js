var calc = {};

calc.add = function(a, b){
    return a + b;
};

calc.minus = function(a, b){
    return a - b;
}

calc.multiply = function(a, b){
    return a * b;
}

calc.division = function(a, b){
    return a / b;
}

module.exports = calc;
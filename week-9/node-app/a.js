"use strict";
const a = 1;
console.log(a);
console.log('Hello World');
function isLeagal(age) {
    return age > 18;
}
const function2input = (num1, num2) => {
    return num1 + num2;
};
setTimeout(() => {
    console.log(function2input(24, 6));
}, 2000);

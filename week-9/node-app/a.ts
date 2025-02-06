const a: number = 1;
console.log(a);

console.log('Hello World');

function isLeagal(age:number): boolean {
    return age > 18;
}

const function2input = (num1: number, num2: number): number => {
    return num1 + num2;
}

setTimeout(() => {
    console.log(function2input(24, 6));
}, 2000);
let a = 10;
let b = 20;

function sum(a = 10, b = 20) {
  return a + b;
}

let result = sum();

console.log(sum());

const sum2 = (a, b) => a + b;

function closerFunction() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

let counter = closerFunction();
counter();
counter();
counter();

let counter2 = closerFunction();
counter2();
counter2();
counter2();

function sum(a, b) {
  return a + b;
}

function a(a) {
  return function b(b) {
    return a + b;
  };
}

console.log(a(5)(10))
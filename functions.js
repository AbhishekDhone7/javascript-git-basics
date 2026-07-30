let firstNumber = 10;
let secondNumber = 20;

function calculateSumWithDefaults(firstOperand = 10, secondOperand = 20) {
  return firstOperand + secondOperand;
}

let defaultSumResult = calculateSumWithDefaults();

console.log(calculateSumWithDefaults());

const addWithArrowFunction = (firstOperand, secondOperand) => firstOperand + secondOperand;

function createCounter() {
  let count = 0;
  return function incrementCounter() {
    count++;
    console.log(count);
  };
}

let firstCounterInstance = createCounter();
firstCounterInstance();
firstCounterInstance();
firstCounterInstance();

let secondCounterInstance = createCounter();
secondCounterInstance();
secondCounterInstance();
secondCounterInstance();

function addTwoNumbers(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function createAdder(baseValue) {
  return function addToBase(valueToAdd) {
    return baseValue + valueToAdd;
  };
}

console.log(createAdder(5)(10));



let a = "string 1";

function abc(x) {
x = "new value" 
console.log("inside function ", x)
}
abc(a)
console.log(a)









let b = [1,2,3,4];

function abc(a) {
  a[1] = "new value" 
}
abc(b)
console.log(b);




let obj = {
 name : "abhishek",
}

function callName(city, country) {
  console.log(this.name, city, country);
}

callName.call(obj, "Pune", "India")
callName.apply(obj, ["Pune", "India"])


const newFunction = callName.bind(obj)
newFunction("Pune", "India");



let obj = {
 name : "abhishek",
 a : function () {
  console.log(this.name); // abhishek
 },
 b : () => {
  console.log(this.name); // undefined
 },
 c : function () {
  function abc () {
    console.log(this.name); // undefined
  }
  abc()
 },
 d : () => {
  function abc () {
    console.log(this.name); // undefined
  }
  abc()
 },
 e : function () {
  const abc = () => {
    console.log(this.name); // abhishek
  }
  abc()
 }
}

obj.a()
obj.b()
obj.c()
obj.d()
obj.e()



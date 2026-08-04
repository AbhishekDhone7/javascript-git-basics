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



let primitiveText = "string 1";

function reassignPrimitiveParameter(text) {
  text = "new value";
  console.log("inside function ", text);
}
reassignPrimitiveParameter(primitiveText);
console.log(primitiveText);









let numberList = [1, 2, 3, 4];

function mutateArrayParameter(numbers) {
  numbers[1] = "new value";
}
mutateArrayParameter(numberList);
console.log(numberList);




let personForBinding = {
 name : "abhishek",
}

function callName(city, country) {
  console.log(this.name, city, country);
}

callName.call(personForBinding, "Pune", "India")
callName.apply(personForBinding, ["Pune", "India"])


const boundCallName = callName.bind(personForBinding);
boundCallName("Pune", "India");



let personWithMethods = {
 name : "abhishek",
 regularMethod : function () {
  console.log(this.name); // abhishek
 },
 arrowMethod : () => {
  console.log(this.name); // undefined
 },
 regularMethodWithNestedFunction : function () {
  function printName () {
    console.log(this.name); // undefined
  }
  printName()
 },
 arrowMethodWithNestedFunction : () => {
  function printName () {
    console.log(this.name); // undefined
  }
  printName()
 },
 regularMethodWithNestedArrow : function () {
  const printName = () => {
    console.log(this.name); // abhishek
  }
  printName()
 }
}

personWithMethods.regularMethod()
personWithMethods.arrowMethod()
personWithMethods.regularMethodWithNestedFunction()
personWithMethods.arrowMethodWithNestedFunction()
personWithMethods.regularMethodWithNestedArrow()



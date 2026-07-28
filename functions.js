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
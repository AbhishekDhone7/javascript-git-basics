/*
  Topic: Patterns and architecture basics
  Difficulty: Intermediate
  Primary Concept: Reusable structures for maintainable JavaScript code
*/

console.log("--- Patterns and architecture basics ---");

function createCounter(start = 0) {
  let value = start;

  return {
    increment() {
      value += 1;
      return value;
    },
    getValue() {
      return value;
    },
  };
}

const counter = createCounter(2);
console.log("Factory pattern:", counter.increment(), counter.getValue());

const formatters = {
  upper(text) {
    return text.toUpperCase();
  },
  lower(text) {
    return text.toLowerCase();
  },
};

function applyStrategy(strategy, input) {
  return strategy(input);
}

console.log("Strategy pattern:", applyStrategy(formatters.upper, "architecture"));

const serviceLayer = {
  repository: {
    findUser(id) {
      return { id, name: "Sample User" };
    },
  },
  service: {
    getUserSummary(id) {
      const user = serviceLayer.repository.findUser(id);
      return `${user.name} (#${user.id})`;
    },
  },
};

console.log("Layered architecture:", serviceLayer.service.getUserSummary(7));

console.log("--- Notes ---");
console.log("Use small modules, separate data access from business logic, and choose patterns only when they solve a real problem.");

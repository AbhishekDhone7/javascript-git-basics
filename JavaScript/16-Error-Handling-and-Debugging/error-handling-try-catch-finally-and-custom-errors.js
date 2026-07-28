/*
  Topic: Error Handling and Debugging
  Difficulty: Intermediate
  Primary Concept: try/catch/finally, custom errors, rethrowing, and wrapping exceptions
*/

console.log("--- Basic try/catch/finally ---");

try {
  console.log("Trying to run code safely");
  console.logg("This method does not exist");
} catch (error) {
  console.log("Caught error name:", error.name);
  console.log("Caught error message:", error.message);
} finally {
  console.log("Finally always runs");
}

console.log("--- Runtime error vs parse-time note ---");
function demonstrateRuntimeError() {
  try {
    const value = JSON.parse('{"name": "Abhishek"}');
    console.log("Parsed name:", value.name);
    missingFunctionCall();
  } catch (error) {
    console.log("Runtime error handled:", error.name, "-", error.message);
  }
}

demonstrateRuntimeError();

console.log("--- Validation with throw ---");
function validateNumber(value) {
  try {
    if (value === "") {
      throw new Error("empty");
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
      throw new TypeError("not a number");
    }

    if (number < 5) {
      throw new RangeError("too low");
    }

    if (number > 10) {
      throw new RangeError("too high");
    }

    console.log("Valid number:", number);
  } catch (error) {
    console.log("Validation failed:", error.name, "-", error.message);
  } finally {
    console.log("Validation finished for value:", value);
  }
}

validateNumber("");
validateNumber("abc");
validateNumber(3);
validateNumber(12);
validateNumber(7);

console.log("--- Error object properties ---");
const sampleError = new SyntaxError("Broken syntax example");
console.log("name:", sampleError.name);
console.log("message:", sampleError.message);
console.log("stack exists:", typeof sampleError.stack === "string");

console.log("--- Custom errors ---");
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super(`No property: ${property}`);
    this.property = property;
  }
}

function readUser(json) {
  const user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

try {
  readUser('{"age": 25}');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation issue:", error.name, "-", error.message);
    console.log("Missing property:", error.property);
  } else if (error instanceof SyntaxError) {
    console.log("JSON syntax issue:", error.message);
  } else {
    throw error;
  }
}

console.log("--- Rethrowing errors ---");
function readJson(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    throw new Error("Invalid JSON data", { cause: error });
  }
}

try {
  readJson('{bad json}');
} catch (error) {
  console.log("Wrapped error:", error.message);
  console.log("Original cause:", error.cause && error.cause.name, error.cause && error.cause.message);
}

console.log("--- finally with return ---");
function func() {
  try {
    console.log("Returning from try");
    return 1;
  } finally {
    console.log("finally still runs");
  }
}

console.log("func result:", func());

console.log("--- Custom syntax-like error class ---");
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const formatError = new FormatError("Formatting error");
console.log(formatError.message);
console.log(formatError.name);
console.log(formatError instanceof SyntaxError);
console.log(formatError.stack ? "stack captured" : "no stack");

console.log("--- Nested error handling and rethrow ---");
try {
  function errorProne() {
    try {
      console.logg("Hello guys..!");
    } catch (error) {
      if (error instanceof TypeError) {
        console.log("Type error handled inside inner catch");
      } else {
        throw error;
      }
    }
  }

  errorProne();
} catch (error) {
  console.log("Outer catch saw:", error.name, error.message);
}

console.log("--- Done ---");

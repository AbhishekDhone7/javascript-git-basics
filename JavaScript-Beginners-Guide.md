# JavaScript Beginner Guide

> Complete JavaScript documentation in simple English for beginners, interview preparation, and developers moving from other languages.

## Table of Contents

- [1. JavaScript at a Glance](#1-javascript-at-a-glance)
- [2. Runtime Model: Execution Context and Call Stack](#2-runtime-model-execution-context-and-call-stack)
- [3. Variables, Scope, and Data Types](#3-variables-scope-and-data-types)
- [4. Type Coercion and Equality](#4-type-coercion-and-equality)
- [5. Operators, Statements, and Loops](#5-operators-statements-and-loops)
- [6. Functions Deep Dive](#6-functions-deep-dive)
- [7. Arrays and Array Methods](#7-arrays-and-array-methods)
- [8. Objects and Object Patterns](#8-objects-and-object-patterns)
- [9. this, call, apply, bind](#9-this-call-apply-bind)
- [10. Prototype and Classes](#10-prototype-and-classes)
- [11. DOM and Events](#11-dom-and-events)
- [12. Async JavaScript](#12-async-javascript)
- [13. APIs, Fetch, Axios, and REST Basics](#13-apis-fetch-axios-and-rest-basics)
- [14. Error Handling and Debugging](#14-error-handling-and-debugging)
- [15. Useful Built-ins: Date, Math, Map, Set](#15-useful-built-ins-date-math-map-set)
- [16. Modern JS Features (ES6+)](#16-modern-js-features-es6)
- [17. Interview Question Bank](#17-interview-question-bank)
- [18. Final Learning Roadmap](#18-final-learning-roadmap)

---

## 1. JavaScript at a Glance

### What is it?

JavaScript is a programming language that tells your app what to do at runtime.

Runtime means "when code is actually running".

JavaScript is also:

- High-level: you write human-friendly code, not machine-level instructions
- Dynamic: data type can be decided while the program runs
- Interpreted/JIT-compiled by engine: browser engine reads and optimizes code at runtime
- Event-driven: code can run when events happen (click, submit, timer, response)

In simple words, JavaScript is the decision-maker of your application.
It reads input, applies logic, and produces output for users.

JavaScript can:

- Read user actions (click, type, scroll)
- Process data (validate, filter, calculate)
- Update UI (show error, open modal, render list)
- Talk to server APIs (get products, save orders)

JavaScript is used in:

- Browsers (frontend)
- Servers using Node.js (backend)
- Mobile and desktop apps through frameworks

### Core building blocks (beginner view)

| Building block | Simple meaning | Example |
|---|---|---|
| Variable | Store a value | `let age = 21` |
| Condition | Make decisions | `if (age >= 18)` |
| Loop | Repeat task | `for (...)` |
| Function | Reusable logic block | `function add(a,b){}` |
| Object/Array | Structured data | user object, items array |

### Where JavaScript runs

| Environment | Common use | Real-world example |
|---|---|---|
| Browser | Interactive UI | Add-to-cart, form validation |
| Node.js server | Business logic/API | Save order in database |
| Hybrid/mobile frameworks | App features | Notifications, list rendering |

### Real-world scenario

In an e-commerce app:

- User clicks Add to Cart
- JavaScript adds item in local state
- JavaScript updates cart count badge
- JavaScript sends API call to store cart

### Flow diagram

```mermaid
flowchart LR
A[User Action] --> B[JavaScript Logic]
B --> C[Update UI]
B --> D[Send API Request]
D --> E[Receive Response]
E --> C
```

### Code example 1: Basic output

```js
const productName = "Laptop";
const price = 59999;
console.log(`${productName} added. Price: ${price}`);
```

### Output

```txt
Laptop added. Price: 59999
```

### Code example 2: Decision making

```js
const stock = 3;

if (stock > 0) {
  console.log("In stock");
} else {
  console.log("Out of stock");
}
```

### Output

```txt
In stock
```

### Code example 3: Function + input processing

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(499, 2);
console.log(`Total amount: ${total}`);
```

### Output

```txt
Total amount: 998
```

### Code example 4: Array processing (real-world cart)

```js
const cartPrices = [199, 299, 99];
const cartTotal = cartPrices.reduce((sum, itemPrice) => sum + itemPrice, 0);
console.log(`Cart total: ${cartTotal}`);
```

### Output

```txt
Cart total: 597
```

### Edge cases (real-world)

- If API call fails, UI should show error instead of spinner forever
- If user clicks Pay button multiple times, app can create duplicate orders
- If product price comes as string (`"499"`) and logic is wrong, total can become incorrect

### Quick checklist for beginners

- Read input carefully (user form, API response)
- Validate data before using it
- Show clear success or error messages
- Keep logic in small reusable functions

### Common mistakes

- Thinking JavaScript and Java are same language
- Thinking JavaScript runs only in browser
- Writing long code without functions
- Not handling invalid user input

### Best practices

- Build fundamentals before frameworks
- Practice daily with small problems
- Read console errors line by line
- Start with `const`, then use `let` if value must change
- Name variables by purpose, not by short unclear names

### Summary

JavaScript is the behavior engine of modern applications. It takes inputs, applies logic, and creates outputs users can see and trust.

---

## 2. Runtime Model: Execution Context and Call Stack

![JavaScript Execution Context](assets/screenshots/javascript-execution.png)

### What is it?

Execution context is the internal runtime environment where JavaScript executes code.

Each context stores:

- Variables in scope
- Function declarations and references
- `this` value
- Current instruction pointer

It also keeps hidden engine metadata used for scope lookup and control flow.

Every execution context runs in two internal phases:

1. Memory creation phase
2. Execution phase

In memory creation phase:

- Function declarations become fully available
- `var` is created with `undefined`
- `let` and `const` are created but not accessible before declaration line (TDZ)

In execution phase:

- JavaScript runs statements line by line
- Values are assigned
- Functions are called and new contexts are created when needed

Main types:

- Global Execution Context (created first)
- Function Execution Context (created on each function call)

Each function call is pushed to call stack, and removed when complete.

### Quick mental model

| Term | Simple meaning | Why it matters |
|---|---|---|
| Global context | First runtime context | Starting point of whole script |
| Function context | Context created per function call | Keeps local data isolated |
| Call stack | LIFO stack of active function calls | Explains execution order and errors |
| Stack trace | Error path of nested calls | Helps debug quickly |

### Real-world scenario

In checkout flow:

- `placeOrder()` calls `validateCart()`
- `validateCart()` calls `checkStock()`
- If `checkStock()` fails, stack trace helps locate exact failure point

### Flow diagram

```mermaid
flowchart TD
A[Global Context Created] --> B[Global Code Runs]
B --> C{Function Called?}
C -- Yes --> D[Create Function Context]
D --> E[Push to Call Stack]
E --> F[Execute Function]
F --> G[Pop from Call Stack]
G --> B
C -- No --> H[Program Ends]
```

### Code example

```js
function one() {
  two();
}

function two() {
  console.log("Inside two");
}

one();
```

### Output

```txt
Inside two
```

### Code example 2: Call stack execution order

```js
function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second start");
  third();
  console.log("second end");
}

function third() {
  console.log("third run");
}

first();
```

### Output

```txt
first start
second start
third run
second end
first end
```

### Code example 3: Memory phase behavior

```js
console.log(total);
show();

var total = 50;

function show() {
  console.log("show called");
}
```

### Output

```txt
undefined
show called
```

### Code example 4: Stack overflow edge case

```js
function loopForever() {
  return loopForever();
}

// loopForever();
console.log("If loopForever is called, it will eventually throw stack overflow");
```

### Output

```txt
If loopForever is called, it will eventually throw stack overflow
```

### Edge cases

- Deep recursion can cause call stack overflow
- Large global scope can increase accidental name conflicts
- Calling too many nested synchronous functions can freeze UI temporarily
- Unclear stack traces happen when function names are generic (for example `fn1`, `fn2`)

### Common mistakes

- Confusing memory creation with execution order
- Not reading stack traces while debugging
- Thinking asynchronous callbacks run immediately on top of current stack
- Using global variables for temporary function-level work

### Best practices

- Keep functions small and focused
- Use debugger and breakpoints for call flow
- Give clear function names so stack traces are readable
- For recursion, always keep a safe base condition
- For async code, remember callback runs after current stack is clear

### Summary

Execution context and call stack explain the exact order in which JavaScript prepares memory, runs statements, enters functions, and returns control.

---

## 3. Variables, Scope, and Data Types

### What is it?

Variable is a named container for data.

Scope is the area where a variable can be accessed.

In JavaScript, understanding variables means understanding three things together:

1. Declaration keyword (`var`, `let`, `const`)
2. Scope (where value can be used)
3. Data type (what kind of value it stores)

JavaScript keywords:

- `var`: function scope, older style
- `let`: block scope, can reassign
- `const`: block scope, cannot reassign reference

Scope types:

- Global scope: accessible from almost everywhere in the file/runtime
- Function scope: accessible only inside that function
- Block scope: accessible only inside `{ ... }` block

### Types of scope and variable access rules

| Scope type | Where it is created | Who can access it | Who cannot access it |
|---|---|---|---|
| Global scope | Outside all functions and blocks | Global code and inner scopes | N/A (top-level scope) |
| Function scope | Inside a function body | That function and its inner blocks | Outside that function |
| Block scope | Inside `{}` like `if`, `for`, `while`, `switch` block | Only inside that block | Outside that block |

Access rule in one line:

- Inner scope can read outer scope variables
- Outer scope cannot read inner scope variables

### Scope access hierarchy diagram

```mermaid
flowchart TD
A[Global Scope] --> B[Function Scope]
B --> C[Block Scope]
C --> D[Read local first]
D --> E[If not found, look in parent scope]
E --> F[If nowhere found, ReferenceError]
```

### Variable lookup (scope chain) diagram

```mermaid
flowchart LR
A[Need variable x in block] --> B{Found in block?}
B -- Yes --> C[Use block value]
B -- No --> D{Found in function scope?}
D -- Yes --> E[Use function value]
D -- No --> F{Found in global scope?}
F -- Yes --> G[Use global value]
F -- No --> H[ReferenceError]
```

Data types:

- Primitive: string, number, boolean, null, undefined, bigint, symbol
- Non-primitive: object, array, function

Quick type meaning:

| Type | Meaning | Example |
|---|---|---|
| string | text value | `"hello"` |
| number | numeric value | `42`, `3.14` |
| boolean | true/false value | `true` |
| undefined | declared but no value yet | `let x;` |
| null | intentionally empty value | `let user = null` |
| object | grouped key-value data | `{ name: "Nisha" }` |
| array | ordered list | `[10, 20, 30]` |

### Real-world scenario

In login page:

- `const apiUrl` should not change
- `let attempts` changes after each failed login
- Avoid using `var` to prevent scope confusion

In cart page:

- `const taxRate = 0.18` should stay fixed
- `let cartTotal` changes when user adds/removes items
- Product list is often an array, user info is usually an object

### Flow diagram

```mermaid
flowchart LR
A[Need Variable] --> B{Will value change?}
B -- No --> C[Use const]
B -- Yes --> D[Use let]
D --> E[Avoid var in modern code]
```

### Scope flow diagram

```mermaid
flowchart TD
A[Global Scope] --> B[Function Scope]
B --> C[Block Scope if/for]
C --> D[Variable accessible only inside block]
```

### Hoisting and TDZ with execution context

Hoisting means JavaScript prepares declarations before running code lines.

Global Execution Context (GEC) is created first.
Then, whenever a function is called, JavaScript creates a sub execution context (Function Execution Context).

Both global and function contexts run in two phases:

1. Memory creation phase
2. Execution phase

### Global and function context flow

```mermaid
flowchart TD
A[Script Starts] --> B[Create Global Execution Context]
B --> C[Global Memory Creation]
C --> D[Global Execution]
D --> E{Function Call?}
E -- Yes --> F[Create Function Execution Context]
F --> G[Function Memory Creation]
G --> H[Function Execution]
H --> I[Return and remove function context]
I --> D
E -- No --> J[Program Ends]
```

### Memory creation impact on var, let, const

| Keyword | Memory creation phase | Before declaration line in execution phase | After declaration line |
|---|---|---|---|
| `var` | Created and initialized as `undefined` | Accessible as `undefined` | Gets assigned value |
| `let` | Created but uninitialized | In TDZ, access throws `ReferenceError` | Gets assigned value |
| `const` | Created but uninitialized | In TDZ, access throws `ReferenceError` | Must be initialized once |

### TDZ and access behavior flow

```mermaid
flowchart LR
A[Scope starts] --> B{Keyword type}
B -- var --> C[Value is undefined initially]
B -- let/const --> D[TDZ active]
D --> E{Access before declaration?}
E -- Yes --> F[ReferenceError]
E -- No --> G[Declaration executes]
G --> H[Value usable]
C --> H
```

### Code example

```js
const appName = "ShopEasy";
let attempts = 0;
attempts = attempts + 1;
console.log(appName, attempts);
```

### Output

```txt
ShopEasy 1
```

### Code example 2: Scope behavior

```js
const company = "ACME";

function showUser() {
  const user = "Riya";
  if (true) {
    const role = "Admin";
    console.log(company, user, role);
  }
  // console.log(role); // would fail: role is block scoped
}

showUser();
```

### Output

```txt
ACME Riya Admin
```

### Code example 2.1: Global -> function -> block access

```js
const globalName = "Global";

function scopeDemo() {
  const functionName = "Function";

  if (true) {
    const blockName = "Block";
    console.log(globalName, functionName, blockName);
  }
}

scopeDemo();
```

### Output

```txt
Global Function Block
```

### Code example 2.2: Outer cannot access inner scope

```js
function account() {
  const pin = 1234;
  console.log("Inside function:", pin);
}

account();

try {
  console.log(pin);
} catch (error) {
  console.log(error.name);
}
```

### Output

```txt
Inside function: 1234
ReferenceError
```

### Code example 2.3: Block scope with let/const vs var

```js
if (true) {
  var varValue = "I am var";
  let letValue = "I am let";
  const constValue = "I am const";
  console.log(varValue, letValue, constValue);
}

console.log(varValue);

try {
  console.log(letValue);
} catch (error) {
  console.log(error.name);
}

try {
  console.log(constValue);
} catch (error) {
  console.log(error.name);
}
```

### Output

```txt
I am var I am let I am const
I am var
ReferenceError
ReferenceError
```

### Code example 3: `const` object mutation edge

```js
const profile = { name: "Nisha", city: "Pune" };
profile.city = "Mumbai"; // allowed
console.log(profile.city);

// profile = { name: "Nisha" }; // not allowed
```

### Output

```txt
Mumbai
```

### Code example 4: Check data types with `typeof`

```js
const title = "Phone";
const price = 999;
const inStock = true;
const tags = ["new", "sale"];
const meta = { brand: "XYZ" };

console.log(typeof title);
console.log(typeof price);
console.log(typeof inStock);
console.log(typeof tags);
console.log(typeof meta);
```

### Output

```txt
string
number
boolean
object
object
```

### Code example 5: Hoisting with `var`

```js
console.log(score);
var score = 100;
console.log(score);
```

### Output

```txt
undefined
100
```

### Code example 6: TDZ with `let` using try/catch

```js
try {
  console.log(points);
} catch (error) {
  console.log(error.name);
}

let points = 50;
console.log(points);
```

### Output

```txt
ReferenceError
50
```

### Code example 7: Sub execution context (function memory and execution)

```js
var globalValue = "G";

function demo(a) {
  console.log(a);
  console.log(localVar);
  var localVar = "L";
  console.log(localVar, globalValue);
}

demo("A");
```

### Output

```txt
A
undefined
L G
```

In this function example:

- During function memory creation, `a` is initialized from argument and `localVar` becomes `undefined`
- During function execution, `localVar` gets value `"L"` on its assignment line

### Edge cases

- `const` object properties can still change
- `var` declared in loop can leak outside block
- `typeof null` returns `"object"` (historical JavaScript behavior)
- Accessing block-scoped variable outside block throws `ReferenceError`
- Using same variable name in nested scopes can confuse debugging
- Accessing `let`/`const` before declaration line causes TDZ error
- Hoisting confusion can hide bugs when `var` appears as `undefined`

### Common mistakes

- Using `var` in modern code
- Accessing `let` or `const` before declaration
- Using unclear variable names like `a`, `x1`, `tmp` in business logic
- Assuming array type will show as `array` in `typeof`
- Assuming `let` and `const` behave like `var` during hoisting

### Best practices

- Use `const` by default
- Use `let` only when reassignment is required
- Keep variable names descriptive
- Group related values in objects instead of many loose variables
- Validate and normalize incoming data types from APIs/forms
- Declare variables before usage for readability, even if hoisting exists
- Prefer `let`/`const` to avoid accidental `undefined` from `var`

### Summary

Correct variable, scope, and data type handling prevents silent bugs, improves readability, and makes debugging much faster.

---

## 4. Type Coercion and Equality

### What is it?

Type coercion means JavaScript converts one data type to another automatically in some operations.

There are two broad forms:

- Implicit coercion: JavaScript converts types automatically
- Explicit coercion: developer converts types manually using `Number()`, `String()`, `Boolean()`

Equality checks compare values, but strictness level matters.

Equality operators:

- `==` loose equality (allows type conversion)
- `===` strict equality (no type conversion)

Quick rule:

- Use `===` for predictable behavior
- Use `==` only when you fully understand its coercion rules

### Coercion quick table

| Expression | Result | Why |
|---|---|---|
| `"10" + 2` | `"102"` | `+` with string does concatenation |
| `"10" - 2` | `8` | `-` forces numeric conversion |
| `true + 1` | `2` | `true` becomes `1` |
| `false + 5` | `5` | `false` becomes `0` |
| `Number("42")` | `42` | explicit numeric conversion |

### Real-world scenario

In payment validation, string input from form may be compared with numeric value. Wrong comparison can approve invalid data.

Another practical case:

- Quantity from input is `"2"` and price is number `500`
- If handled carelessly with `+`, total can become text instead of number

### Flow diagram

```mermaid
flowchart TD
A[Comparison Requested] --> B{Use === ?}
B -- Yes --> C[No type conversion]
B -- No --> D[Possible coercion]
D --> E[Unexpected result risk]
```

### Conversion decision diagram

```mermaid
flowchart LR
A[Input Value] --> B{Type is correct?}
B -- Yes --> C[Use directly]
B -- No --> D[Convert explicitly]
D --> E[Validate converted value]
E --> F[Use in logic]
```

### Code example

```js
console.log(5 == "5");
console.log(5 === "5");
console.log("10" + 2);
console.log("10" - 2);
```

### Output

```txt
true
false
102
8
```

### Code example 2: Boolean coercion behavior

```js
console.log(Boolean(0));
console.log(Boolean(1));
console.log(Boolean(""));
console.log(Boolean("hello"));
```

### Output

```txt
false
true
false
true
```

### Boolean conversion reference (Truthy vs Falsy)

When JavaScript checks a condition (`if`, `while`, logical operators), values are converted to boolean.

Falsy values (convert to `false`):

- `false`
- `0`
- `-0`
- `0n`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

Most other values are truthy (convert to `true`), like non-empty strings, arrays, objects, and non-zero numbers.

### Boolean conversion table

| Value | Boolean conversion | Reason |
|---|---|---|
| `false` | `false` | already false |
| `0` | `false` | numeric zero is falsy |
| `1` | `true` | non-zero number is truthy |
| `""` | `false` | empty string is falsy |
| `"0"` | `true` | non-empty string is truthy |
| `"hello"` | `true` | non-empty string is truthy |
| `null` | `false` | empty/nullish value |
| `undefined` | `false` | missing value |
| `NaN` | `false` | invalid number |
| `[]` | `true` | object type is truthy |
| `{}` | `true` | object type is truthy |

### Code example 2.1: Boolean conversion in conditions

```js
const values = [false, 0, 1, "", "0", null, undefined, NaN, [], {}];

for (const value of values) {
  console.log(Boolean(value));
}
```

### Output

```txt
false
false
true
false
true
false
false
false
true
true
```

### Real-world caution

Form values are usually strings. For example, `"0"` is truthy, but number `0` is falsy.
So for validation, convert to number first when business logic expects numeric behavior.

### Code example 3: Safe input handling (real-world)

```js
const qtyFromInput = "2";
const price = 500;

const qty = Number(qtyFromInput);
const total = qty * price;

console.log(total);
console.log(typeof total);
```

### Output

```txt
1000
number
```

### Code example 4: Tricky equality interview cases

```js
console.log("" == 0);
console.log("" === 0);
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN === NaN);
```

### Output

```txt
true
false
true
false
false
```

### Why comparisons return true or false

JavaScript returns `true` when comparison rule is satisfied, otherwise `false`.
The result depends on:

- Value itself
- Data type
- Operator used (`==`, `===`, `<`, `>`, etc.)
- Whether JavaScript is allowed to coerce type

### Internal flow of `===` (strict equality)

```mermaid
flowchart TD
A[Start a === b] --> B{Type of a and b same?}
B -- No --> C[Return false]
B -- Yes --> D{Type is number?}
D -- No --> E[Compare values directly]
E --> F[Return true or false]
D -- Yes --> G{Either value is NaN?}
G -- Yes --> H[Return false]
G -- No --> I[Compare numeric values]
I --> F
```

### Internal flow of `==` (loose equality)

```mermaid
flowchart TD
A[Start a == b] --> B{Type of a and b same?}
B -- Yes --> C[Same-type comparison rules]
C --> D[Return true or false]
B -- No --> E{null and undefined pair?}
E -- Yes --> F[Return true]
E -- No --> G{boolean involved?}
G -- Yes --> H[Convert boolean to number  true->1, false->0]
H --> A
G -- No --> I{string and number pair?}
I -- Yes --> J[Convert string to number]
J --> A
I -- No --> K{object with primitive?}
K -- Yes --> L[Convert object to primitive]
L --> A
K -- No --> M[Return false]
```

### True/false reasoning table

| Comparison | Result | Why it returns this |
|---|---|---|
| `5 == "5"` | `true` | `==` allows coercion, string `"5"` becomes number `5` |
| `5 === "5"` | `false` | `===` checks both type and value; number and string differ |
| `0 == false` | `true` | `false` coerces to `0` in loose equality |
| `0 === false` | `false` | types are different (`number` vs `boolean`) |
| `null == undefined` | `true` | special loose-equality rule in JavaScript |
| `null === undefined` | `false` | strict equality requires same type |
| `NaN === NaN` | `false` | `NaN` is never equal to anything, including itself |
| `"2" > "12"` | `true` | both are strings, so lexical (dictionary) comparison |
| `"2" > 12` | `false` | number comparison after coercion (`2 > 12` is false) |

### Code example 5: More comparison cases

```js
console.log(0 == false);
console.log(0 === false);
console.log("2" > "12");
console.log("2" > 12);
console.log(10 > "5");
console.log("apple" > "banana");
```

### Output

```txt
true
false
true
false
true
false
```

### Code example 6: Object and array comparison

```js
console.log([1, 2] == [1, 2]);
console.log([1, 2] === [1, 2]);

const arr = [1, 2];
const sameRef = arr;
console.log(arr === sameRef);
```

### Output

```txt
false
false
true
```

Why this happens:

- Arrays and objects compare by reference (memory address), not by content
- Two separate arrays with same values are still different references

### Edge cases

- `"" == 0` is true
- `null == undefined` is true, but `null === undefined` is false
- `NaN === NaN` is false (special numeric behavior)
- `0 == false` is true because of coercion
- `[] == false` can evaluate to true in loose comparison

### Common mistakes

- Using `==` in critical business logic
- Assuming `+` always does numeric addition
- Forgetting to parse number inputs from forms/APIs
- Assuming all non-empty strings are valid numbers

### Best practices

- Prefer `===` and `!==`
- Convert input explicitly: `Number(value)`, `String(value)`
- Validate conversion results with `Number.isNaN()` where needed
- Keep business rules type-safe at boundaries (API/form layer)

### Summary

Type coercion is powerful but risky when ignored. Use strict equality and explicit conversions to keep logic predictable and production-safe.

---

## 5. Operators, Statements, and Loops

### What is it?

Operators perform actions on values.

Statements decide which code should run and when.
Loops help you repeat logic without writing duplicate lines.

This topic is the core of decision-making in JavaScript.

Main categories:

- Arithmetic: `+ - * / % **`
- Assignment: `= += -=`
- Comparison: `> < >= <= ===`
- Logical: `&& || !`
- Ternary: `condition ? valueA : valueB`

Operator priorities matter. For example:

- `*` runs before `+`
- Parentheses `()` can force custom order

Statements control flow:

- `if...else`
- `switch`
- loops: `for`, `while`, `do...while`, `for...of`, `for...in`

In real projects, these are used together:

- Operator calculates result
- Condition checks rule
- Statement decides branch
- Loop repeats process for all items

### End-to-end logic flow

```mermaid
flowchart TD
A[Receive input data] --> B[Apply operators]
B --> C{Condition true?}
C -- Yes --> D[Run success branch]
C -- No --> E[Run fallback branch]
D --> F{More items left?}
E --> F
F -- Yes --> G[Next loop iteration]
G --> B
F -- No --> H[Return final output]
```

### Quick decision table

| Need | Best structure |
|---|---|
| Two-way condition | `if...else` |
| Many fixed options | `switch` |
| Fixed count repetition | `for` |
| Repeat while condition true | `while` |
| At least one run required | `do...while` |
| Iterate array values | `for...of` |
| Iterate object keys | `for...in` |

### Operator behavior quick table

| Operator type | Example | Result idea |
|---|---|---|
| Arithmetic | `20 / 4` | numeric calculation |
| Comparison | `age >= 18` | returns boolean |
| Logical | `isLoggedIn && isVerified` | combines conditions |
| Assignment | `total += 50` | updates variable |
| Ternary | `stock > 0 ? "In" : "Out"` | short if/else |

### Real-world scenario

Order discount flow:

- if amount > 5000, apply 10% discount
- else if amount > 2000, apply 5%
- else no discount

Scenario to consider:

- Amount can be invalid (negative, null, string)
- Business rules can overlap, so condition order matters
- Final amount should never become negative

### Flow diagram

```mermaid
flowchart TD
A[Start] --> B[Read Order Amount]
B --> C{Amount > 5000?}
C -- Yes --> D[Apply 10%]
C -- No --> E{Amount > 2000?}
E -- Yes --> F[Apply 5%]
E -- No --> G[No Discount]
D --> H[Show Final Price]
F --> H
G --> H
```

### Scenario 2: Login attempt lock system

```mermaid
flowchart TD
A[User enters password] --> B{Password correct?}
B -- Yes --> C[Login success and reset attempts]
B -- No --> D[attempts = attempts + 1]
D --> E{attempts >= 3 ?}
E -- Yes --> F[Lock account temporarily]
E -- No --> G[Show retry message]
```

### Code example

```js
const amount = 3200;
let discount = 0;

if (amount > 5000) {
  discount = 10;
} else if (amount > 2000) {
  discount = 5;
}

console.log(`Discount: ${discount}%`);
```

### Output

```txt
Discount: 5%
```

### Code example 1.1: Safe discount with validation

```js
const amountInput = "3200";
const amount = Number(amountInput);

if (Number.isNaN(amount) || amount < 0) {
  console.log("Invalid amount");
} else {
  let discount = 0;
  if (amount > 5000) discount = 10;
  else if (amount > 2000) discount = 5;

  const finalAmount = amount - (amount * discount) / 100;
  console.log(`Discount: ${discount}%`);
  console.log(`Final amount: ${finalAmount}`);
}
```

### Output

```txt
Discount: 5%
Final amount: 3040
```

### Code example 2: Operator precedence

```js
const result1 = 10 + 2 * 5;
const result2 = (10 + 2) * 5;

console.log(result1);
console.log(result2);
```

### Output

```txt
20
60
```

### Code example 2.1: Logical operators in business rules

```js
const isLoggedIn = true;
const isEmailVerified = false;
const isAdmin = true;

const canAccessAdminPanel = isAdmin && isLoggedIn;
const canCheckout = isLoggedIn && isEmailVerified;

console.log(canAccessAdminPanel);
console.log(canCheckout);
```

### Output

```txt
true
false
```

### Code example 3: `switch` for status mapping

```js
const orderStatus = "shipped";
let message;

switch (orderStatus) {
  case "pending":
    message = "Order received";
    break;
  case "shipped":
    message = "Order is on the way";
    break;
  case "delivered":
    message = "Order delivered";
    break;
  default:
    message = "Unknown status";
}

console.log(message);
```

### Output

```txt
Order is on the way
```

### Code example 3.1: Missing break fall-through risk

```js
const level = "gold";
let benefits = "";

switch (level) {
  case "gold":
    benefits += "Priority Support ";
  case "silver":
    benefits += "Discount Vouchers";
    break;
  default:
    benefits = "Basic Benefits";
}

console.log(benefits);
```

### Output

```txt
Priority Support Discount Vouchers
```

Why this matters:

- Missing `break` after `gold` allowed code to continue into `silver`
- Sometimes useful intentionally, but usually a bug

### Code example 4: `for...of` vs `for...in`

```js
const items = ["pen", "book", "bag"];

for (const value of items) {
  console.log(`value: ${value}`);
}

for (const key in items) {
  console.log(`index: ${key}`);
}
```

### Output

```txt
value: pen
value: book
value: bag
index: 0
index: 1
index: 2
```

### Code example 4.1: `for...in` for objects

```js
const user = { name: "Nisha", role: "admin", active: true };

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

### Output

```txt
name: Nisha
role: admin
active: true
```

### Code example 5: While loop safety pattern

```js
let attempts = 0;

while (attempts < 3) {
  attempts++;
  console.log(`Attempt ${attempts}`);
}
```

### Output

```txt
Attempt 1
Attempt 2
Attempt 3
```

### Code example 6: `do...while` runs at least once

```js
let count = 5;

do {
  console.log(`Executed once with count=${count}`);
  count++;
} while (count < 5);
```

### Output

```txt
Executed once with count=5
```

### Scenario checklist: What to consider before writing conditions/loops

- Is input valid and type-safe?
- Are condition branches mutually exclusive?
- Can this loop become infinite?
- Do we need `break` or `continue`?
- Are we iterating array values or object keys?
- Is there a safer built-in method like `map`, `filter`, `some`, `every`?

### Edge cases

- Infinite loop if condition never changes
- `for...in` on arrays can give unexpected keys
- Missing `break` in `switch` can cause fall-through bugs
- `NaN` comparisons are tricky (`NaN === NaN` is false)
- Wrong logical grouping (`&&` / `||`) can approve invalid business conditions
- `for...in` can also iterate inherited keys in some object patterns
- Mutating array while looping can skip or reprocess elements

### Common mistakes

- Using `for...in` instead of `for...of` for arrays
- Missing `break` inside `switch`
- Writing complex `if` blocks without intermediate variables
- Updating wrong loop variable, causing endless loop
- Comparing numbers received as strings without conversion
- Using deeply nested conditions instead of early returns

### Best practices

- Use `for...of` for array values
- Keep loop body short and readable
- Use parentheses in complex conditions for clarity
- Keep `switch` cases explicit and always handle `default`
- Use guard clauses to reduce deep nested `if` blocks
- Validate input at the boundary (form/API layer) before comparisons
- Prefer intention-revealing variable names like `isEligible`, `hasStock`
- Add tests for boundary values (`0`, `1`, min, max, empty)

### Summary

Operators, statements, and loops are the foundation of application logic. Clear conditions and safe loops directly improve correctness and maintainability.

---

## 6. Functions Deep Dive

### What is it?

Function is a reusable block of code.

In simple words, function is a named task.
Instead of writing the same code again and again, you write it once and call it many times.

Functions help you:

- Reuse logic
- Keep code modular
- Test small pieces independently
- Improve readability

Main function styles:

- Function Declaration
- Function Expression
- Arrow Function
- IIFE (Immediately Invoked Function Expression)

Advanced function patterns:

- Callback function
- Higher-order function
- Recursion
- Closure
- Currying

### Function definitions (all important types)

| Term | Definition | Simple example |
|---|---|---|
| Function | Reusable block of code that performs a task | `function add(a, b) { return a + b; }` |
| Parameter | Variable listed in function definition | `a`, `b` in `function add(a, b)` |
| Argument | Actual value passed during function call | `10`, `20` in `add(10, 20)` |
| Return value | Value sent back by function | `return a + b` |
| Function Declaration | Named function defined with `function` statement | `function greet() {}` |
| Function Expression | Function assigned to variable | `const greet = function () {};` |
| Arrow Function | Short function syntax using `=>` | `const sum = (a, b) => a + b;` |
| Anonymous Function | Function without explicit name | `function () {}` |
| Named Function Expression | Function expression with internal name | `const fn = function helper() {};` |
| IIFE | Function that runs immediately after creation | `(function(){ ... })();` |
| Callback Function | Function passed into another function | `setTimeout(() => {}, 1000)` |
| Higher-Order Function | Function that takes/returns a function | `arr.map(x => x * 2)` |
| Pure Function | Same input always returns same output and no side effects | `x => x * 2` |
| Recursive Function | Function that calls itself with stopping condition | `factorial(n)` |
| Closure | Inner function remembering outer scope variables | `makeCounter()` pattern |
| Curried Function | Function transformed into chain of single-argument functions | `sum(a)(b)` |

### Real-world use cases by function type

| Function type | Use case 1 | Use case 2 | Use case 3 |
|---|---|---|---|
| Function Declaration | Core utility like `calculateTotal()` | Validation helpers like `validateEmail()` | Shared formatters like `formatDate()` |
| Function Expression | Config-based behavior mapping | Event handler assignment | Conditional strategy selection |
| Arrow Function | Array callbacks (`map`, `filter`) | Inline API response transforms | Short UI event callbacks |
| IIFE | One-time bootstrapping code | Isolated setup scope to avoid global pollution | Immediate feature-flag initialization |
| Callback Function | API success/error handlers | File read/process sequence | Timer completion actions (`setTimeout`) |
| Higher-Order Function | Reusable permission wrappers | Retry/debounce/throttle utilities | Array pipeline transformations |
| Recursive Function | Tree/category menu traversal | Nested comments rendering | Folder/file traversal logic |
| Closure | Private counters/state | Factory functions with saved config | Encapsulated module-like utilities |
| Curried Function | Pre-configured tax/discount calculators | Reusable logger with fixed prefix | Layered validation rules |

> [!INFO]
> Practical rule: choose function style based on readability and reuse need. Declaration is best for core reusable logic, arrow/expression is best for inline behavior, and closure/currying is best when you need preserved state or pre-configured logic.

### Interview Q&A by function type

| Function type | Common interview question | Practical answer |
|---|---|---|
| Function Declaration | What is function declaration and why is it important? | It is a named function defined with the function keyword. It is fully hoisted, so it can be called before its definition line. Good for core reusable business logic. |
| Function Expression | Function declaration vs function expression? | Function expression is assigned to a variable, so it becomes callable only after assignment line. Declaration is hoisted fully, expression is not. |
| Arrow Function | Arrow function vs normal function? | Arrow function has shorter syntax and lexical this. Normal function has its own dynamic this based on call site. |
| IIFE | What is IIFE and when is it used? | IIFE executes immediately after creation. It is useful for one-time setup and for avoiding global variable pollution. |
| Callback Function | What is callback function? | A callback is a function passed as argument to another function and executed later, often after async events or inside utility functions. |
| Higher-Order Function | What is higher-order function? | A higher-order function takes a function as input or returns a function as output. It helps build reusable and composable logic. |
| Recursive Function | What is recursion and risk in recursion? | Recursion is when a function calls itself. It must have a base condition, otherwise call stack overflow occurs. |
| Closure | What is closure in JavaScript? | Closure means inner function keeps access to outer variables even after outer function ends. Used for private state and function factories. |
| Curried Function | What is currying and where is it useful? | Currying converts multi-argument function into nested single-argument calls. Useful for pre-configured reusable functions. |
| Pure Function | What is pure function and why preferred? | Pure function gives same output for same input and has no side effects. It is easier to test and reason about. |

### Quick interview ready snippets

```js
// Q: Why declaration is hoisted?
sayHello();
function sayHello() {
  console.log("hello");
}

// Q: Why expression fails before assignment?
try {
  greetNow();
} catch (error) {
  console.log(error.name);
}
const greetNow = function () {
  console.log("hi");
};

// Q: Closure proof
function createId(prefix) {
  let count = 0;
  return function () {
    count++;
    return `${prefix}-${count}`;
  };
}

const orderId = createId("ORD");
console.log(orderId());
console.log(orderId());
```

### Output

```txt
hello
ReferenceError
ORD-1
ORD-2
```

### Quick code snippets for definitions

```js
// Parameter and argument
function multiply(x, y) {
  return x * y; // return value
}
console.log(multiply(3, 4)); // 3 and 4 are arguments

// Anonymous function used as callback
setTimeout(function () {
  console.log("Timer done");
}, 10);

// Named function expression
const parser = function parseText(value) {
  return value.trim();
};

console.log(parser("  hello  "));
```

### Output

```txt
12
hello
Timer done
```

### Function lifecycle in execution context

When function runs, JavaScript does:

1. Create function execution context
2. Memory creation phase (params, vars, inner declarations)
3. Execution phase (line-by-line run)
4. Return value and remove function context from stack

### Function execution flow diagram

```mermaid
flowchart TD
A[Function called] --> B[Create Function Execution Context]
B --> C[Memory Creation Phase]
C --> D[Execution Phase]
D --> E[Return value]
E --> F[Pop from Call Stack]
```

### Hoisting in functions (important)

Function-related hoisting behavior:

- Function declaration is fully hoisted
- `var` variable is hoisted as `undefined`
- Function expression and arrow function are available only after assignment line executes

### Hoisting impact table

| Pattern | Can call before definition line? | Why |
|---|---|---|
| Function declaration | Yes | Full function body available in memory creation phase |
| Function expression with `var` | No safe call | variable hoisted as `undefined`, call fails |
| Function expression with `let/const` | No | TDZ before declaration line |
| Arrow function (`const`) | No | behaves like expression assignment |

### Hoisting flow diagram

```mermaid
flowchart LR
A[Memory Creation Phase] --> B[Function declaration stored fully]
A --> C[var functionExpr initialized undefined]
A --> D[let/const arrow/expr in TDZ]
B --> E[Execution Phase starts]
C --> E
D --> E
E --> F[Assignments happen]
F --> G[Expressions/arrows become callable]
```

### Real-world scenario

In a report app:

- One function fetches data
- Another validates rows
- Another formats output
- Callback or higher-order function customizes behavior

Production impact:

- If `validateRows` fails, you stop pipeline early
- If callback throws error, report may remain half-rendered
- Clear function boundaries make bug tracing easier

### Flow diagram

```mermaid
flowchart LR
A[Input Data] --> B[Function A: Validate]
B --> C[Function B: Transform]
C --> D[Function C: Display]
```

### Code example 1: Function declaration

```js
function greet(name) {
  return `Hello ${name}`;
}

const result = greet("Nisha");
console.log(result);
```

### Output

```txt
Hello Nisha
```

### Code example 2: Function declaration hoisting

```js
sayHi();

function sayHi() {
  console.log("Hi from declaration");
}
```

### Output

```txt
Hi from declaration
```

### Code example 3: Function expression hoisting behavior

```js
try {
  greetExpr();
} catch (error) {
  console.log(error.name);
}

var greetExpr = function () {
  console.log("Hi from expression");
};

greetExpr();
```

### Output

```txt
TypeError
Hi from expression
```

Why first call fails:

- `var greetExpr` exists as `undefined` during memory creation
- `undefined()` is invalid, so TypeError

### Code example 4: Arrow function

```js
const add = (a, b) => a + b;
console.log(add(2, 3));
```

### Output

```txt
5
```

### Code example 5: IIFE

```js
(function () {
  console.log("IIFE executed immediately");
})();
```

### Output

```txt
IIFE executed immediately
```

### Code example 6: Callback function

```js
function processOrder(id, callback) {
  callback(`Order ${id} processed`);
}

processOrder(101, function (msg) {
  console.log(msg);
});
```

### Output

```txt
Order 101 processed
```

### Code example 7: Higher-order function

```js
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const sum = applyOperation(10, 20, (x, y) => x + y);
console.log(sum);
```

### Output

```txt
30
```

### Code example 8: Recursion

```js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));
```

### Output

```txt
120
```

### Code example 9: Closure

```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = makeCounter();
counter();
counter();
```

### Output

```txt
1
2
```

### Code example 10: Currying

```js
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

console.log(multiply(3)(4));
```

### Output

```txt
12
```

### Call stack and execution order

Execution order is last-in-first-out (LIFO):

- Last called function runs first
- First called function finishes last

### Call stack diagram

```mermaid
flowchart TD
A[global] --> B[first called]
B --> C[second called]
C --> D[third called]
D --> E[third returns]
E --> F[second returns]
F --> G[first returns]
```

### Code example 11: Call stack order

```js
function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second start");
  third();
  console.log("second end");
}

function third() {
  console.log("third run");
}

first();
```

### Output

```txt
first start
second start
third run
second end
first end
```

### Scenario checklist for functions

- Is this function doing one clear job?
- Are input and output types clear?
- Could this function be reused?
- Can this function fail? If yes, how is error handled?
- Is there any recursion base condition?
- Is this function declaration or expression, and does hoisting matter here?

### Edge cases

- Calling function expression before assignment causes error
- Recursive function without base condition causes stack overflow
- Too many nested function calls can make debugging hard
- Closure can retain data longer than expected, increasing memory usage

### Common mistakes

- Huge functions with too many responsibilities
- Not returning values when caller expects output
- Assuming all function styles hoist the same way
- Using arrow function where dynamic `this` is required

### Best practices

- Keep single responsibility per function
- Name functions with verb + purpose
- Prefer function declarations for core reusable utilities
- Use expression/arrow when passing behavior as value
- Write small pure functions where possible

### Summary

Functions are the building blocks of JavaScript architecture. Understanding function types, hoisting behavior, and call stack order helps you write correct, reusable, and debuggable code.

---

## 7. Arrays and Array Methods

### What is it?

Array is an ordered list of values.

Array methods help you:

- Add and remove data
- Search items
- Transform one array into another
- Calculate totals
- Validate conditions
- Prepare API/UI data quickly

### Array method families

| Family | Methods | Typical use |
|---|---|---|
| Add/remove (mutating) | `push`, `pop`, `shift`, `unshift`, `splice` | cart updates, queue processing |
| Copy/extract (non-mutating) | `slice` | pagination, preview lists |
| Search | `includes`, `indexOf`, `find`, `findIndex` | lookup by id/name/status |
| Transform | `map`, `flatMap` | UI model creation |
| Filter/validate | `filter`, `some`, `every` | in-stock checks, validation rules |
| Aggregate | `reduce` | totals, grouped values |
| Iterate | `forEach` | side effects like logging/rendering |
| Sort/order | `sort` | price/order/date sorting |
| Flatten | `flat` | nested category/tag arrays |

### Return type of each array method

| Method | Returns | Return type | Mutates original array? |
|---|---|---|---|
| `push()` | New array length | `number` | Yes |
| `pop()` | Removed last item | `any` or `undefined` | Yes |
| `shift()` | Removed first item | `any` or `undefined` | Yes |
| `unshift()` | New array length | `number` | Yes |
| `splice()` | Removed items list | `array` | Yes |
| `slice()` | Copied portion | `array` | No |
| `includes()` | Found or not | `boolean` | No |
| `indexOf()` | Item position or -1 | `number` | No |
| `find()` | First matching item | `any` or `undefined` | No |
| `findIndex()` | First matching index or -1 | `number` | No |
| `map()` | Transformed items | `array` | No |
| `filter()` | Matching items | `array` | No |
| `reduce()` | Single accumulated value | `any` (based on accumulator) | No |
| `forEach()` | No useful return value | `undefined` | No |
| `some()` | At least one matched? | `boolean` | No |
| `every()` | All matched? | `boolean` | No |
| `sort()` | Sorted same array reference | `array` | Yes |
| `flat()` | Flattened array | `array` | No |
| `flatMap()` | Mapped + flattened array | `array` | No |

> [!TIP]
> If you need a new array and want to keep original data unchanged, prefer non-mutating methods like `map`, `filter`, `slice`, `flat`, and `flatMap`.

### Method selection flow

```mermaid
flowchart TD
A[Need array operation] --> B{Need single value output?}
B -- Yes --> C{Need total/summary?}
C -- Yes --> D[Use reduce]
C -- No --> E[Use find/findIndex/includes/indexOf]
B -- No --> F{Need transformed array?}
F -- Yes --> G[Use map/flatMap]
F -- No --> H{Need filtered array?}
H -- Yes --> I[Use filter]
H -- No --> J{Need validation?}
J -- Yes --> K[Use some/every]
J -- No --> L[Use forEach or mutating methods]
```

### Real-world scenario

Product listing page:

- Filter category
- Map to UI card model
- Reduce to total cart value

Also in real apps:

- Sort by price low-to-high
- Find selected product by id
- Check if any item is out of stock
- Remove item from cart by index

### Flow diagram

```mermaid
flowchart TD
A[Products Array] --> B[filter: inStock]
B --> C[map: pick fields]
C --> D[reduce: total price]
```

### Code example: `push()`

What it does: adds item at end of array and returns new length.

Real-world scenario: add new product to cart.

```js
const cart = ["pen", "book"];
const newLength = cart.push("bag");
console.log(cart);
console.log(newLength);
```

### Output

```txt
[ 'pen', 'book', 'bag' ]
3
```

### Code example: `pop()`

What it does: removes last item and returns removed value.

Real-world scenario: remove most recently added cart item.

```js
const cart = ["pen", "book", "bag"];
const removed = cart.pop();
console.log(removed);
console.log(cart);
```

### Output

```txt
bag
[ 'pen', 'book' ]
```

### Code example: `shift()`

What it does: removes first item.

Real-world scenario: process first waiting token in a queue.

```js
const queue = ["T1", "T2", "T3"];
const first = queue.shift();
console.log(first);
console.log(queue);
```

### Output

```txt
T1
[ 'T2', 'T3' ]
```

### Code example: `unshift()`

What it does: adds item at beginning.

Real-world scenario: high-priority alert should be shown first.

```js
const alerts = ["normal-1", "normal-2"];
alerts.unshift("critical");
console.log(alerts);
```

### Output

```txt
[ 'critical', 'normal-1', 'normal-2' ]
```

### Code example: `splice()`

What it does: add/remove/replace items at specific index (mutates array).

Real-world scenario: remove canceled order from middle of list.

```js
const orders = [101, 102, 103, 104];
const removed = orders.splice(1, 1); // remove one item at index 1
console.log(removed);
console.log(orders);
```

### Output

```txt
[ 102 ]
[ 101, 103, 104 ]
```

### Code example: `slice()`

What it does: copies a portion without changing original array.

Real-world scenario: show first 5 products as featured list.

```js
const products = ["p1", "p2", "p3", "p4", "p5", "p6"];
const featured = products.slice(0, 5);
console.log(featured);
console.log(products);
```

### Output

```txt
[ 'p1', 'p2', 'p3', 'p4', 'p5' ]
[ 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ]
```

### Code example: `includes()`

What it does: checks if value exists and returns boolean.

Real-world scenario: check if user already has role permission.

```js
const roles = ["viewer", "editor", "admin"];
console.log(roles.includes("admin"));
console.log(roles.includes("owner"));
```

### Output

```txt
true
false
```

### Code example: `indexOf()`

What it does: returns first index of value, otherwise `-1`.

Real-world scenario: find selected tab position.

```js
const tabs = ["home", "orders", "profile"];
console.log(tabs.indexOf("orders"));
console.log(tabs.indexOf("settings"));
```

### Output

```txt
1
-1
```

### Code example: `find()`

What it does: returns first item matching condition.

Real-world scenario: get product by id.

```js
const products = [
  { id: 1, name: "Pen" },
  { id: 2, name: "Book" }
];

const product = products.find((p) => p.id === 2);
console.log(product);
```

### Output

```txt
{ id: 2, name: 'Book' }
```

### Code example: `findIndex()`

What it does: returns index of first matching item.

Real-world scenario: locate item index before update/remove.

```js
const products = [
  { id: 1, name: "Pen" },
  { id: 2, name: "Book" }
];

const idx = products.findIndex((p) => p.id === 2);
console.log(idx);
```

### Output

```txt
1
```

### Code example: `map()`

What it does: creates new array by transforming each item.

Real-world scenario: backend product object to UI card model.

```js
const products = [
  { name: "Pen", price: 10 },
  { name: "Book", price: 50 }
];

const cards = products.map((p) => `${p.name} - Rs.${p.price}`);
console.log(cards);
```

### Output

```txt
[ 'Pen - Rs.10', 'Book - Rs.50' ]
```

### Code example: `filter()`

What it does: returns items that satisfy condition.

Real-world scenario: show only in-stock products.

```js
const products = [
  { name: "Pen", inStock: true },
  { name: "Book", inStock: false }
];

const inStockItems = products.filter((p) => p.inStock);
console.log(inStockItems);
```

### Output

```txt
[ { name: 'Pen', inStock: true } ]
```

### Code example: `reduce()`

What it does: reduces array to one value.

Real-world scenario: cart total amount.

```js
const prices = [100, 200, 300, 400];
const total = prices.reduce((sum, p) => sum + p, 0);
console.log(total);
```

### Output

```txt
1000
```

### Code example: `forEach()`

What it does: runs callback for each item (no returned transformed array).

Real-world scenario: render each log line.

```js
const logs = ["start", "processing", "done"];
logs.forEach((item) => console.log(`log: ${item}`));
```

### Output

```txt
log: start
log: processing
log: done
```

### Code example: `some()`

What it does: returns true if at least one item matches.

Real-world scenario: detect if any cart item is out of stock.

```js
const items = [
  { name: "Pen", inStock: true },
  { name: "Book", inStock: false }
];

const hasOutOfStock = items.some((i) => !i.inStock);
console.log(hasOutOfStock);
```

### Output

```txt
true
```

### Code example: `every()`

What it does: returns true only if all items match.

Real-world scenario: ensure all required documents are uploaded.

```js
const docs = [
  { name: "ID", uploaded: true },
  { name: "Address", uploaded: true }
];

const allUploaded = docs.every((d) => d.uploaded);
console.log(allUploaded);
```

### Output

```txt
true
```

### Code example: `sort()`

What it does: sorts array in place (mutates original).

Real-world scenario: price low-to-high sorting.

```js
const prices = [100, 20, 3];
const wrong = [...prices].sort();
const correct = [...prices].sort((a, b) => a - b);

console.log(wrong);
console.log(correct);
```

### Output

```txt
[ 100, 20, 3 ]
[ 3, 20, 100 ]
```

### Code example: `flat()`

What it does: flattens nested arrays.

Real-world scenario: merge nested category tags.

```js
const nested = [["js", "web"], ["api"], ["node", "db"]];
const flatTags = nested.flat();
console.log(flatTags);
```

### Output

```txt
[ 'js', 'web', 'api', 'node', 'db' ]
```

### Code example: `flatMap()`

What it does: map + flatten in one step.

Real-world scenario: user roles expanded into permission labels.

```js
const users = [
  { name: "Nisha", roles: ["admin", "editor"] },
  { name: "Riya", roles: ["viewer"] }
];

const roleLabels = users.flatMap((u) => u.roles.map((r) => `${u.name}:${r}`));
console.log(roleLabels);
```

### Output

```txt
[ 'Nisha:admin', 'Nisha:editor', 'Riya:viewer' ]
```

### Real-world pipeline example

```js
const products = [
  { name: "Pen", price: 10, inStock: true },
  { name: "Book", price: 50, inStock: false },
  { name: "Bag", price: 200, inStock: true }
];

const totalInStock = products
  .filter((p) => p.inStock)
  .map((p) => p.price)
  .reduce((sum, p) => sum + p, 0);

console.log(totalInStock);
```

### Output

```txt
210
```

### Edge cases

- Default `sort()` sorts as strings
- Mutating original arrays can break shared state
- `map()` without return gives `undefined` items
- `reduce()` without initial value can fail on empty arrays
- `forEach()` cannot be stopped using `break`
- `splice()` mutates original array directly

### Common mistakes

- Forgetting to return inside `map`
- Using `map` when no transformed array is needed
- Using `for...in` with arrays and expecting values
- Sorting numbers without comparator function
- Mutating shared array by mistake in reducers/services

### Best practices

- Use immutable patterns when possible
- Use descriptive callback names
- Prefer `find()` when expecting one item, `filter()` for many
- Always pass comparator in numeric/date sorting
- Add initial accumulator value in `reduce()`
- Use `some()`/`every()` for clear boolean intent

### Summary

Array methods are the backbone of JavaScript data processing. Choosing the right method improves readability, correctness, and real-world maintainability.

---

## 8. Objects and Object Patterns

### What is it?

Object stores key-value pairs.

Object is used to model real-world entities like:

- user profile
- product
- order
- invoice
- app configuration

In objects:

- key is property name
- value can be any type (string, number, array, object, function)

Common operations:

- Create and update properties
- Read values using dot and bracket notation
- Optional chaining `?.` for safe nested reads
- Destructuring for clean extraction
- Object methods for behavior
- Merge and copy objects using spread or `Object.assign`

### Object structure diagram

```mermaid
flowchart TD
A[Object] --> B[Primitive properties]
A --> C[Nested object]
A --> D[Array property]
A --> E[Method function]
```

### Access and update flow

```mermaid
flowchart LR
A[Need object value] --> B{Property exists?}
B -- Yes --> C[Read/Update value]
B -- No --> D{Use optional chaining?}
D -- Yes --> E[Get undefined safely]
D -- No --> F[Possible runtime error]
```

### Object method quick table

| Pattern | What it does | Real-world use |
|---|---|---|
| Dot notation | Read fixed property name | `user.name` |
| Bracket notation | Read dynamic property key | `user[fieldName]` |
| Optional chaining | Safe nested access | `user.address?.city` |
| Destructuring | Extract fields quickly | `const { name, role } = user` |
| Spread copy | Shallow copy/merge | update profile settings |
| `Object.keys` | Get property names | table headers/filter fields |
| `Object.values` | Get property values | summary panels |
| `Object.entries` | Key-value iteration | generic renderers |
| `Object.freeze` | Prevent modifications | protect constants/config |

### Real-world scenario

User profile object stores name, email, role, preferences, address, and methods like `getDisplayName()`.

Additional production scenarios:

- API response normalization before rendering UI
- Role-based access checks from user object
- Creating updated object state without mutating old state

### Flow diagram

```mermaid
flowchart LR
A[Raw User Object] --> B[Read Properties]
B --> C[Validate Required Fields]
C --> D[Render Profile]
```

### Code example 1: Create and read object

```js
const user = {
  name: "Nisha",
  role: "admin",
  isActive: true
};

console.log(user.name, user.role);
```

### Output

```txt
Nisha admin
```

### Code example 2: Dot vs bracket notation

```js
const product = {
  id: 101,
  name: "Notebook",
  price: 120
};

const dynamicKey = "price";

console.log(product.name);       // dot notation
console.log(product[dynamicKey]); // bracket notation
```

### Output

```txt
Notebook
120
```

### Code example 3: Nested object + optional chaining

```js
const order = {
  id: "ORD-1",
  customer: {
    name: "Nisha",
    address: { city: "Pune" }
  }
};

console.log(order.customer.address.city);
console.log(order.customer.contact?.phone);
```

### Output

```txt
Pune
undefined
```

### Code example 4: Destructuring

```js
const profile = {
  name: "Nisha",
  role: "editor",
  stats: { posts: 14 }
};

const { name, role } = profile;
const { posts } = profile.stats;
console.log(name, role, posts);
```

### Output

```txt
Nisha editor 14
```

### Code example 5: Immutable-style update with spread

```js
const state = {
  user: { name: "Nisha", city: "Pune" },
  theme: "light"
};

const nextState = {
  ...state,
  user: { ...state.user, city: "Mumbai" }
};

console.log(state.user.city);
console.log(nextState.user.city);
```

### Output

```txt
Pune
Mumbai
```

### Code example 6: Object iteration helpers

```js
const metrics = { users: 12, orders: 7, revenue: 4200 };

console.log(Object.keys(metrics));
console.log(Object.values(metrics));

for (const [key, value] of Object.entries(metrics)) {
  console.log(`${key}: ${value}`);
}
```

### Output

```txt
[ 'users', 'orders', 'revenue' ]
[ 12, 7, 4200 ]
users: 12
orders: 7
revenue: 4200
```

### Code example 7: `Object.freeze()` for protected configuration

```js
const config = Object.freeze({
  appName: "ShopEasy",
  version: "1.0.0"
});

config.version = "2.0.0"; // ignored in non-strict mode
console.log(config.version);
```

### Output

```txt
1.0.0
```

### Scenario checklist for objects

- Is object shape consistent across API responses?
- Are you mutating shared object by mistake?
- Do you need safe nested read (`?.`)?
- Should this update be immutable (spread/assign)?
- Are dynamic keys needed (bracket notation)?

### Edge cases

- Accessing missing nested property throws error without optional chaining
- Shallow copy can still share nested object references
- `Object.freeze()` is shallow, nested objects can still change
- Two objects with same content are not equal by reference (`{} === {}` is false)

### Common mistakes

- Mutating shared objects directly
- Assuming spread makes deep copy
- Using dot notation for dynamic keys (fails in many cases)
- Forgetting default value while destructuring optional fields

### Best practices

- Use optional chaining for safe reads
- Use object spread for safe shallow updates
- Prefer clear object schema and predictable property names
- Use `Object.entries` for generic key-value rendering
- Keep methods small and avoid mixing too much business logic in one object

### Summary

Objects represent real-world entities and structured application data. Mastering access, update, and safe-read patterns is essential for production JavaScript.

---

## 9. this, call, apply, bind

### What is it?

`this` points to the object context for function execution.

`call`, `apply`, and `bind` control what `this` should be.

- `call(thisArg, a, b)`
- `apply(thisArg, [a, b])`
- `bind(thisArg)` returns new function

### Real-world scenario

A shared invoice function should run for different customer objects by switching context.

### Flow diagram

```mermaid
flowchart TD
A[Shared Function] --> B[call/apply/bind]
B --> C[Attach this to target object]
C --> D[Execute with correct context]
```

### Code example

```js
const person = { name: "Nisha" };

function say(city) {
  console.log(`${this.name} from ${city}`);
}

say.call(person, "Pune");
```

### Output

```txt
Nisha from Pune
```

### Edge cases

- Arrow functions ignore `call/apply/bind` for `this`
- Losing method context when passing method as callback

### Common mistakes

- Using arrow function for object method expecting dynamic `this`

### Best practices

- Use normal function for methods needing dynamic `this`
- Use `bind` for event handler context stability

### Summary

Understanding `this` and binding methods prevents many advanced bugs.

---

## 10. Prototype and Classes

### What is it?

JavaScript uses prototype-based inheritance.

A prototype is an object that other objects can inherit from.

Class syntax is cleaner wrapper over prototypes.

Class features:

- constructor
- instance methods
- static methods
- inheritance using `extends`

### Real-world scenario

`Vehicle` base class defines common behavior; `Car` and `Bike` inherit and add specific behavior.

### Flow diagram

```mermaid
flowchart TD
A[Base Class / Prototype] --> B[Child Class]
B --> C[Inherited Methods]
C --> D[Override if needed]
```

### Code example

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

const u = new User("Karan");
console.log(u.greet());
```

### Output

```txt
Hello Karan
```

### Edge cases

- Forgetting `new` with constructor functions
- Confusing static methods with instance methods

### Common mistakes

- Creating duplicate methods inside constructor unnecessarily

### Best practices

- Put shared behavior on prototype or class methods
- Use classes for clear domain models

### Summary

Prototypes and classes are essential for reusable object-oriented design.

---

## 11. DOM and Events

### What is it?

DOM (Document Object Model) is browser representation of HTML as a tree of nodes.

You can:

- Select elements
- Modify content/styles/attributes
- Handle events like click, input, submit

Event propagation phases:

- Capturing
- Target
- Bubbling

Event delegation handles many child events using one parent listener.

### Real-world scenario

In a todo list:

- One click handler on list parent manages all delete buttons
- New items added later still work without new listeners

### Flow diagram

```mermaid
flowchart TD
A[User Click] --> B[Capture Phase]
B --> C[Target Element]
C --> D[Bubble Phase]
D --> E[Parent Handler Runs]
```

### Code example

```js
const btn = document.querySelector("#saveBtn");
btn.addEventListener("click", () => {
  console.log("Saved");
});
```

### Output

```txt
Saved
```

### Edge cases

- Event bubbling triggers parent unexpectedly
- Query selector returns null if element not loaded yet

### Common mistakes

- Adding too many individual listeners for list items
- Forgetting `event.preventDefault()` on form submit when needed

### Best practices

- Prefer event delegation in dynamic lists
- Register handlers after DOM is ready

### Summary

DOM and events connect user actions to JavaScript behavior.

---

## 12. Async JavaScript

### What is it?

Async JavaScript handles tasks that take time without freezing the UI.

Important parts:

- Callbacks
- `setTimeout` / `setInterval`
- Promises
- `async` / `await`
- Event loop and task queues

### Real-world scenario

When user opens dashboard:

- UI appears quickly
- API requests run in background
- Data cards update when response arrives

### Flow diagram

```mermaid
flowchart TD
A[Call async task] --> B[Browser/Web API handles timer or network]
B --> C[Task callback queued]
C --> D[Call stack empty?]
D -- Yes --> E[Event loop pushes callback]
E --> F[Callback executes]
```

### Code example

```js
console.log("Start");
setTimeout(() => console.log("Timer done"), 0);
console.log("End");
```

### Output

```txt
Start
End
Timer done
```

### Promise + async/await example

```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("A");
  await wait(100);
  console.log("B");
}

run();
```

### Output

```txt
A
B
```

### Edge cases

- Callback hell with deeply nested callbacks
- Unhandled promise rejection crashes flow

### Common mistakes

- Forgetting `await` before promise result
- Mixing callbacks and promises without clear pattern

### Best practices

- Prefer async/await for readability
- Use `try...catch` around awaited calls

### Summary

Async JavaScript keeps apps responsive and is mandatory for API-driven apps.

---

## 13. APIs, Fetch, Axios, and REST Basics

### What is it?

API is a contract to exchange data between client and server.

REST basics:

- GET: read data
- POST: create data
- PUT/PATCH: update data
- DELETE: remove data

`fetch` is browser-native HTTP client.
Axios is a popular external HTTP library.

### Real-world scenario

Product page calls GET `/products`; checkout calls POST `/orders`.

### Flow diagram

```mermaid
flowchart LR
A[Frontend Request] --> B[API Endpoint]
B --> C[Server Logic]
C --> D[JSON Response]
D --> E[Render UI]
```

### Code example (fetch)

```js
async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data.length);
}

getUsers();
```

### Output (example)

```txt
10
```

### Edge cases

- Network failure or timeout
- API returns non-200 status

### Common mistakes

- Not checking `res.ok` before parsing JSON
- Assuming API always returns expected shape

### Best practices

- Validate response status and schema
- Show user-friendly loading and error states

### Summary

API handling is a core real-world JavaScript skill.

---

## 14. Error Handling and Debugging

### What is it?

Error handling catches and manages failures safely.

Core tools:

- `try...catch...finally`
- `throw new Error(...)`
- browser DevTools
- stack trace analysis

### Real-world scenario

In payment flow, if gateway call fails, app should show retry message instead of blank screen.

### Flow diagram

```mermaid
flowchart TD
A[Run risky code] --> B{Error occurs?}
B -- No --> C[Continue normally]
B -- Yes --> D[Catch and handle]
D --> E[Log + user friendly message]
```

### Code example

```js
try {
  const data = JSON.parse("{ bad json }");
  console.log(data);
} catch (error) {
  console.log("Invalid JSON:", error.message);
}
```

### Output

```txt
Invalid JSON: Unexpected token b in JSON at position 2
```

### Edge cases

- Catching error but silently ignoring it
- Throwing string instead of Error object

### Common mistakes

- No error handling for async API calls

### Best practices

- Throw `Error` objects with meaningful messages
- Keep central logging for production issues

### Summary

Good error handling improves reliability and user trust.

---

## 15. Useful Built-ins: Date, Math, Map, Set

### What is it?

JavaScript provides built-in objects for common tasks.

- `Math`: calculations
- `Date`: time handling
- `Map`: key-value with any key type
- `Set`: unique values collection

### Real-world scenario

- Use Date for order timestamps
- Use Set to remove duplicate tags
- Use Map for fast lookup by object keys

### Flow diagram

```mermaid
flowchart LR
A[Input Data] --> B{Need uniqueness?}
B -- Yes --> C[Use Set]
B -- No --> D{Need key-value with custom keys?}
D -- Yes --> E[Use Map]
D -- No --> F[Use Object/Array]
```

### Code example

```js
const tags = ["js", "api", "js"];
const uniqueTags = [...new Set(tags)];
console.log(uniqueTags);
```

### Output

```txt
[ 'js', 'api' ]
```

### Edge cases

- Date parsing varies by input format
- Floating point math precision issues

### Common mistakes

- Using object where Map is better for frequent dynamic keys

### Best practices

- Use ISO date formats
- Use Set for uniqueness and Map for lookup-heavy logic

### Summary

Built-ins reduce code and improve clarity.

---

## 16. Modern JS Features (ES6+)

### What is it?

Modern JavaScript adds cleaner syntax and safer patterns.

Key features:

- Template literals
- Destructuring
- Rest parameter
- Spread operator
- Default parameters
- Optional chaining
- Nullish coalescing

### Real-world scenario

API response object can be safely read with optional chaining and defaults to avoid runtime crashes.

### Flow diagram

```mermaid
flowchart TD
A[Complex Object] --> B[Destructure needed fields]
B --> C[Use defaults for missing values]
C --> D[Render safe UI]
```

### Code example

```js
const user = { name: "Aman", address: { city: "Delhi" } };
const city = user.address?.city ?? "Unknown";
const { name } = user;
console.log(`${name} - ${city}`);
```

### Output

```txt
Aman - Delhi
```

### Edge cases

- Spread is shallow copy, not deep copy
- Destructuring undefined object throws error

### Common mistakes

- Overusing nested destructuring reducing readability

### Best practices

- Use features where they improve clarity
- Prefer readable over clever one-liners

### Summary

ES6+ features make code shorter, safer, and easier to maintain.

---

## 17. Interview Question Bank

### JavaScript Core

1. What is JavaScript and where can it run?
2. Explain execution context and call stack.
3. Difference between `var`, `let`, and `const`.
4. What is TDZ?
5. Difference between `==` and `===`.

### Functions

1. Function declaration vs function expression.
2. Arrow function vs normal function.
3. What is callback function?
4. What is higher-order function?
5. Explain closure with practical example.
6. Explain currying with practical example.

### Objects and OOP

1. What is prototype chain?
2. Difference between constructor function and class.
3. Explain `this` keyword in different contexts.
4. Explain `call`, `apply`, and `bind`.

### DOM and Events

1. What is event bubbling and capturing?
2. What is event delegation and why use it?
3. Difference between `innerText` and `textContent`.

### Async and API

1. Explain event loop.
2. Callback vs Promise vs async/await.
3. What is promise chaining?
4. How do you handle API errors in fetch?
5. Difference between fetch and axios.

---

## 18. Final Learning Roadmap

### Concept coverage aligned with your notes collection

This guide now includes concepts reflected in your JS notes set, including:

- Variables, datatypes, arrays, objects, operators, loops
- Hoisting, scope, functions, callbacks, IIFE, recursion
- Closures, currying, higher-order functions
- `this`, `call`, `apply`, `bind`
- Prototype, classes, inheritance, static behavior
- DOM manipulation, event propagation, event delegation
- Async basics, timers, promises, async/await
- REST API, fetch, axios, and error handling
- Date, Math, Map, Set, and modern ES6 features

### Recommended learning order

1. Runtime model and variables
2. Functions and arrays
3. Objects and `this`
4. Prototype and classes
5. DOM and events
6. Async JavaScript and APIs
7. Error handling and real project patterns

> [!TIP]
> For interview preparation, do not only read definitions. Practice by writing and dry-running each concept with small code snippets.

> [!WARNING]
> Real-world bugs usually happen because of scope confusion, async timing issues, or context (`this`) mistakes. Practice these deeply.

> [!INFO]
> Use Mermaid diagrams in this file as visual memory anchors when revising concepts quickly.


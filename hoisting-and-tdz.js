// let
// const
// var

{
  //? 1.

  console.log(hoistedVarValue);
  var hoistedVarValue = 10;
  console.log(hoistedVarValue);

  // output
  // undefined
  // 10

  // ? Reason
  // var hoistedVarValue;
  // console.log(hoistedVarValue);
  // hoistedVarValue = 10;
  // console.log(hoistedVarValue);
}

{
  //? 2

  console.log(blockScopedValue);
  let blockScopedValue = 10;
  // ReferenceError
  // ? Reason
  // let is hoisted but remains in the Temporal Dead Zone (TDZ) until initialized.
}

{
  //? 3
  var outerValue = 10;

  function printFunctionScopedHoisting() {
    console.log(outerValue);
    var outerValue = 20;
  }

  printFunctionScopedHoisting();

  //undefined
}

{
  let globalScopedValue = 10;

  function printOuterScopeValue() {
    console.log(globalScopedValue);
  }

  printOuterScopeValue();

  // 10
}

{
  var outerScopedVar = 10;

  function demonstrateTdzInFunction() {
    console.log(outerScopedVar);
    let outerScopedVar = 20;
  }

  demonstrateTdzInFunction();

  // ReferenceError: Cannot access 'a' before initialization
}

{
  console.log(declaredGreeter);

  function declaredGreeter() {
    console.log("Hello");
  }
  // [Function: declaredGreeter]
}

{
  console.log(expressionGreeter);

  var expressionGreeter = function () {
    console.log("Hello");
  };

  // undefined
}

{
  expressionGreeter();

  var expressionGreeter = function () {
    console.log("Hello");
  };
  //   TypeError: expressionGreeter is not a function
}

{
  var moduleLevelValue = 10;

  function printModuleLevelValue() {
    console.log(moduleLevelValue);
  }

  function callFromDifferentScope() {
    var moduleLevelValue = 20;
    printModuleLevelValue();
  }

  callFromDifferentScope(); // 10
}

{
  var outerScopeValue = 10;

  function runNestedScopeDemo() {
    var innerScopeValue = 20;
    function printInnerScopeValue() {
      console.log(innerScopeValue);
    }
    printInnerScopeValue();
  }

  runNestedScopeDemo(); // 20
}

{
  for (var loopIndex = 0; loopIndex < 5; loopIndex++) {
    setTimeout(() => {
      console.log(loopIndex);
    }, 0);
  }

  //   5;
  //   5;
  //   5;
  //   5;
  //   5;
  //? Reason: var has function scope, so all callbacks share the same loopIndex. After the loop ends, loopIndex is 5.
}

{
  for (let loopIndex = 0; loopIndex < 5; loopIndex++) {
    setTimeout(() => {
      console.log(loopIndex);
    }, 0);
  }

  //   0;
  //   1;
  //   2;
  //   3;
  //   4;
}

{
  for (var loopIndex = 0; loopIndex < 5; loopIndex++) {
    (function (capturedIndex) {
        setTimeout(() => {
          console.log(capturedIndex);
        }, 0);
    })(loopIndex);
  }

  //   0;
  //   1;
  //   2;
  //   3;
  //   4;
}

// let
// const
// var

{
  //? 1.

  console.log(a);
  var a = 10;
  console.log(a);

  // output
  // undefined
  // 10

  // ? Reason
  // var a;
  // console.log(a);
  // a = 10;
  // console.log(a);
}

{
  //? 2

  console.log(a);
  let a = 10;
  // ReferenceError
  // ? Reason
  // let is hoisted but remains in the Temporal Dead Zone (TDZ) until initialized.
}

{
  //? 3
  var a = 10;

  function test() {
    console.log(a);
    var a = 20;
  }

  test();

  //undefined
}

{
  let a = 10;

  function test() {
    console.log(a);
  }

  test();

  // 10
}

{
  var a = 10;

  function test() {
    console.log(a);
    let a = 20;
  }

  test();

  // ReferenceError: Cannot access 'a' before initialization
}

{
  console.log(a);

  function a() {
    console.log("Hello");
  }
  // [Function: a]
}

{
  console.log(test);

  var test = function () {
    console.log("Hello");
  };

  // undefined
}

{
  test();

  var test = function () {
    console.log("Hello");
  };
  //   TypeError: test is not a function
}

{
  var a = 10;

  function test() {
    console.log(a);
  }

  function demo() {
    var a = 20;
    test();
  }

  demo(); // 10
}

{
  var a = 10;

  function demo() {
    var a = 20;
    function test() {
      console.log(a);
    }
    test();
  }

  demo(); // 20
}

{
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }

  //   5;
  //   5;
  //   5;
  //   5;
  //   5;
  //? Reason: var has function scope, so all callbacks share the same i. After the loop ends, i is 5.
}

{
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }

  //   0;
  //   1;
  //   2;
  //   3;
  //   4;
}

{
  for (var i = 0; i < 5; i++) {
    (function(x){
        setTimeout(() => {
          console.log(x);
        }, 0);
    })(i)
  }

  //   0;
  //   1;
  //   2;
  //   3;
  //   4;
}

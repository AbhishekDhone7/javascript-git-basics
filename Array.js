//? Array Methods

{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.push(7);
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.pop();
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.shift();
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.unshift(7);
  console.log(opration);
  console.log(array);
}

{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.map((cv, i, array) => {
    return cv * 2;
  });
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.filter((cv, i, array) => {
    return cv % 2 !== 0;
  });
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.forEach((cv, i, array) => {
    return cv * 2;
  });
  console.log(opration);
  console.log(array);
}
{
  let array = ["Suraj", "Abhishek", "Chaitany"];
  let opration = array.sort();
  //   .reverse();
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 13, 4, 5, 16, 3, 4, 5, 6];
  let opration = array.sort((a, b) => a - b); // -> (a,b) =>  b - a
  console.log(opration);
  console.log(array);
}
{
  let array = [
    {
      empId: 123,
      name: "Charlie",
      location: "NYC",
    },
    {
      empId: 234,
      name: "Bob",
      location: "WDC",
    },
    {
      empId: 432,
      name: "Alice",
      location: "Wonderland",
    },
  ];
  let opration = array.sort((a, b) => a.name.localeCompare(b.name));
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
//   let opration = array.splice(1,3);
  let opration = array.splice(1,3,7,8);
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.slice(1,4);
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.every((cv, i ,array) => {
    return cv < 7
    // return cv < 5
  });
  console.log(opration);
  console.log(array);
}
{
  let array = [1, 2, 3, 4, 5, 6];
  let opration = array.some((cv, i ,array) => {
    // return cv < 7
    return cv < 2
  });
  console.log(opration);
  console.log(array);
}
{
  let array = [
    {
        id: 1,
        name: "Abhishek"
    },
    {
        id: 2,
        name: "Rohit"
    },
    {
        id: 3,
        name: "Shubham"
    },
    {
        id: 4,
        name: "Sagar"
    },
  ];
  let opration = array.find((cv, i ,array) => {
    // return cv.id === 2
    return cv.id > 2
  });
  console.log(opration);
  console.log(array);
}
{
  let array = [
    {
        id: 1,
        price: 10_000
    },
    {
        id: 2,
        price: 10_100
    },
    {
        id: 3,
        price: 20_000
    },
    {
        id: 4,
        price: 10_030
    },
  ];
  let opration = array.reduce((acc, cv, i ,array) => {
    return acc + cv.price
  }, 0);
  console.log(opration);
  console.log(array);
}



//? Array Methods

{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.join(" ");
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.push(7);
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.pop();
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.shift();
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.unshift(7);
  console.log(operationResult);
  console.log(numbers);
}

{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.map((currentValue) => {
    return currentValue * 2;
  });
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.filter((currentValue) => {
    return currentValue % 2 !== 0;
  });
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.forEach((currentValue) => {
    return currentValue * 2;
  });
  console.log(operationResult);
  console.log(numbers);
}
{
  let names = ["Suraj", "Abhishek", "Chaitany"];
  let operationResult = names.sort();
  //   .reverse();
  console.log(operationResult);
  console.log(names);
}
{
  let numbers = [1, 2, 13, 4, 5, 16, 3, 4, 5, 6];
  let operationResult = numbers.sort((leftValue, rightValue) => leftValue - rightValue); // -> (leftValue, rightValue) => rightValue - leftValue
  console.log(operationResult);
  console.log(numbers);
}
{
  let employees = [
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
  let operationResult = employees.sort((leftEmployee, rightEmployee) => leftEmployee.name.localeCompare(rightEmployee.name));
  console.log(operationResult);
  console.log(employees);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  //   let operationResult = numbers.splice(1, 3);
  let operationResult = numbers.splice(1, 3, 7, 8);
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.slice(1, 4);
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.every((currentValue) => {
    return currentValue < 7;
    // return currentValue < 5
  });
  console.log(operationResult);
  console.log(numbers);
}
{
  let numbers = [1, 2, 3, 4, 5, 6];
  let operationResult = numbers.some((currentValue) => {
    // return currentValue < 7
    return currentValue < 2;
  });
  console.log(operationResult);
  console.log(numbers);
}
{
  let users = [
    {
      id: 1,
      name: "Abhishek",
    },
    {
      id: 2,
      name: "Rohit",
    },
    {
      id: 3,
      name: "Shubham",
    },
    {
      id: 4,
      name: "Sagar",
    },
  ];
  let operationResult = users.find((currentUser) => {
    // return currentUser.id === 2
    return currentUser.id > 2;
  });
  console.log(operationResult);
  console.log(users);
}
{
  let products = [
    {
      id: 1,
      price: 10_000,
    },
    {
      id: 2,
      price: 10_100,
    },
    {
      id: 3,
      price: 20_000,
    },
    {
      id: 4,
      price: 10_030,
    },
  ];
  let operationResult = products.reduce((totalPrice, currentProduct) => {
    return totalPrice + currentProduct.price;
  }, 0);
  console.log(operationResult);
  console.log(products);
}

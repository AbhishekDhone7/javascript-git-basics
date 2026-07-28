/*
  Topic: Returning Multiple Values (Array and Object)
  Difficulty: Beginner
  Primary Concept: Return a container (array/object) and unpack it with destructuring
*/

function getNamesAsArray() {
  const firstName = "John";
  const lastName = "Doe";

  return [firstName, lastName];
}

const namesArray = getNamesAsArray();
const [arrayFirstName, arrayLastName] = getNamesAsArray();
const firstNameFromIndex = namesArray[0];
const lastNameFromIndex = namesArray[1];

console.log("Returned array:", namesArray);
console.log("Index-based array access:", firstNameFromIndex, lastNameFromIndex);
console.log("Destructured array values:", arrayFirstName, arrayLastName);

function getNamesAsObject() {
  const firstName = "John";
  const lastName = "Doe";

  return { firstName, lastName };
}

const namesObject = getNamesAsObject();
const { firstName, lastName } = getNamesAsObject();
const firstNameNormal = namesObject.firstName;
const lastNameNormal = namesObject.lastName;

// Alias syntax allows different local variable names.
const { firstName: firstNameAlias, lastName: lastNameAlias } = getNamesAsObject();

console.log("Returned object:", namesObject);
console.log("Normal object access:", firstNameNormal, lastNameNormal);
console.log("Destructured object values:", firstName, lastName);
console.log("Destructured aliases:", firstNameAlias, lastNameAlias);

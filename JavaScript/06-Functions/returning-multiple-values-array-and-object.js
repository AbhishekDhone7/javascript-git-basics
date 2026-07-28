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

console.log("Returned array:", namesArray);
console.log("Destructured array values:", arrayFirstName, arrayLastName);

function getNamesAsObject() {
  const firstName = "John";
  const lastName = "Doe";

  return { firstName, lastName };
}

const namesObject = getNamesAsObject();
const { firstName, lastName } = getNamesAsObject();

console.log("Returned object:", namesObject);
console.log("Normal object access:", namesObject.firstName, namesObject.lastName);
console.log("Destructured object values:", firstName, lastName);

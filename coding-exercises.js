{
  // 1. Reverse a String
  // "abcd" -> "dcba"

  //? Solution 1

  function reverseStringUsingBuiltIns(inputText) {
    return inputText.split("").reverse().join("");
  }
  console.log(reverseStringUsingBuiltIns("abcdef"));

  //? Solution 2

  function reverseStringUsingLoop(inputText) {
    let reversedText = "";
    for (let charIndex = inputText.length - 1; charIndex >= 0; charIndex--) {
      reversedText = reversedText + inputText[charIndex];
    }
    return reversedText;
  }
  console.log(reverseStringUsingLoop("abcdef"));

  //? Solution 3

  function reverseStringUsingRecursion(inputText) {
    if (inputText === "") return "";
    return reverseStringUsingRecursion(inputText.slice(1)) + inputText[0];

    // bcdef + a
    // cdef + a + b
  }
  console.log(reverseStringUsingRecursion("abcdef"));

  //   for arry sort using reverce

  function reverseArrayUsingReduceRight(numbers) {
    return numbers.reduceRight((reversedValues, currentValue) => {
      reversedValues.push(currentValue);
      return reversedValues;
    }, []);
  }
  console.log(reverseArrayUsingReduceRight([10, 5, 25, 40, 15]));
}
{
  // 1. Check Palindrome
  // "madam" <-> "madam"

  //? Solution 1
  function isPalindromeUsingReverse(inputText) {
    return inputText === inputText.split("").reverse().join("");
  }
  console.log(isPalindromeUsingReverse("abcdef"));
  console.log(isPalindromeUsingReverse("madam"));

  //? Solution 2

  function isPalindromeUsingLoop(inputText) {
    let reversedText = "";
    for (let charIndex = inputText.length - 1; charIndex >= 0; charIndex--) {
      reversedText = reversedText + inputText[charIndex];
    }
    return reversedText === inputText;
  }
  console.log(isPalindromeUsingLoop("abcdef"));
  console.log(isPalindromeUsingLoop("madam"));
}
{
  // 1. Find the Largest Number in an Array
  //   Input: [10, 5, 25, 40, 15];
  //   Output: 40;

  //? Solution 1
  function findLargestUsingSort(numbers) {
    return numbers.sort((leftValue, rightValue) => rightValue - leftValue)[0];
  }
  console.log(findLargestUsingSort([10, 5, 25, 40, 15]));

  //? Solution 2

  function findLargestUsingLoop(numbers) {
    let largestNumber = numbers[0];
    for (let index = 0; index < numbers.length; index++) {
      if (largestNumber < numbers[index]) {
        largestNumber = numbers[index];
      }
    }

    return largestNumber;
  }
  console.log(findLargestUsingLoop([10, 5, 25, 40, 15]));

  //? 3 Math.max(...[])

  //! BubbleSort usefull for max, min, second Used only for sorting array

  function bubbleSortDescending(numbers) {
    for (let leftIndex = 0; leftIndex < numbers.length; leftIndex++) {
      for (let rightIndex = 0; rightIndex < numbers.length; rightIndex++) {
        if (numbers[leftIndex] > numbers[rightIndex]) {
          let tempValue = numbers[leftIndex];
          numbers[leftIndex] = numbers[rightIndex];
          numbers[rightIndex] = tempValue;
        }
      }
    }
    return numbers;
  }
  console.log(bubbleSortDescending([10, 5, 25, 40, 15]));
}

// 5. Remove Duplicates from an Array

// ?1
function removeDuplicatesUsingSet(numbers) {
  return [...new Set(numbers)];
}

console.log(removeDuplicatesUsingSet([1, 2, 2, 3, 4, 4, 5]));

// ?2

function removeDuplicatesUsingFilter(numbers) {
  return numbers.filter((currentValue, index) => numbers.indexOf(currentValue) === index);
}

console.log(removeDuplicatesUsingFilter([1, 2, 2, 3, 4, 4, 5]));

//? 3

function removeDuplicatesUsingLoop(numbers) {
  let uniqueNumbers = [];

  for (let index = 0; index < numbers.length; index++) {
    if (!uniqueNumbers.includes(numbers[index])) {
      uniqueNumbers.push(numbers[index]);
    }
  }
  return uniqueNumbers;
}

console.log(removeDuplicatesUsingLoop([1, 2, 2, 3, 4, 4, 5]));

//? 4

function removeDuplicatesUsingReduce(numbers) {
  return numbers.reduce((uniqueNumbers, currentValue) => {
    if (!uniqueNumbers.includes(currentValue)) uniqueNumbers.push(currentValue);
    return uniqueNumbers;
  }, []);
}

console.log(removeDuplicatesUsingReduce([1, 2, 2, 3, 4, 4, 5]));

// 6. Count Character Frequency

// Input: "javascript"

// Output:
// {
//   j:1,
//   a:2,
//   v:1,
//   s:1,
//   c:1,
//   r:1,
//   i:1,
//   p:1,
//   t:1
// }

function getCharacterFrequencyUsingReduce(inputText) {
  return inputText.split("").reduce((frequencyMap, currentCharacter) => {
    if (!frequencyMap[currentCharacter]) {
      frequencyMap[currentCharacter] = 1;
    } else {
      frequencyMap[currentCharacter] = frequencyMap[currentCharacter] + 1;
    }
    return frequencyMap;
  }, {});
}
console.log(getCharacterFrequencyUsingReduce("javascript"));

function getCharacterFrequencyUsingLoop(inputText) {
  let frequencyMap = {};
  for (let index = 0; index < inputText.length; index++) {
    let currentCharacter = inputText[index];
    if (!frequencyMap[currentCharacter]) {
      frequencyMap[currentCharacter] = 1;
    } else {
      frequencyMap[currentCharacter] = frequencyMap[currentCharacter] + 1;
    }
  }
  return frequencyMap;
}
console.log(getCharacterFrequencyUsingLoop("javascript"));

let userRecord = {};
console.log(userRecord.name);

console.log(Boolean(undefined));

// 7. Find the Missing Number in an Array
// Problem

// Given an array containing numbers from 1 to n, with one number missing, find the missing number.
// Input: [1, 2, 3, 5]
// n = 5

// Output: 4

// 1 + 2 + 3 + 4 + 5 = 15

function calculateSumFromOneToN(maxNumber) {
  if (maxNumber === 1) return 1;
  return maxNumber + calculateSumFromOneToN(maxNumber - 1);
}

function findMissingNumber(numbers, maxNumber) {
  const expectedTotal = calculateSumFromOneToN(maxNumber); // 15
  const actualTotal = numbers.reduce((runningTotal, currentValue) => runningTotal + currentValue); // 11
  return expectedTotal - actualTotal;
}

console.log(findMissingNumber([1, 2, 3, 5], 5));



// 9. Check if Two Strings are Anagrams
// Problem

// Two strings are anagrams if they contain the same characters with the same frequency, but in a different order.

// Example

// Input:
// str1 = "listen"
// str2 = "silent"

// Output:
// true



function areAnagrams(firstText, secondText) {
  if (firstText.length !== secondText.length) return false;
  console.log(firstText.split("").sort().join(""));
  console.log(secondText.split("").sort().join(""));

  return firstText.split("").sort().join("") === secondText.split("").sort().join("");
}
console.log(areAnagrams("listenfgd", "silent"));


// 10. Factorial of a Number
// Problem
// Find the factorial of a given number.
// Example
// Input: 5
// Output: 120




// 11. Fibonacci Series
// Problem
// Write a function to print the Fibonacci series up to n terms.
// Example
// Input: 7
// Output:
// 0 1 1 2 3 5 8


// 12. Check Prime Number
// Problem
// Write a function to check whether a number is prime.
// Example
// Input: 17
// Output:
// true


// 13. Reverse Words in a Sentence
// Problem
// Reverse the order of words in a sentence.
// Example
// Input:
// "I love JavaScript"
// Output:
// "JavaScript love I"

// 15. Reverse Each Word in a Sentence
// Problem
// Reverse every word in a sentence while keeping the word order the same.
// Example
// Input:
// "I love JavaScript"
// Output:
// "I evol tpircSavaJ"
let sentence = "I love JavaScript";
let words = [];
let currentWord = "";
for (let charIndex = 0; charIndex < sentence.length; charIndex++) {
  if (sentence.length - 1 === charIndex) {
    // console.log(currentWord)
    currentWord = currentWord + sentence[charIndex];
    words.push(currentWord);
    currentWord = null;
  } else if (sentence[charIndex] === " ") {
    // console.log("Word => ", currentWord)
    words.push(currentWord);
    // console.log("Array => ", words)
    currentWord = "";
  } else {
    currentWord = currentWord + sentence[charIndex];
  }
}

console.log(words);

// 14. Count Vowels in a String
// Problem
// Count the number of vowels (a, e, i, o, u) in a string.
// Example
// Input:
// "JavaScript"
// Output:
// 3



// 16. Move All Zeros to the End
// Problem
// Move all 0s to the end of the array while maintaining the order of non-zero elements.
// Example
// Input:
// [0,1,0,3,12]
// Output:
// [1,3,12,0,0]


// 21. Longest Common Prefix
// Problem
// Find the longest common prefix string amongst an array of strings.
// Example
// Input:
// ["flower", "flow", "flight"]
// Output:
// "fl"



// 22] Flatten array and Object
// [1,[2,[3,[,4,[5,[6]]]]]] -> [1,2,3,4,5,6]

// {a: " ", {b{c{d}}}} -> {a: "",b,c,d}
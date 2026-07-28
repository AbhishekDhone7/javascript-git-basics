{
  // 1. Reverse a String
  // "abcd" -> "dcba"

  //? Solution 1

  function revStr(str) {
    return str.split("").reverse().join("");
  }
  console.log(revStr("abcdef"));

  //? Solution 2

  function revStr2(str) {
    let result = "";
    for (let i = str.length - 1; i >= 0; i--) {
      result = result + str[i];
    }
    return result;
  }
  console.log(revStr2("abcdef"));

  //? Solution 3

  function revStr3(str) {
    if (str === "") return "";
    return revStr3(str.slice(1)) + str[0];

    // bcdef + a
    // cdef + a + b
  }
  console.log(revStr3("abcdef"));

  //   for arry sort using reverce

  function sortUsingReduce(arr) {
    return arr.reduceRight((acc, cv) => {
      acc.push(cv);
      return acc;
    }, []);
  }
  console.log(sortUsingReduce([10, 5, 25, 40, 15]));
}
{
  // 1. Check Palindrome
  // "madam" <-> "madam"

  //? Solution 1
  function palindrome2(str) {
    return str === str.split("").reverse().join("");
  }
  console.log(palindrome2("abcdef"));
  console.log(palindrome2("madam"));

  //? Solution 2

  function palindrome2(str) {
    let result = "";
    for (let i = str.length - 1; i >= 0; i--) {
      result = result + str[i];
    }
    return result === str;
  }
  console.log(palindrome2("abcdef"));
  console.log(palindrome2("madam"));
}
{
  // 1. Find the Largest Number in an Array
  //   Input: [10, 5, 25, 40, 15];
  //   Output: 40;

  //? Solution 1
  function findLargest(arr) {
    return arr.sort((a, b) => b - a)[0];
  }
  console.log(findLargest([10, 5, 25, 40, 15]));

  //? Solution 2

  function findLargest(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
      if (max < arr[i]) {
        max = arr[i];
      }
    }

    return max;
  }
  console.log(findLargest([10, 5, 25, 40, 15]));

  //? 3 Math.max(...[])

  //! BubbleSort usefull for max, min, second Used only for sorting array

  function BubboleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }
  console.log(BubboleSort([10, 5, 25, 40, 15]));
}

// 5. Remove Duplicates from an Array

// ?1
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));

// ?2

function removeDuplicates(arr) {
  return arr.filter((cv, i) => arr.indexOf(cv) === i);
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));

//? 3

function removeDuplicates(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));

//? 4

function removeDuplicates(arr) {
  return arr.reduce((acc, cv) => {
    if (!acc.includes(cv)) acc.push(cv);
    return acc;
  }, []);
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));

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

function frequency(str) {
  return str.split("").reduce((acc, cv) => {
    if (!acc[cv]) {
      acc[cv] = 1;
    } else {
      acc[cv] = acc[cv] + 1;
    }
    return acc;
  }, {});
}
console.log(frequency("javascript"));

function frequency(str) {
  let acc = {};
  for (let i = 0; i < str.length; i++) {
    let cv = str[i];
    if (!acc[cv]) {
      acc[cv] = 1;
    } else {
      acc[cv] = acc[cv] + 1;
    }
  }
  return acc;
}
console.log(frequency("javascript"));

let obj = {};
console.log(obj.name);

console.log(Boolean(undefined));

// 7. Find the Missing Number in an Array
// Problem

// Given an array containing numbers from 1 to n, with one number missing, find the missing number.
// Input: [1, 2, 3, 5]
// n = 5

// Output: 4

// 1 + 2 + 3 + 4 + 5 = 15

function findSum(n) {
  if (n === 1) return 1;
  return n + findSum(n - 1);
}

function findMissingNumber(arr, n) {
  const sum = findSum(n); // 15
  const total = arr.reduce((acc, cv) => acc + cv); // 11
  return sum - total;
}

console.log(findMissingNumber([1, 2, 3, 5], 5))



// 9. Check if Two Strings are Anagrams
// Problem

// Two strings are anagrams if they contain the same characters with the same frequency, but in a different order.

// Example

// Input:
// str1 = "listen"
// str2 = "silent"

// Output:
// true



function inAnagram(str1,str2){
  if(str1.length !== str2.length) return false;
  console.log(str1.split("").sort().join(""));
  console.log(str2.split("").sort().join(""));

  return str1.split("").sort().join("") === str2.split("").sort().join("");
}
console.log(inAnagram("listenfgd" , "silent") )


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
let str = "I love JavaScript"
let result = []
let word = ""
for(let i = 0; i <  str.length; i++){
  if(str.length - 1 === i) {
    // console.log(word)
    word = word + str[i]
    result.push(word);
    word = null;
  }else if (str[i] === " ") {
    // console.log("Word => ", word)
    result.push(word);
    // console.log("Array => ", result)
    word = ""
  } else {
    word = word + str[i]
  }
}

console.log(result)

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
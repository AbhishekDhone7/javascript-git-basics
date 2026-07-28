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
        acc.push(cv)
        return acc
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
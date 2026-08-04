"use strict";

// 1. Reverse a string: "abcd" -> "dcba"
{
  const usingBuiltIns = (text) => [...text].reverse().join("");
  const usingReduce = (text) => [...text].reduce((result, character) => character + result, "");
  function usingLoop(text) {
    let result = "";
    for (const character of text) result = character + result;
    return result;
  }
  function usingRecursion(text) {
    return text.length <= 1 ? text : usingRecursion(text.slice(1)) + text[0];
  }
  console.log("1. Reverse string:", [usingBuiltIns("abcd"), usingLoop("abcd"), usingReduce("abcd"), usingRecursion("abcd")]);
}

// 2. Check a palindrome: "madam" -> true
{
  const usingReverse = (text) => text === [...text].reverse().join("");
  const usingEvery = (text) => [...text].every((character, index) => character === text[text.length - 1 - index]);
  function usingTwoPointers(text) {
    for (let left = 0, right = text.length - 1; left < right; left++, right--) {
      if (text[left] !== text[right]) return false;
    }
    return true;
  }
  function usingRecursion(text) {
    return text.length <= 1 || (text[0] === text.at(-1) && usingRecursion(text.slice(1, -1)));
  }
  console.log("2. Palindrome:", [usingReverse("madam"), usingTwoPointers("madam"), usingEvery("madam"), usingRecursion("madam")]);
}

// 3. Find the largest number: [10, 5, 25, 40, 15] -> 40
{
  const usingMathMax = (numbers) => Math.max(...numbers);
  const usingReduce = (numbers) => numbers.reduce((largest, number) => Math.max(largest, number), -Infinity);
  const usingSort = (numbers) => [...numbers].sort((left, right) => right - left)[0];
  function usingLoop(numbers) {
    let largest = -Infinity;
    for (const number of numbers) if (number > largest) largest = number;
    return largest;
  }
  const input = [10, 5, 25, 40, 15];
  console.log("3. Largest:", [usingMathMax(input), usingLoop(input), usingReduce(input), usingSort(input)]);
}

// 4. Remove duplicates: [1, 2, 2, 3] -> [1, 2, 3]
{
  const usingSet = (numbers) => [...new Set(numbers)];
  const usingFilter = (numbers) => numbers.filter((number, index) => numbers.indexOf(number) === index);
  const usingReduce = (numbers) => numbers.reduce((unique, number) => unique.includes(number) ? unique : [...unique, number], []);
  function usingLoop(numbers) {
    const unique = [];
    for (const number of numbers) if (!unique.includes(number)) unique.push(number);
    return unique;
  }
  const input = [1, 2, 2, 3, 4, 4, 5];
  console.log("4. Remove duplicates:", [usingSet(input), usingFilter(input), usingLoop(input), usingReduce(input)]);
}

// 5. Count character frequency: "javascript" -> { j: 1, a: 2, ... }
{
  function usingLoop(text) {
    const counts = {};
    for (const character of text) counts[character] = (counts[character] ?? 0) + 1;
    return counts;
  }
  const usingReduce = (text) => [...text].reduce((counts, character) => ({ ...counts, [character]: (counts[character] ?? 0) + 1 }), {});
  function usingMap(text) {
    const counts = new Map();
    for (const character of text) counts.set(character, (counts.get(character) ?? 0) + 1);
    return Object.fromEntries(counts);
  }
  function usingForEach(text) {
    const counts = {};
    [...text].forEach((character) => counts[character] = (counts[character] ?? 0) + 1);
    return counts;
  }
  console.log("5. Character frequency:", [usingLoop("javascript"), usingReduce("javascript"), usingMap("javascript"), usingForEach("javascript")]);
}

// 6. Find the missing number from 1 to n: [1, 2, 3, 5], n = 5 -> 4
{
  const usingSum = (numbers, maximum) => maximum * (maximum + 1) / 2 - numbers.reduce((total, number) => total + number, 0);
  function usingSet(numbers, maximum) {
    const values = new Set(numbers);
    for (let number = 1; number <= maximum; number++) if (!values.has(number)) return number;
  }
  function usingSort(numbers, maximum) {
    const sorted = [...numbers].sort((left, right) => left - right);
    for (let index = 0; index < maximum; index++) if (sorted[index] !== index + 1) return index + 1;
  }
  function usingXor(numbers, maximum) {
    let result = maximum;
    for (let index = 0; index < numbers.length; index++) result ^= numbers[index] ^ (index + 1);
    return result;
  }
  const input = [1, 2, 3, 5];
  console.log("6. Missing number:", [usingSum(input, 5), usingSet(input, 5), usingSort(input, 5), usingXor(input, 5)]);
}

// 7. Check anagrams: "listen", "silent" -> true
{
  const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const usingSort = (first, second) => [...normalize(first)].sort().join("") === [...normalize(second)].sort().join("");
  function usingFrequency(first, second) {
    const firstText = normalize(first);
    const secondText = normalize(second);
    if (firstText.length !== secondText.length) return false;
    const counts = {};
    for (const character of firstText) counts[character] = (counts[character] ?? 0) + 1;
    for (const character of secondText) if (!counts[character]--) return false;
    return true;
  }
  function usingMap(first, second) {
    const counts = new Map();
    for (const character of normalize(first)) counts.set(character, (counts.get(character) ?? 0) + 1);
    for (const character of normalize(second)) counts.set(character, (counts.get(character) ?? 0) - 1);
    return [...counts.values()].every((count) => count === 0);
  }
  function usingCharacterRemoval(first, second) {
    let remaining = normalize(second);
    for (const character of normalize(first)) {
      const index = remaining.indexOf(character);
      if (index === -1) return false;
      remaining = remaining.slice(0, index) + remaining.slice(index + 1);
    }
    return remaining.length === 0;
  }
  console.log("7. Anagrams:", [usingSort("listen", "silent"), usingFrequency("listen", "silent"), usingMap("listen", "silent"), usingCharacterRemoval("listen", "silent")]);
}

// 8. Calculate a factorial: 5 -> 120
{
  function usingForLoop(number) {
    let result = 1;
    for (let factor = 2; factor <= number; factor++) result *= factor;
    return result;
  }
  function usingWhileLoop(number) {
    let result = 1;
    while (number > 1) result *= number--;
    return result;
  }
  const usingReduce = (number) => Array.from({ length: number }, (_, index) => index + 1).reduce((result, factor) => result * factor, 1);
  const usingRecursion = (number) => number <= 1 ? 1 : number * usingRecursion(number - 1);
  console.log("8. Factorial:", [usingForLoop(5), usingWhileLoop(5), usingReduce(5), usingRecursion(5)]);
}

// 9. Generate n Fibonacci terms: 7 -> [0, 1, 1, 2, 3, 5, 8]
{
  function usingForLoop(count) {
    const values = [];
    for (let index = 0; index < count; index++) values.push(index < 2 ? index : values[index - 1] + values[index - 2]);
    return values;
  }
  function usingWhileLoop(count) {
    const values = [];
    let first = 0;
    let second = 1;
    while (values.length < count) {
      values.push(first);
      [first, second] = [second, first + second];
    }
    return values;
  }
  function usingArrayFrom(count) {
    const values = [];
    return Array.from({ length: count }, (_, index) => values[index] = index < 2 ? index : values[index - 1] + values[index - 2]);
  }
  function usingRecursion(count, values = [0, 1]) {
    if (count <= 0) return [];
    if (count === 1) return [0];
    if (values.length === count) return values;
    values.push(values.at(-1) + values.at(-2));
    return usingRecursion(count, values);
  }
  console.log("9. Fibonacci:", [usingForLoop(7), usingWhileLoop(7), usingArrayFrom(7), usingRecursion(7)]);
}

// 10. Check a prime number: 17 -> true
{
  function usingLoop(number) {
    if (number < 2) return false;
    for (let divisor = 2; divisor <= Math.sqrt(number); divisor++) if (number % divisor === 0) return false;
    return true;
  }
  function usingEvery(number) {
    if (number < 2) return false;
    return Array.from({ length: Math.max(0, Math.floor(Math.sqrt(number)) - 1) }, (_, index) => index + 2).every((divisor) => number % divisor !== 0);
  }
  function usingRecursion(number, divisor = 2) {
    if (number < 2) return false;
    if (divisor > Math.sqrt(number)) return true;
    return number % divisor !== 0 && usingRecursion(number, divisor + 1);
  }
  function usingSixStep(number) {
    if (number <= 3) return number > 1;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let divisor = 5; divisor * divisor <= number; divisor += 6) {
      if (number % divisor === 0 || number % (divisor + 2) === 0) return false;
    }
    return true;
  }
  console.log("10. Prime:", [usingLoop(17), usingEvery(17), usingRecursion(17), usingSixStep(17)]);
}

// 11. Reverse word order: "I love JavaScript" -> "JavaScript love I"
{
  const usingBuiltIns = (sentence) => sentence.trim().split(/\s+/).reverse().join(" ");
  const usingReduceRight = (sentence) => sentence.trim().split(/\s+/).reduceRight((result, word) => result ? `${result} ${word}` : word, "");
  function usingLoop(sentence) {
    const result = [];
    for (const word of sentence.trim().split(/\s+/)) result.unshift(word);
    return result.join(" ");
  }
  function usingRecursion(sentence) {
    const words = sentence.trim().split(/\s+/);
    const reverseFrom = (index) => index < 0 ? [] : [words[index], ...reverseFrom(index - 1)];
    return reverseFrom(words.length - 1).join(" ");
  }
  const input = "I love JavaScript";
  console.log("11. Reverse words:", [usingBuiltIns(input), usingReduceRight(input), usingLoop(input), usingRecursion(input)]);
}

// 12. Reverse each word: "I love JavaScript" -> "I evol tpircSavaJ"
{
  const reverseWord = (word) => [...word].reverse().join("");
  const usingMap = (sentence) => sentence.split(" ").map(reverseWord).join(" ");
  const usingReduce = (sentence) => sentence.split(" ").reduce((result, word) => [...result, reverseWord(word)], []).join(" ");
  const usingReplace = (sentence) => sentence.replace(/\S+/g, reverseWord);
  function usingLoop(sentence) {
    let result = "";
    let word = "";
    for (const character of `${sentence} `) {
      if (character === " ") {
        result += `${word} `;
        word = "";
      } else word = character + word;
    }
    return result.trimEnd();
  }
  const input = "I love JavaScript";
  console.log("12. Reverse each word:", [usingMap(input), usingReduce(input), usingReplace(input), usingLoop(input)]);
}

// 13. Count vowels: "JavaScript" -> 3
{
  const usingMatch = (text) => text.match(/[aeiou]/gi)?.length ?? 0;
  const usingFilter = (text) => [...text.toLowerCase()].filter((character) => "aeiou".includes(character)).length;
  const usingReduce = (text) => [...text.toLowerCase()].reduce((count, character) => count + Number("aeiou".includes(character)), 0);
  function usingLoop(text) {
    let count = 0;
    for (const character of text.toLowerCase()) if ("aeiou".includes(character)) count++;
    return count;
  }
  console.log("13. Vowels:", [usingMatch("JavaScript"), usingLoop("JavaScript"), usingReduce("JavaScript"), usingFilter("JavaScript")]);
}

// 14. Move zeros to the end: [0, 1, 0, 3, 12] -> [1, 3, 12, 0, 0]
{
  const usingFilter = (numbers) => [...numbers.filter((number) => number !== 0), ...numbers.filter((number) => number === 0)];
  function usingLoop(numbers) {
    const result = [];
    let zeroCount = 0;
    for (const number of numbers) number === 0 ? zeroCount++ : result.push(number);
    return result.concat(Array(zeroCount).fill(0));
  }
  const usingReduce = (numbers) => numbers.reduce((groups, number) => {
    groups[number === 0 ? 1 : 0].push(number);
    return groups;
  }, [[], []]).flat();
  function usingTwoPointers(numbers) {
    const result = [...numbers];
    let insertionIndex = 0;
    for (const number of result) if (number !== 0) result[insertionIndex++] = number;
    while (insertionIndex < result.length) result[insertionIndex++] = 0;
    return result;
  }
  const input = [0, 1, 0, 3, 12];
  console.log("14. Move zeros:", [usingFilter(input), usingLoop(input), usingReduce(input), usingTwoPointers(input)]);
}

// 15. Find the longest common prefix: ["flower", "flow", "flight"] -> "fl"
{
  function usingHorizontalScan(words) {
    if (!words.length) return "";
    let prefix = words[0];
    for (const word of words.slice(1)) while (!word.startsWith(prefix)) prefix = prefix.slice(0, -1);
    return prefix;
  }
  function usingVerticalScan(words) {
    if (!words.length) return "";
    for (let index = 0; index < words[0].length; index++) {
      if (words.some((word) => word[index] !== words[0][index])) return words[0].slice(0, index);
    }
    return words[0];
  }
  function usingSort(words) {
    if (!words.length) return "";
    const sorted = [...words].sort();
    let index = 0;
    while (index < sorted[0].length && sorted[0][index] === sorted.at(-1)[index]) index++;
    return sorted[0].slice(0, index);
  }
  const usingReduce = (words) => words.reduce((prefix, word) => {
    let index = 0;
    while (index < prefix.length && prefix[index] === word[index]) index++;
    return prefix.slice(0, index);
  }, words[0] ?? "");
  const input = ["flower", "flow", "flight"];
  console.log("15. Longest prefix:", [usingHorizontalScan(input), usingVerticalScan(input), usingSort(input), usingReduce(input)]);
}

// 16. Flatten an array: [1, [2, [3, 4]]] -> [1, 2, 3, 4]
{
  const usingFlat = (values) => values.flat(Infinity);
  function usingRecursion(values) {
    const result = [];
    for (const value of values) Array.isArray(value) ? result.push(...usingRecursion(value)) : result.push(value);
    return result;
  }
  const usingReduce = (values) => values.reduce((result, value) => result.concat(Array.isArray(value) ? usingReduce(value) : value), []);
  function usingStack(values) {
    const stack = [...values];
    const result = [];
    while (stack.length) {
      const value = stack.pop();
      Array.isArray(value) ? stack.push(...value) : result.push(value);
    }
    return result.reverse();
  }
  const input = [1, [2, [3, 4, [5, 6]]]];
  console.log("16. Flatten array:", [usingFlat(input), usingRecursion(input), usingReduce(input), usingStack(input)]);
}

// 17. Flatten an object using dot-separated keys.
{
  const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  function usingRecursion(input, parentKey = "", result = {}) {
    for (const [key, value] of Object.entries(input)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      isPlainObject(value) ? usingRecursion(value, fullKey, result) : result[fullKey] = value;
    }
    return result;
  }
  function usingStack(input) {
    const result = {};
    const stack = Object.entries(input).map(([key, value]) => ({ key, value }));
    while (stack.length) {
      const { key, value } = stack.pop();
      if (isPlainObject(value)) {
        for (const [childKey, childValue] of Object.entries(value)) stack.push({ key: `${key}.${childKey}`, value: childValue });
      } else result[key] = value;
    }
    return result;
  }
  function usingReduce(input) {
    return Object.entries(input).reduce((result, [key, value]) => {
      if (!isPlainObject(value)) return { ...result, [key]: value };
      for (const [childKey, childValue] of Object.entries(usingReduce(value))) result[`${key}.${childKey}`] = childValue;
      return result;
    }, {});
  }
  function usingQueue(input) {
    const result = {};
    const queue = [{ value: input, path: "" }];
    while (queue.length) {
      const current = queue.shift();
      for (const [key, value] of Object.entries(current.value)) {
        const fullKey = current.path ? `${current.path}.${key}` : key;
        isPlainObject(value) ? queue.push({ value, path: fullKey }) : result[fullKey] = value;
      }
    }
    return result;
  }
  const input = { user: { name: "Abhishek", address: { city: "Pune" } }, active: true };
  console.log("17. Flatten object:", [usingRecursion(input), usingStack(input), usingReduce(input), usingQueue(input)]);
}

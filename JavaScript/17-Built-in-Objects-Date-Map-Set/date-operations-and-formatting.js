/*
  Topic: Date Operations and Formatting
  Difficulty: Beginner to Intermediate
  Primary Concept: Creating, inspecting, formatting, parsing, and comparing Date values
*/

// Current date and time.
const currentDateTime = new Date();
console.log("Current date and time:", currentDateTime.toString());
console.log("Current date and time in milliseconds:", currentDateTime.getTime());

// Date from ISO string.
const dateFromIsoString = new Date("2024-02-03T12:36:20Z");
console.log("Date from ISO string:", dateFromIsoString.toString());

// Date with specific components: year, month (0-based), day, hour, minute, second, millisecond.
const yearMonth = new Date(2024, 1);
const yearMonthDay = new Date(2024, 1, 3);
const yearMonthDayHours = new Date(2024, 1, 3, 12);
const yearMonthDayHoursMinutes = new Date(2024, 1, 3, 12, 36);
const yearMonthDayHoursMinutesSeconds = new Date(2024, 1, 3, 12, 36, 20);
const fullDate = new Date(2024, 1, 3, 12, 36, 20, 0);

console.log("Year and month:", yearMonth.toString());
console.log("Year, month, and day:", yearMonthDay.toString());
console.log("Year, month, day, and hours:", yearMonthDayHours.toString());
console.log("Year, month, day, hours, and minutes:", yearMonthDayHoursMinutes.toString());
console.log("Year, month, day, hours, minutes, and seconds:", yearMonthDayHoursMinutesSeconds.toString());
console.log("Full date:", fullDate.toString());

// From milliseconds since Unix epoch.
const fromMilliseconds = new Date(86400000);
console.log("Date from 86400000 ms:", fromMilliseconds.toString());

// Formatting methods.
console.log("toString():", currentDateTime.toString());
console.log("toDateString():", currentDateTime.toDateString());
console.log("toUTCString():", currentDateTime.toUTCString());
console.log("toISOString():", currentDateTime.toISOString());

// Date component getters.
console.log("Year:", currentDateTime.getFullYear());
console.log("Month:", currentDateTime.getMonth());
console.log("Date:", currentDateTime.getDate());
console.log("Day:", currentDateTime.getDay());
console.log("Hours:", currentDateTime.getHours());
console.log("Minutes:", currentDateTime.getMinutes());
console.log("Seconds:", currentDateTime.getSeconds());
console.log("Milliseconds:", currentDateTime.getMilliseconds());
console.log("UTC Full year:", currentDateTime.getUTCFullYear());
console.log("UTC Month:", currentDateTime.getUTCMonth());
console.log("UTC Date:", currentDateTime.getUTCDate());

// Autocorrection examples.
const overflowMonth = new Date(2018, 15, 24, 10, 33, 30);
const overflowDay = new Date(2018, 5, 35, 10, 33, 30);
console.log("Overflow month autocorrected:", overflowMonth.toString());
console.log("Overflow day autocorrected:", overflowDay.toString());

// Different argument counts.
const sixNumbers = new Date(2024, 1, 3, 12, 36, 20);
const fiveNumbers = new Date(2024, 1, 3, 12, 36);
const fourNumbers = new Date(2024, 1, 3, 12);
const threeNumbers = new Date(2024, 1, 3);
const twoNumbers = new Date(2024, 1);

console.log("Six numbers:", sixNumbers.toString());
console.log("Five numbers:", fiveNumbers.toString());
console.log("Four numbers:", fourNumbers.toString());
console.log("Three numbers:", threeNumbers.toString());
console.log("Two numbers:", twoNumbers.toString());

// Parsing date strings.
const isoDate = new Date("2015-03-25");
const isoYearMonth = new Date("2015-03");
const isoYear = new Date("2015");
const isoDateTime = new Date("2015-03-25T12:00:00Z");
const isoDateTimeModified = new Date("2015-03-25T12:00:00-06:30");
const shortDate = new Date("03/25/2015");
const longDate = new Date("Mar 25 2015");
const longDateVariation = new Date("25 Mar 2015");

console.log("ISO date:", isoDate.toString());
console.log("ISO year-month:", isoYearMonth.toString());
console.log("ISO year:", isoYear.toString());
console.log("ISO date-time:", isoDateTime.toString());
console.log("ISO date-time modified:", isoDateTimeModified.toString());
console.log("Short date:", shortDate.toString());
console.log("Long date:", longDate.toString());
console.log("Long date variation:", longDateVariation.toString());

// Date.parse returns milliseconds.
const parsedMilliseconds = Date.parse("March 21, 2012");
console.log("Date.parse milliseconds:", parsedMilliseconds);
console.log("Date from parsed milliseconds:", new Date(parsedMilliseconds).toString());

// Relative millisecond examples.
const minusMilliseconds = new Date(-100000000000);
const plusOneDay = new Date(24 * 60 * 60 * 1000);
const zeroMilliseconds = new Date(0);
console.log("Date minus milliseconds:", minusMilliseconds.toString());
console.log("Plus one day:", plusOneDay.toString());
console.log("Zero milliseconds:", zeroMilliseconds.toString());

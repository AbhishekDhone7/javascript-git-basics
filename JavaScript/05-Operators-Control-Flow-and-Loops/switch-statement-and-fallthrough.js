/*
  Topic: switch Statement and Fall-Through
  Difficulty: Beginner
  Primary Concept: Multi-branch selection and break behavior
*/

// 1) Basic switch statement
const day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
  case 7:
    dayName = "Weekend";
    break;
  default:
    dayName = "Invalid day";
}

console.log("Day:", dayName);

// 2) Shared cases (intentional fall-through)
const grade = "B";
let feedback;

switch (grade) {
  case "A":
  case "B":
    feedback = "Good job!";
    break;
  case "C":
  case "D":
    feedback = "You can do better.";
    break;
  case "F":
    feedback = "Failed. Please try again.";
    break;
  default:
    feedback = "Invalid grade";
}

console.log("Feedback:", feedback);

// 3) Missing break (unintentional fall-through)
const month = 2;
let monthName;

switch (month) {
  case 1:
    monthName = "January";
  case 2:
    monthName = "February";
  case 3:
    monthName = "March";
  default:
    monthName = "Invalid month";
}

console.log("Month without breaks:", monthName);

// Notes:
// - switch compares cases using strict equality (===)
// - break prevents fall-through
// - default runs when no case matches

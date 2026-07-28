/*
  Topic: Security and safe coding basics
  Difficulty: Intermediate
  Primary Concept: Validating input and avoiding dangerous output patterns
*/

console.log("--- Security and safe coding basics ---");

function isValidUsername(name) {
  return typeof name === "string" && /^[a-zA-Z0-9_]{3,20}$/.test(name);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeJsonParse(input) {
  try {
    return { ok: true, value: JSON.parse(input) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

console.log("Username valid:", isValidUsername("user_123"));
console.log("Escaped output:", escapeHtml("<script>alert('xss')</script>"));
console.log("Safe JSON parse:", safeJsonParse('{"theme":"dark"}'));

console.log("--- Notes ---");
console.log("Validate inputs, escape untrusted output, avoid eval, and treat secrets carefully.");

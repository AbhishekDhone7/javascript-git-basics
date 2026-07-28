/*
  Topic: Projects and case studies basics
  Difficulty: Beginner
  Primary Concept: Turning ideas into scoped work and reusable notes
*/

console.log("--- Project planning basics ---");

const projectPlan = {
  idea: "Task tracker",
  goal: "Let users create, edit, and complete tasks",
  coreFeatures: ["add task", "mark complete", "filter tasks"],
  risks: ["state sync", "duplicate updates"],
};

console.log("Project plan:", projectPlan);

function writeCaseStudy(title, outcome) {
  return {
    title,
    problem: "What was being solved?",
    approach: "What was built and why?",
    outcome,
  };
}

console.log("Case study note:", writeCaseStudy("Todo app", "Users can manage tasks reliably"));

console.log("--- Notes ---");
console.log("Scope a project by feature, risk, and measurable outcome before writing code.");

# Git and JavaScript Practice Workspace

This workspace contains practical, beginner-friendly learning material for Git and JavaScript with real-world examples, Mermaid diagrams, and interview-ready notes.

## Vision

This documentation is designed by a developer who struggled while learning advanced concepts and now wants to help others learn faster with simple language and practical examples.

The goal is to make difficult topics easier by explaining:

- what the concept is
- why and where it is used
- real production scenarios
- common mistakes and best practices

## What You Will Find

- Topic-based JavaScript learning path under [JavaScript/](JavaScript/README.md)
- Root-level practice files for quick drills
- Git learning guide in [Git-Beginners-Documentation.md](Git-Beginners-Documentation.md)
- Extended JavaScript notes in [JavaScript-Beginners-Guide.md](JavaScript-Beginners-Guide.md)
- Complete React project in [scholer-desk/](scholer-desk/) for student publishing and campus administration practice

## Repository Contents

- [JavaScript/](JavaScript/)
- [Git-Beginners-Documentation.md](Git-Beginners-Documentation.md)
- [JavaScript-Beginners-Guide.md](JavaScript-Beginners-Guide.md)
- [scholer-desk/](scholer-desk/)
- [scholer-desk/README.md](scholer-desk/README.md)
- [assets/screenshots](assets/screenshots)
- [Array.js](Array.js)
- [String.js](String.js)
- [functions.js](functions.js)
- [Hoisting-TDZ.js](Hoisting-TDZ.js)
- [coding-exercises.js](coding-exercises.js)
- [dummy2.js](dummy2.js)

## Structured JavaScript Syllabus

A complete beginner-to-advanced JavaScript learning platform structure is available in:

- [JavaScript/README.md](JavaScript/README.md)

It includes a modular numbered folder hierarchy from setup and fundamentals to advanced topics, projects, and interview preparation.

## Complete Documentation Index

### A) Git Documentation

Covered in [Git-Beginners-Documentation.md](Git-Beginners-Documentation.md):

- Git vs GitHub fundamentals
- Repository setup and first push
- Daily local workflow
- Branching, merging, pull requests
- Fetch, pull, push, clone
- Conflict resolution with practical flow
- Useful commands cheat sheet
- Best practices and interview questions

### B) JavaScript Documentation

Covered in [JavaScript-Beginners-Guide.md](JavaScript-Beginners-Guide.md):

1. JavaScript at a glance
2. Runtime model: execution context and call stack
3. Variables, scope, data types, hoisting, TDZ
4. Type coercion and equality rules (== and ===)
5. Operators, statements, and loops with practical scenarios
6. Functions deep dive (declaration, expression, arrow, IIFE, callback, HOF, recursion, closure, currying)
7. Arrays and array methods with return types and use cases
8. Objects and object patterns in production-style usage
9. this, call, apply, bind
10. Prototypes and classes
11. DOM and event handling
12. Async JavaScript and event loop
13. REST APIs, fetch, axios
14. Error handling and debugging
15. Date, Math, Map, Set
16. Modern JavaScript features (ES6+)
17. Interview question bank
18. Learning roadmap

### C) ScholarDesk React Project

Covered in [scholer-desk/README.md](scholer-desk/README.md):

- Figma reference: [ScholarDesk UI Design](https://www.figma.com/design/3TURApKflpiN8QD8qIZILP/scholer-desk?node-id=0-1&t=Scn7SEa1AeQ4HbNX-1)
- Responsive React and Redux Toolkit application
- Separate student and administrator login flows
- Student posts, profiles, notifications, and settings
- Post creation, editing, filtering, search, and detail views
- Administrator students, posts, categories, analytics, reports, and settings
- Reusable components, mock datasets, responsive navigation, and CSV exports
- Complete local testing credentials for all demo users

Run the project locally:

```bash
cd scholer-desk
npm install
npm start
```

After startup, use `http://localhost:3000/login` for students or `http://localhost:3000/admin/login` for administrators. See the [demo login credentials](scholer-desk/README.md#demo-login-credentials) for all test accounts.

## Learning Path

If you are a complete beginner, use this order:

1. Start with [JavaScript-Beginners-Guide.md](JavaScript-Beginners-Guide.md) Sections 1 to 6
2. Continue with Sections 7 to 12 for practical coding patterns
3. Finish Sections 13 to 18 for APIs, debugging, and interview preparation
4. Read [Git-Beginners-Documentation.md](Git-Beginners-Documentation.md) in parallel for version-control workflow

## Recommended Study Order

1. Start with [JavaScript/00-Getting-Started](JavaScript/00-Getting-Started/README.md).
2. Move through sections in numeric order until [JavaScript/27-Projects-and-Case-Studies](JavaScript/27-Projects-and-Case-Studies/README.md).
3. Finish with [JavaScript/28-Coding-Exercises](JavaScript/28-Coding-Exercises/README.md), [JavaScript/29-Career-and-Interview-Prep](JavaScript/29-Career-and-Interview-Prep/README.md), and [JavaScript/99-Interview-Questions](JavaScript/99-Interview-Questions/README.md).

## How to Use This Repository

1. Read concept section from the guide.
2. Run or rewrite the code snippets locally.
3. Review outputs and edge cases.
4. Practice similar problems in the JS practice files.
5. Use Git guide to track every learning change as commits.
6. Open [scholer-desk/](scholer-desk/) to practice React architecture and complete student/admin workflows.

## Daily Practice Pattern

- Read one topic file.
- Execute code and verify output.
- Modify examples to test edge cases.
- Commit your progress with a clear message.

## Recommended Git Practice Commands

Initial setup:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Daily practice:

```bash
git add .
git commit -m "Your message"
git push
```

## Repository Map

- [README.md](README.md)
- [JavaScript/README.md](JavaScript/README.md)
- [Git-Beginners-Documentation.md](Git-Beginners-Documentation.md)
- [JavaScript-Beginners-Guide.md](JavaScript-Beginners-Guide.md)
- [scholer-desk/README.md](scholer-desk/README.md)

## Final Note

This repository is not just notes. It is a guided journey from confusion to clarity.
If you once struggled with advanced topics, this documentation is built for you.

I faced a lot of difficulties in my journey because of lack of guidance, but now it is your time to achieve more heights in your career.

Author: Abhishek Dhone

Last updated: 2026-07-29


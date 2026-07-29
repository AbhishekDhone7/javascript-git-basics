# Student Posts Management System

Scalable React architecture for managing student posts, profiles, notifications, and admin moderation workflows. This repository currently contains the initial production-ready project structure with placeholder modules and rich mock datasets.

## Project Overview

This project is designed as an enterprise-ready frontend architecture using React + Redux Toolkit, with role-oriented routing for students and admins. It intentionally excludes business logic in this phase and focuses on maintainability, modularity, and separation of concerns.

## Folder Structure

```text
scholer-desk/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   ├── routes/
│   ├── hooks/
│   ├── contexts/
│   ├── helpers/
│   ├── utils/
│   ├── constants/
│   ├── config/
│   ├── mock/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── .env*
├── package.json
└── README.md
```

## Installation

```bash
npm install
npm start
```

## Available Scripts

- npm start
- npm test
- npm run build
- npm run eject

## Environment Variables

- REACT_APP_ENV
- REACT_APP_API_URL
- REACT_APP_APP_NAME

## Mock Data Information

The src/mock directory contains realistic dummy data for users, posts, comments, categories, tags, notifications, analytics, dashboard, reports, and settings.

## Project Architecture

- Feature-based page modules for student and admin domains
- Domain-separated redux slices (student/admin/common)
- Service layer split by API and domain
- Route-level role separation with layout shells
- Structured CSS layers: base, layouts, components, pages, themes

## Future Enhancements

- Auth and role guards
- CRUD operations
- API integration
- Form validation
- Testing coverage

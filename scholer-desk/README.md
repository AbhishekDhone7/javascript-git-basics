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

## Demo Login Credentials

ScholarDesk currently uses frontend-only mock authentication. The login form requires a valid email format and a non-empty password, then opens the dashboard for the selected login type. Use the credentials below for consistent testing.

### Student Login

- Login page: [http://localhost:3000/login](http://localhost:3000/login)
- Common password for all demo students: `Student@123`

| User ID | Student ID | Student Name | Email Address | Password | Status |
| --- | --- | --- | --- | --- | --- |
| `user-001` | `STU2026001` | Aarav Sharma | `aarav.sharma@campus.edu` | `Student@123` | Active |
| `user-002` | `STU2026002` | Vivaan Patel | `vivaan.patel@campus.edu` | `Student@123` | Active |
| `user-003` | `STU2026003` | Aditya Reddy | `aditya.reddy@campus.edu` | `Student@123` | Inactive |
| `user-004` | `STU2026004` | Ishita Gupta | `ishita.gupta@campus.edu` | `Student@123` | Inactive |
| `user-005` | `STU2026005` | Saanvi Nair | `saanvi.nair@campus.edu` | `Student@123` | Active |
| `user-006` | `STU2026006` | Ananya Mehta | `ananya.mehta@campus.edu` | `Student@123` | Active |
| `user-007` | `STU2026007` | Kabir Verma | `kabir.verma@campus.edu` | `Student@123` | Active |
| `user-008` | `STU2026008` | Riya Iyer | `riya.iyer@campus.edu` | `Student@123` | Active |
| `user-009` | `STU2026009` | Arjun Kapoor | `arjun.kapoor@campus.edu` | `Student@123` | Active |
| `user-010` | `STU2026010` | Neha Singh | `neha.singh@campus.edu` | `Student@123` | Active |

### Administrator Login

- Login page: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `admin@scholardesk.edu`
- Password: `Admin@123`
- Destination after login: `/admin/dashboard`

> These credentials are for local demonstration only. Authentication is not connected to a backend, passwords are not stored in the mock user data, and credentials should not be used in production.

## Testing the Application

1. Run `npm install` if dependencies are not installed.
2. Run `npm start`.
3. Open the student or administrator login page.
4. Enter one of the documented email/password combinations.
5. Test the student publishing workflows or administrator management workflows.

# Project Flow – Project Management Tool

## Overview

This is a simple project management application that is built as part of a frontend development assessment. It allows users to manage projects, create tasks, update task status using drag-and-drop, and tracking activity logs.

The goal of this project is to demonstrate:
- Clean architecture and code organization
- UI/UX implementation
- API integration
- State management and problem-solving skills

---

## Features

### Authentication
- User signup and login
- Session-based authentication using cookies
- Forgot password and reset password

### Project Management
- Create, update, and delete projects
- View all projects in a sidebar
- Project deadline status indicator:
    - Today (green)
    - Near 30 days (orange)
    - Overdue (red)
    - Default (gray)
- Sort projects by deadline (ascending/descending)
- Search projects
- View selected project details

### Task Management
- Create, update, and delete tasks within projects
- Drag-and-drop task status updates:
    - To Do
    - In Progress
    - Done
- Sort tasks by creation date within each column

### History Logs
- Tracks project and task changes:
    - Project creation and updates
    - Task creation and updates
    - Task status changes
    - Task Deletions

### Additional Features
- Clean, modern SaaS-style dashboard UI
- Reusable utility functions
- Modular and maintainable code structure

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Drag-and-drop**: @dnd-kit
- **Session Management**: iron-session
- **Database**: JSON file (mock backend)
- **Email Service**: Resend (password reset functionality)

---

## Project Structure
```bash
/app – pages and API routes
/components – reusable UI and feature-based components
/lib – core logic (db, session, logger, email)
/utils – helper functions (date, deadline status)
/types – TypeScript types
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mladelacruz17/project_flow.git
cd project_flow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a .env.local file
```bash
SESSION_SECRET=your_secret_key
RESEND_API_KEY=your_api_key
```
Get Resend API key from [https://resend.com/](https://resend.com/).
> Note: The email service uses Resend for sending password reset emails.
> For development, ensure that the recipient email exists in the user database to properly receive reset links.

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

### Authentication
- POST /api/auth/login – Login user
- POST /api/auth/logout – Logout user
- POST /api/auth/forgot-password – Send reset link
- POST /api/auth/reset-password – Reset password
- GET /api/session - Get session

### Projects
- GET /api/projects – Get all projects of a user
- POST /api/projects – Create project
- PATCH /api/projects/:id – Update project
- DELETE /api/projects/:id – Delete project

### Tasks
- GET /api/tasks – Get all tasks of a project
- POST /api/tasks – Create task
- PUT /api/tasks/:id – Update task (status/details)
- DELETE /api/tasks/:id – Delete task

### Logs
- GET /api/logs – Get logs of a project

### Users
- GET /api/users/:id – Get user details
- POST /api/users – Create user / Signup
- PUT /api/users/:id – Update user details

### Development (Dev Only)
- POST /api/reset-db – Reset database to seed data (used for development/testing only)

---

## Known Limitations

- **Uses a JSON file instead of a real database**
Data is stored in a local JSON file, which is suitable for development and demonstration purposes but not scalable for production use.

- **No collaborative features (single-user data scope)**
Projects and tasks are isolated per user account and are not shared across users. This application does not support collaboration or shared workspaces.

- **No real-time synchronization** 
Updates rely on client-side state and API calls, without real-time technologies such as WebSockets.

- **Basic validation only**
Input validation is minimal and does not cover all edge cases. More robust validation (e.g., schema-based validation) can be added.

- **Basic responsiveness**
Some layouts are optimized for desktop screens only. Mobile responsiveness was not fully implemented due to time constraints.

---

## Future Improvements
- Improve mobile responsiveness (fully responsive UI)
- Replace JSON DB with PostgreSQL/MongoDB
- Add real-time updates (WebSockets)
- Improve form validation (Zod/Yup)
- Add user roles and permissions
- Deploy to Vercel

---

## Developer Tools

To improve development workflow, this project includes a hidden utility for quickly resetting local data.

- **Database Reset Shortcut**
  - Trigger: `Ctrl + Alt + R`
  - Scope: Available on the `/project` page
  - Action: Calls `/api/reset-db` and reloads the application state
  - Purpose: Quickly restore seed data during development and testing
  - Environment: Development only (not exposed in production)

### Demo Account

A test user is preloaded for evaluation purposes:

- Email: mladc17@gmail.com  
- Password: sample  

> This account is intended for development and demo use only.

---

Notes:
This project was completed within the given timeframe, with an extension to further refine features and improve overall quality.


Author
Developed by Ma. Lilibeth A. Dela Cruz
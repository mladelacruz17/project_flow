import type { DB } from "@/types";

export const seed: DB = {
  "users": [
    {
      "id": "u1",
      "name": "Ma. Lilibeth Dela Cruz",
      "email": "mladc17@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u2",
      "name": "Maria Santos",
      "email": "maria.santos@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u3",
      "name": "John Cruz",
      "email": "john.cruz@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u4",
      "name": "Angela Lopez",
      "email": "angela.lopez@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u5",
      "name": "Daniel Garcia",
      "email": "daniel.garcia@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u6",
      "name": "Sophia Lim",
      "email": "sophia.lim@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u7",
      "name": "Mark Tan",
      "email": "mark.tan@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u8",
      "name": "Nicole Bautista",
      "email": "nicole.bautista@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u9",
      "name": "Kevin Villanueva",
      "email": "kevin.v@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    },
    {
      "id": "u10",
      "name": "Patricia Gomez",
      "email": "patricia.gomez@gmail.com",
      "password": "$2b$10$ASY37xgF6Yi8t2UoSmAltueQjADSpAcU1x/C/5G.YG3nLQJHBCChG"
    }
  ],
  "projects": [
    {
      "id": "p1",
      "name": "Website Redesign for Local Bakery",
      "description": "Revamp UI/UX and improve mobile responsiveness for a small bakery business.",
      "deadline": "2026-03-15",
      "userId": "u1"
    },
    {
      "id": "p2",
      "name": "Personal Portfolio Website",
      "description": "Build and deploy a modern portfolio to showcase projects and skills.",
      "deadline": "2026-04-24",
      "userId": "u1"
    },
    {
      "id": "p3",
      "name": "Mobile App UI Prototype",
      "description": "Design a Figma prototype for a task management mobile app.",
      "deadline": "2026-05-05",
      "userId": "u1"
    },
    {
      "id": "p4",
      "name": "E-commerce Backend API",
      "description": "Develop REST API with authentication, orders, and payments.",
      "deadline": "2026-02-28",
      "userId": "u1"
    },
    {
      "id": "p5",
      "name": "Thesis: Smart Irrigation System",
      "description": "IoT-based irrigation using soil moisture sensors and automation.",
      "deadline": "2026-06-10",
      "userId": "u1"
    },
    {
      "id": "p6",
      "name": "Fitness Tracking Dashboard",
      "description": "Track workouts, calories, and progress using charts.",
      "deadline": "2026-04-10",
      "userId": "u1"
    },
    {
      "id": "p7",
      "name": "Freelance Logo Design Package",
      "description": "Create branding assets for a startup client.",
      "deadline": "2026-04-27",
      "userId": "u1"
    },
    {
      "id": "p8",
      "name": "Online Course Platform Clone",
      "description": "Build a mini LMS with video lessons and progress tracking.",
      "deadline": "2026-05-20",
      "userId": "u1"
    },
    {
      "id": "p9",
      "name": "Bug Tracker System",
      "description": "Internal tool for tracking bugs and feature requests.",
      "deadline": "2026-03-30",
      "userId": "u1"
    },
    {
      "id": "p10",
      "name": "Travel Planning App",
      "description": "Plan trips, budgets, and itineraries with map integration.",
      "deadline": "2026-07-15",
      "userId": "u1"
    }
  ],
  "tasks": [
    {
      "id": "t1",
      "projectId": "p1",
      "title": "Meet client and gather requirements",
      "description": "Discuss design preferences, branding, and required pages.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-02-20",
      "tags": [
        "meeting",
        "planning"
      ],
      "createdAt": "2026-02-18T09:00:00Z",
      "updatedAt": "2026-04-24T07:07:56.269Z"
    },
    {
      "id": "t2",
      "projectId": "p1",
      "title": "Audit existing website",
      "description": "Review current layout, performance, and usability issues.",
      "status": "Done",
      "priority": "Medium",
      "dueDate": "2026-02-22",
      "tags": [
        "analysis"
      ],
      "createdAt": "2026-02-20T10:00:00Z",
      "updatedAt": "2026-02-22T16:00:00Z"
    },
    {
      "id": "t3",
      "projectId": "p1",
      "title": "Create wireframes",
      "description": "Design low-fidelity wireframes for homepage and product pages.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-02-25",
      "tags": [
        "design"
      ],
      "createdAt": "2026-02-22T11:00:00Z",
      "updatedAt": "2026-02-25T18:00:00Z"
    },
    {
      "id": "t4",
      "projectId": "p1",
      "title": "Design high-fidelity UI in Figma",
      "description": "Create polished UI designs with branding and colors.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-02-28",
      "tags": [
        "design",
        "ui"
      ],
      "createdAt": "2026-02-25T09:30:00Z",
      "updatedAt": "2026-02-28T19:00:00Z"
    },
    {
      "id": "t5",
      "projectId": "p1",
      "title": "Client design approval",
      "description": "Present UI designs and collect feedback.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-03-01",
      "tags": [
        "meeting"
      ],
      "createdAt": "2026-02-28T20:00:00Z",
      "updatedAt": "2026-03-01T14:00:00Z"
    },
    {
      "id": "t6",
      "projectId": "p1",
      "title": "Implement responsive frontend",
      "description": "Convert Figma designs into responsive React components.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-03-10",
      "tags": [
        "frontend"
      ],
      "createdAt": "2026-03-02T08:00:00Z",
      "updatedAt": "2026-03-08T12:00:00Z"
    },
    {
      "id": "t7",
      "projectId": "p1",
      "title": "Integrate product catalog",
      "description": "Add dynamic product listing and images.",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": "2026-03-12",
      "tags": [
        "frontend",
        "data",
        "product"
      ],
      "createdAt": "2026-03-03T10:00:00Z",
      "updatedAt": "2026-04-24T07:21:15.539Z"
    },
    {
      "id": "t8",
      "projectId": "p1",
      "title": "Optimize images and performance",
      "description": "Compress images and improve load times.",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": "2026-03-13",
      "tags": [
        "performance"
      ],
      "createdAt": "2026-03-04T11:30:00Z",
      "updatedAt": "2026-03-04T11:30:00Z"
    },
    {
      "id": "t9",
      "projectId": "p1",
      "title": "Cross-browser testing",
      "description": "Test site on Chrome, Firefox, Safari, and mobile devices.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-03-14",
      "tags": [
        "testing"
      ],
      "createdAt": "2026-03-05T09:00:00Z",
      "updatedAt": "2026-03-05T09:00:00Z"
    },
    {
      "id": "t10",
      "projectId": "p1",
      "title": "Deploy website to production",
      "description": "Finalize deployment and domain setup.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-03-15",
      "tags": [
        "deployment"
      ],
      "createdAt": "2026-03-06T13:00:00Z",
      "updatedAt": "2026-03-06T13:00:00Z"
    },
    {
      "id": "t11",
      "projectId": "p2",
      "title": "Plan portfolio structure",
      "description": "Decide sections: About, Projects, Skills, Contact.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-10",
      "tags": [
        "planning"
      ],
      "createdAt": "2026-04-09T09:00:00Z",
      "updatedAt": "2026-04-10T11:00:00Z"
    },
    {
      "id": "t12",
      "projectId": "p2",
      "title": "Set up Next.js project",
      "description": "Initialize project with Tailwind and basic routing.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-11",
      "tags": [
        "setup",
        "frontend"
      ],
      "createdAt": "2026-04-10T12:00:00Z",
      "updatedAt": "2026-04-11T15:00:00Z"
    },
    {
      "id": "t13",
      "projectId": "p2",
      "title": "Design homepage layout",
      "description": "Create hero section, navigation bar, and footer.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-13",
      "tags": [
        "design",
        "ui"
      ],
      "createdAt": "2026-04-11T16:00:00Z",
      "updatedAt": "2026-04-13T18:00:00Z"
    },
    {
      "id": "t14",
      "projectId": "p2",
      "title": "Implement project showcase section",
      "description": "Display projects with cards and links.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-22",
      "tags": [
        "frontend"
      ],
      "createdAt": "2026-04-14T09:00:00Z",
      "updatedAt": "2026-04-21T20:00:00Z"
    },
    {
      "id": "t15",
      "projectId": "p2",
      "title": "Add responsive design",
      "description": "Ensure layout works on mobile and tablet devices.",
      "status": "In Progress",
      "priority": "Medium",
      "dueDate": "2026-04-23",
      "tags": [
        "frontend",
        "responsive"
      ],
      "createdAt": "2026-04-15T10:30:00Z",
      "updatedAt": "2026-04-23T18:00:00Z"
    },
    {
      "id": "t16",
      "projectId": "p2",
      "title": "Integrate contact form",
      "description": "Allow visitors to send messages via email.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-04-25",
      "tags": [
        "backend",
        "feature"
      ],
      "createdAt": "2026-04-16T11:00:00Z",
      "updatedAt": "2026-04-16T11:00:00Z"
    },
    {
      "id": "t17",
      "projectId": "p2",
      "title": "Optimize images and assets",
      "description": "Compress images and lazy load components.",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": "2026-04-26",
      "tags": [
        "performance"
      ],
      "createdAt": "2026-04-17T14:00:00Z",
      "updatedAt": "2026-04-17T14:00:00Z"
    },
    {
      "id": "t18",
      "projectId": "p2",
      "title": "Fix animation glitches",
      "description": "Resolve issues with scroll animations.",
      "status": "To Do",
      "priority": "Low",
      "dueDate": "2026-04-27",
      "tags": [
        "bug",
        "ui"
      ],
      "createdAt": "2026-04-18T13:00:00Z",
      "updatedAt": "2026-04-18T13:00:00Z"
    },
    {
      "id": "t19",
      "projectId": "p2",
      "title": "Deploy to Vercel",
      "description": "Publish site and configure domain.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-04-24",
      "tags": [
        "deployment"
      ],
      "createdAt": "2026-04-19T15:00:00Z",
      "updatedAt": "2026-04-19T15:00:00Z"
    },
    {
      "id": "t20",
      "projectId": "p2",
      "title": "Add analytics tracking",
      "description": "Integrate Google Analytics or similar tool.",
      "status": "To Do",
      "priority": "Low",
      "dueDate": "2026-04-30",
      "tags": [
        "analytics"
      ],
      "createdAt": "2026-04-20T10:00:00Z",
      "updatedAt": "2026-04-20T10:00:00Z"
    },
    {
      "id": "t21",
      "projectId": "p3",
      "title": "Define event theme and agenda",
      "description": "Finalize conference theme and session topics.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-05",
      "tags": [
        "planning"
      ],
      "createdAt": "2026-04-03T09:00:00Z",
      "updatedAt": "2026-04-05T17:00:00Z"
    },
    {
      "id": "t22",
      "projectId": "p3",
      "title": "Book venue",
      "description": "Reserve conference hall and confirm capacity.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-08",
      "tags": [
        "logistics"
      ],
      "createdAt": "2026-04-04T10:00:00Z",
      "updatedAt": "2026-04-08T15:00:00Z"
    },
    {
      "id": "t23",
      "projectId": "p3",
      "title": "Invite guest speakers",
      "description": "Reach out to industry experts for talks.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-25",
      "tags": [
        "communication"
      ],
      "createdAt": "2026-04-06T11:00:00Z",
      "updatedAt": "2026-04-20T18:00:00Z"
    },
    {
      "id": "t24",
      "projectId": "p3",
      "title": "Design promotional materials",
      "description": "Create posters, banners, and social media graphics.",
      "status": "In Progress",
      "priority": "Medium",
      "dueDate": "2026-04-28",
      "tags": [
        "design",
        "marketing"
      ],
      "createdAt": "2026-04-07T14:00:00Z",
      "updatedAt": "2026-04-22T19:00:00Z"
    },
    {
      "id": "t25",
      "projectId": "p3",
      "title": "Set up ticketing system",
      "description": "Enable online registration and payment.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-04-30",
      "tags": [
        "system"
      ],
      "createdAt": "2026-04-08T16:00:00Z",
      "updatedAt": "2026-04-08T16:00:00Z"
    },
    {
      "id": "t26",
      "projectId": "p3",
      "title": "Coordinate catering services",
      "description": "Arrange food and drinks for attendees.",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": "2026-05-05",
      "tags": [
        "logistics"
      ],
      "createdAt": "2026-04-09T12:00:00Z",
      "updatedAt": "2026-04-09T12:00:00Z"
    },
    {
      "id": "t27",
      "projectId": "p3",
      "title": "Hire event staff",
      "description": "Recruit volunteers and coordinators.",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": "2026-05-02",
      "tags": [
        "hr"
      ],
      "createdAt": "2026-04-10T10:00:00Z",
      "updatedAt": "2026-04-10T10:00:00Z"
    },
    {
      "id": "t28",
      "projectId": "p3",
      "title": "Set up audio and visual equipment",
      "description": "Ensure microphones, projectors, and screens are ready.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-05-08",
      "tags": [
        "technical"
      ],
      "createdAt": "2026-04-11T13:00:00Z",
      "updatedAt": "2026-04-11T13:00:00Z"
    },
    {
      "id": "t29",
      "projectId": "p3",
      "title": "Finalize event schedule",
      "description": "Lock in session times and speaker slots.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-05-07",
      "tags": [
        "planning"
      ],
      "createdAt": "2026-04-12T15:00:00Z",
      "updatedAt": "2026-04-12T15:00:00Z"
    },
    {
      "id": "t30",
      "projectId": "p3",
      "title": "Conduct final rehearsal",
      "description": "Run through entire event flow before launch.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-05-09",
      "tags": [
        "execution"
      ],
      "createdAt": "2026-04-13T16:00:00Z",
      "updatedAt": "2026-04-13T16:00:00Z"
    },
    {
      "id": "t31",
      "projectId": "p4",
      "title": "Set fitness goals",
      "description": "Define weight, strength, and endurance targets.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-01",
      "tags": [
        "planning"
      ],
      "createdAt": "2026-03-30T08:00:00Z",
      "updatedAt": "2026-04-01T09:30:00Z"
    },
    {
      "id": "t32",
      "projectId": "p4",
      "title": "Create weekly workout plan",
      "description": "Split workouts into cardio, strength, and rest days.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-02",
      "tags": [
        "planning"
      ],
      "createdAt": "2026-03-31T10:00:00Z",
      "updatedAt": "2026-04-02T11:00:00Z"
    },
    {
      "id": "t33",
      "projectId": "p4",
      "title": "Start morning runs",
      "description": "Run at least 3 times a week.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-10",
      "tags": [
        "cardio"
      ],
      "createdAt": "2026-04-02T06:00:00Z",
      "updatedAt": "2026-04-12T07:00:00Z"
    },
    {
      "id": "t34",
      "projectId": "p4",
      "title": "Track daily calorie intake",
      "description": "Log meals and estimate calories.",
      "status": "In Progress",
      "priority": "Medium",
      "dueDate": "2026-04-15",
      "tags": [
        "diet"
      ],
      "createdAt": "2026-04-03T12:00:00Z",
      "updatedAt": "2026-04-14T20:00:00Z"
    },
    {
      "id": "t35",
      "projectId": "p4",
      "title": "Join a gym",
      "description": "Sign up for a nearby gym membership.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-04-05",
      "tags": [
        "setup"
      ],
      "createdAt": "2026-04-01T15:00:00Z",
      "updatedAt": "2026-04-01T15:00:00Z"
    },
    {
      "id": "t36",
      "projectId": "p4",
      "title": "Buy workout equipment",
      "description": "Purchase dumbbells and resistance bands.",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": "2026-04-07",
      "tags": [
        "equipment"
      ],
      "createdAt": "2026-04-02T16:00:00Z",
      "updatedAt": "2026-04-02T16:00:00Z"
    },
    {
      "id": "t37",
      "projectId": "p4",
      "title": "Follow strength training routine",
      "description": "Do strength workouts 3 times a week.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-14",
      "tags": [
        "strength"
      ],
      "createdAt": "2026-04-04T07:00:00Z",
      "updatedAt": "2026-04-13T18:00:00Z"
    },
    {
      "id": "t38",
      "projectId": "p4",
      "title": "Track progress photos",
      "description": "Take weekly progress pictures.",
      "status": "To Do",
      "priority": "None",
      "dueDate": "2026-04-15",
      "tags": [
        "tracking"
      ],
      "createdAt": "2026-04-05T09:00:00Z",
      "updatedAt": "2026-04-24T06:33:26.116Z"
    },
    {
      "id": "t39",
      "projectId": "p4",
      "title": "Maintain sleep schedule",
      "description": "Sleep at least 7–8 hours daily.",
      "status": "In Progress",
      "priority": "Medium",
      "dueDate": "2026-04-15",
      "tags": [
        "health"
      ],
      "createdAt": "2026-04-03T22:00:00Z",
      "updatedAt": "2026-04-14T23:00:00Z"
    },
    {
      "id": "t40",
      "projectId": "p4",
      "title": "Evaluate fitness progress",
      "description": "Review results and adjust plan.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-04-15",
      "tags": [
        "review"
      ],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t41",
      "projectId": "p6",
      "title": "Finalize UI wireframes for dashboard redesign",
      "description": "Complete high-fidelity wireframes for the new dashboard layout.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-20",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t42",
      "projectId": "p6",
      "title": "Fix authentication bug on login endpoint",
      "description": "Resolve intermittent 401 errors during user login.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-18",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t43",
      "projectId": "p6",
      "title": "Optimize database queries for task retrieval",
      "description": "Improve performance of task listing API.",
      "status": "In Progress",
      "priority": "Medium",
      "dueDate": "2026-04-25",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t44",
      "projectId": "p6",
      "title": "Write unit tests for project service layer",
      "description": "Increase test coverage for project-related services.",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": "2026-04-28",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t45",
      "projectId": "p6",
      "title": "Migrate old project data to new schema",
      "description": "Data migration from legacy format to updated schema.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-30",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t46",
      "projectId": "p6",
      "title": "Update kanban drag-and-drop behavior",
      "description": "Improve UX smoothness and fix reordering issues.",
      "status": "Done",
      "priority": "Medium",
      "dueDate": "2026-04-19",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t47",
      "projectId": "p6",
      "title": "Implement activity log filtering",
      "description": "Allow users to filter logs by action type and date.",
      "status": "To Do",
      "priority": "Low",
      "dueDate": "2026-05-02",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t48",
      "projectId": "p6",
      "title": "Resolve task deletion sync issue",
      "description": "Fix mismatch between frontend state and backend after deletion.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-24",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t49",
      "projectId": "p6",
      "title": "Add loading skeletons to project pages",
      "description": "Improve perceived performance during data fetching.",
      "status": "To Do",
      "priority": "Low",
      "dueDate": "2026-05-05",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t50",
      "projectId": "p6",
      "title": "Conduct usability testing session",
      "description": "Gather feedback from 5 users on new UI changes.",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": "2026-05-10",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t51",
      "projectId": "p5",
      "title": "Design onboarding flow for new users",
      "description": "Create a smooth onboarding experience with step-by-step guidance.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-22",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t52",
      "projectId": "p5",
      "title": "Fix task filtering bug in dashboard",
      "description": "Resolve issue where filters do not update results correctly.",
      "status": "Done",
      "priority": "High",
      "dueDate": "2026-04-18",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t53",
      "projectId": "p5",
      "title": "Improve API response time for projects endpoint",
      "description": "Optimize queries and reduce latency.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-04-27",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t54",
      "projectId": "p5",
      "title": "Write integration tests for authentication flow",
      "description": "Ensure login, logout, and session handling works correctly.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-04-29",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t55",
      "projectId": "p5",
      "title": "Update project UI components to new design system",
      "description": "Replace old UI components with updated styling library.",
      "status": "In Progress",
      "priority": "Medium",
      "dueDate": "2026-05-01",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t56",
      "projectId": "p5",
      "title": "Fix inconsistent task status updates",
      "description": "Ensure task status changes reflect immediately across UI and backend.",
      "status": "Done",
      "priority": "High",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t57",
      "projectId": "p5",
      "title": "Implement notification system for task deadlines",
      "description": "Notify users when tasks are near due date or overdue.",
      "status": "To Do",
      "priority": "Low",
      "dueDate": "2026-05-03",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t58",
      "projectId": "p5",
      "title": "Refactor project service layer",
      "description": "Clean up service logic and improve maintainability.",
      "status": "In Progress",
      "priority": "Medium",
      "dueDate": "2026-05-06",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t59",
      "projectId": "p5",
      "title": "Add dark mode support to dashboard",
      "description": "Implement theme switching with persistent user preference.",
      "status": "To Do",
      "priority": "Low",
      "dueDate": "2026-05-08",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "t60",
      "projectId": "p5",
      "title": "Conduct performance audit",
      "description": "Analyze frontend and backend performance bottlenecks.",
      "status": "To Do",
      "priority": "High",
      "dueDate": "2026-05-12",
      "tags": [],
      "createdAt": "2026-04-06T10:00:00Z",
      "updatedAt": "2026-04-06T10:00:00Z"
    }
  ],
  "logs": [
    {
      "id": "l1",
      "userId": "u1",
      "projectId": "p1",
      "entity": "project",
      "action": "create",
      "message": "Created project 'Website Redesign for Local Bakery'",
      "meta": {},
      "createdAt": "2026-02-18T08:55:00Z"
    },
    {
      "id": "l2",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Meet client and gather requirements'",
      "meta": {},
      "createdAt": "2026-02-18T09:00:00Z"
    },
    {
      "id": "l3",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "update",
      "message": "Marked task 'Meet client and gather requirements' as Done",
      "meta": {
        "from": "In Progress",
        "to": "Done"
      },
      "createdAt": "2026-02-20T15:30:00Z"
    },
    {
      "id": "l4",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Audit existing website'",
      "meta": {},
      "createdAt": "2026-02-20T10:00:00Z"
    },
    {
      "id": "l5",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "update",
      "message": "Marked task 'Audit existing website' as Done",
      "meta": {
        "from": "To Do",
        "to": "Done"
      },
      "createdAt": "2026-02-22T16:00:00Z"
    },
    {
      "id": "l6",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Create wireframes'",
      "meta": {},
      "createdAt": "2026-02-22T11:00:00Z"
    },
    {
      "id": "l7",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "update",
      "message": "Marked task 'Create wireframes' as Done",
      "meta": {
        "from": "In Progress",
        "to": "Done"
      },
      "createdAt": "2026-02-25T18:00:00Z"
    },
    {
      "id": "l8",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Design high-fidelity UI in Figma'",
      "meta": {},
      "createdAt": "2026-02-25T09:30:00Z"
    },
    {
      "id": "l9",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "update",
      "message": "Updated task 'Design high-fidelity UI in Figma' details",
      "meta": {},
      "createdAt": "2026-02-26T13:00:00Z"
    },
    {
      "id": "l10",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "update",
      "message": "Marked task 'Design high-fidelity UI in Figma' as Done",
      "meta": {
        "from": "In Progress",
        "to": "Done"
      },
      "createdAt": "2026-02-28T19:00:00Z"
    },
    {
      "id": "l11",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Client design approval'",
      "meta": {},
      "createdAt": "2026-02-28T20:00:00Z"
    },
    {
      "id": "l12",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "update",
      "message": "Marked task 'Client design approval' as Done",
      "meta": {
        "from": "To Do",
        "to": "Done"
      },
      "createdAt": "2026-03-01T14:00:00Z"
    },
    {
      "id": "l13",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Implement responsive frontend'",
      "meta": {},
      "createdAt": "2026-03-02T08:00:00Z"
    },
    {
      "id": "l14",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "update",
      "message": "Changed status of 'Implement responsive frontend' to In Progress",
      "meta": {
        "from": "To Do",
        "to": "Done"
      },
      "createdAt": "2026-03-03T09:00:00Z"
    },
    {
      "id": "l15",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Integrate product catalog'",
      "meta": {},
      "createdAt": "2026-03-03T10:00:00Z"
    },
    {
      "id": "l16",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Optimize images and performance'",
      "meta": {},
      "createdAt": "2026-03-04T11:30:00Z"
    },
    {
      "id": "l17",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Cross-browser testing'",
      "meta": {},
      "createdAt": "2026-03-05T09:00:00Z"
    },
    {
      "id": "l18",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Deploy website to production'",
      "meta": {},
      "createdAt": "2026-03-06T13:00:00Z"
    },
    {
      "id": "l19",
      "userId": "u1",
      "projectId": "p1",
      "entity": "task",
      "action": "delete",
      "message": "Deleted task 'Old homepage draft (unused)'",
      "meta": {},
      "createdAt": "2026-03-02T17:00:00Z"
    },
    {
      "id": "l11",
      "userId": "u1",
      "projectId": "p2",
      "entity": "project",
      "action": "create",
      "message": "Created project 'Personal Portfolio Website'",
      "createdAt": "2026-04-09T08:50:00Z"
    },
    {
      "id": "l12",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t11",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Plan portfolio structure'",
      "createdAt": "2026-04-09T09:00:00Z"
    },
    {
      "id": "l13",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t11",
      "entity": "task",
      "action": "update",
      "message": "Marked task 'Plan portfolio structure' as Done",
      "createdAt": "2026-04-10T11:00:00Z"
    },
    {
      "id": "l14",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t12",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Set up Next.js project'",
      "createdAt": "2026-04-10T12:00:00Z"
    },
    {
      "id": "l15",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t12",
      "entity": "task",
      "action": "update",
      "message": "Completed project setup with Tailwind",
      "createdAt": "2026-04-11T15:00:00Z"
    },
    {
      "id": "l16",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t13",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Design homepage layout'",
      "createdAt": "2026-04-11T16:00:00Z"
    },
    {
      "id": "l17",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t13",
      "entity": "task",
      "action": "update",
      "message": "Finished homepage UI layout",
      "createdAt": "2026-04-13T18:00:00Z"
    },
    {
      "id": "l18",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t14",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Implement project showcase section'",
      "createdAt": "2026-04-14T09:00:00Z"
    },
    {
      "id": "l19",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t14",
      "entity": "task",
      "action": "update",
      "message": "Started working on project showcase section",
      "createdAt": "2026-04-20T10:00:00Z"
    },
    {
      "id": "l20",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t15",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Add responsive design'",
      "createdAt": "2026-04-15T10:30:00Z"
    },
    {
      "id": "l21",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t15",
      "entity": "task",
      "action": "update",
      "message": "Improved mobile responsiveness for homepage",
      "createdAt": "2026-04-23T18:00:00Z"
    },
    {
      "id": "l22",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t16",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Integrate contact form'",
      "createdAt": "2026-04-16T11:00:00Z"
    },
    {
      "id": "l23",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t17",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Optimize images and assets'",
      "createdAt": "2026-04-17T14:00:00Z"
    },
    {
      "id": "l24",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t18",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Fix animation glitches'",
      "createdAt": "2026-04-18T13:00:00Z"
    },
    {
      "id": "l25",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t18",
      "entity": "task",
      "action": "update",
      "message": "Investigated animation delay issues",
      "createdAt": "2026-04-21T16:00:00Z"
    },
    {
      "id": "l26",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t19",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Deploy to Vercel'",
      "createdAt": "2026-04-19T15:00:00Z"
    },
    {
      "id": "l27",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t19",
      "entity": "task",
      "action": "update",
      "message": "Prepared environment variables for deployment",
      "createdAt": "2026-04-23T20:00:00Z"
    },
    {
      "id": "l28",
      "userId": "u1",
      "projectId": "p2",
      "taskId": "t20",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Add analytics tracking'",
      "createdAt": "2026-04-20T10:00:00Z"
    },
    {
      "id": "l29",
      "userId": "u1",
      "projectId": "p3",
      "entity": "project",
      "action": "create",
      "message": "Created project 'Event Planning – Tech Conference'",
      "createdAt": "2026-04-03T08:50:00Z"
    },
    {
      "id": "l30",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t21",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Define event theme and agenda'",
      "createdAt": "2026-04-03T09:00:00Z"
    },
    {
      "id": "l31",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t21",
      "entity": "task",
      "action": "update",
      "message": "Finalized conference theme and agenda",
      "createdAt": "2026-04-05T17:00:00Z"
    },
    {
      "id": "l32",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t22",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Book venue'",
      "createdAt": "2026-04-04T10:00:00Z"
    },
    {
      "id": "l33",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t22",
      "entity": "task",
      "action": "update",
      "message": "Confirmed venue booking and paid deposit",
      "createdAt": "2026-04-08T15:00:00Z"
    },
    {
      "id": "l34",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t23",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Invite guest speakers'",
      "createdAt": "2026-04-06T11:00:00Z"
    },
    {
      "id": "l35",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t23",
      "entity": "task",
      "action": "update",
      "message": "Sent invitation emails to 5 potential speakers",
      "createdAt": "2026-04-10T14:00:00Z"
    },
    {
      "id": "l36",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t23",
      "entity": "task",
      "action": "update",
      "message": "Received confirmation from 2 speakers",
      "createdAt": "2026-04-20T18:00:00Z"
    },
    {
      "id": "l37",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t24",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Design promotional materials'",
      "createdAt": "2026-04-07T14:00:00Z"
    },
    {
      "id": "l38",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t24",
      "entity": "task",
      "action": "update",
      "message": "Drafted initial poster designs",
      "createdAt": "2026-04-15T16:00:00Z"
    },
    {
      "id": "l39",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t24",
      "entity": "task",
      "action": "update",
      "message": "Revised designs based on feedback",
      "createdAt": "2026-04-22T19:00:00Z"
    },
    {
      "id": "l40",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t25",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Set up ticketing system'",
      "createdAt": "2026-04-08T16:00:00Z"
    },
    {
      "id": "l41",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t26",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Coordinate catering services'",
      "createdAt": "2026-04-09T12:00:00Z"
    },
    {
      "id": "l42",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t26",
      "entity": "task",
      "action": "update",
      "message": "Requested catering quotes from 3 vendors",
      "createdAt": "2026-04-21T13:00:00Z"
    },
    {
      "id": "l43",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t27",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Hire event staff'",
      "createdAt": "2026-04-10T10:00:00Z"
    },
    {
      "id": "l44",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t28",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Set up audio and visual equipment'",
      "createdAt": "2026-04-11T13:00:00Z"
    },
    {
      "id": "l45",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t29",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Finalize event schedule'",
      "createdAt": "2026-04-12T15:00:00Z"
    },
    {
      "id": "l46",
      "userId": "u1",
      "projectId": "p3",
      "taskId": "t30",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Conduct final rehearsal'",
      "createdAt": "2026-04-13T16:00:00Z"
    },
    {
      "id": "l47",
      "userId": "u1",
      "projectId": "p4",
      "entity": "project",
      "action": "create",
      "message": "Created project 'Fitness Routine Tracker'",
      "createdAt": "2026-03-30T07:50:00Z"
    },
    {
      "id": "l48",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t31",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Set fitness goals'",
      "createdAt": "2026-03-30T08:00:00Z"
    },
    {
      "id": "l49",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t31",
      "entity": "task",
      "action": "update",
      "message": "Defined weight and endurance targets",
      "createdAt": "2026-04-01T09:30:00Z"
    },
    {
      "id": "l50",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t32",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Create weekly workout plan'",
      "createdAt": "2026-03-31T10:00:00Z"
    },
    {
      "id": "l51",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t32",
      "entity": "task",
      "action": "update",
      "message": "Completed workout schedule for the week",
      "createdAt": "2026-04-02T11:00:00Z"
    },
    {
      "id": "l52",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t33",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Start morning runs'",
      "createdAt": "2026-04-02T06:00:00Z"
    },
    {
      "id": "l53",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t33",
      "entity": "task",
      "action": "update",
      "message": "Completed first 2 morning runs",
      "createdAt": "2026-04-05T07:30:00Z"
    },
    {
      "id": "l54",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t33",
      "entity": "task",
      "action": "update",
      "message": "Skipped runs for several days",
      "createdAt": "2026-04-12T07:00:00Z"
    },
    {
      "id": "l55",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t34",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Track daily calorie intake'",
      "createdAt": "2026-04-03T12:00:00Z"
    },
    {
      "id": "l56",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t34",
      "entity": "task",
      "action": "update",
      "message": "Logged meals for 3 consecutive days",
      "createdAt": "2026-04-06T20:00:00Z"
    },
    {
      "id": "l57",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t34",
      "entity": "task",
      "action": "update",
      "message": "Stopped tracking consistently",
      "createdAt": "2026-04-14T20:00:00Z"
    },
    {
      "id": "l58",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t35",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Join a gym'",
      "createdAt": "2026-04-01T15:00:00Z"
    },
    {
      "id": "l59",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t36",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Buy workout equipment'",
      "createdAt": "2026-04-02T16:00:00Z"
    },
    {
      "id": "l60",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t37",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Follow strength training routine'",
      "createdAt": "2026-04-04T07:00:00Z"
    },
    {
      "id": "l61",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t37",
      "entity": "task",
      "action": "update",
      "message": "Completed 2 strength training sessions",
      "createdAt": "2026-04-08T18:00:00Z"
    },
    {
      "id": "l62",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t37",
      "entity": "task",
      "action": "update",
      "message": "Missed planned workouts this week",
      "createdAt": "2026-04-13T18:00:00Z"
    },
    {
      "id": "l63",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t38",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Track progress photos'",
      "createdAt": "2026-04-05T09:00:00Z"
    },
    {
      "id": "l64",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t39",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Maintain sleep schedule'",
      "createdAt": "2026-04-03T22:00:00Z"
    },
    {
      "id": "l65",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t39",
      "entity": "task",
      "action": "update",
      "message": "Improved sleep for a few days",
      "createdAt": "2026-04-07T23:00:00Z"
    },
    {
      "id": "l66",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t39",
      "entity": "task",
      "action": "update",
      "message": "Returned to irregular sleep schedule",
      "createdAt": "2026-04-14T23:00:00Z"
    },
    {
      "id": "l67",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t40",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Evaluate fitness progress'",
      "createdAt": "2026-04-06T10:00:00Z"
    },
    {
      "id": "l68",
      "userId": "u1",
      "projectId": "p5",
      "entity": "project",
      "action": "create",
      "message": "Created project 'E-commerce Website Redesign'",
      "createdAt": "2026-04-02T09:15:00Z"
    },
    {
      "id": "l69",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t41",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Audit current UI/UX issues'",
      "createdAt": "2026-04-02T09:20:00Z"
    },
    {
      "id": "l70",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t41",
      "entity": "task",
      "action": "update",
      "message": "Completed UX audit with list of 15 issues",
      "createdAt": "2026-04-03T14:10:00Z"
    },
    {
      "id": "l71",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t42",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Redesign homepage layout'",
      "createdAt": "2026-04-03T10:00:00Z"
    },
    {
      "id": "l72",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t42",
      "entity": "task",
      "action": "update",
      "message": "Initial wireframe completed",
      "createdAt": "2026-04-05T16:30:00Z"
    },
    {
      "id": "l73",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t42",
      "entity": "task",
      "action": "update",
      "message": "Changed layout direction after stakeholder feedback",
      "createdAt": "2026-04-08T11:00:00Z"
    },
    {
      "id": "l74",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t43",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Improve product page performance'",
      "createdAt": "2026-04-04T08:45:00Z"
    },
    {
      "id": "l75",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t43",
      "entity": "task",
      "action": "update",
      "message": "Optimized images and reduced load time by 35%",
      "createdAt": "2026-04-06T13:20:00Z"
    },
    {
      "id": "l76",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t44",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Fix checkout flow bugs'",
      "createdAt": "2026-04-05T09:30:00Z"
    },
    {
      "id": "l77",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t44",
      "entity": "task",
      "action": "update",
      "message": "Fixed payment validation issue",
      "createdAt": "2026-04-06T18:00:00Z"
    },
    {
      "id": "l78",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t44",
      "entity": "task",
      "action": "update",
      "message": "New bug introduced in coupon system",
      "createdAt": "2026-04-07T09:10:00Z"
    },
    {
      "id": "l79",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t45",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Redesign mobile navigation'",
      "createdAt": "2026-04-06T12:00:00Z"
    },
    {
      "id": "l80",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t45",
      "entity": "task",
      "action": "update",
      "message": "Proposed bottom navigation bar redesign",
      "createdAt": "2026-04-08T17:40:00Z"
    },
    {
      "id": "l81",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t46",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Integrate analytics tracking'",
      "createdAt": "2026-04-07T10:00:00Z"
    },
    {
      "id": "l82",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t47",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Optimize database queries'",
      "createdAt": "2026-04-07T11:15:00Z"
    },
    {
      "id": "l83",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t47",
      "entity": "task",
      "action": "update",
      "message": "Improved query speed for product listings",
      "createdAt": "2026-04-09T14:00:00Z"
    },
    {
      "id": "l84",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t48",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Conduct A/B testing for homepage'",
      "createdAt": "2026-04-08T09:00:00Z"
    },
    {
      "id": "l85",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t48",
      "entity": "task",
      "action": "update",
      "message": "Started A/B test variant A vs B",
      "createdAt": "2026-04-10T12:00:00Z"
    },
    {
      "id": "l86",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t49",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Refactor frontend components'",
      "createdAt": "2026-04-08T15:00:00Z"
    },
    {
      "id": "l87",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t49",
      "entity": "task",
      "action": "update",
      "message": "Refactored 3 major components",
      "createdAt": "2026-04-11T10:30:00Z"
    },
    {
      "id": "l88",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t50",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Remove deprecated checkout feature'",
      "createdAt": "2026-04-09T08:00:00Z"
    },
    {
      "id": "l89",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t50",
      "entity": "task",
      "action": "delete",
      "message": "Removed legacy checkout feature after migration completion",
      "createdAt": "2026-04-12T17:00:00Z"
    },
    {
      "id": "l90",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t45",
      "entity": "task",
      "action": "update",
      "message": "Priority increased to HIGH after mobile drop-off issue reported",
      "createdAt": "2026-04-13T09:00:00Z"
    },
    {
      "id": "l91",
      "userId": "u1",
      "projectId": "p6",
      "entity": "project",
      "action": "create",
      "message": "Created project 'School Management System'",
      "createdAt": "2026-03-28T08:00:00Z"
    },
    {
      "id": "l92",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t51",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Design database schema for students and teachers'",
      "createdAt": "2026-03-28T08:15:00Z"
    },
    {
      "id": "l93",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t51",
      "entity": "task",
      "action": "update",
      "message": "Finalized ERD for core entities",
      "createdAt": "2026-03-30T10:30:00Z"
    },
    {
      "id": "l94",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t52",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Build student enrollment module'",
      "createdAt": "2026-03-29T09:00:00Z"
    },
    {
      "id": "l95",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t52",
      "entity": "task",
      "action": "update",
      "message": "Implemented basic enrollment flow",
      "createdAt": "2026-04-02T14:00:00Z"
    },
    {
      "id": "l96",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t53",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Develop teacher dashboard'",
      "createdAt": "2026-03-30T11:00:00Z"
    },
    {
      "id": "l97",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t53",
      "entity": "task",
      "action": "update",
      "message": "Completed UI layout for dashboard",
      "createdAt": "2026-04-04T16:00:00Z"
    },
    {
      "id": "l98",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t54",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Implement attendance tracking'",
      "createdAt": "2026-03-31T09:30:00Z"
    },
    {
      "id": "l99",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t54",
      "entity": "task",
      "action": "update",
      "message": "Integrated QR-based attendance system",
      "createdAt": "2026-04-05T13:20:00Z"
    },
    {
      "id": "l100",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t55",
      "entity": "task",
      "action": "create",
      "message": "Created task 'Build grading system'",
      "createdAt": "2026-04-01T10:00:00Z"
    },
    {
      "id": "l101",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t55",
      "entity": "task",
      "action": "update",
      "message": "Partial implementation of grade computation logic",
      "createdAt": "2026-04-06T15:00:00Z"
    },
    {
      "id": "l102",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t56",
      "entity": "task",
      "action": "create",
      "message": "Setup authentication system",
      "createdAt": "2026-04-02T08:00:00Z"
    },
    {
      "id": "l103",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t56",
      "entity": "task",
      "action": "update",
      "message": "Added login and registration endpoints",
      "createdAt": "2026-04-03T18:00:00Z"
    },
    {
      "id": "l104",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t57",
      "entity": "task",
      "action": "create",
      "message": "Integrate email notifications",
      "createdAt": "2026-04-03T09:00:00Z"
    },
    {
      "id": "l105",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t57",
      "entity": "task",
      "action": "update",
      "message": "Email notifications working for enrollment updates",
      "createdAt": "2026-04-07T11:00:00Z"
    },
    {
      "id": "l106",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t58",
      "entity": "task",
      "action": "create",
      "message": "Fix role-based access control bugs",
      "createdAt": "2026-04-04T10:00:00Z"
    },
    {
      "id": "l107",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t58",
      "entity": "task",
      "action": "update",
      "message": "Fixed teacher/admin permission mismatch",
      "createdAt": "2026-04-08T14:00:00Z"
    },
    {
      "id": "l108",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t59",
      "entity": "task",
      "action": "create",
      "message": "Migrate database to PostgreSQL",
      "createdAt": "2026-04-05T08:30:00Z"
    },
    {
      "id": "l109",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t59",
      "entity": "task",
      "action": "update",
      "message": "Migration started but encountered schema conflicts",
      "createdAt": "2026-04-09T12:00:00Z"
    },
    {
      "id": "l110",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t59",
      "entity": "task",
      "action": "update",
      "message": "Rolled back partial migration due to data mismatch",
      "createdAt": "2026-04-10T16:00:00Z"
    },
    {
      "id": "l111",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t60",
      "entity": "task",
      "action": "create",
      "message": "Optimize API response times",
      "createdAt": "2026-04-06T09:00:00Z"
    },
    {
      "id": "l112",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t60",
      "entity": "task",
      "action": "update",
      "message": "Reduced average API latency by 40%",
      "createdAt": "2026-04-11T10:00:00Z"
    },
    {
      "id": "l113",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t61",
      "entity": "task",
      "action": "create",
      "message": "Prepare deployment pipeline",
      "createdAt": "2026-04-07T08:00:00Z"
    },
    {
      "id": "l114",
      "userId": "u1",
      "projectId": "p6",
      "taskId": "t61",
      "entity": "task",
      "action": "update",
      "message": "CI/CD pipeline configured but not fully tested",
      "createdAt": "2026-04-12T15:00:00Z"
    },
    {
      "id": "l115",
      "userId": "u1",
      "projectId": "p4",
      "taskId": "t38",
      "entity": "task",
      "action": "update",
      "message": "Priority of \"Track progress photos\" changed",
      "meta": {
        "from": "Low",
        "to": "None"
      },
      "createdAt": "2026-04-24T06:33:26.119Z"
    },
    {
      "id": "l116",
      "userId": "u1",
      "projectId": "p1",
      "taskId": "t1",
      "entity": "task",
      "action": "move",
      "message": "Task \"Meet client and gather requirements\" moved to In Progress",
      "meta": {
        "from": "Done",
        "to": "In Progress"
      },
      "createdAt": "2026-04-24T07:07:56.271Z"
    },
    {
      "id": "l117",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t60",
      "entity": "task",
      "action": "update",
      "message": "Task \"Conduct performance audit\" updated",
      "meta": {},
      "createdAt": "2026-04-24T07:16:05.988Z"
    },
    {
      "id": "l118",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t60",
      "entity": "task",
      "action": "update",
      "message": "Priority of \"Conduct performance audit\" changed",
      "meta": {
        "from": "Medium",
        "to": "High"
      },
      "createdAt": "2026-04-24T07:16:35.722Z"
    },
    {
      "id": "l119",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t58",
      "entity": "task",
      "action": "update",
      "message": "Task \"Refactor project service layer\" updated",
      "meta": {},
      "createdAt": "2026-04-24T07:16:49.946Z"
    },
    {
      "id": "l120",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t58",
      "entity": "task",
      "action": "update",
      "message": "Priority of \"Refactor project service layer\" changed",
      "meta": {
        "from": "Medium",
        "to": "Low"
      },
      "createdAt": "2026-04-24T07:17:07.898Z"
    },
    {
      "id": "l121",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t58",
      "entity": "task",
      "action": "update",
      "message": "Priority of \"Refactor project service layer\" changed",
      "meta": {
        "from": "Low",
        "to": "Medium"
      },
      "createdAt": "2026-04-24T07:17:11.637Z"
    },
    {
      "id": "l122",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t55",
      "entity": "task",
      "action": "update",
      "message": "Task \"Update project UI components to new design system\" updated",
      "meta": {},
      "createdAt": "2026-04-24T07:17:19.053Z"
    },
    {
      "id": "l123",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t53",
      "entity": "task",
      "action": "update",
      "message": "Task \"Improve API response time for projects endpoint\" updated",
      "meta": {},
      "createdAt": "2026-04-24T07:17:23.714Z"
    },
    {
      "id": "l124",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t53",
      "entity": "task",
      "action": "update",
      "message": "Priority of \"Improve API response time for projects endpoint\" changed",
      "meta": {
        "from": "Low",
        "to": "High"
      },
      "createdAt": "2026-04-24T07:17:42.149Z"
    },
    {
      "id": "l125",
      "userId": "u1",
      "projectId": "p5",
      "taskId": "t57",
      "entity": "task",
      "action": "update",
      "message": "Task \"Implement notification system for task deadlines\" updated",
      "meta": {},
      "createdAt": "2026-04-24T07:17:57.996Z"
    },
    {
      "id": "l126",
      "userId": "u1",
      "projectId": "p1",
      "taskId": "t7",
      "entity": "task",
      "action": "update",
      "message": "Tags of \"Integrate product catalog\" updated",
      "meta": {
        "from": "frontend, data",
        "to": "frontend, data, product"
      },
      "createdAt": "2026-04-24T07:20:49.704Z"
    }
  ]
}
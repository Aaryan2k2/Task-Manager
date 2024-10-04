# Todo App Monorepo

Welcome to the **Todo App Monorepo**, a full-stack application that includes a frontend built using React (Vite) and a backend API built with Django and Django REST framework. This app allows users to manage their todo lists with both frontend and backend features working seamlessly together.

## Project Structure

This monorepo is organized into two main directories:

```bash
├── client/                # React frontend built with Vite
└── server-django/         # Django REST API backend
    └── backend/
```

## Prerequisites
Before you get started, make sure you have the following installed:

1. Node.js (for frontend)
2. Python 3.x and pip (for backend)

# Frontend Setup (React - Vite)
To set up and run the frontend locally, follow these steps:

## Navigate to the /client directory:
```bash
cd client
```

## Install the dependencies:
```bash
npm install
```

## Start the development server:
```bash
npm run dev
```

# Backend Setup (Django REST API)
To set up and run the backend API locally:

## Navigate to the /server-django/backend directory:
```bash
cd server-django/backend
```

## Start the Django development server:
```bash
python manage.py runserver
```

The backend API will be running at http://localhost:8000.

# API Endpoints

## The backend provides several endpoints for managing todo items through the Django REST API.

### Some of the key endpoints include:

- GET /api/tasks/ - Retrieve a list of all todos
- POST /api/tasks/ - Create a new todo item
- GET /api/tasks/:id/ - Retrieve a detail of todo
- PUT /api/todos/:id/ - Update an existing todo item
- DELETE /api/todos/:id/ - Delete a todo item

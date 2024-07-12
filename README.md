# Task Management Application

## Overview

This project is a task management application built with a React frontend and an Express/MongoDB backend. Users can add, edit, delete, and toggle the completion status of tasks. The application provides a user-friendly interface for managing tasks efficiently.

## Live Demo

- **Frontend**: [Task Management Frontend](https://byte-bux-task.vercel.app/)
- **Backend**: [Task Management Backend](https://byte-bux-backend-1.onrender.com/)

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as complete or incomplete
- Real-time updates on task status

## Setup and Run the Project Locally

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (Local or Atlas)

### Backend Setup

1. Clone the repository:

```sh
git clone https://github.com/Taz-war/byte-bux_backend
cd byte-bux-backend
```
2. Install dependencies:
    npm install

3. Create a .env file in the root directory and add the following environment variables:

    DB_USER=fahimtazwer
    DB_PASS=IB20BPlIqDkbCEIG

4. Start the backend server:
    node index.js
The backend server will start on http://localhost:5000.

### Frontend Setup

1. Clone the repository:
    git clone https://github.com/Taz-war/byte-bux_task
    cd byte-bux-frontend

2. Install dependencies:
    npm install

3. Start the frontend development server:
    npm start
The frontend will start on http://localhost:3000.

# API Documentation

### Get All Tasks
- **URL**: '/tasks'
- **Method**: 'GET'
- **Description**: 'GET'
- **Response**: [
  {
    "_id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "completed": false
  },
  ...
]

### Create a New Task

- **URL**: '/tasks'
- **Method**: 'POST'
- **Description**:  Create a new task.
- **RequestBody**:{
  "title": "Task Title",
  "description": "Task Description",
  "completed": false
}
- **Response**:{
  "acknowledged": true,
  "insertedId": "new_task_id"
}

### Update a Task

- **URL**: '/tasks/:id'
- **Method**: 'PUT'
- **Description**:  Update an existing task.
- **RequestBody**:{
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true
}

- **Response**:{
  "matchedCount": 1,
  "modifiedCount": 1,
  "upsertedId": null
}

### Update a Status

- **URL**: '/tasks/:id'
- **Method**: 'PATCH'
- **Description**:  Update the completion status of a task.
- **RequestBody**:{
  "completed": true
}
- **Response**:{
  "matchedCount": 1,
  "modifiedCount": 1,
  "upsertedId": null
}

### Delete a Task
- **URL**: '/tasks/:id'
- **Method**: 'DELETE'
- **Description**: Delete a task.
- **Response**: {
  "success": true,
  "message": "Task deleted successfully"
}

# License

This project is licensed under the MIT License. See the LICENSE file for details.

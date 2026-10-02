# Employee Task Management System — MERN Stack

A complete assignment-ready MERN application for creating, managing, searching, filtering and updating employee tasks.

## Features

- Dashboard: Total, Pending, In Progress and Completed task counts
- Add task: title, description, priority, status and due date
- View all tasks in a responsive table
- Edit task
- Delete task with browser confirmation
- Change status directly from the table
- Search by task title
- Filter by status and priority
- Frontend + backend validation
- MongoDB persistence using Mongoose
- REST APIs with JSON requests/responses
- Responsive UI

## Project structure

```text
employee-task-management/
├── backend/
│   ├── config/db.js
│   ├── controllers/taskController.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/components/
│   ├── src/services/api.js
│   ├── src/App.jsx
│   ├── src/main.jsx
│   ├── src/styles.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Prerequisites

Install:

1. Node.js 18+ (Node.js 20+ recommended)
2. MongoDB Community Server OR a MongoDB Atlas cluster
3. MongoDB Compass (optional GUI for viewing/managing the database)

**Important:** MongoDB Compass is a database GUI/client. It does not replace the MongoDB database server. For a local setup, MongoDB Community Server must be running. Alternatively, use MongoDB Atlas and connect Compass to the Atlas URI.

## Option A — Local MongoDB + Compass

### 1. Start MongoDB

Make sure the MongoDB service/server is running on your computer.

The application expects this default connection:

```text
mongodb://127.0.0.1:27017/employee_task_management
```

### 2. Backend

Open a terminal:

```bash
cd backend
npm install
```

Create a file named `.env` inside `backend`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee_task_management
```

Start the backend:

```bash
npm run dev
```

You should see:

```text
MongoDB connected
Server running on http://localhost:5000
```

### 3. Connect MongoDB Compass

Open MongoDB Compass and connect to:

```text
mongodb://127.0.0.1:27017
```

After you create the first task, you will see:

```text
employee_task_management
└── tasks
```

### 4. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will display a URL similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

## Option B — MongoDB Atlas + Compass

If you do not want a local MongoDB server, create a MongoDB Atlas database and copy its connection string. Put it in `backend/.env`, for example:

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/employee_task_management
```

Then run the backend and frontend exactly as above.

You can also connect the same Atlas connection through MongoDB Compass.

## REST API

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks?search=report&status=Pending&priority=High` | Search/filter tasks |
| GET | `/tasks/stats` | Dashboard statistics |
| POST | `/tasks` | Create task |
| PUT | `/tasks/:id` | Update complete task |
| PATCH | `/tasks/:id/status` | Change task status |
| DELETE | `/tasks/:id` | Delete task |

### Example POST body

```json
{
  "title": "Prepare monthly report",
  "description": "Prepare and submit the monthly sales report.",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2026-10-15"
}
```

## How to demonstrate the assignment

1. Open the dashboard and show the four statistics.
2. Click **Add Task** and create 3–5 tasks with different priorities/statuses.
3. Demonstrate that the dashboard counts update automatically.
4. Use the search box to search by title.
5. Filter by status and priority.
6. Change a task from Pending → In Progress → Completed.
7. Edit a task and save it.
8. Delete a task and show the confirmation popup.
9. Open MongoDB Compass and show that the task documents are persisted in the `tasks` collection.
10. Optionally use Postman to demonstrate each REST endpoint.

## Troubleshooting

### MongoDB connection failed

- Check that MongoDB Community Server is running, or that your Atlas cluster is available.
- Check `MONGO_URI` in `backend/.env`.
- For Atlas, make sure your IP address is allowed and the username/password are correct.

### Frontend says Failed to fetch

Make sure the backend is running on port 5000 before using the frontend.

### Port already in use

Change `PORT` in `backend/.env`, and update `VITE_API_URL` in `frontend/.env` accordingly.

## Technology used

- React + Vite
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- CSS
- Lucide React icons

# TaskFlow — Task Management System

A full-stack MERN application for creating, organizing, and tracking personal tasks and projects through a secure, real-time dashboard.

---

## ✨ Features

- 🔐 Secure authentication with JWT and bcrypt password hashing
- 📊 Dashboard with live task statistics, recent activity, and upcoming deadlines
- ✅ Full task CRUD with priority (High / Medium / Low) and status (Pending / In Progress / Completed)
- 📁 Project management with target due dates
- 👤 Profile page with live productivity metrics and avatar upload
- 🛡️ Protected routes on both frontend and backend
- 🌐 Public landing page with feature highlights

---

## 🛠️ Tech Stack

**Frontend**
- React 19
- React Router DOM v7
- Axios
- Bootstrap 5
- React Icons
- Vite

**Backend**
- Node.js
- Express 5
- MongoDB with Mongoose
- bcryptjs
- jsonwebtoken (JWT)
- Multer (file uploads)
- CORS, dotenv

---

## 📂 Project Structure

```
TaskManagement/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   ├── projectController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── projectRoutes.js
│   │   └── userRoutes.js
│   ├── .env                   # environment variables (not committed)
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Sidebar.jsx
        │   ├── Header.jsx
        │   ├── Footer.jsx
        │   ├── Hero.jsx
        │   ├── Features.jsx
        │   ├── HowItWorks.jsx
        │   ├── TaskCard.jsx
        │   ├── ProjectCard.jsx
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   ├── Tasks.jsx
        │   ├── Projects.jsx
        │   ├── Profile.jsx
        │   └── About.jsx
        ├── services/
        │   ├── api.js          # Axios instance + auth token interceptor
        │   ├── authService.js
        │   ├── taskService.js
        │   └── projectService.jsx
        ├── App.jsx
        └── main.jsx
```

---

## 📸 Screenshots

> Add your screenshots to a `screenshots/` folder in the project root, then they'll display below.

**Landing Page**
![Login](./screenshots/landingpage.png)

**Login**
![Login](./screenshots/login.png)

**Register**
![Login](./screenshots/register.png)

**Dashboard**
![Dashboard](./screenshots/dashboard.png)

**Tasks**
![Tasks](./screenshots/tasks.png)

**Projects**
![Projects](./screenshots/projects.png)

**Profile**
![Profile](./screenshots/profile.png)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) — a local instance or a MongoDB Atlas connection string
- npm

### 1. Clone the repository

```bash
git clone https://github.com/bukkereddiswapna/Task-Management-System/
cd TaskManagement
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:

```
PORT=5000
MONGO_URI=mongodb://239x1a3329_db_user:KZAAA4ZZAxkmztOP@ac-7ew9vvr-shard-00-00.qmx2wto.mongodb.net:27017,ac-7ew9vvr-shard-00-01.qmx2wto.mongodb.net:27017,ac-7ew9vvr-shard-00-02.qmx2wto.mongodb.net:27017/courseDB?ssl=true&replicaSet=atlas-2xfa5s-shard-0&authSource=admin&appName=Cluster0
JWT_SECRET=mysecret
```

Start the backend server:

```bash
npm run dev
```

The API will run at `http://localhost:5000`.

### 3. Set up the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173` (Vite's default port).

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Protected |
|--------|----------|--------------|-----------|
| POST | `/api/auth/register` | Create a new account | No |
| POST | `/api/auth/login` | Authenticate and receive a JWT | No |
| GET | `/api/auth/profile` | Get the logged-in user's profile | Yes |
| PUT | `/api/auth/profile` | Update name / email | Yes |
| PUT | `/api/users/profile` | Update profile, including avatar upload | Yes |
| POST | `/api/tasks` | Create a task | Yes |
| GET | `/api/tasks` | List the logged-in user's tasks | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |
| POST | `/api/projects` | Create a project | Yes |
| GET | `/api/projects` | List the logged-in user's projects | Yes |
| DELETE | `/api/projects/:id` | Delete a project (owner-checked) | Yes |

Protected routes require an `Authorization: Bearer <token>` header. The frontend's `api.js` Axios instance attaches this automatically from `localStorage` once logged in.

---

## 🗄️ Database Models

**User**
- `fullname` — String, required
- `email` — String, required, unique
- `password` — String, hashed with bcrypt

**Task**
- `title`, `description` — String, required
- `priority` — `High` | `Medium` | `Low`
- `status` — `Pending` | `In Progress` | `Completed`
- `dueDate` — Date
- `user` — ObjectId reference to `User`

**Project**
- `title`, `description` — String, required
- `targetDueDate` — Date
- `user` — ObjectId reference to `User`

---

## 🔐 Authentication Flow

1. User registers or logs in via `Login.jsx` / `Register.jsx`
2. Backend hashes/compares the password with bcrypt
3. On success, the backend signs a JWT (30-day expiry) and returns it along with the user object
4. The frontend stores the token and user in `localStorage`
5. Every subsequent request automatically attaches the token via the Axios interceptor in `api.js`
6. `authMiddleware.js` verifies the token on the backend; `ProtectedRoute.jsx` guards routes on the frontend

---

## 🧭 Roadmap / Future Enhancements

- ⏰ Automated due-date email reminders (node-cron + Nodemailer are installed but not yet wired up)
- 📱 Mobile app
- 🤖 AI-based task prioritization
- 📈 Advanced analytics dashboard
- 👥 Team collaboration on shared projects

---

## 📄 License

This project is for educational purposes.

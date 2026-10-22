# 🚀 NextHire – Job Portal

NextHire is a full-stack job portal web application designed to help students and job seekers explore job opportunities, apply for jobs, manage their profiles, upload resumes, and track their application status.

The project is built using React.js for the frontend, Spring Boot for the backend, and MySQL for database management.

## ✨ Features

### 👨‍🎓 Student Module
- Student Registration and Login
- Student Profile Management
- Browse and Search Job Opportunities
- Apply for Jobs
- View My Applications
- Track Application Status
- Upload and Download Resume
- Notifications for Application Status
- Account Settings

### 🛠️ Admin Module
- Admin Dashboard
- Add, Update, and Delete Jobs
- Manage Job Applications
- View Applicants
- Update Application Status
- View Dashboard Statistics

*Note: Admin module features are planned and will be implemented as development progresses.*

## 🧰 Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- Hibernate

**Database**
- MySQL

**Tools**
- Visual Studio Code
- Eclipse / Spring Tool Suite
- Git
- GitHub
- Postman

## 🏗️ Project Architecture

The application follows a client-server architecture:

1. React.js provides the user interface.
2. Axios sends HTTP requests to the Spring Boot REST APIs.
3. Spring Boot handles application logic and database operations.
4. MySQL stores student, job, and application information.

## ⚙️ Getting Started

### Prerequisites
- Node.js and npm
- Java JDK
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd NextHire
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Run the Frontend

Navigate to the frontend folder:

```bash
cd frontend
npm install
npm start
```

The frontend runs at:

`http://localhost:3000`

*If your React project is in the repository root, run `npm install` and `npm start` from the root folder instead.*

### 3. Run the Backend

1. Open the Spring Boot project in Eclipse or Spring Tool Suite.
2. Configure your MySQL database in `application.properties`.
3. Run the Spring Boot application.

The backend typically runs at:

`http://localhost:8080`

### 4. Database Configuration

Create the MySQL database and configure the database connection in `application.properties`.

Do not commit database passwords, API keys, or other secrets to GitHub. Use your own local configuration.

## 🔌 Key API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/studentregistration` | Register a student |
| POST | `/studentlogin` | Student login |
| GET | `/student/{id}` | Get student details |
| GET | `/student/email/{email}` | Get student by email |
| PUT | `/updateprofile/{id}` | Update student profile |
| POST | `/student/{studentid}/resume` | Upload resume |
| GET | `/student/{studentid}/resume/download` | Download resume |
| GET | `/findalljobs` | Get all jobs |
| GET | `/findbyid/{jobid}` | Get job details |
| POST | `/applyjob` | Apply for a job |
| GET | `/application/student/{studentid}` | View student applications |

## 📌 Future Enhancements

- Complete Admin Dashboard
- Role-Based Access Control
- Secure Password Hashing
- Advanced Job Search and Filtering
- Improved Notification Management
- Enhanced Validation and Error Handling

## 🎯 Project Objective

The objective of NextHire is to provide a centralized platform connecting job seekers with employment opportunities while simplifying job applications and application tracking.

## 👩‍💻 Developer

**Gayatri Shitole**

Full Stack Development Project

---

⭐ If you find this project useful, consider giving the repository a star.

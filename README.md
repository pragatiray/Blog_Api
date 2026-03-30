# 🚀 Blog API

## 📌 Description

A secure and scalable **Blog Backend API** where users can create and manage blogs, while other users can interact through likes and comments. Built with production-level practices including authentication, security, and performance optimizations.

---

## ⚙️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **TypeScript**
* **JWT (Authentication)**
* **Winston (Logging)**

---
## 📂 Project Structure

src/
│── config/        # Environment & app configuration  
│── controllers/   # Request handling logic  
│── models/        # Database schemas  
│── routes/        # API route definitions  
│── lib/           # Core utilities (DB, logger, rate limiter)  
│── utils/         # Helper functions  
│── server.ts      # Entry point  

## 🔥 Features

* 📝 Create, update, delete blogs
* ❤️ Like and 💬 comment on blogs
* 🔐 JWT-based authentication & authorization
* 🔑 Secure password hashing using bcrypt
* 🧠 Auto-generated unique usernames
* 🛡️ Security using Helmet, CORS & Rate Limiting
* ⚡ Response compression for better performance
* 📊 Centralized logging with Winston
* 🔄 Graceful server shutdown

---

## 📡 API Endpoints

### 🔐 Auth

* `POST /auth/register` → Register user
* `POST /auth/login` → Login user

### 📝 Blogs

* `GET /blogs` → Get all blogs
* `POST /blogs` → Create blog
* `PUT /blogs/:id` → Update blog
* `DELETE /blogs/:id` → Delete blog

### ❤️ Interactions

* `POST /blogs/:id/like` → Like a blog
* `POST /blogs/:id/comment` → Comment on a blog

---

## 🔐 Authentication

* Uses **JWT (JSON Web Token)** for secure authentication
* Protected routes require a valid token
* Passwords are hashed using **bcrypt** before storing

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Setup environment variables

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
WHITELIST_ORIGINS=http://localhost:3000
```

### 3️⃣ Run server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 🔌 API Base URL

```
/api/v1
```

---

## 🛡️ Security & Performance

* **Helmet** → Secure HTTP headers
* **CORS** → Restrict unauthorized origins
* **Rate Limiting** → Prevent abuse
* **Compression** → Optimize response size

---

## 🔄 Graceful Shutdown

* Handles `SIGINT` & `SIGTERM`
* Closes DB connection before exit
* Ensures clean server shutdown

---

## 💡 Highlights

* Designed modular and scalable backend architecture
* Implemented real-world features (likes, comments, auth)
* Focused on security, performance, and clean code practices

---
## 📄 License
This project is licensed under the Apache 2.0 License.


## 👨‍💻 Author

**Pragati Kumari Ray**

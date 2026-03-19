# Auto AI Shorts Backend (Express API)

![Node.js](https://img.shields.io/badge/Node.js-Express/Mongoose-339933?style=flat&logo=node.js)
![License](https://img.shields.io/badge/license-ISC-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)

> **Note:** Despite the repository name/description, the current backend codebase implements a **blog + user authentication API** (JWT cookie auth, CRUD blogs, likes/comments, and Cloudinary image uploads). There is **no AI short/video generation** code and **no Inngest workflows** detected in this repository.

---

## 1. Project Overview

This backend provides a REST API for a web application that supports:

- User registration, login, logout
- Authenticated profile retrieval and password reset/update flows
- Blog creation and management (CRUD)
- Likes/unlikes and comments on blogs
- Search and carousel-like blog listing
- Uploading images (cover image and profile picture) to **Cloudinary**
- Sending password reset emails via **Nodemailer (Gmail SMTP)**

It exists to persist user/blog data in **MongoDB** and provide authenticated access patterns for the frontend.

---

## 2. Key Features

- **Cookie-based JWT authentication** (`token` cookie)
- **MongoDB persistence** via **Mongoose** models
- **Media uploads** using **multer** (temporary local storage) + **Cloudinary** upload
- **Asynchronous-friendly request handling** (all routes are async/await-based)
- **Paginated blog listing** (`/blogs?page=...`)
- **Likes/Unlike** tracking with `likedBlogs` array on the user document
- **Comment upsert logic** per blog and user (updates existing comment if user already commented)
- **CORS configured** for local and deployed frontend origins
- **Global error handler** returning consistent JSON error payloads

---

## 3. Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Server framework | Express (`express`) |
| Database | MongoDB (`mongoose`) |
| Auth | JWT (`jsonwebtoken`) stored in HTTP-only cookie (`cookie-parser`) |
| CORS | `cors` |
| File uploads | `multer` (disk storage into `./uploads`) |
| Media storage | Cloudinary (`cloudinary`) |
| Email | Nodemailer (`nodemailer`) |
| Dev server | Nodemon (`nodemon`) |

**Declared dependencies in `backend/package.json`:**
- `express`, `mongoose`, `dotenv`, `cors`, `cookie-parser`, `jsonwebtoken`, `bcrypt`, `multer`, `cloudinary`, `nodemailer`, `moment`, `react-hot-toast`, `socket.io-client`, `dot`, plus a local entry `backend: "file:"`.

> Based on searches in the backend source, `moment`, `react-hot-toast`, `socket.io-client`, and `dot` are **not referenced** by the backend code currently present.

---

## 4. System Architecture

### End-to-end flow (what the backend actually does)

```mermaid
flowchart LR
  A[Client Request] --> B[Express Routes (/api/v1)]
  B --> C{Auth required?}
  C -- No --> D[Controller logic]
  C -- Yes --> E[isAuthenticated middleware]
  E --> F[Verify JWT from token cookie]
  F --> G[Load user from MongoDB]
  D --> H[Mongoose DB operations]
  D --> I{Media upload?}
  I -- Yes --> J[multer saves temp file to backend/uploads]
  J --> K[Upload to Cloudinary]
  K --> L[Update MongoDB fields with Cloudinary URL]
  H --> M[JSON Response]
  M --> A[Client Output]
```

---

## 5. API Endpoints

Base URL: `/api/v1`  
Auth method: HTTP-only cookie named `token` (set by `POST /login`)

Error format (global):  
`{ "success": false, "message": "<error message>" }`

### Blog endpoints

| Method | Route | Auth | Description | Request Body / Form | Response |
|---|---|---|---|---|---|
| `POST` | `/create` | Yes | Create a new blog post with cover image | `multipart/form-data` with `coverImage` file; JSON fields `title`, `description`, `category` | `200` (default) `{ "success": true, "savedBlog": <blog> }` |
| `GET` | `/blogs` | No | List blogs with pagination (`page` query) | N/A | `{ "success": true, "blogs": [ ... ] }` |
| `GET` | `/blog/:id` | No | Get a single blog by id (populates `author` and `comments.userId`) | N/A | `{ "success": true, "blog": <blog> }` |
| `DELETE` | `/blog/:id` | Yes | Delete a blog if it belongs to the authenticated user | N/A | `{ "success": true }` |
| `PUT` | `/blog/:id` | Yes | Update blog fields; optionally update cover image | JSON body (spread into document); optionally `multipart/form-data` with `coverImage` | `{ "success": true, "updatedBlog": <blog> }` |
| `GET` | `/myBlogs` | Yes | List blogs authored by the authenticated user | N/A | `{ "success": true, "myBlogs": [ ... ] }` |
| `POST` | `/like/:id` | Yes | Like a blog (increments `likes` and updates `user.likedBlogs`) | N/A | If already liked: `{}`. Else: `{ "success": true, "blog": <updatedBlog>, "updatedUser": <user> }` |
| `POST` | `/unlike/:id` | Yes | Unlike a blog (decrements `likes` and updates `user.likedBlogs`) | N/A | If not liked: `{}`. Else: `{ "success": true, "updatedBlog": <blog>, "updatedUser": <user> }` |
| `POST` | `/addcomment/:id` | Yes | Add/update a comment on a blog | JSON body: `comment` | `{ "success": true, "blog": <updatedBlog> }` |
| `GET` | `/author/:id` | Yes | Fetch author’s blogs and author profile | N/A | `{ "success": true, "blogs": [ ... ], "author": <user> }` |
| `POST` | `/search` | Yes | Search blogs by title or author name | Expects query string: `searchInput` (uses `req.query.searchInput`) | `{ "success": true, "blogs": [ ... ] }` |
| `GET` | `/carousel` | No | Shuffle blogs and return 4 items | N/A | `{ "success": true, "blogs": [ ...4 ] }` |

### User/auth endpoints

| Method | Route | Auth | Description | Request Body / Form | Response |
|---|---|---|---|---|---|
| `POST` | `/upload/profilePic` | Yes | Upload/update authenticated user avatar | `multipart/form-data` with `profilePic` file | `{ "success": true, "savedUser": <user> }` |
| `PUT` | `/resetPassword/:token` | No | Reset password using JWT token | JSON body: `password` | `{ "success": true, "user": <updatedUser> }` |
| `POST` | `/register` | No | Register a new user | JSON body: `email`, `password`, `name` | `{ "success": true, "saveduser": <user> }` |
| `POST` | `/login` | No | Login and set `token` cookie | JSON body: `email`, `password` | `{ "success": true, "token": "<jwt>", "user": <user> }` (+ `token` cookie) |
| `GET` | `/me` | Yes | Get authenticated user profile | N/A | `{ "success": true, "user": <user> }` |
| `GET` | `/logout` | Yes | Logout (clears cookie) | N/A | `{ "success": true, "message": "Logout successfully" }` |
| `POST` | `/forgotPassword` | No | Send password reset email | JSON body: `email` | `{ "success": true, "message": "sent message successfully" }` |
| `PATCH` | `/updatePassword` | Yes | Update password by verifying old password | JSON body: `oldPassword`, `newPassword` | `{ "success": true, "updatedUser": <user> }` |
| `PUT` | `/completeProfile` | Yes | Update profile fields | JSON body (expects `contactInfo` array; if non-empty updates `contactInfo`, `bio`, `profession`, `name`) | `{ "success": true, "updatedUser": <user> }` |

### Health check

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Returns plain text `ok` |

---

## 6. Environment Variables

The backend loads environment variables via `dotenv` (`backend/index.js`).

Only the following are referenced by the backend code:

| Variable | Required | Used for | Notes |
|---|---:|---|---|
| `SECRET_KEY` | Yes | JWT signing/verifying (auth cookie + password reset) | Used in `userControllers.js`, `middleware/auth.js`, `utils/sendEmail.js`, and `resetPassword` |
| `MONGO_USERNAME` | Yes | MongoDB Atlas connection string | Used in `backend/db/conn.js` |
| `MONGO_PASSWORD` | Yes | MongoDB Atlas connection string | Used in `backend/db/conn.js` |
| `send_Email_User` | Yes | Gmail SMTP auth for password reset email | Used in `backend/utils/sendEmail.js` |
| `send_Email_Password` | Yes | Gmail SMTP auth for password reset email | Used in `backend/utils/sendEmail.js` |
| `PORT` | Optional | Express listen port | Defaults to `5000` |

### Example `.env` (placeholders)

```env
PORT=5000
SECRET_KEY=<your-jwt-secret>

MONGO_USERNAME=<your-mongo-username>
MONGO_PASSWORD=<your-mongo-password>

send_Email_User=<your-gmail-email>
send_Email_Password=<your-gmail-app-password>
```

> `backend/.env` in the repo contains additional keys (e.g., `ATLAS_username`, `password`) but they are not referenced by the current backend code.

---

## 7. Project Structure

Repository root contains both `backend/` and `frontend/`.

### Backend (`backend/`)

| Path | Purpose |
|---|---|
| `backend/index.js` | Express server setup, CORS config, route mounting, starts server |
| `backend/routes/*Routes.js` | API route definitions (blog + user) |
| `backend/controllers/*Controller.js` | Request handling and MongoDB operations |
| `backend/middleware/auth.js` | Auth middleware: reads `token` cookie, verifies JWT, sets `req.user` |
| `backend/middleware/error.js` | Global error handler (returns `{success:false,message}`) |
| `backend/middleware/multer.js` | File upload middleware (disk storage to `./uploads`) |
| `backend/db/conn.js` | MongoDB connection via Mongoose |
| `backend/model/*Model.js` | Mongoose schemas/models for `user` and `blog` |
| `backend/utils/cloudinary.js` | Cloudinary upload helper |
| `backend/utils/sendEmail.js` | Nodemailer password-reset email sender |
| `backend/uploads/` | Local temporary upload directory used by multer |

Deployment config:
- `backend/vercel.json` routes requests to `index.js` using `@vercel/node`

---

## 8. Setup & Local Development

### Prerequisites
- Node.js + npm
- MongoDB Atlas credentials (or compatible MongoDB reachable from the server)
- Cloudinary account (for image uploads)
- Gmail SMTP credentials suitable for sending email (used by Nodemailer)

### Installation

```bash
cd backend
npm install
```

### Environment setup

Create a `.env` file in `backend/` using the variables described in **Environment Variables**.

### Running the server

```bash
cd backend
npm run dev
```

The server starts on:
- `process.env.PORT` or `5000`

### Running workers/background jobs
No background workers or job processors exist in this backend codebase.

---

## 9. How It Works (Detailed Pipeline)

### Example pipeline: Create a blog post with a cover image

1. Client sends `POST /api/v1/create` with:
   - JSON fields: `title`, `description`, `category`
   - A `multipart/form-data` file field: `coverImage`
2. `isAuthenticated` middleware:
   - Reads `token` cookie
   - Verifies JWT using `SECRET_KEY`
   - Loads the user from MongoDB and attaches it to `req.user`
3. `multer` middleware:
   - Stores the uploaded file temporarily in `backend/uploads`
4. `createBlog` controller:
   - Validates `title`, `description`, `category`, and presence of uploaded file path
   - Uploads the temporary file to Cloudinary (`utils/cloudinary.js`)
   - Creates a `Blog` document with:
     - `author: req.user._id`
     - `coverImage: <Cloudinary URL>`
5. Controller returns JSON:
   - `{ success: true, savedBlog: <blogDocument> }`

### Example pipeline: Like a blog

1. Client sends `POST /api/v1/like/:id`
2. `isAuthenticated` verifies the JWT cookie and loads the user
3. Controller checks whether `user.likedBlogs` already contains `blogId`
4. If not liked:
   - Fetches the blog
   - Increments `blog.likes`
   - Pushes `blogId` into `user.likedBlogs`
   - Saves both blog and user
5. Returns updated documents (or `{}` if already liked)

---


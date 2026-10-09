# 🌟 Priya P — Full-Stack Dynamic Personal Portfolio

> A modern, professional, fully responsive, and dynamic personal portfolio web application built with **React, TypeScript, Bootstrap, Node.js, Express.js, and MongoDB**.

![Portfolio Preview Banner](/frontend/public/assets/projects/food-web-app.svg)

---

## 📋 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Technologies Used](#2-technologies-used)
3. [Folder Structure](#3-folder-structure)
4. [Node.js Installation](#4-nodejs-installation)
5. [Frontend Installation](#5-frontend-installation)
6. [Backend Installation](#6-backend-installation)
7. [MongoDB Setup (Local & MongoDB Atlas)](#7-mongodb-setup-local--mongodb-atlas)
8. [Environment Variables](#8-environment-variables)
9. [Database Seeding](#9-database-seeding)
10. [Running the Backend](#10-running-the-backend)
11. [Running the Frontend](#11-running-the-frontend)
12. [Admin Authentication & Login](#12-admin-authentication--login)
13. [Adding Projects via Admin Dashboard](#13-adding-projects-via-admin-dashboard)
14. [Editing Projects via Admin Dashboard](#14-editing-projects-via-admin-dashboard)
15. [Deleting Projects via Admin Dashboard](#15-deleting-projects-via-admin-dashboard)
16. [Deployment Guide (Vercel & Render)](#16-deployment-guide)

---

## 1. Project Overview

This is **NOT a static portfolio**. It is a full-fledged dynamic web application where all portfolio sections—including **Projects, Skills, Education, Certifications, Experience, and Contact Inquiries**—are queried in real time from **MongoDB** through a secure **Node.js Express TypeScript REST API**.

### Key Highlights:
- **Public Portfolio**:
  - **Home**: Intro headline (*"Hi, I'm Priya 👋"*), degree tag, role pills, custom vector profile artwork, and call-to-actions (*View My Projects*, *Download Resume*, *Contact Me*).
  - **About**: Profile narrative highlighting B.Tech IT studies at Dhanalakshmi College of Engineering, Chennai (2024–2028), with 4 specialized cards (*B.Tech IT, UI/UX Design, App Development, Python*).
  - **Skills**: Real-time MongoDB skills with category filtering (*UI/UX, Programming, Development, Tools*) and visual progress bars.
  - **Projects**: Searchable and filterable project showcase with cards, quick-view modals, and dedicated project pages (`/projects/:id`).
  - **Education**: Timeline card of Dhanalakshmi College of Engineering, B.Tech IT.
  - **Certifications**: Verified credentials (*Google UX, Python, Meta Front-End, MongoDB*).
  - **Experience**: Timeline displaying UI/UX and Student Developer leadership roles.
  - **Contact**: Working contact form submitting directly to MongoDB with feedback alerts.
  - **Dark / Light Mode**: Instant theme toggle with localStorage persistence.
  - **Resume**: Downloadable resume PDF (`/resume/Priya-Resume.pdf`).
- **Protected Admin Dashboard (`/admin/dashboard`)**:
  - Secure JWT-based admin authentication (`/admin/login`).
  - Real-time dashboard statistics (*Total Projects, Total Skills, Total Certifications, Total Experience, Total Messages, Unread count*).
  - Complete **CRUD** for Projects, Skills, Education, Certifications, Experience, and Contact Messages.

---

## 2. Technologies Used

### Frontend
- **React 18** (Functional components with `.tsx`)
- **TypeScript** (Strict types for all data models)
- **Bootstrap 5.3 & Bootstrap Icons** (Responsive container-grid layout, cards, badges, progress bars, modals)
- **React Router 6** (`react-router-dom` for client-side routing and protected routes)
- **Axios** (Centralized API client with request/response interceptors)
- **Vite** (Next-generation fast frontend tooling and dev server)

### Backend
- **Node.js (v20+)** (JavaScript runtime)
- **Express.js** (REST API framework)
- **TypeScript** (Strong typing and maintainability)
- **tsx** (Ultra-fast TypeScript execution engine)
- **CORS & Dotenv** (Cross-origin support and environment management)

### Database & Authentication
- **MongoDB** (NoSQL document database)
- **Mongoose ODM** (Schema modeling, validators, and relationships)
- **JWT (JSON Web Tokens)** (Stateless secure authentication)
- **bcryptjs** (Salted password hashing, zero plain-text storage)

---

## 3. Folder Structure

```
Portfolio/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                # MongoDB Mongoose connection
│   │   ├── controllers/
│   │   │   ├── authController.ts    # Admin login & profile
│   │   │   ├── projectController.ts # Projects CRUD
│   │   │   ├── skillController.ts   # Skills CRUD
│   │   │   ├── educationController.ts # Education CRUD
│   │   │   ├── certificationController.ts # Certifications CRUD
│   │   │   ├── experienceController.ts    # Experience CRUD
│   │   │   ├── contactController.ts # Contact messages
│   │   │   └── statsController.ts   # Admin dashboard statistics
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts    # JWT token verification
│   │   │   └── errorMiddleware.ts   # Centralized error handlers
│   │   ├── models/
│   │   │   ├── AdminUser.ts         # Admin user schema with bcrypt
│   │   │   ├── Project.ts           # Project schema
│   │   │   ├── Skill.ts             # Skill schema
│   │   │   ├── Education.ts         # Education schema
│   │   │   ├── Certification.ts     # Certification schema
│   │   │   ├── Experience.ts        # Experience schema
│   │   │   └── ContactMessage.ts    # Contact inquiries schema
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── projectRoutes.ts
│   │   │   ├── skillRoutes.ts
│   │   │   ├── educationRoutes.ts
│   │   │   ├── certificationRoutes.ts
│   │   │   ├── experienceRoutes.ts
│   │   │   ├── contactRoutes.ts
│   │   │   └── statsRoutes.ts
│   │   ├── types/
│   │   │   └── index.ts             # Backend TypeScript interfaces
│   │   └── server.ts                # Express app entry point
│   ├── seed/
│   │   └── seed.ts                  # Database seeder with Priya's portfolio data
│   ├── .env                         # Backend environment variables
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── images/              # Priya's avatar vector
│   │   │   ├── projects/            # Project mockup SVGs
│   │   │   └── certifications/      # Certificate badges
│   │   ├── resume/
│   │   │   └── Priya-Resume.pdf     # Downloadable resume
│   │   └── favicon.svg
│   ├── src/
│   │   ├── admin/
│   │   │   ├── AdminLogin.tsx       # /admin/login page
│   │   │   ├── AdminDashboard.tsx   # /admin/dashboard management suite
│   │   │   └── ProtectedRoute.tsx   # JWT Route guard
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Sticky responsive navbar with theme toggle
│   │   │   ├── Hero.tsx             # Home hero section with CTAs
│   │   │   ├── AboutSection.tsx     # About Priya & 4 specialization cards
│   │   │   ├── SkillsSection.tsx    # Dynamic skills & progress bars
│   │   │   ├── ProjectsSection.tsx  # Dynamic project grid, search & filter
│   │   │   ├── ProjectModal.tsx     # Project detail modal
│   │   │   ├── EducationSection.tsx # Academic timeline
│   │   │   ├── CertificationsSection.tsx # Verified credentials
│   │   │   ├── ExperienceSection.tsx # Work & club leadership timeline
│   │   │   ├── ContactSection.tsx   # Working contact form (MongoDB)
│   │   │   └── Footer.tsx           # Professional footer
│   │   ├── hooks/
│   │   │   └── useTheme.ts          # Dark/Light mode hook
│   │   ├── pages/
│   │   │   ├── HomePage.tsx         # Assembled portfolio page
│   │   │   ├── ProjectDetailsPage.tsx # /projects/:id single view
│   │   │   └── NotFoundPage.tsx     # 404 page
│   │   ├── services/
│   │   │   └── api.ts               # Centralized Axios instance & endpoints
│   │   ├── types/
│   │   │   └── index.ts             # Frontend TypeScript interfaces
│   │   ├── App.tsx                  # React Router configuration
│   │   ├── main.tsx                 # Bootstrap & React mount
│   │   ├── index.css                # Custom theme & animation styles
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .env                             # Root environment variables
├── .gitignore
├── test-api.js                      # Automated 19-step end-to-end integration test
└── README.md                        # Documentation
```

---

## 4. Node.js Installation

Ensure you have **Node.js (v18 or higher)** installed:

1. Download the LTS version from [https://nodejs.org](https://nodejs.org).
2. Verify installation in your terminal:
   ```bash
   node -v
   npm -v
   ```

---

## 5. Frontend Installation

Navigate into the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

---

## 6. Backend Installation

Navigate into the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

---

## 7. MongoDB Setup (Local & MongoDB Atlas)

### Option A: Local MongoDB (Default)
If you have MongoDB Community Server installed locally on port `27017`, the connection string in `.env` is:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/priya_portfolio
```

### Option B: MongoDB Atlas (Cloud Database)
1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (M0 Sandbox).
3. Under **Database Access**, create a database user (e.g., `priya_admin`) and a password.
4. Under **Network Access**, add `0.0.0.0/0` (Allow Access from Anywhere).
5. Click **Connect** → **Drivers** → Copy the connection string.
6. Replace `<password>` with your database password:
   ```env
   MONGODB_URI=mongodb+srv://priya_admin:<password>@cluster0.mongodb.net/priya_portfolio?retryWrites=true&w=majority
   ```

---

## 8. Environment Variables

Create `.env` in the `backend/` directory (or use the existing preconfigured `.env`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/priya_portfolio
JWT_SECRET=supersecretjwtkey_priya_portfolio_2024_2028
NODE_ENV=development
CLIENT_URL=http://localhost:5173
ADMIN_DEFAULT_EMAIL=admin@priya.dev
ADMIN_DEFAULT_PASSWORD=Admin@12345
```

> **Security Note**: Never commit actual database passwords or production JWT secrets to public git repositories.

---

## 9. Database Seeding

Run the seed script to automatically populate MongoDB with Priya's initial portfolio data and the default administrator account:

```bash
cd backend
npm run seed
```

This inserts:
- 👤 **Admin User**: `admin@priya.dev` / `Admin@12345` (bcrypt hashed)
- 🎨 **17 Technical Skills** across UI/UX, Programming, Development, and Tools
- 🚀 **5 Initial Projects** (Coffee Ordering App UI, Food Ordering App UI, Modern E-Commerce Website UI, Email Newsletter Design, Food Delivery Web App)
- 🎓 **Education record** (Dhanalakshmi College of Engineering, B.Tech IT, 2024–2028)
- 📜 **4 Verified Certifications** (Google UX Design, Python for Everybody, Meta Front-End, MongoDB)
- 💼 **2 Experience Records** (UI/UX Design Intern, Student Developer Lead)
- ✉️ **Sample Contact Message**

---

## 10. Running the Backend

From the `backend` directory:

```bash
cd backend
npm run dev
```

The server starts on:
- API Base: `http://localhost:5000/api`
- Health Check: `http://localhost:5000/api/health`

---

## 11. Running the Frontend

In a separate terminal, from the `frontend` directory:

```bash
cd frontend
npm run dev
```

The application opens in your browser at:
👉 **`http://localhost:5173`**

---

## 12. Admin Authentication & Login

1. Click the **Admin** button in the navbar or visit:
   👉 **`http://localhost:5173/admin/login`**
2. Enter the administrator credentials:
   - **Email**: `admin@priya.dev`
   - **Password**: `Admin@12345`
3. Click **Sign In to Dashboard**.
4. The system validates credentials via bcrypt, issues a signed JWT, stores it securely, and redirects to `/admin/dashboard`.

---

## 13. Adding Projects via Admin Dashboard

1. Navigate to `/admin/dashboard`.
2. Click on the **Projects** tab.
3. Click **+ Add Project**.
4. Enter:
   - **Project Title** (e.g., `FinTech Banking App UI`)
   - **Category** (Select `UI/UX Design` or `Full-Stack Development`)
   - **Description**
   - **Technologies** (e.g., `Figma, Design System, Prototyping`)
   - **Image URL or Path**
   - **GitHub URL** & **Live Demo URL**
   - **Features** (one feature per line)
   - Check **Mark as Featured Project** if desired.
5. Click **Save Project**.
6. The new project is stored in MongoDB and appears immediately on the public portfolio.

---

## 14. Editing Projects via Admin Dashboard

1. In the **Projects** tab, find the project in the table.
2. Click the blue **Edit** button (pencil icon).
3. Update any field (title, description, tags, URLs, features).
4. Click **Save Project**.
5. The changes are updated in MongoDB and live on the public site.

---

## 15. Deleting Projects via Admin Dashboard

1. In the **Projects** tab, click the red **Delete** button (trash icon).
2. Confirm the browser prompt.
3. The project is deleted from MongoDB and removed from the public website.

*(The same Add / Edit / Delete workflow is available for **Skills, Education, Certifications, Experience, and Contact Messages**).*

---

## 16. Deployment Guide

### Deploying the Backend on Render
1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and create a **Web Service**.
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas URI
   - `JWT_SECRET` = A strong secret key
   - `NODE_ENV` = `production`
   - `CLIENT_URL` = Your frontend URL (e.g., `https://priya-portfolio.vercel.app`)

### Deploying the Frontend on Vercel
1. Sign in to [Vercel](https://vercel.com) and create a **New Project**.
2. Select your repository.
3. Set:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-service.onrender.com/api`
5. Click **Deploy**.

---

## 🧪 Testing the Complete Application

To run the automated 19-step end-to-end test suite:

```bash
node test-api.js
```

All 19 tests will execute and confirm that:
- ✅ Public visitor endpoints return real data from MongoDB
- ✅ Contact messages persist correctly
- ✅ Admin authentication rejects invalid logins and accepts valid credentials
- ✅ Admin CRUD operations (Create, Read, Update, Delete) operate seamlessly

---

**Crafted with care for Priya P | B.Tech Information Technology (2024–2028)**

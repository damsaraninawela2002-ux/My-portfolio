# Damsarani Nawela — Professional Full-Stack Portfolio

A modern, full-stack personal portfolio built to showcase my projects, skills and journey as an aspiring Software Engineering Intern. It includes a public website and a secure admin dashboard to manage projects and visitor messages.

---
🔗 Live Demo: frontend-1-henna.vercel.app

## 🎨 Tech Aesthetic & Design System

- **Palette**: Dark Navy (`#0B1120`, `#111827`) with Electric Blue (`#38BDF8`, `#2563EB`) and Cyan accents. Crisp, high-contrast light mode included.
- **Typography**: Clean pairings of **Poppins** and **Inter**.
- **Micro-Interactions**: Smooth scroll reveals, layout animations, typewriter effect on roles, and hover-zoom project cards via **Framer Motion**.
- **Theming**: Integrated Dark/Light mode switcher persisted in `localStorage`.

---

## 🛠️️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, React Router, Framer Motion, CSS |
| **Backend** | Python, FastAPI |
| **Database** | MongoDB |
| **Auth** | JSON Web Tokens (JWT) |
| **Deployment** | Vercel |

## 📁 Architecture

```
my-portfolio/
├── Frontend/
│   ├── public/
│   │   ├── images/
│   │   │   ├── profile.jpg
│   │   │   └── projects/                 # Vector SVG project mockups
│   │   ├── cv.pdf                        # Downloadable CV
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                # Responsive header & mobile drawer
│   │   │   ├── Footer.jsx                # Social links & back-to-top button
│   │   │   ├── Button.jsx                # Animated buttons with variants & sizes
│   │   │   ├── Badge.jsx                 # Tech pill badges
│   │   │   ├── SectionHeading.jsx        # Standardized headings with glowing line
│   │   │   ├── ProjectCard.jsx           # Hover-zoom card with feature bullets
│   │   │   ├── ProjectDetailModal.jsx    # Interactive modal with full project info
│   │   │   ├── ThemeToggle.jsx           # Light/Dark mode switcher
│   │   │   └── Icons.jsx                 # Custom SVG icons (GitHub, LinkedIn)
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx          # Theme state & HTML dark class sync
│   │   │   └── AuthContext.jsx           # Admin JWT authentication state
│   │   ├── data/
│   │   │   └── content.js                # Single source of truth for portfolio info
│   │   ├── pages/
│   │   │   ├── Home.jsx                  # Hero (typewriter), Skills, Featured, What I Do, CTA
│   │   │   ├── About.jsx                 # Bio, Education timeline, Skills, Goals
│   │   │   ├── Projects.jsx              # Real-time search, Category filters, Modal
│   │   │   ├── Contact.jsx               # Validated contact form + direct cards
│   │   │   ├── AdminLogin.jsx            # Protected route login
│   │   │   ├── AdminDashboard.jsx        # Project CMS (Add/Edit/Delete) & Message inbox
│   │   │   └── NotFound.jsx              # 404 page
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css                     # Tailwind CSS & custom design tokens
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── models/
│   │   ├── Project.js                    # Mongoose Project schema
│   │   └── Message.js                    # Mongoose Contact Message schema
│   ├── middleware/
│   │   └── auth.js                       # JWT authentication middleware
│   ├── routes/
│   │   ├── projects.js                   # Project CRUD & public query filters
│   │   ├── auth.js                       # Admin login & token verification
│   │   └── contact.js                    # Contact submission & message inbox
│   ├── seed/
│   │   └── seedData.js                   # Initial project seed data
│   ├── server.js                         # Express server with MongoDB & auto-seed
│   ├── package.json
│   └── .env
└── README.md
```

---

## ⚡ Key Features

### 1. 🏠 Home Page
* **Hero Section:** Full-screen hero featuring a typewriter role cycling (*"Software Engineering Intern"*, *"Full-Stack Developer"*, *"React & Node.js Developer"*, *"Mobile App Enthusiast"*), a glowing profile avatar, and primary CTA buttons.
* **Short About:** Concise overview leading directly to the `/about` page.
* **Visual Tech Stack:** Categorized skill cards (*Frontend*, *Backend*, *Database*, *Tools*) with proficiency dots and hover-lift effects.
* **Featured Projects:** Highlights top projects with hover zoom previews and pill tags.
* **What I Do:** Four cards detailing core development services.
* **Final CTA:** Full-width glowing banner with a *"Let's build something together"* call to action.

### 2. 👤 About Page
* **Who I Am:** Personal story highlighting my background as an IT student.
* **Education Timeline:** 
  * Higher National Diploma in Information Technology (HNDIT) — Advanced Technological Institute, Ratnapura.
  * G.C.E. Advanced Level (A/L) Bio Technology Stream — Taxila Central College, Horana.
* **Career Objective:** Professional statement focused on securing a software engineering internship.
* **Expanded Technical Skills:** Detailed breakdown with proficiency percentages and toolsets.
* **Future Goals & Exploring:** Learning targets including *Next.js*, *TypeScript*, *Docker*, and *AWS*.

### 3. 💻 Projects Page
* **Live Search:** Instant real-time filtering across project titles, descriptions, and technology keywords.
* **Category Filter Tabs:** Smooth animated pill buttons (*All*, *Full-Stack*, *Web App*, *Mobile App*, *Backend*).
* **Project Detail Modal:** Full project specifications, architecture details, and Live Demo / GitHub links.
* **Extensible Architecture:** Fetches live data from the MongoDB + Express API, backed by an in-memory fallback.

### 4. 📩 Contact Page
* **Interactive Form:** Fully validated inputs with character counters and live feedback alerts.
* **Direct Contacts:** One-click email copy button, direct phone link, and location indicator (*Poruwadanda, Sri Lanka*).
* **Social Profiles:** Direct links to GitHub and LinkedIn.

### 5. 🛡️ Bonus Admin Dashboard (`/admin/login` & `/admin/dashboard`)
* **Secure Authentication:** Protected routes powered by **JWT token authentication**.
* **Project Management:** Add, edit, or delete projects directly in MongoDB.
* **Message Center:** View and manage incoming visitor contact submissions.

---

## 🚀 Running Locally

### Backend (Node.js + Express)
```bash
cd Backend
npm install
npm run dev   # or: node server.js
```
The server will start on `http://localhost:5000` and connect to MongoDB Atlas (or in-memory cache if offline).

### Frontend (React + Vite)
```bash
cd Frontend
npm install
npm run dev
```
The application will be live at `http://localhost:5173`.

---


- Login URL: `http://localhost:5173/admin/login`

📄 License
This project is open-source and available under the MIT License.

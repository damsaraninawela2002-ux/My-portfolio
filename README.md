# Damsarani Nawela — Professional Full-Stack Portfolio

A modern, high-performance personal portfolio website for a **Software Engineering Intern / Full-Stack Developer**. Built with a **React 19 (Vite) + Tailwind CSS + Framer Motion** frontend and a **Node.js + Express + MongoDB** backend with **JWT Authentication**.

---

## 🎨 Tech Aesthetic & Design System

- **Palette**: Dark Navy (`#0B1120`, `#111827`) with Electric Blue (`#38BDF8`, `#2563EB`) and Cyan accents. Crisp, high-contrast light mode included.
- **Typography**: Clean pairings of **Poppins** and **Inter**.
- **Micro-Interactions**: Smooth scroll reveals, layout animations, typewriter effect on roles, and hover-zoom project cards via **Framer Motion**.
- **Theming**: Integrated Dark/Light mode switcher persisted in `localStorage`.

---

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
- **Hero Section**: Full-screen hero with typewriter role cycling (*"Software Engineering Intern"*, *"Full-Stack Developer"*, *"React & Node.js Developer"*, *"Mobile App Enthusiast"*), glowing profile avatar, and primary CTA buttons (*View Projects*, *Contact Me*, *Download CV*).
- **Short About**: 2-3 sentence overview leading directly to the `/about` page.
- **Visual Tech Stack**: Categorized skill cards (*Frontend*, *Backend*, *Database*, *Tools*) with proficiency indicator dots (●●●●○), animated progress bars, and hover-lift effects.
- **Featured Projects**: Top projects with hover zoom previews, pill tags, and quick-inspect triggers.
- **What I Do**: 4 cards (*Web Development*, *Mobile App Development*, *Backend Development*, *Database Management*) detailing service capabilities.
- **Final CTA**: Full-width glowing banner (*"Let's build something together"*).

### 2. 👤 About Page
- **Who I Am**: In-depth personal story as an HNDIT student.
- **Education Timeline**:
  - Higher National Diploma in Information Technology (HNDIT) — Advanced Technological Institute, Rathnapura.
  - G.C.E. Advanced Level (A/L) Bio Technology Stream — Taxila Central College, Horana.
- **Career Objective**: Clear statement focused on securing a software engineering internship.
- **Expanded Technical Skills**: Deep breakdown with percentages, dots, and toolsets.
- **Future Goals & Exploring**: Learning targets (*Next.js*, *TypeScript*, *Docker*, *AWS*).

### 3. 💻 Projects Page (Standout Showcase)
- **Live Search**: Instant real-time filtering across project titles, descriptions, and technology keywords.
- **Category Filter Tabs**: Smooth animated pill buttons (*All*, *Full-Stack*, *Web App*, *Mobile App*, *Backend*) powered by Framer Motion layout transitions.
- **Project Detail Modal**: Inspect full project specs, architecture details, feature bullet points, and open Live Demo / GitHub repositories.
- **Extensible Architecture**: Fetches live from the MongoDB Express API, with an automatic in-memory fallback if the database is offline.

### 4. 📩 Contact Page
- **Interactive Form**: Validated inputs (Name, Email, Subject, Message) with character counter, live feedback alerts, and error states.
- **Direct Contacts**: One-click email copy button (`damsaraninawela2002@gmail.com`), direct phone link (`077 509 6262`), and location (`Poruwadanda, Sri Lanka`).
- **Social Profiles**: Links to GitHub and LinkedIn.

### 5. 🛡️ Bonus Admin Dashboard (`/admin/login` & `/admin/dashboard`)
- Protected route with **JWT token authentication**.
- Add new projects with custom title, category, description, tech stack, bullet points, and live URLs.
- Edit existing projects live in MongoDB.
- Delete projects with confirmation.
- View and manage incoming visitor contact submissions.

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

## 🔑 Admin Credentials (Default)
- **Username**: `admin`
- **Password**: `admin123` (configured in `Backend/.env`)
- Login URL: `http://localhost:5173/admin/login`

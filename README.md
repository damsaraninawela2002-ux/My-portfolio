# Damsarini Nawela — Personal Portfolio

Full-stack personal portfolio of **Damsarini Nawela** — Software Engineering Intern / Full-Stack Developer and HNDIT student at Advanced Technological Institute – Rathnapura, based in Horana, Sri Lanka.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-d88ca3?style=for-the-badge&logo=vercel&logoColor=white)](https://frontend-1-henna.vercel.app)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.3-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_4-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-c9a7eb?style=for-the-badge&logo=jsonwebtokens&logoColor=black)](https://jwt.io/)

---


---

## 🌸 About This Project

This repository contains my full-stack personal portfolio featuring a public showcase of my software engineering projects, technical skills, academic background, and a JWT-protected admin dashboard for managing project entries. The interface is styled with a custom blush pink and lavender design system ([`Frontend/src/style.css`](Frontend/src/style.css)) pairing **Playfair Display**, **Poppins**, and **Dancing Script** typography across both light (`#fdf6f8` / `#d88ca3` / `#c9a7eb`) and dark (`#0B0F17` / `#f0a8bd` / `#d9bdf5`) themes. Project data is served from MongoDB with a synchronized static fallback in [`Frontend/src/data/content.js`](Frontend/src/data/content.js) so the portfolio remains fast and reliable even when offline.

---

## ✨ Key Features

### Home Page (`/`)
- **Hero Section**: Typewriter role animation, short bio, primary action buttons (*View Projects*, *Contact Me*, *Download CV*), and a glowing profile frame.
- **Dynamic Portfolio Stats**: Automatically calculated from project and skill data in [`Frontend/src/data/content.js`](Frontend/src/data/content.js) (`03` Completed Certifications, `07` Projects, `15+` Tech Skills).
- **Skills & Technologies**: Categorized cards across **Frontend**, **Backend**, **Database**, **Tools & DevOps**, and **AI & Machine Learning** with percentage labels, 5-dot rating indicators, and animated gradient progress bars.
- **Selected Projects & What I Do**: Displays the top 4 featured projects with interactive screenshot carousels alongside 4 service capability cards (*Web Development*, *Mobile App Development*, *Backend Development*, *Database Management*).

### About Page (`/about`)
- **Profile & Career Objective**: Personal background, location, availability badge, and a downloadable PDF resume (`/cv.pdf`).
- **Education Timeline**: Academic history covering the **Higher National Diploma in Information Technology (HNDIT)** at Advanced Technological Institute and **G.C.E. Advanced Level (Bio Technology Stream)** at Taxila Central College, Horana.
- **Technical & Career Growth**: Full skill breakdown plus dedicated cards for *Development Interests*, *Currently Exploring*, and *Future Goals*.

### Projects Page (`/projects`)
- **Numbered Project Rows**: Alternating two-column desktop cards (`01` to `07`) with category badge, `Role:` and `Stack:` metadata lines, and key feature highlights.
- **Search & Category Filters**: Real-time keyword search and animated category filter pills (*All*, *Full-Stack*, *Web App*, *Mobile App*, *Backend*).
- **Framer Motion Screenshot Carousel**: `16:10` viewport supporting 1–6 screenshots per project with counter badge (`01 / 04`), dot indicators, previous/next arrows, touch swipe gestures, and keyboard arrow navigation (`ArrowLeft` / `ArrowRight`). Controls automatically hide when a project has only 1 image, and phone screenshots use `object-contain` on a dark canvas so mobile frames are never cropped.
- **Fullscreen Lightbox & Detail Modal**: Clickable zoom-in lightbox with `Escape` and arrow-key support, plus a project detail modal showing the problem statement, AI explainability notes, architecture features, technology badges, and GitHub / Live Demo links.

### Contact Page (`/contact`)
- **WhatsApp Direct Form**: Client-side validated contact form (required *Name* and *Message*, optional *Email* and *Subject*) that formats the inquiry and opens WhatsApp (`https://wa.me/...`) with a pre-filled message. No visitor messages are stored in a database.
- **Centralized Contact Config**: Direct cards for Email, WhatsApp, LinkedIn, and GitHub managed from a single configuration file ([`Frontend/src/config/contact.js`](Frontend/src/config/contact.js)).

### Admin Dashboard (`/admin/login` & `/admin/dashboard`)
- **JWT Authentication**: Admin login authenticating against the FastAPI `/api/auth/login` endpoint using bcrypt password verification and signed JWT Bearer tokens.
- **Project & Screenshot Manager**: Create, edit, and delete projects, and add, remove, or reorder 1–6 screenshot paths per project.

### Theme, Responsiveness & Animations
- **Dark / Light Mode**: Theme toggle in the navigation bar persisted in `localStorage` (`portfolio_theme`) and synchronized with the document root (`data-theme` and `.dark` class).
- **Responsive & Animated UI**: Mobile navigation drawer, smooth route transitions, and scroll-triggered animations built with Tailwind CSS and Framer Motion.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, React Router DOM 7, Tailwind CSS 4 (`@tailwindcss/vite`), Framer Motion 13, Lucide React |
| **Backend** | Python FastAPI, Uvicorn, Pydantic v2, Motor (Async MongoDB), Node.js, Express 4, Mongoose 8 |
| **Database** | MongoDB Atlas (`portfolio_db`) |
| **Authentication** | JSON Web Tokens (`PyJWT` / `jsonwebtoken`), `bcrypt` / `bcryptjs` |
| **Deployment** | Vercel (Frontend) |

---

## 📂 Project Structure

```text
My-portfolio/
├── Backend/
│   ├── models/
│   │   ├── Message.js                # Mongoose contact message schema
│   │   └── Project.js                # Mongoose project schema (1–6 images validation)
│   ├── routes/
│   │   ├── auth.py                   # FastAPI JWT admin login & token verification
│   │   ├── contact.js                # Express contact route
│   │   ├── contact.py                # FastAPI contact route
│   │   ├── projects.js               # Express public project endpoints with fallback
│   │   └── projects.py               # FastAPI public & JWT-protected project CRUD
│   ├── seed/
│   │   ├── seedData.js               # Project seed data for Node.js/Express
│   │   └── seed_mongo.py             # Async MongoDB seed script for FastAPI/Motor
│   ├── .env.example                  # Backend environment variable template
│   ├── database.py                   # Motor async MongoDB connection & Pydantic settings
│   ├── main.py                       # FastAPI application entrypoint & CORS setup
│   ├── models.py                     # Pydantic v2 schemas for projects, auth & contact
│   ├── package.json                  # Node.js backend dependencies & scripts
│   ├── requirements.txt              # Python FastAPI backend dependencies
│   └── server.js                     # Express server with auto-seeding
│
├── Frontend/
│   ├── public/
│   │   ├── images/
│   │   │   ├── projects/
│   │   │   │   └── portfolio-preview.svg          # Fallback project preview graphic
│   │   │   └── profile.jpeg                       # Hero profile photo
│   │   ├── projects/
│   │   │   ├── agrolens-ai/                       # AgroLens AI screenshots (2.jpeg, 1.jpeg, 3.jpeg)
│   │   │   ├── bluewave-water-park/               # BlueWave Water Park screenshots (11.png, 12.png, 13.png)
│   │   │   ├── dreamy-delight-cosmetic-shop/      # Cosmetic Shop screenshots (cosmetic-shop.jpeg, c2–c4.png)
│   │   │   ├── easy-calculator/                   # Easy Calculator screenshots (cal.jpeg, cal2.jpeg)
│   │   │   ├── fraudguard-ai/                     # FraudGuard AI screenshots (FraudGuard.png, f1.png, f2.png)
│   │   │   ├── galaxy-cinemas-system/             # Galaxy Cinemas screenshots (cinema.png, cinema2–3.png)
│   │   │   └── inventory-management-system/       # Inventory System screenshots (1.jpeg, image.jpeg, 2.jpeg)
│   │   ├── cv.pdf                                 # Downloadable resume PDF
│   │   └── favicon.svg                            # Site favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Badge.jsx                          # Reusable pill badge component
│   │   │   ├── Button.jsx                         # Button & link component with variants
│   │   │   ├── Footer.jsx                         # Site footer with quick links & social icons
│   │   │   ├── Hero.jsx                           # Standalone hero component
│   │   │   ├── Icons.jsx                          # Custom SVG icons (GitHub, LinkedIn, WhatsApp)
│   │   │   ├── Navbar.jsx                         # Sticky header, theme toggle & mobile menu
│   │   │   ├── ProjectCard.jsx                    # Alternating project row card
│   │   │   ├── ProjectCarousel.jsx                # 16:10 carousel & fullscreen lightbox
│   │   │   ├── ProjectDetailModal.jsx             # Project details modal dialog
│   │   │   ├── SectionDivider.jsx                 # Decorative section divider
│   │   │   ├── SectionHeading.jsx                 # Standardized section title & badge
│   │   │   ├── Skeleton.jsx                       # Loading skeleton placeholders
│   │   │   └── ThemeToggle.jsx                    # Dark/Light mode toggle button
│   │   ├── config/
│   │   │   └── contact.js                         # Single source for WhatsApp, email & social URLs
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx                   # Theme provider & localStorage persistence
│   │   │   └── useTheme.js                        # Custom hook to consume theme context
│   │   ├── data/
│   │   │   └── content.js                         # Portfolio data (bio, education, skills, projects)
│   │   ├── hooks/
│   │   │   ├── usePageMeta.js                     # Document title & meta description hook
│   │   │   └── useScrollReveal.js                 # IntersectionObserver reveal hook
│   │   ├── pages/
│   │   │   ├── About.jsx                          # About page
│   │   │   ├── AdminDashboard.jsx                 # Protected project CMS (1–6 screenshots)
│   │   │   ├── AdminLogin.jsx                     # Admin login page
│   │   │   ├── Contact.jsx                        # WhatsApp contact form & contact cards
│   │   │   ├── Home.jsx                           # Home page
│   │   │   ├── NotFound.jsx                       # 404 page
│   │   │   └── Projects.jsx                       # Projects showcase page
│   │   ├── App.jsx                                # Router & page transition wrapper
│   │   ├── main.jsx                               # React DOM root with ThemeProvider
│   │   └── style.css                              # Tailwind CSS import & custom theme variables
│   ├── .env.example                               # Frontend environment variable template
│   ├── index.html                                 # HTML entry point & Google Fonts links
│   ├── package.json                               # Frontend dependencies & scripts
│   └── vite.config.js                             # Vite configuration
│
├── docs/
│   └── screenshots/
│       └── home.png                               # Home page screenshot
├── LICENSE                                        # MIT License
└── README.md                                      # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+ recommended) and **npm**
- **Python** (v3.10+ recommended) — if running the FastAPI backend
- **MongoDB Atlas** URI or local MongoDB instance (optional for frontend preview; static fallback data is built in)

### 1. Clone the Repository
```bash
git clone https://github.com/damsaraninawela2002-ux/My-portfolio.git
cd My-portfolio
```

### 2. Backend Setup

Copy [`Backend/.env.example`](Backend/.env.example) to `Backend/.env` and fill in your configuration values:

```bash
cd Backend
cp .env.example .env
```

#### Option A: FastAPI Backend (Port `8000` — supports Admin JWT Auth & Project CRUD)
```bash
cd Backend
python -m venv venv
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# macOS / Linux:
# source venv/bin/activate

pip install -r requirements.txt
python seed/seed_mongo.py
uvicorn main:app --reload --port 8000
```

#### Option B: Node.js + Express Backend (Port `5000` — public read API & auto-seed)
```bash
cd Backend
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Environment Variables

The backend reads the following variables from `Backend/.env` (see [`Backend/.env.example`](Backend/.env.example)):

| Variable | Description |
| :--- | :--- |
| `PORT` | Port number for the Express backend server (defaults to `5000`). |
| `MONGODB_URI` | MongoDB connection string (MongoDB Atlas SRV URI or local instance). |
| `DATABASE_NAME` | Target MongoDB database name (defaults to `portfolio_db`). |
| `FRONTEND_URL` | Allowed CORS origin for the frontend application (e.g., `http://localhost:5173`). |
| `JWT_SECRET` | Secret key used to sign and verify admin JWT access tokens. |
| `ADMIN_USERNAME` | Administrator username for `/api/auth/login`. |
| `ADMIN_PASSWORD` | Administrator password setting in environment configuration. |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of the administrator password verified by FastAPI (`routes/auth.py`). |

---

## 🔐 Admin Access

The administrator interface is available at:
- **Login Route**: `/admin/login`
- **Dashboard Route**: `/admin/dashboard` (requires a valid session token from `/admin/login`)

---

## 🌐 Deployment

The frontend is deployed on **Vercel**:
- **Live URL**: [https://frontend-1-henna.vercel.app](https://frontend-1-henna.vercel.app)
- **Root Directory**: `Frontend`
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 💻 Featured Projects

All projects displayed in the portfolio are defined in [`Frontend/src/data/content.js`](Frontend/src/data/content.js) and seeded via [`Backend/seed/seed_mongo.py`](Backend/seed/seed_mongo.py):

| # | Project Name | Category | Key Technologies | GitHub Repository |
| :- | :--- | :--- | :--- | :--- |
| 01 | **AgroLens AI – Explainable Crop Disease Detection** | Full-Stack | React, Vite, Tailwind CSS, FastAPI, Python, TensorFlow, Keras, MobileNetV2, Grad-CAM, Gemini API, MongoDB Atlas, JWT | [AgroLens-AI](https://github.com/damsaraninawela2002-ux/AgroLens-AI) |
| 02 | **FraudGuard AI – Explainable Fraud Detection System** | Full-Stack | React, Vite, Tailwind CSS, FastAPI, Python, XGBoost, scikit-learn, SHAP, MongoDB, JWT | [FraudGuard-AI](https://github.com/damsaraninawela2002-ux/FraudGuard-AI) |
| 03 | **Inventory Management System** | Full-Stack | React.js, Vite, Tailwind CSS, HTML5, CSS3, JavaScript, C#, ASP.NET Core, MongoDB | [Inventory-Management-System](https://github.com/damsaraninawela2002-ux/Inventory-Management-System) |
| 04 | **Galaxy Cinemas System** | Full-Stack | React.js, CSS3, Node.js, Express.js, PHP, MySQL, RESTful API, JWT | [galaxy-cinemas-system](https://github.com/damsaraninawela2002-ux/galaxy-cinemas-system) |
| 05 | **Dreamy Delight Cosmetic Shop System** | Full-Stack | React.js, CSS3, Node.js, Express.js, MySQL, RESTful API, JWT | [Cosmetic-Shop-System](https://github.com/damsaraninawela2002-ux/Cosmetic-Shop-System) |
| 06 | **Easy Calculator** | Mobile App | Kotlin, Android, Gradle (KTS), Hilt, Retrofit, Room Database, Navigation Component | [EasyCalculator](https://github.com/damsaraninawela2002-ux/EasyCalculator) |
| 07 | **BlueWave Water Park Management System** | Full-Stack | React.js, Vite, Tailwind CSS, FastAPI, Python, MongoDB, JWT, REST API | [bluewave-water-park](https://github.com/damsaraninawela2002-ux/bluewave-water-park.git) |

---

## 📬 Contact

- **Name**: Damsarini Nawela
- **Role**: Software Engineering Intern / Full-Stack Developer (HNDIT Student at Advanced Technological Institute – Rathnapura)
- **Location**: Horana, Sri Lanka
- **Email**: [damsaraninawela2002@gmail.com](mailto:damsaraninawela2002@gmail.com)
- **LinkedIn**: [linkedin.com/in/damsarini-nawela-0816243ba](https://www.linkedin.com/in/damsarini-nawela-0816243ba)
- **GitHub**: [github.com/damsaraninawela2002-ux](https://github.com/damsaraninawela2002-ux)
- **Live Portfolio**: [https://frontend-1-henna.vercel.app](https://frontend-1-henna.vercel.app)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

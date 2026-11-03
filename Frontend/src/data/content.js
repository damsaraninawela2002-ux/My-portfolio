/**
 * Single source of truth for portfolio content.
 * Extensible for future projects, skills, and experience.
 */

export const personalInfo = {
  name: "Damsarini Nawela",
  title: "Software Engineering  | Full-Stack Developer",
  headline: "Crafting modern, reliable web & mobile applications with precision and passion.",
  shortBio:
    "I am always eager to learn new technologies and apply them to real-world projects to make my solutions more efficient, reliable, and user-friendly.",
  location: "49C, Rathnapura Road, Poruwadanda, Horana",
  phone: "077 509 6262",
  email: "damsaraninawela2002@gmail.com",
  linkedin: "https://linkedin.com/in/damsaraninawela",
  github: "https://github.com/Damsarani",
  roles: [
    "Software Engineering ",
    "Full-Stack Developer",
    
    "Mobile App Developer",
  ],
  objective:
    "Proactive and detail-oriented Software Engineer with a passion for building scalable, user-friendly digital products using React, Node.js, Python, and modern databases.",
  interests: [
    "Full-Stack Web Development & Microservices",
    "Mobile Application Architecture (Android)",
    "Database Schema Design & Query Optimization",
    "Modern UI/UX Design Systems & Micro-Interactions",
    "Cloud Deployments & RESTful API Best Practices",
  ],
  currentlyExploring: [
    "Next.js & Server Components",
    "TypeScript & Strict Type Safety",
    "FastAPI & Asynchronous Python APIs",
    "Docker Containerization & CI/CD Pipelines",
  ],
  futureGoals: [
    "Contribute to open-source developer tooling and scalable distributed web applications.",
    "Master cloud-native architecture on AWS / GCP.",
    "Transition into an experienced Full-Stack Engineer delivering performant digital products.",
  ],
};

export const education = [
  {
    degree: "Higher National Diploma in Information Technology (HNDIT)",
    institution: "Advanced Technological Institute",
    period: "2024 – Present",
    status: "Currently Reading",
    details:
      "Core modules: Programming (Java, C#, PHP), Web Development, Database Management Systems, Data Structures, Software Engineering, Object-Oriented Analysis & Design, Networking, Computer Security, SQA, Operating Systems, Machine Learning, and Mobile Application Development.",
  },
  {
    degree: "G.C.E. Advanced Level (A/L) – Bio Technology Stream",
    institution: "Taxila Central College, Horana",
    period: "2022",
    status: "Completed",
    details:
      "Specialized in Bio Technology (B), Information & Communication Technology (C), and Science for Technology (S).",
  },
];

export const whatIDo = [
  {
    title: "Web Development",
    icon: "Globe",
    description:
      "Building clean, responsive web user interfaces with React, JavaScript, HTML5, and CSS3.",
    tools: ["React", "JavaScript", "HTML5/CSS3"],
  },
  {
    title: "Mobile App Development",
    icon: "Smartphone",
    description:
      "Designing native Android applications with Kotlin and XML using clean architecture.",
    tools: ["Android Studio", "Kotlin", "XML"],
  },
  {
    title: "Backend Development",
    icon: "Server",
    description:
      "Developing server-side endpoints, business logic, and API routes with Node.js, Express, PHP, and Python/FastAPI.",
    tools: ["Node.js", "Express.js", "PHP", "Python/FastAPI"],
  },
  {
    title: "Database Management",
    icon: "Database",
    description:
      "Designing and querying relational and document databases with MySQL and MongoDB for reliable data storage.",
    tools: ["MySQL", "MongoDB", "SQL", "Database Design"],
  },
];

export const skills = {
  Frontend: [
    { name: "React", level: 60 },
    { name: "JavaScript (ES6+)", level: 70 },
    { name: "HTML5 & CSS3", level: 95 },
    { name: "Tailwind CSS", level: 55 },
    { name: "Framer Motion", level: 30 }
  ],
  Backend: [
    { name: "Node.js & Express.js", level: 45 },
    { name: "Python / FastAPI", level: 50 },
    { name: "Java", level: 65 },
    { name: "PHP", level: 50 },
    { name: "C#", level: 45 },
    { name: "ASP.NET Core", level: 45 },
    { name: "RESTful APIs", level: 55 }
  ],
  Database: [
    { name: "MongoDB", level: 50 },
    { name: "MySQL", level: 80 }
  ],
  "Tools & DevOps": [
    { name: "Git & GitHub", level: 65 },
    { name: "VS Code", level: 85 },
    { name: "Postman", level: 55 },
    { name: "Android Studio", level: 50 }
  ],
  "AI & Machine Learning": [
    { name: "TensorFlow / Keras", level: 45 },
    { name: "scikit-learn", level: 45 },
    { name: "Gemini API", level: 50 }
  ]
};

const categoryIconMap = {
  Frontend: "Layout",
  Backend: "Server",
  Database: "Database",
  "Tools & DevOps": "Wrench",
  "AI & Machine Learning": "Brain",
};

export const skillCategories = Object.entries(skills).map(([name, skillList]) => ({
  name,
  icon: categoryIconMap[name] || "Wrench",
  skills: skillList.map((s) => ({
    ...s,
    dots: Math.min(5, Math.max(1, Math.round((s.level / 100) * 5))),
  })),
}));

/**
 * Normalize a project object so both old (`image`, `technologies`, `liveDemoUrl`)
 * and new (`images`, `stack`, `role`, `liveUrl`) schemas work seamlessly.
 */
export const normalizeProject = (project) => {
  if (!project) return project;
  const rawImages = Array.isArray(project.images)
    ? project.images.filter(Boolean).slice(0, 6)
    : project.image
    ? [project.image]
    : [];
  const stack =
    Array.isArray(project.stack) && project.stack.length > 0
      ? project.stack
      : Array.isArray(project.technologies)
      ? project.technologies
      : [];
  const githubUrl = project.githubUrl || project.github || project.github_link || "";
  const liveUrl = project.liveUrl ?? project.liveDemoUrl ?? project.live_link ?? "";

  return {
    ...project,
    slug:
      project.slug ||
      (project.title
        ? project.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        : ""),
    role: project.role || "Solo Full-Stack Project",
    stack,
    technologies: project.technologies?.length ? project.technologies : stack,
    images: rawImages,
    image: rawImages[0] || project.image || "/images/projects/portfolio-preview.svg",
    github: githubUrl,
    githubUrl,
    liveUrl,
    liveDemoUrl: liveUrl,
  };
};

export const defaultProjects = [
  {
    _id: "project-agrolens-ai",
    title: "AgroLens AI – Explainable Crop Disease Detection",
    slug: "agrolens-ai",
    role: "Solo Full-Stack & AI Project",
    category: "Full-Stack",
    categories: ["Full-Stack", "Backend"],
    date: "Nov 2026",
    description:
      "An AI-powered platform designed to help Sri Lankan farmers detect crop diseases from leaf images and receive suitable treatment recommendations and farming advice, with Sinhala and English language support.",
    problem:
      "Farmers in Sri Lanka often cannot identify crop diseases quickly or accurately in the field. Reaching an Agricultural Officer takes time, so treatment is delayed, pesticides are misused and yields are lost.",
    explainability:
      "A Grad-CAM heatmap shows where on the leaf the model saw the disease, which builds trust, makes wrong predictions easier to spot and keeps a human expert in the loop through a confidence threshold.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "TensorFlow",
      "Keras",
      "MobileNetV2",
      "Grad-CAM",
      "Gemini API",
      "MongoDB Atlas",
      "JWT",
    ],
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "TensorFlow",
      "Keras",
      "MobileNetV2",
      "Grad-CAM",
      "Gemini API",
      "MongoDB Atlas",
      "JWT",
    ],
    features: [
      "MobileNetV2 trained on the PlantVillage dataset to classify 15 classes across Tomato, Potato and Bell Pepper, with confidence scores, top 3 predictions and a 'pending review' flag for uncertain results.",
      "FastAPI backend with JWT access + refresh tokens, role-based Farmer / Officer / Admin portals, MongoDB Atlas storage, rate limiting and login lockout.",
      "Bilingual (Sinhala / English) React dashboard with a Grad-CAM heatmap viewer, scan history charts and a Google Gemini farming assistant.",
    ],
    images: [
      "/projects/agrolens-ai/2.jpeg",
      "/projects/agrolens-ai/1.jpeg",
      "/projects/agrolens-ai/3.jpeg",
    ],
    image: "/projects/agrolens-ai/2.jpeg",
    github: "https://github.com/damsaraninawela2002-ux/AgroLens-AI",
    githubUrl: "https://github.com/damsaraninawela2002-ux/AgroLens-AI",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 1,
  },
  {
    _id: "project-fraudguard-ai",
    title: "FraudGuard AI – Explainable Fraud Detection System",
    slug: "fraudguard-ai",
    role: "Solo Full-Stack & AI Project",
    category: "Full-Stack",
    categories: ["Full-Stack", "Backend"],
    date: "Oct 2026",
    description:
      "A full-stack fraud detection platform that scores financial transactions with an XGBoost classifier and explains every prediction using SHAP feature attributions.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "XGBoost",
      "scikit-learn",
      "SHAP",
      "MongoDB",
      "JWT",
    ],
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "XGBoost",
      "scikit-learn",
      "SHAP",
      "MongoDB",
      "JWT",
    ],
    features: [
      "Trained and evaluated on the PaySim dataset (stratified 80/20 split), handling class imbalance with scale_pos_weight; achieved PR-AUC 0.82, Precision 0.88 and Recall 0.73.",
      "FastAPI backend with JWT authentication, MongoDB storage, paginated transaction history, statistics and CSV export endpoints, with pytest API tests.",
      "Responsive React dashboard with Recharts: risk gauge, SHAP contribution chart, fraud trend charts and a What-If Sandbox for live scenario testing.",
    ],
    images: [
      "/projects/fraudguard-ai/FraudGuard.png",
      "/projects/fraudguard-ai/f1.png",
      "/projects/fraudguard-ai/f2.png",
    ],
    image: "/projects/fraudguard-ai/FraudGuard.png",
    github: "https://github.com/damsaraninawela2002-ux/FraudGuard-AI",
    githubUrl: "https://github.com/damsaraninawela2002-ux/FraudGuard-AI",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 2,
  },
  {
    _id: "project-inventory-management-system",
    title: "Inventory Management System",
    slug: "inventory-management-system",
    role: "Solo Full-Stack Project",
    category: "Full-Stack",
    categories: ["Full-Stack"],
    date: "2026",
    description:
      "A full-stack inventory management application that lets administrators manage products, stock quantities and categories through a secure, easy-to-use dashboard.",
    stack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "JavaScript",
      "C#",
      "ASP.NET Core",
      "MongoDB",
    ],
    technologies: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "JavaScript",
      "C#",
      "ASP.NET Core",
      "MongoDB",
    ],
    features: [
      "Secure user login with 5 product operations (add, edit, delete, search, stock update) and full CRUD.",
      "REST APIs built with C# and ASP.NET Core and MongoDB; endpoints tested with Postman and managed with Git/GitHub.",
      "Administrators can manage products, stock quantities and categories from one responsive React interface.",
    ],
    images: [
      "/projects/inventory-management-system/1.jpeg",
      "/projects/inventory-management-system/image.jpeg",
      "/projects/inventory-management-system/2.jpeg",
    ],
    image: "/projects/inventory-management-system/1.jpeg",
    github: "https://github.com/damsaraninawela2002-ux/Inventory-Management-System",
    githubUrl: "https://github.com/damsaraninawela2002-ux/Inventory-Management-System",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 3,
  },
  {
    _id: "project-1",
    title: "Galaxy Cinemas System",
    slug: "galaxy-cinemas-system",
    role: "Solo Full-Stack Project",
    category: "Full-Stack",
    description:
      "A full-stack cinema seat and movie booking system that allows users to browse movies, select showtimes, choose seats, and manage bookings.",
    stack: [
      "React.js",
      "CSS3",
      "Node.js",
      "Express.js",
      "PHP",
      "MySQL",
      "RESTful API",
      "JWT",
      "VS Code",
      "XAMPP",
    ],
    technologies: [
      "React.js",
      "CSS3",
      "Node.js",
      "Express.js",
      "PHP",
      "MySQL",
      "RESTful API",
      "JWT",
      "VS Code",
      "XAMPP",
    ],
    features: [
      "Interactive theater seat selection grid with live booking management",
      "Real-time movie schedules, showtimes, and hall management",
      "Secure moviegoers checkout flow and booking reservations",
      "Comprehensive administration interface for theater scheduling",
      "Responsive layout optimized for mobile, tablet, and desktop",
    ],
    images: [
      "/projects/galaxy-cinemas-system/cinema.png",
      "/projects/galaxy-cinemas-system/cinema2.png",
      "/projects/galaxy-cinemas-system/cinema3.png",
    ],
    image: "/projects/galaxy-cinemas-system/cinema.png",
    github: "https://github.com/damsaraninawela2002-ux/galaxy-cinemas-system",
    githubUrl: "https://github.com/damsaraninawela2002-ux/galaxy-cinemas-system",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 4,
  },
  {
    _id: "project-2",
    title: "Dreamy Delight Cosmetic Shop System",
    slug: "dreamy-delight-cosmetic-shop",
    role: "Solo Full-Stack Project",
    category: "Full-Stack",
    description:
      "A full-stack cosmetic shop management and e-commerce system with product management, customer features, cart, wishlist, orders, and an admin dashboard.",
    stack: [
      "React.js",
      "CSS3",
      "Node.js",
      "Express.js",
      "MySQL",
      "RESTful API",
      "JWT",
      "VS Code",
      "XAMPP",
    ],
    technologies: [
      "React.js",
      "CSS3",
      "Node.js",
      "Express.js",
      "MySQL",
      "RESTful API",
      "JWT",
      "VS Code",
      "XAMPP",
    ],
    features: [
      "Dynamic product catalog and category-based cosmetics browsing",
      "Customer shopping features including interactive cart and wishlist",
      "Comprehensive order processing and invoice management",
      "Full administrator management dashboard for stock and catalog control",
      "Clean, modern responsive UI tailored for beauty and cosmetic products",
    ],
    images: [
      "/projects/dreamy-delight-cosmetic-shop/cosmetic-shop.jpeg",
      "/projects/dreamy-delight-cosmetic-shop/c2.png",
      "/projects/dreamy-delight-cosmetic-shop/c3.png",
      "/projects/dreamy-delight-cosmetic-shop/c4.png",
    ],
    image: "/projects/dreamy-delight-cosmetic-shop/cosmetic-shop.jpeg",
    github: "https://github.com/damsaraninawela2002-ux/Cosmetic-Shop-System",
    githubUrl: "https://github.com/damsaraninawela2002-ux/Cosmetic-Shop-System",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 5,
  },
  {
    _id: "project-3",
    title: "Easy Calculator",
    slug: "easy-calculator",
    role: "Solo Mobile App Project",
    category: "Mobile App",
    description:
      "A simple calculator application that performs basic mathematical operations with a clean and easy-to-use interface.",
    stack: [
      "Kotlin",
      "Android",
      "Gradle (KTS)",
      "Hilt (Dependency Injection)",
      "Retrofit",
      "Room Database",
      "Navigation Component",
    ],
    technologies: [
      "Kotlin",
      "Android",
      "Gradle (KTS)",
      "Hilt (Dependency Injection)",
      "Retrofit",
      "Room Database",
      "Navigation Component",
    ],
    features: [
      "Standard arithmetic calculations (addition, subtraction, multiplication, division)",
      "Clean, intuitive user interface with instant calculation response",
      "Input validation and edge-case handling for division by zero",
      "Lightweight, efficient Kotlin implementation with MVVM architecture",
    ],
    images: [
      "/projects/easy-calculator/cal.jpeg",
      "/projects/easy-calculator/cal2.jpeg",
    ],
    image: "/projects/easy-calculator/cal.jpeg",
    github: "https://github.com/damsaraninawela2002-ux/EasyCalculator",
    githubUrl: "https://github.com/damsaraninawela2002-ux/EasyCalculator",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 6,
  },
  {
    _id: "project-4",
    title: "BlueWave Water Park Management System",
    slug: "bluewave-water-park",
    role: "Solo Full-Stack Project",
    category: "Full-Stack",
    description:
      "A full-stack water park booking and management system with online ticket booking, attraction browsing, customer reviews, and a real-time admin dashboard for managing attractions, tickets, bookings, and messages.",
    stack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "MongoDB",
      "JWT",
      "REST API",
    ],
    technologies: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "MongoDB",
      "JWT",
      "REST API",
    ],
    features: [
      "Online ticket booking with real-time price calculation",
      "JWT-based authentication with role-based access for customers and admins",
      "Admin dashboard with live stats, revenue charts, and CRUD for attractions, tickets, and bookings",
      "Customer reviews with rating summaries and moderation",
      "Dark/light theme, fully responsive design",
    ],
    images: [
      "/projects/bluewave-water-park/11.png",
      "/projects/bluewave-water-park/12.png",
      "/projects/bluewave-water-park/13.png",
    ],
    image: "/projects/bluewave-water-park/11.png",
    github: "https://github.com/damsaraninawela2002-ux/bluewave-water-park.git",
    githubUrl: "https://github.com/damsaraninawela2002-ux/bluewave-water-park.git",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 7,
  },
];

export const heroStats = {
  completedCertifications: "03",
  projectsCount: String(defaultProjects.length).padStart(2, "0"),
  techSkillsCount: `${Math.floor(
    Object.values(skills).reduce((sum, list) => sum + list.length, 0) / 5
  ) * 5}+`,
};

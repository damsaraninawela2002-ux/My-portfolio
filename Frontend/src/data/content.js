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
    { name: "React", level:60  },
    { name: "JavaScript (ES6+)", level: 70 },
    { name: "Tailwind CSS", level: 55 },
    { name: "HTML5 & CSS3", level: 95 },
    { name: "Framer Motion", level: 30 }
  ],
  Backend: [
    { name: "Node.js", level: 45 },
    { name: "Express.js", level: 45 },
    { name: "Python / FastAPI", level: 50 },
    { name: "RESTful APIs", level: 55 },
    { name: "Java", level: 65 },
    { name: "PHP", level:50 }
  ],
  Database: [
    { name: "MongoDB", level: 50 },
    { name: "MySQL", level: 80 },
    { name: "Mongoose ODM", level: 45 },
    { name: "Data Modeling", level: 40 }
  ],
  "Tools & DevOps": [
    { name: "Git & GitHub", level: 65 },
    { name: "VS Code", level: 85 },
    { name: "Postman", level: 55 },
    { name: "Android Studio", level:50  },
    { name: "XAMPP", level: 85 }
  ]
};

const categoryIconMap = {
  Frontend: "Layout",
  Backend: "Server",
  Database: "Database",
  "Tools & DevOps": "Wrench",
};

export const skillCategories = Object.entries(skills).map(([name, skillList]) => ({
  name,
  icon: categoryIconMap[name] || "Wrench",
  skills: skillList.map((s) => ({
    ...s,
    dots: Math.min(5, Math.max(1, Math.round((s.level / 100) * 5))),
  })),
}));

export const defaultProjects = [
  {
    _id: "project-1",
    title: "Galaxy Cinema System",
    slug: "galaxy-cinema-system",
    category: "Full-Stack",
    description:
      "A full-stack cinema seat and movie booking system that allows users to browse movies, select showtimes, choose seats, and manage bookings.",
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
    image: "/images/cinema.png",
    github: "https://github.com/damsaraninawela2002-ux/galaxy-cinemas-system",
    githubUrl: "https://github.com/damsaraninawela2002-ux/galaxy-cinemas-system",
    liveDemoUrl: "",
    featured: true,
    order: 1,
  },
  {
    _id: "project-2",
    title: "Dreamy Delight Cosmetic Shop System",
    slug: "dreamy-delight-cosmetic-shop-system",
    category: "Full-Stack",
    description:
      "A full-stack cosmetic shop management and e-commerce system with product management, customer features, cart, wishlist, orders, and an admin dashboard.",
    technologies: ["React.js", "CSS3", 
  "Node.js", "Express.js",
  "MySQL", 
  "RESTful API", "JWT", 
  "VS Code", "XAMPP"
],
    features: [
      "Dynamic product catalog and category-based cosmetics browsing",
      "Customer shopping features including interactive cart and wishlist",
      "Comprehensive order processing and invoice management",
      "Full administrator management dashboard for stock and catalog control",
      "Clean, modern responsive UI tailored for beauty and cosmetic products",
    ],
    image: "/images/cosmetic shop.jpeg",
    github: "https://github.com/damsaraninawela2002-ux/Cosmetic-Shop-System",
    githubUrl: "https://github.com/damsaraninawela2002-ux/Cosmetic-Shop-System",
    liveDemoUrl: "",
    featured: true,
    order: 2,
  },
  {
    _id: "project-3",
    title: "Easy Calculator",
    slug: "easy-calculator",
    category: "Mobile App",
    description:
      "A simple calculator application that performs basic mathematical operations with a clean and easy-to-use interface.",
    technologies: [
    "Kotlin",
    "Android",
    "Gradle (KTS)",
    "Hilt (Dependency Injection)",
    "Retrofit",
    "Room Database",
    "Navigation Component"],
    features: [
      "Standard arithmetic calculations (addition, subtraction, multiplication, division)",
    "Clean, intuitive user interface with instant calculation response",
    "Input validation and edge-case handling for division by zero",
    "Lightweight, efficient Kotlin implementation with MVVM architecture"
    ],
    image: "/images/cal.jpeg",
    github: "https://github.com/damsaraninawela2002-ux/EasyCalculator",
    githubUrl: "https://github.com/damsaraninawela2002-ux/EasyCalculator",
    liveDemoUrl: "",
    featured: true,
    order: 3,
  },
  {
    _id: "project-4",
    title: "BlueWave Water Park Management System",
    slug: "bluewave-water-park-management-system",
    category: "Full-Stack",
    description:
      "A full-stack water park booking and management system with online ticket booking, attraction browsing, customer reviews, and a real-time admin dashboard for managing attractions, tickets, bookings, and messages.",
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
    image: "/images/11.png",
    github: "https://github.com/damsaraninawela2002-ux/bluewave-water-park.git",
    githubUrl: "https://github.com/damsaraninawela2002-ux/bluewave-water-park.git",
    liveDemoUrl: "",
    featured: true,
    order: 4,
},
];

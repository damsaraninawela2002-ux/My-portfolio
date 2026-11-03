export const defaultProjects = [
  {
    title: "AgroLens AI – Explainable Crop Disease Detection",
    slug: "agrolens-ai",
    role: "Solo Full-Stack & AI Project",
    description: "An AI-powered platform designed to help Sri Lankan farmers detect crop diseases from leaf images and receive suitable treatment recommendations and farming advice, with Sinhala and English language support.",
    problem: "Farmers in Sri Lanka often cannot identify crop diseases quickly or accurately in the field. Reaching an Agricultural Officer takes time, so treatment is delayed, pesticides are misused and yields are lost.",
    explainability: "A Grad-CAM heatmap shows where on the leaf the model saw the disease, which builds trust, makes wrong predictions easier to spot and keeps a human expert in the loop through a confidence threshold.",
    category: "Full-Stack",
    stack: ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "TensorFlow", "Keras", "MobileNetV2", "Grad-CAM", "Gemini API", "MongoDB Atlas", "JWT"],
    technologies: ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "TensorFlow", "Keras", "MobileNetV2", "Grad-CAM", "Gemini API", "MongoDB Atlas", "JWT"],
    features: [
      "MobileNetV2 trained on the PlantVillage dataset to classify 15 classes across Tomato, Potato and Bell Pepper, with confidence scores, top 3 predictions and a 'pending review' flag for uncertain results.",
      "FastAPI backend with JWT access + refresh tokens, role-based Farmer / Officer / Admin portals, MongoDB Atlas storage, rate limiting and login lockout.",
      "Bilingual (Sinhala / English) React dashboard with a Grad-CAM heatmap viewer, scan history charts and a Google Gemini farming assistant."
    ],
    images: [
      "/projects/agrolens-ai/2.jpeg",
      "/projects/agrolens-ai/1.jpeg",
      "/projects/agrolens-ai/3.jpeg"
    ],
    image: "/projects/agrolens-ai/2.jpeg",
    githubUrl: "https://github.com/damsaraninawela2002-ux/AgroLens-AI",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 1
  },
  {
    title: "FraudGuard AI – Explainable Fraud Detection System",
    slug: "fraudguard-ai",
    role: "Solo Full-Stack & AI Project",
    description: "A full-stack fraud detection platform that scores financial transactions with an XGBoost classifier and explains every prediction using SHAP feature attributions.",
    category: "Full-Stack",
    stack: ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "XGBoost", "scikit-learn", "SHAP", "MongoDB", "JWT"],
    technologies: ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "XGBoost", "scikit-learn", "SHAP", "MongoDB", "JWT"],
    features: [
      "Trained and evaluated on the PaySim dataset (stratified 80/20 split), handling class imbalance with scale_pos_weight; achieved PR-AUC 0.82, Precision 0.88 and Recall 0.73.",
      "FastAPI backend with JWT authentication, MongoDB storage, paginated transaction history, statistics and CSV export endpoints, with pytest API tests.",
      "Responsive React dashboard with Recharts: risk gauge, SHAP contribution chart, fraud trend charts and a What-If Sandbox for live scenario testing."
    ],
    images: [
      "/projects/fraudguard-ai/FraudGuard.png",
      "/projects/fraudguard-ai/f1.png",
      "/projects/fraudguard-ai/f2.png"
    ],
    image: "/projects/fraudguard-ai/FraudGuard.png",
    githubUrl: "https://github.com/damsaraninawela2002-ux/FraudGuard-AI",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 2
  },
  {
    title: "Inventory Management System",
    slug: "inventory-management-system",
    role: "Solo Full-Stack Project",
    description: "A full-stack inventory management application that lets administrators manage products, stock quantities and categories through a secure, easy-to-use dashboard.",
    category: "Full-Stack",
    stack: ["React.js", "Vite", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "C#", "ASP.NET Core", "MongoDB"],
    technologies: ["React.js", "Vite", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "C#", "ASP.NET Core", "MongoDB"],
    features: [
      "Secure user login with 5 product operations (add, edit, delete, search, stock update) and full CRUD.",
      "REST APIs built with C# and ASP.NET Core and MongoDB; endpoints tested with Postman and managed with Git/GitHub.",
      "Administrators can manage products, stock quantities and categories from one responsive React interface."
    ],
    images: [
      "/projects/inventory-management-system/1.jpeg",
      "/projects/inventory-management-system/image.jpeg",
      "/projects/inventory-management-system/2.jpeg"
    ],
    image: "/projects/inventory-management-system/1.jpeg",
    githubUrl: "https://github.com/damsaraninawela2002-ux/Inventory-Management-System",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 3
  },
  {
    title: "Galaxy Cinemas System",
    slug: "galaxy-cinemas-system",
    role: "Solo Full-Stack Project",
    description: "A full-stack cinema seat and movie booking system that allows users to browse movies, select showtimes, choose seats, and manage bookings.",
    category: "Full-Stack",
    stack: ["React.js", "CSS3", "Node.js", "Express.js", "PHP", "MySQL", "RESTful API", "JWT", "VS Code", "XAMPP"],
    technologies: ["React.js", "CSS3", "Node.js", "Express.js", "PHP", "MySQL", "RESTful API", "JWT", "VS Code", "XAMPP"],
    features: [
      "Interactive theater seat selection grid with live booking management",
      "Real-time movie schedules, showtimes, and hall management",
      "Secure moviegoers checkout flow and booking reservations",
      "Comprehensive administration interface for theater scheduling",
      "Responsive layout optimized for mobile, tablet, and desktop"
    ],
    images: [
      "/projects/galaxy-cinemas-system/cinema.png",
      "/projects/galaxy-cinemas-system/cinema2.png",
      "/projects/galaxy-cinemas-system/cinema3.png"
    ],
    image: "/projects/galaxy-cinemas-system/cinema.png",
    githubUrl: "https://github.com/damsaraninawela2002-ux/galaxy-cinemas-system",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 4
  },
  {
    title: "Dreamy Delight Cosmetic Shop System",
    slug: "dreamy-delight-cosmetic-shop",
    role: "Solo Full-Stack Project",
    description: "A full-stack cosmetic shop management and e-commerce system with product management, customer features, cart, wishlist, orders, and an admin dashboard.",
    category: "Full-Stack",
    stack: ["React.js", "CSS3", "Node.js", "Express.js", "MySQL", "RESTful API", "JWT", "VS Code", "XAMPP"],
    technologies: ["React.js", "CSS3", "Node.js", "Express.js", "MySQL", "RESTful API", "JWT", "VS Code", "XAMPP"],
    features: [
      "Dynamic product catalog and category-based cosmetics browsing",
      "Customer shopping features including interactive cart and wishlist",
      "Comprehensive order processing and invoice management",
      "Full administrator management dashboard for stock and catalog control",
      "Clean, modern responsive UI tailored for beauty and cosmetic products"
    ],
    images: [
      "/projects/dreamy-delight-cosmetic-shop/cosmetic-shop.jpeg",
      "/projects/dreamy-delight-cosmetic-shop/c2.png",
      "/projects/dreamy-delight-cosmetic-shop/c3.png",
      "/projects/dreamy-delight-cosmetic-shop/c4.png"
    ],
    image: "/projects/dreamy-delight-cosmetic-shop/cosmetic-shop.jpeg",
    githubUrl: "https://github.com/damsaraninawela2002-ux/Cosmetic-Shop-System",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 5
  },
  {
    title: "Easy Calculator",
    slug: "easy-calculator",
    role: "Solo Mobile App Project",
    description: "A simple calculator application that performs basic mathematical operations with a clean and easy-to-use interface.",
    category: "Mobile App",
    stack: ["Kotlin", "Android", "Gradle (KTS)", "Hilt (Dependency Injection)", "Retrofit", "Room Database", "Navigation Component"],
    technologies: ["Kotlin", "Android", "Gradle (KTS)", "Hilt (Dependency Injection)", "Retrofit", "Room Database", "Navigation Component"],
    features: [
      "Standard arithmetic calculations (addition, subtraction, multiplication, division)",
      "Clean, intuitive user interface with instant calculation response",
      "Input validation and edge-case handling for division by zero",
      "Lightweight, efficient Kotlin implementation with MVVM architecture"
    ],
    images: [
      "/projects/easy-calculator/cal.jpeg",
      "/projects/easy-calculator/cal2.jpeg"
    ],
    image: "/projects/easy-calculator/cal.jpeg",
    githubUrl: "https://github.com/damsaraninawela2002-ux/EasyCalculator",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 6
  },
  {
    title: "BlueWave Water Park Management System",
    slug: "bluewave-water-park",
    role: "Solo Full-Stack Project",
    description: "A full-stack water park booking and management system with online ticket booking, attraction browsing, customer reviews, and a real-time admin dashboard for managing attractions, tickets, bookings, and messages.",
    category: "Full-Stack",
    stack: ["React.js", "Vite", "Tailwind CSS", "FastAPI", "Python", "MongoDB", "JWT", "REST API"],
    technologies: ["React.js", "Vite", "Tailwind CSS", "FastAPI", "Python", "MongoDB", "JWT", "REST API"],
    features: [
      "Online ticket booking with real-time price calculation",
      "JWT-based authentication with role-based access for customers and admins",
      "Admin dashboard with live stats, revenue charts, and CRUD for attractions, tickets, and bookings",
      "Customer reviews with rating summaries and moderation",
      "Dark/light theme, fully responsive design"
    ],
    images: [
      "/projects/bluewave-water-park/11.png",
      "/projects/bluewave-water-park/12.png",
      "/projects/bluewave-water-park/13.png"
    ],
    image: "/projects/bluewave-water-park/11.png",
    githubUrl: "https://github.com/damsaraninawela2002-ux/bluewave-water-park.git",
    liveUrl: "",
    liveDemoUrl: "",
    featured: true,
    order: 7
  }
];

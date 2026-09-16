// Sample portfolio data
const profile = {
  name: "Alex Doe",
  title: "Full Stack Developer",
  bio: "Passionate software engineer building performant, accessible web applications and robust backend services.",
  location: "San Francisco, CA",
  email: "alex.doe@example.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

const skills = [
  {
    category: "Frontend",
    items: ["JavaScript (ES6+)", "React", "HTML5 & CSS3", "Tailwind CSS", "Next.js"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "RESTful APIs", "PostgreSQL", "MongoDB"]
  },
  {
    category: "DevOps & Tools",
    items: ["Git & GitHub", "Docker", "AWS", "CI/CD", "Postman"]
  }
];

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "An analytics dashboard for online merchants with real-time sales charts and order management.",
    techStack: ["React", "Node.js", "Express", "Chart.js"],
    liveDemo: "https://example.com/ecommerce-demo",
    githubRepo: "https://github.com/example/ecommerce-dashboard",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative Kanban-style project management tool with live WebSocket notifications.",
    techStack: ["JavaScript", "Express", "Socket.io", "MongoDB"],
    liveDemo: "https://example.com/task-app-demo",
    githubRepo: "https://github.com/example/task-manager",
    featured: true
  },
  {
    id: 3,
    title: "Weather & Forecast Hub",
    description: "A clean, responsive weather app showing 7-day forecasts and interactive meteorological maps.",
    techStack: ["HTML5", "CSS3", "JavaScript", "OpenWeather API"],
    liveDemo: "https://example.com/weather-demo",
    githubRepo: "https://github.com/example/weather-hub",
    featured: false
  }
];

// In-memory contact submissions store
const contactMessages = [];

module.exports = {
  profile,
  skills,
  projects,
  contactMessages
};

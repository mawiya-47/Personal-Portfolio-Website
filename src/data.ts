export interface Skill {
  name: string;
  level: number; // percentage
  category: "AI/ML" | "Backend" | "Frontend" | "DevOps";
}

export const SKILLS_DATA: Skill[] = [
  // AI / ML
  { name: "Python", level: 95, category: "AI/ML" },
  { name: "Machine Learning", level: 90, category: "AI/ML" },
  { name: "Deep Learning", level: 85, category: "AI/ML" },
  { name: "TensorFlow", level: 80, category: "AI/ML" },
  { name: "PyTorch", level: 80, category: "AI/ML" },
  { name: "Scikit-Learn", level: 90, category: "AI/ML" },
  { name: "Pandas & NumPy", level: 92, category: "AI/ML" },
  { name: "Large Language Models (LLMs)", level: 88, category: "AI/ML" },

  // Backend
  { name: "Django", level: 90, category: "Backend" },
  { name: "Flask", level: 85, category: "Backend" },
  { name: "FastAPI", level: 88, category: "Backend" },
  { name: "REST APIs", level: 92, category: "Backend" },

  // Frontend
  { name: "React / Vite", level: 88, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 82, category: "Frontend" },
  { name: "HTML5 / CSS3", level: 95, category: "Frontend" },
  { name: "JavaScript (ES6+)", level: 90, category: "Frontend" },

  // DevOps / Other
  { name: "Docker", level: 80, category: "DevOps" },
  { name: "Linux Administration", level: 85, category: "DevOps" },
  { name: "Git & Version Control", level: 92, category: "DevOps" },
  { name: "Nginx", level: 78, category: "DevOps" },
  { name: "MySQL / Relational DBs", level: 86, category: "DevOps" },
];

export interface TimelineExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
  category: "AI" | "ML" | "Automation" | "Full Stack" | "Academic";
}

export const EXPERIENCE_TIMELINE: TimelineExperience[] = [
  {
    role: "AI Developer (Self-Paced / Open-Source)",
    company: "GitHub Portfolio Initiatives",
    duration: "2024 - Present",
    description: "Designed, trained, and deployed multiple LLM agent workflows and custom NLP voice assistant utilities including JARVIS. Automated desktop task flows and web scraping operations.",
    category: "AI",
  },
  {
    role: "Full Stack Django & Python Developer",
    company: "University Academic Platforms",
    duration: "2024 - Present",
    description: "Built the comprehensive NEXUS and JSMU-Nexus administrative portals. Optimized MySQL schemas and integrated responsive Tailwind grid systems to automate user registrations and rosters.",
    category: "Full Stack",
  },
  {
    role: "Machine Learning Automation Lead",
    company: "Data & Systems Automations Projects",
    duration: "2024 - Ongoing",
    description: "Pre-processed tabular and telemetry data using Pandas & NumPy. Trained clustering models and regression baselines with Scikit-Learn to compile automated statistical reporting suites.",
    category: "ML",
  },
  {
    role: "Advanced AI Diploma Scholar",
    company: "NED University of Engineering and Technology",
    duration: "Ongoing",
    description: "Formally specializing in Neural Networks, Deep Learning optimization parameter search, computer vision models, and transformer pipelines.",
    category: "Academic",
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  badge: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Diploma in Artificial Intelligence",
    issuer: "NED University",
    date: "In Progress",
    description: "In-depth specialization covering Deep Neural Networks, Transformer pipelines, Model Finetuning, and Computer Vision strategies.",
    badge: "AI SPECIALIST",
  },
  {
    title: "Cybersecurity Basics Certificate",
    issuer: "Professional Systems Lab",
    date: "Completed",
    description: "Fundamentals of network protocols safety, endpoint guarding, penetration testing basics, and OWASP Top 10 vulnerabilities mitigation.",
    badge: "CYBER SEC",
  },
  {
    title: "Advanced English Language Certification",
    issuer: "Karachi Professional Academy",
    date: "Completed",
    description: "High professional proficiency in written and verbal communication, technical presentation, and team collaboration frameworks.",
    badge: "BILINGUAL",
  },
];

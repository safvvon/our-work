export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  bio: string;
  avatar: string;
  neonColor: string; // Primary neon glow color hex/rgb
  glowGradient: string; // Tailored gradient string
  linkedin?: string;
  email?: string;
  portfolio?: string;
}

export const CATEGORIES = [
  "All",
  "Leadership",
  "Development",
  "Design",
  "AI/ML",
  "Media",
  "Marketing",
  "Operations",
  "Sales",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "amal",
    name: "Amal",
    role: "Developer",
    category: "Development",
    bio: "Lead Developer specializing in high-performance web systems, Next.js architecture, and ultra-responsive user interfaces.",
    avatar: "/images/Amal.webp",
    neonColor: "#00F0FF", // Electric Cyan
    glowGradient: "from-[#00F0FF] via-[#A855F7] to-[#EC4899]",
    linkedin: "https://linkedin.com",
    email: "mailto:amal@intellex.ai",
    portfolio: "https://intellex.ai",
  },
  {
    id: "hari",
    name: "Hari",
    role: "Developer",
    category: "Development",
    bio: "Full-Stack Developer focused on building low-latency API infrastructure, real-time databases, and scalable cloud services.",
    avatar: "/images/Hari.webp",
    neonColor: "#5CFF3D", // Intellex Neon Green
    glowGradient: "from-[#5CFF3D] via-[#00FF99] to-[#00F0FF]",
    linkedin: "https://linkedin.com",
    email: "mailto:hari@intellex.ai",
    portfolio: "https://intellex.ai",
  },
  {
    id: "jinan",
    name: "Jinan",
    role: "Developer",
    category: "Development",
    bio: "AI Developer engineering intelligent automation algorithms, custom neural models, and generative technology solutions.",
    avatar: "/images/Jinan.webp",
    neonColor: "#A855F7", // Cyber Purple
    glowGradient: "from-[#A855F7] via-[#EC4899] to-[#00F0FF]",
    linkedin: "https://linkedin.com",
    email: "mailto:jinan@intellex.ai",
    portfolio: "https://intellex.ai",
  },
  {
    id: "lubna",
    name: "Lubna",
    role: "Developer",
    category: "Development",
    bio: "Frontend Developer crafting pixel-perfect glassmorphic layouts, fluid interactive components, and sleek web aesthetics.",
    avatar: "/images/Lubna.webp",
    neonColor: "#EC4899", // Hot Pink
    glowGradient: "from-[#EC4899] via-[#F43F5E] to-[#EAB308]",
    linkedin: "https://linkedin.com",
    email: "mailto:lubna@intellex.ai",
    portfolio: "https://intellex.ai",
  },
  {
    id: "neja",
    name: "Neja",
    role: "Developer",
    category: "Development",
    bio: "Creative Developer pushing the boundaries of 3D WebGL renders, GPU acceleration, and rich interactive web motion.",
    avatar: "/images/Neja.webp",
    neonColor: "#EAB308", // Neon Gold
    glowGradient: "from-[#EAB308] via-[#F97316] to-[#00F0FF]",
    linkedin: "https://linkedin.com",
    email: "mailto:neja@intellex.ai",
    portfolio: "https://intellex.ai",
  },
  {
    id: "shiv-shankar",
    name: "Shiv Shankar",
    role: "Developer",
    category: "Development",
    bio: "Backend & Systems Developer dedicated to high-concurrency microservices, cloud security, and robust DevOps automation.",
    avatar: "/images/Shiv Shankar.webp",
    neonColor: "#3B82F6", // Ocean Blue
    glowGradient: "from-[#3B82F6] via-[#06B6D4] to-[#A855F7]",
    linkedin: "https://linkedin.com",
    email: "mailto:shivshankar@intellex.ai",
    portfolio: "https://intellex.ai",
  },
  {
    id: "shivganga",
    name: "Shivganga",
    role: "Developer",
    category: "Development",
    bio: "Web Developer implementing data-driven performance optimizations, SEO infrastructure, and rapid web feature delivery.",
    avatar: "/images/Shivganga.webp",
    neonColor: "#8B5CF6", // Electric Violet
    glowGradient: "from-[#8B5CF6] via-[#EC4899] to-[#00F0FF]",
    linkedin: "https://linkedin.com",
    email: "mailto:shivganga@intellex.ai",
    portfolio: "https://intellex.ai",
  },
  {
    id: "shiyara",
    name: "Shiyara",
    role: "Developer",
    category: "Development",
    bio: "Software Developer ensuring clean code architecture, efficient component libraries, and seamless cross-platform execution.",
    avatar: "/images/Shiyara.webp",
    neonColor: "#F97316", // Neon Orange
    glowGradient: "from-[#F97316] via-[#EAB308] to-[#EC4899]",
    linkedin: "https://linkedin.com",
    email: "mailto:shiyara@intellex.ai",
    portfolio: "https://intellex.ai",
  },
  {
    id: "sinan",
    name: "Sinan",
    role: "Developer",
    category: "Development",
    bio: "Solutions Developer bridging complex business logic with modern web technologies and enterprise integrations.",
    avatar: "/images/Sinan.webp",
    neonColor: "#06B6D4", // Cyber Teal
    glowGradient: "from-[#06B6D4] via-[#3B82F6] to-[#A855F7]",
    linkedin: "https://linkedin.com",
    email: "mailto:sinan@intellex.ai",
    portfolio: "https://intellex.ai",
  },
];

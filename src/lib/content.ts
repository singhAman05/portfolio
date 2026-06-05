import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

function readJSON<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resume: string;
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export interface AboutConfig {
  headline: string;
  bio: string;
  pitch: string;
  differentiators: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  highlights: string[];
}

export interface SystemDesign {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  image: string;
  highlights: string[];
  architecture: {
    components: string[];
    decisions: string[];
  };
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsConfig {
  categories: SkillCategory[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export function getSiteConfig(): SiteConfig {
  return readJSON<SiteConfig>("site.json");
}

export function getAboutConfig(): AboutConfig {
  return readJSON<AboutConfig>("about.json");
}

export function getProjects(): Project[] {
  return readJSON<Project[]>("projects.json");
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getSystemDesigns(): SystemDesign[] {
  return readJSON<SystemDesign[]>("system-designs.json");
}

export function getSkills(): SkillsConfig {
  return readJSON<SkillsConfig>("skills.json");
}

export function getExperience(): Experience[] {
  return readJSON<Experience[]>("experience.json");
}

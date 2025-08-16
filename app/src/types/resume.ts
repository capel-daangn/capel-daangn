export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  introduction: string;
}

export interface Skill {
  category: string;
  items: string[];
  description?: string[];
}

export interface Experience {
  company: string;
  position: string;
  team?: string;
  location: string;
  period: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  major: string;
  period: string;
  location?: string;
  gpa?: string;
  activities?: string[];
}

export interface Project {
  title: string;
  period: string;
  team?: string;
  description: string;
  why?: string;
  how?: string[];
  what?: string[];
  techStack?: string[];
  link?: string;
}

export interface Award {
  title: string;
  organization: string;
  date: string;
  rank?: string;
}

export interface Language {
  language: string;
  level: string;
  certifications?: {
    name: string;
    score: string;
  }[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  awards: Award[];
  languages: Language[];
  certifications: Certification[];
}
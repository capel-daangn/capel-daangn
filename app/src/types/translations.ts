export interface Profile {
  title: string;
  subtitle: string;
  description: string;
  items: Array<{ type: string; content: string }>;
}

export interface SectionContent {
  type: string;
  title?: string;
  subtitle?: string;
  variant?: string;
  level?: string;
  tag?: string;
  content?: Array<{ type: string; content: string } | SectionContent>;
}

export interface Section {
  title: string;
  content: SectionContent[];
}

export interface Sections {
  skillsSummary: Section;
  experience: Section;
  skills: Section;
  awards: Section;
  languages: Section;
  projects: Section;
  education: Section;
  certifications: Section;
}

export interface TranslationMessages {
  profile: Profile;
  sections: Sections;
}
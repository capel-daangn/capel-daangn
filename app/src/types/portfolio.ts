import { CardItem, TextItem } from "./common";

export type PortfolioCategory = 'all' | 'karrot' | 'competition' | 'side';

export interface TechStack {
  name: string;
  color?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  blog?: string;
}

export interface PortfolioProject extends CardItem {
  category: PortfolioCategory[];
  thumbnail?: string;
  techStack?: TechStack[];
  metrics?: ProjectMetric[];
  links?: ProjectLinks;
}

export interface PortfolioSection {
  title: TextItem;
  content: PortfolioProject[];
  inactive?: boolean;
}

export interface PortfolioData {
  portfolio: PortfolioSection;
}

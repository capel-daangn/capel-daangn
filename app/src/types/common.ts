// Base item types
export interface TextItem {
  type: "text";
  level?: string;
  content: string;
  url?: string;
}

export interface CardItem {
  type: "card";
  variant?: "bordered" | "timeline" | "simple";
  title: TextItem;
  border?: boolean;
  tag?: string;
  level?: string;
  subtitle?: string;
  description?: string;
  content?: Item[];
}

// Union type for all possible item types
export type Item = TextItem | CardItem;

// Section interface
export interface Section {
  title: TextItem;
  content: Item[];
}

// Profile interface
export interface Profile {
  title: TextItem;
  subtitle: string;
  description: string;
  items: Array<{
    title: string;
    subtitle: string;
  }>;
}

// Root data structure
export interface ResumeData {
  profile: Profile;
  sections: Record<string, Section>;
}

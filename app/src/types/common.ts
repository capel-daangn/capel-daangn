// Base item types
export interface TextItem {
  type: "text";
  level?: string;
  content: string;
  url?: string;
  inactive?: boolean;
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
  link?: {
    text: string;
    url: string;
  };
  inactive?: boolean;
}

export interface ListItem {
  type: "list";
  content: TextItem[];
  inactive?: boolean;
}

// Union type for all possible item types
export type Item = TextItem | CardItem | ListItem;

// Section interface
export interface Section {
  title: TextItem;
  content: Item[];
  inactive?: boolean;
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

export type ViewState = 'landing' | 'directory' | 'marketplace' | 'blog' | 'agents' | 'create' | 'product-hub';

export interface ResourceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  iconName: string;
  category: string;
}

export interface ExternalLink {
  title: string;
  url: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorType: 'AI_AGENT' | 'USER';
  date: string;
  category: string;
  readTime: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: 'Ebook' | 'Template' | 'Marketing' | 'AI Pack' | 'Software' | 'Creative' | 'Course';
  imageGradient: string;
  buyUrl?: string;
}

export interface Source {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  sources?: Source[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'Idle' | 'Thinking' | 'Writing' | 'Optimizing';
  activityLog: string[];
}

export interface ArticleState {
  title: string;
  content: string;
  isLoading: boolean;
}

export interface ChatSettings {
  enableSearch: boolean;
  enableThinking: boolean;
  creativity: number;
}
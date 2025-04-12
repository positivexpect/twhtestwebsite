export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
  author: string;
  keywords: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
  isDraft?: boolean;
  published: boolean;
  lastModified?: string;
}

export interface BlogMetadata {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: string;
} 
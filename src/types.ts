export type CategoryId = 'pdf' | 'image' | 'calculator' | 'ai-text' | 'code' | 'seo';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  icon: string;
  popular?: boolean;
  featured?: boolean;
  tags: string[];
  slug: string;
  instructions?: string;
  inputsSchema?: {
    type: 'text' | 'number' | 'textarea' | 'select' | 'file' | 'checkbox' | 'color';
    name: string;
    label: string;
    defaultValue?: any;
    options?: string[];
    placeholder?: string;
  }[];
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  count: number;
}

export interface ArticleImage {
  placement?: string;
  url: string;
  alt: string;
  caption: string;
}

export interface InternalLinkItem {
  anchor: string;
  url: string;
  reason?: string;
}

export interface ExternalSourceItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  excerpt: string;
  tableOfContents: string[];
  contentMarkdown: string;
  featuredImage: ArticleImage;
  inContentImages: ArticleImage[];
  keyTakeaways: string[];
  faq: FAQItem[];
  internalLinks: InternalLinkItem[];
  externalSources: ExternalSourceItem[];
  ctaText: string;
  views: number;
  likes: number;
}

export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string;
  demoMode: boolean;
  slots: {
    headerBanner: string | boolean;
    sidebarSquare: string | boolean;
    inArticle: string | boolean;
    footerSticky: string | boolean;
    toolSidebar: string | boolean;
  };
}

export interface MetaSettings {
  siteTitle: string;
  siteDescription: string;
  canonicalUrl: string;
  ogImage: string;
  twitterHandle: string;
}


export interface BlogPost {
  title: string;
  titleIT: string;
  excerpt: string;
  excerptIT: string;
  content: string;
  contentIT: string;
  author: string;
  authorImageUrl: string;
  date: string;
  dateIT: string;
  category: string;
  categoryIT: string;
  imageUrl: string;
  desktopImageUrl: string;
  readingTime: string;
  readingTimeIT: string;
  tags: string[];
  tagsIT: string[];
  slug?: string; // Added slug property as optional
}

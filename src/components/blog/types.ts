
export interface BlogPost {
  slug?: string;
  title: string;
  titleIT: string;
  excerpt: string;
  excerptIT: string;
  content?: string;
  contentIT?: string;
  author?: string;
  authorImageUrl?: string;
  date: string;
  dateIT: string;
  category: string;
  categoryIT: string;
  imageUrl: string;
  desktopImageUrl?: string;
  readingTime?: string;
  readingTimeIT?: string;
  tags?: string[];
  tagsIT?: string[];
  published?: boolean;
  featured?: boolean;
  id?: number;
}

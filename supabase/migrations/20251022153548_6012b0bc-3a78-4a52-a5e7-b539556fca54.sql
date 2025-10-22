-- Create blog_posts table to store all blog articles
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  title_it text,
  excerpt text NOT NULL,
  excerpt_it text,
  content text NOT NULL,
  content_it text,
  author text NOT NULL,
  author_image_url text,
  date text NOT NULL,
  date_it text,
  category text NOT NULL,
  category_it text,
  image_url text,
  desktop_image_url text,
  reading_time text,
  reading_time_it text,
  tags text[] DEFAULT '{}',
  tags_it text[] DEFAULT '{}',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read published blog posts
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (published = true);

-- Allow authenticated users to view all posts (for admin)
CREATE POLICY "Authenticated users can view all posts"
ON public.blog_posts
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert posts
CREATE POLICY "Authenticated users can create posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update posts
CREATE POLICY "Authenticated users can update posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete posts
CREATE POLICY "Authenticated users can delete posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (true);

-- Create index on slug for faster lookups
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Create index on published status
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
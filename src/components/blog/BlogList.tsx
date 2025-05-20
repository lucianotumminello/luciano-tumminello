
import React from "react";
import BlogCard from "./BlogCard";
import BlogPagination from "./BlogPagination";

interface BlogListProps {
  blogPosts: Array<{
    slug: string;
    title: string;
    titleIT?: string;
    excerpt: string;
    excerptIT?: string;
    category: string;
    categoryIT?: string;
    date: string;
    dateIT?: string;
    imageUrl: string;
    desktopImageUrl?: string;
    [key: string]: any;
  }>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage: number;
  formatDate: (dateStr: string) => string;
}

const BlogList: React.FC<BlogListProps> = ({
  blogPosts,
  currentPage,
  setCurrentPage,
  postsPerPage,
  formatDate
}) => {
  // Calculate pagination values
  const totalPosts = blogPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {currentPosts.map((post, index) => (
          <BlogCard key={index} post={post} formatDate={formatDate} />
        ))}
      </div>
      
      <BlogPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setCurrentPage={setCurrentPage} 
      />
    </>
  );
};

export default BlogList;

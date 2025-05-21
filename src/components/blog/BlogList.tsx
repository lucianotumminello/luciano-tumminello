
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import TranslatedText from '@/components/TranslatedText';

interface BlogListProps {
  blogPosts: Array<{slug: string; [key: string]: any}>;
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
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-700">
          {isItalian ? "Nessun post del blog trovato" : "No blog posts found"}
        </h3>
        <p className="text-gray-500 mt-2">
          {isItalian ? "Controlla più tardi per nuovi contenuti" : "Check back later for new content"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentPosts.map((post) => (
          <div key={post.slug} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
            <Link to={`/blog/${post.slug}`} className="block relative">
              <img 
                src={post.imageUrl || '/placeholder.svg'} 
                alt={isItalian ? post.titleIT || post.title : post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded">
                  {isItalian ? post.categoryIT || post.category : post.category}
                </span>
              </div>
            </Link>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center mb-4">
                <img 
                  src={post.authorImageUrl || '/placeholder.svg'} 
                  alt={post.author} 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-sm">
                  <p className="text-gray-900 font-medium">{post.author}</p>
                  <p className="text-gray-500">{isItalian ? formatDate(post.dateIT || post.date) : formatDate(post.date)}</p>
                </div>
              </div>
              
              <Link to={`/blog/${post.slug}`} className="block mb-2">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">
                  {isItalian ? post.titleIT || post.title : post.title}
                </h3>
              </Link>
              
              <p className="text-gray-600 mb-4 flex-grow">
                {isItalian 
                  ? (post.excerptIT || post.excerpt || "").length > 120 
                    ? (post.excerptIT || post.excerpt || "").substring(0, 120) + "..." 
                    : (post.excerptIT || post.excerpt || "")
                  : (post.excerpt || "").length > 120 
                    ? (post.excerpt || "").substring(0, 120) + "..." 
                    : (post.excerpt || "")
                }
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="text-primary hover:underline transition"
                >
                  {isItalian ? "Leggi di più" : "Read more"}
                </Link>
                <span className="text-gray-500 text-sm">
                  {isItalian ? post.readingTimeIT || post.readingTime : post.readingTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }} 
                />
              </PaginationItem>
            )}
            
            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink 
                  href="#" 
                  isActive={currentPage === number}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(number);
                  }}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }} 
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BlogList;

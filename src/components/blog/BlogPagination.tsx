
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
        
        <PaginationItem>
          <PaginationLink isActive>1</PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default BlogPagination;

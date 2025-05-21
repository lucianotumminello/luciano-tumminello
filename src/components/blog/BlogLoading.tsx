
import React from 'react';

const BlogLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
          <div className="w-full h-48 bg-gray-200"></div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
              <div>
                <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            
            <div className="h-5 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogLoading;

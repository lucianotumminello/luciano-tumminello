
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NotFoundMessageProps {
  isItalian: boolean;
}

const NotFoundMessage = ({ isItalian }: NotFoundMessageProps) => {
  return (
    <div className="container mx-auto max-w-3xl text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {isItalian ? "Post del Blog Non Trovato" : "Blog Post Not Found"}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {isItalian 
          ? "Il post del blog che stai cercando non esiste o è stato rimosso." 
          : "The blog post you're looking for doesn't exist or has been removed."}
      </p>
      <Link to="/blog">
        <Button>
          {isItalian ? "Torna al Blog" : "Return to Blog"}
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundMessage;

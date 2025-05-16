
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogHeader: React.FC = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";

  return (
    <div className="mb-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
      <p className="text-lg text-gray-600 mx-auto max-w-3xl text-justify">
        {isItalian 
          ? "Approfondimenti strategici sulla trasformazione digitale, le operazioni globali e il marketing basato sui dati."
          : "Strategic insights on digital transformation, global operations, and data-driven marketing."
        }
      </p>
    </div>
  );
};

export default BlogHeader;

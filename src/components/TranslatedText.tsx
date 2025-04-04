
import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

interface TranslatedTextProps {
  textKey: string;
  className?: string;
  as?: React.ElementType;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  textKey, 
  className = "", 
  as: Component = "span" 
}) => {
  const { t } = useLanguage();
  
  return (
    <Component className={className}>
      {t(textKey)}
    </Component>
  );
};

export default TranslatedText;

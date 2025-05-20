
import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

interface TranslatedTextProps {
  textKey: string;
  className?: string;
  as?: React.ElementType;
  fallback?: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  textKey, 
  className = "", 
  as: Component = "span",
  fallback
}) => {
  const { t } = useLanguage();
  const translatedText = t(textKey);
  
  // If the translation is the same as the key (meaning no translation found)
  // and a fallback is provided, use the fallback
  const displayText = translatedText === textKey && fallback ? fallback : translatedText;
  
  // Ensure we escape any apostrophes and quotes properly
  const safeDisplayText = displayText.replace(/'/g, "\\'").replace(/"/g, '\\"');
  
  return (
    <Component className={className} lang={textKey.startsWith('it.') ? 'it' : 'en'}>
      {displayText}
    </Component>
  );
};

export default TranslatedText;


import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

interface TranslatedTextProps {
  textKey: string;
  className?: string;
  as?: React.ElementType;
  fallback?: string;
  dangerouslySetInnerHTML?: boolean;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  textKey, 
  className = "", 
  as: Component = "span",
  fallback,
  dangerouslySetInnerHTML = false
}) => {
  const { t } = useLanguage();
  const translatedText = t(textKey);
  
  // If the translation is the same as the key (meaning no translation found)
  // and a fallback is provided, use the fallback
  const displayText = translatedText === textKey && fallback ? fallback : translatedText;
  
  // Check for Italian language based on the key prefix
  const isItalianText = textKey.startsWith('it.') || (textKey.includes('human-tech-equation') && useLanguage().language === 'it');
  
  if (dangerouslySetInnerHTML) {
    return (
      <Component 
        className={className} 
        lang={isItalianText ? 'it' : 'en'} 
        dangerouslySetInnerHTML={{ __html: displayText }}
      />
    );
  }
  
  return (
    <Component className={className} lang={isItalianText ? 'it' : 'en'}>
      {displayText}
    </Component>
  );
};

export default TranslatedText;

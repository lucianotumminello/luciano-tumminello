
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
  const displayText = (translatedText === textKey && fallback) ? fallback : translatedText;
  
  // Check for Italian language based on the key prefix or specific blog post
  const { language } = useLanguage();
  const isItalianText = textKey.startsWith('it.') || 
                       ((textKey.includes('human-tech-equation') || 
                         textKey.includes('workforce-digital-transformation')) && 
                        language === 'it');
  
  // For debugging
  if (textKey.includes('human-tech-equation') || textKey.includes('workforce-digital-transformation')) {
    console.log(`TranslatedText for ${textKey}: using ${isItalianText ? 'Italian' : 'English'} text`);
    console.log(`Text length: ${displayText?.length || 0} characters`);
  }
  
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

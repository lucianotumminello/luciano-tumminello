
import { Mail } from "lucide-react";
import TranslatedText from "./TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { memo } from "react";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <footer className="border-t py-8 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        {/* Desktop View */}
        <div className="hidden md:flex md:flex-row items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              © {currentYear} Luciano Tumminello
            </p>
          </div>
          
          <nav className="flex items-center space-x-8">
            <a 
              href="/privacy-policy" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <TranslatedText textKey="footer.privacy" />
            </a>
            <a 
              href="/cookie-policy" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <TranslatedText textKey="footer.cookies" />
            </a>
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/in/lucianotumminello10101981/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="block"
              >
                <img 
                  src="/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png" 
                  alt="LinkedIn" 
                  className="h-8 w-8 transition-transform hover:scale-110" 
                />
              </a>
              <a 
                href="mailto:lucianotumminello@gmail.com" 
                aria-label="Email"
              >
                <Mail className="h-8 w-8 text-gray-600 hover:text-primary transition-colors" />
              </a>
            </div>
          </nav>
        </div>
        
        {/* Mobile View - No navigation links */}
        <div className="flex flex-col md:hidden">
          {/* Second line: Policies and social links */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <a 
                href="/privacy-policy" 
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                <TranslatedText textKey="footer.privacy" />
              </a>
              <a 
                href="/cookie-policy" 
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                <TranslatedText textKey="footer.cookies" />
              </a>
            </div>
            
            <div className="flex space-x-4 ml-auto pr-2">
              <a 
                href="https://www.linkedin.com/in/lucianotumminello10101981/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center"
              >
                <img 
                  src="/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png" 
                  alt="LinkedIn" 
                  className="h-6 w-6 min-w-6 min-h-6" 
                />
              </a>
              <a 
                href="mailto:lucianotumminello@gmail.com" 
                aria-label="Email"
                className="flex items-center justify-center"
              >
                <Mail className="h-6 w-6 min-w-6 min-h-6 text-gray-600 hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Third line: Copyright */}
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600">
              © {currentYear} Luciano Tumminello
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;


import { Mail, Globe } from "lucide-react";
import TranslatedText from "./TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="border-t py-8 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} Luciano Tumminello
            </p>
          </div>
          
          <nav className="flex items-center space-x-8 mt-4 md:mt-0">
            <a 
              href="/" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <TranslatedText textKey="nav.home" />
            </a>
            <a 
              href="/about" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <TranslatedText textKey="nav.about" />
            </a>
            <a 
              href="/blog" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <TranslatedText textKey="nav.blog" />
            </a>
            <a 
              href="/contact" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <TranslatedText textKey="nav.contact" />
            </a>
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/in/lucianotumminello10101981/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <img 
                  src="/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png" 
                  alt="LinkedIn" 
                  className="h-8 w-8 transition-transform hover:scale-110" 
                />
              </a>
              <a 
                href="mailto:hello@lucianotumminello.com" 
                aria-label="Email"
              >
                <Mail className="h-8 w-8 text-gray-600 hover:text-primary transition-colors" />
              </a>
            </div>
          </nav>
        </div>
        
        <div className="mt-6 pt-6 border-t text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;

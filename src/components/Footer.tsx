
import { Mail, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
              Home
            </a>
            <a 
              href="/about" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              About
            </a>
            <a 
              href="/blog" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Blog
            </a>
            <a 
              href="/contact" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Contact
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
                <Mail className="h-4 w-4 text-gray-600 hover:text-primary transition-colors" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

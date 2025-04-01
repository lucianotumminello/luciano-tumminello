
import { Linkedin, Mail, Briefcase, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} Luciano Tumminello | Chief Operating Officer at Spartan Health
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-4 md:space-y-2">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">15+ Years of Experience in Marketing & Operations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Working Remotely with Teams Across Asia-Pacific</span>
            </div>
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
                href="https://linkedin.com/in/lucianotumminello" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-gray-600 hover:text-primary transition-colors" />
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

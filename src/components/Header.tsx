
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors",
        isActive(to)
          ? "text-primary font-semibold border-b-2 border-primary"
          : "text-muted-foreground hover:text-primary"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">Luciano Tumminello</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Me</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact Me</NavLink>
        </nav>
        
        <div className="flex items-center">
          <a 
            href="https://www.linkedin.com/in/lucianotumminello10101981/" 
            target="_blank" 
            rel="noreferrer"
            className="ml-4"
            aria-label="LinkedIn Profile"
          >
            <img 
              src="/lovable-uploads/be682824-4e6b-4af4-9c53-aa9a47040326.png" 
              alt="LinkedIn" 
              className="h-8 w-8 rounded transition-transform hover:scale-110"
            />
          </a>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"}
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b shadow-lg">
          <div className="flex flex-col space-y-3 p-4">
            <Link 
              to="/" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/about") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Me
            </Link>
            <Link 
              to="/blog" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/blog") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/contact") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Me
            </Link>
            
            <div className="px-3 py-2 flex items-center">
              <a 
                href="https://www.linkedin.com/in/lucianotumminello10101981/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center space-x-2"
              >
                <img 
                  src="/lovable-uploads/be682824-4e6b-4af4-9c53-aa9a47040326.png" 
                  alt="LinkedIn" 
                  className="h-6 w-6 rounded"
                />
                <span className="text-sm">LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

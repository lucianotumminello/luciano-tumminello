
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, textKey }: { to: string; textKey: string }) => (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors",
        isActive(to)
          ? "text-primary font-semibold border-b-2 border-primary"
          : "text-muted-foreground hover:text-primary"
      )}
    >
      {t(textKey)}
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
          <NavLink to="/" textKey="nav.home" />
          <NavLink to="/about" textKey="nav.about" />
          <NavLink to="/career" textKey="nav.journey" />
          <NavLink to="/education" textKey="nav.education" />
          <NavLink to="/blog" textKey="nav.blog" />
          <NavLink to="/contact" textKey="nav.contact" />
        </nav>
        
        <div className="flex items-center">
          <LanguageSelector />
          
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
              {t("nav.home")}
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/about") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link 
              to="/career" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/career") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.journey")}
            </Link>
            <Link 
              to="/education" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/education") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.education")}
            </Link>
            <Link 
              to="/blog" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/blog") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.blog")}
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "px-3 py-2 text-sm",
                isActive("/contact") ? "font-semibold bg-gray-100 rounded-md" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
            
            <div className="px-3 py-2 flex items-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

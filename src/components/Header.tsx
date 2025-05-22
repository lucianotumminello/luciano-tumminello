import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import TranslatedText from "./TranslatedText";

const navItems = [
  { path: "/about", translationKey: "navbar.about" },
  { path: "/career", translationKey: "navbar.career" },
  { path: "/education", translationKey: "navbar.education" },
  { path: "/blog", translationKey: "navbar.blog" },
  { path: "/contact", translationKey: "navbar.contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">Luciano Tumminello</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                <TranslatedText textKey={item.translationKey} />
              </Link>
            ))}
            
            {/* Admin Link for authorized users */}
            <Link
              to="/admin"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary"
            >
              Admin
            </Link>
            
            <LanguageSelector />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <LanguageSelector />
            <button
              onClick={toggleMenu}
              className="ml-2 p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  <TranslatedText textKey={item.translationKey} />
                </Link>
              ))}
              
              {/* Admin Link for mobile */}
              <Link
                to="/admin"
                onClick={closeMenu}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary"
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

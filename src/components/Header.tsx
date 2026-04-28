import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const NAV_ITEMS = [
  { to: "/", textKey: "nav.home" },
  { to: "/about", textKey: "nav.about" },
  { to: "/experience", textKey: "nav.experience" },
  { to: "/services", textKey: "nav.services" },
  { to: "/selected-work", textKey: "nav.work" },
  { to: "/insights", textKey: "nav.insights" },
];

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    // treat /career as /experience and /blog as /insights for active state
    if (path === "/experience") return location.pathname === "/experience" || location.pathname === "/career" || location.pathname === "/education";
    if (path === "/insights") return location.pathname === "/insights" || location.pathname.startsWith("/blog");
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const ctaButton = (onClick?: () => void) => (
    <Button
      asChild
      size="sm"
      className="bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white font-semibold rounded-md px-4 shadow-sm"
      onClick={onClick}
    >
      <Link to="/contact">{t("nav.cta")}</Link>
    </Button>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 gap-2">
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <span className="text-lg md:text-xl font-bold tracking-tight">Luciano Tumminello</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "px-1 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                isActive(item.to)
                  ? "text-primary font-semibold border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {t(item.textKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />

          {/* Always-visible CTA */}
          <div className="hidden sm:block">{ctaButton()}</div>

          {/* CMS link kept (desktop only) */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs" asChild>
              <Link to="/admin">CMS</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-1 p-2"
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

      {/* Compact CTA row for very small screens where it doesn't fit beside the logo */}
      <div className="sm:hidden px-4 pb-3 flex justify-end">
        {ctaButton()}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-white border-b shadow-lg">
          <div className="flex flex-col space-y-1 p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3 py-2 text-sm rounded-md",
                  isActive(item.to) ? "font-semibold bg-gray-100" : "text-gray-700"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(item.textKey)}
              </Link>
            ))}

            <div className="pt-3">{ctaButton(() => setIsMobileMenuOpen(false))}</div>

            <div className="flex space-x-2 px-1 pt-3">
              <Button variant="outline" size="sm" className="text-xs flex-1" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/admin">CMS</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

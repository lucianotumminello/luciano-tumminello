import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, useEffect } from 'react';
import { trackPageView } from "./utils/analytics";
import CookieConsent from "./components/CookieConsent";
import { refreshBlogPosts, initializeBlogPosts } from "./utils/blog";

// Import the Index page eagerly since it's the landing page
import Index from "./pages/Index";

// Lazy load other pages
const About = lazy(() => import("./pages/About"));
const ProfessionalJourney = lazy(() => import("./pages/ProfessionalJourney"));
const Education = lazy(() => import("./pages/Education"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const BlogBuilder = lazy(() => import("./pages/BlogBuilder"));

// Create queryClient with better caching strategy
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (replaces cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

// Initialize blog posts on app load with force refresh
console.log("App.tsx: Initializing blog posts on app load with force refresh");
initializeBlogPosts()
  .then(() => refreshBlogPosts(true)) // Force refresh after initialization
  .catch(error => {
    console.error('Error initializing blog posts on app load:', error);
  });

// Analytics tracker component
const RouteChangeTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    trackPageView(path, title);
    
    // Always refresh blog posts when visiting the blog page to ensure latest content
    if (path === '/blog') {
      console.log('Blog page visited, force refreshing blog posts');
      refreshBlogPosts(true).catch(error => {
        console.error('Error refreshing blog posts on blog page visit:', error);
      });
    }
    
    // Redirect from homepage to blog only once to avoid infinite loops
    if (path === '/' && !window.location.search.includes('no-redirect')) {
      console.log('Homepage visited, redirecting to blog page with no-redirect flag');
      navigate('/blog?no-redirect=true');
    }
  }, [location, navigate]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteChangeTracker />
            <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/career" element={<ProfessionalJourney />} />
                <Route path="/education" element={<Education />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/blog-builder" element={<BlogBuilder />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieConsent />
          </BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

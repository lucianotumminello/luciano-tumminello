
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, useEffect, ErrorBoundary } from 'react';
import { trackPageView } from "./utils/analytics";
import CookieConsent from "./components/CookieConsent";
import { refreshBlogPosts } from "./utils/blog";

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
const SimpleCMS = lazy(() => import("./pages/SimpleCMS"));

// Create queryClient with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (replaces cacheTime)
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on certain errors to prevent infinite loops
        if (failureCount >= 3) return false;
        return true;
      },
    },
    mutations: {
      retry: false, // Don't retry mutations to prevent double operations
    },
  },
});

// Error boundary component
class AppErrorBoundary extends ErrorBoundary {
  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    console.error('App Error Boundary caught an error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App Error Boundary error details:', error, errorInfo);
  }

  render() {
    if ((this as any).state?.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Luciano Tumminello</h1>
            <p className="text-gray-600">Marketing & Operations Leader</p>
            <p className="mt-4">Please refresh the page to continue.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Analytics tracker component
const RouteChangeTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    try {
      const path = location.pathname + location.search;
      const title = document.title;
      trackPageView(path, title);
      
      // Refresh blog posts when visiting the blog page
      if (path === '/blog') {
        console.log('Blog page visited, refreshing blog posts');
        refreshBlogPosts().catch(error => {
          console.error('Error refreshing blog posts on blog page visit:', error);
        });
      }
    } catch (error) {
      console.error('Error in route tracking:', error);
    }
  }, [location]);
  
  return null;
};

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <HelmetProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <RouteChangeTracker />
              <Suspense fallback={
                <div className="flex h-screen w-full items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading...</p>
                  </div>
                </div>
              }>
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
                  <Route path="/admin" element={<SimpleCMS />} />
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
  </AppErrorBoundary>
);

export default App;

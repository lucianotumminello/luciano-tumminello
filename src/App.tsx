
import React, { Suspense, useEffect, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from 'react-helmet-async';
import { trackPageView } from "./utils/analytics";
import CookieConsent from "./components/CookieConsent";
import { refreshBlogPosts } from "./utils/blog";
import { initPerformanceOptimizations } from "./utils/performanceUtils";

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
const DecapAdmin = lazy(() => import("./pages/DecapAdmin"));

// Create the QueryClient instance outside of component render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (replaces cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

// Analytics tracker component
const RouteChangeTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
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
  }, [location]);
  
  return null;
};

// Initialize performance optimizations
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initPerformanceOptimizations();
  });
}

// App content component with proper structure
const AppContent = () => {
  return (
    <div className="app-wrapper">
      <RouteChangeTracker />
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
        <TooltipProvider>
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
            <Route path="/admin" element={<Navigate to="/admin/" replace />} />
            <Route path="/admin/*" element={<DecapAdmin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </Suspense>
      {/* Place toasts outside the Suspense boundary */}
      <Toaster />
      <Sonner />
    </div>
  );
};

// Main App component with correctly nested providers
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

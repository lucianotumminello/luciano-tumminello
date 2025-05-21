
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";

const DecapAdmin = () => {
  useEffect(() => {
    // Check if Netlify Identity is available
    if (window.netlifyIdentity) {
      // Init Netlify Identity
      window.netlifyIdentity.init();
      
      // Add login handler
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
    
    // Small delay to ensure identity widget loads
    const timer = setTimeout(() => {
      window.location.href = '/admin/';
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Helmet>
        <title>Content Manager | Luciano Tumminello</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Helmet>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Content Manager...</h1>
        <p className="text-gray-600">If you are not redirected automatically, please click <a href="/admin/" className="text-primary hover:underline">here</a>.</p>
        <div className="mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
      
      {/* Add toasters outside of Suspense boundary */}
      <Toaster />
      <Sonner />
    </div>
  );
};

export default DecapAdmin;

// Add type definition for the netlify identity
declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

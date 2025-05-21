
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const DecapAdmin = () => {
  useEffect(() => {
    // Check if Netlify Identity is available
    if (window.netlifyIdentity) {
      // Init Netlify Identity
      window.netlifyIdentity.init({
        locale: 'en' // default language
      });

      // Let user know when identity widget is ready
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          // If no user, show the login modal
          setTimeout(() => {
            window.netlifyIdentity.open('login');
            toast.info('Please log in to access the content manager');
          }, 300);
        } else {
          // If user is already logged in, redirect to admin
          document.location.href = "/admin/";
        }
      });
      
      // Add login handler
      window.netlifyIdentity.on("login", () => {
        // Redirect to admin page after login
        toast.success('Login successful! Redirecting...');
        setTimeout(() => {
          document.location.href = "/admin/";
        }, 1000);
      });

      // Add logout handler
      window.netlifyIdentity.on("logout", () => {
        toast.info('Logged out successfully');
        document.location.href = "/";
      });
    } else {
      toast.error('Netlify Identity widget not loaded. Please refresh the page.');
    }
    
    return () => {
      // Clean up event listeners when component unmounts
      if (window.netlifyIdentity) {
        window.netlifyIdentity.off('init');
        window.netlifyIdentity.off('login');
        window.netlifyIdentity.off('logout');
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Helmet>
        <title>Content Manager | Luciano Tumminello</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Helmet>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Content Manager</h1>
        <p className="text-gray-600 mb-4">Please authenticate to access the admin panel.</p>
        <button 
          onClick={() => window.netlifyIdentity?.open('login')}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors"
        >
          Open Login
        </button>
        <div className="mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
      
      {/* Add toasters outside of Suspense boundary */}
      <Toaster />
      <SonnerToaster />
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

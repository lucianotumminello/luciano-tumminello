
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const DecapAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      // Add a small delay to ensure all scripts have time to load
      const redirectTimer = setTimeout(() => {
        // Ensure we're using the correct path with trailing slash
        window.location.href = '/admin/';
      }, 500);
      
      return () => clearTimeout(redirectTimer);
    } catch (err) {
      console.error('Error redirecting to CMS:', err);
      setError('Failed to redirect to CMS. Please try again or contact support.');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>CMS Admin - Luciano Tumminello</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          {error ? (
            <div className="text-red-500">
              <p className="text-lg font-medium mb-2">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg font-medium">Redirecting to CMS...</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DecapAdmin;

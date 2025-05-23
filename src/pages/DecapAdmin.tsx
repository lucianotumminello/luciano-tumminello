
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const DecapAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      // Direct redirection approach
      const handleRedirect = () => {
        // Force a full page load to the admin path with cache-busting parameter
        window.location.href = `/admin/index.html?t=${Date.now()}`;
      };
      
      // Start redirection after a short delay
      const redirectTimer = setTimeout(() => {
        console.log('Redirecting to CMS admin...');
        handleRedirect();
      }, 500);
      
      return () => clearTimeout(redirectTimer);
    } catch (err) {
      console.error('Error redirecting to CMS:', err);
      setError('Failed to redirect to CMS. Please try again or contact support.');
      toast.error('CMS redirect failed. Please try again.');
    }
  }, [redirectAttempts, navigate]);

  const retryRedirect = () => {
    setError(null);
    setRedirectAttempts(prev => prev + 1);
  };

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
                onClick={retryRedirect}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Try Again
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 ml-2"
              >
                Return to Site
              </button>
            </div>
          ) : (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg font-medium">Redirecting to CMS...</p>
              <p className="text-sm text-gray-500 mt-2">If you are not redirected within a few seconds, 
                <button 
                  onClick={retryRedirect}
                  className="text-primary hover:underline ml-1"
                >
                  click here
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DecapAdmin;

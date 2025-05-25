
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const DecapAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      console.log('DecapAdmin: Starting clean redirect to CMS');
      
      // Clear any problematic cache
      if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
          cacheNames.forEach(function(cacheName) {
            caches.delete(cacheName);
          });
        });
      }
      
      // Direct navigation to clean admin implementation
      const timer = setTimeout(() => {
        console.log('DecapAdmin: Redirecting to admin page');
        window.location.href = `/admin/index.html?source=react&t=${Date.now()}`;
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (err: any) {
      console.error('DecapAdmin: Error during redirect:', err);
      setError('Failed to access CMS. Please try again.');
    }
  }, []);

  const retryAccess = () => {
    setError(null);
    toast('Retrying CMS access...', { duration: 2000 });
    window.location.href = `/admin/index.html?retry=true&t=${Date.now()}`;
  };
  
  const directAccess = () => {
    window.location.href = `/admin/index.html?direct=true&t=${Date.now()}`;
  };

  return (
    <>
      <Helmet>
        <title>CMS Admin - Luciano Tumminello</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center p-6 max-w-md">
          {error ? (
            <div className="text-red-500">
              <p className="text-lg font-medium mb-4">{error}</p>
              <div className="flex flex-col gap-3 justify-center">
                <Button onClick={retryAccess} className="w-full">
                  Try Again
                </Button>
                <Button onClick={directAccess} variant="outline" className="w-full">
                  Direct Access
                </Button>
                <Button onClick={() => navigate('/')} variant="secondary" className="w-full">
                  Return to Site
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <div>
                <p className="text-xl font-medium">Redirecting to CMS...</p>
                <p className="text-sm text-gray-500 mt-4">
                  If you are not redirected within a few seconds, 
                  <button 
                    onClick={retryAccess}
                    className="text-primary hover:underline font-medium ml-1"
                  >
                    click here
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DecapAdmin;

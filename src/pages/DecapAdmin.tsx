
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DecapAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      console.log('Starting CMS redirect process, attempt:', redirectAttempts + 1);
      
      // Direct navigation to admin page
      const redirectToCMS = () => {
        console.log('Executing CMS redirect at:', new Date().toISOString());
        
        // Try direct navigation to admin folder
        window.location.href = `/admin/index.html?t=${Date.now()}`;
      };
      
      // Start redirect after a short delay to allow console logs to be visible
      const redirectTimer = setTimeout(() => {
        redirectToCMS();
      }, 800);
      
      return () => clearTimeout(redirectTimer);
    } catch (err) {
      console.error('Error during CMS redirection:', err);
      setError('Failed to redirect to CMS. Please try again or contact support.');
      toast.error('CMS redirect failed. Please try again.');
    }
  }, [redirectAttempts]);

  const retryRedirect = () => {
    console.log('Retrying CMS redirect...');
    setError(null);
    setRedirectAttempts(prev => prev + 1);
    toast('Retrying CMS redirect...', { duration: 3000 });
  };
  
  const openTroubleshootingDialog = () => {
    setShowTroubleshooting(true);
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
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={retryRedirect}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={openTroubleshootingDialog}
                  variant="outline"
                >
                  Troubleshooting
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  variant="secondary"
                >
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
                    onClick={retryRedirect}
                    className="text-primary hover:underline font-medium ml-1"
                  >
                    click here
                  </button>
                </p>
                <div className="mt-8 text-left">
                  <button
                    onClick={openTroubleshootingDialog}
                    className="text-gray-500 text-sm underline hover:text-gray-700"
                  >
                    Having trouble? View troubleshooting tips
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={showTroubleshooting} onOpenChange={setShowTroubleshooting}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>CMS Troubleshooting</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4 text-left">
              <p>If you're having trouble accessing the CMS, try these steps:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Make sure you have a stable internet connection</li>
                <li>Try accessing the CMS directly by going to <code>/admin/index.html</code></li>
                <li>Clear your browser cache and cookies</li>
                <li>Try using a different browser</li>
                <li>Check if your browser is blocking any scripts or cookies</li>
                <li>Ensure that the Git Gateway is properly configured if you're using Netlify</li>
              </ol>
              <div className="pt-4">
                <Button
                  onClick={() => {
                    window.location.href = '/admin/index.html?t=' + Date.now();
                  }}
                  className="mr-2"
                >
                  Direct Access to CMS
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTroubleshooting(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DecapAdmin;

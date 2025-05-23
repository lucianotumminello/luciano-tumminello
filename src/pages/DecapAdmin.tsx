
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

const DecapAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const addDebugLog = (message: string) => {
    console.log(`[CMS Debug]: ${message}`);
    setDebugLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
  
  useEffect(() => {
    try {
      addDebugLog(`Starting CMS redirect process, attempt: ${redirectAttempts + 1}`);
      setLoading(true);
      
      // Check if Netlify Identity script is loaded
      const checkIdentityLoaded = () => {
        if (window.netlifyIdentity) {
          addDebugLog('Netlify Identity found in window object');
          return true;
        }
        return false;
      };
      
      // Load Netlify Identity if not already loaded
      const loadNetlifyIdentity = () => {
        addDebugLog('Loading Netlify Identity script');
        const script = document.createElement('script');
        script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
        script.async = true;
        script.onload = () => {
          addDebugLog('Netlify Identity script loaded successfully');
          proceedToCMS();
        };
        script.onerror = () => {
          addDebugLog('Failed to load Netlify Identity script');
          setError('Failed to load authentication. Please check your internet connection.');
          setLoading(false);
        };
        document.head.appendChild(script);
      };

      // Clear cache to avoid stale resources
      const clearCache = () => {
        addDebugLog('Clearing cache for CMS resources');
        
        // Clear service workers
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
              registration.unregister();
              addDebugLog('Unregistered service worker');
            }
          });
        }
        
        // Clear cache storage
        if ('caches' in window) {
          caches.keys().then(function(cacheNames) {
            cacheNames.forEach(function(cacheName) {
              caches.delete(cacheName);
              addDebugLog(`Cleared cache: ${cacheName}`);
            });
          });
        }
      };

      // Direct navigation to admin page
      const proceedToCMS = () => {
        addDebugLog('Proceeding to CMS');
        
        // Clear cache before navigation
        clearCache();
        
        const directNavigation = () => {
          addDebugLog(`Navigating directly to admin at: ${new Date().toISOString()}`);
          // Force bypass cache with timestamp
          const adminUrl = `/admin/index.html?t=${Date.now()}&source=react-app`;
          // Use standard navigation rather than React router
          window.location.href = adminUrl;
        };
        
        // Check if admin page is accessible
        fetch(`/admin/index.html?check=${Date.now()}`)
          .then(response => {
            if (response.ok) {
              addDebugLog('Admin page accessible, proceeding with direct navigation');
              directNavigation();
            } else {
              throw new Error(`Failed to access admin page: ${response.status}`);
            }
          })
          .catch(err => {
            addDebugLog(`Error checking admin page: ${err.message}`);
            setError(`Failed to access CMS. Error: ${err.message}`);
            setLoading(false);
          });
      };
      
      // Initialize the process
      const initProcess = () => {
        if (checkIdentityLoaded()) {
          proceedToCMS();
        } else {
          loadNetlifyIdentity();
        }
      };
      
      // Start the process after a short delay
      const timer = setTimeout(() => {
        initProcess();
      }, 500);
      
      return () => clearTimeout(timer);
    } catch (err: any) {
      addDebugLog(`Critical error: ${err?.message || 'Unknown error'}`);
      setError('An unexpected error occurred. Please try again or contact support.');
      setLoading(false);
    }
  }, [redirectAttempts]);

  const retryRedirect = () => {
    addDebugLog('Manually retrying CMS redirect...');
    setError(null);
    setRedirectAttempts(prev => prev + 1);
    toast('Retrying CMS redirect...', { duration: 3000 });
  };
  
  const openTroubleshooting = () => {
    setShowTroubleshooting(true);
  };
  
  const directAccess = () => {
    addDebugLog('Attempting direct access to /admin/index.html');
    // Force cache bust with timestamp
    window.location.href = `/admin/index.html?direct=true&nocache=${Date.now()}`;
  };

  const alternativeAccess = () => {
    addDebugLog('Attempting alternative access to admin/');
    window.location.href = `/admin/?alternative=true&nocache=${Date.now()}`;
  };
  
  const forceCDNAccess = () => {
    addDebugLog('Attempting to load CMS directly from CDN');
    const url = 'https://unpkg.com/decap-cms@^3.0.0/dist/index.html';
    window.open(url, '_blank');
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
                  onClick={directAccess}
                  variant="outline"
                >
                  Direct Access
                </Button>
                <Button 
                  onClick={openTroubleshooting}
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
              <div className="mt-4">
                <Button
                  onClick={() => setShowDebugInfo(!showDebugInfo)}
                  variant="ghost"
                  size="sm"
                >
                  {showDebugInfo ? 'Hide' : 'Show'} Debug Info
                </Button>
                {showDebugInfo && (
                  <div className="mt-2 p-3 bg-slate-50 text-left rounded text-xs overflow-auto max-h-64">
                    {debugLogs.map((log, i) => (
                      <div key={i} className="mb-1">{log}</div>
                    ))}
                  </div>
                )}
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
                    onClick={openTroubleshooting}
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
                <li>Clear your browser cache and cookies</li>
                <li>Try using a different browser</li>
                <li>Check if your browser is blocking any scripts or cookies</li>
                <li>Try the direct access and alternative access options below</li>
                <li>Ensure that the Git Gateway is properly configured if you're using Netlify</li>
                <li>If none of these work, try accessing the CMS directly from the CDN</li>
              </ol>
              <div className="pt-4 flex flex-wrap gap-2">
                <Button
                  onClick={directAccess}
                >
                  Direct Access
                </Button>
                <Button
                  onClick={alternativeAccess}
                  variant="outline"
                >
                  Alternative Access
                </Button>
                <Button
                  onClick={forceCDNAccess}
                  variant="outline"
                >
                  Load From CDN
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="secondary"
                >
                  Return to Site
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
      
      {/* Debug Sheet */}
      <Sheet open={showDebugInfo && loading} onOpenChange={() => loading && setShowDebugInfo(false)}>
        <SheetContent side="bottom" className="h-1/3">
          <SheetHeader>
            <SheetTitle>CMS Debug Information</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            <div className="text-xs font-mono overflow-auto max-h-full">
              {debugLogs.map((log, i) => (
                <div key={i} className="py-1 border-b border-slate-100">{log}</div>
              ))}
              {loading && <div className="py-1 animate-pulse">Processing...</div>}
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DecapAdmin;

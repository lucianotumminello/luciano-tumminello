
import React, { useEffect, useState } from 'react';
import { initIdentityWidget } from '../utils/decapCmsIntegration';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const DecapAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to initialize the Identity widget for auth with error handling
    try {
      initIdentityWidget();
      setLoading(false);
    } catch (err) {
      console.error('Failed to initialize Netlify Identity widget:', err);
      setError('Failed to load authentication system. Please try again later.');
      setLoading(false);
    }
  }, []);

  const handleOpenLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open();
    } else {
      setError('Authentication system not available. Please refresh the page and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Content Manager</h1>
        
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please sign in to access the content management system.
          </AlertDescription>
        </Alert>
        
        <p className="mb-6">
          This is where you can manage your blog content. After logging in, you'll be redirected to the Decap CMS dashboard.
        </p>
        
        <div className="flex justify-center">
          <Button
            onClick={handleOpenLogin}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
        </div>

        {/* Error Dialog */}
        <Dialog open={!!error} onOpenChange={() => setError(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Authentication Error</DialogTitle>
              <DialogDescription>
                {error}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={() => setError(null)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DecapAdmin;

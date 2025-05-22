
import React, { useEffect } from 'react';
import { initIdentityWidget } from '../utils/decapCmsIntegration';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DecapAdmin = () => {
  useEffect(() => {
    // Initialize the Identity widget for auth
    initIdentityWidget();
  }, []);

  const handleOpenLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open();
    } else {
      console.error('Netlify Identity widget not loaded');
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
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DecapAdmin;

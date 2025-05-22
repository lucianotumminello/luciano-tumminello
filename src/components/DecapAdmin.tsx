
import React, { useEffect } from 'react';
import { initIdentityWidget } from '../utils/decapCmsIntegration';

const DecapAdmin = () => {
  useEffect(() => {
    // Initialize the Identity widget for auth
    initIdentityWidget();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Content Manager</h1>
        <p className="mb-4">
          This is where you can manage your blog content. Please sign in to continue.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (window.netlifyIdentity) {
                window.netlifyIdentity.open();
              } else {
                alert('Netlify Identity widget not loaded');
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecapAdmin;

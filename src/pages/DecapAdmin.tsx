
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const DecapAdmin = () => {
  useEffect(() => {
    // Redirect to the admin page
    window.location.href = '/admin/';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Helmet>
        <title>Content Manager | Luciano Tumminello</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Content Manager...</h1>
        <p className="text-gray-600">If you are not redirected automatically, please click <a href="/admin/" className="text-primary hover:underline">here</a>.</p>
        <div className="mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default DecapAdmin;

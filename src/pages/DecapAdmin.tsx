
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const DecapAdmin = () => {
  useEffect(() => {
    // Simple redirect to the admin page
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <>
      <Helmet>
        <title>CMS Admin - Luciano Tumminello</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl">Redirecting to CMS...</p>
        </div>
      </div>
    </>
  );
};

export default DecapAdmin;

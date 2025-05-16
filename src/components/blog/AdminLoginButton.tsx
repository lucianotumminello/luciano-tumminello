
import React from "react";
import { Link } from "react-router-dom";

const AdminLoginButton: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl flex justify-end mb-8">
      <Link 
        to="/blog-builder"
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        LOGIN
      </Link>
    </div>
  );
};

export default AdminLoginButton;

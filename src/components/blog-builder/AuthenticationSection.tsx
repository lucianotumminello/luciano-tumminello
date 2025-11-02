
import React from "react";
import { AuthForm } from "@/components/blog-builder/AuthForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AuthenticationSectionProps {
  onAuthSuccess: () => void;
}

export const AuthenticationSection = ({
  onAuthSuccess
}: AuthenticationSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <AuthForm 
          onAuthSuccess={onAuthSuccess}
        />
      </main>
      <Footer />
    </div>
  );
};


import React from "react";
import { AuthForm } from "@/components/blog-builder/AuthForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AuthenticationSectionProps {
  onAuthSuccess: () => void;
  savedPassword: string | null;
  rememberPassword: boolean;
  onRememberPasswordChange: (checked: boolean) => void;
}

export const AuthenticationSection = ({
  onAuthSuccess,
  savedPassword,
  rememberPassword,
  onRememberPasswordChange
}: AuthenticationSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <AuthForm 
          onAuthSuccess={onAuthSuccess}
          savedPassword={savedPassword}
          rememberPassword={rememberPassword}
          onRememberPasswordChange={onRememberPasswordChange}
        />
      </main>
      <Footer />
    </div>
  );
};

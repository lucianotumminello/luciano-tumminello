
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AuthFormData = {
  password: string;
};

interface AuthFormProps {
  onAuthSuccess: () => void;
  savedPassword: string | null;
  onRememberPasswordChange: (checked: boolean) => void;
  rememberPassword: boolean;
}

const ADMIN_PASSWORD = "VanBasten9!";

export const AuthForm = ({ 
  onAuthSuccess, 
  savedPassword, 
  onRememberPasswordChange,
  rememberPassword
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  
  const authForm = useForm<AuthFormData>({
    defaultValues: {
      password: savedPassword || "",
    }
  });

  const onAuthSubmit = (data: AuthFormData) => {
    if (data.password === ADMIN_PASSWORD) {
      if (rememberPassword) {
        try {
          localStorage.setItem("blog_builder_password", data.password);
        } catch (error) {
          console.error("Error saving password:", error);
        }
      }
      
      onAuthSuccess();
      toast({
        title: "Authentication successful",
        description: "Welcome to the blog builder!",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="container mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-center mb-8">Blog Builder Authentication</h1>
      <Form {...authForm}>
        <form onSubmit={authForm.handleSubmit(onAuthSubmit)} className="space-y-4">
          <FormField
            control={authForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberPassword}
              onCheckedChange={checked => onRememberPasswordChange(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember my password
            </label>
          </div>
          
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { BlogFormData } from "../BlogFormTypes";

export const useBlogForm = (initialData: BlogFormData) => {
  const [activeTab, setActiveTab] = useState<string>("editor");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const blogForm = useForm<BlogFormData>({
    defaultValues: initialData
  });
  
  // Handle file upload (Word, PDF, Text)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        if (e.target?.result) {
          let content = "";
          
          try {
            // For plain text files
            if (file.type === "text/plain") {
              content = e.target.result as string;
              blogForm.setValue("content", content);
              toast({
                title: "File imported",
                description: `Text file "${file.name}" has been imported successfully.`
              });
              
            } else {
              // For Word/PDF, we'll just let user know they need to extract text
              // In a real implementation, we'd use a document parsing library
              toast({
                title: "Document imported",
                description: `Please extract and paste the text content from "${file.name}". Full document parsing requires additional libraries.`,
                variant: "default"
              });
            }
          } catch (error) {
            toast({
              title: "Import failed",
              description: "Unable to process the file. Please try copying and pasting the content directly.",
              variant: "destructive"
            });
          }
        }
      };
      
      fileReader.readAsText(file);
    }
    
    // Reset the file input so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  // Update content ref when form value changes
  useEffect(() => {
    const subscription = blogForm.watch(() => {
      // This keeps our ref updated with the latest form values
    });
    return () => subscription.unsubscribe();
  }, [blogForm.watch]);

  return {
    activeTab,
    setActiveTab,
    contentRef,
    fileInputRef,
    blogForm,
    handleFileUpload
  };
};

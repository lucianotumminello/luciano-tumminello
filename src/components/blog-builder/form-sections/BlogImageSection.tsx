
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { BlogFormData } from "../BlogFormTypes";

interface BlogImageSectionProps {
  blogForm: UseFormReturn<BlogFormData>;
  desktopImageRef: React.RefObject<HTMLInputElement>;
  mobileImageRef: React.RefObject<HTMLInputElement>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, setImageFile: React.Dispatch<React.SetStateAction<File | null>>) => void;
  desktopImageFile: File | null;
  mobileImageFile: File | null;
  setDesktopImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setMobileImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const BlogImageSection = ({
  blogForm,
  desktopImageRef,
  mobileImageRef,
  onImageUpload,
  desktopImageFile,
  mobileImageFile,
  setDesktopImageFile,
  setMobileImageFile
}: BlogImageSectionProps) => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="desktopImage">Desktop Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="desktopImage"
                type="file"
                accept="image/*"
                ref={desktopImageRef}
                onChange={(e) => onImageUpload(e, setDesktopImageFile)}
                className="flex-1"
              />
              {desktopImageFile && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => {
                    setDesktopImageFile(null);
                    if (desktopImageRef.current) desktopImageRef.current.value = "";
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
            {desktopImageFile && (
              <div className="w-full h-40 relative rounded-md overflow-hidden">
                <img
                  src={URL.createObjectURL(desktopImageFile)}
                  alt="Desktop preview"
                  className="h-full object-contain"
                />
              </div>
            )}
            <FormField
              control={blogForm.control}
              name="desktopImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Or enter desktop image URL directly</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!!desktopImageFile} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="mobileImage">Mobile Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="mobileImage"
                type="file"
                accept="image/*"
                ref={mobileImageRef}
                onChange={(e) => onImageUpload(e, setMobileImageFile)}
                className="flex-1"
              />
              {mobileImageFile && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => {
                    setMobileImageFile(null);
                    if (mobileImageRef.current) mobileImageRef.current.value = "";
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
            {mobileImageFile && (
              <div className="w-full h-40 relative rounded-md overflow-hidden">
                <img
                  src={URL.createObjectURL(mobileImageFile)}
                  alt="Mobile preview"
                  className="h-full object-contain"
                />
              </div>
            )}
            <FormField
              control={blogForm.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Or enter mobile image URL directly</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!!mobileImageFile} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

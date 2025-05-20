
import { UseFormReturn } from "react-hook-form";

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string;
  desktopImageUrl: string;
  imageUrl: string;
  permanentSlug?: string;
}

export interface BlogFormProps {
  initialData: BlogFormData;
  isPublishing: boolean;
  isUpdateMode: boolean;
  onSubmit: (data: BlogFormData) => void;
  onApplyLayout: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, setImageFile: React.Dispatch<React.SetStateAction<File | null>>) => void;
  desktopImageFile: File | null;
  mobileImageFile: File | null;
  setDesktopImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setMobileImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  onDuplicate?: () => void;
  onMakePermanent?: () => void;
}

export interface BlogFormSectionProps {
  blogForm: UseFormReturn<BlogFormData>;
}


import { cn } from "@/lib/utils";

const ProfileImage = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-xl">
            <img 
              src="/lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png" 
              alt="Luciano Tumminello Portrait" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileImage;

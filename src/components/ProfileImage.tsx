
import { cn } from "@/lib/utils";

// Responsive and lazy-loading for SEO and performance
const ProfileImage = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="w-full">
          <div className="relative w-full overflow-hidden rounded-lg shadow-xl ring-2 ring-primary/20">
            <img 
              src="/lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png" 
              alt="Luciano Tumminello Portrait" 
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 100vw, 60vw"
              srcSet="
                /lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png 970w,
                /lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png 672w,
                /lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png 500w
              "
              style={{ background: "linear-gradient(135deg, #F2FCE2 5%, #E5DEFF 100%)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileImage;


import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "./TranslatedText";

const ProfileImage = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Column */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png" 
                alt="Luciano Tumminello Portrait" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* About Me Column */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              <TranslatedText textKey="about.me.title" />
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                <TranslatedText textKey="about.me.para1" />
              </p>
              <p>
                <TranslatedText textKey="about.me.para2" />
              </p>
              <p>
                <TranslatedText textKey="about.me.para3" />
              </p>
              <p>
                <TranslatedText textKey="about.me.para4" />
              </p>
              <p>
                <TranslatedText textKey="about.me.para5" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileImage;


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, GraduationCap, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const navigateToCareer = () => {
    navigate('/career');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            <TranslatedText textKey="about.title" />
          </h1>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <img 
                src="/lovable-uploads/fac95ca8-e4dc-4409-ac6b-37cecd18116f.png" 
                alt="Luciano Tumminello" 
                className="rounded-lg shadow-md w-full aspect-square object-cover"
              />
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">
                    {language === "it" ? "Direttore Operativo, Spartan Health" : "Chief Operating Officer, Spartan Health"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">Bangkok, Thailand</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">
                    <TranslatedText textKey="about.education" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">
                    <TranslatedText textKey="about.experience" />
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={navigateToCareer}
                  className="w-full"
                >
                  <TranslatedText textKey="about.viewResume" />
                </Button>
              </div>
              
              <div className="mt-6 space-y-6">
                <img 
                  src="/lovable-uploads/212b1e06-7d89-4391-a1db-16ed8c2249f1.png" 
                  alt="Luciano Tumminello Office" 
                  className="rounded-lg shadow-md w-full object-cover"
                />
                
                <img 
                  src="/lovable-uploads/c55bb2b1-05a5-45ac-bbbf-cc6b91fb736a.png" 
                  alt="Luciano Tumminello Outdoors" 
                  className="rounded-lg shadow-md w-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <p className="text-gray-700 leading-relaxed text-justify">
                <TranslatedText textKey="about.me.para1" />
              </p>
              
              <p className="text-gray-700 leading-relaxed text-justify">
                <TranslatedText textKey="about.me.para2" />
              </p>
              
              <p className="text-gray-700 leading-relaxed text-justify">
                <TranslatedText textKey="about.me.para3" />
              </p>
              
              <p className="text-gray-700 leading-relaxed text-justify">
                <TranslatedText textKey="about.me.para4" />
              </p>
              
              <p className="text-gray-700 leading-relaxed text-justify">
                <TranslatedText textKey="about.me.para5" />
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

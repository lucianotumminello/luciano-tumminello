
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, GraduationCap, Globe, Award, LineChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const journeyRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const scrollToJourney = () => {
    journeyRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                    <TranslatedText textKey="about.role" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">
                    <TranslatedText textKey="about.location" />
                  </span>
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
                  onClick={scrollToJourney}
                  className="w-full"
                >
                  <TranslatedText textKey="about.viewResume" />
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                <TranslatedText textKey="about.story" />
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <TranslatedText textKey="about.academic" />
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <TranslatedText textKey="about.asia" />
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <TranslatedText textKey="about.today" />
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <TranslatedText textKey="about.personal" />
              </p>
            </div>
          </div>
          
          <div className="space-y-12">
            <section ref={journeyRef}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
                <LineChart className="mr-2 h-6 w-6 text-primary" />
                <TranslatedText textKey="about.journey" />
              </h2>
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Chief Operating Officer at Spartan Health</h3>
                  <p className="text-gray-600">
                    <TranslatedText textKey="job.spartan" />
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Marketing Director at Slow</h3>
                  <p className="text-gray-600">
                    <TranslatedText textKey="job.slow" />
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Co-Founder of 444 Media, Inc.</h3>
                  <p className="text-gray-600">
                    <TranslatedText textKey="job.444" />
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Regional Digital Marketing Consultant at Greenpeace Southeast Asia</h3>
                  <p className="text-gray-600">
                    <TranslatedText textKey="job.greenpeace" />
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Cluster Director of Marketing at Accor</h3>
                  <p className="text-gray-600">
                    <TranslatedText textKey="job.accor" />
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Leadership Roles at Lion & Lion and Y-Digital Asia</h3>
                  <p className="text-gray-600">
                    <TranslatedText textKey="job.lion" />
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Programmatic Advertising at Cadreon (IPG Mediabrands)</h3>
                  <p className="text-gray-600">
                    <TranslatedText textKey="job.cadreon" />
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">SEM Specialist at Sensis</h3>
                  <p className="text-gray-600">
                    <TranslatedText textKey="job.sensis" />
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
                <Award className="mr-2 h-6 w-6 text-primary" />
                <TranslatedText textKey="about.competencies" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">
                    <TranslatedText textKey="skills.strategy" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    <TranslatedText textKey="skills.strategy.desc" />
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">
                    <TranslatedText textKey="skills.marketing" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    <TranslatedText textKey="skills.marketing.desc" />
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">
                    <TranslatedText textKey="skills.operations" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    <TranslatedText textKey="skills.operations.desc" />
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">
                    <TranslatedText textKey="skills.business" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    <TranslatedText textKey="skills.business.desc" />
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">
                    <TranslatedText textKey="skills.digital" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    <TranslatedText textKey="skills.digital.desc" />
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">
                    <TranslatedText textKey="skills.data" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    <TranslatedText textKey="skills.data.desc" />
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">
                    <TranslatedText textKey="skills.sustainability" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    <TranslatedText textKey="skills.sustainability.desc" />
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">
                    <TranslatedText textKey="skills.cultural" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    <TranslatedText textKey="skills.cultural.desc" />
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

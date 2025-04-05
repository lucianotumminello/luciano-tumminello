
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LineChart } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";
import SkillsSection from "@/components/SkillsSection";

const ProfessionalJourney = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            <TranslatedText textKey="journey.title" />
          </h1>
          
          <section id="career-journey">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
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
          
          <div className="mt-16">
            <SkillsSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalJourney;


import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "@/components/TranslatedText";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Education = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            <TranslatedText textKey="education.title" />
          </h1>
          
          <div className="space-y-8">
            {/* University Education */}
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <h2 className="text-2xl font-semibold mb-4">
                <TranslatedText textKey="education.university.title" />
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-primary">
                    <TranslatedText textKey="education.masters.title" />
                  </h3>
                  <p className="text-gray-500 mb-2">
                    <TranslatedText textKey="education.masters.institution" />
                  </p>
                  <p className="text-gray-500 mb-3">
                    <TranslatedText textKey="education.masters.period" />
                  </p>
                  <p><TranslatedText textKey="education.masters.description" /></p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-primary">
                    <TranslatedText textKey="education.bachelors.title" />
                  </h3>
                  <p className="text-gray-500 mb-2">
                    <TranslatedText textKey="education.bachelors.institution" />
                  </p>
                  <p className="text-gray-500 mb-3">
                    <TranslatedText textKey="education.bachelors.period" />
                  </p>
                  <p><TranslatedText textKey="education.bachelors.description" /></p>
                </div>
              </div>
            </div>
            
            {/* Professional Development */}
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <h2 className="text-2xl font-semibold mb-4">
                <TranslatedText textKey="education.professional.title" />
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-primary">
                    <TranslatedText textKey="education.certification1.title" />
                  </h3>
                  <p className="text-gray-500 mb-2">
                    <TranslatedText textKey="education.certification1.institution" />
                  </p>
                  <p className="text-gray-500 mb-3">
                    <TranslatedText textKey="education.certification1.year" />
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-primary">
                    <TranslatedText textKey="education.certification2.title" />
                  </h3>
                  <p className="text-gray-500 mb-2">
                    <TranslatedText textKey="education.certification2.institution" />
                  </p>
                  <p className="text-gray-500 mb-3">
                    <TranslatedText textKey="education.certification2.year" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Education;

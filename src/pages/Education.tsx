
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "@/components/TranslatedText";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import UniversityEducation from "@/components/education/UniversityEducation";
import ProfessionalCertifications from "@/components/education/ProfessionalCertifications";
import MobileCollapsibleSection from "@/components/MobileCollapsibleSection";

const Education = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            <TranslatedText textKey="education.title" />
          </h1>
          <div className="space-y-12">
            {isMobile ? (
              <>
                <MobileCollapsibleSection title={<TranslatedText textKey="education.university.title" />}>
                  <UniversityEducation />
                </MobileCollapsibleSection>
                <MobileCollapsibleSection title={<TranslatedText textKey="education.certifications.title" />}>
                  <ProfessionalCertifications />
                </MobileCollapsibleSection>
              </>
            ) : (
              <>
                <UniversityEducation />
                <ProfessionalCertifications />
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Education;

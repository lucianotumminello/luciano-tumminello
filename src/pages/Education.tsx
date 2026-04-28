
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "@/components/TranslatedText";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useIsMobile } from "@/hooks/use-mobile";
import UniversityEducation from "@/components/education/UniversityEducation";
import ProfessionalCertifications from "@/components/education/ProfessionalCertifications";
import MobileCollapsibleSection from "@/components/MobileCollapsibleSection";

const Education = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const isItalian = language === "it";
  const seoTitle = isItalian
    ? "Formazione e Certificazioni | Luciano Tumminello"
    : "Education & Certifications | Luciano Tumminello";
  const seoDescription = isItalian
    ? "Percorso accademico di Luciano Tumminello, inclusi HEC Paris e certificazioni professionali in marketing digitale, leadership e operazioni."
    : "Luciano Tumminello's academic background including HEC Paris and professional certifications in digital marketing, leadership, and operations.";

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title={seoTitle} description={seoDescription} path="/education" />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            <TranslatedText textKey="education.title" />
          </h1>
          <div className="space-y-12">
            {isMobile ? (
              <>
                <UniversityEducation />
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

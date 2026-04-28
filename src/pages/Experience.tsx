import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { LineChart, GraduationCap } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";
import CoreCompetencies from "@/components/CoreCompetencies";
import CareerTimeline from "@/components/career/CareerTimeline";
import UniversityEducation from "@/components/education/UniversityEducation";
import ProfessionalCertifications from "@/components/education/ProfessionalCertifications";
import MobileCollapsibleSection from "@/components/MobileCollapsibleSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const jobs = [
  { title: "Chief Operating Officer at Spartan Health", descKey: "job.spartan" },
  { title: "Marketing Director at Slow", descKey: "job.slow" },
  { title: "Co-Founder & Managing Director of 444 Media, Inc.", descKey: "job.444" },
  { title: "Regional Digital Marketing Consultant at Greenpeace Southeast Asia", descKey: "job.greenpeace" },
  { title: "Cluster Director of Marketing at Accor", descKey: "job.accor" },
  { title: "Head of Client Services at Y-Digital", descKey: ["job.ydigital.retention", "job.ydigital.relationships"] },
  { title: "Planning Director at Lion & Lion", descKey: ["job.lion.strategies", "job.lion.campaigns", "job.lion.analytics"] },
  { title: "Account Manager at DWA", descKey: ["job.dwa.strategies", "job.dwa.relationships", "job.dwa.liaison", "job.dwa.vendors", "job.dwa.project"] },
  { title: "Business Development Manager (ASEAN) at Cadreon (IPG Mediabrands)", descKey: "job.cadreon" },
  { title: "SEM Specialist at Sensis", descKey: "job.sensis" },
];

const Experience = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const isItalian = language === "it";
  const seoTitle = isItalian
    ? "Esperienza | Luciano Tumminello"
    : "Experience | Luciano Tumminello";
  const seoDescription = isItalian
    ? "Esperienza professionale e formativa di Luciano Tumminello: timeline di carriera, istruzione universitaria e certificazioni."
    : "Luciano Tumminello's professional experience and education: career timeline, university education, and certifications.";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <SEO title={seoTitle} description={seoDescription} path="/experience" />
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b-2 border-primary/20 pb-2">
            <TranslatedText textKey="nav.experience" />
          </h1>

          <Tabs defaultValue="career" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="career" className="gap-2">
                <LineChart className="h-4 w-4" />
                <TranslatedText textKey="experience.tab.career" />
              </TabsTrigger>
              <TabsTrigger value="education" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                <TranslatedText textKey="experience.tab.education" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="career">
              <div className="bg-white/50 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
                <CareerTimeline jobs={jobs} />
              </div>
            </TabsContent>

            <TabsContent value="education">
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
            </TabsContent>
          </Tabs>
        </div>
        <CoreCompetencies />
      </main>
      <Footer />
    </div>
  );
};

export default Experience;

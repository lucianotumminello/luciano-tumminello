import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LineChart } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";
import CoreCompetencies from "@/components/CoreCompetencies";
import { Helmet } from "react-helmet-async";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCollapsibleSection from "@/components/MobileCollapsibleSection";

const jobs = [
  {
    title: "Chief Operating Officer at Spartan Health",
    descKey: "job.spartan"
  },
  {
    title: "Marketing Director at Slow",
    descKey: "job.slow"
  },
  {
    title: "Co-Founder & Managing Director of 444 Media, Inc.",
    descKey: "job.444"
  },
  {
    title: "Regional Digital Marketing Consultant at Greenpeace Southeast Asia",
    descKey: "job.greenpeace"
  },
  {
    title: "Cluster Director of Marketing at Accor",
    descKey: "job.accor"
  },
  {
    title: "Head of Client Services at Y-Digital",
    descKey: ["job.ydigital.retention", "job.ydigital.relationships"]
  },
  {
    title: "Planning Director at Lion & Lion",
    descKey: ["job.lion.strategies", "job.lion.campaigns", "job.lion.analytics"]
  },
  {
    title: "Account Manager at DWA",
    descKey: [
      "job.dwa.strategies",
      "job.dwa.relationships",
      "job.dwa.liaison",
      "job.dwa.vendors",
      "job.dwa.project"
    ]
  },
  {
    title: "Business Development Manager (ASEAN) at Cadreon (IPG Mediabrands)",
    descKey: "job.cadreon"
  },
  {
    title: "SEM Specialist at Sensis",
    descKey: "job.sensis"
  },
];

const ProfessionalJourney = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = "Career | Luciano Tumminello";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Career | Luciano Tumminello</title>
        <meta name="description" content="Explore Luciano Tumminello's professional career journey from SEM Specialist at Sensis to Chief Operating Officer at Spartan Health, with expertise in marketing, operations, and digital transformation across APAC." />
        <meta name="keywords" content="Luciano Tumminello, career journey, professional experience, COO, marketing director, digital marketing, operations management" />
        <link rel="canonical" href="https://lucianotumminello.com/career" />
      </Helmet>
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <section id="career-journey" className="mb-16">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">
              <TranslatedText textKey="nav.journey" />
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
              <LineChart className="mr-2 h-6 w-6 text-primary" />
              <TranslatedText textKey="about.journey" />
            </h2>
            {isMobile ? (
              <div className="space-y-4">
                {jobs.map((job, i) => (
                  <MobileCollapsibleSection key={i} title={job.title}>
                    {Array.isArray(job.descKey) ? (
                      job.descKey.map((dk, idx) => (
                        <p className="text-gray-600 text-justify mb-1" key={idx}>
                          <TranslatedText textKey={dk} />
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-600 text-justify">
                        <TranslatedText textKey={job.descKey} />
                      </p>
                    )}
                  </MobileCollapsibleSection>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-gray-200 pb-6" itemScope itemType="https://schema.org/WorkPosition">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                    <div className="bg-[#F1F1F1] rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <h3 className="font-bold text-lg mb-3" itemProp="jobTitle">{job.title}</h3>
                      {Array.isArray(job.descKey) ? (
                        job.descKey.map((dk, idx) => (
                          <p className="text-gray-600 text-justify mb-2" key={idx} itemProp="description">
                            <TranslatedText textKey={dk} />
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-600 text-justify" itemProp="description">
                          <TranslatedText textKey={job.descKey} />
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
        <CoreCompetencies />
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalJourney;

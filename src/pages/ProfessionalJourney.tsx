
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LineChart } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";
import CoreCompetencies from "@/components/CoreCompetencies";
import { Helmet } from "react-helmet-async";
import CareerTimeline from "@/components/career/CareerTimeline";

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
  
  useEffect(() => {
    document.title = "Career | Luciano Tumminello";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
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
            <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-primary/20 pb-2">
              <TranslatedText textKey="nav.journey" />
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-primary flex items-center">
              <LineChart className="mr-2 h-6 w-6 text-primary" />
              <TranslatedText textKey="about.journey" />
            </h2>
            <div className="bg-white/50 p-6 rounded-xl shadow-sm border border-gray-100">
              <CareerTimeline jobs={jobs} />
            </div>
          </section>
        </div>
        <CoreCompetencies />
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalJourney;

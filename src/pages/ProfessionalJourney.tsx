
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LineChart, Circle } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";
import CoreCompetencies from "@/components/CoreCompetencies";
import { Helmet } from "react-helmet-async";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define the Job type to ensure proper typing
interface Job {
  title: string;
  descKey: string | string[];
  bulletPoints?: string[]; // Make bulletPoints optional
}

const jobs: Job[] = [
  {
    title: "Chief Operating Officer at Spartan Health",
    descKey: "job.spartan",
    bulletPoints: [
      "Lead strategic direction by streamlining operations and implementing digital transformation across all departments",
      "Optimize processes, implement AI solutions, and leverage data analytics to enhance decision-making"
    ]
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

  const JobCard = ({ job }: { job: Job }) => (
    <div className="relative pl-6 mb-6">
      <div className="absolute left-0 top-1 transform -translate-x-1/2">
        <Circle className="text-gray-400 w-4 h-4" />
      </div>
      <Card className="border-gray-200 bg-[#F1F1F1] hover:bg-[#F8F8F8] transition-colors duration-200">
        <CardHeader>
          <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
        </CardHeader>
        <CardContent>
          {job.bulletPoints ? (
            // Render bullet points if they exist
            job.bulletPoints.map((point, idx) => (
              <div key={idx} className="flex items-start mb-2">
                <Circle className="w-3 h-3 mr-2 mt-1 text-gray-500" />
                <p className="text-gray-600 text-justify">{point}</p>
              </div>
            ))
          ) : (
            // Render translated text for jobs without bullet points
            Array.isArray(job.descKey) ? (
              job.descKey.map((dk, idx) => (
                <div key={idx} className="flex items-start mb-2">
                  <Circle className="w-3 h-3 mr-2 mt-1 text-gray-500" />
                  <p className="text-gray-600 text-justify">
                    <TranslatedText textKey={dk} />
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-start mb-2">
                <Circle className="w-3 h-3 mr-2 mt-1 text-gray-500" />
                <p className="text-gray-600 text-justify">
                  <TranslatedText textKey={job.descKey} />
                </p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );

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
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[calc(2rem-1px)] before:w-[2px] before:bg-gray-200">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
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

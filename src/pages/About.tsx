
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, GraduationCap, Globe, Award, LineChart, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">About Me</h1>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <img 
                src="/lovable-uploads/cd29d65a-89e6-42c7-8fd6-92da850c4c24.png" 
                alt="Luciano Tumminello" 
                className="rounded-lg shadow-md w-full aspect-square object-cover"
              />
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">Chief Operating Officer</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">Remote, Spartan Health</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">Dual Master's in Commerce & Advertising</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">15+ Years Experience</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I am currently working remotely as the Chief Operating Officer for Spartan Health, an Italian company in the health and wellness industry. My primary focus is on driving the company's strategic direction by streamlining operations and maximizing efficiency and productivity.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                With dual Master's degrees in Commerce and Advertising from RMIT University in Melbourne (Australia) and a solid foundation in International Communication and International Relations, I have built a 15+ year career delivering measurable results, driving growth, and leading transformative strategies across Asia-Pacific.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                At Spartan Health, I'm leading our digital transformation efforts, which includes implementing new software and Artificial Intelligence across every department to increase efficiency and productivity, as well as leveraging data to improve decision-making.
              </p>
            </div>
          </div>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
                <LineChart className="mr-2 h-6 w-6 text-primary" />
                Professional Journey
              </h2>
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Chief Operating Officer at Spartan Health</h3>
                  <p className="text-gray-600">Currently driving strategic direction, streamlining operations, and leading digital transformation efforts across all departments.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Marketing Director at Slow</h3>
                  <p className="text-gray-600">Led marketing teams across Europe and Asia, drove a 20% increase in brand awareness and improved team productivity by 40%. Managed budgets to maximize ROI while promoting sustainability through regenerative agriculture practices.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Co-Founder of 444 Media, Inc.</h3>
                  <p className="text-gray-600">Built the business from the ground up, achieving a 95% client and employee retention rate, growing client accounts by 40%, and reducing operational costs by
30% while scaling the team to 20 employees across two locations.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Regional Digital Marketing Consultant at Greenpeace Southeast Asia</h3>
                  <p className="text-gray-600">Improved campaign performance by up to 30%, trained cross-functional teams, and streamlined digital operations, creating lasting impact across four countries.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Cluster Director of Marketing at Accor</h3>
                  <p className="text-gray-600">Managed marketing for five luxury hotels in Thailand, increasing online revenue by 20%.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Leadership Roles at Lion & Lion and Y-Digital Asia</h3>
                  <p className="text-gray-600">Led multi-country teams, improved campaign ROI by 18% and raised client retention rates to over 90%. My leadership efforts drove account growth by 30% annually.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">Programmatic Advertising at Cadreon (IPG Mediabrands)</h3>
                  <p className="text-gray-600">Spearheaded programmatic advertising across ASEAN markets, contributing to 30% revenue growth for high-profile clients like Microsoft, KFC, and Cathay Pacific.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg">SEM Specialist at Sensis</h3>
                  <p className="text-gray-600">Optimized over 140 SEM campaigns in Australia, significantly improving performance and client retention.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
                <Award className="mr-2 h-6 w-6 text-primary" />
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">Strategic Leadership</h3>
                  <p className="text-sm text-gray-700">Leading diverse, cross-functional teams and scaling businesses for growth</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">Results-Driven Marketing</h3>
                  <p className="text-sm text-gray-700">Developing and executing data-driven strategies with measurable results</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">Operational Efficiency</h3>
                  <p className="text-sm text-gray-700">Streamlining workflows and implementing tools to enhance productivity</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">Business Development</h3>
                  <p className="text-sm text-gray-700">Identifying growth opportunities and building strong client relationships</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">Digital Transformation</h3>
                  <p className="text-sm text-gray-700">Implementing new technologies including AI to modernize operations</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">Data-Driven Decision-Making</h3>
                  <p className="text-sm text-gray-700">Leveraging analytics to measure and optimize business outcomes</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">Sustainability Leadership</h3>
                  <p className="text-sm text-gray-700">Integrating purpose and sustainability into business strategy</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary">Cross-Cultural Competence</h3>
                  <p className="text-sm text-gray-700">Working effectively across diverse markets and multicultural teams</p>
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

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    title: "Research, Insight and Marketing Strategy Planning",
    description:
      "Building marketing strategies on a foundation of rigorous research and market intelligence. I work with leadership teams to analyze competitive landscapes, customer segments, and growth opportunities, then translate those insights into clear strategic plans. Direction, priorities, and frameworks are defined at the leadership level. Execution is carried out by internal teams or specialist partners.",
  },
  {
    title: "Digital Transformation and AI Integration",
    description:
      "Advising organizations on how to integrate AI tools, automation, and performance systems into their marketing and operational functions. I define the strategy, evaluate the right tools, and oversee implementation by internal teams or specialist partners. I do not build or configure systems directly.",
  },
  {
    title: "Commercial and Operational Alignment",
    description:
      "Bridging the gap between marketing strategy and operational execution. I redesign workflows, team structures, and reporting frameworks at a leadership level, then work with teams and agencies to implement them. The focus is on accountability, clarity, and efficiency across the organization.",
  },
  {
    title: "Visibility, SEO and GEO Strategy",
    description:
      "Defining long-term organic visibility strategies covering search engine optimization, generative engine optimization, and content architecture. I develop the strategic roadmap and oversee execution by specialist teams, ensuring alignment between visibility goals and broader commercial objectives.",
  },
  {
    title: "Revenue Growth and Commercial Strategy",
    description:
      "Identifying revenue growth opportunities and defining the commercial strategies to capture them. I work with leadership teams to set channel priorities, budget allocation frameworks, and performance targets across paid, organic, and owned channels. Execution is managed by internal teams or specialist agencies. My role is to define the direction, set the standards, and hold performance accountable to commercial outcomes.",
  },
  {
    title: "Interim, Fractional CMO and Advisory Leadership",
    description:
      "Available for defined-scope engagements as an embedded or remote marketing director, fractional CMO, COO, or commercial advisor. I lead, mentor, and manage marketing teams and agency partners, providing senior strategic oversight without hands-on execution. Particularly suited to organizations scaling, transforming, or in leadership transition.",
  },
];

const waysOfWorking = [
  {
    title: "Full-time in-house",
    description:
      "Senior leadership role embedded within your organization. Available for the right senior leadership opportunity.",
  },
  {
    title: "Interim leadership",
    description:
      "Time-defined senior role covering a transition, vacancy, or transformation period.",
  },
  {
    title: "Fractional CMO",
    description:
      "Part-time embedded marketing leadership, typically 1 to 3 days per week. Suited to organizations that need senior marketing strategy and direction without a full-time hire.",
  },
  {
    title: "Project-based consulting",
    description:
      "Defined scope, defined timeline, defined deliverables. Often strategy, audit, or launch planning.",
  },
  {
    title: "Advisory retainer",
    description:
      "Ongoing strategic counsel on a retainer or session basis. Suited to founders and leadership teams who need a senior thinking partner.",
  },
];

const Services = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const seoTitle = isItalian ? "Servizi | Luciano Tumminello" : "Services | Luciano Tumminello";
  const seoDescription =
    "Marketing strategy, revenue growth, digital transformation, and fractional leadership services for organizations across industries.";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <SEO title={seoTitle} description={seoDescription} path="/services" />
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Intro */}
          <header className="mb-20 md:mb-24">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What I Do
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl pb-6">
              I work at the intersection of marketing strategy, revenue growth,
              digital execution, and operational leadership. The engagement
              changes depending on the organization. The outcome is always the
              same: clearer direction, stronger performance, and systems that
              hold.
            </p>
          </header>

          {/* Services */}
          <section className="pt-12 mb-20 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 inline-block border-b-2 border-teal-600 pb-2">
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="relative h-full bg-white border border-gray-200 rounded-md p-6 md:p-7 pl-7 md:pl-8 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-teal-600"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {s.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Ways of Working */}
          <section className="mb-20 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 inline-block border-b-2 border-teal-600 pb-2">
              Ways of Working
            </h2>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden divide-y divide-gray-200">
              {waysOfWorking.map((w) => (
                <div
                  key={w.title}
                  className="p-7 md:p-8 md:grid md:grid-cols-[260px_1fr] md:gap-8 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-0">
                    {w.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {w.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#0f1b3d] text-white rounded-lg p-10 md:p-14 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Ready to explore an engagement?
            </h2>
            <Button
              asChild
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Link to="/contact">Discuss an Opportunity</Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;

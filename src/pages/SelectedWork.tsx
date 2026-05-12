import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { caseStudies, industryFilters } from "@/data/caseStudies";

const SelectedWork = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const seoTitle = isItalian
    ? "Lavori Selezionati | Luciano Tumminello"
    : "Selected Work | Luciano Tumminello";
  const seoDescription =
    "A cross-industry selection of engagements across hospitality, consumer brands, NGOs, agencies, and digital transformation.";

  const [filter, setFilter] = useState<(typeof industryFilters)[number]>("All");

  const visible =
    filter === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === filter);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <SEO title={seoTitle} description={seoDescription} path="/selected-work" />
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Intro */}
          <header className="mb-12 md:mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Selected Work
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl">
              A cross-industry selection of engagements and their outcomes —
              spanning hospitality, consumer brands, NGOs, agency leadership,
              and digital transformation.
            </p>
          </header>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-12 md:mb-14">
            {industryFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    active
                      ? "bg-[#0a1f44] text-white border-[#0a1f44]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Case studies */}
          <div className="space-y-8 md:space-y-10">
            {visible.map((c) => (
              <article
                key={c.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-7 md:p-10"
              >
                <div className="text-xs font-semibold tracking-wide uppercase text-teal-700 mb-2">
                  {c.industry}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-6">
                  {c.organizationType}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  <Block title="The Situation">
                    <p className="text-gray-700 leading-relaxed text-[15px]">
                      {c.situation}
                    </p>
                  </Block>
                  <Block title="What I Led">
                    <BulletList items={c.led} />
                  </Block>
                  <Block title="Outcomes">
                    <BulletList items={c.outcomes} />
                  </Block>
                  <Block title="Strategic Takeaway">
                    <p className="text-gray-700 leading-relaxed text-[15px] italic">
                      {c.takeaway}
                    </p>
                  </Block>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Button
                    asChild
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Link to="/contact">Discuss an Opportunity</Link>
                  </Button>
                </div>
              </article>
            ))}

            {visible.length === 0 && (
              <p className="text-center text-gray-600 py-12">
                No case studies in this category yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Block = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500 mb-2">
      {title}
    </h3>
    {children}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 text-[15px] text-gray-700">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2">
        <span className="text-teal-600 mt-1">•</span>
        <span className="leading-relaxed">{it}</span>
      </li>
    ))}
  </ul>
);

export default SelectedWork;

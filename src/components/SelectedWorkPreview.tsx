import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const featured = [
  {
    industry: "Hospitality — Phuket, Thailand",
    org: "Kudo Hotel, boutique hotel",
    situation:
      "During Covid, Kudo Hotel relied entirely on OTAs for occupancy at an average cost of 18%, with no direct booking capability or owned digital marketing function.",
    outcomes: [
      "Direct bookings doubled total revenue at an acquisition cost of around 6%, replacing high-cost OTA volume.",
      "Distribution costs cut by roughly two thirds, more than doubling the hotel's monthly net profit.",
      "Data-driven paid media on Meta and Google converted significantly above industry benchmarks.",
    ],
  },
  {
    industry: "Consumer Brand — Europe & Indonesia",
    org: "Slow / Krakakoa, sustainable coffee and chocolate, Denmark",
    situation:
      "A rapidly growing sustainable food brand needed to establish thought leadership and build brand awareness across Europe.",
    outcomes: [
      "Brand awareness increased by 30% through integrated digital campaigns and content strategy.",
      "Implemented AI-powered marketing tools and the Slow TV digital platform.",
      "Team productivity improved by 40% through cross-cultural collaboration systems and better SOPs.",
    ],
  },
  {
    industry: "NGO — Southeast Asia",
    org: "Greenpeace Southeast Asia",
    situation:
      "Greenpeace Southeast Asia needed to improve digital campaign performance across four markets simultaneously to increase awareness and digital fundraising.",
    outcomes: [
      "Campaign click-through rates improved by 15% through A/B testing at scale.",
      "Led digital marketing and mentored teams across Thailand, Indonesia, Malaysia, and the Philippines.",
      "Optimized workflows through new CRM and project management solutions.",
    ],
  },
];

const SelectedWorkPreview = () => {
  return (
    <section className="py-20 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
            Selected Work
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A cross-industry selection of engagements and their outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {featured.map((c) => (
            <article
              key={c.industry}
              className="h-full flex flex-col bg-white border border-gray-200 rounded-lg p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-xs font-semibold tracking-wide uppercase text-teal-700 mb-2">
                {c.industry}
              </div>
              <h3 className="font-serif text-xl text-gray-900 mb-3">{c.org}</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
                {c.situation}
              </p>
              <ul className="space-y-2 mb-6 text-[15px] text-gray-700">
                {c.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <Link
                  to="/selected-work"
                  className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  View Full Case Study <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/selected-work"
            className="inline-flex items-center justify-center rounded-md bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white px-8 py-3.5 text-base font-semibold transition-colors"
          >
            View All Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorkPreview;

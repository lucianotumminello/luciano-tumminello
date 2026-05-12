export type CaseStudyIndustry =
  | "Hospitality"
  | "Consumer Brand"
  | "NGO"
  | "Agency"
  | "Digital Transformation";

export interface CaseStudy {
  id: string;
  industry: CaseStudyIndustry;
  organizationType: string;
  situation: string;
  led: string[];
  outcomes: string[];
  takeaway: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "kudo-hotel",
    industry: "Hospitality",
    organizationType:
      "Kudo Hotel — boutique hotel, Phuket, Thailand",
    situation:
      "During Covid, Kudo Hotel relied entirely on OTAs for occupancy at an average cost of 18%, with no direct booking capability or owned digital marketing function.",
    led: [
      "Built a data-driven paid media strategy across Meta and Google using four proprietary data sets: historical top-3 nationalities per month, booking window per nationality, public holidays per nationality, and real-time travel restrictions to Phuket.",
      "Established a direct booking engine and owned digital marketing function from scratch.",
      "Defined targeting, creative, and budget allocation frameworks at the leadership level.",
    ],
    outcomes: [
      "Campaigns converted at significantly above industry benchmarks.",
      "Direct bookings doubled total revenue at an acquisition cost of around 6%, replacing high-cost OTA volume.",
      "Reduction in OTA dependency cut distribution costs by roughly two thirds, more than doubling the hotel's monthly net profit.",
    ],
    takeaway:
      "Owned channels, when built on disciplined data, can replace platform dependency and structurally rewrite a property's economics.",
  },
  {
    id: "slow-krakakoa",
    industry: "Consumer Brand",
    organizationType:
      "Slow / Krakakoa — sustainable coffee and chocolate company, Denmark & Indonesia",
    situation:
      "A rapidly growing sustainable food brand needed to establish thought leadership and build brand awareness across Europe.",
    led: [
      "Designed an integrated digital campaign and content strategy across European markets.",
      "Introduced AI-powered marketing tools and launched the Slow TV digital platform.",
      "Built cross-cultural collaboration systems, SOPs, and productivity tooling for distributed teams.",
    ],
    outcomes: [
      "Brand awareness increased by 30% through integrated digital campaigns and content.",
      "Successful launch of AI-powered marketing tools and the Slow TV digital platform.",
      "Team productivity improved by 40% through better collaboration systems and SOPs.",
    ],
    takeaway:
      "Awareness, operating systems, and AI-enabled tooling compound when introduced together rather than in isolation.",
  },
  {
    id: "greenpeace-sea",
    industry: "NGO",
    organizationType: "Greenpeace Southeast Asia — NGO",
    situation:
      "Greenpeace Southeast Asia needed to improve digital campaign performance across four Southeast Asian markets simultaneously to increase awareness and digital fundraising.",
    led: [
      "Led digital marketing initiatives across Thailand, Indonesia, Malaysia, and the Philippines.",
      "Mentored regional marketing teams and aligned them on a shared performance framework.",
      "Optimized workflows through new CRM and project management solutions.",
    ],
    outcomes: [
      "Campaign click-through rates improved by 15% through A/B testing at scale.",
      "Stronger alignment and capability across four country teams.",
      "More efficient campaign delivery through modernized CRM and PM tooling.",
    ],
    takeaway:
      "Mission-driven organizations gain disproportionate lift from disciplined testing and shared operating standards.",
  },
  {
    id: "agency-leadership",
    industry: "Agency",
    organizationType:
      "Digital marketing agency leadership — APAC",
    situation:
      "Multi-market agency engagements required senior oversight to align client strategy, creative, and media performance under a single accountable framework.",
    led: [
      "Set strategic direction across client portfolios spanning hospitality, consumer, and B2B.",
      "Built reporting and accountability frameworks shared across account, creative, and media teams.",
      "Mentored senior practitioners and stabilized delivery in transition periods.",
    ],
    outcomes: [
      "Improved client retention through clearer strategic narratives and performance reporting.",
      "More consistent creative and media output across markets.",
      "Higher margin engagements through tighter scoping and senior oversight.",
    ],
    takeaway:
      "Agency performance is unlocked at the seam between strategy, creative, and media — not within any one of them.",
  },
  {
    id: "digital-transformation",
    industry: "Digital Transformation",
    organizationType:
      "Cross-sector digital transformation engagements",
    situation:
      "Organizations modernizing their marketing and commercial functions needed senior leadership to choose the right tools, sequence the change, and hold delivery accountable.",
    led: [
      "Defined transformation roadmaps covering martech stack, AI tooling, data, and process.",
      "Selected and oversaw implementation partners; did not build or configure systems directly.",
      "Aligned commercial, marketing, and operations leadership around a shared change plan.",
    ],
    outcomes: [
      "Faster, more disciplined adoption of AI and automation across marketing operations.",
      "Cleaner data and reporting feeding leadership decisions.",
      "Reduced execution risk through phased delivery and clear accountability.",
    ],
    takeaway:
      "Transformation succeeds when leadership owns sequencing and accountability — tools alone never do the work.",
  },
];

export const industryFilters: Array<"All" | CaseStudyIndustry> = [
  "All",
  "Hospitality",
  "Consumer Brand",
  "NGO",
  "Agency",
  "Digital Transformation",
];

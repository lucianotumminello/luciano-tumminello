import { memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItem {
  value: string;
  labelKey: string;
}

const CredibilityStrip = memo(() => {
  const { t } = useLanguage();

  const stats: StatItem[] = [
    { value: "15+", labelKey: "credibility.years" },
    { value: "10+", labelKey: "credibility.industries" },
    { value: "4", labelKey: "credibility.countries" },
    { value: "30+", labelKey: "credibility.team" },
    { value: "APAC", labelKey: "credibility.region" },
  ];

  return (
    <section className="bg-[#0a1f44]" aria-label={t("credibility.years")}>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6 gap-x-4 md:gap-x-8 py-8 md:py-10 items-center justify-items-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center justify-center min-h-[80px] md:min-h-[60px]"
            >
              <span className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="mt-1.5 text-xs md:text-sm text-gray-300 leading-snug max-w-[140px]">
                {t(stat.labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

CredibilityStrip.displayName = "CredibilityStrip";

export default CredibilityStrip;

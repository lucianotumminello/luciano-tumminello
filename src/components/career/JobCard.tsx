
import React from "react";
import TranslatedText from "@/components/TranslatedText";
import { Card, CardContent } from "@/components/ui/card";

// Added showTitle prop per new requirement
interface JobProps {
  title: string;
  descKey: string | string[];
  denseDWA?: boolean;
  showTitle?: boolean;
}

const JobCard = ({ title, descKey, denseDWA = false, showTitle = true }: JobProps) => {
  // Colorful pastel-accented background inspired by skills/expertise sections
  const cardClasses = `transition-shadow duration-300 hover:shadow-lg bg-gradient-to-br from-white via-[#F2FCE2]/80 to-[#E5DEFF]/80 border border-primary/10 shadow-md overflow-hidden rounded-xl`;
  // DWA card (denseDWA) has tighter line-height, bolder color
  const descClasses = denseDWA
    ? "text-gray-700 text-justify mb-0 leading-[1.21] text-[15px] py-1"
    : "text-gray-600 text-justify mb-2 leading-relaxed";
  // Remove extra margin if no title is shown
  const titleClasses = showTitle
    ? "font-bold text-lg mb-3 text-primary"
    : "hidden";

  return (
    <Card className={cardClasses}>
      <CardContent className="p-5">
        {showTitle && (
          <h3 className={titleClasses} itemProp="jobTitle">
            {title}
          </h3>
        )}
        {Array.isArray(descKey) ? (
          descKey.map((dk, idx) => (
            <p className={descClasses} key={idx} itemProp="description">
              <TranslatedText textKey={dk} />
            </p>
          ))
        ) : (
          <p className={descClasses} itemProp="description">
            <TranslatedText textKey={descKey} />
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;

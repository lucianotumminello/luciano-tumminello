
import React from "react";
import TranslatedText from "@/components/TranslatedText";

interface JobProps {
  title: string;
  descKey: string | string[];
  denseDWA?: boolean;
}

const JobCard = ({ title, descKey, denseDWA = false }: JobProps) => {
  // Style to match skills boxes: white bg, border, shadow, rounded corners
  // DWA card (denseDWA) has tighter line-height and smaller spacing per user image
  const cardClasses =
    "bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg";
  const titleClasses =
    "font-bold text-lg mb-3 text-gray-900";
  const descClasses =
    denseDWA
      ? "text-gray-600 text-justify mb-0 leading-[1.35] text-[15px] py-1"
      : "text-gray-600 text-justify mb-2 leading-relaxed";

  return (
    <div
      className={cardClasses}
      itemScope
      itemType="https://schema.org/WorkPosition"
    >
      <h3 className={titleClasses} itemProp="jobTitle">
        {title}
      </h3>
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
    </div>
  );
};

export default JobCard;

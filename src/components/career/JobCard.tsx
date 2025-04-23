
import React from "react";
import TranslatedText from "@/components/TranslatedText";
import { Card, CardContent } from "@/components/ui/card";

interface JobProps {
  title: string;
  descKey: string | string[];
  denseDWA?: boolean;
}

const JobCard = ({ title, descKey, denseDWA = false }: JobProps) => {
  // DWA card (denseDWA) has tighter line-height and smaller spacing per user image
  const titleClasses = "font-bold text-lg mb-3 text-primary";
  const descClasses = denseDWA
    ? "text-gray-600 text-justify mb-0 leading-[1.35] text-[15px] py-1"
    : "text-gray-600 text-justify mb-2 leading-relaxed";

  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg bg-white border border-gray-200 shadow-md overflow-hidden">
      <CardContent className="p-5">
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
      </CardContent>
    </Card>
  );
};

export default JobCard;

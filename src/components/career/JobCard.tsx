
import React from "react";
import TranslatedText from "@/components/TranslatedText";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobProps {
  title: string;
  descKey: string | string[];
  denseDWA?: boolean;
  showTitle?: boolean;
}

const JobCard = ({ title, descKey, denseDWA = false, showTitle = true }: JobProps) => {
  const isMobile = useIsMobile();
  
  const descClasses = denseDWA
    ? "text-gray-700 text-justify mb-0 leading-[1.21] text-[15px] py-1"
    : "text-gray-600 text-justify mb-2 leading-relaxed";

  if (isMobile) {
    return (
      <>
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
      </>
    );
  }

  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg bg-white border border-gray-100 shadow-sm overflow-hidden rounded-xl">
      <CardContent className="p-5">
        {showTitle && (
          <h3 className="font-bold text-lg mb-3 text-gray-900" itemProp="jobTitle">
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


import React from "react";
import TranslatedText from "@/components/TranslatedText";

interface JobProps {
  title: string;
  descKey: string | string[];
}

const JobCard = ({ title, descKey }: JobProps) => {
  return (
    <div className="bg-[#F1F1F1] rounded-lg p-6 hover:bg-gray-100 transition-colors" itemScope itemType="https://schema.org/WorkPosition">
      <h3 className="font-bold text-lg mb-3" itemProp="jobTitle">{title}</h3>
      {Array.isArray(descKey) ? (
        descKey.map((dk, idx) => (
          <p className="text-gray-600 text-justify mb-2" key={idx} itemProp="description">
            <TranslatedText textKey={dk} />
          </p>
        ))
      ) : (
        <p className="text-gray-600 text-justify" itemProp="description">
          <TranslatedText textKey={descKey} />
        </p>
      )}
    </div>
  );
};

export default JobCard;

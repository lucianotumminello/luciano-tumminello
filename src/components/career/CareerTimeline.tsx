import React from "react";
import TimelineItem from "./TimelineItem";
import MobileCollapsibleSection from "@/components/MobileCollapsibleSection";
import TranslatedText from "@/components/TranslatedText";
import { useIsMobile } from "@/hooks/use-mobile";

interface Job {
  title: string;
  descKey: string | string[];
}

interface CareerTimelineProps {
  jobs: Job[];
}

const CareerTimeline = ({ jobs }: CareerTimelineProps) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <div className="space-y-4">
      {jobs.map((job, i) => (
        <MobileCollapsibleSection key={i} title={job.title}>
          {Array.isArray(job.descKey) ? (
            job.descKey.map((dk, idx) => (
              <p className="text-gray-600 text-justify mb-1" key={idx}>
                <TranslatedText textKey={dk} />
              </p>
            ))
          ) : (
            <p className="text-gray-600 text-justify">
              <TranslatedText textKey={job.descKey} />
            </p>
          )}
        </MobileCollapsibleSection>
      ))}
    </div>
  ) : (
    <div className="space-y-6">
      {jobs.map((job, index) => (
        <TimelineItem
          key={index}
          job={job}
          collapsible={true}
          showTimeline={true}
          denseDWA={job.title.startsWith("Account Manager at DWA")}
        />
      ))}
    </div>
  );
};

export default CareerTimeline;


import React from "react";
import JobCard from "./JobCard";

interface TimelineItemProps {
  job: {
    title: string;
    descKey: string | string[];
  };
}

const TimelineItem = ({ job }: TimelineItemProps) => {
  return (
    <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
      <JobCard title={job.title} descKey={job.descKey} />
    </div>
  );
};

export default TimelineItem;

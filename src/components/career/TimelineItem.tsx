
import React, { useState } from "react";
import JobCard from "./JobCard";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TimelineItemProps {
  job: {
    title: string;
    descKey: string | string[];
  };
  collapsible?: boolean;
  showTimeline?: boolean;
  denseDWA?: boolean;
}

const TimelineItem = ({
  job,
  collapsible = false,
  showTimeline = true,
  denseDWA = false,
}: TimelineItemProps) => {
  const [open, setOpen] = useState(!collapsible);

  return (
    <div className={`relative ${showTimeline ? "pl-8 border-l-2 border-gray-200 pb-6" : "pb-6"}`}>
      {showTimeline && (
        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
      )}
      {collapsible ? (
        <div>
          <button
            className="w-full flex justify-between items-center py-3 px-4 bg-gray-50 rounded-t-lg text-left font-semibold text-base focus:outline-none border border-b-0 border-gray-200 shadow-sm"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={`job-desc-${job.title.replace(/\s/g, "")}`}
          >
            <span>{job.title}</span>
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {open && (
            <div id={`job-desc-${job.title.replace(/\s/g, "")}`}>
              <JobCard title={job.title} descKey={job.descKey} denseDWA={denseDWA} />
            </div>
          )}
        </div>
      ) : (
        <JobCard title={job.title} descKey={job.descKey} denseDWA={denseDWA} />
      )}
    </div>
  );
};

export default TimelineItem;

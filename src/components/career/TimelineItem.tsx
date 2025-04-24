
import React, { useState } from "react";
import JobCard from "./JobCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

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
        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gray-400"></div>
      )}
      
      {collapsible ? (
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
          <CollapsibleTrigger className="w-full flex justify-between items-center py-3 px-4 bg-gray-50 border border-b-0 border-gray-100 rounded-t-xl font-semibold text-base focus:outline-none shadow-sm hover:bg-gray-100 transition-colors">
            <span className="text-gray-900">{job.title}</span>
            {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>
              <JobCard title={job.title} descKey={job.descKey} denseDWA={denseDWA} showTitle={false} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <JobCard title={job.title} descKey={job.descKey} denseDWA={denseDWA} showTitle={true} />
      )}
    </div>
  );
};

export default TimelineItem;

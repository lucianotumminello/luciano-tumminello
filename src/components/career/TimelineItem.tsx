
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
    <div className={`relative ${showTimeline ? "pl-8 border-l-2 border-primary/30 pb-6" : "pb-6"}`}>
      {showTimeline && (
        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
      )}
      
      {collapsible ? (
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
          <CollapsibleTrigger className="w-full flex justify-between items-center py-3 px-4 bg-white/80 border border-b-0 border-primary/10 rounded-t-xl font-semibold text-base focus:outline-none shadow-sm hover:bg-primary/10 transition-colors">
            <span className="text-primary">{job.title}</span>
            {open ? <ChevronUp className="w-4 h-4 text-secondary" /> : <ChevronDown className="w-4 h-4 text-secondary" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>
              {/* Remove repeated title as per request */}
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

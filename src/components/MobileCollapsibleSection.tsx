
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import JobCard from "./career/JobCard";

// Used on mobile, but now uses JobCard for visual consistency

interface MobileCollapsibleSectionProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

const MobileCollapsibleSection: React.FC<MobileCollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full flex justify-between items-center py-3 px-4 bg-gray-50 rounded-t-lg text-left font-semibold text-base focus:outline-none border border-b-0 border-gray-200 shadow-sm">
        <span>{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-0 pt-0 pb-0">
        <div className="border border-t-0 border-gray-200 rounded-b-lg shadow-md bg-white">
          {/* Render as passed or fallback in career timeline to <TimelineItem> with no timeline/marker */}
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileCollapsibleSection;

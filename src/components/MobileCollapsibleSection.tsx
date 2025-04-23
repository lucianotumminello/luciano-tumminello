
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import JobCard from "./career/JobCard";

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
      <CollapsibleTrigger className="w-full flex justify-between items-center py-3 px-4 bg-gray-50/80 rounded-t-lg text-left font-semibold text-base focus:outline-none border border-gray-200 shadow-sm hover:bg-gray-100 transition-colors">
        <span className="text-gray-800">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-0 pt-0 pb-0">
        <div className="border border-t-0 border-gray-200 rounded-b-lg shadow-md bg-white p-4">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileCollapsibleSection;

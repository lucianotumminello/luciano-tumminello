
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface MobileCollapsibleSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
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
      <CollapsibleTrigger className="w-full flex justify-between items-center py-3 px-4 bg-gray-100 rounded-md text-left font-semibold text-base focus:outline-none">
        <span>{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 pt-3 pb-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileCollapsibleSection;

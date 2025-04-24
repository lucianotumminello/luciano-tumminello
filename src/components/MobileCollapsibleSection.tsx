
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

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
      <CollapsibleTrigger className="w-full text-left focus:outline-none">
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="px-4 py-3">
            <div className="font-semibold text-gray-900 text-lg mb-1">{title}</div>
            <div className="flex items-center justify-between">
              {open ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-3 bg-white border-x border-b border-gray-100 rounded-b-xl shadow-sm mt-px">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileCollapsibleSection;

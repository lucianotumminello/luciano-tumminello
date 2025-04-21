
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DegreeCollapsibleProps {
  title: React.ReactNode;
  summary: React.ReactNode;
  period: React.ReactNode;
  children: React.ReactNode;
}

const DegreeCollapsible: React.FC<DegreeCollapsibleProps> = ({
  title,
  summary,
  period,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border-b last:border-b-0">
      <button
        className="w-full flex justify-between items-center bg-muted/60 px-3 py-3 rounded-md text-left focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex flex-col">
          <span className="font-bold text-primary text-lg">{title}</span>
          <span className="font-medium mt-1">{summary}</span>
          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mt-1 w-fit">{period}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {open && (
        <div className="px-3 pb-4 text-muted-foreground text-justify">{children}</div>
      )}
    </div>
  );
};

export default DegreeCollapsible;


import { Badge } from "@/components/ui/badge";
import TranslatedText from "@/components/TranslatedText";

interface CertificationItemProps {
  titleKey: string;
  dateKey: string;
  institutionKey: string;
}

const CertificationItem: React.FC<CertificationItemProps> = ({
  titleKey,
  dateKey,
  institutionKey,
}) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-primary">
          <TranslatedText textKey={titleKey} />
        </h3>
        <Badge 
          variant="outline" 
          className="bg-muted/70 hover:bg-muted h-6 flex items-center justify-center text-center rounded-full truncate px-3 text-xs"
        >
          <TranslatedText textKey={dateKey} />
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        <TranslatedText textKey={institutionKey} />
      </p>
    </div>
  );
};

export default CertificationItem;

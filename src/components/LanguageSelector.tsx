
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: "en" | "it") => {
    setLanguage(newLanguage);
    console.log(`Changed language to: ${newLanguage}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "p-0 h-8 w-8 rounded overflow-hidden transition-all",
          language === "en" && "ring-2 ring-primary ring-offset-1"
        )}
        onClick={() => handleLanguageChange("en")}
        aria-label="Switch to English"
      >
        <img
          src="https://flagcdn.com/w40/gb.png"
          alt="English"
          className="h-full w-full object-cover"
        />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "p-0 h-8 w-8 rounded overflow-hidden transition-all",
          language === "it" && "ring-2 ring-primary ring-offset-1"
        )}
        onClick={() => handleLanguageChange("it")}
        aria-label="Switch to Italian"
      >
        <img
          src="https://flagcdn.com/w40/it.png"
          alt="Italian"
          className="h-full w-full object-cover"
        />
      </Button>
    </div>
  );
};

export default LanguageSelector;

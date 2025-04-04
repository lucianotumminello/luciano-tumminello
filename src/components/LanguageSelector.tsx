
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Language = "en" | "it";

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    // Here you would normally handle the language change logic
    console.log(`Changed language to: ${language}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "p-0 h-8 w-8 rounded overflow-hidden transition-all",
          currentLanguage === "en" && "ring-2 ring-primary ring-offset-1"
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
          currentLanguage === "it" && "ring-2 ring-primary ring-offset-1"
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

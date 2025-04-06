
import { Separator } from "@/components/ui/separator";
import TranslatedText from "@/components/TranslatedText";

const ContactHeader = () => {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        <TranslatedText textKey="contact.title" />
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
        <TranslatedText textKey="contact.subtitle" />
      </p>
      <Separator className="w-24 h-1 mx-auto bg-primary" />
    </div>
  );
};

export default ContactHeader;

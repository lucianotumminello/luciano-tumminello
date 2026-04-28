import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const seoTitle = isItalian ? "Servizi | Luciano Tumminello" : "Services | Luciano Tumminello";
  const seoDescription = isItalian
    ? "Servizi di consulenza e advisory di Luciano Tumminello — in arrivo."
    : "Advisory and consulting services by Luciano Tumminello — coming soon.";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <SEO title={seoTitle} description={seoDescription} path="/services" />
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            <TranslatedText textKey="services.title" />
          </h1>
          <p className="text-lg text-muted-foreground">
            <TranslatedText textKey="services.subtitle" />
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;

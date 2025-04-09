
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "@/components/TranslatedText";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

const Education = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            <TranslatedText textKey="education.title" />
          </h1>
          
          <div className="space-y-12">
            {/* University Education */}
            <Card>
              <CardHeader className="bg-muted/50">
                <CardTitle>
                  <TranslatedText textKey="education.university.title" />
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6 space-y-8">
                {/* Master in Commerce */}
                <div className="border-b pb-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary">
                      <TranslatedText textKey="education.masters.commerce.title" />
                    </h3>
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      <TranslatedText textKey="education.masters.commerce.period" />
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">
                      <TranslatedText textKey="education.masters.commerce.institution" />
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <TranslatedText textKey="education.masters.commerce.location" />
                    </p>
                  </div>
                  <p className="text-muted-foreground text-justify">
                    <TranslatedText textKey="education.masters.commerce.description" />
                  </p>
                </div>
                
                {/* Master in Advertising */}
                <div className="border-b pb-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary">
                      <TranslatedText textKey="education.masters.advertising.title" />
                    </h3>
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      <TranslatedText textKey="education.masters.advertising.period" />
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">
                      <TranslatedText textKey="education.masters.advertising.institution" />
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <TranslatedText textKey="education.masters.advertising.location" />
                    </p>
                  </div>
                  <p className="text-muted-foreground text-justify">
                    <TranslatedText textKey="education.masters.advertising.description" />
                  </p>
                </div>
                
                {/* Bachelor in International Relations */}
                <div className="border-b pb-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary">
                      <TranslatedText textKey="education.bachelors.relations.title" />
                    </h3>
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      <TranslatedText textKey="education.bachelors.relations.period" />
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">
                      <TranslatedText textKey="education.bachelors.relations.institution" />
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <TranslatedText textKey="education.bachelors.relations.location" />
                    </p>
                  </div>
                  <p className="text-muted-foreground text-justify">
                    <TranslatedText textKey="education.bachelors.relations.description" />
                  </p>
                </div>
                
                {/* Bachelor in International Communications */}
                <div>
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary">
                      <TranslatedText textKey="education.bachelors.communications.title" />
                    </h3>
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      <TranslatedText textKey="education.bachelors.communications.period" />
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">
                      <TranslatedText textKey="education.bachelors.communications.institution" />
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <TranslatedText textKey="education.bachelors.communications.location" />
                    </p>
                  </div>
                  <p className="text-muted-foreground text-justify">
                    <TranslatedText textKey="education.bachelors.communications.description" />
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Professional Certifications */}
            <Card>
              <CardHeader className="bg-muted/50">
                <CardTitle>
                  <TranslatedText textKey="education.certifications.title" />
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SEMrush SEO Course */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.semrush.seo.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.semrush.seo.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.semrush.seo.institution" />
                    </p>
                  </div>
                  
                  {/* SEMrush AI-Powered Marketer */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.semrush.ai.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.semrush.ai.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.semrush.ai.institution" />
                    </p>
                  </div>
                  
                  {/* Generative AI Overview */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.ai.overview.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.ai.overview.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.ai.overview.institution" />
                    </p>
                  </div>
                  
                  {/* Google Ads Search */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.google.ads.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.google.ads.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.google.ads.institution" />
                    </p>
                  </div>
                  
                  {/* Google Analytics */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.google.analytics.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.google.analytics.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.google.analytics.institution" />
                    </p>
                  </div>
                  
                  {/* Content Marketing */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.hubspot.content.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.hubspot.content.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.hubspot.content.institution" />
                    </p>
                  </div>
                  
                  {/* Email Marketing */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.hubspot.email.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.hubspot.email.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.hubspot.email.institution" />
                    </p>
                  </div>
                  
                  {/* LinkedIn Content & Creative Design */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.linkedin.content.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.linkedin.content.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.linkedin.content.institution" />
                    </p>
                  </div>
                  
                  {/* LinkedIn Marketing Solutions */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.linkedin.solutions.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.linkedin.solutions.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.linkedin.solutions.institution" />
                    </p>
                  </div>
                  
                  {/* LinkedIn Marketing Strategy */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.linkedin.strategy.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.linkedin.strategy.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.linkedin.strategy.institution" />
                    </p>
                  </div>
                  
                  {/* Social Media Marketing */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.hubspot.social.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.hubspot.social.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.hubspot.social.institution" />
                    </p>
                  </div>
                  
                  {/* HubSpot Marketing Hub Software */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.hubspot.software.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.hubspot.software.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.hubspot.software.institution" />
                    </p>
                  </div>
                  
                  {/* Inbound Marketing */}
                  <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-primary">
                        <TranslatedText textKey="education.certifications.hubspot.inbound.title" />
                      </h3>
                      <Badge variant="outline" className="bg-muted/70 hover:bg-muted w-24 flex items-center justify-center py-1 rounded-full">
                        <TranslatedText textKey="education.certifications.hubspot.inbound.date" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText textKey="education.certifications.hubspot.inbound.institution" />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Education;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from "@/components/TranslatedText";
import CertificationItem from "./CertificationItem";

const ProfessionalCertifications = () => {
  const certifications = [
    {
      titleKey: "education.certifications.semrush.seo.title",
      dateKey: "education.certifications.semrush.seo.date",
      institutionKey: "education.certifications.semrush.seo.institution",
    },
    {
      titleKey: "education.certifications.semrush.ai.title",
      dateKey: "education.certifications.semrush.ai.date",
      institutionKey: "education.certifications.semrush.ai.institution",
    },
    {
      titleKey: "education.certifications.ai.overview.title",
      dateKey: "education.certifications.ai.overview.date",
      institutionKey: "education.certifications.ai.overview.institution",
    },
    {
      titleKey: "education.certifications.google.ads.title",
      dateKey: "education.certifications.google.ads.date",
      institutionKey: "education.certifications.google.ads.institution",
    },
    {
      titleKey: "education.certifications.google.analytics.title",
      dateKey: "education.certifications.google.analytics.date",
      institutionKey: "education.certifications.google.analytics.institution",
    },
    {
      titleKey: "education.certifications.hubspot.content.title",
      dateKey: "education.certifications.hubspot.content.date",
      institutionKey: "education.certifications.hubspot.content.institution",
    },
    {
      titleKey: "education.certifications.hubspot.email.title",
      dateKey: "education.certifications.hubspot.email.date",
      institutionKey: "education.certifications.hubspot.email.institution",
    },
    {
      titleKey: "education.certifications.linkedin.content.title",
      dateKey: "education.certifications.linkedin.content.date",
      institutionKey: "education.certifications.linkedin.content.institution",
    },
    {
      titleKey: "education.certifications.linkedin.solutions.title",
      dateKey: "education.certifications.linkedin.solutions.date",
      institutionKey: "education.certifications.linkedin.solutions.institution",
    },
    {
      titleKey: "education.certifications.linkedin.strategy.title",
      dateKey: "education.certifications.linkedin.strategy.date",
      institutionKey: "education.certifications.linkedin.strategy.institution",
    },
    {
      titleKey: "education.certifications.hubspot.social.title",
      dateKey: "education.certifications.hubspot.social.date",
      institutionKey: "education.certifications.hubspot.social.institution",
    },
    {
      titleKey: "education.certifications.hubspot.software.title",
      dateKey: "education.certifications.hubspot.software.date",
      institutionKey: "education.certifications.hubspot.software.institution",
    },
    {
      titleKey: "education.certifications.hubspot.inbound.title",
      dateKey: "education.certifications.hubspot.inbound.date",
      institutionKey: "education.certifications.hubspot.inbound.institution",
    },
  ];
  
  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle>
          <TranslatedText textKey="education.certifications.title" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <CertificationItem
              key={index}
              titleKey={cert.titleKey}
              dateKey={cert.dateKey}
              institutionKey={cert.institutionKey}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalCertifications;

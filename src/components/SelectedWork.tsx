
import { Card, CardContent } from "@/components/ui/card";
import TranslatedText from "./TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const SelectedWork = () => {
  const { t } = useLanguage();
  
  const projects = [
    {
      id: 1,
      titleKey: "work.project1.title",
      descriptionKey: "work.project1.description",
      categoryKey: "work.project1.category",
      imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      titleKey: "work.project2.title",
      descriptionKey: "work.project2.description",
      categoryKey: "work.project2.category",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      titleKey: "work.project3.title",
      descriptionKey: "work.project3.description",
      categoryKey: "work.project3.category",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <section id="selected-work" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <TranslatedText textKey="work.section.title" />
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            <TranslatedText textKey="work.section.subtitle" />
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={t(project.titleKey)} 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-primary font-medium mb-2">
                  <TranslatedText textKey={project.categoryKey} />
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <TranslatedText textKey={project.titleKey} />
                </h3>
                <p className="text-gray-600">
                  <TranslatedText textKey={project.descriptionKey} />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;

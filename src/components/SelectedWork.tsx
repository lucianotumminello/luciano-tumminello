
import { Card, CardContent } from "@/components/ui/card";

const SelectedWork = () => {
  const projects = [
    {
      id: 1,
      title: "Portfolio Redesign",
      description: "A complete overhaul of a personal brand identity and website.",
      category: "Web Design",
      imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Mobile App Interface",
      description: "UI/UX design for a health and fitness mobile application.",
      category: "App Design",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Full stack development of a modern online shopping experience.",
      category: "Development",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <section id="selected-work" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Selected Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A curated selection of my recent projects and collaborations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-primary font-medium mb-2">{project.category}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;

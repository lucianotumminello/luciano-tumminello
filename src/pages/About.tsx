
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">About Me</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img 
                src="/lovable-uploads/cd29d65a-89e6-42c7-8fd6-92da850c4c24.png" 
                alt="Luciano Tumminello" 
                className="rounded-lg shadow-md w-full aspect-square object-cover"
              />
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Hello! I'm Luciano, a marketing and operations expert with over 8 years of experience helping businesses optimize their processes and grow their market presence.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                My journey began with a degree in Business Administration with a focus on Marketing. Since then, I've worked with organizations ranging from startups to established enterprises across various industries.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                I specialize in developing comprehensive marketing strategies, streamlining operational workflows, and implementing data-driven approaches to business growth. My goal is to help businesses maximize efficiency while creating meaningful connections with their audience.
              </p>
              
              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-3 text-gray-900">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {["Strategic Planning", "Digital Marketing", "Content Strategy", "Operations Management", "Process Optimization", "Market Research", "Project Management", "Data Analysis", "CRM Implementation", "Team Leadership"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

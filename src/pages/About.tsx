
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
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="John Doe" 
                className="rounded-lg shadow-md w-full aspect-square object-cover"
              />
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Hello! I'm John, a product designer and developer with over 5 years of experience creating digital experiences for brands and startups.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                My journey began at Design Academy where I studied Interactive Design. Since then, I've worked with various clients ranging from small businesses to Fortune 500 companies.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                I specialize in creating clean, functional, and user-focused designs. My approach combines aesthetic sensibility with practical functionality to deliver exceptional digital products.
              </p>
              
              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-3 text-gray-900">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {["UI/UX Design", "Frontend Development", "Prototyping", "User Research", "Design Systems", "React", "Figma", "Tailwind CSS"].map((skill) => (
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

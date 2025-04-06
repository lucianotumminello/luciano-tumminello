
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Me</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                  <AvatarImage src="/lovable-uploads/16736ca3-cf96-42d8-8e9b-214d90395f88.png" alt="Luciano Tumminello" />
                  <AvatarFallback>LT</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Luciano Tumminello</h2>
                  <p className="text-gray-600">Marketing & Operations Leader</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email</h3>
                    <a href="mailto:lucianotumminello@gmail.com" className="text-gray-600 hover:text-primary">
                      lucianotumminello@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <a href="tel:+66809937091" className="text-gray-600 hover:text-primary mr-2">
                          +66 80 993 7091
                        </a>
                        <a href="https://wa.me/6680993709" target="_blank" rel="noreferrer">
                          <img 
                            src="/lovable-uploads/5442caea-b979-458a-afee-771d811502a7.png" 
                            alt="WhatsApp Thai" 
                            className="h-6 w-6" 
                          />
                        </a>
                      </div>
                      <div className="flex items-center">
                        <a href="tel:+393287478677" className="text-gray-600 hover:text-primary mr-2">
                          +39 328 747 8677
                        </a>
                        <a href="https://wa.me/393287478677" target="_blank" rel="noreferrer">
                          <img 
                            src="/lovable-uploads/40c024b8-784f-4855-8dfe-816c7d417d95.png" 
                            alt="WhatsApp Italian" 
                            className="h-5 w-5" 
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">Bangkok, Thailand</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/lucianotumminello10101981/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <img 
                      src="/lovable-uploads/a501a8ca-a665-40f5-ad05-1f32a50b7fbb.png" 
                      alt="LinkedIn" 
                      className="h-10 w-10 transition-transform hover:scale-110" 
                    />
                  </a>
                  {/* Add other social icons as needed */}
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

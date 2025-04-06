
import { Mail, Phone, MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TranslatedText from "@/components/TranslatedText";

const ContactInfo = () => {
  return (
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
                <a href="https://wa.me/66809937091" target="_blank" rel="noreferrer">
                  <img 
                    src="/lovable-uploads/289ae2c8-1500-430b-a72d-16e8bcc0a333.png" 
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
                    src="/lovable-uploads/289ae2c8-1500-430b-a72d-16e8bcc0a333.png" 
                    alt="WhatsApp Italian" 
                    className="h-6 w-6" 
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-gray-900"><TranslatedText textKey="contact.location" /></h3>
            <p className="text-gray-600">Bangkok, Thailand</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-medium text-gray-900 mb-4"><TranslatedText textKey="contact.follow" /></h3>
        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/in/lucianotumminello10101981/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <img 
              src="/lovable-uploads/a501a8ca-a665-40f5-ad05-1f32a50b7fbb.png" 
              alt="LinkedIn" 
              className="h-12 w-12 transition-transform hover:scale-110" 
            />
          </a>
          {/* Add other social icons as needed */}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

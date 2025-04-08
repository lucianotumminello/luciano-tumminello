
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Define the form schema with Zod
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." })
  });

  // Define form with react-hook-form and zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const recipientEmail = "lucianotumminello@gmail.com";
    console.log(`Sending email to: ${recipientEmail}`);
    console.log('Form values:', values);
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init("SQDNI_KoxNyrhbLAW"); // Updated with the provided public key

      const result = await emailjs.send(
        "service_meyy9ti", // Updated with the provided service ID
        "template_80qmm2z", // Updated with the provided template ID
        {
          from_name: values.name,
          reply_to: values.email,
          subject: values.subject,
          message: values.message,
        }
      );
      
      console.log('Email sent successfully:', result.text);
      
      toast({
        title: t("contact.success"),
        description: t("contact.success.description"),
      });
      
      form.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      
      toast({
        title: t("contact.error") || "Error",
        description: t("contact.error.description") || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-base font-medium">
                    {t("contact.name")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder={t("contact.namePlaceholder")}
                      className="mt-2 border-gray-300 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-base font-medium">
                    {t("contact.email")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email"
                      placeholder={t("contact.emailPlaceholder")}
                      className="mt-2 border-gray-300 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-base font-medium">
                    {t("contact.subject")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder={t("contact.subjectPlaceholder")}
                      className="mt-2 border-gray-300 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-base font-medium">
                    {t("contact.message")}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder={t("contact.messagePlaceholder")}
                      rows={6}
                      className="mt-2 border-gray-300 focus:border-primary resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-3 h-auto"
          >
            {isSubmitting ? t("contact.sending") : t("contact.sendMessage")}
            <Send className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;

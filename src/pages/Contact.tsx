
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <ContactHeader />
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

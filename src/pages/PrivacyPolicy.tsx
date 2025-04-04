
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            {language === "en" ? "Privacy Policy" : "Informativa sulla Privacy"}
          </h1>
          
          <div className="prose max-w-none text-gray-700">
            {language === "en" ? (
              <>
                <p>Last updated: April 4, 2025</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
                <p>
                  This Privacy Policy describes how your personal information is collected, used, and shared when you visit this website.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Personal Information We Collect</h2>
                <p>
                  When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Personal Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 mt-3 mb-4">
                  <li>Respond to your inquiries and provide support</li>
                  <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
                  <li>Improve our website and marketing effectiveness</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Sharing Your Personal Information</h2>
                <p>
                  We do not share your Personal Information with third parties except as described in this Privacy Policy.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
                <p>
                  If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Changes</h2>
                <p>
                  We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
                <p>
                  For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at hello@lucianotumminello.com.
                </p>
              </>
            ) : (
              <>
                <p>Ultimo aggiornamento: 4 Aprile 2025</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Introduzione</h2>
                <p>
                  Questa Informativa sulla Privacy descrive come le tue informazioni personali vengono raccolte, utilizzate e condivise quando visiti questo sito web.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Informazioni Personali che Raccogliamo</h2>
                <p>
                  Quando visiti il Sito, raccogliamo automaticamente alcune informazioni sul tuo dispositivo, incluse informazioni sul tuo browser web, indirizzo IP, fuso orario e alcuni dei cookie installati sul tuo dispositivo.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Come Utilizziamo le Tue Informazioni Personali</h2>
                <p>
                  Utilizziamo le informazioni che raccogliamo per:
                </p>
                <ul className="list-disc pl-5 mt-3 mb-4">
                  <li>Rispondere alle tue richieste e fornire supporto</li>
                  <li>Monitorare e analizzare tendenze, utilizzo e attività in relazione al nostro sito web</li>
                  <li>Migliorare il nostro sito web e l'efficacia del marketing</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Condivisione delle Tue Informazioni Personali</h2>
                <p>
                  Non condividiamo le tue Informazioni Personali con terze parti, eccetto come descritto in questa Informativa sulla Privacy.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">I Tuoi Diritti</h2>
                <p>
                  Se sei un residente europeo, hai il diritto di accedere alle informazioni personali che deteniamo su di te e di chiedere che le tue informazioni personali siano corrette, aggiornate o eliminate.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Modifiche</h2>
                <p>
                  Possiamo aggiornare questa informativa sulla privacy di tanto in tanto per riflettere, ad esempio, modifiche alle nostre pratiche o per altri motivi operativi, legali o normativi.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Contattaci</h2>
                <p>
                  Per maggiori informazioni sulle nostre pratiche sulla privacy, se hai domande o se desideri presentare un reclamo, contattaci via e-mail all'indirizzo hello@lucianotumminello.com.
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

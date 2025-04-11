
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const CookiePolicy = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            {language === "en" ? "Cookie Policy" : "Informativa sui Cookie"}
          </h1>
          
          <div className="prose max-w-none text-gray-700">
            {language === "en" ? (
              <>
                <p>Last updated: April 4, 2025</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">What Are Cookies</h2>
                <p>
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Cookies</h2>
                <p>
                  We use cookies for several purposes:
                </p>
                <ul className="list-disc pl-5 mt-3 mb-4">
                  <li><strong>Essential cookies:</strong> These are necessary for the website to function properly.</li>
                  <li><strong>Analytical/performance cookies:</strong> These allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
                  <li><strong>Functionality cookies:</strong> These are used to recognize you when you return to our website.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Disabling Cookies</h2>
                <p>
                  You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies may affect the functionality of this and many other websites that you visit.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">The Cookies We Set</h2>
                <p>
                  This site uses the following cookies:
                </p>
                <ul className="list-disc pl-5 mt-3 mb-4">
                  <li><strong>Site preferences cookies:</strong> To provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it.</li>
                  <li><strong>Third-party cookies:</strong> In some special cases, we also use cookies provided by trusted third parties.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">More Information</h2>
                <p>
                  If you are looking for more information about our cookie policy, you can contact us at lucianotumminello@gmail.com.
                </p>
              </>
            ) : (
              <>
                <p>Ultimo aggiornamento: 4 Aprile 2025</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Cosa Sono i Cookie</h2>
                <p>
                  I cookie sono piccoli file di testo che vengono memorizzati sul tuo computer o dispositivo mobile quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti web in modo più efficiente e fornire informazioni ai proprietari del sito.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Come Utilizziamo i Cookie</h2>
                <p>
                  Utilizziamo i cookie per diversi scopi:
                </p>
                <ul className="list-disc pl-5 mt-3 mb-4">
                  <li><strong>Cookie essenziali:</strong> Questi sono necessari per il corretto funzionamento del sito web.</li>
                  <li><strong>Cookie analitici/di prestazione:</strong> Questi ci permettono di riconoscere e contare il numero di visitatori e vedere come i visitatori si muovono all'interno del nostro sito web.</li>
                  <li><strong>Cookie di funzionalità:</strong> Questi sono utilizzati per riconoscerti quando torni sul nostro sito web.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Disabilitare i Cookie</h2>
                <p>
                  Puoi impedire l'impostazione dei cookie modificando le impostazioni del tuo browser. Tieni presente che la disabilitazione dei cookie potrebbe influire sulla funzionalità di questo e di molti altri siti web che visiti.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">I Cookie che Impostiamo</h2>
                <p>
                  Questo sito utilizza i seguenti cookie:
                </p>
                <ul className="list-disc pl-5 mt-3 mb-4">
                  <li><strong>Cookie di preferenza del sito:</strong> Per offrirti una grande esperienza su questo sito, forniamo la funzionalità per impostare le tue preferenze su come questo sito funziona quando lo utilizzi.</li>
                  <li><strong>Cookie di terze parti:</strong> In alcuni casi speciali, utilizziamo anche cookie forniti da terze parti affidabili.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Maggiori Informazioni</h2>
                <p>
                  Se stai cercando maggiori informazioni sulla nostra politica sui cookie, puoi contattarci all'indirizzo lucianotumminello@gmail.com.
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

export default CookiePolicy;


import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/utils/analytics';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from './TranslatedText';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if consent has been given before
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    } else if (hasConsent === 'accepted') {
      // Enable Google Analytics if user previously accepted
      window.gtag && window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    trackEvent('cookie_consent_accepted');
    // Update consent state for Google Analytics
    window.gtag && window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    trackEvent('cookie_consent_declined');
    // Update consent state for Google Analytics
    window.gtag && window.gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-md px-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-600 flex-1">
          <TranslatedText textKey="consent.message" fallback="This website uses cookies to enhance your experience." />
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={declineCookies}
            className="text-xs h-8"
          >
            <TranslatedText textKey="consent.decline" fallback="Decline" />
          </Button>
          <Button 
            size="sm" 
            onClick={acceptCookies}
            className="text-xs h-8"
          >
            <TranslatedText textKey="consent.accept" fallback="Accept" />
          </Button>
          <button 
            onClick={() => setVisible(false)} 
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

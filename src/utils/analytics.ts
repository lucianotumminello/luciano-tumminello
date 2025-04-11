
/**
 * Google Analytics utility functions
 */

// Track a page view
export const trackPageView = (path: string, title: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      send_to: 'G-W020BWHW4V'
    });
  }
};

// Track a custom event
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

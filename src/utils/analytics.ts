
/**
 * Google Analytics utility functions
 */

// Track a page view
export const trackPageView = (path: string, title: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page: {
        path,
        title
      }
    });
  }
};

// Track a custom event
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
  }
};

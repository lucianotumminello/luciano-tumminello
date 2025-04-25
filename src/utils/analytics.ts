
/**
 * Google Analytics and Ahrefs analytics utility functions
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
  
  // Send additional structured data for better SEO tracking
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'page_view',
      'page_path': path,
      'page_title': title,
      'content_category': path.split('/')[1] || 'home',
      'user_language': document.documentElement.lang || 'en'
    });
  }
};

// Track a custom event
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      send_to: 'G-W020BWHW4V'
    });
  }
  
  // Also track in dataLayer for GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': eventName,
      ...eventParams
    });
  }
};

// Track outbound links
export const trackOutboundLink = (url: string, label: string = 'outbound') => {
  if (window.gtag) {
    window.gtag('event', 'click', {
      'event_category': 'outbound',
      'event_label': label,
      'transport_type': 'beacon',
      'value': url
    });
  }
};

// Track file downloads
export const trackDownload = (fileUrl: string, fileType: string) => {
  if (window.gtag) {
    window.gtag('event', 'download', {
      'event_category': 'file_download',
      'event_label': fileType,
      'value': fileUrl
    });
  }
};

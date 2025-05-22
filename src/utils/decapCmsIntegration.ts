
// Initialize the Netlify Identity widget for authentication
export const initIdentityWidget = (): void => {
  if (typeof window !== 'undefined') {
    // Check if the widget script is already loaded
    if (!window.netlifyIdentity) {
      // Create and load the script dynamically
      const script = document.createElement('script');
      script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
      script.async = true;
      
      script.onload = () => {
        // Once the script is loaded, initialize event listeners
        if (window.netlifyIdentity) {
          window.netlifyIdentity.on('init', (user) => {
            if (!user) {
              window.netlifyIdentity.on('login', () => {
                // Redirect to admin after login if not already there
                const adminPath = '/admin/';
                if (window.location.pathname !== adminPath) {
                  window.location.href = adminPath;
                }
              });
            }
          });

          // Handle login/logout in the main app
          window.netlifyIdentity.on('login', () => {
            console.log('User logged in');
            // You can add custom behavior here
          });

          window.netlifyIdentity.on('logout', () => {
            console.log('User logged out');
            // You can add custom behavior here
          });

          // Initialize the widget with the correct API URL - using the site URL without the .netlify subdomain
          window.netlifyIdentity.init({
            APIUrl: window.location.origin + '/.netlify/identity'
          });
        }
      };

      document.head.appendChild(script);
    } else {
      // If widget is already loaded, just initialize it
      window.netlifyIdentity.init({
        APIUrl: window.location.origin + '/.netlify/identity'
      });
    }
  }
};

// Add Netlify Identity to window type
declare global {
  interface Window {
    netlifyIdentity: {
      init: (options: { APIUrl: string }) => void;
      on: (event: string, callback: (user?: any) => void) => void;
      open: (tab?: string) => void;
      close: () => void;
      currentUser: () => any;
    };
  }
}

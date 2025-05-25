
// Minimal Decap CMS integration utilities

export const initializeDecapCMS = (): void => {
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/';
  }
};

export const syncDecapCmsEntries = async (): Promise<void> => {
  console.log('Sync function placeholder');
};

// Clean initialization for Netlify Identity
export const initializeNetlifyIdentity = (): void => {
  // Only initialize on non-admin pages
  if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin')) {
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    script.onload = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user) => {
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              document.location.href = '/admin/';
            });
          }
        });
      }
    };
    document.head.appendChild(script);
  }
};

declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: any) => void) => void;
      open: (command?: string) => void;
    };
  }
}

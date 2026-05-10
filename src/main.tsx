
// import { createRoot } from 'react-dom/client' // switched to dynamic import for compatibility
import App from './App.tsx'
import './index.css'
import { initPerformanceOptimizations } from './utils/performanceUtils.ts'

// Immediate initialization for critical performance optimizations
if (typeof document !== 'undefined') {
  // Inline critical CSS to prevent render blocking
  const style = document.createElement('style');
  style.textContent = `
    body {margin:0;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;-webkit-font-smoothing:antialiased;background-color:#fff;color-scheme:light}
    #root {min-height:100vh;display:flex;flex-direction:column}
    .js-loading *:not(html):not(body):not(head):not(#root) {visibility:hidden}
    @media (prefers-reduced-motion:reduce) {*,::before,::after {animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
  `;
  document.head.appendChild(style);
}

// Initialize Google Analytics 4 - with reduced impact on main thread
const initGA = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]){
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-W020BWHW4V', {
    'send_page_view': false, // Will be sent after DOM is interactive
    'transport_type': 'beacon'
  });
};

// Defer GA initialization to prevent main thread blocking
const deferScript = (url: string, callback?: Function) => {
  const script = document.createElement('script');
  script.src = url;
  script.defer = true;
  script.onload = () => callback?.();
  document.head.appendChild(script);
};

const clearLegacyServiceWorkerCaches = async (): Promise<boolean> => {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    }

    if (
      'serviceWorker' in navigator &&
      navigator.serviceWorker.controller &&
      sessionStorage.getItem('legacy-sw-cache-cleared') !== 'true'
    ) {
      sessionStorage.setItem('legacy-sw-cache-cleared', 'true');
      window.location.reload();
      return true;
    }
  } catch (error) {
    console.warn('Unable to clear legacy service worker caches:', error);
  }

  return false;
};

// Prioritize core app rendering first
const initApp = async () => {
  // Use dynamic import for compatibility across React versions
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  try {
    const { createRoot } = await import('react-dom/client');
    const root = createRoot(rootElement as HTMLElement);
    root.render(<App />);
  } catch (e) {
    console.warn('createRoot not available, falling back to ReactDOM.render', e);
    try {
      const ReactDOMMod: any = await import('react-dom');
      const render = ReactDOMMod.render || ReactDOMMod.default?.render;
      if (typeof render === 'function') {
        render(<App />, rootElement);
      } else {
        throw new Error('render not found on react-dom');
      }
    } catch (error) {
      console.error("Error rendering application:", error);
      // Fallback rendering if main app fails
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center;">
          <h1>Luciano Tumminello</h1>
          <p>Marketing & Operations Leader</p>
          <p>Please try refreshing the page.</p>
        </div>
      `;
      return;
    }
  }
  
  // Remove loading class after hydration
  document.body.classList.remove('js-loading');
  
  // Initialize performance optimizations after initial render
  initPerformanceOptimizations();
  
  // Defer analytics after app is interactive
  setTimeout(() => {
    deferScript('https://www.googletagmanager.com/gtag/js?id=G-W020BWHW4V', initGA);
  }, 3000);
};

clearLegacyServiceWorkerCaches().then((reloadStarted) => {
  if (!reloadStarted) {
    initApp();
  }
});

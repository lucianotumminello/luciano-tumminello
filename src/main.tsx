
import { createRoot } from 'react-dom/client'
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

// Prioritize core app rendering first
const initApp = () => {
  // Use createRoot for concurrent features with error handling
  const rootElement = document.getElementById("root");
  if (rootElement) {
    // Create and render with error boundary
    try {
      const root = createRoot(rootElement);
      root.render(<App />);
      
      // Remove loading class after hydration
      document.body.classList.remove('js-loading');
      
      // Initialize performance optimizations after initial render
      initPerformanceOptimizations();
      
      // Defer analytics after app is interactive
      setTimeout(() => {
        deferScript('https://www.googletagmanager.com/gtag/js?id=G-W020BWHW4V', initGA);
      }, 3000);
      
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
    }
  }
};

// Register service worker for offline support - with proper error handling and update notification
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Defer service worker registration after main content loads
    setTimeout(() => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('Service worker registered successfully:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, notify user if needed
                  console.log('New content is available; please refresh.');
                }
              });
            }
          });
        })
        .catch(function(err) {
          console.log('Service worker registration failed: ', err);
          // Continue app function even if service worker fails
        });
      
      // Handle updates when user returns to the app
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }, 3000);
  });
}

// Execute immediately
initApp();

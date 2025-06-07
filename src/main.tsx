
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

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
      
      // Defer analytics after app is interactive
      setTimeout(() => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W020BWHW4V';
        script.defer = true;
        script.onload = initGA;
        document.head.appendChild(script);
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

// Execute immediately
initApp();

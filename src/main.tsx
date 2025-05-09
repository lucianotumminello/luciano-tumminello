
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Google Analytics 4 - with reduced impact on main thread
const initGA = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]){
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-W020BWHW4V', {
    'send_page_view': false // Will be sent after DOM is interactive
  });
};

// Defer GA initialization
setTimeout(initGA, 1000);

// Use createRoot for concurrent features with error handling
const rootElement = document.getElementById("root");
if (rootElement) {
  // Create and render with error boundary
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
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

// Register service worker for offline support - with proper error handling and update notification
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
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
  });
}


import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Google Analytics 4
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]){
  window.dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-W020BWHW4V');

// Use createRoot for concurrent features
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Register service worker for offline support - with proper error handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service worker registered successfully:', registration.scope);
      })
      .catch(function(err) {
        console.log('Service worker registration failed: ', err);
        // Prevent this error from breaking the app
      });
  });
}

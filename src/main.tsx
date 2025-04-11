
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize dataLayer for Google Tag Manager
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]){
  window.dataLayer.push(args);
}
gtag('js', new Date());
gtag('config', 'G-W020BWHW4V'); // Updated with your GA4 measurement ID

// Use createRoot for concurrent features
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

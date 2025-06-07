
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize app immediately
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found");
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui;">
      <h1>Luciano Tumminello</h1>
      <p>Marketing & Operations Leader</p>
      <p>Error: Could not initialize application</p>
    </div>
  `;
} else {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    
    // Remove loading class when content is ready
    if (document.body.classList.contains('js-loading')) {
      document.body.classList.remove('js-loading');
    }
    
    console.log('App initialized successfully');
    
  } catch (error) {
    console.error("Critical error rendering application:", error);
    
    // Fallback content
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui;">
        <h1>Luciano Tumminello</h1>
        <p>Marketing & Operations Leader</p>
        <p>Application loading error. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
}

// Initialize Google Analytics after app is loaded
const initGA = () => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]){
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-W020BWHW4V');
  }
};

// Load analytics after a delay
setTimeout(() => {
  try {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W020BWHW4V';
    script.async = true;
    script.onload = initGA;
    script.onerror = () => console.log('Analytics script failed to load');
    document.head.appendChild(script);
  } catch (error) {
    console.log('Analytics initialization error:', error);
  }
}, 3000);

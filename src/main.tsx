
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Google Analytics
const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]){
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-W020BWHW4V');
  }
};

// Initialize app
const initApp = () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    try {
      const root = createRoot(rootElement);
      root.render(<App />);
      
      // Remove loading class
      if (document.body.classList.contains('js-loading')) {
        document.body.classList.remove('js-loading');
      }
      
      // Load analytics after app is ready
      setTimeout(() => {
        try {
          const script = document.createElement('script');
          script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W020BWHW4V';
          script.async = true;
          script.onload = initGA;
          document.head.appendChild(script);
        } catch (error) {
          console.error('Analytics loading error:', error);
        }
      }, 2000);
      
    } catch (error) {
      console.error("Error rendering application:", error);
      // Fallback content
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: system-ui;">
          <h1>Luciano Tumminello</h1>
          <p>Marketing & Operations Leader</p>
          <p>Loading application...</p>
          <script>setTimeout(() => window.location.reload(), 3000);</script>
        </div>
      `;
    }
  } else {
    console.error("Root element not found");
  }
};

// Execute immediately
initApp();

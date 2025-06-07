
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found");
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div>
        <h1 style="color: #1f2937; font-size: 2rem; margin-bottom: 1rem;">Luciano Tumminello</h1>
        <p style="color: #6b7280; margin-bottom: 0.5rem;">Marketing & Operations Leader</p>
        <p style="color: #ef4444;">Error: Could not initialize application</p>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">
          Refresh Page
        </button>
      </div>
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
      <div style="padding: 20px; text-align: center; font-family: system-ui; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div>
          <h1 style="color: #1f2937; font-size: 2rem; margin-bottom: 1rem;">Luciano Tumminello</h1>
          <p style="color: #6b7280; margin-bottom: 0.5rem;">Marketing & Operations Leader</p>
          <p style="color: #ef4444; margin-bottom: 1rem;">Application loading error. Please refresh the page.</p>
          <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
}

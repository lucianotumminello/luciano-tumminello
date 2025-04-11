
/// <reference types="vite/client" />

// Extend the Window interface to include dataLayer
interface Window {
  dataLayer?: any[];
}

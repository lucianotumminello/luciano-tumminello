
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use createRoot for concurrent features
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('MandaStrong Studio PWA: Service Worker registered', registration.scope);
      },
      (error) => {
        console.log('MandaStrong Studio PWA: Service Worker registration failed', error);
      }
    );
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
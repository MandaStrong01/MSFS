import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import EditorsChoice from './pages/EditorsChoice';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Upload from './pages/Upload';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import './index.css';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('MandaStrong Studio PWA: Service Worker registered', registration.scope);

        // Check for updates every time the app loads
        registration.update();

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, reload to get latest version
                console.log('MandaStrong Studio: New version available, reloading...');
                window.location.reload();
              }
            });
          }
        });
      },
      (error) => {
        console.log('MandaStrong Studio PWA: Service Worker registration failed', error);
      }
    );
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tools" element={<Tools />} />
        <Route path="editors-choice" element={<EditorsChoice />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="about" element={<About />} />
        <Route path="upload" element={<Upload />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="disclaimer" element={<Disclaimer />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
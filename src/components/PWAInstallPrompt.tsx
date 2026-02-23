import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Zap } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      const dismissed = localStorage.getItem('pwa-banner-dismissed');
      if (!dismissed) {
        setShowBanner(true);
        setTimeout(() => setShowPopup(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    const installed = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(installed);
    if (installed) {
      setShowBanner(false);
      setShowPopup(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('To install:\n\nChrome/Edge: Click menu (⋮) > Install app\niOS Safari: Tap Share > Add to Home Screen\nFirefox: Look for install icon in address bar');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowBanner(false);
      setShowPopup(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  };

  const handleDismissPopup = () => {
    setShowPopup(false);
  };

  if (isInstalled) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#7c3aed] animate-gradient-x">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Download size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone size={16} className="text-white" />
                    <h3 className="text-white font-black uppercase text-sm">
                      Downloadable App Available
                    </h3>
                  </div>
                  <p className="text-white/90 text-xs">
                    Install MandaStrong Studio for offline access and faster performance
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleInstallClick}
                  className="bg-white text-[#7c3aed] px-4 py-2 rounded-full font-bold uppercase text-xs hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <Zap size={14} />
                  Install Now
                </button>
                <button
                  onClick={handleDismissBanner}
                  className="text-white hover:text-white/80 transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup && !showBanner && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-2xl p-6 shadow-2xl animate-bounce-slow">
            <button
              onClick={handleDismissPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-4">
              <div className="bg-[#7c3aed] p-3 rounded-xl">
                <Download size={24} className="text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-black text-white uppercase mb-2">
                  Install MandaStrong Studio
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Install our app for quick access, offline support, and the best experience!
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleInstallClick}
                    className="bg-[#7c3aed] text-white px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-[#6d28d9] transition"
                  >
                    Install App
                  </button>
                  <button
                    onClick={handleDismissPopup}
                    className="bg-transparent border border-[#7c3aed] text-[#7c3aed] px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-[#7c3aed] hover:text-white transition"
                  >
                    Not Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

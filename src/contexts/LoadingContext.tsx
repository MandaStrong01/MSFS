import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  showLoading: (message: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const showLoading = (message: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage, showLoading, hideLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 rounded-2xl p-8 shadow-2xl border border-purple-500/30 max-w-md w-full mx-4">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
              <p className="text-white text-lg font-medium text-center">{loadingMessage}</p>
              <div className="w-full bg-purple-900/50 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

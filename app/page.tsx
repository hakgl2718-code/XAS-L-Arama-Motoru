"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const QUICK_LINKS = [
  { name: 'Google', url: 'https://www.google.com/search?q=', icon: 'G', color: 'bg-blue-600', description: 'Dünyanın en iyi arama motoru.', featured: true },
  { name: 'YouTube', url: 'https://www.youtube.com', icon: 'Y', color: 'bg-red-600' },
  { name: 'Spotify', url: 'https://www.spotify.com', icon: 'S', color: 'bg-green-500' },
  { name: 'Diziler', url: 'https://www.google.com/search?q=popüler+diziler', icon: 'D', color: 'bg-indigo-600' },
  { name: 'Netflix', url: 'https://www.netflix.com', icon: 'N', color: 'bg-red-500' },
];

export default function Page() {
  const [url, setUrl] = useState('');
  const [currentSrc, setCurrentSrc] = useState('');
  const [isHome, setIsHome] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigateTo = (targetUrl: string) => {
    setHistory((prev) => [...prev, targetUrl]);
    setCurrentSrc(targetUrl);
    setUrl(targetUrl);
    setIsHome(false);
  };

  const handleGo = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!url) return;

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      if (targetUrl.includes('.') && !targetUrl.includes(' ')) {
        targetUrl = `https://${targetUrl}`;
      } else {
        targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}`;
      }
    }
    
    if (targetUrl !== currentSrc) {
      navigateTo(targetUrl);
    }
  };

  const handleBack = () => {
    if (isHome) return;
    
    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop(); // Remove current page
      
      if (newHistory.length === 0) {
        setIsHome(true);
        setUrl('');
        setCurrentSrc('');
        return newHistory;
      }
      
      const previousUrl = newHistory[newHistory.length - 1];
      setCurrentSrc(previousUrl);
      setUrl(previousUrl);
      return newHistory;
    });
  };

  const handleQuickLink = (linkUrl: string, name: string) => {
    if (name === 'Google') {
        // Special case for google search if no query
        navigateTo('https://www.google.com');
    } else {
        navigateTo(linkUrl);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0C] text-slate-200 font-sans overflow-hidden">
      {/* Branding Header */}
      <header className="pt-6 pb-4 border-b border-white/5 bg-[#0D0D0F]">
        <h1 className="text-3xl font-black tracking-[0.3em] text-center text-white mb-6 uppercase">XASİL</h1>
        
        {/* Navigation Bar */}
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            aria-label="Geri"
          >
            <span>&larr;</span> Geri
          </button>
          
          <form onSubmit={handleGo} className="relative flex-1 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="text-slate-500 text-xs font-mono">https://</span>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Arama yapın veya URL girin"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-16 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all placeholder:text-slate-600 group-hover:border-white/20 text-white"
            />
          </form>

          <button
            onClick={handleGo}
            className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200 active:scale-95 transition-all shadow-lg"
          >
            Git
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-[#050505]">
        <AnimatePresence mode="wait">
          {isHome ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-6 md:p-12 overflow-y-auto"
            >
              {/* Bento Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-auto gap-4 w-full max-w-4xl h-full max-h-[600px]">
                {QUICK_LINKS.map((link, idx) => (
                  <button
                    key={link.name}
                    onClick={() => handleQuickLink(link.url, link.name)}
                    className={`${link.featured ? 'col-span-2' : 'col-span-1'} bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col ${link.featured ? 'justify-between' : 'justify-center items-center'} hover:bg-white/[0.05] transition-all cursor-pointer group text-left relative overflow-hidden`}
                  >
                    <div className={`flex ${link.featured ? 'justify-between items-start' : 'flex-col items-center'}`}>
                      <div className={`w-12 h-12 ${link.color} rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-xl mb-4 ${link.featured ? 'mb-0' : ''}`}>
                        {link.icon}
                      </div>
                      {link.featured && (
                        <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-300">
                          Popüler
                        </div>
                      )}
                    </div>
                    <div className={link.featured ? '' : 'text-center'}>
                      <h3 className={`${link.featured ? 'text-xl' : 'text-sm'} font-bold text-white`}>{link.name}</h3>
                      {link.description && (
                        <p className="text-sm text-slate-400 mt-1">{link.description}</p>
                      )}
                    </div>
                  </button>
                ))}

                {/* New Shortcut Placeholder */}
                <div className="col-span-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-6 flex items-center gap-6 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl text-white font-light group-hover:scale-110 transition-transform">
                    +
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Yeni Kısayol</h3>
                    <p className="text-sm text-slate-400">En sevdiğiniz siteleri buraya ekleyin.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="browser"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <iframe
                ref={iframeRef}
                src={currentSrc}
                className="w-full h-full border-none"
                title="XASİL Browser Window"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation-by-user-activation"
                allow="autoplay; encrypted-media; picture-in-picture"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D0D0F] border-t border-white/5 px-6 py-3 flex justify-between items-center text-[11px] font-medium tracking-widest text-slate-500 uppercase">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Gizlilik Modu: Kapalı
          </span>
          <span>Veri Tasarrufu: Aktif</span>
        </div>
        <div className="hidden sm:block">
          <span>&copy; 2026 XASİL BROWSER V1.0</span>
        </div>
      </footer>
    </div>
  );
}

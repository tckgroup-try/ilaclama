"use client";

import React, { useEffect, useState } from "react";
import { Apple, Play, ShieldCheck, Smartphone } from "lucide-react";

export function MobileAppPromo() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
    } else {
      // Fallback for iOS or if already installed
      alert("Cihazınızda uygulamayı kurmak için tarayıcı menüsünden 'Ana Ekrana Ekle' (Add to Home Screen) seçeneğine dokunun.");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden z-10 bg-slate-900 border-y border-white/5">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand/10 via-slate-900 to-slate-900 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-brand font-semibold">
              <Smartphone className="w-4 h-4" />
              <span>Yeni Mobil Uygulamamız Yayında!</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              TCK İlaçlama Cepte: <br/>
              <span className="text-slate-400">7/24 Kesintisiz Koruma</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              İşletmenizin ve evinizin hijyen durumunu anlık takip edin, raporlarınızı (BRCGS, HACCP) görüntüleyin ve tek tuşla Acil Müdahale Ekibimizi (Acil SOS) çağırın. Android ve iOS için "TCK İlaçlama" uygulamasını hemen cihazınıza kurun.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={handleInstallClick}
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-brand/20 group cursor-pointer"
              >
                <Apple className="w-8 h-8 group-hover:text-white text-slate-300 transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Download on the</div>
                  <div className="text-lg font-semibold leading-tight">App Store</div>
                </div>
              </button>
              
              <button 
                onClick={handleInstallClick}
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-brand/20 group cursor-pointer"
              >
                <Play className="w-7 h-7 group-hover:text-brand text-slate-300 transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">GET IT ON</div>
                  <div className="text-lg font-semibold leading-tight">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="relative flex justify-center mt-12 md:mt-0">
            {/* Phone Mockup Design */}
            <div className="relative w-[280px] h-[580px] bg-slate-950 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden shadow-brand/20">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
              
              {/* Screen Content */}
              <div className="w-full h-full bg-slate-900 p-6 flex flex-col pt-12 relative">
                <div className="absolute inset-0 bg-brand/5"></div>
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="font-bold text-white text-lg">TCK<span className="text-brand">İLAÇLAMA</span></div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-brand" />
                  </div>
                </div>
                
                <div className="bg-brand text-white p-4 rounded-2xl mb-6 relative z-10 shadow-lg shadow-brand/20">
                  <div className="text-sm opacity-90 mb-1">Tesis Durumu</div>
                  <div className="text-2xl font-bold">%100 Güvenli</div>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">BRCGS Denetimi</div>
                      <div className="text-xs text-slate-400">Onaylandı - Geçerli</div>
                    </div>
                  </div>
                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Son İlaçlama</div>
                      <div className="text-xs text-slate-400">3 gün önce yapıldı</div>
                    </div>
                  </div>
                </div>
                
                {/* SOS Button */}
                <div className="mt-auto relative z-10 pb-4">
                  <button className="w-full bg-red-500/10 border border-red-500/50 text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    ACİL MÜDAHALE (SOS)
                  </button>
                </div>
              </div>
            </div>
            
            {/* Glow effects around phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[650px] bg-brand/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

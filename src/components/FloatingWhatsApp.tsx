'use client';

import { MessageCircle, PhoneCall } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <>
      {/* Phone Call (Left Side) */}
      <a
        href="tel:+905016355053"
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-16 h-16 bg-brand text-white rounded-full shadow-2xl shadow-brand/50 hover:scale-110 transition-transform duration-300 group"
        aria-label="Acil Müdahale Hattı"
      >
        <div className="absolute inset-0 bg-brand-hover rounded-full animate-ping opacity-75"></div>
        <PhoneCall className="w-8 h-8 relative z-10" />
        
        <span className="absolute left-20 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity border border-brand/30 whitespace-nowrap pointer-events-none">
          Acil Müdahale: 0501 635 50 53
        </span>
      </a>

      {/* WhatsApp (Right Side) */}
      <a
        href="https://wa.me/905016355053?text=Merhaba,%20kurumsal%20ila%C3%A7lama%20hizmeti%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl shadow-green-500/50 hover:scale-110 transition-transform duration-300 group"
        aria-label="WhatsApp Destek Hattı"
      >
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>
        <MessageCircle className="w-8 h-8 relative z-10" />
        
        <span className="absolute right-20 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity border border-[#25D366]/30 whitespace-nowrap pointer-events-none">
          Müşteri Temsilcisine Bağlan
        </span>
      </a>
    </>
  );
}

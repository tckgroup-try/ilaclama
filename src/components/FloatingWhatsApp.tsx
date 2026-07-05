'use client';

import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/905300000000?text=Merhaba,%20ila%C3%A7lama%20hizmeti%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl shadow-green-500/50 hover:scale-110 transition-transform duration-300 group"
      aria-label="WhatsApp'tan Ulaşın"
    >
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
      <MessageCircle className="w-8 h-8 relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-20 bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 whitespace-nowrap pointer-events-none">
        Usta'ya Yaz! 🐛
      </span>
    </a>
  );
}

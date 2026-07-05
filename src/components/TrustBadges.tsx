"use client";

import React from 'react';
import { motion } from 'framer-motion';

const badges = [
  "T.C. Sağlık Bakanlığı Onaylı",
  "ISO 9001:2015 Sertifikalı",
  "Bayer Protection Program",
  "%100 Memnuniyet Garantisi",
  "7/24 Acil Müdahale Ekibi",
  "Çevre Dostu Biyolojik Ajanlar",
  "Dünya Sağlık Örgütü Standartları"
];

export function TrustBadges() {
  return (
    <div className="w-full bg-brand/5 border-y border-brand/10 py-6 overflow-hidden flex items-center">
      <div className="flex w-fit animate-marquee whitespace-nowrap">
        {/* Double the array for seamless infinite scroll */}
        {[...badges, ...badges].map((badge, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 mx-8 text-zinc-400 font-medium tracking-wide uppercase text-sm"
          >
            <div className="w-2 h-2 rounded-full bg-brand" />
            {badge}
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

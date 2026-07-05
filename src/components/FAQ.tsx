"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const faqs = [
  {
    question: "Abi ilacı sıktıktan sonra evden çıkmamız lazım mı?",
    answer: "Yok abi, bizim ilaçlar kokusuzdur. Çoluk çocuğa, kediye köpeğe zararı olmaz. Sadece bazı çok ağır pire, tahtakurusu durumlarında (fümigasyon) 4 saat kapalı kalması yeterli, onun dışında rahatsınız."
  },
  {
    question: "Kullandığınız ilaçlar hayvana falan zarar verir mi?",
    answer: "Kesinlikle hayır yenge. Sağlık Bakanlığı onaylı, en kaliteli ilaçları kullanıyoruz. Canlılara zarar vermeyen özel, pahalı ilaçlardır. Merdiven altı mal kullanmayız."
  },
  {
    question: "Bu ilaçlama ne kadar süre idare eder bizi?",
    answer: "Mekanın durumuna göre 6 ay ile 1 yıl arası kesin garantili çözümdür abi. Zaten dükkan falan iş yapıyorsak periyodik anlaşırız, ömür boyu kafan rahat olur."
  },
  {
    question: "İlaçlama sonrasında temizlik yapalım mı usta?",
    answer: "Kokusuz ve leke bırakmayan jel ve sıvı attığımız için eşyaları komple yıkamana gerek yok. Sadece ıslak bezle dip köşe silmeyi 1 hafta ertele ki ilacın etkisi kalsın."
  },
  {
    question: "Gece acil dükkanı bassalar gelir misiniz?",
    answer: "7/24 arkandayız abi. Özellikle lokanta, otel, fabrika gibi üretimin durmaması gereken yerler için gece ekibimiz arabada hazır bekler."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-6">
            <HelpCircle className="w-8 h-8 text-brand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Müşterilerin Çok Sorduğu Sorular</h2>
          <p className="text-zinc-400 text-lg">
            Abi aklına ne takılıyorsa burada cevabı var. Şeffaf esnafız, gizlimiz saklımız yok.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <GlassCard 
                key={index} 
                className="p-0 overflow-hidden border border-white/5 transition-colors hover:border-brand/30"
              >
                <button
                  className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-brand' : 'text-zinc-200'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-6 text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>

        {/* FAQ JSON-LD Schema integration for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}

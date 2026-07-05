"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const faqs = [
  {
    question: "İlaçlama sonrası evi terk etmemiz gerekiyor mu?",
    answer: "Uyguladığımız kokusuz ve yeni nesil biyolojik ajanlar sayesinde evinizi veya iş yerinizi terk etmenize gerek kalmaz. Ancak sisleme (fümigasyon) gibi özel operasyonlarda minimum 4 saat kapalı kalması gerekmektedir."
  },
  {
    question: "Kullandığınız ilaçlar evcil hayvanlara zarar verir mi?",
    answer: "Kesinlikle hayır. TCK İlaçlama laboratuvarlarında kullanılan tüm ürünler T.C. Sağlık Bakanlığı ve Dünya Sağlık Örgütü (WHO) standartlarında olup, sıcakkanlı canlılara (insan, kedi, köpek vb.) zarar vermeyen özel formülasyonlardır."
  },
  {
    question: "İlaçlamanın etkisi ne kadar sürer?",
    answer: "Seçilen haşere türüne ve operasyonun yapıldığı alanın fiziksel şartlarına bağlı olarak koruma kalkanımız 6 ay ile 1 yıl arasında kesin etkinlik gösterir. Kurumsal anlaşmalarda bu koruma periyodik olarak ömür boyu sürdürülür."
  },
  {
    question: "İlaçlama sonrasında temizlik yapılmalı mı?",
    answer: "Kokusuz ve leke bırakmayan özel jeller ve mikro kapsüller kullandığımız için eşyalarınızı yıkamanıza gerek yoktur. Sadece yüzeylerde ıslak temizliği 1 hafta ertelemeniz kalkanın kalıcılığını artırır."
  },
  {
    question: "Acil durumlarda gece müdahalesi yapıyor musunuz?",
    answer: "Evet. Özellikle restoran, otel ve fabrikalar için üretimi durdurmamak adına 7/24 gece operasyon ekibimiz mevcuttur."
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
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sıkça Sorulan Sorular</h2>
          <p className="text-zinc-400 text-lg">
            Sürecimiz, güvenlik protokollerimiz ve garantilerimiz hakkında aklınıza takılan tüm cevaplar.
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

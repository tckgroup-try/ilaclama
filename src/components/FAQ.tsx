"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const faqs = [
  {
    question: "İlaçlama sonrasında alanı terk etmemiz gerekiyor mu?",
    answer: "Hayır. Kullandığımız özel solüsyonlar kokusuzdur ve insan, çocuk veya evcil hayvan sağlığına zarar vermez. Yalnızca endüstriyel fümigasyon uygulamalarında alanın 4 saat kapalı kalması gerekmektedir."
  },
  {
    question: "Gıda üretim hatlarını veya otel odalarını mesai saatleri içinde ilaçlayabilir misiniz?",
    answer: "Evet. Özel jel formülasyonlarımız ve kokusuz ULV sistemlerimiz sayesinde, üretim veya hizmet operasyonunuzu zerre kadar aksatmadan 7/24 gizlilik içerisinde (sivil araçlarla) ilaçlama yapabiliyoruz."
  },
  {
    question: "Kullanılan ilaçlar evcil hayvanlara zarar verir mi?",
    answer: "Asla. TCK İlaçlama olarak, Sağlık Bakanlığı ve Dünya Sağlık Örgütü (WHO) onaylı, sadece spesifik haşere ve kemirgenlerin sinir sistemini hedef alan ekolojik ürünler kullanmaktayız."
  },
  {
    question: "Hizmetleriniz garantili mi? Sorun devam ederse ne yapıyorsunuz?",
    answer: "Evet, tüm uygulamalarımız %100 memnuniyet ve kesin çözüm garantilidir. Belirlenen periyotlarda yapılan müdahalelere rağmen sorun devam ederse, ücretsiz ek müdahale ve acil SOS destek ekibimizi anında gönderiyoruz."
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
          <p className="text-slate-400 text-lg">
            Hizmetlerimiz, kullanılan yöntemler ve güvenlik protokollerimiz hakkında en çok merak edilen soruların yanıtlarını aşağıda bulabilirsiniz.
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
                  <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-brand' : 'text-slate-200'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand' : ''}`} 
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
                      <div className="px-8 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
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

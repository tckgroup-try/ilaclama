"use client";

import React, { useState, useMemo } from "react";
import { Star, Quote, Building2, Factory, Utensils, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";

type IndustryFilter = 'all' | 'industrial' | 'hospitality' | 'food';

interface Review {
  id: number;
  name: string;
  company: string;
  role: string;
  category: IndustryFilter;
  comment: string;
  icon: React.ReactNode;
  rating: number;
  tags: string[];
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    company: "Yıldız Gıda Lojistik A.Ş.",
    role: "Tesis Müdürü",
    category: "industrial",
    comment: "BRCGS denetimi öncesi fabrikamızda ciddi bir kemirgen riski vardı. TCK İlaçlama'nın acil müdahale ekibi sayesinde denetimden tam puan alarak geçtik. Kokusuz fümigasyon sistemleri inanılmaz başarılı.",
    icon: <Factory className="w-6 h-6 text-rose-400" />,
    rating: 5,
    tags: ["BRCGS Uyumlu", "Kemirgen İstasyonları"]
  },
  {
    id: 2,
    name: "Selin Karaca",
    company: "Bosphorus Premium Hotel",
    role: "Genel Müdür",
    category: "hospitality",
    comment: "Otel misafirlerimizin konforu bizim için her şeydir. TCK İlaçlama ekipleri gece yarısı sivil araçlarla gelip tüm süreci sessizce hallediyor. Gerçek anlamda profesyonel ve kurumsal bir ilaçlama hizmeti alıyoruz.",
    icon: <Building2 className="w-6 h-6 text-blue-400" />,
    rating: 5,
    tags: ["Gizli Müdahale", "7/24 Hizmet"]
  },
  {
    id: 3,
    name: "Mehmet Demir",
    company: "Lezzet Mutfağı Zincirleri",
    role: "Operasyon Direktörü",
    category: "food",
    comment: "HACCP standartlarına uygunluk konusunda daha önce birçok firmayla çalıştık ama TCK'nın kullandığı dijital takip sistemi ve jel formülleri gerçekten rakipsiz. 15 şubemizin tamamı onlara emanet.",
    icon: <Utensils className="w-6 h-6 text-amber-400" />,
    rating: 5,
    tags: ["HACCP Uyumu", "Dijital Raporlama"]
  },
  {
    id: 4,
    name: "Caner Tekin",
    company: "Ege Depolama ve Antrepo",
    role: "Tesis Müdürü",
    category: "industrial",
    comment: "Büyük ölçekli antrepolarımızda unlu mamul hammaddeleri saklıyoruz. TCK İlaçlama'nın periyodik koruma sistemi sayesinde denetimlerden sıfır bulguyla geçiyoruz.",
    icon: <Factory className="w-6 h-6 text-emerald-400" />,
    rating: 5,
    tags: ["Periyodik Koruma", "Antrepo İlaçlama"]
  },
  {
    id: 5,
    name: "Burak Taran",
    company: "Grand Palace Resort & Spa",
    role: "Genel Koordinatör",
    category: "hospitality",
    comment: "5 yıldızlı tesisimizde sıfır toleransla çalışıyoruz. TCK'nın uyguladığı gizli müdahale protokolü sayesinde misafirlerimize hiçbir rahatsızlık vermeden tam koruma sağlıyoruz.",
    icon: <Building2 className="w-6 h-6 text-indigo-400" />,
    rating: 5,
    tags: ["0 Tolerans", "Kokusu Olmayan Solüsyonlar"]
  },
  {
    id: 6,
    name: "Aylin Kaya",
    company: "Gastro Gıda A.Ş. Üretim Hattı",
    role: "Kalite Kontrol Yöneticisi",
    category: "food",
    comment: "HACCP ve BRCGS standartlarında üretim yapıyoruz. Dijital raporlama portalı üzerinden anlık istasyon kontrollerini takip edebilmemiz işimizi inanılmaz kolaylaştırıyor.",
    icon: <Utensils className="w-6 h-6 text-teal-400" />,
    rating: 5,
    tags: ["BRCGS & HACCP", "Dijital İstasyon Takibi"]
  }
];

const partnerLogos = [
  "Yıldız Lojistik",
  "Bosphorus Premium",
  "Lezzet Group",
  "Global Foods",
  "Ege Gıda",
  "Marmara Antrepo",
  "Mega Port Depolama",
  "Grand Palace Resort",
  "Gastro A.Ş.",
  "TechLogistics"
];

export function Testimonials() {
  const [activeTab, setActiveTab] = useState<IndustryFilter>('all');

  const filteredReviews = useMemo(() => {
    if (activeTab === 'all') return reviews;
    return reviews.filter(r => r.category === activeTab);
  }, [activeTab]);

  return (
    <section className="py-24 relative overflow-hidden z-10 bg-slate-950">
      {/* Infinite Scroll CSS Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand/20 bg-brand/5 text-sm text-brand font-semibold mb-6">
            <Star className="w-4 h-4 fill-brand text-brand" />
            <span>100+ Kurumsal Referans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            İşletmeler Neden <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-300">TCK İlaçlama'yı</span> Seçiyor?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Türkiye'nin önde gelen fabrikaları, otelleri ve restoran zincirleri hijyen standartlarını bizimle güvence altına alıyor.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Tüm Referanslar' },
            { id: 'industrial', label: 'Fabrika & Depolama' },
            { id: 'hospitality', label: 'Otel & Konaklama' },
            { id: 'food', label: 'Gıda & Restoran' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as IndustryFilter)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                activeTab === tab.id
                  ? 'bg-brand border-brand text-white shadow-lg shadow-brand/20'
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonial Cards Grid with AnimatePresence */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <GlassCard className="relative p-8 border-white/5 hover:border-brand/30 group h-full flex flex-col justify-between">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-800/20 group-hover:text-brand/10 transition-colors pointer-events-none" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-brand/30 transition-all">
                        {review.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight group-hover:text-brand transition-colors">
                          {review.company}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{review.name} - {review.role}</p>
                      </div>
                    </div>
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    
                    {/* Comment */}
                    <p className="text-slate-300 leading-relaxed italic text-sm mb-6">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {review.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/5 text-[10px] font-medium text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Corporate Infinite Logo Marquee */}
        <div className="mt-20 border-t border-white/5 pt-12">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
            Güvenliği Denetlenmiş ve Tescillenmiş Kurumlar
          </p>
          
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="animate-marquee flex gap-12 items-center">
              {/* First loop */}
              {partnerLogos.map((logo, index) => (
                <div 
                  key={`logo-1-${index}`} 
                  className="flex items-center gap-2 bg-slate-900/40 border border-white/5 rounded-2xl py-3 px-6 text-slate-400 hover:text-white hover:border-brand/30 transition-all font-semibold tracking-wider text-sm cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                  {logo}
                </div>
              ))}
              {/* Second loop to ensure infinite scroll */}
              {partnerLogos.map((logo, index) => (
                <div 
                  key={`logo-2-${index}`} 
                  className="flex items-center gap-2 bg-slate-900/40 border border-white/5 rounded-2xl py-3 px-6 text-slate-400 hover:text-white hover:border-brand/30 transition-all font-semibold tracking-wider text-sm cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center max-w-5xl mx-auto">
          {[
            { label: 'BRCGS & HACCP Uyum', desc: '%100 Denetim Garantisi' },
            { label: '7/24 Kesintisiz Destek', desc: 'Gece/Gündüz Müdahale' },
            { label: 'QR Kodlu Takip', desc: 'Dijital Rapor Arşivi' },
            { label: 'Sağlık Bakanlığı Onay', desc: 'Ruhsatlı Solüsyonlar' }
          ].map((badge, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/40">
              <div className="text-sm font-bold text-white">{badge.label}</div>
              <div className="text-[10px] text-brand font-medium mt-1">{badge.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

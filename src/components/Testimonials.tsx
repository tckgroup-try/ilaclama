"use client";

import React from "react";
import { Star, Quote, Building2, Factory, Utensils } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

const reviews = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    company: "Yıldız Gıda Lojistik A.Ş.",
    role: "Tesis Müdürü",
    comment: "BRCGS denetimi öncesi fabrikamızda ciddi bir kemirgen riski vardı. TCK İlaçlama'nın acil müdahale ekibi sayesinde denetimden tam puan alarak geçtik. Kokusuz fümigasyon sistemleri inanılmaz başarılı.",
    icon: <Factory className="w-6 h-6 text-emerald-400" />,
    rating: 5,
  },
  {
    id: 2,
    name: "Selin Karaca",
    company: "Bosphorus Premium Hotel",
    role: "Genel Müdür",
    comment: "Otel misafirlerimizin konforu bizim için her şeydir. TCK İlaçlama ekipleri gece yarısı sivil araçlarla gelip tüm operasyonu sessizce hallediyor. Gerçek bir premium laboratuvar hizmeti alıyoruz.",
    icon: <Building2 className="w-6 h-6 text-blue-400" />,
    rating: 5,
  },
  {
    id: 3,
    name: "Mehmet Demir",
    company: "Lezzet Mutfağı Zincirleri",
    role: "Operasyon Direktörü",
    comment: "HACCP standartlarına uygunluk konusunda daha önce birçok firmayla çalıştık ama TCK'nın kullandığı dijital takip sistemi ve jel formülleri gerçekten rakipsiz. 15 şubemizin tamamı onlara emanet.",
    icon: <Utensils className="w-6 h-6 text-orange-400" />,
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden z-10 bg-slate-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-brand font-semibold mb-6">
            <Star className="w-4 h-4 fill-brand" />
            <span>100+ Kurumsal Referans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            İşletmeler Neden <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-300">TCK İlaçlama'yı</span> Seçiyor?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Türkiye'nin önde gelen fabrikaları, otelleri ve restoran zincirleri hijyen standartlarını bizimle güvence altına alıyor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <GlassCard key={review.id} className="relative p-8 border-white/5 hover:border-brand/30 group">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-800/50 group-hover:text-brand/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                  {review.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{review.company}</h3>
                  <p className="text-sm text-brand">{review.name} - {review.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-300 leading-relaxed italic">
                "{review.comment}"
              </p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Fake generic corporate logos for prestige */}
            <div className="text-xl font-black tracking-widest font-serif">HOTEL<span className="text-brand">PREMIUM</span></div>
            <div className="text-xl font-black tracking-tight border-2 border-current px-2">TECHNO LOGISTICS</div>
            <div className="text-xl font-bold uppercase tracking-widest italic">Global Foods A.Ş.</div>
            <div className="text-xl font-black tracking-widest text-slate-300">+97 Kurumsal İş Ortağı</div>
          </div>
        </div>
      </div>
    </section>
  );
}

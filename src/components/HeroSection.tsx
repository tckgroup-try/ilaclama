"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { RoseButton } from './ui/RoseButton';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BackgroundBeams } from './ui/BackgroundBeams';

const SLIDES = [
  {
    image: "/images/istanbul-ev-bocek-ilaclama-hizmeti.webp",
    alt: "İstanbul ev böcek ilaçlama hizmeti - TCK İlaçlama Sağlık Bakanlığı Onaylı Uzman Ekibi",
    title: "İstanbul Ev Böcek İlaçlama Hizmeti",
    heading: "Uluslararası Denetim Standartlarına Tam Uyum",
    badge: "BRCGS, HACCP, IFS, ISO Belgeli Koruma"
  },
  {
    image: "/images/kurumsal-ofis-pest-kontrol-firmasi.webp",
    alt: "Kurumsal ofis pest kontrol firması - TCK İlaçlama Plaza ve İşyeri İlaçlama Servisi",
    title: "Kurumsal Ofis Pest Kontrol Firması",
    heading: "Kurumsal Alanlarda Sıfır Haşere Toleransı",
    badge: "Ofis, Fabrika ve Depolar İçin IPM Çözümleri"
  },
  {
    image: "/images/fabrika-ve-gida-tesisi-ilaclama-servisi.webp",
    alt: "Fabrika ve gıda tesisi ilaçlama servisi - TCK İlaçlama Profesyonel Endüstriyel Hijyen Uygulaması",
    title: "Fabrika ve Gıda Tesisi İlaçlama Servisi",
    heading: "Hassas Üretim Tesislerinde Kesin Güvence",
    badge: "Gıda Güvenliği Standartlarında Biyosidal Uygulama"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Beams & Particles */}
      <BackgroundBeams />
      <div className="absolute inset-0 bg-slate-50 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/40 via-slate-50 to-white z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-[128px] z-0" />
      
      <div className="container relative z-10 px-4 mx-auto text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand/30 text-sm font-semibold text-brand shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <ShieldCheck className="w-4 h-4" />
            <span>Sağlık Bakanlığı Onaylı Böcek ve Haşere İlaçlama</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
            İstanbul&apos;da
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-emerald-500 to-emerald-600">
              Kesin İlaçlama Çözümü
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
            Fare, hamam böceği, tahtakurusu, pire — ne olursa olsun. İstanbul’un 28 ilçesinde 45 dakikada sahaya çıkıyoruz. Kokusuz, lekesiz, evcil hayvan dostu ilaçlama formülleriyle <strong>%100 kesin çözüm garantisi</strong> veriyoruz.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
            <a
              href="/iletisim"
              className="w-full sm:w-auto"
            >
              <RoseButton className="w-full text-lg px-8">
                Ücretsiz Teklif Al
                <ArrowRight className="ml-2 w-5 h-5" />
              </RoseButton>
            </a>
            <a href="tel:+905016355053" className="w-full sm:w-auto">
              <RoseButton variant="outline" className="w-full sm:w-auto text-lg px-8">
                📞 0501 635 50 53
              </RoseButton>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 pt-6">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black text-brand">255+</span>
              <span className="text-sm text-slate-600 font-medium mt-1">Ev / Apartman<br/>Mutlu Müşteri</span>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black text-emerald-600">115+</span>
              <span className="text-sm text-slate-600 font-medium mt-1">Dükkan / İş Yeri<br/>Aktif Referans</span>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black text-emerald-500">%100</span>
              <span className="text-sm text-slate-600 font-medium mt-1">Kesin Çözüm<br/>Garantisi</span>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-sm text-slate-500 font-medium mb-4 uppercase tracking-widest">Sahip Olduğumuz Uluslararası Belgeler</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300">
                <Image src="/images/badge_brcgs.webp" alt="BRCGS Sertifikası" fill className="object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
              </div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300">
                <Image src="/images/badge_haccp.webp" alt="HACCP Sertifikası" fill className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
              </div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300">
                <Image src="/images/badge_ifs.webp" alt="IFS Sertifikası" fill className="object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
              </div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300">
                <Image src="/images/badge_iso.webp" alt="ISO 9001 Sertifikası" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              </div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300">
                <Image src="/images/badge_gmp.webp" alt="GMP Sertifikası" fill className="object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]" />
              </div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300">
                <Image src="/images/badge_tse.webp" alt="TSE Sertifikası" fill className="object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="hidden md:block relative h-[600px] w-full rounded-3xl overflow-hidden glass-panel border-slate-200 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={SLIDES[currentSlide].image} 
                alt={SLIDES[currentSlide].alt} 
                title={SLIDES[currentSlide].title} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-10" />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                 <div className="text-xs font-bold text-brand uppercase tracking-wider mb-2">
                   {SLIDES[currentSlide].badge}
                 </div>
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-brand flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-slate-800 leading-tight">{SLIDES[currentSlide].heading}</h3>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="absolute top-6 right-6 z-30 flex gap-1.5 bg-black/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-brand scale-125' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Slayt ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

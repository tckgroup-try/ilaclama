"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RoseButton } from './ui/RoseButton';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-12 md:pt-20 md:pb-0">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-slate-900 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900 z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[128px] z-0" />
      
      <div className="container relative z-10 px-4 mx-auto text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-300">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>Entegre Zararlı Yönetimi (IPM) Uzmanları</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            İşletmeniz İçin <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">
              Proaktif Koruma
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
            Zararlı kontrolünü sadece bir saha uygulaması olarak değil, marka itibarınızın ve kalite yönetiminizin temel unsuru olarak ele alıyoruz. BRCGS, HACCP ve IFS standartlarına tam uyumlu, kalıcı ve garantili çözümler.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
            <a 
              href="https://wa.me/905300000000?text=Merhaba,%20ila%C3%A7lama%20hizmetleri%20i%C3%A7in%20fiyat%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <RoseButton className="w-full text-lg px-8">
                Hemen Fiyat Al
                <ArrowRight className="ml-2 w-5 h-5" />
              </RoseButton>
            </a>
            <Link href="/hizmetler">
              <RoseButton variant="outline" className="w-full sm:w-auto text-lg px-8">
                Hizmetlerimiz
              </RoseButton>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center md:justify-start gap-6 opacity-70">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wider text-slate-400">BRCGS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wider text-slate-400">HACCP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wider text-slate-400">IFS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wider text-slate-400">ISO 9001</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden md:block relative h-[600px] w-full rounded-3xl overflow-hidden glass-panel border-white/5 shadow-2xl"
        >
          <Image 
            src="/images/hero.png" 
            alt="İleri Düzey Koruma Kalkanı Laboratuvarı" 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
          <div className="absolute bottom-8 left-8 right-8 z-20">
             <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-8 h-8 text-brand" />
                <div className="text-xl font-light text-slate-200">Uluslararası Denetim Standartlarına Tam Uyum</div>
             </div>
             <div className="h-1 w-full bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-md">
                <motion.div 
                  className="h-full bg-brand" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

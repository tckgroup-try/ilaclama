"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RoseButton } from './ui/RoseButton';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-zinc-900 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-zinc-900 z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[128px] z-0" />
      
      <div className="container relative z-10 px-4 mx-auto text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>İstanbul'un En Kral İlaçlama Ustaları</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Kökünden Çözüm, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400">
              Kesin Garanti!
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed">
            Abi evi, dükkanı böcek mi bastı? Hiç canını sıkma. Kokusuz, garantili ilacımızla giriyoruz, kökünü kazıyıp çıkıyoruz. Sen çayını yudumlarken biz işi bitiririz.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/teklif-al">
              <RoseButton className="w-full sm:w-auto text-lg px-8">
                Hemen Fiyat Al
                <ArrowRight className="ml-2 w-5 h-5" />
              </RoseButton>
            </Link>
            <Link href="/hizmetler">
              <RoseButton variant="outline" className="w-full sm:w-auto text-lg px-8">
                Neler Yapıyoruz?
              </RoseButton>
            </Link>
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
            className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
          <div className="absolute bottom-8 left-8 right-8 z-20">
             <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-8 h-8 text-brand" />
                <div className="text-xl font-light text-zinc-200">TCK İlaçlama Mekanda!</div>
             </div>
             <div className="h-1 w-full bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-md">
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

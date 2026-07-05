"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { RoseButton } from './ui/RoseButton';
import { Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CostEstimator() {
  const [area, setArea] = useState<number>(100);
  const [pestType, setPestType] = useState<string>('yuruyen');

  // Basit bir fiyat hesaplama algoritması (Gösterim amaçlı)
  const basePrice = 1500; // Minimum servis ücreti
  const multiplier = pestType === 'kemirgen' ? 1.5 : pestType === 'ozel' ? 2.5 : 1.2;
  const areaFactor = area > 100 ? (area - 100) * 15 : 0; // 100m2 üstü her m2 için 15 TL
  
  const estimatedTotal = Math.floor(basePrice + (areaFactor * multiplier));

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-brand/5 skew-y-3 transform origin-bottom-left z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-6">
            <Calculator className="w-8 h-8 text-brand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Etkileşimli Maliyet Analizi</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Alan büyüklüğü ve haşere türüne göre tahmini operasyon maliyetinizi saniyeler içinde hesaplayın.
          </p>
        </div>

        <GlassCard className="max-w-4xl mx-auto p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Sol Taraf: Kontroller */}
            <div className="space-y-8">
              <div>
                <label className="flex justify-between text-sm font-medium text-zinc-300 mb-4">
                  <span>Tahmini Alan Büyüklüğü</span>
                  <span className="text-brand font-bold">{area} m²</span>
                </label>
                <input 
                  type="range" 
                  min="50" 
                  max="2000" 
                  step="50"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-brand h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>50 m²</span>
                  <span>2000+ m²</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-4">Haşere / Zararlı Türü</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPestType('yuruyen')}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${pestType === 'yuruyen' ? 'bg-brand/20 border-brand text-brand' : 'bg-zinc-800/50 border-white/5 text-zinc-400 hover:bg-zinc-800'}`}
                  >
                    Yürüyen Haşere
                  </button>
                  <button 
                    onClick={() => setPestType('ucan')}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${pestType === 'ucan' ? 'bg-brand/20 border-brand text-brand' : 'bg-zinc-800/50 border-white/5 text-zinc-400 hover:bg-zinc-800'}`}
                  >
                    Uçan Haşere
                  </button>
                  <button 
                    onClick={() => setPestType('kemirgen')}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${pestType === 'kemirgen' ? 'bg-brand/20 border-brand text-brand' : 'bg-zinc-800/50 border-white/5 text-zinc-400 hover:bg-zinc-800'}`}
                  >
                    Kemirgenler
                  </button>
                  <button 
                    onClick={() => setPestType('ozel')}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${pestType === 'ozel' ? 'bg-brand/20 border-brand text-brand' : 'bg-zinc-800/50 border-white/5 text-zinc-400 hover:bg-zinc-800'}`}
                  >
                    Özel Müdahale
                  </button>
                </div>
              </div>
            </div>

            {/* Sağ Taraf: Sonuç */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full z-0"></div>
              <div className="relative z-10 bg-zinc-900 border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center h-full">
                <span className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-2">Başlangıç Tahmini</span>
                <motion.div 
                  key={estimatedTotal}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl md:text-6xl font-bold text-white mb-4"
                >
                  ₺{estimatedTotal.toLocaleString('tr-TR')}
                </motion.div>
                <p className="text-xs text-zinc-500 mb-8 max-w-xs mx-auto">
                  * Kesin fiyatlandırma, alanda yapılacak profesyonel laboratuvar analizinden sonra belirlenir.
                </p>
                <Link href={`/teklif-al?area=${area}&type=${pestType}`} className="w-full">
                  <RoseButton className="w-full py-4 text-lg">
                    Bu Fiyatla Keşif İste
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </RoseButton>
                </Link>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

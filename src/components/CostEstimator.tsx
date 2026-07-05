"use client";

import React, { useState, useMemo } from 'react';
import { Home, Building2, Bug, ArrowRight, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { motion } from 'framer-motion';

type AreaType = 'home' | 'commercial';
type SizeRange = 'small' | 'medium' | 'large' | 'huge';
type PestSeverity = 'low' | 'medium' | 'high';

interface PestOption {
  id: string;
  name: string;
  basePrice: number;
}

const pestOptions: PestOption[] = [
  { id: 'hamambocekleri', name: 'Hamam Böceği / Kalorifer Böceği', basePrice: 400 },
  { id: 'disparazitler', name: 'Pire / Kene / Tahtakurusu', basePrice: 500 },
  { id: 'kemirgenler', name: 'Fare / Sıçan', basePrice: 450 },
  { id: 'ucanhasereler', name: 'Sinek / Sivrisinek / Karınca', basePrice: 350 },
  { id: 'genel', name: 'Genel Haşere Koruma (Kombin)', basePrice: 600 }
];

export function CostEstimator() {
  const [areaType, setAreaType] = useState<AreaType>('home');
  const [sizeRange, setSizeRange] = useState<SizeRange>('small');
  const [selectedPestId, setSelectedPestId] = useState<string>('hamambocekleri');
  const [severity, setSeverity] = useState<PestSeverity>('low');

  // Realistic price estimation logic
  const estimatedPrice = useMemo(() => {
    const pest = pestOptions.find(p => p.id === selectedPestId) || pestOptions[0];
    let price = pest.basePrice;

    // Area type multiplier
    if (areaType === 'commercial') {
      price *= 1.4;
    }

    // Size multiplier
    const sizeMultipliers = {
      small: 1.0,  // 0-75 m²
      medium: 1.25, // 75-150 m²
      large: 1.6,  // 150-250 m²
      huge: 2.2    // 250+ m²
    };
    price *= sizeMultipliers[sizeRange];

    // Severity multiplier
    const severityMultipliers = {
      low: 1.0,
      medium: 1.2,
      high: 1.4
    };
    price *= severityMultipliers[severity];

    // Round to nearest 50
    return Math.round(price / 50) * 50;
  }, [areaType, sizeRange, selectedPestId, severity]);

  const whatsappMessage = useMemo(() => {
    const pestName = pestOptions.find(p => p.id === selectedPestId)?.name || 'Haşere';
    const areaText = areaType === 'home' ? 'Konut/Daire' : 'İş Yeri/Ticari Alan';
    const sizeText = 
      sizeRange === 'small' ? '0-75 m²' : 
      sizeRange === 'medium' ? '75-150 m²' : 
      sizeRange === 'large' ? '150-250 m²' : '250+ m²';
    
    return encodeURIComponent(
      `Merhaba, web sitenizdeki hesaplama aracından fiyat teklifi aldım.\n\n` +
      `📌 Alan Türü: ${areaText}\n` +
      `📐 Alan Boyutu: ${sizeText}\n` +
      `🕷️ Haşere Türü: ${pestName}\n` +
      `💰 Hesaplanan Tahmini Fiyat: ${estimatedPrice} TL - ${estimatedPrice + 250} TL\n\n` +
      `Bu bilgilere göre randevu oluşturmak veya net teklif almak istiyorum.`
    );
  }, [areaType, sizeRange, selectedPestId, estimatedPrice]);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/40 border-t border-white/5" id="fiyat-hesapla">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand/20 bg-brand/5 text-sm text-brand font-semibold mb-6">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Şeffaf Fiyatlandırma</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            İnteraktif <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-300">Fiyat Hesaplama</span> Sihirbazı
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            İlaçlama yapılacak alanın detaylarını seçin, sürpriz maliyetlerle karşılaşmadan anında tahmini fiyat aralığınızı hesaplayın.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Controls */}
          <div className="md:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-slate-900/30 space-y-6 flex flex-col justify-between">
            
            {/* Step 1: Area Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">1. Alan Türü Seçin</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAreaType('home')}
                  className={`flex items-center justify-center gap-3 py-4 px-4 rounded-xl border text-sm font-bold transition-all ${
                    areaType === 'home'
                      ? 'border-brand bg-brand/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                      : 'border-white/5 bg-slate-950/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Konut / Ev
                </button>
                <button
                  onClick={() => setAreaType('commercial')}
                  className={`flex items-center justify-center gap-3 py-4 px-4 rounded-xl border text-sm font-bold transition-all ${
                    areaType === 'commercial'
                      ? 'border-brand bg-brand/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                      : 'border-white/5 bg-slate-950/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  İş Yeri / Ticari
                </button>
              </div>
            </div>

            {/* Step 2: Size Range */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">2. Alan Boyutu (Metrekare)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'small', label: '0-75 m²', desc: '1+1 / 2+1' },
                  { id: 'medium', label: '75-150 m²', desc: '3+1 / 4+1' },
                  { id: 'large', label: '150-250 m²', desc: 'Dubleks / Ofis' },
                  { id: 'huge', label: '250+ m²', desc: 'Villa / Depo' }
                ].map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSizeRange(size.id as SizeRange)}
                    className={`py-3 px-2 rounded-xl border transition-all flex flex-col items-center justify-center ${
                      sizeRange === size.id
                        ? 'border-brand bg-brand/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                        : 'border-white/5 bg-slate-950/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-black">{size.label}</span>
                    <span className="text-[10px] text-slate-500 font-medium mt-0.5">{size.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pest Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">3. Zararlı / Haşere Türü</label>
              <div className="relative">
                <Bug className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <select
                  value={selectedPestId}
                  onChange={(e) => setSelectedPestId(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand/50 transition-all text-sm appearance-none cursor-pointer"
                >
                  {pestOptions.map((option) => (
                    <option key={option.id} value={option.id} className="bg-slate-900 text-white">
                      {option.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l border-white/10 pl-3">
                  <span className="text-xs text-slate-500">▼</span>
                </div>
              </div>
            </div>

            {/* Step 4: Infestation Severity */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">4. Yoğunluk / İstila Derecesi</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', label: 'Hafif / Önleyici', desc: 'Tek tük görülme' },
                  { id: 'medium', label: 'Orta Derece', desc: 'Sık karşılaşma' },
                  { id: 'high', label: 'Yoğun İstila', desc: 'Yuvalanma belirtisi' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSeverity(item.id as PestSeverity)}
                    className={`py-3 px-2 rounded-xl border transition-all flex flex-col items-center justify-center text-center ${
                      severity === item.id
                        ? 'border-brand bg-brand/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                        : 'border-white/5 bg-slate-950/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-xs font-black">{item.label}</span>
                    <span className="text-[9px] text-slate-500 font-medium mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Estimated Result Display Panel */}
          <div className="md:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/50 flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="w-full space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <ShieldCheck className="w-8 h-8 text-brand" />
              </div>
              
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                  Hesaplanan Net Aralık
                </span>
                <motion.div 
                  key={estimatedPrice}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl sm:text-5xl font-black text-white mt-2 font-mono tracking-tight"
                >
                  {estimatedPrice} TL <span className="text-slate-500 text-2xl font-normal">-</span> {estimatedPrice + 250} TL
                </motion.div>
                <p className="text-xs text-slate-500 mt-2">
                  *Fiyatlara KDV dahildir. Jel ve sıvı kokusuz uygulamaların tümünü kapsar.
                </p>
              </div>
            </div>

            <div className="w-full space-y-4 pt-8 border-t border-white/5">
              <div className="text-left bg-slate-950/60 p-4 rounded-2xl space-y-2 border border-white/5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Hizmet Garantisi:</span>
                  <span className="text-white font-bold">%100 Memnuniyet</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Uygulama Süresi:</span>
                  <span className="text-white font-bold">~30-45 Dk</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Etki Başlangıcı:</span>
                  <span className="text-white font-bold">İlk 24 Saat</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <a
                  href={`https://wa.me/905016355053?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white py-4 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand/20 group"
                >
                  <span>Bu Teklifle Rezervasyon Yap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:+905016355053"
                  className="w-full flex items-center justify-center gap-2 bg-slate-950 border border-white/10 hover:bg-slate-900 text-slate-300 py-3 rounded-xl text-xs font-bold transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Müşteri Temsilcisini Ara
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

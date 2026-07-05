"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { Building2, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import Image from 'next/image';

const b2bServices = [
  { id: 'factory', slug: 'fabrika', title: 'Fabrika & Üretim Tesisleri', desc: 'Sıfır tolerans politikasıyla endüstriyel hijyen.' },
  { id: 'warehouse', slug: 'depo', title: 'Depo & Lojistik', desc: 'Kemirgen ve zararlılara karşı 7/24 aktif koruma.' },
  { id: 'restaurant', slug: 'restoran', title: 'Restoran & Gıda İşletmeleri', desc: 'Gıda güvenliği standartlarına %100 uyumlu çözümler.' },
  { id: 'office', slug: 'ofis', title: 'Ofisler & Plazalar', desc: 'Çalışan sağlığını koruyan kokusuz, mesai dışı müdahale.' },
  { id: 'marine', slug: 'gemi', title: 'Gemiler & Yatlar', desc: 'Kapalı devre sistemler için özel fümigasyon.' }
];

const b2cServices = [
  { id: 'apartment', slug: 'daire', title: 'Ev / Daire İlaçlama', desc: 'Aileniz ve evcil hayvanlarınız için güvenli jel & sıvı uygulamalar.' },
  { id: 'building', slug: 'apartman', title: 'Apartman & Site Ortak Alanları', desc: 'Kazan dairesi, sığınak ve otoparklar için periyodik koruma.' },
  { id: 'garden', slug: 'bahce', title: 'Bahçe & Peyzaj', desc: 'Kene, sivrisinek ve haşerelere karşı açık alan kalkanı.' }
];

export function ServiceTab() {
  const [activeTab, setActiveTab] = useState<'b2b' | 'b2c'>('b2b');

  const services = activeTab === 'b2b' ? b2bServices : b2cServices;

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Premium Hizmet Kapsamımız</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            İhtiyacınıza en uygun koruma kalkanını seçin. Her alan için özel geliştirilmiş protokoller uyguluyoruz.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="glass-panel p-1 rounded-2xl inline-flex relative">
            <button
              onClick={() => setActiveTab('b2b')}
              className={`relative z-10 flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-colors ${
                activeTab === 'b2b' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Kurumsal (B2B)
            </button>
            <button
              onClick={() => setActiveTab('b2c')}
              className={`relative z-10 flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-colors ${
                activeTab === 'b2c' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              <Home className="w-5 h-5" />
              Bireysel (B2C)
            </button>
            
            {/* Animated Tab Indicator */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-brand rounded-xl transition-all duration-300 ease-out z-0 ${
                activeTab === 'b2b' ? 'left-1' : 'left-[calc(50%+2px)]'
              }`}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sol Kısım: Görsel (Large ekranlarda) */}
          <div className="lg:col-span-5 relative h-[400px] lg:h-auto rounded-3xl overflow-hidden glass-panel border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image 
                  src={activeTab === 'b2b' ? '/images/b2b.png' : '/images/b2c.png'} 
                  alt={activeTab === 'b2b' ? 'Kurumsal İlaçlama' : 'Bireysel İlaçlama'}
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sağ Kısım: Kartlar */}
          <motion.div 
            layout
            className="lg:col-span-7 grid sm:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={`/hizmet/istanbul-${service.slug}-bocek-ilaclama`} className="block h-full">
                    <GlassCard hoverEffect className="h-full flex flex-col justify-between group cursor-pointer border border-white/5 hover:border-brand/30">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center text-sm font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                        Detayları İncele <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

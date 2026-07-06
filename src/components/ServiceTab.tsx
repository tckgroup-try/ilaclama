"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Home, ArrowRight, Factory, Warehouse, UtensilsCrossed, Briefcase, Ship, Building, Trees, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const b2bServices = [
  { 
    id: 'factory', slug: 'fabrika', title: 'Fabrika ve Üretim Tesisi', 
    desc: 'BRCGS ve HACCP standartlarında, üretim hattını durdurmadan 0 toleranslı endüstriyel fümigasyon ve kemirgen kalkanı.',
    icon: Factory, tags: ['%100 Uyum', 'Kokusuz', '7/24'], colSpan: 'col-span-1 sm:col-span-2'
  },
  { 
    id: 'warehouse', slug: 'depo', title: 'Lojistik & Depolama', 
    desc: 'Geniş metrekareli alanlarda termal sisleme ve akıllı kemirgen istasyonları ile kesintisiz koruma.',
    icon: Warehouse, tags: ['Termal Sisleme', 'Geniş Alan'], colSpan: 'col-span-1'
  },
  { 
    id: 'restaurant', slug: 'restoran', title: 'Otel & Restoran', 
    desc: 'Gıda güvenliği denetimlerine tam uyumlu, müşteri görmeden uygulanan gizli jel ve ULV protokolleri.',
    icon: UtensilsCrossed, tags: ['Gıda Güvenliği', 'Gizli Müdahale'], colSpan: 'col-span-1'
  },
  { 
    id: 'office', slug: 'ofis', title: 'Plaza & Ofis', 
    desc: 'Mesai saatleri dışında uygulanan, ertesi gün havalandırma gerektirmeyen kokusuz ve lekesiz ofis ilaçlaması.',
    icon: Briefcase, tags: ['Kokusuz', 'Lekesiz'], colSpan: 'col-span-1'
  },
  { 
    id: 'marine', slug: 'gemi', title: 'Gemi & Yat', 
    desc: 'Deniz taşıtlarının zorlu kamaralarında yüksek etkili, Sağlık Bakanlığı onaylı karantina fümigasyonu.',
    icon: Ship, tags: ['Fümigasyon', 'Karantina'], colSpan: 'col-span-1'
  }
];

const b2cServices = [
  { 
    id: 'apartment', slug: 'daire', title: 'Ev ve Daire Kompleksleri', 
    desc: 'Bebek, çocuk ve evcil hayvan dostu onaylı solüsyonlar ile evinizi terk etmenize gerek kalmadan %100 kesin çözüm.',
    icon: Home, tags: ['Evcil Hayvan Dostu', 'Kokusuz', 'Garantili'], colSpan: 'col-span-1 sm:col-span-2'
  },
  { 
    id: 'building', slug: 'apartman', title: 'Apartman & Site', 
    desc: 'Kazan dairesi, sığınak, asansör boşlukları ve merdiven dairelerinde toplu haşere imhası.',
    icon: Building, tags: ['Ortak Alan', 'Bodrum'], colSpan: 'col-span-1'
  },
  { 
    id: 'garden', slug: 'bahce', title: 'Bahçe & Peyzaj', 
    desc: 'Kene, pire, akrep ve sivrisineklere karşı bahçe florasına zarar vermeyen güçlü açık alan ilaçlaması.',
    icon: Trees, tags: ['Açık Alan', 'Kene & Pire'], colSpan: 'col-span-1'
  }
];

export function ServiceTab() {
  const [activeTab, setActiveTab] = useState<'b2b' | 'b2c'>('b2b');
  const services = activeTab === 'b2b' ? b2bServices : b2cServices;

  return (
    <section className="py-24 relative z-10 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-sm font-semibold mb-6">
            <ShieldAlert className="w-4 h-4 mr-2" />
            Sağlık Bakanlığı Onaylı Koruma
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Her Sektöre Özel <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-700">Taktiksel Müdahale</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Sıradan böcek ilaçlamayı unutun. İhtiyaç duyduğunuz alanı seçin, deneyimli uzman kadromuz size özel kalıcı ve garantili haşere kontrol yöntemlerini uygulasın.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="glass-panel p-1.5 rounded-2xl flex w-full sm:w-auto relative border border-slate-200 bg-white backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('b2b')}
              className={`relative z-10 flex flex-1 sm:flex-none justify-center items-center gap-2 px-6 py-4 sm:px-10 rounded-xl text-sm sm:text-base font-bold transition-colors ${
                activeTab === 'b2b' ? 'text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Kurumsal (B2B)
            </button>
            <button
              onClick={() => setActiveTab('b2c')}
              className={`relative z-10 flex flex-1 sm:flex-none justify-center items-center gap-2 px-6 py-4 sm:px-10 rounded-xl text-sm sm:text-base font-bold transition-colors ${
                activeTab === 'b2c' ? 'text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Home className="w-5 h-5" />
              Bireysel (B2C)
            </button>
            
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-brand rounded-xl transition-all duration-500 ease-out z-0 shadow-[0_0_20px_rgba(16,185,129,0.3)] ${
                activeTab === 'b2b' ? 'left-1.5' : 'left-[calc(50%+4px)]'
              }`}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Dynamic Image Panel */}
          <div className="lg:col-span-4 relative h-[400px] lg:h-auto rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image 
                  src={activeTab === 'b2b' ? '/images/tck_fabrika_ekip.png' : '/images/tck_bocek_mutfak.png'} 
                  alt={activeTab === 'b2b' ? 'Kurumsal İlaçlama' : 'Bireysel İlaçlama'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="text-3xl font-bold text-white mb-2">{activeTab === 'b2b' ? 'Endüstriyel Güç' : 'Ev Tipi Güvenlik'}</div>
                   <p className="text-slate-300 text-sm">Sağlık Bakanlığı Onaylı ve Güvenli Solüsyonlar ile Kesin Çözüm.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bento Grid Cards */}
          <motion.div 
            layout
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`${service.colSpan} block h-full`}
                  >
                    <Link href={`/hizmet/istanbul-${service.slug}-bocek-ilaclama`}>
                      <div className="h-full relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 hover:border-brand/50 hover:bg-slate-50/50 hover:shadow-xl transition-all duration-300 group p-8 flex flex-col justify-between">
                        
                        {/* Glow effect on hover */}
                        <div className="absolute -inset-px bg-gradient-to-r from-brand/0 via-brand/10 to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        
                        <div className="relative z-10">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand/20 group-hover:border-brand/30 transition-all duration-300 shadow-md">
                            <Icon className="w-7 h-7 text-slate-600 group-hover:text-brand transition-colors" />
                          </div>
                          
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                            {service.desc}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-6">
                            {service.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="relative z-10 mt-8 flex items-center text-sm font-bold text-slate-500 group-hover:text-brand transition-colors">
                          <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                            Protokolü İncele <ArrowRight className="ml-2 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

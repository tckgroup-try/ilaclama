"use client";

import React, { useState, useMemo } from 'react';
import { MapPin, Navigation, PhoneCall, ShieldCheck, Search, Compass, Activity, Clock, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import { Branch } from '@/data/branches';

interface BranchesHubProps {
  branches: Branch[];
}

const asianDistricts = [
  'kadıköy', 'pendik', 'üsküdar', 'maltepe', 'kartal', 'ümraniye', 
  'ataşehir', 'beykoz', 'şile', 'çekmeköy', 'tuzla', 'kadikoy', 
  'umraniye', 'atasehir', 'sile', 'cekmekoy'
];

export function BranchesHub({ branches }: BranchesHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<'all' | 'avrupa' | 'anadolu'>('all');
  const [selectedBranchId, setSelectedBranchId] = useState<number>(branches[0]?.id || 1);

  // Categorize branches dynamically
  const categorizedBranches = useMemo(() => {
    return branches.map(b => {
      const isAsian = asianDistricts.some(d => b.district.toLowerCase().includes(d));
      return {
        ...b,
        region: isAsian ? 'anadolu' : 'avrupa' as const
      };
    });
  }, [branches]);

  // Filter branches based on search and region tabs
  const filteredBranches = useMemo(() => {
    return categorizedBranches.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = regionFilter === 'all' || b.region === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [categorizedBranches, searchQuery, regionFilter]);

  // Find currently selected branch details
  const selectedBranch = useMemo(() => {
    return categorizedBranches.find(b => b.id === selectedBranchId) || categorizedBranches[0];
  }, [categorizedBranches, selectedBranchId]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Left panel: Filters and list */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Search & Filter Header */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/40 space-y-4 backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="İlçe veya şube adı arayın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand/50 transition-all text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setRegionFilter('all')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                regionFilter === 'all' 
                  ? 'bg-brand text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-slate-950/50 border border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tüm İstanbul ({categorizedBranches.length})
            </button>
            <button
              onClick={() => setRegionFilter('avrupa')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                regionFilter === 'avrupa' 
                  ? 'bg-brand text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-slate-950/50 border border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              Avrupa Yakası ({categorizedBranches.filter(b => b.region === 'avrupa').length})
            </button>
            <button
              onClick={() => setRegionFilter('anadolu')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                regionFilter === 'anadolu' 
                  ? 'bg-brand text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-slate-950/50 border border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              Anadolu Yakası ({categorizedBranches.filter(b => b.region === 'anadolu').length})
            </button>
          </div>
        </div>

        {/* Branch Cards Scrollable List */}
        <div className="grid sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch) => {
              const isSelected = selectedBranchId === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`glass-panel p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isSelected 
                      ? 'border-brand bg-slate-900/80 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                      : 'border-white/5 bg-slate-900/30 hover:border-brand/40 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Accent lighting for selected card */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-emerald-400 animate-pulse" />
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        isSelected 
                          ? 'bg-brand/20 border-brand text-brand' 
                          : 'bg-slate-950 border-white/5 text-slate-400 group-hover:text-slate-200 group-hover:border-white/10'
                      }`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                          {branch.region === 'anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası'}
                        </span>
                        <h4 className="font-bold text-white text-base leading-tight group-hover:text-brand transition-colors">
                          {branch.district}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-1 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                      AKTİF
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {branch.name} acil müdahale ve periyodik biyosidal dezenfeksiyon merkezi.
                  </p>

                  <div className="flex gap-2">
                    <a
                      href={branch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-slate-950 border border-white/10 hover:bg-brand hover:border-brand text-white py-2 rounded-lg text-xs font-bold transition-all"
                      onClick={(e) => e.stopPropagation()} // Stop selected card event
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Yol Tarifi
                    </a>
                    <a
                      href="tel:+905016355053"
                      className="flex items-center justify-center w-9 h-9 bg-slate-950 hover:bg-slate-900 text-white rounded-lg border border-white/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 glass-panel p-12 text-center border border-white/5 rounded-3xl">
              <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">Şube Bulunamadı</h4>
              <p className="text-slate-500 text-sm">Arama kriterlerinize uyan aktif bir operasyon merkezi bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Giant Sticky Live Operations Hub Dashboard */}
      <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-6">
        <div className="glass-panel rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-2xl overflow-hidden shadow-2xl">
          
          {/* Header Map Status Bar */}
          <div className="p-5 border-b border-white/5 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-brand animate-spin-slow" />
              <div>
                <h4 className="text-white font-bold text-sm leading-none">Canlı Şube İzleme</h4>
                <span className="text-[10px] text-slate-500 font-medium">Operasyon Yönetim Paneli</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">Hattı Çevrimiçi</span>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="h-[320px] w-full bg-slate-950 relative border-b border-white/5">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedBranch ? selectedBranch.name : 'TCK İlaçlama Kadıköy Şubesi')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) invert(0.9) contrast(1.2)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${selectedBranch ? selectedBranch.district : 'İstanbul'} Operasyon Merkezi Haritası`}
            />
          </div>

          {/* Branch Details and Live Stats */}
          <div className="p-6 space-y-6 bg-slate-950/20">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-brand">
                Seçili Bölge
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                {selectedBranch ? selectedBranch.name : 'TCK İlaçlama İstanbul'}
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                {selectedBranch ? selectedBranch.district : 'Tüm'} bölgesi ve çevresinde lisanslı mühendis ekiplerle 7/24 kesintisiz operasyon.
              </p>
            </div>

            {/* Simulated Live Analytics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand flex-shrink-0" />
                <div>
                  <span className="text-[10px] block text-slate-500 font-bold uppercase">Ort. Ulaşım</span>
                  <span className="text-sm font-black text-white">35-45 Dakika</span>
                </div>
              </div>
              
              <div className="bg-slate-950/60 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] block text-slate-500 font-bold uppercase">Ekip Durumu</span>
                  <span className="text-sm font-black text-white">3 Aktif Mobil</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={selectedBranch ? selectedBranch.url : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand/20"
              >
                <Navigation className="w-4 h-4" />
                Navigasyon ile Yol Tarifi
              </a>
              <a
                href="tel:+905016355053"
                className="flex items-center justify-center w-12 h-12 bg-slate-950 hover:bg-slate-900 border border-white/10 text-white rounded-xl transition-all"
              >
                <PhoneCall className="w-5 h-5 text-slate-300" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

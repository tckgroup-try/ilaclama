"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { RoseButton } from '@/components/ui/RoseButton';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerType: 'B2C',
    pestType: 'YURIYEN_HASERE',
    areaSizeSqM: '',
    serviceArea: '',
    fullName: '',
    phoneNumber: '',
    isUrgent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          areaSizeSqM: parseInt(formData.areaSizeSqM) || 0
        })
      });
      
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      alert("Bağlantı hatası.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative">
        <GlassCard className="max-w-lg w-full text-center p-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <CheckCircle2 className="w-24 h-24 text-brand mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Talebiniz Alındı</h2>
          <p className="text-zinc-400 mb-8">
            Operasyon ekibimiz, ilettiğiniz detayları analiz ediyor. Size en kısa sürede dönüş yapacağız.
          </p>
          <RoseButton onClick={() => window.location.href = '/'}>Ana Sayfaya Dön</RoseButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="absolute inset-0 bg-zinc-900 z-0" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand/5 rounded-full blur-[120px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-6">
            <ShieldAlert className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Acil Müdahale Talebi</h1>
          <p className="text-zinc-400 text-lg">
            Gelişmiş analiz formumuzu doldurarak, alanınıza özel laboratuvar destekli koruma protokolünü başlatın.
          </p>
        </div>

        <GlassCard className="max-w-3xl mx-auto p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Service Type */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">1. Hizmet Kapsamı</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Müşteri Tipi</label>
                  <select 
                    name="customerType" 
                    value={formData.customerType} 
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  >
                    <option value="B2C">Bireysel (Ev / Apartman)</option>
                    <option value="B2B">Kurumsal (Fabrika / Ofis vb.)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Haşere Türü</label>
                  <select 
                    name="pestType" 
                    value={formData.pestType} 
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  >
                    <option value="YURIYEN_HASERE">Yürüyen Haşere (Hamam Böceği, Karınca vb.)</option>
                    <option value="UCAN_HASERE">Uçan Haşere (Sivrisinek, Sinek, Arı vb.)</option>
                    <option value="KEMIRGEN">Kemirgen (Fare, Sıçan)</option>
                    <option value="OZEL_MUDAHALE">Özel Müdahale (Akrep, Yılan)</option>
                    <option value="DIGER">Diğer / Belirsiz</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Tahmini Alan (m²)</label>
                  <input 
                    type="number" 
                    name="areaSizeSqM" 
                    value={formData.areaSizeSqM} 
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    placeholder="Örn: 150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Hizmet Bölgesi / İlçe</label>
                  <input 
                    type="text" 
                    name="serviceArea" 
                    value={formData.serviceArea} 
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    placeholder="Örn: Şişli / İstanbul"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Contact Info */}
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">2. İletişim Bilgileri</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Ad Soyad / Firma Adı</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Telefon Numarası</label>
                  <input 
                    type="tel" 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    placeholder="0(5XX) XXX XX XX"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <input 
                  type="checkbox" 
                  id="isUrgent"
                  name="isUrgent" 
                  checked={formData.isUrgent} 
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-zinc-600 text-brand focus:ring-brand accent-brand bg-zinc-800"
                />
                <label htmlFor="isUrgent" className="text-sm font-medium text-white cursor-pointer select-none">
                  Acil müdahale gerektiriyor (Ekibimiz derhal yola çıkacaktır)
                </label>
              </div>
            </div>

            <div className="pt-8">
              <RoseButton type="submit" isLoading={isSubmitting} className="w-full py-4 text-lg">
                Talebi Gönder
              </RoseButton>
              <p className="text-center text-zinc-500 text-xs mt-4">
                Bilgileriniz 256-bit SSL ile şifrelenmektedir ve 3. şahıslarla paylaşılmaz.
              </p>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

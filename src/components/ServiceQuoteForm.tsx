'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { PHONE_HREF, PHONE_DISPLAY, WHATSAPP_QUOTE } from '@/lib/constants';
import { trackFormSubmit, trackPhoneClick } from '@/lib/analytics';

interface ServiceQuoteFormProps {
  districtName: string;
  pestName: string;
  placeName?: string;
}

export function ServiceQuoteForm({ districtName, pestName, placeName }: ServiceQuoteFormProps) {
  const [form, setForm] = useState({
    customerType: 'B2C',
    pestType: pestName.toUpperCase().replace(/\s+/g, '_'),
    serviceArea: `${districtName}${placeName ? ', ' + placeName : ''}`,
    fullName: '',
    phoneNumber: '',
    areaSizeSqM: '',
    message: `Bu talep ${districtName} ${placeName || ''} ${pestName} ilaçlama hizmet sayfasından gönderildi.`,
    isUrgent: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        trackFormSubmit(`service_widget_${pestName.toLowerCase()}`, 'success');
        setForm(prev => ({
          ...prev,
          fullName: '',
          phoneNumber: '',
          areaSizeSqM: '',
        }));
      } else {
        setStatus('error');
        trackFormSubmit(`service_widget_${pestName.toLowerCase()}`, 'error');
      }
    } catch {
      setStatus('error');
      trackFormSubmit(`service_widget_${pestName.toLowerCase()}`, 'error');
    }
  };

  return (
    <GlassCard className="p-8 border-slate-200/80 bg-white/90 backdrop-blur-md shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand to-emerald-500" />
      
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        {districtName} İçin Ücretsiz Teklif Alın
      </h3>
      <p className="text-slate-600 text-sm mb-6">
        Formu doldurun, uzman ekibimiz 10 dakika içinde sizi arayarak fiyat teklifini iletsin.
      </p>

      {status === 'success' ? (
        <div className="flex flex-col items-center text-center py-10 gap-4">
          <CheckCircle className="w-14 h-14 text-brand" />
          <h4 className="text-xl font-bold text-slate-900">Teklif Talebiniz Alındı!</h4>
          <p className="text-slate-600 text-sm max-w-xs">
            {districtName} bölge teknisyenimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          <a href={PHONE_HREF} className="text-brand font-bold mt-2 hover:underline">
            📞 {PHONE_DISPLAY}
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ad Soyad */}
          <div>
            <label htmlFor="widget-fullName" className="block text-xs font-semibold text-slate-700 mb-1">Ad Soyad</label>
            <input
              id="widget-fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="Ahmet Yılmaz"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
            />
          </div>

          {/* Telefon */}
          <div>
            <label htmlFor="widget-phoneNumber" className="block text-xs font-semibold text-slate-700 mb-1">Telefon Numarası</label>
            <input
              id="widget-phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="05XX XXX XX XX"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
            />
          </div>

          {/* Alan m2 */}
          <div>
            <label htmlFor="widget-areaSizeSqM" className="block text-xs font-semibold text-slate-700 mb-1">Yaklaşık Alan (m²)</label>
            <input
              id="widget-areaSizeSqM"
              name="areaSizeSqM"
              type="number"
              value={form.areaSizeSqM}
              onChange={handleChange}
              placeholder="120"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
            />
          </div>

          {/* Acil seçeneği */}
          <label className="flex items-center gap-2 cursor-pointer group mt-2">
            <input
              type="checkbox"
              name="isUrgent"
              checked={form.isUrgent}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 accent-brand"
            />
            <span className="text-xs text-slate-700 group-hover:text-brand transition-colors">
              ⚡ <strong>Acil müdahale</strong> istiyorum (aynı gün)
            </span>
          </label>

          {status === 'error' && (
            <div className="flex items-center gap-1.5 text-red-600 bg-red-50 border border-red-100 rounded-lg p-2.5 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Bir hata oluştu. Telefon ile arayabilirsiniz: {PHONE_DISPLAY}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 bg-brand text-white font-bold text-sm py-3 rounded-lg hover:bg-brand/90 disabled:opacity-60 transition-all shadow-md shadow-brand/10"
          >
            {status === 'loading' ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Ücretsiz Teklif Talebi Gönder
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>7/24 Aktif Hat</span>
            <a href={PHONE_HREF} onClick={() => trackPhoneClick('service_widget_footer')} className="text-slate-600 hover:text-brand font-medium">{PHONE_DISPLAY}</a>
          </div>
        </form>
      )}
    </GlassCard>
  );
}

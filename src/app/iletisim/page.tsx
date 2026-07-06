'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Send, MessageCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import Script from 'next/script';
import {
  PHONE_HREF, PHONE_DISPLAY, PHONE_RAW,
  WHATSAPP_QUOTE, COMPANY_EMAIL,
  ADDRESS_STREET, ADDRESS_DISTRICT, ADDRESS_CITY,
  ADDRESS_POSTAL, COMPANY_DOMAIN
} from '@/lib/constants';
import { trackFormSubmit, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics';

const PEST_OPTIONS = [
  { value: 'UCAN_HASERE', label: '🦟 Uçan Haşere (Sivrisinek, Karasinek, Arı)' },
  { value: 'YURIYEN_HASERE', label: '🪳 Yürüyen Haşere (Hamam Böceği, Karınca)' },
  { value: 'KEMIRGEN', label: '🐀 Kemirgen (Fare, Sıçan)' },
  { value: 'OZEL_MUDAHALE', label: '🦂 Özel Müdahale (Akrep, Yılan, Kene)' },
  { value: 'DIGER', label: '❓ Diğer / Bilmiyorum' },
];

export default function IletisimPage() {
  const [form, setForm] = useState({
    customerType: 'B2C',
    pestType: '',
    serviceArea: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    areaSizeSqM: '',
    message: '',
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
        trackFormSubmit('iletisim_page_form', 'success');
        setForm({ customerType: 'B2C', pestType: '', serviceArea: '', fullName: '', phoneNumber: '', email: '', areaSizeSqM: '', message: '', isUrgent: false });
      } else {
        setStatus('error');
        trackFormSubmit('iletisim_page_form', 'error');
      }
    } catch {
      setStatus('error');
      trackFormSubmit('iletisim_page_form', 'error');
    }
  };

  return (
    <>
      <Script id="contact-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "TCK İlaçlama İletişim",
        "url": `${COMPANY_DOMAIN}/iletisim`,
        "description": "TCK İlaçlama ile iletişime geçin. İstanbul genelinde 7/24 haşere ilaçlama hizmetleri için ücretsiz teklif alın.",
        "mainEntity": {
          "@type": "LocalBusiness",
          "name": "TCK İlaçlama",
          "telephone": `+${PHONE_RAW}`,
          "email": COMPANY_EMAIL,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": ADDRESS_STREET,
            "addressLocality": ADDRESS_DISTRICT,
            "addressRegion": ADDRESS_CITY,
            "postalCode": ADDRESS_POSTAL,
            "addressCountry": "TR"
          }
        }
      })}} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand border border-brand/20 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <Phone className="w-4 h-4" />
            7/24 Hızlı Müdahale Hattı
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Ücretsiz Teklif Alın
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            İstanbul&apos;un her ilçesinde profesyonel ilaçlama ekiplerimiz, talebinize 45 dakika içinde ulaşır.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={PHONE_HREF}
              id="iletisim-tel-hero-btn"
              onClick={() => trackPhoneClick('iletisim_hero')}
              className="inline-flex items-center gap-2 bg-brand text-white font-bold px-6 py-3 rounded-xl hover:bg-brand/90 transition-all shadow-lg shadow-brand/20"
            >
              <Phone className="w-5 h-5" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_QUOTE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('iletisim_hero')}
              id="iletisim-whatsapp-hero-btn"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp&apos;tan Yaz
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">İletişim Bilgileri</h2>
              
              <GlassCard className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Telefon</p>
                  <a href={PHONE_HREF} onClick={() => trackPhoneClick('iletisim_info_card')} className="text-brand hover:underline font-bold text-lg">{PHONE_DISPLAY}</a>
                  <p className="text-slate-500 text-sm mt-1">7/24 Acil Hat</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">WhatsApp</p>
                  <a href={`https://wa.me/${PHONE_RAW}`} onClick={() => trackWhatsAppClick('iletisim_info_card')} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-bold">Hızlı Mesaj Gönder</a>
                  <p className="text-slate-500 text-sm mt-1">Ortalama yanıt: 5 dakika</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">E-Posta</p>
                  <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand hover:underline">{COMPANY_EMAIL}</a>
                  <p className="text-slate-500 text-sm mt-1">Kurumsal teklifler için</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Merkez Ofis</p>
                  <p className="text-slate-600">{ADDRESS_STREET}</p>
                  <p className="text-slate-600">{ADDRESS_DISTRICT} / {ADDRESS_CITY}</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Çalışma Saatleri</p>
                  <p className="text-slate-600">Pazartesi – Pazar</p>
                  <p className="text-brand font-bold">00:00 – 24:00 (7/24)</p>
                </div>
              </GlassCard>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Ücretsiz Teklif Formu</h2>
                <p className="text-slate-500 mb-8">Formu doldurun, ekibimiz sizi en kısa sürede arasın.</p>

                {status === 'success' ? (
                  <div className="flex flex-col items-center text-center py-12 gap-4">
                    <CheckCircle className="w-16 h-16 text-brand" />
                    <h3 className="text-2xl font-bold text-slate-900">Talebiniz Alındı!</h3>
                    <p className="text-slate-600 max-w-sm">Ekibimiz en kısa sürede sizi arayacak. Acil durumlarda <strong><a href={PHONE_HREF} className="text-brand hover:underline">{PHONE_DISPLAY}</a></strong> numarasını arayabilirsiniz.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" id="iletisim-teklif-formu">
                    {/* Müşteri Tipi */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Müşteri Tipi</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ val: 'B2C', label: '🏠 Bireysel' }, { val: 'B2B', label: '🏢 Kurumsal' }].map(opt => (
                          <label key={opt.val} className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.customerType === opt.val ? 'border-brand bg-brand/5 text-brand font-bold' : 'border-slate-200 text-slate-600 hover:border-brand/40'}`}>
                            <input type="radio" name="customerType" value={opt.val} checked={form.customerType === opt.val} onChange={handleChange} className="hidden" />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Haşere Türü */}
                    <div>
                      <label htmlFor="pestType" className="block text-sm font-semibold text-slate-700 mb-2">Sorun Türü <span className="text-red-500">*</span></label>
                      <select id="pestType" name="pestType" value={form.pestType} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all">
                        <option value="">Sorun türünü seçin...</option>
                        {PEST_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>

                    {/* Ad + Telefon */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">Ad Soyad <span className="text-red-500">*</span></label>
                        <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} required placeholder="Ahmet Yılmaz" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">Telefon <span className="text-red-500">*</span></label>
                        <input id="phoneNumber" name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange} required placeholder="0501 635 50 53" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
                      </div>
                    </div>

                    {/* Email + Alan */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">E-Posta <span className="text-slate-400 font-normal">(opsiyonel)</span></label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="ornek@sirket.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
                      </div>
                      <div>
                        <label htmlFor="areaSizeSqM" className="block text-sm font-semibold text-slate-700 mb-2">Alan (m²) <span className="text-slate-400 font-normal">(opsiyonel)</span></label>
                        <input id="areaSizeSqM" name="areaSizeSqM" type="number" value={form.areaSizeSqM} onChange={handleChange} placeholder="120" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
                      </div>
                    </div>

                    {/* Bölge */}
                    <div>
                      <label htmlFor="serviceArea" className="block text-sm font-semibold text-slate-700 mb-2">İlçe / Adres <span className="text-red-500">*</span></label>
                      <input id="serviceArea" name="serviceArea" type="text" value={form.serviceArea} onChange={handleChange} required placeholder="Kadıköy, Moda Mahallesi..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
                    </div>

                    {/* Mesaj */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Ek Bilgi <span className="text-slate-400 font-normal">(opsiyonel)</span></label>
                      <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Sorununuzu kısaca açıklayın..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none" />
                    </div>

                    {/* Acil Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" name="isUrgent" checked={form.isUrgent} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 accent-brand" />
                      <span className="text-slate-700 group-hover:text-brand transition-colors">
                        ⚡ <strong>Acil müdahale</strong> istiyorum (aynı gün)
                      </span>
                    </label>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span className="text-sm">Bir hata oluştu. Lütfen telefon ile ulaşın: <strong><a href={PHONE_HREF} className="text-red-700">{PHONE_DISPLAY}</a></strong></span>
                      </div>
                    )}

                    <button
                      type="submit"
                      id="iletisim-form-gonder-btn"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 bg-brand text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-brand/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand/25"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Ücretsiz Teklif Al
                        </>
                      )}
                    </button>
                  </form>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

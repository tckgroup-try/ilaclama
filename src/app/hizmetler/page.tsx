import { ServiceTab } from '@/components/ServiceTab';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Profesyonel İlaçlama Hizmetleri | TCK İlaçlama',
  description: 'Kurumsal ve bireysel alanlarda garantili böcek, kemirgen ve haşere ilaçlama çözümleri.',
};

export default function HizmetlerPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-300 mb-6">
          <ShieldCheck className="w-4 h-4 text-brand" />
          <span>Uzman Mühendislik Kadrosu</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Kapsamlı <span className="text-brand">Hizmet</span> Ağımız
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          İşletmelerin faaliyetlerini aksatmadan, yaşam alanlarınızda ise günlük yaşamınızı etkilemeden profesyonel ve kokusuz ilaçlama çözümleri sunuyoruz.
        </p>
      </div>
      
      {/* ServiceTab bileşeni tüm hizmetleri sekmeli yapıda gösterecektir */}
      <ServiceTab />
    </div>
  );
}

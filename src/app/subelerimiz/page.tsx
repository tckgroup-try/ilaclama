import { Metadata } from 'next';
import { tckBranches } from '@/data/branches';
import { MapPin } from 'lucide-react';
import { BranchesHub } from '@/components/BranchesHub';

export const metadata: Metadata = {
  title: 'Şubelerimiz ve Operasyon Merkezlerimiz | TCK İlaçlama',
  description: 'İstanbul genelindeki 28 farklı TCK İlaçlama operasyon merkezimiz ve iletişim adreslerimiz. Size en yakın ilaçlama şubemizi bulun.',
};

export default function BranchesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand/20 bg-brand/5 text-sm text-brand font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            <span>İstanbul'un Her Yerindeyiz</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            TCK İlaçlama <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-600">Şubeleri ve Hizmet Noktaları</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            İstanbul'un 28 farklı bölgesinde bulunan aktif şubelerimizle, çağrınıza en kısa sürede yanıt veriyor ve size en yakın ekibimizi yönlendiriyoruz.
          </p>
        </div>

        {/* Dynamic Branch Hub Dashboard */}
        <BranchesHub branches={tckBranches} />
      </div>
    </div>
  );
}

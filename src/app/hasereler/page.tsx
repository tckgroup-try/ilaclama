import { GlassCard } from '@/components/ui/GlassCard';
import { Bug, Rat, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Zararlı ve Haşere Türleri | TCK İlaçlama',
  description: 'Fare, hamam böceği, kene, pire gibi zararlılar hakkında detaylı bilgi ve kalıcı mücadele yöntemleri.',
};

const pests = [
  {
    id: 'kemirgenler',
    title: 'Kemirgenler (Fare, Sıçan)',
    icon: <Rat className="w-8 h-8 text-brand" />,
    desc: 'Lojistik tesislerden, ev ve sitelere kadar her alanda ciddi sağlık ve izolasyon riski yaratan fare türlerine karşı kesin çözüm sunan istasyonlar.',
    link: '/blog/sisli-fare-ilaclama'
  },
  {
    id: 'hamambocekleri',
    title: 'Hamam Böcekleri',
    icon: <Bug className="w-8 h-8 text-brand" />,
    desc: 'Özellikle gıda üretim tesislerinde ve ev mutfaklarında sıcak alanlara yuvalanan bu türleri, domino etkisi yaratan özel jel formülleriyle etkisiz hale getiriyoruz.',
    link: '/blog/kadikoy-bocek-ilaclama'
  },
  {
    id: 'disparazitler',
    title: 'Dış Parazitler (Pire, Kene)',
    icon: <Bug className="w-8 h-8 text-brand" />,
    desc: 'Sığınaklardan veya sokak hayvanlarından evlerinize bulaşan, uyku kalitenizi etkileyen parazitlere karşı özel formüllü sıvı uygulamalar.',
    link: '/blog/besiktas-ev-ilaclama'
  },
  {
    id: 'ucanhasereler',
    title: 'Uçan Haşereler (Sinek, Sivrisinek)',
    icon: <Bug className="w-8 h-8 text-brand" />,
    desc: 'Restoranlar ve yazlık alanlar için havalandırma sistemlerine dahi uygulanan, uçan popülasyonu kaynağında yok eden çözümler.',
    link: '/blog'
  }
];

export default function HaserelerPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-600 mb-6">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>Profesyonel Haşere Tür Analizi</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Zararlı ve <span className="text-brand">Haşere</span> Türleri
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hastalık taşıyıcı ve itibar zedeleyici zararlı popülasyonlarının yapısını analiz ediyor, her türe özel etkili ve kesin çözüm sunan ilaçlama yöntemleri uyguluyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pests.map((pest) => (
            <GlassCard key={pest.id} hoverEffect className="flex flex-col h-full border border-slate-200 bg-white hover:border-brand/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center">
                  {pest.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{pest.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                {pest.desc}
              </p>
              <Link href={pest.link} className="inline-flex items-center text-brand font-medium group">
                Çözüm Yöntemlerini İncele 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

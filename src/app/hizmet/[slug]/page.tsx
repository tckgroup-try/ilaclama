import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldCheck, MapPin, Bug } from 'lucide-react';
import Link from 'next/link';
import { RoseButton } from '@/components/ui/RoseButton';

export const dynamicParams = true;

// Programmatic SEO: Dinamik sayfalar için metadatalar üretilir.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug.split('-');
  
  // Basic parser for "sisli-fabrika-fare-ilaclama"
  const district = slugParts[0] ? slugParts[0].charAt(0).toUpperCase() + slugParts[0].slice(1) : 'İstanbul';
  const place = slugParts[1] ? slugParts[1].charAt(0).toUpperCase() + slugParts[1].slice(1) : 'Alan';
  const pest = slugParts[2] ? slugParts[2].charAt(0).toUpperCase() + slugParts[2].slice(1) : 'Haşere';

  const title = `${district} ${place} ${pest} İlaçlama | Garantili Çözüm`;
  const description = `${district} bölgesinde ${place} alanları için %100 garantili ${pest.toLowerCase()} ilaçlama hizmeti. Acil müdahale ve kokusuz koruma kalkanı.`;

  return {
    title,
    description,
  };
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug.split('-');
  const district = slugParts[0] ? slugParts[0].charAt(0).toUpperCase() + slugParts[0].slice(1) : 'İstanbul';
  const place = slugParts[1] ? slugParts[1].charAt(0).toUpperCase() + slugParts[1].slice(1) : 'Alan';
  const pest = slugParts[2] ? slugParts[2].charAt(0).toUpperCase() + slugParts[2].slice(1) : 'Haşere';

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-zinc-900 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[128px] z-0" />
        
        <div className="container relative z-10 px-4 mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-zinc-300 mb-8">
            <MapPin className="w-4 h-4 text-brand" />
            <span>{district} Bölgesi Özel Operasyon</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            {district} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400">{place}</span> Alanları İçin <br/>
            Profesyonel {pest} İlaçlama
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            {district} lokasyonundaki {place.toLowerCase()} işletmelerine özel olarak geliştirilen {pest.toLowerCase()} müdahale protokolümüzle %100 hijyen garantisi sunuyoruz.
          </p>
          
          <Link href="/teklif-al">
            <RoseButton className="text-lg px-8 py-4 shadow-2xl">
              Hemen Keşif ve Teklif İste
            </RoseButton>
          </Link>
        </div>
      </section>

      <section className="py-20 relative z-10">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Neden Bizi Seçmelisiniz?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard>
                <ShieldCheck className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{district} Bölge Hakimiyeti</h3>
                <p className="text-zinc-400">Bu bölgedeki {pest.toLowerCase()} popülasyonunu ve ekolojik yapıyı iyi biliyor, nokta atışı müdahale ediyoruz.</p>
              </GlassCard>
              <GlassCard>
                <Bug className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{place} Odaklı Formül</h3>
                <p className="text-zinc-400">{place} gibi alanlara özel kokusuz, lekesiz ve günlük işleyişi durdurmayan uygulamalar.</p>
              </GlassCard>
              <GlassCard>
                <MapPin className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Hızlı Müdahale</h3>
                <p className="text-zinc-400">Acil durum ekibimizle en kısa sürede adresinizdeyiz. 7/24 hizmet sunuyoruz.</p>
              </GlassCard>
            </div>
         </div>
      </section>
    </>
  );
}

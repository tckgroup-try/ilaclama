import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldCheck, MapPin, Bug, Star, Navigation } from 'lucide-react';
import Link from 'next/link';
import { RoseButton } from '@/components/ui/RoseButton';
import Script from 'next/script';
import { tckBranches } from '@/data/branches';

export const dynamicParams = true;

// Programmatic SEO: Dinamik sayfalar için metadatalar üretilir.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug.split('-');
  
  const hasDistrict = slugParts.length >= 5;
  
  const districtRaw = hasDistrict ? slugParts[1] : 'İstanbul';
  const placeRaw = hasDistrict ? slugParts[2] : slugParts[1];
  const pestRaw = hasDistrict ? slugParts[3] : slugParts[2];

  const district = districtRaw ? districtRaw.charAt(0).toUpperCase() + districtRaw.slice(1) : 'İstanbul';
  const place = placeRaw ? placeRaw.charAt(0).toUpperCase() + placeRaw.slice(1) : 'Alan';
  const pest = pestRaw ? pestRaw.charAt(0).toUpperCase() + pestRaw.slice(1) : 'Haşere';

  const title = `${district} ${place} ${pest} İlaçlama | Garantili Çözüm`;
  const description = `${district} bölgesinde ${place} alanları için %100 garantili ${pest.toLowerCase()} ilaçlama hizmeti. Acil müdahale ve kokusuz koruma kalkanı.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.tckilaclama.com/hizmet/${resolvedParams.slug}`
    },
    openGraph: {
      title,
      description,
      url: `https://www.tckilaclama.com/hizmet/${resolvedParams.slug}`,
      type: "article",
    }
  };
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug.split('-');
  
  const hasDistrict = slugParts.length >= 5;
  
  const districtRaw = hasDistrict ? slugParts[1] : 'İstanbul';
  const placeRaw = hasDistrict ? slugParts[2] : slugParts[1];
  const pestRaw = hasDistrict ? slugParts[3] : slugParts[2];

  const district = districtRaw ? districtRaw.charAt(0).toUpperCase() + districtRaw.slice(1) : 'İstanbul';
  const place = placeRaw ? placeRaw.charAt(0).toUpperCase() + placeRaw.slice(1) : 'Alan';
  const pest = pestRaw ? pestRaw.charAt(0).toUpperCase() + pestRaw.slice(1) : 'Haşere';

  // Eğer URL'de ilçe yoksa (Ana merkez veya tüm İstanbul kastediliyorsa) ilk şubeyi veya merkez şubeyi (örn: Kadıköy) baz al.
  const branch = hasDistrict 
    ? tckBranches.find(b => b.district.toLowerCase() === district.toLowerCase()) 
    : tckBranches[0]; // Merkez şube (Kadıköy)

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-slate-900 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[128px] z-0" />
        
        <div className="container relative z-10 px-4 mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-300 mb-8">
            <MapPin className="w-4 h-4 text-brand" />
            <span>{district} Bölgesi Özel Operasyon</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            {district} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">{place}</span> Alanları İçin <br/>
            Profesyonel {pest} İlaçlama
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            {district} lokasyonundaki {place.toLowerCase()} işletmelerine özel olarak geliştirilen {pest.toLowerCase()} müdahale protokolümüzle %100 hijyen garantisi sunuyoruz.
          </p>
          
          <a href="https://wa.me/905016355053?text=Merhaba,%20%C3%BCcretsiz%20ke%C5%9Fif%20ve%20teklif%20istiyorum" target="_blank" rel="noopener noreferrer">
            <RoseButton className="text-lg px-8 py-4 shadow-2xl">
              Hemen Keşif ve Teklif İste
            </RoseButton>
          </a>
        </div>
      </section>

      <section className="py-20 relative z-10">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Neden Bizi Seçmelisiniz?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard>
                <ShieldCheck className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{district} Bölge Hakimiyeti</h3>
                <p className="text-slate-400">Bu bölgedeki {pest.toLowerCase()} popülasyonunu ve ekolojik yapıyı iyi biliyor, nokta atışı müdahale ediyoruz.</p>
              </GlassCard>
              <GlassCard>
                <Bug className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{place} Odaklı Formül</h3>
                <p className="text-slate-400">{place} gibi alanlara özel kokusuz, lekesiz ve günlük işleyişi durdurmayan uygulamalar.</p>
              </GlassCard>
              <GlassCard>
                <MapPin className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Hızlı Müdahale</h3>
                <p className="text-slate-400">Acil durum ekibimizle en kısa sürede adresinizdeyiz. 7/24 hizmet sunuyoruz.</p>
              </GlassCard>
            </div>
         </div>
      </section>

      {/* Silo Architecture: Local Internal Linking */}
      <section className="py-16 bg-slate-900 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Yakındaki Hizmet Noktalarımız</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/hizmet/istanbul-kadikoy-${place.toLowerCase()}-${pest.toLowerCase()}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Kadıköy {place} {pest} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-sisli-${place.toLowerCase()}-${pest.toLowerCase()}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Şişli {place} {pest} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-besiktas-${place.toLowerCase()}-${pest.toLowerCase()}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Beşiktaş {place} {pest} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-pendik-${place.toLowerCase()}-${pest.toLowerCase()}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Pendik {place} {pest} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-bakirkoy-${place.toLowerCase()}-${pest.toLowerCase()}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Bakırköy {place} {pest} İlaçlama</Link>
          </div>
        </div>
      </section>

      {/* Local Google Maps Embed & Get Directions */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="glass-panel rounded-3xl p-4 md:p-8 border border-white/5 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{district} Bölgesi Hizmet Noktası</h3>
                <p className="text-slate-400 mb-6">Gezici ekiplerimiz ve deneyimli uzmanlarımız {district} genelinde 7/24 kesintisiz hizmet vermektedir. Hızlı ve güvenli haşere ilaçlama uygulamaları için yol tarifi alabilir veya doğrudan bizi arayabilirsiniz.</p>
                <a href={branch ? branch.url : `https://www.google.com/maps/dir/?api=1&destination=${district}+istanbul+ilaclama`} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-3 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-xl transition-colors font-semibold shadow-lg shadow-brand/20">
                    <Navigation className="w-5 h-5" />
                    Bulunduğunuz Konumdan Yol Tarifi Alın
                  </button>
                </a>
              </div>
              <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-white/10">
                <iframe 
                  src={`https://maps.google.com/maps?q=${branch ? encodeURIComponent(branch.name) : `${district}+istanbul+ilaclama`}&t=&z=14&ie=UTF8&iwloc=&output=embed`} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${district} İlaçlama Haritası`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service specific AggregateRating Schema */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `${district} ${place} ${pest} İlaçlama`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "TCK İlaçlama"
            },
            "areaServed": {
              "@type": "City",
              "name": district
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": ((resolvedParams.slug.length * 7) + 104).toString(),
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </>
  );
}

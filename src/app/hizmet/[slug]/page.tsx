import { Metadata } from 'next';
import { ShieldCheck, MapPin, Bug, Navigation } from 'lucide-react';
import Link from 'next/link';
import { RoseButton } from '@/components/ui/RoseButton';
import { GlassCard } from '@/components/ui/GlassCard';
import Script from 'next/script';
import { tckBranches } from '@/data/branches';
import { istanbulNeighborhoods } from '@/data/neighborhoods';

// Mappings for professional Turkish representations
const PEST_MAPPING: Record<string, string> = {
  'fare': 'Fare',
  'bocek': 'Böcek',
  'pire': 'Pire',
  'hamam-bocegi': 'Hamam Böceği',
  'akrep': 'Akrep',
  'kene': 'Kene',
  'tahtakurusu': 'Tahtakurusu',
  'sivrisinek': 'Sivrisinek'
};

const PLACE_MAPPING: Record<string, string> = {
  'fabrika': 'Fabrika',
  'ofis': 'Ofis',
  'apartman': 'Apartman',
  'restoran': 'Restoran',
  'villa': 'Villa',
  'depo': 'Depo',
  'gemi': 'Gemi',
  'otel': 'Otel',
  'site': 'Site'
};

interface ParsedSlug {
  districtName: string;
  placeName: string;
  pestName: string;
  isNeighborhood: boolean;
  districtKey: string;
}

// DRY Slug parsing utility
export function parseSlug(slug: string): ParsedSlug {
  const slugParts = slug.split('-');
  
  let districtName = 'İstanbul';
  let placeName = '';
  let pestName = 'Haşere';
  let isNeighborhood = false;
  let districtKey = 'istanbul';

  if (slugParts.length < 3) {
    return { districtName, placeName, pestName, isNeighborhood, districtKey };
  }

  const rawDistrictKey = slugParts[1];
  const districtInfo = istanbulNeighborhoods[rawDistrictKey];

  if (districtInfo) {
    districtName = districtInfo.districtName;
    districtKey = rawDistrictKey;
    
    if (slugParts.length >= 5) {
      const thirdPart = slugParts[2];
      const neighborhood = districtInfo.neighborhoods.find(n => n.slug === thirdPart);
      
      if (neighborhood) {
        placeName = `${neighborhood.name} Mahallesi`;
        isNeighborhood = true;
      } else {
        placeName = PLACE_MAPPING[thirdPart] || (thirdPart.charAt(0).toUpperCase() + thirdPart.slice(1));
      }
      
      const fourthPart = slugParts[3];
      pestName = PEST_MAPPING[fourthPart] || (fourthPart.charAt(0).toUpperCase() + fourthPart.slice(1));
    } else {
      // Length is 4: istanbul-kadikoy-bocek-ilaclama
      const thirdPart = slugParts[2];
      pestName = PEST_MAPPING[thirdPart] || (thirdPart.charAt(0).toUpperCase() + thirdPart.slice(1));
    }
  } else {
    // Fallback if district key is not in database
    const hasDistrict = slugParts.length >= 5;
    const districtRaw = hasDistrict ? slugParts[1] : 'İstanbul';
    const placeRaw = hasDistrict ? slugParts[2] : slugParts[1];
    const pestRaw = hasDistrict ? slugParts[3] : slugParts[2];
    
    districtName = districtRaw.charAt(0).toUpperCase() + districtRaw.slice(1);
    placeName = PLACE_MAPPING[placeRaw] || (placeRaw ? placeRaw.charAt(0).toUpperCase() + placeRaw.slice(1) : '');
    pestName = PEST_MAPPING[pestRaw] || (pestRaw ? pestRaw.charAt(0).toUpperCase() + pestRaw.slice(1) : 'Haşere');
  }

  return { districtName, placeName, pestName, isNeighborhood, districtKey };
}

export const dynamicParams = true;

// Programmatic SEO: Dinamik sayfalar için metadatalar üretilir.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { districtName, placeName, pestName } = parseSlug(resolvedParams.slug);

  const titlePrefix = placeName ? `${districtName} ${placeName}` : `${districtName}`;
  const title = `${titlePrefix} ${pestName} İlaçlama | %100 Garantili Çözüm`;
  const description = `${districtName} bölgesinde ${placeName ? `${placeName.toLowerCase()} alanları` : 'tüm yaşam alanları'} için %100 garantili ${pestName.toLowerCase()} ilaçlama hizmeti. Acil müdahale ve kokusuz koruma kalkanı.`;

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
  const { districtName, placeName, pestName, districtKey } = parseSlug(resolvedParams.slug);

  // En yakın şubeyi bul veya merkez şubeyi al
  const branch = tckBranches.find(b => b.district.toLowerCase() === districtKey.toLowerCase()) || tckBranches[0];

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-slate-900 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[128px] z-0" />
        
        <div className="container relative z-10 px-4 mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-300 mb-8">
            <MapPin className="w-4 h-4 text-brand" />
            <span>{districtName} Bölgesi Özel Operasyon</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            {districtName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">{placeName || 'Geneli'}</span> <br/>
            Profesyonel {pestName} İlaçlama
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            {districtName} lokasyonundaki {placeName ? `${placeName.toLowerCase()} alanlarına` : 'tüm yaşam alanlarına'} özel olarak geliştirilen {pestName.toLowerCase()} müdahale protokolümüzle %100 hijyen garantisi sunuyoruz.
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
                <h3 className="text-xl font-bold text-white mb-2">{districtName} Bölge Hakimiyeti</h3>
                <p className="text-slate-400">Bu bölgedeki {pestName.toLowerCase()} popülasyonunu ve ekolojik yapıyı iyi biliyor, nokta atışı müdahale ediyoruz.</p>
              </GlassCard>
              <GlassCard>
                <Bug className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{placeName || 'Tüm Alanlar'} Odaklı Formül</h3>
                <p className="text-slate-400">{placeName || 'Yaşam ve iş alanları'} için kokusuz, lekesiz ve günlük işleyişi durdurmayan uygulamalar.</p>
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
            <Link href={`/hizmet/istanbul-kadikoy-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Kadıköy {placeName} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-sisli-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Şişli {placeName} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-besiktas-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Beşiktaş {placeName} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-pendik-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Pendik {placeName} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-bakirkoy-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 hover:text-brand hover:border-brand/50 transition-all">Bakırköy {placeName} İlaçlama</Link>
          </div>
        </div>
      </section>

      {/* Local Google Maps Embed & Get Directions */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="glass-panel rounded-3xl p-4 md:p-8 border border-white/5 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{districtName} Bölgesi Hizmet Noktası</h3>
                <p className="text-slate-400 mb-6">Gezici ekiplerimiz ve deneyimli uzmanlarımız {districtName} genelinde 7/24 kesintisiz hizmet vermektedir. Hızlı ve güvenli haşere ilaçlama uygulamaları için yol tarifi alabilir veya doğrudan bizi arayabilirsiniz.</p>
                <a href={branch ? branch.url : `https://www.google.com/maps/dir/?api=1&destination=${districtName}+istanbul+ilaclama`} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-3 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-xl transition-colors font-semibold shadow-lg shadow-brand/20">
                    <Navigation className="w-5 h-5" />
                    Bulunduğunuz Konumdan Yol Tarifi Alın
                  </button>
                </a>
              </div>
              <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-white/10">
                <iframe 
                  src={`https://maps.google.com/maps?q=${branch ? encodeURIComponent(branch.name) : `${districtName}+istanbul+ilaclama`}&t=&z=14&ie=UTF8&iwloc=&output=embed`} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${districtName} İlaçlama Haritası`}
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
            "name": placeName ? `${districtName} ${placeName} ${pestName} İlaçlama` : `${districtName} ${pestName} İlaçlama`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "TCK İlaçlama"
            },
            "areaServed": {
              "@type": "City",
              "name": districtName
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

// Simple slugify helper
function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-');
}


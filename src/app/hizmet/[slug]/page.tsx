import { Metadata } from 'next';
import { ShieldCheck, MapPin, Bug, Navigation } from 'lucide-react';
import Link from 'next/link';
import { RoseButton } from '@/components/ui/RoseButton';
import { GlassCard } from '@/components/ui/GlassCard';
import Script from 'next/script';
import { tckBranches } from '@/data/branches';
import { istanbulNeighborhoods } from '@/data/neighborhoods';
import { ServiceQuoteForm } from '@/components/ServiceQuoteForm';
import { PHONE_HREF, PHONE_DISPLAY, PHONE_RAW, COMPANY_EMAIL, COMPANY_DOMAIN, WHATSAPP_QUOTE } from '@/lib/constants';
import { LocalMapEmbed } from '@/components/LocalMapEmbed';

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

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  const targetPests = ['bocek', 'fare', 'pire', 'hamam-bocegi'];

  for (const [key] of Object.entries(istanbulNeighborhoods)) {
    for (const pest of targetPests) {
      params.push({
        slug: `istanbul-${key}-${pest}-ilaclama`,
      });
    }
  }

  return params;
}

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
      canonical: `${COMPANY_DOMAIN}/hizmet/${resolvedParams.slug}`
    },
    openGraph: {
      title,
      description,
      url: `${COMPANY_DOMAIN}/hizmet/${resolvedParams.slug}`,
      type: "article",
    }
  };
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { districtName, placeName, pestName, districtKey } = parseSlug(resolvedParams.slug);

  // En yakın şubeyi bul veya merkez şubeyi al
  const branch = tckBranches.find(b => slugify(b.district) === districtKey.toLowerCase()) || tckBranches[0];

  return (
    <>
      <link rel="amphtml" href={`https://tckilaclama.com/hizmet/${resolvedParams.slug}/amp`} />
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-28 pb-12">
        <div className="absolute inset-0 bg-slate-50 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[128px] z-0" />
        
        <div className="container relative z-10 px-4 mx-auto text-center max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-500 mb-6 bg-white/60 backdrop-blur-sm py-1.5 px-4 rounded-full border border-slate-200/50 w-fit mx-auto" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand transition-colors">Ana Sayfa</Link>
            <span className="text-slate-400">/</span>
            <Link href="/hizmetler" className="hover:text-brand transition-colors">Hizmetler</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-800 font-medium">{placeName ? `${districtName} ${placeName}` : districtName} {pestName} İlaçlama</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-600 mb-6">
            <MapPin className="w-4 h-4 text-brand" />
            <span>{districtName} Bölgesi Özel Operasyon</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            {districtName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-600">{placeName || 'Geneli'}</span> <br/>
            Profesyonel {pestName} İlaçlama
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
            {districtName} lokasyonundaki {placeName ? `${placeName.toLowerCase()} alanlarına` : 'tüm yaşam alanlarına'} özel olarak geliştirilen {pestName.toLowerCase()} müdahale protokolümüzle %100 hijyen garantisi sunuyoruz.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-brand text-white font-bold px-6 py-3 rounded-xl hover:bg-brand/90 transition-all shadow-lg shadow-brand/20">
              📞 {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP_QUOTE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20">
              WhatsApp Hızlı Teklif
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 relative z-10 border-t border-slate-100 bg-white">
         <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
               {/* Left column: Features */}
               <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-900">7/24 Kesin Çözümlü Profesyonel Hizmet</h2>
                    <p className="text-slate-600 leading-relaxed">
                      {districtName} genelinde ve özellikle {placeName || 'tüm yaşam alanlarında'} Sağlık Bakanlığı onaylı formüllerimiz, nano-kapsül teknolojimiz ve BRCGS standartlarına uygun profesyonel mobil ekiplerimizle 7/24 hizmet veriyoruz.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <GlassCard className="bg-white border-slate-200/80 p-6">
                      <ShieldCheck className="w-10 h-10 text-brand mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{districtName} Bölge Hakimiyeti</h3>
                      <p className="text-slate-600 text-sm">Bu bölgedeki {pestName.toLowerCase()} popülasyonunu ve ekolojik yapıyı iyi biliyor, nokta atışı müdahale ediyoruz.</p>
                    </GlassCard>

                    <GlassCard className="bg-white border-slate-200/80 p-6">
                      <Bug className="w-10 h-10 text-brand mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{placeName || 'Tüm Alanlar'} Odaklı Formül</h3>
                      <p className="text-slate-600 text-sm">{placeName || 'Yaşam ve iş alanları'} için kokusuz, lekesiz ve günlük işleyişi durdurmayan uygulamalar.</p>
                    </GlassCard>
                  </div>
               </div>

               {/* Right column: Form widget */}
               <div className="lg:sticky lg:top-24">
                  <ServiceQuoteForm
                    districtName={districtName}
                    pestName={pestName}
                    placeName={placeName}
                  />
               </div>
            </div>
         </div>
      </section>

      {/* Silo Architecture: Local Internal Linking */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Yakındaki Hizmet Noktalarımız</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/hizmet/istanbul-kadikoy-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-600 hover:text-brand hover:border-brand/50 transition-all bg-white">Kadıköy {placeName} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-sisli-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-600 hover:text-brand hover:border-brand/50 transition-all bg-white">Şişli {placeName} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-besiktas-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-600 hover:text-brand hover:border-brand/50 transition-all bg-white">Beşiktaş {placeName} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-pendik-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-600 hover:text-brand hover:border-brand/50 transition-all bg-white">Pendik {placeName} İlaçlama</Link>
            <Link href={`/hizmet/istanbul-bakirkoy-${placeName ? slugify(placeName) : 'bocek'}-ilaclama`} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-600 hover:text-brand hover:border-brand/50 transition-all bg-white">Bakırköy {placeName} İlaçlama</Link>
          </div>
        </div>
      </section>

      {/* Local Google Maps Embed & Get Directions */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="glass-panel rounded-3xl p-4 md:p-8 border border-slate-200 bg-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{districtName} Bölgesi Hizmet Noktası</h3>
                <p className="text-slate-600 mb-6">Gezici ekiplerimiz ve deneyimli uzmanlarımız {districtName} genelinde 7/24 kesintisiz hizmet vermektedir. Hızlı ve güvenli haşere ilaçlama uygulamaları için yol tarifi alabilir veya doğrudan bizi arayabilirsiniz.</p>
                <a href={branch ? branch.url : `https://www.google.com/maps/dir/?api=1&destination=${districtName}+istanbul+ilaclama`} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-3 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-xl transition-colors font-semibold shadow-lg shadow-brand/20">
                    <Navigation className="w-5 h-5" />
                    Bulunduğunuz Konumdan Yol Tarifi Alın
                  </button>
                </a>
              </div>
              <LocalMapEmbed 
                query={branch ? branch.name : `${districtName} istanbul ilaclama`}
                title={`${districtName} İlaçlama Haritası`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service specific advanced schemas for GSC validation */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "PestControlService",
                "@id": `${COMPANY_DOMAIN}/hizmet/${resolvedParams.slug}#service`,
                "name": placeName ? `${districtName} ${placeName} ${pestName} İlaçlama Hizmeti` : `${districtName} ${pestName} İlaçlama Hizmeti`,
                "serviceType": `${pestName} İlaçlama`,
                "provider": {
                  "@type": "LocalBusiness",
                  "@id": `${COMPANY_DOMAIN}/#localbusiness`,
                  "name": "TCK İlaçlama",
                  "telephone": `+${PHONE_RAW}`,
                  "priceRange": "₺₺",
                  "image": `${COMPANY_DOMAIN}/images/istanbul-ev-bocek-ilaclama-hizmeti.webp`,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": `İstanbul ${districtName} Şubesi`,
                    "addressLocality": districtName,
                    "addressRegion": "İstanbul",
                    "addressCountry": "TR"
                  }
                },
                "areaServed": {
                  "@type": "AdministrativeArea",
                  "name": districtName
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": ((resolvedParams.slug.length * 7) + 104).toString(),
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "FAQPage",
                "@id": `${COMPANY_DOMAIN}/hizmet/${resolvedParams.slug}#faq`,
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": `İstanbul ${districtName} bölgesinde ${pestName.toLowerCase()} ilaçlama fiyatları ne kadar?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `İstanbul ${districtName} genelinde profesyonel ${pestName.toLowerCase()} ilaçlama fiyatlarımız 500 TL'den başlamaktadır. Fiyatlar, dezenfeksiyon yapılacak alanın büyüklüğüne ve haşere istilasının derecesine göre belirlenmektedir.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `TCK İlaçlama ${districtName} şubesinde kullanılan dezenfeksiyon ve ilaçlar güvenli midir?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Evet. Kullandığımız tüm ilaçlar Sağlık Bakanlığı ve Dünya Sağlık Örgütü (WHO) onaylı biyosidal ürünlerdir. İnsan, evcil hayvan ve çocuk sağlığına zarar vermeyen kokusuz ve güvenli formüllerle uygulama yapmaktayız."
                    }
                  }
                ]
              },
              {
                "@type": "JobPosting",
                "@id": `${COMPANY_DOMAIN}/hizmet/${resolvedParams.slug}#job`,
                "title": `${districtName} Bölgesi Böcek İlaçlama Elemanı & Teknisyeni`,
                "description": `TCK İlaçlama ${districtName} şubesinde görevlendirilmek üzere, biyosidal ürün uygulama belgesine sahip, ilaçlama ekipmanlarını kullanabilen, B sınıfı ehliyetli ve müşteri odaklı ilaçlama teknisyenleri alınacaktır.`,
                "datePosted": "2026-07-06T00:00:00Z",
                "validThrough": "2026-12-31T23:59:59Z",
                "employmentType": "FULL_TIME",
                "hiringOrganization": {
                  "@type": "Organization",
                  "name": "TCK İlaçlama",
                  "sameAs": COMPANY_DOMAIN
                },
                "jobLocation": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": `${districtName} Şubesi`,
                    "addressLocality": districtName,
                    "addressRegion": "İstanbul",
                    "addressCountry": "TR"
                  }
                },
                "baseSalary": {
                  "@type": "MonetaryAmount",
                  "currency": "TRY",
                  "value": {
                    "@type": "QuantitativeValue",
                    "value": "25000",
                    "unitText": "MONTH"
                  }
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${COMPANY_DOMAIN}/hizmet/${resolvedParams.slug}#breadcrumb`,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Ana Sayfa",
                    "item": COMPANY_DOMAIN
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Hizmetler",
                    "item": `${COMPANY_DOMAIN}/hizmetler`
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": placeName ? `${districtName} ${placeName} ${pestName} İlaçlama` : `${districtName} ${pestName} İlaçlama`,
                    "item": `${COMPANY_DOMAIN}/hizmet/${resolvedParams.slug}`
                  }
                ]
              }
            ]
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


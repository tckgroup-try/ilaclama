import { blogs } from '@/data/blogs';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { RoseButton } from '@/components/ui/RoseButton';
import { ArrowLeft, PhoneCall } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const blog = blogs.find(b => b.slug === slug);
  
  if (!blog) return { title: 'Bulunamadı' };

  return {
    title: `${blog.title} | TCK İlaçlama Blog`,
    description: blog.excerpt,
    keywords: blog.tags ? blog.tags.join(', ') : '',
    alternates: {
      canonical: `https://tckilaclama.com/blog/${slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [`https://tckilaclama.com${blog.image}`],
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://tckilaclama.com/blog/${slug}`,
      type: "article",
      publishedTime: blog.date,
      images: [`https://tckilaclama.com${blog.image}`]
    }
  };
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // LocalBusiness + AggregateRating Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TCK İlaçlama",
    "image": "https://tckilaclama.com" + blog.image,
    "description": blog.excerpt,
    "telephone": "+905016355053",
    "url": "https://tckilaclama.com",
    "priceRange": "₺₺",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "217",
      "bestRating": "5",
      "worstRating": "1"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Barbaros Bulvarı No:74",
      "addressLocality": blog.geo?.region || "İstanbul",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "geo": blog.geo ? {
      "@type": "GeoCoordinates",
      "latitude": blog.geo.lat,
      "longitude": blog.geo.lng
    } : undefined
  };

  // FAQPage Schema — triggers "People Also Ask" featured snippets
  const pestName = blog.tags?.[1]?.replace(' İlaçlama', '') || 'Haşere';
  const district = blog.geo?.region || 'İstanbul';
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `${district} ${pestName} ilaçlaması sırasında evi terk etmek gerekiyor mu?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hayır, terk etmeniz gerekmez. TCK İlaçlama'nın uyguladığı son teknoloji kokusuz biyosidal formüller sayesinde evinizden çıkmanıza gerek kalmaz. Günlük yaşamınıza güvenle devam edebilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": `${district} ${pestName} ilaçlaması sonrası haşereler ne zaman tamamen yok olur?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mikro-kapsül etki mekanizması sayesinde ilk 24 saat içinde gözle görülür düşüş başlar. Maksimum 7 ila 10 gün içinde tüm koloni yuvalarında zincirleme olarak kurutulmuş olur."
        }
      },
      {
        "@type": "Question",
        "name": `${district} ${pestName} ilaçlama fiyatları ne kadar?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${district} bölgesinde profesyonel ${pestName} ilaçlama fiyatları; alanın m² büyüklüğüne, istila seviyesine ve kullanılacak biyosidal formüle göre değişmektedir. TCK İlaçlama olarak ücretsiz yerinde keşif yaparak net fiyat teklifi sunuyoruz. Bilgi almak için 0501 635 50 53 numaralı hattı arayabilirsiniz.`
        }
      },
      {
        "@type": "Question",
        "name": "Ruhsatsız ilaçlama yaptırmak yasal mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hayır, yasal değildir. T.C. Türk Ceza Kanunu 187. madde 1. fıkrası uyarınca kişilerin hayatını ve sağlığını tehlikeye sokacak biçimde ilaç üreten veya satan kimseye 1 yıldan 5 yıla kadar hapis ve adlî para cezası verilir. Bu nedenle mutlaka T.C. Sağlık Bakanlığı ruhsatlı ve yetki belgeli ilaçlama firmaları tercih edilmelidir."
        }
      },
      {
        "@type": "Question",
        "name": "İlaçlama şirketinin Sağlık Bakanlığı onaylı olduğunu nasıl anlarım?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hizmet alacağınız ilaçlama firmasından T.C. Sağlık Bakanlığı'nın verdiği 'Biyosidal Ürün Uygulama Yetki Belgesi'ni görmenizi isteyin. Bu belgeyi ibraz edemeyen firmalar ve şahıslar ruhsatsız demektir. TCK İlaçlama tüm belgelerini müşterilerine şeffaf şekilde sunmaktadır."
        }
      }
    ]
  };

  // Article Schema — critical for Google News + rich snippets
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://tckilaclama.com/blog/${slug}#article`,
    "headline": blog.title,
    "description": blog.excerpt,
    "image": `https://tckilaclama.com${blog.image}`,
    "datePublished": blog.date,
    "dateModified": blog.date,
    "author": {
      "@type": "Organization",
      "name": "TCK İlaçlama",
      "url": "https://tckilaclama.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TCK İlaçlama",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tckilaclama.com/images/tck_expert.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tckilaclama.com/blog/${slug}`
    },
    "keywords": blog.tags?.join(', '),
    "articleSection": "Haşere İlaçlama Rehberi"
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://tckilaclama.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://tckilaclama.com/blog" },
      { "@type": "ListItem", "position": 3, "name": blog.title, "item": `https://tckilaclama.com/blog/${slug}` }
    ]
  };

  return (
    <>
      <link rel="amphtml" href={`https://tckilaclama.com/blog/${slug}/amp`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <article className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-slate-600 hover:text-brand mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ustaların Notlarına Dön
          </Link>
          
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 border border-slate-200 shadow-2xl">
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-brand font-medium mb-3">{blog.date}</div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {blog.title}
              </h1>
            </div>
          </div>

          {/* HTML Content Render with prose */}
          <div 
            className="prose prose-lg max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:text-slate-900 prose-a:text-brand mb-16"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Etiket Bulutu (Tag Cloud) */}
          {blog.tags && (
            <div className="mb-16">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Etiket Bulutu</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={"/blog?tag=" + encodeURIComponent(tag)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600 hover:text-brand hover:border-brand/30 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-slate-50 border border-brand/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Mekanı Profesyonellere Teslim Edin</h3>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Vaktiniz kıymetli. Tüm haşere sorunlarınız için uzman kadromuzla hızlı ve garantili çözümler sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+905016355053" className="w-full sm:w-auto">
                <RoseButton className="w-full text-lg px-8">
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Müşteri Temsilcisini Ara
                </RoseButton>
              </a>
              <a href="https://wa.me/905016355053?text=Merhaba,%20ila%C3%A7lama%20hizmetleri%20hakk%C4%B1nda%20fiyat%20almak%20istiyorum" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <RoseButton variant="outline" className="w-full text-lg px-8">
                  Whatsapp'tan Fiyat Al
                </RoseButton>
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

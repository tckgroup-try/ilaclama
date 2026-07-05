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
    title: `${blog.title} | TCK İlaçlama`,
    description: blog.excerpt,
    keywords: blog.tags || [],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image]
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

  // LocalBusiness Schema for Geo/SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TCK İlaçlama",
    "image": "https://www.tckilaclama.com" + blog.image,
    "description": blog.excerpt,
    "telephone": "+905300000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": blog.geo?.region || "İstanbul",
      "addressCountry": "TR"
    },
    "geo": blog.geo ? {
      "@type": "GeoCoordinates",
      "latitude": blog.geo.lat,
      "longitude": blog.geo.lng
    } : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <article className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-brand mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ustaların Notlarına Dön
          </Link>
          
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 border border-white/5 shadow-2xl">
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
            className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-headings:text-white prose-a:text-brand mb-16"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Etiket Bulutu (Tag Cloud) */}
          {blog.tags && (
            <div className="mb-16">
              <h3 className="text-xl font-bold text-white mb-4">Etiket Bulutu</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={"/blog?tag=" + encodeURIComponent(tag)}
                    className="px-4 py-2 bg-slate-900 border border-white/10 rounded-full text-sm text-slate-400 hover:text-brand hover:border-brand/30 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-slate-900/50 border border-brand/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Mekanı Profesyonellere Teslim Edin</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Vaktiniz kıymetli. Tüm haşere sorunlarınız için uzman mühendis kadromuzla hızlı ve garantili çözümler sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:05300000000" className="w-full sm:w-auto">
                <RoseButton className="w-full text-lg px-8">
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Müşteri Temsilcisini Ara
                </RoseButton>
              </a>
              <a href="https://wa.me/905300000000?text=Merhaba,%20ila%C3%A7lama%20hizmetleri%20hakk%C4%B1nda%20fiyat%20almak%20istiyorum" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
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

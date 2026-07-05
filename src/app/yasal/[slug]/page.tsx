import { legalPages } from '@/data/legal';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const page = legalPages.find(p => p.slug === slug);
  
  if (!page) return { title: 'Bulunamadı' };

  return {
    title: \`\${page.title} | TCK İlaçlama\`,
    description: 'TCK İlaçlama yasal bilgilendirme, KVKK, gizlilik politikası ve ISO sertifikaları detayları.',
  };
}

export async function generateStaticParams() {
  return legalPages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const page = legalPages.find(p => p.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-brand mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ana Sayfaya Dön
        </Link>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-brand" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {page.title}
            </h1>
          </div>

          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-brand relative z-10"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </div>
  );
}

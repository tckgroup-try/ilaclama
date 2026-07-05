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

  return (
    <article className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-zinc-400 hover:text-brand mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ustaların Notlarına Dön
        </Link>
        
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 border border-white/5 shadow-2xl">
          <Image 
            src={blog.image} 
            alt={blog.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <div className="text-brand font-medium mb-3">{blog.date}</div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-300 prose-p:leading-relaxed prose-headings:text-white prose-a:text-brand mb-16">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>

        <div className="bg-zinc-900/50 border border-brand/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Abi Boşver Okumayı, İşi Bize Bırak!</h3>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Senin vaktin kıymetli. Dert etme, biz yarım saat içinde gelir, mekanı temizler, çıkarız. Kafan rahat etsin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:05300000000" className="w-full sm:w-auto">
              <RoseButton className="w-full text-lg px-8">
                <PhoneCall className="w-5 h-5 mr-2" />
                Hemen Ustayı Ara
              </RoseButton>
            </a>
            <Link href="/teklif-al" className="w-full sm:w-auto">
              <RoseButton variant="outline" className="w-full text-lg px-8">
                Whatsapp'tan Fiyat Al
              </RoseButton>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

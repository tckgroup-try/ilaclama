import { blogs } from '@/data/blogs';
import Link from 'next/link';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata = {
  title: 'TCK İlaçlama Ustalarından Esnaf Tavsiyeleri | Blog',
  description: 'İstanbul böcek ilaçlama, fare, kene ve haşere çözümleri hakkında usta işi, şeffaf bilgiler. Ev ve işyeriniz için kesin çözüm rehberi.',
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Ustanın Not Defteri</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Böcekle, fareyle başın dertteyse doğru yerdesin abi. İstanbul'un dört bir yanından derlediğimiz kesin çözümler ve esnaf tavsiyeleri.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="block h-full">
              <GlassCard hoverEffect className="h-full flex flex-col p-0 overflow-hidden border-white/5 hover:border-brand/30">
                <div className="relative h-48 w-full">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm text-brand mb-3">{blog.date}</div>
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-zinc-400 mb-4 line-clamp-3 flex-grow">
                    {blog.excerpt}
                  </p>
                  <div className="text-sm font-medium text-brand mt-auto flex items-center group">
                    Devamını Oku <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

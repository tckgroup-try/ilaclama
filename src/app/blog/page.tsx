import { blogs } from '@/data/blogs';
import Link from 'next/link';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata = {
  title: 'Uzman Rehberi ve Blog | TCK İlaçlama',
  description: 'İstanbul böcek ve haşere ilaçlama uygulamaları, rehberler ve zararlılarla mücadele yöntemleri hakkında profesyonel makaleler.',
};

export default async function BlogPage({ searchParams }: { searchParams: { tag?: string } }) {
  const params = await searchParams;
  const tagFilter = params.tag;
  
  const filteredBlogs = tagFilter 
    ? blogs.filter(blog => blog.tags?.includes(tagFilter))
    : blogs;

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Operasyonel Çözüm Rehberi</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {tagFilter 
              ? `"${tagFilter}" etiketi için bulunan sonuçlar.` 
              : "Haşere kontrolü ve entegre zararlı yönetimi konularında profesyonel mühendislik ekibimiz tarafından derlenen güncel analizler."}
          </p>
          {tagFilter && (
            <div className="mt-8">
              <Link href="/blog" className="inline-flex items-center px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-medium hover:bg-brand/20 transition-colors">
                Filtreyi Temizle (Tüm Yazılar)
              </Link>
            </div>
          )}
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            Bu etikete ait operasyonel makale bulunamadı.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="block h-full">
                <GlassCard hoverEffect className="h-full flex flex-col p-0 overflow-hidden border-slate-200 bg-white hover:border-brand/30">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={blog.image} 
                      alt={blog.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-sm text-brand mb-3">{blog.date}</div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-slate-100 rounded-md text-slate-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm font-medium text-brand mt-auto flex items-center group">
                      Devamını Oku <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

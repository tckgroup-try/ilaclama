import { MetadataRoute } from 'next';
import { blogs } from '@/data/blogs';
import { legalPages } from '@/data/legal';

const DISTRICTS = ['sisli', 'kadikoy', 'besiktas', 'bakirkoy', 'pendik', 'maltepe'];
const PLACES = ['fabrika', 'ofis', 'apartman', 'restoran', 'villa'];
const PESTS = ['fare', 'bocek', 'pire', 'hamam-bocegi', 'akrep'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tckilaclama.com';

  // 1. Temel Sayfalar
  const routes = [
    '',
    '/hizmetler',
    '/hakkimizda',
    '/hasereler',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Programmatic SEO (Local Niches)
  const seoRoutes: MetadataRoute.Sitemap = [];
  
  for (const district of DISTRICTS) {
    for (const place of PLACES) {
      for (const pest of PESTS) {
        // Example: /hizmet/istanbul-kadikoy-fabrika-fare-ilaclama
        seoRoutes.push({
          url: `${baseUrl}/hizmet/istanbul-${district}-${place}-${pest}-ilaclama`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        });
      }
    }
  }

  // 3. Blog Routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Yasal Sayfalar
  const legalRoutes: MetadataRoute.Sitemap = legalPages.map((page) => ({
    url: `${baseUrl}/yasal/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [...routes, ...blogRoutes, ...seoRoutes, ...legalRoutes];
}

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tckilaclama.com';

  // 1. Temel Sayfalar
  const routes = [
    '',
    '/teklif-al',
    '/hizmetler',
    '/kurumsal',
    '/hasereler',
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

  return [...routes, ...blogRoutes, ...seoRoutes];
}

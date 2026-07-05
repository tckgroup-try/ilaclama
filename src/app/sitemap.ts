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
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Programatik SEO (Niş Kelimeler) Kombinasyonları
  // Örnek: ilçe + tesis + haşere
  const districts = ['sisli', 'kadikoy', 'besiktas', 'bakirkoy', 'pendik', 'maltepe'];
  const places = ['fabrika', 'ofis', 'apartman', 'restoran', 'villa'];
  const pests = ['fare', 'bocek', 'pire', 'hamam-bocegi', 'akrep'];

  const dynamicRoutes = [];

  // Gerçek senaryoda bu veriler veritabanından veya geniş bir JSON'dan gelir
  for (const district of districts) {
    for (const place of places) {
      for (const pest of pests) {
        dynamicRoutes.push({
          url: `${baseUrl}/hizmet/${district}-${place}-${pest}-ilaclama`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        });
      }
    }
  }

  // 3. Kombine et ve Google'a sun
  return [...routes, ...dynamicRoutes];
}

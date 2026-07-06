import { MetadataRoute } from 'next';
import { blogs } from '@/data/blogs';
import { legalPages } from '@/data/legal';
import { tckBranches } from '@/data/branches';
import { istanbulNeighborhoods } from '@/data/neighborhoods';

// Helper for Turkish characters to slug
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

const PLACES = ['fabrika', 'ofis', 'apartman', 'restoran', 'villa', 'depo', 'gemi', 'otel', 'site'];
const PESTS = ['fare', 'bocek', 'pire', 'hamam-bocegi', 'akrep', 'kene', 'tahtakurusu', 'sivrisinek'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tckilaclama.com';

  // 1. Temel Sayfalar
  const routes = [
    '',
    '/hizmetler',
    '/hakkimizda',
    '/hasereler',
    '/subelerimiz',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Programmatic SEO (Local Niches)
  const seoRoutes: MetadataRoute.Sitemap = [];
  
  // 2a. Original Branches * Places * Pests (2016 URLs)
  for (const branch of tckBranches) {
    const districtSlug = slugify(branch.district);
    
    // Add generic district-wide pest routes
    seoRoutes.push({
      url: `${baseUrl}/hizmet/istanbul-${districtSlug}-bocek-ilaclama`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    });

    for (const place of PLACES) {
      for (const pest of PESTS) {
        // Example: /hizmet/istanbul-kadikoy-fabrika-fare-ilaclama
        seoRoutes.push({
          url: `${baseUrl}/hizmet/istanbul-${districtSlug}-${place}-${pest}-ilaclama`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.5,
        });
      }
    }
  }

  // 2b. Neighborhood level SEO for all 39 districts * neighborhoods * key pests (fare, bocek, pire)
  const targetPests = ['bocek', 'fare', 'pire'];
  
  for (const [, info] of Object.entries(istanbulNeighborhoods)) {
    const districtSlug = info.districtSlug;
    
    // If not already added in branches, add the district wide page
    if (!tckBranches.some(b => slugify(b.district) === districtSlug)) {
      seoRoutes.push({
        url: `${baseUrl}/hizmet/istanbul-${districtSlug}-bocek-ilaclama`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      });
    }

    for (const neighborhood of info.neighborhoods) {
      for (const pest of targetPests) {
        // Example: /hizmet/istanbul-kadikoy-moda-bocek-ilaclama
        seoRoutes.push({
          url: `${baseUrl}/hizmet/istanbul-${districtSlug}-${neighborhood.slug}-${pest}-ilaclama`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.5,
        });
      }
    }
  }

  // 3. Blog Routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'weekly' as const,
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

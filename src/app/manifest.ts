import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TCK İlaçlama',
    short_name: 'TCK İlaçlama',
    description: 'İstanbul merkezli profesyonel mobil haşere kontrol ve böcek ilaçlama servisi. 7/24 garantili hizmet.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    orientation: 'portrait',
    categories: ['business', 'lifestyle'],
    icons: [
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Hemen Teklif Al',
        short_name: 'Teklif',
        description: 'WhatsApp üzerinden hızlı fiyat teklifi alın',
        url: '/iletisim',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Blog & Rehberler',
        short_name: 'Blog',
        description: 'Haşere kontrolü rehberleri',
        url: '/blog',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
    ],
  }
}

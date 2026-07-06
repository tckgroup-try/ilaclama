import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TCK İlaçlama',
    short_name: 'TCK İlaçlama',
    description: 'İstanbul merkezli profesyonel mobil haşere kontrol ve böcek ilaçlama servisi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

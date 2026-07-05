import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TCK İlaçlama Laboratuvarları',
    short_name: 'TCK İlaçlama',
    description: 'İstanbul merkezli profesyonel mobil haşere kontrol ve biyosidal ilaçlama servisi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#e11d48',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

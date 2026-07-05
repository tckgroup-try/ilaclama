import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TCK İlaçlama | Premium Haşere Kontrol Laboratuvarı",
  description: "İstanbul merkezli, B2B ve B2C pazarında ultra-premium, steril ve kesin çözüm odaklı böcek ve haşere ilaçlama platformu. Acil müdahale ve 7/24 hizmet.",
  keywords: [
    "böcek ilaçlama", "haşere kontrol", "istanbul ilaçlama", "fare ilaçlama", 
    "pire ilaçlama", "hamam böceği ilaçlama", "fabrika ilaçlama", 
    "kurumsal ilaçlama", "TCK ilaçlama", "apartman ilaçlama", "garantili ilaçlama"
  ],
  openGraph: {
    title: "TCK İlaçlama | Garantili Haşere Kontrol",
    description: "İşletmeniz ve yaşam alanlarınız için bilimsel, garantili ve ultra-premium koruma kalkanı.",
    url: "https://www.tckilaclama.com",
    siteName: "TCK İlaçlama",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-zinc-900 text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-brand/30 selection:text-white`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Simple Footer */}
        <footer className="border-t border-white/5 py-12 mt-20 relative z-10">
          <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
            <p>&copy; {new Date().getFullYear()} TCK İlaçlama Laboratuvarları. Tüm hakları saklıdır.</p>
          </div>
        </footer>

        {/* Structured Data / JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "TCK İlaçlama",
              "image": "https://www.tckilaclama.com/logo.png",
              "url": "https://www.tckilaclama.com",
              "telephone": "+905300000000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Merkez Mah. İlaçlama Sok. No:1",
                "addressLocality": "Şişli",
                "addressRegion": "İstanbul",
                "postalCode": "34381",
                "addressCountry": "TR"
              },
              "priceRange": "$$",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "41.0082",
                  "longitude": "28.9784"
                },
                "geoRadius": "50000"
              }
            })
          }}
        />
      </body>
    </html>
  );
}

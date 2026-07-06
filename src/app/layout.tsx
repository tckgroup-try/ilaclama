import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { PWASetup } from "@/components/PWASetup";
import { SmoothScroll } from "@/components/SmoothScroll";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tckilaclama.com"),
  title: "TCK İlaçlama | İstanbul Böcek ve Haşere İlaçlama Hizmeti",
  description: "TCK İlaçlama: İstanbul'un lider böcek ilaçlama, haşere kontrol ve fümigasyon merkezi. Sağlık Bakanlığı onaylı, %100 kesin çözüm garantili, kokusuz, 7/24 acil müdahale. Ev, apartman, fabrika, gemi ve restoran ilaçlama hizmetleri. Hemen fiyat alın.",
  keywords: [
    // Core Head Terms
    "böcek ilaçlama", "haşere ilaçlama", "haşere kontrol", "istanbul böcek ilaçlama", "ilaçlama şirketleri", "ilaçlama firmaları", 
    // Specific Pests (Böcek/Haşere Türleri)
    "fare ilaçlama", "pire ilaçlama", "hamam böceği ilaçlama", "kalorifer böceği ilaçlama", "tahtakurusu ilaçlama", "akrep ilaçlama", "kene ilaçlama", "sivrisinek ilaçlama", "gümüş böceği ilaçlama", "karınca ilaçlama", "örümcek ilaçlama", "çıyan ilaçlama",
    // B2B & Commercial (Kurumsal ve Endüstriyel)
    "fabrika ilaçlama", "endüstriyel ilaçlama", "fümigasyon", "gemi ilaçlama", "restoran ilaçlama", "otel ilaçlama", "lokanta ilaçlama", "depo ilaçlama", "iş yeri ilaçlama", "ofis ilaçlama", "kurumsal ilaçlama", "şantiye ilaçlama", "okul ilaçlama", "hastane ilaçlama", "BRCGS ilaçlama", "HACCP pest kontrol", "IPM entegre zararlı yönetimi",
    // B2C & Residential (Bireysel)
    "ev ilaçlama", "apartman ilaçlama", "daire ilaçlama", "site ilaçlama", "bahçe ilaçlama", "bina ilaçlama", "çatı ilaçlama", "bodrum ilaçlama", "kömürlük ilaçlama",
    // Long-Tail & Intent (Arama Niyetleri)
    "garantili böcek ilaçlama", "kokusuz böcek ilaçlama", "sağlık bakanlığı onaylı ilaçlama", "7/24 acil böcek ilaçlama", "en iyi ilaçlama şirketi", "ucuz ilaçlama fiyatları", "ilaçlama servisi", "ilaçlama uzmanı", "böcek ilaçlama fiyatları 2026", "kesin çözüm fare ilaçlama", "biyosidal ürün uygulaması"
  ],
  openGraph: {
    title: "TCK İlaçlama | Garantili Böcek ve Haşere Kontrol Merkezi",
    description: "İstanbul genelinde 7/24 acil müdahale, kokusuz ve garantili haşere ilaçlama. Fabrika, restoran, gemi ve evleriniz için profesyonel ilaçlama çözümleri.",
    url: "https://www.tckilaclama.com",
    siteName: "TCK İlaçlama",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/images/tck_expert.png", width: 1200, height: 630, alt: "TCK İlaçlama Uzmanı" }]
  },
  alternates: {
    canonical: "https://www.tckilaclama.com",
  },
  authors: [{ name: "TCK Group" }],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="light">
      <head>
        {/* Advanced SEO: Organization & LocalBusiness Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.tckilaclama.com/#organization",
                  "name": "TCK İlaçlama",
                  "url": "https://www.tckilaclama.com",
                  "logo": "https://www.tckilaclama.com/images/tck_expert.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+90-501-635-50-53",
                    "contactType": "customer service",
                    "areaServed": "TR",
                    "availableLanguage": "Turkish"
                  },
                  "sameAs": [
                    "https://www.instagram.com/tckilaclama",
                    "https://www.facebook.com/tckilaclama"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.tckilaclama.com/#localbusiness",
                  "name": "TCK İlaçlama",
                  "image": "https://www.tckilaclama.com/images/tck_expert.png",
                  "telephone": "+905016355053",
                  "url": "https://www.tckilaclama.com",
                  "priceRange": "₺₺",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "İstanbul Merkezi",
                    "addressLocality": "İstanbul",
                    "addressRegion": "TR",
                    "addressCountry": "TR"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 41.0082,
                    "longitude": 28.9784
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                    ],
                    "opens": "00:00",
                    "closes": "23:59"
                  }
                }
              ]
            })
          }}
        />

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GYD22WWKC8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GYD22WWKC8');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-white text-slate-900 min-h-screen flex flex-col antialiased selection:bg-brand/30 selection:text-white`}>
        <SmoothScroll>
        <PWASetup />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Advanced Footer */}
        <footer className="border-t border-slate-200 py-12 mt-20 relative z-10 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-slate-900 mb-4">TCK İlaçlama</h3>
                <p className="text-slate-600 max-w-sm">
                  İstanbul genelinde 7/24 profesyonel böcek ve haşere ilaçlama servisi. Kokusuz, güvenli ve garantili çözümler.
                </p>
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold mb-4">Hızlı Bağlantılar</h4>
                <ul className="space-y-2">
                  <li><a href="/hakkimizda" className="text-slate-500 hover:text-brand transition-colors">Hakkımızda</a></li>
                  <li><a href="/hizmetler" className="text-slate-500 hover:text-brand transition-colors">Hizmetlerimiz</a></li>
                  <li><a href="/blog" className="text-slate-500 hover:text-brand transition-colors">Ustaların Notları (Blog)</a></li>
                  <li><a href="https://wa.me/905016355053?text=Merhaba,%20ila%C3%A7lama%20hizmetleri%20i%C3%A7in%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand transition-colors">WhatsApp ile Hızlı Teklif</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold mb-4">Kurumsal & Yasal</h4>
                <ul className="space-y-2">
                  <li><a href="/yasal/iso-sertifikalari" className="text-slate-500 hover:text-brand transition-colors">Kalite ve ISO Sertifikaları</a></li>
                  <li><a href="/yasal/kvkk-aydinlatma-metni" className="text-slate-500 hover:text-brand transition-colors">KVKK Aydınlatma Metni</a></li>
                  <li><a href="/yasal/gizlilik-politikasi" className="text-slate-500 hover:text-brand transition-colors">Gizlilik Politikası</a></li>
                  <li><a href="/yasal/kullanim-kosullari" className="text-slate-500 hover:text-brand transition-colors">Kullanım Koşulları</a></li>
                </ul>
              </div>
            </div>
            <div className="text-center text-slate-500 text-sm pt-8 border-t border-slate-200">
              <p>&copy; {new Date().getFullYear()} TCK İlaçlama. Tüm hakları saklıdır. TCK Group Kuruluşudur.</p>
            </div>
          </div>
        </footer>

        <FloatingWhatsApp />
        </SmoothScroll>
      </body>
    </html>
  );
}

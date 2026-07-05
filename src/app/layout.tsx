import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { PWASetup } from "@/components/PWASetup";
import Script from "next/script";

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
      <head>
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
      <body className={`${inter.className} bg-slate-900 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-brand/30 selection:text-white`}>
        <PWASetup />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Advanced Footer */}
        <footer className="border-t border-white/5 py-12 mt-20 relative z-10 bg-slate-950/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-4">TCK İlaçlama</h3>
                <p className="text-slate-400 max-w-sm">
                  İstanbul'un en profesyonel mobil haşere kontrol laboratuvarı. Biyosidal, kokusuz ve garantili çözümler.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Hızlı Bağlantılar</h4>
                <ul className="space-y-2">
                  <li><a href="/hakkimizda" className="text-slate-500 hover:text-brand transition-colors">Hakkımızda</a></li>
                  <li><a href="/hizmetler" className="text-slate-500 hover:text-brand transition-colors">Hizmetlerimiz</a></li>
                  <li><a href="/blog" className="text-slate-500 hover:text-brand transition-colors">Ustaların Notları (Blog)</a></li>
                  <li><a href="https://wa.me/905300000000?text=Merhaba,%20ila%C3%A7lama%20hizmetleri%20i%C3%A7in%20fiyat%20hesaplatmak%20istiyorum." target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand transition-colors">Fiyat Hesapla / Teklif Al</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Kurumsal & Yasal</h4>
                <ul className="space-y-2">
                  <li><a href="/yasal/iso-sertifikalari" className="text-slate-500 hover:text-brand transition-colors">Kalite ve ISO Sertifikaları</a></li>
                  <li><a href="/yasal/kvkk-aydinlatma-metni" className="text-slate-500 hover:text-brand transition-colors">KVKK Aydınlatma Metni</a></li>
                  <li><a href="/yasal/gizlilik-politikasi" className="text-slate-500 hover:text-brand transition-colors">Gizlilik Politikası</a></li>
                  <li><a href="/yasal/kullanim-kosullari" className="text-slate-500 hover:text-brand transition-colors">Kullanım Koşulları</a></li>
                </ul>
              </div>
            </div>
            <div className="text-center text-slate-600 text-sm pt-8 border-t border-white/5">
              <p>&copy; {new Date().getFullYear()} TCK İlaçlama Laboratuvarları. Tüm hakları saklıdır. TCK Group Kuruluşudur.</p>
            </div>
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
        
        {/* Mobile App SoftwareApplication Schema */}
        <Script
          id="software-app-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "TCK İlaçlama",
              "operatingSystem": "ANDROID, IOS",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY"
              },
              "description": "TCK İlaçlama mobil uygulaması ile tesislerinizin hijyen durumunu 7/24 anlık takip edebilir, BRCGS ve HACCP belgelerinizi inceleyebilir ve tek tıkla Acil Müdahale (SOS) ekibimizi çağırabilirsiniz."
            })
          }}
        />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

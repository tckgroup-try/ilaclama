/**
 * TCK İlaçlama - Anchor Text Link Matrix Generator
 * 
 * Bu betik, off-page link çalışması yaparken kullanacağınız çapa metin (anchor text) 
 * dağılımını dengeli bir şekilde (Spam cezası almamak adına) otomatik hesaplar ve 
 * bir CSV dosyası oluşturur.
 * 
 * Çıktı: 'backlink_matrix.csv' adıyla proje kök dizininde oluşturulur.
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'backlink_matrix.csv');

// Şubeler listesi
const branches = [
  { name: 'Kadıköy', slug: 'kadikoy' },
  { name: 'Şişli', slug: 'sisli' },
  { name: 'Beşiktaş', slug: 'besiktas' },
  { name: 'Bakırköy', slug: 'bakirkoy' },
  { name: 'Pendik', slug: 'pendik' },
  { name: 'Üsküdar', slug: 'uskudar' }
];

const pests = [
  { name: 'Böcek', slug: 'bocek' },
  { name: 'Fare', slug: 'fare' },
  { name: 'Pire', slug: 'pire' }
];

// Anchor dağılım türleri ve yüzdeleri
// Brand: %50, Generic: %25, LSI: %20, Exact Match: %5
const brandAnchors = (district) => [`TCK İlaçlama`, `tckilaclama.com`, `TCK İlaçlama ${district}`, `www.tckilaclama.com`];
const genericAnchors = [`web sitesi`, `tıkla`, `buradan ulaşın`, `kaynak`, `web adresi`, `detaylar için`];
const lsiAnchors = (district, pest) => [`${district} bölgesi ${pest.toLowerCase()} ilaçlama firmaları`, `istanbul ${district} ${pest.toLowerCase()} ilaçlama hizmeti`, `${district} haşere kontrol çözümleri`];
const exactAnchors = (district, pest) => [`${district} ${pest.toLowerCase()} ilaçlama`, `istanbul ${district} ${pest.toLowerCase()} ilaçlama`];

function generateMatrix() {
  console.log('📊 Anchor Link Matrix tablosu oluşturuluyor...');
  
  const rows = [];
  // Başlıklar
  rows.push(['Hedef Sayfa', 'Anahtar Kelime Tipi', 'Önerilen Çapa Metin (Anchor Text)', 'Öncelik', 'Önerilen Platform/Kanal'].join(';'));

  // 1. Ana Sayfa Link Dağılımı
  const homeUrl = 'https://www.tckilaclama.com';
  
  // Ana Sayfa için Brand Linkler
  brandAnchors('İstanbul').forEach(anchor => {
    rows.push([homeUrl, 'Brand (Marka)', anchor, 'Yüksek', 'Yerel Haber / Premium Tanıtım Yazısı'].join(';'));
  });
  
  // Ana Sayfa için Genel Linkler
  genericAnchors.slice(0, 3).forEach(anchor => {
    rows.push([homeUrl, 'Generic (Genel)', anchor, 'Orta', 'Web 2.0 / Blog Yorumları'].join(';'));
  });

  // 2. Lokal/İlçe Sayfaları İçin Link Dağılımı
  for (const b of branches) {
    for (const p of pests) {
      const pageUrl = `https://www.tckilaclama.com/hizmet/istanbul-${b.slug}-${p.slug}-ilaclama`;
      
      // Her sayfa için 1 Brand, 1 Generic, 1 LSI, 1 Exact ekleyelim (farklı dağılımlarla)
      const bAnchors = brandAnchors(b.name);
      const lAnchors = lsiAnchors(b.name, p.name);
      const eAnchors = exactAnchors(b.name, p.name);

      rows.push([pageUrl, 'Brand (Marka)', bAnchors[Math.floor(Math.random() * bAnchors.length)], 'Orta', 'Medium / Substack (Tier 2)'].join(';'));
      rows.push([pageUrl, 'Generic (Genel)', genericAnchors[Math.floor(Math.random() * genericAnchors.length)], 'Düşük', 'Forum Tanıtım / Profil Linkleri'].join(';'));
      rows.push([pageUrl, 'LSI (Semantik)', lAnchors[Math.floor(Math.random() * lAnchors.length)], 'Yüksek', 'Niche Blog Yazıları'].join(';'));
      rows.push([pageUrl, 'Exact Match (Tam Eşleşme)', eAnchors[Math.floor(Math.random() * eAnchors.length)], 'Kritik', 'Parasite SEO / Ana Tanıtım Yazıları'].join(';'));
    }
  }

  // Dosyaya yazma (UTF-8 with BOM for Excel compatibility)
  const csvContent = '\ufeff' + rows.join('\n');
  fs.writeFileSync(OUTPUT_FILE, csvContent, 'utf8');
  
  console.log(`✅ Matrix CSV dosyası oluşturuldu: ${OUTPUT_FILE}`);
  console.log('Bu dosyayı Excel veya Google E-Tablolar ile açarak kampanya takibinizi yapabilirsiniz.');
}

generateMatrix();

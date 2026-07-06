/**
 * TCK İlaçlama - Google Indexing API Automation Script
 * 
 * Bu betik, sitenizdeki tüm yerel hizmet sayfalarını (2000+ URL) Google Indexing API'ye 
 * toplu olarak göndermek için yazılmıştır.
 * 
 * Kullanım:
 * 1. Google Cloud Console'dan Indexing API'yi aktifleştirin.
 * 2. Bir Hizmet Hesabı (Service Account) oluşturup anahtarını JSON olarak indirin.
 * 3. İndirdiğiniz JSON dosyasını bu dizine 'service_account.json' adıyla kaydedin.
 * 4. Google Search Console'da ilgili mülke bu Hizmet Hesabı e-postasını "Sahip" (Owner) olarak ekleyin.
 * 5. 'node scripts/google-indexer.js' komutu ile çalıştırın.
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// 1. Yapılandırma ve Veriler
const BASE_URL = 'https://www.tckilaclama.com';
const PLACES = ['fabrika', 'ofis', 'apartman', 'restoran', 'villa', 'depo', 'gemi', 'otel', 'site'];
const PESTS = ['fare', 'bocek', 'pire', 'hamam-bocegi', 'akrep', 'kene', 'tahtakurusu', 'sivrisinek'];

// Şubeler listesi (src/data/branches.ts dosyasından senkronize edilmiştir)
const branches = [
  { district: 'Kadıköy' }, { district: 'Şişli' }, { district: 'Beşiktaş' }, 
  { district: 'Bakırköy' }, { district: 'Pendik' }, { district: 'Üsküdar' }, 
  { district: 'Maltepe' }, { district: 'Kartal' }, { district: 'Ümraniye' }, 
  { district: 'Ataşehir' }, { district: 'Sarıyer' }, { district: 'Beykoz' }, 
  { district: 'Beyoğlu' }, { district: 'Fatih' }, { district: 'Zeytinburnu' }, 
  { district: 'Başakşehir' }, { district: 'Beylikdüzü' }, { district: 'Esenyurt' }, 
  { district: 'Avcılar' }, { district: 'Küçükçekmece' }, { district: 'Bahçelievler' }, 
  { district: 'Bağcılar' }, { district: 'Gaziosmanpaşa' }, { district: 'Eyüpsultan' }, 
  { district: 'Kağıthane' }, { district: 'Şile' }, { district: 'Çekmeköy' }, 
  { district: 'Tuzla' }
];

// Türkçe karakterleri slug formatına çeviren fonksiyon
function slugify(text) {
  return text.toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-');
}

// Tüm dinamik URL'leri üreten fonksiyon
function generateUrls() {
  const urls = [];
  
  // Ana ve statik sayfalar
  urls.push(`${BASE_URL}`);
  urls.push(`${BASE_URL}/hizmetler`);
  urls.push(`${BASE_URL}/hakkimizda`);
  urls.push(`${BASE_URL}/hasereler`);
  urls.push(`${BASE_URL}/subelerimiz`);
  urls.push(`${BASE_URL}/blog`);

  // Programatik SEO Sayfaları (28 Şube * 9 Mekan * 8 Haşere = 2016 URL)
  for (const branch of branches) {
    const districtSlug = slugify(branch.district);
    
    // İlçe genel haşere sayfası
    urls.push(`${BASE_URL}/hizmet/istanbul-${districtSlug}-bocek-ilaclama`);

    // Alt mekan ve haşere kombinasyonları
    for (const place of PLACES) {
      for (const pest of PESTS) {
        urls.push(`${BASE_URL}/hizmet/istanbul-${districtSlug}-${place}-${pest}-ilaclama`);
      }
    }
  }

  return urls;
}

// 2. Google Indexing API İstemcisi Kurulumu
async function runIndexer() {
  console.log('🚀 TCK İlaçlama Indexing API Otomasyonu Başlatılıyor...');
  
  const keyPath = path.join(__dirname, '..', 'service_account.json');
  
  if (!fs.existsSync(keyPath)) {
    console.error('\n❌ HATA: service_account.json dosyası bulunamadı!');
    console.log('\nLütfen şu adımları izleyin:');
    console.log('1. Google Cloud Console\'da bir proje oluşturun veya seçin.');
    console.log('2. Web Arama Dizini Oluşturma (Web Search Indexing) API\'sini etkinleştirin.');
    console.log('3. "IAM ve Yönetici" -> "Hizmet Hesapları" bölümünden yeni bir hizmet hesabı oluşturun.');
    console.log('4. Hizmet hesabına ait bir JSON anahtarı (Key) oluşturup indirin.');
    console.log(`5. İndirilen JSON dosyasını adını "service_account.json" yaparak şu yola taşıyın:\n   ${keyPath}`);
    console.log('6. Google Search Console\'a gidin ve mülk ayarlarına bu hizmet hesabı e-postasını Sahip (Owner) olarak ekleyin.\n');
    process.exit(1);
  }

  // Google Kimlik Doğrulaması
  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const authClient = await auth.getClient();
  const indexing = google.indexing({
    version: 'v3',
    auth: authClient,
  });

  const urls = generateUrls();
  console.log(`📊 Toplam ${urls.length} adet URL başarıyla üretildi.`);
  console.log('⚠️ Günlük varsayılan kota limiti 200 URL\'dir. İstekler bu limite göre yapılacaktır.');

  // Günlük kota sınırı nedeniyle sadece ilk 200 URL'yi göndereceğiz (veya kullanıcının değiştirebileceği bir limit)
  const batchSize = 10;
  const limit = 200;
  const urlsToSend = urls.slice(0, limit);

  console.log(`⚡ İlk ${urlsToSend.length} URL sıraya alındı. Gönderim başlıyor...\n`);

  for (let i = 0; i < urlsToSend.length; i += batchSize) {
    const batch = urlsToSend.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (url) => {
      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ Gönderildi: ${url} -> Durum: ${response.status} (${response.statusText})`);
      } catch (error) {
        console.error(`❌ Hata (${url}):`, error.message || error);
      }
    }));

    // Rate limit aşımını önlemek için küçük bir bekleme süresi
    if (i + batchSize < urlsToSend.length) {
      console.log('⏱️ Rate limit aşımını önlemek için 2 saniye bekleniyor...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n🎉 Gönderim işlemi tamamlandı! Detaylar için Google Search Console mülkünüzü kontrol edebilirsiniz.');
}

runIndexer().catch((err) => {
  console.error('💥 Beklenmedik kritik hata:', err);
});

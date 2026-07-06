const fs = require('fs');
const path = require('path');

// Extract the same district & neighborhood database from generate-parasites
const istanbulNeighborhoods = {
  kadikoy: { districtName: 'Kadıköy', districtSlug: 'kadikoy', neighborhoods: ['Moda', 'Bostancı', 'Erenköy', 'Caddebostan', 'Göztepe', 'Suadiye', 'Acıbadem', 'Caferağa', 'Feneryolu', 'Fenerbahçe'] },
  sisli: { districtName: 'Şişli', districtSlug: 'sisli', neighborhoods: ['Mecidiyeköy', 'Nişantaşı', 'Teşvikiye', 'Harbiye', 'Feriköy', 'Fulya', 'Bomonti', 'Esentepe'] },
  besiktas: { districtName: 'Beşiktaş', districtSlug: 'besiktas', neighborhoods: ['Bebek', 'Ortaköy', 'Arnavutköy', 'Etiler', 'Levent', 'Gayrettepe', 'Balmumcu', 'Abbasağa', 'Dikilitaş'] },
  bakirkoy: { districtName: 'Bakırköy', districtSlug: 'bakirkoy', neighborhoods: ['Yeşilköy', 'Yeşilyurt', 'Florya', 'Ataköy', 'Kartaltepe', 'Zuhuratbaba', 'Şenlikköy'] },
  uskudar: { districtName: 'Üsküdar', districtSlug: 'uskudar', neighborhoods: ['Beylerbeyi', 'Çengelköy', 'Kuzguncuk', 'Altunizade', 'Ünalan', 'Acıbadem', 'Bulgurlu', 'Kandilli', 'Salacak'] },
  umraniye: { districtName: 'Ümraniye', districtSlug: 'umraniye', neighborhoods: ['Dudullu', 'Şerifali', 'Esenevler', 'Atakent', 'Ihlamurkuyu'] },
  fatih: { districtName: 'Fatih', districtSlug: 'fatih', neighborhoods: ['Balat', 'Eminönü', 'Aksaray', 'Karagümrük', 'Cerrahpaşa', 'Kocamustafapaşa'] },
  beyoglu: { districtName: 'Beyoğlu', districtSlug: 'beyoglu', neighborhoods: ['Taksim', 'Cihangir', 'Galata', 'Karaköy', 'Kasımpaşa', 'Sütlüce'] },
  sariyer: { districtName: 'Sarıyer', districtSlug: 'sariyer', neighborhoods: ['Tarabya', 'İstinye', 'Yeniköy', 'Maslak', 'Emirgan', 'Zekeriyaköy', 'Kilyos'] },
  pendik: { districtName: 'Pendik', districtSlug: 'pendik', neighborhoods: ['Kurtköy', 'Kaynarca', 'Güzelyalı', 'Esenyalı', 'Fevzi Çakmak'] },
  kartal: { districtName: 'Kartal', districtSlug: 'kartal', neighborhoods: ['Yakacık', 'Soğanlık', 'Uğur Mumcu', 'Atalar', 'Orhantepe'] },
  maltepe: { districtName: 'Maltepe', districtSlug: 'maltepe', neighborhoods: ['Küçükyalı', 'İdealtepe', 'Altıntepe', 'Zümrütevler', 'Cevizli'] },
  atasehir: { districtName: 'Ataşehir', districtSlug: 'atasehir', neighborhoods: ['İçerenköy', 'Kayışdağı', 'Küçükbakkalköy', 'Barbaros', 'Ataşehir Atatürk'] },
  beykoz: { districtName: 'Beykoz', districtSlug: 'beykoz', neighborhoods: ['Kavacık', 'Kanlıca', 'Anadoluhisarı', 'Göksu', 'Paşabahçe'] },
  zeytinburnu: { districtName: 'Zeytinburnu', districtSlug: 'zeytinburnu', neighborhoods: ['Merkezefendi', 'Kazlıçeşme', 'Telsiz', 'Seyitnizam'] },
  basaksehir: { districtName: 'Başakşehir', districtSlug: 'basaksehir', neighborhoods: ['Bahçeşehir', 'Kayaşehir', 'Altınşehir', 'İkitelli'] },
  beylikduzu: { districtName: 'Beylikdüzü', districtSlug: 'beylikduzu', neighborhoods: ['Gürpınar', 'Yakuplu', 'Kavaklı', 'Adnan Kahveci'] },
  esenyurt: { districtName: 'Esenyurt', districtSlug: 'esenyurt', neighborhoods: ['Mehterçeşme', 'Güzelyurt', 'Piri Reis', 'Kıraç'] },
  avcilar: { districtName: 'Avcılar', districtSlug: 'avcilar', neighborhoods: ['Gümüşpala', 'Ambarlı', 'Cihangir', 'Denizköşkler'] },
  kucukcekmece: { districtName: 'Küçükçekmece', districtSlug: 'kucukcekmece', neighborhoods: ['Cennet', 'Halkalı', 'Sefaköy', 'Kanarya'] },
  bahcelievler: { districtName: 'Bahçelievler', districtSlug: 'bahcelievler', neighborhoods: ['Şirinevler', 'Yenibosna', 'Soğanlı', 'Kocasinan'] },
  bagcilar: { districtName: 'Bağcılar', districtSlug: 'bagcilar', neighborhoods: ['Güneşli', 'Kirazlı', 'Mahmutbey', 'Göztepe'] },
  gaziosmanpasa: { districtName: 'Gaziosmanpaşa', districtSlug: 'gaziosmanpasa', neighborhoods: ['Karadeniz', 'Yıldıztabya', 'Bağlarbaşı'] },
  eyupsultan: { districtName: 'Eyüpsultan', districtSlug: 'eyupsultan', neighborhoods: ['Göktürk', 'Kemerburgaz', 'Alibeyköy'] },
  kagithane: { districtName: 'Kağıthane', districtSlug: 'kagithane', neighborhoods: ['Seyrantepe', 'Çeliktepe', 'Sanayi', 'Gültepe'] },
  sile: { districtName: 'Şile', districtSlug: 'sile', neighborhoods: ['Kumbaba', 'Balibey', 'Ağva'] },
  cekmekoy: { districtName: 'Çekmeköy', districtSlug: 'cekmekoy', neighborhoods: ['Taşdelen', 'Alemdağ', 'Ömerli'] },
  tuzla: { districtName: 'Tuzla', districtSlug: 'tuzla', neighborhoods: ['Yayla', 'Aydınlı', 'Postane', 'İstasyon'] },
  adalar: { districtName: 'Adalar', districtSlug: 'adalar', neighborhoods: ['Büyükada', 'Heybeliada', 'Burgazada', 'Kınalıada'] },
  arnavutkoy: { districtName: 'Arnavutköy', districtSlug: 'arnavutkoy', neighborhoods: ['Hadımköy', 'Haraççı', 'Bolluca'] },
  bayrampasa: { districtName: 'Bayrampaşa', districtSlug: 'bayrampasa', neighborhoods: ['Yıldırım', 'Kartaltepe', 'Cevatpaşa'] },
  buyukcekmece: { districtName: 'Büyükçekmece', districtSlug: 'buyukcekmece', neighborhoods: ['Mimaroba', 'Sinanoba', 'Kumburgaz'] },
  catalca: { districtName: 'Çatalca', districtSlug: 'catalca', neighborhoods: ['Kaleiçi', 'Ferhatpaşa', 'Binkılıç'] },
  esenler: { districtName: 'Esenler', districtSlug: 'esenler', neighborhoods: ['Menderes', 'Oruçreis', 'Turgutreis'] },
  gungoren: { districtName: 'Güngören', districtSlug: 'gungoren', neighborhoods: ['Merter', 'Haznedar', 'Tozkoparan'] },
  sancaktepe: { districtName: 'Sancaktepe', districtSlug: 'sancaktepe', neighborhoods: ['Yenidoğan', 'Samandıra', 'Sarıgazi'] },
  silivri: { districtName: 'Silivri', districtSlug: 'silivri', neighborhoods: ['Selimpaşa', 'Gümüşyaka', 'Ortaköy'] },
  sultanbeyli: { districtName: 'Sultanbeyli', districtSlug: 'sultanbeyli', neighborhoods: ['Battalgazi', 'Hasanpaşa', 'Mimar Sinan'] },
  sultangazi: { districtName: 'Sultangazi', districtSlug: 'sultangazi', neighborhoods: ['Cebeci', 'Habibler', 'Gazi'] }
};

const slugify = (text) => {
  return text.toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-');
};

function generateReadme() {
  console.log('📝 Generating SEO-optimized README.md sitemap index...');

  let markdown = `# İstanbul Böcek İlaçlama & Haşere Kontrol Hizmet Ağı - TCK İlaçlama

İstanbul genelinde 39 ilçede ve tüm mahallelerde Sağlık Bakanlığı onaylı, kokusuz, garantili ve profesyonel böcek ve haşere ilaçlama hizmeti sunuyoruz.

## 📞 Hızlı İletişim & Fiyat Teklifi
* **Resmi Web Sitesi:** [https://www.tckilaclama.com](https://www.tckilaclama.com)
* **7/24 Destek Hattı:** [+90 501 635 50 53](tel:+905016355053)
* **WhatsApp Mesaj Hattı:** [Hemen Canlı Sohbet Başlat](https://wa.me/905016355053?text=Merhaba,%20h%C4%B1zl%C4%B1%20ila%C3%A7lama%20teklifi%20almak%20istiyorum.)

---

## 🎖️ Sahip Olduğumuz Standartlar ve Yetki Belgeleri
* **ISO 9001:2015** Kalite Yönetim Sistemi Standardı
* **TSE Hizmet Yeterlilik Belgesi** (Haşere ve Böcek Kontrolü)
* **HACCP ve BRCGS** Uluslararası Gıda Standartlarına Tam Uyumlu Dezenfeksiyon
* **Sağlık Bakanlığı** Onaylı Ruhsatlı Biyosidal Ürün Uygulama İzni

---

## 📍 İstanbul İl, İlçe ve Mahalle İlaçlama Dizin Ağımız (Off-Page SEO Backlink Hub)

Aşağıdaki bağlantılar, İstanbul genelindeki tüm bölgeler için hazırladığımız özel haşere mücadele ve ilaçlama hizmet sayfalarımıza yönlendirmektedir:

`;

  const districts = Object.values(istanbulNeighborhoods);

  for (const dist of districts) {
    markdown += `\n### 🏙️ [${dist.districtName} Böcek İlaçlama](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-bocek-ilaclama)\n`;
    markdown += `* **Genel Hizmet Sayfası:** [${dist.districtName} İlaçlama Servisi](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-bocek-ilaclama)\n`;
    
    // Generate sitemap link matrix for neighborhoods and key pests (bocek, fare, pire)
    const links = [];
    for (const hood of dist.neighborhoods) {
      const hoodSlug = slugify(hood);
      links.push(`[${hood} İlaçlama](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-${hoodSlug}-bocek-ilaclama)`);
      links.push(`[${hood} Fare](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-${hoodSlug}-fare-ilaclama)`);
      links.push(`[${hood} Pire](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-${hoodSlug}-pire-ilaclama)`);
    }

    markdown += `* **Mahalle Bazlı Hizmet Noktaları:**\n  ${links.join(' | ')}\n`;
  }

  markdown += `\n\n---\n*Bu doküman, TCK İlaçlama platformu için otomatik olarak senkronize edilmiştir. Görüşleriniz ve detaylı bilgi edinmek için lütfen resmi web sitemizi ziyaret edin.*`;

  const outputPath = path.join(__dirname, '..', 'docs', 'README.md');
  fs.writeFileSync(outputPath, markdown, 'utf8');
  console.log(`✅ SEO README.md generated successfully at: ${outputPath}`);
}

generateReadme();

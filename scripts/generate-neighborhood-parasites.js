const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'parasite-seo-neighborhoods');

// Full list of 39 Istanbul districts and neighborhoods
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

const pestSpecs = {
  bocek: { name: 'Böcek', desc: 'yürüyen ve uçan haşerelerin kontrolü' },
  fare: { name: 'Fare', desc: 'kemirgen ve sıçan mücadelesi' },
  pire: { name: 'Pire', desc: 'zıplayan parazitlerin dezenfeksiyonu' },
  'hamam-bocegi': { name: 'Hamam Böceği', desc: 'kalorifer böceği ve karafatma ilaçlaması' },
  tahtakurusu: { name: 'Tahtakurusu', desc: 'kan emici parazit temizliği' },
  akrep: { name: 'Akrep', desc: 'zehirli eklembacaklıların bertarafı' },
  kene: { name: 'Kene', desc: 'bahçe ve yeşil alan kene önleme' }
};

const pestOrder = ['bocek', 'fare', 'pire', 'hamam-bocegi', 'tahtakurusu', 'akrep', 'kene'];

function slugify(text) {
  const map = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
    ' ': '-',
    '\'': '',
    '.': '',
    ',': ''
  };
  return text.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
}

function generate() {
  console.log('📝 Generating neighborhood-level local parasite SEO articles...');

  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const districtsArr = Object.values(istanbulNeighborhoods);
  let totalGenerated = 0;

  districtsArr.forEach((dist, idx) => {
    const pestSlug = pestOrder[idx % pestOrder.length];
    const pest = pestSpecs[pestSlug];
    const parentSlug = `istanbul-${dist.districtSlug}-${pestSlug}-ilaclama`;
    const phone = '+90 501 635 50 53';

    dist.neighborhoods.forEach(hood => {
      const hoodSlug = slugify(hood);
      const activeSlug = `istanbul-${dist.districtSlug}-${hoodSlug}-${pestSlug}-ilaclama`;
      
      const content = `
# İstanbul ${dist.districtName} ${hood} Mahallesi Garantili ${pest.name} İlaçlama

${dist.districtName} ilçesinin seçkin bölgelerinden biri olan **${hood} Mahallesi** genelinde, profesyonel [${pest.name} ilaçlama](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-bocek-ilaclama) ve dezenfeksiyon çözümleri sunuyoruz. Yaşam alanlarınızı tehdit eden haşerelere karşı Sağlık Bakanlığı onaylı ve çevre dostu ürünlerle 7/24 yanınızdayız.

---

### 📞 7/24 Kesintisiz İletişim & WhatsApp Destek Hattı
Haşere ve parazit problemlerine karşı hemen uzman kadromuzdan destek alın:
* [📞 Hemen Ara: +90 501 635 50 53](tel:+905016355053)
* [💬 WhatsApp Destek](https://wa.me/905016355053?text=Merhaba%2C%20${dist.districtName}%20${hood}%20ila%C3%A7lama%20hakk%C4%B1nda%20teklif%20almak%20istiyorum.)

---

## ${hood} Mahallesi İlaçlama Çözümleri

Evler, iş yerleri, depolar ve hassas alanlarda (cafe, restoran, tarihi yapılar) haşerelerin biyolojik yapılarına uygun ilaçlama teknikleri uyguluyoruz. **${hood}** bölgesinde yürüttüğümüz ${pest.desc} uygulamalarımız, kokusuz jel veya kokulu sıvı ilaç püskürtme yöntemleriyle profesyonel ekiplerimiz tarafından gerçekleştirilmektedir.

### Profesyonel Sürecimiz:
1. **Lokal Keşif:** Yuvalanma noktaları ve haşere yoğunluğu yerinde tespit edilir.
2. **Garantili Müdahale:** İnsan sağlığına ve evcil hayvanlara zarar vermeyen biyosidal ürünler kullanılır.
3. **Koruyucu Bariyer:** İlaçlama sonrası haşerelerin alana tekrar girmesini önleyen bariyerleme çalışması yapılır.

🎖️ **ISO 9001:2015** | 🛡️ **TSE SERTİFİKALI** | 🔬 **HACCP UYUMLU** | 🛡️ **BİYOSİDAL RUHSATLI**

---

## 📍 Bağlantılı Hizmet Noktalarımız
Bu hizmet noktası, ana hizmet bölgesi olan [İstanbul ${dist.districtName} ${pest.name} İlaçlama](https://istanbul-bocek-ilaclama.readme.io/docs/${parentSlug}) rehberine bağlı olarak çalışmaktadır. 

📍 **${dist.districtName} Genelinde Diğer Hizmet Verdiğimiz Bölgeler:**
${dist.neighborhoods.filter(n => n !== hood).map(n => `* **${n} Mahallesi** ${pest.name} İlaçlama`).slice(0, 5).join('\n')}

---

## 🔍 Popüler Arama Terimleri ve Etiket Bulutu

[#${dist.districtSlug} ${hoodSlug} ${pestSlug} ilaçlama](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-bocek-ilaclama) | [#${dist.districtSlug} ${hoodSlug} en yakın ilaçlama firması](https://www.tckilaclama.com/subelerimiz) | [#${dist.districtSlug} ${hoodSlug} böcek ilaçlama fiyatları](https://www.tckilaclama.com) | [#7/24 ${hoodSlug} acil dezenfeksiyon](https://wa.me/905016355053)

---

*Unutmayın, haşere ve böcek problemleri bekledikçe yayılır. Sağlıklı ve konforlu bir yaşam alanı için profesyonel destek almaktan çekinmeyin.*
`;

      const fileName = `parasite-${dist.districtSlug}-${hoodSlug}-${pestSlug}.md`;
      const filePath = path.join(OUTPUT_DIR, fileName);
      fs.writeFileSync(filePath, content.trim(), 'utf8');
      totalGenerated++;
    });
  });

  console.log(`\n🎉 Successfully generated ${totalGenerated} neighborhood-level parasite files!`);
}

generate();

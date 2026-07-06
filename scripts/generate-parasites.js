const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'parasite-seo');

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

// Target pest specifications and their dedicated high-quality images
const pestSpecs = {
  bocek: {
    name: 'Böcek',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    desc: 'yürüyen ve uçan haşerelerin kontrol altına alınması'
  },
  fare: {
    name: 'Fare',
    image: 'https://images.unsplash.com/photo-1473862170180-84429c611cef?auto=format&fit=crop&w=1200&q=80',
    desc: 'kemirgenlerin ve sıçanların kesin olarak uzaklaştırılması'
  },
  pire: {
    name: 'Pire',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    desc: 'zıplayan parazitlerin ve pire yuvalarının dezenfekte edilmesi'
  },
  'hamam-bocegi': {
    name: 'Hamam Böceği',
    image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&w=1200&q=80',
    desc: 'kalorifer böceği, karafatma ve Alman hamam böceği türlerinin yok edilmesi'
  },
  tahtakurusu: {
    name: 'Tahtakurusu',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    desc: 'yatak odası ve mobilya aralarındaki kan emici parazitlerin temizlenmesi'
  },
  akrep: {
    name: 'Akrep',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80',
    desc: 'zehirli eklembacaklıların ve nemli duvar çatlaklarındaki yuvaların yok edilmesi'
  },
  kene: {
    name: 'Kene',
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80',
    desc: 'bahçe, yeşil alanlar ve evcil hayvan alanlarındaki kene riskinin önlenmesi'
  }
};

const pestOrder = ['bocek', 'fare', 'pire', 'hamam-bocegi', 'tahtakurusu', 'akrep', 'kene'];

function generate() {
  console.log('📝 Generating 39 hyper-localized parasite SEO articles with custom tag clouds...');

  // Clean old files to prevent duplication issues
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const districtsArr = Object.values(istanbulNeighborhoods);

  districtsArr.forEach((dist, idx) => {
    // Determine pest for this district dynamically so we distribute keywords evenly
    const pestSlug = pestOrder[idx % pestOrder.length];
    const pest = pestSpecs[pestSlug];
    const phone = '+90 501 635 50 53';

    // Local neighborhoods for semantic optimization
    const localHoods = dist.neighborhoods.slice(0, 3);
    const localHoodsText = localHoods.join(', ');

    const neighborhoodsList = dist.neighborhoods.map(n => `* **${n} Mahallesi** ${pest.name} İlaçlama Hizmeti`).join('\n');

    // Dynamic black hat internal links (Silo structure)
    // Linking to adjacent 4 districts to build massive pagerank authority wheels
    const siloLinks = [];
    for (let k = 1; k <= 4; k++) {
      const targetDist = districtsArr[(idx + k) % districtsArr.length];
      const targetPestSlug = pestOrder[(idx + k) % pestOrder.length];
      const targetPest = pestSpecs[targetPestSlug];
      siloLinks.push(`    <a href="https://istanbul-bocek-ilaclama.readme.io/docs/istanbul-${targetDist.districtSlug}-${targetPestSlug}-ilaclama-rehberi" style="background: #ffffff; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 20px; font-size: 13px; color: #0284c7; text-decoration: none; font-weight: 500; display: inline-block;">📍 ${targetDist.districtName} ${targetPest.name} İlaçlama</a>`);
    }

    // Dynamic Tag Cloud with localized semantic search terms
    const customTags = `
    <a href="https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-${pestSlug}-ilaclama" style="font-size: 16px; color: #e11d48; text-decoration: none; font-weight: bold; margin: 0 5px;">#${dist.districtSlug} ${pestSlug} ilaçlama</a>
    <a href="https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-bocek-ilaclama" style="font-size: 12px; color: #475569; text-decoration: none; margin: 0 5px;">#${dist.districtSlug} böcek ilaçlama firması</a>
    <a href="https://www.tckilaclama.com/subelerimiz" style="font-size: 14px; color: #0d9488; text-decoration: none; font-weight: bold; margin: 0 5px;">#en yakın ${dist.districtSlug} ilaçlama şirketi</a>
    <a href="https://wa.me/905016355053" style="font-size: 13px; color: #4f46e5; text-decoration: none; margin: 0 5px;">#7/24 ${dist.districtSlug} acil ilaçlama</a>
    <a href="https://www.tckilaclama.com" style="font-size: 12px; color: #b45309; text-decoration: none; margin: 0 5px;">#garantili ${pest.name.toLowerCase()} dezenfeksiyonu</a>
    <a href="https://www.tckilaclama.com/hizmet/${pestSlug}-ilaclama" style="font-size: 15px; color: #0369a1; text-decoration: none; font-weight: bold; margin: 0 5px;">#${pest.name.toLowerCase()} mücadele yöntemleri</a>
    `;

    const content = `
# İstanbul ${dist.districtName} Bölgesinde Garantili ${pest.name} İlaçlama Hizmetleri Nasıl Yapılır?

![${dist.districtName} ${pest.name} İlaçlama Hizmetleri](${pest.image})

İstanbul'un en yoğun yerleşim yerlerinden biri olan **${dist.districtName}**, nemli yapısı ve mimari dokusu nedeniyle haşere problemlerinin sıkça yaşandığı bölgelerden biridir. Özellikle yaz aylarında artış gösteren **${pest.name.toLowerCase()}** sorunu, hem ev hem de iş yerlerinde konforu ve sağlığı ciddi şekilde tehdit etmektedir. Bu yazımızda, ${dist.districtName} bölgesinde profesyonel haşere kontrolü ve [${dist.districtName} ${pest.name.toLowerCase()} ilaçlama](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-${pestSlug}-ilaclama) hizmetlerinin nasıl yapıldığını detaylandırıyoruz.

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
  <h3 style="margin-top: 0; color: #0f172a; font-size: 18px;">📞 7/24 Kesintisiz İletişim &amp; WhatsApp Destek Hattı</h3>
  <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">İstanbul geneli garantili haşere kontrolü ve ücretsiz fiyat teklifi için doğrudan uzmanlarımızla görüşün.</p>
  <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
    <a href="tel:+905016355053" style="background-color: #e11d48; color: white; padding: 12px 25px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 15px; display: inline-block;">📞 Hemen Ara: +90 501 635 50 53</a>
    <a href="https://wa.me/905016355053?text=Merhaba%2C%20${dist.districtName}%20ila%C3%A7lama%20hakk%C4%B1nda%20teklif%20almak%20istiyorum." style="background-color: #25D366; color: white; padding: 12px 25px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 15px; display: inline-block;">💬 WhatsApp Destek</a>
  </div>
 </div>

 ## Neden Profesyonel İlaçlama Tercih Edilmelidir?

 Kişisel yöntemlerle (marketten alınan sprey ve toz ilaçlar) yapılan müdahaleler, haşere popülasyonunu tamamen bitirmediği gibi onların kimyasallara karşı bağışıklık kazanmasına neden olur. Profesyonel [böcek ilaçlama firmaları](https://www.tckilaclama.com), haşerenin biyolojik yapısına uygun Sağlık Bakanlığı onaylı dezenfeksiyon ve biyosidal ürünler kullanır. ${dist.districtName} genelinde, özellikle **${localHoodsText}** gibi yoğun yaşam alanlarında, ${pest.desc} konusunda garantili çözümler sunuyoruz.

 ### Profesyonel Sürecin Aşamaları:
 1. **Keşif ve Teşhis:** Hangi haşere türüyle karşı karşıya olunduğu ve yuvalanma alanları tespit edilir.
 2. **Doğru Formülasyon:** Kokusuz jel, kokulu sıvı veya dezenfeksiyon püskürtme yöntemlerinden en uygun olanı seçilir.
 3. **Uygulama ve Koruma Kalkanı:** İlaçlama sonrası haşerelerin alana tekrar girmesini önleyecek bariyer uygulamaları yapılır.

 ## ${dist.districtName} Bölgesine Özel İlaçlama Çözümleri

 ${dist.districtName} ilçesindeki tarihi binalar, apartmanlar ve restoranlar gibi hassas alanlarda çevre dostu, evcil hayvan dostu ve kokusuz ilaçlama çözümleri uygulamak kritik önem taşır. [TCK İlaçlama ${dist.districtName} Şubesi](https://www.tckilaclama.com/subelerimiz) ekipleri, bölgeyi ve lokal haşere davranışlarını çok iyi tanıyan uzman kadrosuyla 7/24 hizmet vermektedir.

 ### Sertifikalarımız ve Kalite Belgelerimiz
 Uygulamalarımızda dünya standartlarında kalite ve hijyen kurallarına uygun olarak hareket ediyoruz. ISO, TSE ve dezenfeksiyon sertifikalı hizmet sunmaktaymaktadır.

 <div style="display: flex; gap: 15px; justify-content: center; margin: 25px 0; flex-wrap: wrap;">
  <div style="border: 2px solid #0f172a; padding: 10px 15px; border-radius: 8px; font-weight: bold; color: #0f172a; font-size: 14px; text-align: center; background: #f8fafc;">🎖️ ISO 9001:2015</div>
  <div style="border: 2px solid #0f172a; padding: 10px 15px; border-radius: 8px; font-weight: bold; color: #0f172a; font-size: 14px; text-align: center; background: #f8fafc;">🛡️ TSE SERTİFİKALI</div>
  <div style="border: 2px solid #0f172a; padding: 10px 15px; border-radius: 8px; font-weight: bold; color: #0f172a; font-size: 14px; text-align: center; background: #f8fafc;">🔬 HACCP UYUMLU</div>
  <div style="border: 2px solid #0f172a; padding: 10px 15px; border-radius: 8px; font-weight: bold; color: #0f172a; font-size: 14px; text-align: center; background: #f8fafc;">🛡️ BİYOSİDAL RUHSATLI</div>
 </div>

 ## 📍 ${dist.districtName} Mahalleleri Hizmet Kapsamı
 ${dist.districtName} genelinde hizmet verdiğimiz mahalle listesi aşağıdadır:

 ${neighborhoodsList}

 ### Hizmet Detayları ve İletişim:
 * **Firma Yetkilisi:** TCK İlaçlama
 * **Telefon:** [${phone}](tel:${phone.replace(/\s+/g, '')})
 * **Web Sitesi:** [tckilaclama.com](https://www.tckilaclama.com)
 * **Hizmet Sayfası:** [İstanbul ${dist.districtName} İlaçlama](https://www.tckilaclama.com/hizmet/istanbul-${dist.districtSlug}-bocek-ilaclama)

 ### Yol Tarifi ve Konum Bilgisi:
 Aşağıdaki harita üzerinden ${dist.districtName} bölgesindeki şubemize ulaşabilir, yol tarifi alabilirsiniz:

 <iframe src="https://maps.google.com/maps?q=TCK%20%C4%B0la%C3%A7lama%20${dist.districtName}%20%C5%9Eubesi&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="350" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

 ## 🏷️ İstanbul Haşere İlaçlama Hizmet Bölgelerimiz

 <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
  <p style="font-weight: bold; margin-top: 0; color: #0f172a; font-size: 16px;">📍 Diğer Hizmet Noktalarımız:</p>
  <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
${siloLinks.join('\n')}
  </div>
 </div>

 ## 🔍 Popüler Arama Terimleri ve Etiket Bulutu

 <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
  <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; line-height: 2;">
${customTags}
  </div>
 </div>

 *Unutmayın, haşere sorunları ertelendikçe büyür. Sağlıklı ve hijyenik bir yaşam alanı için profesyonel destek almaktan çekinmeyin.*
`;

    const fileName = `parasite-${dist.districtSlug}-${pestSlug}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, content.trim(), 'utf8');
  });

  console.log(`\n🎉 Successfully generated 39 district parasite files with dynamic black hat SEO Silo structures!`);
}

generate();

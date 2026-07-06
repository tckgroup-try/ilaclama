const fs = require('fs');
const path = require('path');

// 1. Istanbul districts and neighborhoods
const istanbulNeighborhoods = {
  kadikoy: { districtSlug: 'kadikoy', neighborhoods: ['Moda', 'Bostancı', 'Erenköy', 'Caddebostan', 'Göztepe', 'Suadiye', 'Acıbadem', 'Caferağa', 'Feneryolu', 'Fenerbahçe'] },
  sisli: { districtSlug: 'sisli', neighborhoods: ['Mecidiyeköy', 'Nişantaşı', 'Teşvikiye', 'Harbiye', 'Feriköy', 'Fulya', 'Bomonti', 'Esentepe'] },
  besiktas: { districtSlug: 'besiktas', neighborhoods: ['Bebek', 'Ortaköy', 'Arnavutköy', 'Etiler', 'Levent', 'Gayrettepe', 'Balmumcu', 'Abbasağa', 'Dikilitaş'] },
  bakirkoy: { districtSlug: 'bakirkoy', neighborhoods: ['Yeşilköy', 'Yeşilyurt', 'Florya', 'Ataköy', 'Kartaltepe', 'Zuhuratbaba', 'Şenlikköy'] },
  uskudar: { districtSlug: 'uskudar', neighborhoods: ['Beylerbeyi', 'Çengelköy', 'Kuzguncuk', 'Altunizade', 'Ünalan', 'Acıbadem', 'Bulgurlu', 'Kandilli', 'Salacak'] },
  umraniye: { districtSlug: 'umraniye', neighborhoods: ['Dudullu', 'Şerifali', 'Esenevler', 'Atakent', 'Ihlamurkuyu'] },
  fatih: { districtSlug: 'fatih', neighborhoods: ['Balat', 'Eminönü', 'Aksaray', 'Karagümrük', 'Cerrahpaşa', 'Kocamustafapaşa'] },
  beyoglu: { districtSlug: 'beyoglu', neighborhoods: ['Taksim', 'Cihangir', 'Galata', 'Karaköy', 'Kasımpaşa', 'Sütlüce'] },
  sariyer: { districtSlug: 'sariyer', neighborhoods: ['Tarabya', 'İstinye', 'Yeniköy', 'Maslak', 'Emirgan', 'Zekeriyaköy', 'Kilyos'] },
  pendik: { districtSlug: 'pendik', neighborhoods: ['Kurtköy', 'Kaynarca', 'Güzelyalı', 'Esenyalı', 'Fevzi Çakmak'] },
  kartal: { districtSlug: 'kartal', neighborhoods: ['Yakacık', 'Soğanlık', 'Uğur Mumcu', 'Atalar', 'Orhantepe'] },
  maltepe: { districtSlug: 'maltepe', neighborhoods: ['Küçükyalı', 'İdealtepe', 'Altıntepe', 'Zümrütevler', 'Cevizli'] },
  atasehir: { districtSlug: 'atasehir', neighborhoods: ['İçerenköy', 'Kayışdağı', 'Küçükbakkalköy', 'Barbaros', 'Ataşehir Atatürk'] },
  beykoz: { districtSlug: 'beykoz', neighborhoods: ['Kavacık', 'Kanlıca', 'Anadoluhisarı', 'Göksu', 'Paşabahçe'] },
  zeytinburnu: { districtSlug: 'zeytinburnu', neighborhoods: ['Merkezefendi', 'Kazlıçeşme', 'Telsiz', 'Seyitnizam'] },
  basaksehir: { districtSlug: 'basaksehir', neighborhoods: ['Bahçeşehir', 'Kayaşehir', 'Altınşehir', 'İkitelli'] },
  beylikduzu: { districtSlug: 'beylikduzu', neighborhoods: ['Gürpınar', 'Yakuplu', 'Kavaklı', 'Adnan Kahveci'] },
  esenyurt: { districtSlug: 'esenyurt', neighborhoods: ['Mehterçeşme', 'Güzelyurt', 'Piri Reis', 'Kıraç'] },
  avcilar: { districtSlug: 'avcilar', neighborhoods: ['Gümüşpala', 'Ambarlı', 'Cihangir', 'Denizköşkler'] },
  kucukcekmece: { districtSlug: 'kucukcekmece', neighborhoods: ['Cennet', 'Halkalı', 'Sefaköy', 'Kanarya'] },
  bahcelievler: { districtSlug: 'bahcelievler', neighborhoods: ['Şirinevler', 'Yenibosna', 'Soğanlı', 'Kocasinan'] },
  bagcilar: { districtSlug: 'bagcilar', neighborhoods: ['Güneşli', 'Kirazlı', 'Mahmutbey', 'Göztepe'] },
  gaziosmanpasa: { districtSlug: 'gaziosmanpasa', neighborhoods: ['Karadeniz', 'Yıldıztabya', 'Bağlarbaşı'] },
  eyupsultan: { districtSlug: 'eyupsultan', neighborhoods: ['Göktürk', 'Kemerburgaz', 'Alibeyköy'] },
  kagithane: { districtSlug: 'kagithane', neighborhoods: ['Seyrantepe', 'Çeliktepe', 'Sanayi', 'Gültepe'] },
  sile: { districtSlug: 'sile', neighborhoods: ['Kumbaba', 'Balibey', 'Ağva'] },
  cekmekoy: { districtSlug: 'cekmekoy', neighborhoods: ['Taşdelen', 'Alemdağ', 'Ömerli'] },
  tuzla: { districtSlug: 'tuzla', neighborhoods: ['Yayla', 'Aydınlı', 'Postane', 'İstasyon'] },
  adalar: { districtSlug: 'adalar', neighborhoods: ['Büyükada', 'Heybeliada', 'Burgazada', 'Kınalıada'] },
  arnavutkoy: { districtSlug: 'arnavutkoy', neighborhoods: ['Hadımköy', 'Haraççı', 'Bolluca'] },
  bayrampasa: { districtSlug: 'bayrampasa', neighborhoods: ['Yıldırım', 'Kartaltepe', 'Cevatpaşa'] },
  buyukcekmece: { districtSlug: 'buyukcekmece', neighborhoods: ['Mimaroba', 'Sinanoba', 'Kumburgaz'] },
  catalca: { districtSlug: 'catalca', neighborhoods: ['Kaleiçi', 'Ferhatpaşa', 'Binkılıç'] },
  esenler: { districtSlug: 'esenler', neighborhoods: ['Menderes', 'Oruçreis', 'Turgutreis'] },
  gungoren: { districtSlug: 'gungoren', neighborhoods: ['Merter', 'Haznedar', 'Tozkoparan'] },
  sancaktepe: { districtSlug: 'sancaktepe', neighborhoods: ['Yenidoğan', 'Samandıra', 'Sarıgazi'] },
  silivri: { districtSlug: 'silivri', neighborhoods: ['Selimpaşa', 'Gümüşyaka', 'Ortaköy'] },
  sultanbeyli: { districtSlug: 'sultanbeyli', neighborhoods: ['Battalgazi', 'Hasanpaşa', 'Mimar Sinan'] },
  sultangazi: { districtSlug: 'sultangazi', neighborhoods: ['Cebeci', 'Habibler', 'Gazi'] }
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

// Generate the list of all URLs
function getUrls() {
  const urls = [];
  const domain = 'https://istanbul-bocek-ilaclama.readme.io';
  const districtsArr = Object.values(istanbulNeighborhoods);

  districtsArr.forEach((dist, idx) => {
    const pestSlug = pestOrder[idx % pestOrder.length];
    
    // Parent district guide
    urls.push(`${domain}/docs/istanbul-${dist.districtSlug}-${pestSlug}-ilaclama`);

    // Child neighborhood guides
    dist.neighborhoods.forEach(hood => {
      const hoodSlug = slugify(hood);
      urls.push(`${domain}/docs/istanbul-${dist.districtSlug}-${hoodSlug}-${pestSlug}-ilaclama`);
    });
  });

  return urls;
}

async function run() {
  console.log('🚀 IndexNow API Submission Script starting...');
  
  // Custom API key generated for this site ownership verification
  const key = 'a62886f7b15a45279f046b9a89d3429f';
  const host = 'istanbul-bocek-ilaclama.readme.io';
  const keyLocation = `https://${host}/${key}.txt`;
  
  const urls = getUrls();
  console.log(`📊 Found ${urls.length} URLs to submit to IndexNow.`);

  const payload = {
    host: host,
    key: key,
    keyLocation: keyLocation,
    urlList: urls
  };

  try {
    const res = await fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log(`📡 Sending batch submission request to api.indexnow.org...`);
    console.log(`Response Status: ${res.status} (${res.statusText})`);

    if (res.ok) {
      console.log('✅ URLs successfully submitted to IndexNow! Bing and Yandex have been notified.');
    } else {
      const errorText = await res.text();
      console.error('❌ IndexNow Submission failed:', errorText);
      console.log('\n💡 Tip: To verify your IndexNow submission, make sure you configure a 301 redirect in your ReadMe dashboard:');
      console.log(`   From: /${key}.txt`);
      console.log(`   To: a raw text file containing just "${key}" (e.g. host it on your main website as a static file or public url)`);
    }
  } catch (err) {
    console.error('❌ Network Error:', err.message);
  }
}

run();

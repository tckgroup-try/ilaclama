export interface DistrictNeighborhoods {
  districtName: string;
  districtSlug: string;
  neighborhoods: { name: string; slug: string }[];
}

export const istanbulNeighborhoods: Record<string, DistrictNeighborhoods> = {
  kadikoy: {
    districtName: 'Kadıköy',
    districtSlug: 'kadikoy',
    neighborhoods: [
      { name: 'Moda', slug: 'moda' },
      { name: 'Bostancı', slug: 'bostanci' },
      { name: 'Erenköy', slug: 'erenkoy' },
      { name: 'Caddebostan', slug: 'caddebostan' },
      { name: 'Göztepe', slug: 'goztepe' },
      { name: 'Suadiye', slug: 'suadiye' },
      { name: 'Acıbadem', slug: 'acibadem' },
      { name: 'Caferağa', slug: 'caferaga' },
      { name: 'Feneryolu', slug: 'feneryolu' },
      { name: 'Fenerbahçe', slug: 'fenerbahce' }
    ]
  },
  sisli: {
    districtName: 'Şişli',
    districtSlug: 'sisli',
    neighborhoods: [
      { name: 'Mecidiyeköy', slug: 'mecidiyekoy' },
      { name: 'Nişantaşı', slug: 'nisantasi' },
      { name: 'Teşvikiye', slug: 'tesvikiye' },
      { name: 'Harbiye', slug: 'harbiye' },
      { name: 'Feriköy', slug: 'ferikoy' },
      { name: 'Fulya', slug: 'fulya' },
      { name: 'Bomonti', slug: 'bomonti' },
      { name: 'Esentepe', slug: 'esentepe' }
    ]
  },
  besiktas: {
    districtName: 'Beşiktaş',
    districtSlug: 'besiktas',
    neighborhoods: [
      { name: 'Bebek', slug: 'bebek' },
      { name: 'Ortaköy', slug: 'ortakoy' },
      { name: 'Arnavutköy', slug: 'arnavutkoy' },
      { name: 'Etiler', slug: 'etiler' },
      { name: 'Levent', slug: 'levent' },
      { name: 'Gayrettepe', slug: 'gayrettepe' },
      { name: 'Balmumcu', slug: 'balmumcu' },
      { name: 'Abbasağa', slug: 'abbasaga' },
      { name: 'Dikilitaş', slug: 'dikilitash' }
    ]
  },
  bakirkoy: {
    districtName: 'Bakırköy',
    districtSlug: 'bakirkoy',
    neighborhoods: [
      { name: 'Yeşilköy', slug: 'yesilkoy' },
      { name: 'Yeşilyurt', slug: 'yesilyurt' },
      { name: 'Florya', slug: 'florya' },
      { name: 'Ataköy', slug: 'atakoy' },
      { name: 'Kartaltepe', slug: 'kartaltepe' },
      { name: 'Zuhuratbaba', slug: 'zuhuratbaba' },
      { name: 'Şenlikköy', slug: 'senlikkoy' }
    ]
  },
  uskudar: {
    districtName: 'Üsküdar',
    districtSlug: 'uskudar',
    neighborhoods: [
      { name: 'Beylerbeyi', slug: 'beylerbeyi' },
      { name: 'Çengelköy', slug: 'cengelkoy' },
      { name: 'Kuzguncuk', slug: 'kuzguncuk' },
      { name: 'Altunizade', slug: 'altunizade' },
      { name: 'Ünalan', slug: 'unalan' },
      { name: 'Acıbadem', slug: 'acibadem' },
      { name: 'Bulgurlu', slug: 'bulgurlu' },
      { name: 'Kandilli', slug: 'kandilli' },
      { name: 'Salacak', slug: 'salacak' }
    ]
  },
  umraniye: {
    districtName: 'Ümraniye',
    districtSlug: 'umraniye',
    neighborhoods: [
      { name: 'Dudullu', slug: 'dudullu' },
      { name: 'Şerifali', slug: 'serifali' },
      { name: 'Esenevler', slug: 'esenevler' },
      { name: 'Atakent', slug: 'atakent' },
      { name: 'Ihlamurkuyu', slug: 'ihlamurkuyu' }
    ]
  },
  fatih: {
    districtName: 'Fatih',
    districtSlug: 'fatih',
    neighborhoods: [
      { name: 'Balat', slug: 'balat' },
      { name: 'Eminönü', slug: 'eminonu' },
      { name: 'Aksaray', slug: 'aksaray' },
      { name: 'Karagümrük', slug: 'karagumruk' },
      { name: 'Cerrahpaşa', slug: 'cerrahpasa' },
      { name: 'Kocamustafapaşa', slug: 'kocamustafapasa' }
    ]
  },
  beyoglu: {
    districtName: 'Beyoğlu',
    districtSlug: 'beyoglu',
    neighborhoods: [
      { name: 'Taksim', slug: 'taksim' },
      { name: 'Cihangir', slug: 'cihangir' },
      { name: 'Galata', slug: 'galata' },
      { name: 'Karaköy', slug: 'karakoy' },
      { name: 'Kasımpaşa', slug: 'kasimpasa' },
      { name: 'Sütlüce', slug: 'sutluce' }
    ]
  },
  sariyer: {
    districtName: 'Sarıyer',
    districtSlug: 'sariyer',
    neighborhoods: [
      { name: 'Tarabya', slug: 'tarabya' },
      { name: 'İstinye', slug: 'istinye' },
      { name: 'Yeniköy', slug: 'yenikoy' },
      { name: 'Maslak', slug: 'maslak' },
      { name: 'Emirgan', slug: 'emirgan' },
      { name: 'Zekeriyaköy', slug: 'zekeriyakoy' },
      { name: 'Kilyos', slug: 'kilyos' }
    ]
  },
  pendik: {
    districtName: 'Pendik',
    districtSlug: 'pendik',
    neighborhoods: [
      { name: 'Kurtköy', slug: 'kurtkoy' },
      { name: 'Kaynarca', slug: 'kaynarca' },
      { name: 'Güzelyalı', slug: 'guzelyali' },
      { name: 'Esenyalı', slug: 'esenyali' },
      { name: 'Fevzi Çakmak', slug: 'fevzi-cakmak' }
    ]
  },
  kartal: {
    districtName: 'Kartal',
    districtSlug: 'kartal',
    neighborhoods: [
      { name: 'Yakacık', slug: 'yakacik' },
      { name: 'Soğanlık', slug: 'soganlik' },
      { name: 'Uğur Mumcu', slug: 'ugur-mumcu' },
      { name: 'Atalar', slug: 'atalar' },
      { name: 'Orhantepe', slug: 'orhantepe' }
    ]
  },
  maltepe: {
    districtName: 'Maltepe',
    districtSlug: 'maltepe',
    neighborhoods: [
      { name: 'Küçükyalı', slug: 'kucukyali' },
      { name: 'İdealtepe', slug: 'idealtepe' },
      { name: 'Altıntepe', slug: 'altintepe' },
      { name: 'Zümrütevler', slug: 'zumrutevler' },
      { name: 'Cevizli', slug: 'cevizli' }
    ]
  },
  atasehir: {
    districtName: 'Ataşehir',
    districtSlug: 'atasehir',
    neighborhoods: [
      { name: 'İçerenköy', slug: 'icerenkoy' },
      { name: 'Kayışdağı', slug: 'kayisdagi' },
      { name: 'Küçükbakkalköy', slug: 'kucukbakkalkoy' },
      { name: 'Barbaros', slug: 'barbaros' },
      { name: 'Ataşehir Atatürk', slug: 'ataturk' }
    ]
  },
  beykoz: {
    districtName: 'Beykoz',
    districtSlug: 'beykoz',
    neighborhoods: [
      { name: 'Kavacık', slug: 'kavacik' },
      { name: 'Kanlıca', slug: 'kanlica' },
      { name: 'Anadoluhisarı', slug: 'anadoluhisari' },
      { name: 'Göksu', slug: 'goksu' },
      { name: 'Paşabahçe', slug: 'pasabahce' }
    ]
  },
  zeytinburnu: {
    districtName: 'Zeytinburnu',
    districtSlug: 'zeytinburnu',
    neighborhoods: [
      { name: 'Merkezefendi', slug: 'merkezefendi' },
      { name: 'Kazlıçeşme', slug: 'kazlicesme' },
      { name: 'Telsiz', slug: 'telsiz' },
      { name: 'Seyitnizam', slug: 'seyitnizam' }
    ]
  },
  basaksehir: {
    districtName: 'Başakşehir',
    districtSlug: 'basaksehir',
    neighborhoods: [
      { name: 'Bahçeşehir', slug: 'bahcesehir' },
      { name: 'Kayaşehir', slug: 'kayasehir' },
      { name: 'Altınşehir', slug: 'altinsehir' },
      { name: 'İkitelli', slug: 'ikitelli' }
    ]
  },
  beylikduzu: {
    districtName: 'Beylikdüzü',
    districtSlug: 'beylikduzu',
    neighborhoods: [
      { name: 'Gürpınar', slug: 'gurpinar' },
      { name: 'Yakuplu', slug: 'yakuplu' },
      { name: 'Kavaklı', slug: 'kavakli' },
      { name: 'Adnan Kahveci', slug: 'adnan-kahveci' }
    ]
  },
  esenyurt: {
    districtName: 'Esenyurt',
    districtSlug: 'esenyurt',
    neighborhoods: [
      { name: 'Mehterçeşme', slug: 'mehtercesme' },
      { name: 'Güzelyurt', slug: 'guzelyurt' },
      { name: 'Piri Reis', slug: 'piri-reis' },
      { name: 'Kıraç', slug: 'kirac' }
    ]
  },
  avcilar: {
    districtName: 'Avcılar',
    districtSlug: 'avcilar',
    neighborhoods: [
      { name: 'Gümüşpala', slug: 'gumuspala' },
      { name: 'Ambarlı', slug: 'ambarli' },
      { name: 'Cihangir', slug: 'cihangir' },
      { name: 'Denizköşkler', slug: 'denizkoskler' }
    ]
  },
  kucukcekmece: {
    districtName: 'Küçükçekmece',
    districtSlug: 'kucukcekmece',
    neighborhoods: [
      { name: 'Cennet', slug: 'cennet' },
      { name: 'Halkalı', slug: 'halkali' },
      { name: 'Sefaköy', slug: 'sefakoy' },
      { name: 'Kanarya', slug: 'kanarya' }
    ]
  },
  bahcelievler: {
    districtName: 'Bahçelievler',
    districtSlug: 'bahcelievler',
    neighborhoods: [
      { name: 'Şirinevler', slug: 'sirinevler' },
      { name: 'Yenibosna', slug: 'yenibosna' },
      { name: 'Soğanlı', slug: 'soganli' },
      { name: 'Kocasinan', slug: 'kocasinan' }
    ]
  },
  bagcilar: {
    districtName: 'Bağcılar',
    districtSlug: 'bagcilar',
    neighborhoods: [
      { name: 'Güneşli', slug: 'gunesli' },
      { name: 'Kirazlı', slug: 'kirazli' },
      { name: 'Mahmutbey', slug: 'mahmutbey' },
      { name: 'Göztepe', slug: 'goztepe' }
    ]
  },
  gaziosmanpasa: {
    districtName: 'Gaziosmanpaşa',
    districtSlug: 'gaziosmanpasa',
    neighborhoods: [
      { name: 'Karadeniz', slug: 'karadeniz' },
      { name: 'Yıldıztabya', slug: 'yildiztabya' },
      { name: 'Bağlarbaşı', slug: 'baglarbasi' }
    ]
  },
  eyupsultan: {
    districtName: 'Eyüpsultan',
    districtSlug: 'eyupsultan',
    neighborhoods: [
      { name: 'Göktürk', slug: 'gokturk' },
      { name: 'Kemerburgaz', slug: 'kemerburgaz' },
      { name: 'Alibeyköy', slug: 'alibeykoy' }
    ]
  },
  kagithane: {
    districtName: 'Kağıthane',
    districtSlug: 'kagithane',
    neighborhoods: [
      { name: 'Seyrantepe', slug: 'seyrantepe' },
      { name: 'Çeliktepe', slug: 'celiktepe' },
      { name: 'Sanayi', slug: 'sanayi' },
      { name: 'Gültepe', slug: 'gultepe' }
    ]
  },
  sile: {
    districtName: 'Şile',
    districtSlug: 'sile',
    neighborhoods: [
      { name: 'Kumbaba', slug: 'kumbaba' },
      { name: 'Balibey', slug: 'balibey' },
      { name: 'Ağva', slug: 'agva' }
    ]
  },
  cekmekoy: {
    districtName: 'Çekmeköy',
    districtSlug: 'cekmekoy',
    neighborhoods: [
      { name: 'Taşdelen', slug: 'tasdelen' },
      { name: 'Alemdağ', slug: 'alemdag' },
      { name: 'Ömerli', slug: 'omerli' }
    ]
  },
  tuzla: {
    districtName: 'Tuzla',
    districtSlug: 'tuzla',
    neighborhoods: [
      { name: 'Yayla', slug: 'yayla' },
      { name: 'Aydınlı', slug: 'aydinli' },
      { name: 'Postane', slug: 'postane' },
      { name: 'İstasyon', slug: 'istasyon' }
    ]
  },
  adalar: {
    districtName: 'Adalar',
    districtSlug: 'adalar',
    neighborhoods: [
      { name: 'Büyükada', slug: 'buyukada' },
      { name: 'Heybeliada', slug: 'heybeliada' },
      { name: 'Burgazada', slug: 'burgazada' },
      { name: 'Kınalıada', slug: 'kinaliada' }
    ]
  },
  arnavutkoy: {
    districtName: 'Arnavutköy',
    districtSlug: 'arnavutkoy',
    neighborhoods: [
      { name: 'Hadımköy', slug: 'hadimkoy' },
      { name: 'Haraççı', slug: 'haracci' },
      { name: 'Bolluca', slug: 'bolluca' }
    ]
  },
  bayrampasa: {
    districtName: 'Bayrampaşa',
    districtSlug: 'bayrampasa',
    neighborhoods: [
      { name: 'Yıldırım', slug: 'yildirim' },
      { name: 'Kartaltepe', slug: 'kartaltepe' },
      { name: 'Cevatpaşa', slug: 'cevatpasa' }
    ]
  },
  buyukcekmece: {
    districtName: 'Büyükçekmece',
    districtSlug: 'buyukcekmece',
    neighborhoods: [
      { name: 'Mimaroba', slug: 'mimaroba' },
      { name: 'Sinanoba', slug: 'sinanoba' },
      { name: 'Kumburgaz', slug: 'kumburgaz' }
    ]
  },
  catalca: {
    districtName: 'Çatalca',
    districtSlug: 'catalca',
    neighborhoods: [
      { name: 'Kaleiçi', slug: 'kaleici' },
      { name: 'Ferhatpaşa', slug: 'ferhatpasa' },
      { name: 'Binkılıç', slug: 'binkilic' }
    ]
  },
  esenler: {
    districtName: 'Esenler',
    districtSlug: 'esenler',
    neighborhoods: [
      { name: 'Menderes', slug: 'menderes' },
      { name: 'Oruçreis', slug: 'orucreis' },
      { name: 'Turgutreis', slug: 'turgutreis' }
    ]
  },
  gungoren: {
    districtName: 'Güngören',
    districtSlug: 'gungoren',
    neighborhoods: [
      { name: 'Merter', slug: 'merter' },
      { name: 'Haznedar', slug: 'haznedar' },
      { name: 'Tozkoparan', slug: 'tozkoparan' }
    ]
  },
  sancaktepe: {
    districtName: 'Sancaktepe',
    districtSlug: 'sancaktepe',
    neighborhoods: [
      { name: 'Yenidoğan', slug: 'yenidogan' },
      { name: 'Samandıra', slug: 'samandira' },
      { name: 'Sarıgazi', slug: 'sarigazi' }
    ]
  },
  silivri: {
    districtName: 'Silivri',
    districtSlug: 'silivri',
    neighborhoods: [
      { name: 'Selimpaşa', slug: 'selimpasa' },
      { name: 'Gümüşyaka', slug: 'gumusyaka' },
      { name: 'Ortaköy', slug: 'ortakoy' }
    ]
  },
  sultanbeyli: {
    districtName: 'Sultanbeyli',
    districtSlug: 'sultanbeyli',
    neighborhoods: [
      { name: 'Battalgazi', slug: 'battalgazi' },
      { name: 'Hasanpaşa', slug: 'hasanpasa' },
      { name: 'Mimar Sinan', slug: 'mimar-sinan' }
    ]
  },
  sultangazi: {
    districtName: 'Sultangazi',
    districtSlug: 'sultangazi',
    neighborhoods: [
      { name: 'Cebeci', slug: 'cebeci' },
      { name: 'Habibler', slug: 'habibler' },
      { name: 'Gazi', slug: 'gazi' }
    ]
  }
};

// Create a fast-lookup list of all neighborhood slugs in Istanbul
export const ALL_NEIGHBORHOOD_SLUGS = new Set(
  Object.values(istanbulNeighborhoods).flatMap((d) => d.neighborhoods.map((n) => n.slug))
);

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.README_API_KEY;
const BRANCH = '1.0';
const BASE_URL = 'https://api.readme.com/v2';
const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'accept': 'application/json'
};

const districtNames = {
  kadikoy: 'Kadıköy', sisli: 'Şişli', besiktas: 'Beşiktaş', bakirkoy: 'Bakırköy',
  uskudar: 'Üsküdar', umraniye: 'Ümraniye', fatih: 'Fatih', beyoglu: 'Beyoğlu',
  sariyer: 'Sarıyer', pendik: 'Pendik', kartal: 'Kartal', maltepe: 'Maltepe',
  atasehir: 'Ataşehir', beykoz: 'Beykoz', zeytinburnu: 'Zeytinburnu', basaksehir: 'Başakşehir',
  beylikduzu: 'Beylikdüzü', esenyurt: 'Esenyurt', avcilar: 'Avcılar', kucukcekmece: 'Küçükçekmece',
  bahcelievler: 'Bahçelievler', bagcilar: 'Bağcılar', gaziosmanpasa: 'Gaziosmanpaşa',
  eyupsultan: 'Eyüpsultan', kagithane: 'Kağıthane', sile: 'Şile', cekmekoy: 'Çekmeköy',
  tuzla: 'Tuzla', adalar: 'Adalar', arnavutkoy: 'Arnavutköy', bayrampasa: 'Bayrampaşa',
  buyukcekmece: 'Büyükçekmece', catalca: 'Çatalca', esenler: 'Esenler', gungoren: 'Güngören',
  sancaktepe: 'Sancaktepe', silivri: 'Silivri', sultanbeyli: 'Sultanbeyli', sultangazi: 'Sultangazi'
};

const pestNames = {
  bocek: 'Böcek', fare: 'Fare', pire: 'Pire', 'hamam-bocegi': 'Hamam Böceği',
  tahtakurusu: 'Tahtakurusu', akrep: 'Akrep', kene: 'Kene'
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  console.log('🚀 Starting ReadMe.com Neighborhood SEO publishing (Parent-Child Silo)...');

  // 1. Fetch category
  let categoryUri = '';
  try {
    const catRes = await fetch(`${BASE_URL}/branches/${BRANCH}/categories/guides`, {
      method: 'GET',
      headers: HEADERS
    });
    if (!catRes.ok) throw new Error(`HTTP ${catRes.status}`);
    const catData = await catRes.json();
    const existingCat = catData.data.find(c => c.title.toLowerCase() === 'rehberler' || c.title.toLowerCase() === 'getting started');
    categoryUri = existingCat ? existingCat.uri : catData.data[0].uri;
  } catch (error) {
    console.error('❌ Error handling categories:', error.message);
    process.exit(1);
  }

  // 2. Read neighborhood files
  const neighborhoodDir = path.join(__dirname, '..', 'parasite-seo-neighborhoods');
  let files;
  try {
    files = fs.readdirSync(neighborhoodDir).filter(f => f.endsWith('.md'));
  } catch (error) {
    console.error(`❌ Error reading directory: ${error.message}`);
    process.exit(1);
  }

  console.log(`📋 Found ${files.length} neighborhood articles to publish. Starting upload...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(neighborhoodDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Parse title & body
    const lines = content.split('\n');
    let title = '';
    let titleIdx = -1;
    for (let j = 0; j < lines.length; j++) {
      if (lines[j].startsWith('# ')) {
        title = lines[j].replace('# ', '').trim();
        titleIdx = j;
        break;
      }
    }
    const body = lines.filter((_, idx) => idx !== titleIdx).join('\n').trim();

    // Parse name parts from filename: parasite-${dist.districtSlug}-${hoodSlug}-${pestSlug}.md
    const nameWithoutExt = path.basename(file, '.md');
    const slugParts = nameWithoutExt.split('-'); 
    const distSlug = slugParts[1];

    const pests = ['bocek', 'fare', 'pire', 'hamam-bocegi', 'tahtakurusu', 'akrep', 'kene'];
    let pestSlug = '';
    for (const p of pests) {
      if (nameWithoutExt.endsWith(`-${p}`)) {
        pestSlug = p;
        break;
      }
    }

    const prefix = `parasite-${distSlug}-`;
    const suffix = `-${pestSlug}`;
    const hoodSlug = nameWithoutExt.substring(prefix.length, nameWithoutExt.length - suffix.length);

    const friendlyDistrict = districtNames[distSlug] || distSlug.toUpperCase();
    const friendlyPest = pestNames[pestSlug] || pestSlug.toUpperCase();

    const activeSlug = `istanbul-${distSlug}-${hoodSlug}-${pestSlug}-ilaclama`;
    const parentSlug = `istanbul-${distSlug}-${pestSlug}-ilaclama`;
    const descText = `İstanbul ${friendlyDistrict} ilçesi ${hoodSlug.toUpperCase()} mahallesi garantili ${friendlyPest.toLowerCase()} ilaçlama ve dezenfeksiyon hizmeti. Sağlık Bakanlığı onaylı 7/24 hizmet.`;

    const payload = {
      title: title,
      content: {
        body: body,
        excerpt: descText,
        type: 'markdown'
      },
      slug: activeSlug,
      category: {
        uri: categoryUri
      },
      parent: {
        slug: parentSlug // NEST UNDER DISTRICT PAGE
      },
      metadata: {
        title: `${friendlyDistrict} ${hoodSlug.toUpperCase()} Mahallesi ${friendlyPest} İlaçlama | TCK İlaçlama`,
        description: descText,
        keywords: `${friendlyDistrict} ${hoodSlug} ilaclama, ${hoodSlug} dezenfeksiyon, en yakin ${friendlyPest.toLowerCase()} ilaclama firmasi`
      },
      hidden: false
    };

    console.log(`[${i + 1}/${files.length}] 🏠 Publishing: "${title}" (Parent: ${parentSlug})...`);

    try {
      let docRes = await fetch(`${BASE_URL}/branches/${BRANCH}/guides`, {
        method: 'POST',
        headers: {
          ...HEADERS,
          'prefer': 'handling=strict'
        },
        body: JSON.stringify(payload)
      });

      if (docRes.status === 409) {
        // Exists, update it
        const updateRes = await fetch(`${BASE_URL}/branches/${BRANCH}/guides/${activeSlug}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify(payload)
        });
        if (updateRes.ok) {
          console.log(`  ✅ Successfully updated`);
        } else {
          console.error(`  ❌ Failed to update: ${updateRes.status}`);
        }
      } else if (docRes.ok) {
        console.log(`  ✅ Successfully created`);
      } else {
        console.error(`  ❌ Failed to create: ${docRes.status}`);
      }
    } catch (error) {
      console.error(`  ❌ Network error:`, error.message);
    }

    await delay(300); // 300ms throttling to be safe with rate limits
  }

  console.log('\n🏁 Neighborhood SEO sync complete!');
}

run();

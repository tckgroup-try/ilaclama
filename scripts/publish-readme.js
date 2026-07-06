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
  kadikoy: 'Kadıköy',
  sisli: 'Şişli',
  besiktas: 'Beşiktaş',
  bakirkoy: 'Bakırköy',
  uskudar: 'Üsküdar',
  umraniye: 'Ümraniye',
  fatih: 'Fatih',
  beyoglu: 'Beyoğlu',
  sariyer: 'Sarıyer',
  pendik: 'Pendik',
  kartal: 'Kartal',
  maltepe: 'Maltepe',
  atasehir: 'Ataşehir',
  beykoz: 'Beykoz',
  zeytinburnu: 'Zeytinburnu',
  basaksehir: 'Başakşehir',
  beylikduzu: 'Beylikdüzü',
  esenyurt: 'Esenyurt',
  avcilar: 'Avcılar',
  kucukcekmece: 'Küçükçekmece',
  bahcelievler: 'Bahçelievler',
  bagcilar: 'Bağcılar',
  gaziosmanpasa: 'Gaziosmanpaşa',
  eyupsultan: 'Eyüpsultan',
  kagithane: 'Kağıthane',
  sile: 'Şile',
  cekmekoy: 'Çekmeköy',
  tuzla: 'Tuzla',
  adalar: 'Adalar',
  arnavutkoy: 'Arnavutköy',
  bayrampasa: 'Bayrampaşa',
  buyukcekmece: 'Büyükçekmece',
  catalca: 'Çatalca',
  esenler: 'Esenler',
  gungoren: 'Güngören',
  sancaktepe: 'Sancaktepe',
  silivri: 'Silivri',
  sultanbeyli: 'Sultanbeyli',
  sultangazi: 'Sultangazi'
};

const pestNames = {
  bocek: 'Böcek',
  fare: 'Fare',
  pire: 'Pire',
  'hamam-bocegi': 'Hamam Böceği',
  tahtakurusu: 'Tahtakurusu',
  akrep: 'Akrep',
  kene: 'Kene'
};

// Helper function to introduce delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  console.log('🚀 Starting ReadMe.com Parasite SEO publishing operation...');
  
  // 1. Fetch category
  let categoryUri = '';
  try {
    const catRes = await fetch(`${BASE_URL}/branches/${BRANCH}/categories/guides`, {
      method: 'GET',
      headers: HEADERS
    });
    
    if (!catRes.ok) {
      throw new Error(`Failed to fetch categories: ${catRes.status} ${catRes.statusText}`);
    }
    
    const catData = await catRes.json();
    const existingCat = catData.data.find(c => c.title.toLowerCase() === 'rehberler' || c.title.toLowerCase() === 'getting started');
    
    if (existingCat) {
      categoryUri = existingCat.uri;
      console.log(`✅ Using existing category: "${existingCat.title}" (${categoryUri})`);
    } else {
      categoryUri = catData.data[0].uri;
      console.log(`✅ Fell back to category: "${catData.data[0].title}" (${categoryUri})`);
    }
  } catch (error) {
    console.error('❌ Error handling categories:', error.message);
    process.exit(1);
  }

  // 2. Read and upload parasite SEO documents
  const parasiteDir = path.join(__dirname, '..', 'parasite-seo');
  let files;
  try {
    files = fs.readdirSync(parasiteDir).filter(f => f.endsWith('.md'));
  } catch (error) {
    console.error(`❌ Error reading parasite-seo directory: ${error.message}`);
    process.exit(1);
  }

  console.log(`📋 Found ${files.length} articles to publish. Starting upload...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(parasiteDir, file);
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`❌ Error reading file ${file}: ${error.message}`);
      continue;
    }

    // Parse title and body
    const lines = content.split('\n');
    let title = 'Haşere İlaçlama Rehberi';
    let titleIdx = -1;

    for (let j = 0; j < lines.length; j++) {
      if (lines[j].startsWith('# ')) {
        title = lines[j].replace('# ', '').trim();
        titleIdx = j;
        break;
      }
    }

    let bodyLines = [];
    for (let j = 0; j < lines.length; j++) {
      if (j !== titleIdx) {
        bodyLines.push(lines[j]);
      }
    }
    const body = bodyLines.join('\n').trim();

    // Map file name to a clean, descriptive slug
    const nameWithoutExt = path.basename(file, '.md');
    const slugParts = nameWithoutExt.split('-');
    
    const districtSlug = slugParts[1];
    const pestSlug = slugParts.slice(2).join('-'); // handles 'hamam-bocegi' correctly
    
    const friendlyDistrict = districtNames[districtSlug] || districtSlug.toUpperCase();
    const friendlyPest = pestNames[pestSlug] || pestSlug.toUpperCase();

    const slug = `istanbul-${districtSlug}-${pestSlug}-ilaclama-rehberi`;

    const payload = {
      title: title,
      content: {
        body: body,
        type: 'markdown'
      },
      slug: slug,
      category: {
        uri: categoryUri
      },
      metadata: {
        title: `İstanbul ${friendlyDistrict} ${friendlyPest} İlaçlama | %100 Garantili TCK İlaçlama`,
        description: `İstanbul ${friendlyDistrict} bölgesinde profesyonel dezenfeksiyon ve ${friendlyPest.toLowerCase()} ilaçlama hizmeti. Sağlık Bakanlığı onaylı biyosidal ilaçlar ve TSE belgeli uzman kadroyla 7/24 hizmetinizdeyiz.`,
        keywords: `${friendlyDistrict} ${friendlyPest.toLowerCase()} ilaclama, ${friendlyDistrict} dezenfeksiyon, en yakin ${friendlyPest.toLowerCase()} ilaclama firmasi`
      },
      hidden: false
    };

    console.log(`[${i + 1}/${files.length}] 📄 Publishing "${title}" (Slug: ${slug})...`);

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
        // Document already exists, let's update it with PATCH
        const updateRes = await fetch(`${BASE_URL}/branches/${BRANCH}/guides/${slug}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify(payload)
        });

        if (updateRes.ok) {
          console.log(`  ✅ Successfully updated`);
        } else {
          const errMsg = await updateRes.text();
          console.error(`  ❌ Failed to update: ${updateRes.status} - ${errMsg}`);
        }
      } else if (docRes.ok) {
        console.log(`  ✅ Successfully created`);
      } else {
        const errMsg = await docRes.text();
        console.error(`  ❌ Failed to create: ${docRes.status} - ${errMsg}`);
      }
    } catch (error) {
      console.error(`  ❌ Network error while publishing:`, error.message);
    }

    // Delay 250ms between requests to respect API rate limits
    await delay(250);
  }

  console.log('\n🏁 ReadMe.com parasite SEO sync complete!');
}

run();

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const SITEMAP_URL = 'https://istanbul-bocek-ilaclama.readme.io/sitemap.xml';
const TOKEN_FILE = path.join(__dirname, '..', 'telegraph_token.json');
const REPORT_FILE = path.join(__dirname, '..', 'docs', 'telegraph_backlinks_report.md');
const LOG_FILE = path.join(__dirname, '..', 'telegraph_backlinks.json');

// District mapping for friendly Turkish names
const districtNames = {
  kadikoy: 'Kadıköy', sisli: 'Şişli', besiktas: 'Beşiktaş', bakirkoy: 'Bakırköy',
  uskudar: 'Üsküdar', umraniye: 'Ümraniye', fatih: 'Fatih', beyoglu: 'Beyoğlu',
  sariyer: 'Sarıyer', pendik: 'Pendik', kartal: 'Kartal', maltepe: 'Maltepe',
  atasehir: 'Ataşehir', beykoz: 'Beykoz', zeytinburnu: 'Zeytinburnu',
  basaksehir: 'Başakşehir', beylikduzu: 'Beylikdüzü', esenyurt: 'Esenyurt',
  avcilar: 'Avcılar', kucukcekmece: 'Küçükçekmece', bahcelievler: 'Bahçelievler',
  bagcilar: 'Bağcılar', gaziosmanpasa: 'Gaziosmanpaşa', eyupsultan: 'Eyüpsultan',
  kagithane: 'Kağıthane', sile: 'Şile', cekmekoy: 'Çekmeköy', tuzla: 'Tuzla',
  adalar: 'Adalar', arnavutkoy: 'Arnavutköy', bayrampasa: 'Bayrampaşa',
  buyukcekmece: 'Büyükçekmece', catalca: 'Çatalca', esenler: 'Esenler',
  gungoren: 'Güngören', sancaktepe: 'Sancaktepe', silivri: 'Silivri',
  sultanbeyli: 'Sultanbeyli', sultangazi: 'Sultangazi'
};

// Pest mapping for friendly Turkish names
const pestNames = {
  bocek: 'Böcek İlaçlama',
  fare: 'Fare İlaçlama',
  pire: 'Pire İlaçlama',
  'hamam-bocegi': 'Hamam Böceği İlaçlama',
  tahtakurusu: 'Tahtakurusu İlaçlama',
  akrep: 'Akrep İlaçlama',
  kene: 'Kene İlaçlama',
  sivrisinek: 'Sivrisinek İlaçlama'
};

// Spun content generators to make pages unique
const introTemplates = [
  "İstanbul genelinde çevre sağlığı ve hijyen standartlarını en üst düzeyde tutmak amacıyla {district} ilçesinde profesyonel {pest} hizmeti sunuyoruz.",
  "{district} bölgesindeki yaşam alanlarınızda (ev, ofis, depo, restoran vb.) ortaya çıkan haşere ve kemirgen problemlerine karşı {pest} çözümleri geliştiriyoruz.",
  "Sağlık Bakanlığı onaylı biyosidal ürünlerimiz ve eğitimli teknik ekibimiz ile {district} genelinde 7/24 garantili {pest} hizmeti sağlamaktayız.",
  "{district} sakinleri için haşere ve böcek istilalarına karşı en son teknolojik ekipmanları kullanarak kesin ve kalıcı {pest} uygulamaları gerçekleştiriyoruz."
];

const bodyTemplates = [
  "Uygulamalarımızda insan ve evcil hayvan sağlığına zarar vermeyen, Dünya Sağlık Örgütü (WHO) onaylı kokusuz ilaçlar tercih edilmektedir. Jel ve bariyer uygulamalarımız sayesinde günlük yaşantınızı aksatmadan konforlu bir dezenfeksiyon süreci elde edersiniz.",
  "Özellikle üreme hızı yüksek olan haşere türlerinde yuva tespiti ve kökten çözüm çok önemlidir. Uzman ekiplerimiz, {district} bölgesindeki binaların mimari ve altyapı özelliklerine göre özel ilaçlama planları hazırlamaktadır.",
  "Ekiplerimiz TSE ve ISO belgeli olup, haşere kontrolünde modern entegre pest yönetim ilkelerine (IPM) uygun hareket etmektedir. Amacımız sadece mevcut böcekleri yok etmek değil, gelecekteki olası istilaların da önüne geçmektir.",
  "Kemirgen ve böcek türlerinin taşıdığı patojen mikroorganizmalar insan sağlığı için büyük risk oluşturur. Bu riskleri minimize etmek adına profesyonel ve periyodik ilaçlama yaptırmak en kesin çözümdür."
];

const ctaTemplates = [
  "Detaylı bilgi edinmek ve fiyat teklifi almak için hazırladığımız rehberimizi ziyaret edin: {link}.",
  "Hizmet detaylarımız, şube adreslerimiz ve kullanıcı yorumları için rehberimizi okuyabilirsiniz: {link}.",
  "Siz de yaşam alanlarınızı haşerelerden arındırmak istiyorsanız hemen rehberimize göz atın: {link}.",
  "Garantili haşere kontrolü ve ücretsiz keşif imkanları hakkında bilgi almak için tıklayın: {link}."
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makePostRequest(url, payload) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const bodyString = JSON.stringify(payload);
    
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyString)
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON response: ${data}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(bodyString);
    req.end();
  });
}

// Get or create Telegraph access token
async function getAccessToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
    console.log(`🔑 Reusing Telegraph Access Token: ${data.access_token}`);
    return data.access_token;
  }

  console.log('🔑 Creating new Telegraph Account...');
  const res = await makePostRequest('https://api.telegra.ph/createAccount', {
    short_name: 'TCKIlas',
    author_name: 'TCK İlaçlama',
    author_url: 'https://tckilaclama.com'
  });

  if (res.ok && res.result) {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(res.result, null, 2), 'utf8');
    console.log(`✅ Account created. Token: ${res.result.access_token}`);
    return res.result.access_token;
  } else {
    throw new Error(`Failed to create Telegraph account: ${JSON.stringify(res)}`);
  }
}

// Helper to parse slug and extract friendly info
function parseSlugInfo(url) {
  // Example: https://istanbul-bocek-ilaclama.readme.io/docs/istanbul-kadikoy-bocek-ilaclama-1
  // Or: https://istanbul-bocek-ilaclama.readme.io/docs/istanbul-adalar-burgazada-bocek-ilaclama-1
  const slugMatch = url.match(/\/docs\/istanbul-([a-z0-9-]+)$/);
  if (!slugMatch) return null;

  const slug = slugMatch[1];
  const parts = slug.split('-');

  // Filter out numeric suffix if present (e.g. -1 at the end)
  if (!isNaN(parts[parts.length - 1])) {
    parts.pop();
  }

  // Last part should be the pest slug (e.g., ilaclama is removed, check prior parts)
  if (parts[parts.length - 1] === 'ilaclama') {
    parts.pop();
  }

  // Determine pest slug (could be two words, e.g. hamam-bocegi)
  let pestSlug = '';
  if (parts.includes('hamam') && parts.includes('bocegi')) {
    pestSlug = 'hamam-bocegi';
  } else {
    pestSlug = parts[parts.length - 1];
  }

  const pestName = pestNames[pestSlug] || 'Böcek İlaçlama';

  // The rest belongs to the district and potentially neighborhood
  const remainingParts = parts.filter(p => p !== 'hamam' && p !== 'bocegi' && p !== pestSlug);
  
  const districtSlug = remainingParts[0];
  const districtName = districtNames[districtSlug] || (districtSlug ? districtSlug.charAt(0).toUpperCase() + districtSlug.slice(1) : 'İstanbul');

  let fullLocation = districtName;
  if (remainingParts.length > 1) {
    // Has neighborhood info, e.g. ["adalar", "burgazada"]
    const hoodSlug = remainingParts[1];
    const hoodName = hoodSlug.charAt(0).toUpperCase() + hoodSlug.slice(1);
    fullLocation = `${districtName} ${hoodName}`;
  }

  return {
    location: fullLocation,
    pest: pestName,
    keyword: `${fullLocation} ${pestName}`
  };
}

async function run() {
  console.log('🚀 Starting Telegraph Parasite SEO Backlink campaign...');
  
  const token = await getAccessToken();

  // 1. Fetch sitemap URLs
  console.log(`🌐 Fetching sitemap from ${SITEMAP_URL}...`);
  let sitemapXml;
  try {
    const res = await new Promise((resolve, reject) => {
      https.get(SITEMAP_URL, (res) => {
        let body = '';
        res.on('data', (c) => body += c);
        res.on('end', () => resolve(body));
      }).on('error', reject);
    });
    sitemapXml = res;
  } catch (err) {
    console.error('❌ Failed to fetch sitemap:', err.message);
    process.exit(1);
  }

  const locRegex = /<loc>(https:\/\/istanbul-bocek-ilaclama\.readme\.io\/docs\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }

  console.log(`📊 Found ${urls.length} target URLs in ReadMe sitemap.`);
  
  // We'll process them in chunks to avoid overwhelming the rate limits
  const results = [];
  
  // Load existing links if they exist
  let existingLinks = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      existingLinks = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
      console.log(`📋 Loaded ${existingLinks.length} existing backlinks from logs.`);
    } catch (e) {
      // Ignored
    }
  }

  // Filter out URLs that already have backlinks generated
  const urlsToProcess = urls.filter(url => !existingLinks.some(e => e.targetUrl === url));
  console.log(`⚡ ${urlsToProcess.length} new URLs to process for backlink creation.`);

  if (urlsToProcess.length === 0) {
    console.log('🎉 All backlinks have already been generated!');
  } else {
    // Process first 100 pages or all to not trigger abuse limits
    const limit = Math.min(urlsToProcess.length, 120);
    const subset = urlsToProcess.slice(0, limit);
    console.log(`📝 Processing a subset of ${limit} URLs for this run...`);

    for (let i = 0; i < subset.length; i++) {
      const targetUrl = subset[i];
      const info = parseSlugInfo(targetUrl);
      
      if (!info) {
        console.log(`⚠️ Skipping URL (unrecognized pattern): ${targetUrl}`);
        continue;
      }

      const { location, pest, keyword } = info;
      const title = `${location} ${pest} Hizmetleri`;

      // Generate Spun Content
      const intro = getRandomItem(introTemplates).replace('{district}', location).replace('{pest}', pest.toLowerCase());
      const body = getRandomItem(bodyTemplates).replace('{district}', location).replace('{pest}', pest.toLowerCase());
      
      // Node structure for Telegraph Page creation
      const contentNodes = [
        {
          tag: 'h3',
          children: [`${location} Profesyonel ${pest}`]
        },
        {
          tag: 'p',
          children: [intro]
        },
        {
          tag: 'p',
          children: [body]
        },
        {
          tag: 'p',
          children: [
            "Sağlıklı ve hijyenik yaşam alanlarına kavuşmak için hazırladığımız detaylı kılavuzumuzu ve fiyat listelerimizi inceleyebilirsiniz: ",
            {
              tag: 'a',
              attrs: { href: targetUrl },
              children: [`${keyword} Rehberi`]
            }
          ]
        },
        {
          tag: 'p',
          children: [
            "Daha fazla bilgi için resmi web sitemiz ",
            {
              tag: 'a',
              attrs: { href: 'https://tckilaclama.com' },
              children: ['TCK İlaçlama']
            },
            " adresini ziyaret etmeyi unutmayın."
          ]
        }
      ];

      console.log(`[${i + 1}/${limit}] 📡 Creating Telegraph page for: "${title}"...`);
      
      try {
        const res = await makePostRequest('https://api.telegra.ph/createPage', {
          access_token: token,
          title: title,
          author_name: 'TCK İlaçlama',
          author_url: 'https://tckilaclama.com',
          content: contentNodes,
          return_content: false
        });

        if (res.ok && res.result) {
          const telegraphUrl = res.result.url;
          console.log(`  ✅ Created: ${telegraphUrl} -> Points to: ${targetUrl}`);
          
          const logEntry = {
            targetUrl: targetUrl,
            keyword: keyword,
            telegraphUrl: telegraphUrl,
            title: title,
            createdDate: new Date().toISOString()
          };
          
          results.push(logEntry);
          existingLinks.push(logEntry);
          
          // Write intermediate logs
          fs.writeFileSync(LOG_FILE, JSON.stringify(existingLinks, null, 2), 'utf8');
        } else {
          console.error(`  ❌ Failed to create page:`, res.error || res);
        }
      } catch (err) {
        console.error(`  ❌ Error:`, err.message || err);
      }

      // Respect API rate limits (1.5 seconds delay)
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  // 2. Generate Markdown Report of all Backlinks
  console.log(`📊 Writing backlink campaign report to: ${REPORT_FILE}`);
  
  // Format report with markdown table
  const allLinks = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  const reportDir = path.dirname(REPORT_FILE);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  let reportContent = `# 🔗 Telegraph Parasite SEO Backlink Raporu\n\n`;
  reportContent += `Bu rapor, \`istanbul-bocek-ilaclama.readme.io\` parazit sayfalarımızı desteklemek amacıyla Telegra.ph üzerinde başlatılan 1. tur backlink çalışmasının sonuçlarını içerir.\n\n`;
  reportContent += `**Toplam Başlatılan Backlink Sayısı:** ${allLinks.length}\n`;
  reportContent += `**Rapor Güncelleme Tarihi:** ${new Date().toLocaleString('tr-TR')}\n\n`;
  reportContent += `| # | Hedef Anahtar Kelime | Telegra.ph Backlink Sayfası | Hedef ReadMe.io Parazit URL |\n`;
  reportContent += `|---|---|---|---|\n`;
  
  allLinks.forEach((item, index) => {
    reportContent += `| ${index + 1} | **${item.keyword}** | [Git](${item.telegraphUrl}) | [Git](${item.targetUrl}) |\n`;
  });

  fs.writeFileSync(REPORT_FILE, reportContent, 'utf8');
  console.log('🎉 Telegraph backlink campaign completed and logged successfully!');
}

run().catch(err => {
  console.error('💥 Critical Campaign Error:', err);
});

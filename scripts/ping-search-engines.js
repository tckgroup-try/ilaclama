const https = require('https');

const SITEMAP_URL = 'https://tckilaclama.com/sitemap.xml';
const INDEXNOW_KEY = 'a62886f7b15a45279f046b9a89d3429f';
const INDEXNOW_URLS = [
  'https://tckilaclama.com/',
  'https://tckilaclama.com/hizmetler',
  'https://tckilaclama.com/subelerimiz',
  'https://tckilaclama.com/hakkimizda',
  'https://tckilaclama.com/blog',
  'https://tckilaclama.com/hizmet/istanbul-kadikoy-bocek-ilaclama',
  'https://tckilaclama.com/hizmet/istanbul-sisli-bocek-ilaclama',
  'https://tckilaclama.com/hizmet/istanbul-besiktas-pire-ilaclama',
  'https://tckilaclama.com/hizmet/istanbul-bakirkoy-fare-ilaclama',
  'https://tckilaclama.com/hizmet/istanbul-uskudar-tahtakurusu-ilaclama'
];

function getRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', (err) => reject(err));
  });
}

function postRequest(url, payload) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const bodyString = JSON.stringify(payload);
    
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(bodyString)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });

    req.on('error', (err) => reject(err));
    req.write(bodyString);
    req.end();
  });
}

async function pingAll() {
  console.log('📡 Starting Search Engine Ping Operations...');

  // 1. Ping Google
  try {
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res = await getRequest(googlePingUrl);
    console.log(`🌐 Google sitemap ping returned status: ${res.statusCode}`);
  } catch (err) {
    console.error('❌ Google sitemap ping failed:', err.message);
  }

  // 2. Ping Bing (Sitemap)
  try {
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res = await getRequest(bingPingUrl);
    console.log(`🌐 Bing sitemap ping returned status: ${res.statusCode}`);
  } catch (err) {
    console.error('❌ Bing sitemap ping failed:', err.message);
  }

  // 3. Submit to IndexNow (Bing, Yandex, Seznam)
  try {
    const indexNowPayload = {
      host: 'tckilaclama.com',
      key: INDEXNOW_KEY,
      keyLocation: `https://tckilaclama.com/${INDEXNOW_KEY}.txt`,
      urlList: INDEXNOW_URLS
    };

    const indexNowUrl = 'https://www.bing.com/IndexNow';
    const res = await postRequest(indexNowUrl, indexNowPayload);
    console.log(`⚡ IndexNow (Bing/Yandex) API returned status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('✅ URLs submitted to IndexNow search engine database successfully!');
    } else {
      console.log('⚠️ IndexNow response body:', res.body);
    }
  } catch (err) {
    console.error('❌ IndexNow submission failed:', err.message);
  }

  console.log('\n🎉 Ping operations completed!');
}

pingAll();

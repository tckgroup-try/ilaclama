const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Configuration
const SITEMAP_URL = 'https://istanbul-bocek-ilaclama.readme.io/sitemap.xml';
const KEY_PATH = path.join(__dirname, '..', 'service_account.json');

async function run() {
  console.log('🚀 Starting Google Indexing API submit for ReadMe parasite pages...');

  // 1. Verify Service Account Key
  if (!fs.existsSync(KEY_PATH)) {
    console.error(`❌ Error: service_account.json not found at ${KEY_PATH}`);
    process.exit(1);
  }

  const keyData = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
  console.log(`🔑 Using Service Account: ${keyData.client_email}`);

  // 2. Fetch and Parse Sitemap URLs
  console.log(`🌐 Fetching sitemap from ${SITEMAP_URL}...`);
  let sitemapXml;
  try {
    const res = await fetch(SITEMAP_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    sitemapXml = await res.text();
  } catch (err) {
    console.error('❌ Failed to fetch sitemap:', err.message);
    process.exit(1);
  }

  // Extract all <loc>URLs</loc> using RegExp
  const locRegex = /<loc>(https:\/\/istanbul-bocek-ilaclama\.readme\.io\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }

  console.log(`📊 Found ${urls.length} live URLs to index.`);
  if (urls.length === 0) {
    console.log('⚠️ No URLs found. Exiting.');
    return;
  }

  // 3. Authenticate with Google Indexing API
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  
  const authClient = await auth.getClient();
  const indexing = google.indexing({
    version: 'v3',
    auth: authClient,
  });

  // 4. Batch Submit URLs
  console.log(`⚡ Sending indexing notifications to Google (Quota limit: 200/day)...`);
  const batchSize = 10;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (url) => {
      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ Success: ${url} -> Status: ${response.status}`);
      } catch (err) {
        console.error(`❌ Error (${url}):`, err.message || err);
      }
    }));

    if (i + batchSize < urls.length) {
      console.log('⏱️ Waiting 1.5 seconds to respect rate limits...');
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  console.log('\n🎉 Finished submitting all ReadMe URLs to Google Indexing API!');
}

run().catch(err => {
  console.error('💥 Critical Error:', err);
});

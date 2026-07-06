const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Configuration
const SITEMAP_URL = 'https://tckilaclama.com/sitemap.xml';
const KEY_PATH = path.join(__dirname, '..', 'service_account.json');

async function run() {
  console.log('🚀 Starting Google Indexing API submit for TCK Ilaclama Main Website...');

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
    console.error('❌ Failed to fetch sitemap from live URL, generating from local sitemap.ts...');
    // If live sitemap fails, we fallback to our known core URLs to index
    sitemapXml = `
      <url><loc>https://tckilaclama.com/</loc></url>
      <url><loc>https://tckilaclama.com/hizmetler</loc></url>
      <url><loc>https://tckilaclama.com/hakkimizda</loc></url>
      <url><loc>https://tckilaclama.com/hasereler</loc></url>
      <url><loc>https://tckilaclama.com/subelerimiz</loc></url>
      <url><loc>https://tckilaclama.com/blog</loc></url>
      <url><loc>https://tckilaclama.com/hizmet/istanbul-kadikoy-bocek-ilaclama</loc></url>
      <url><loc>https://tckilaclama.com/hizmet/istanbul-sisli-bocek-ilaclama</loc></url>
      <url><loc>https://tckilaclama.com/hizmet/istanbul-besiktas-bocek-ilaclama</loc></url>
      <url><loc>https://tckilaclama.com/hizmet/istanbul-bakirkoy-bocek-ilaclama</loc></url>
      <url><loc>https://tckilaclama.com/hizmet/istanbul-uskudar-bocek-ilaclama</loc></url>
    `;
  }

  // Extract all <loc>URLs</loc>
  const locRegex = /<loc>(https:\/\/tckilaclama\.com\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }

  // Clean and unique URLs
  const uniqueUrls = [...new Set(urls)];
  console.log(`📊 Found ${uniqueUrls.length} unique URLs to index.`);
  if (uniqueUrls.length === 0) {
    console.log('⚠️ No URLs found. Exiting.');
    return;
  }

  // Prioritize URLs (Static pages first, then districts, then rest)
  const prioritizedUrls = uniqueUrls.sort((a, b) => {
    const isStaticA = !a.includes('/hizmet/') && !a.includes('/blog/');
    const isStaticB = !b.includes('/hizmet/') && !b.includes('/blog/');
    if (isStaticA && !isStaticB) return -1;
    if (!isStaticA && isStaticB) return 1;
    return a.localeCompare(b);
  });

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

  // 4. Batch Submit URLs (Up to daily limit)
  const limit = Math.min(prioritizedUrls.length, 200); // Google Daily Limit is 200
  const urlsToSend = prioritizedUrls.slice(0, limit);
  console.log(`⚡ Sending top ${urlsToSend.length} high-priority URLs to Google Indexing API...`);
  
  const batchSize = 10;
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < urlsToSend.length; i += batchSize) {
    const batch = urlsToSend.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (url) => {
      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ Success: ${url} -> Status: ${response.status}`);
        successCount++;
      } catch (err) {
        console.error(`❌ Error (${url}):`, err.message || err);
        failureCount++;
      }
    }));

    if (i + batchSize < urlsToSend.length) {
      console.log('⏱️ Waiting 1.5 seconds to respect rate limits...');
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  console.log(`\n🎉 Finished submitting TCK Ilaclama URLs to Google Indexing API!`);
  console.log(`📊 Results: ${successCount} Successes, ${failureCount} Failures.`);
}

run().catch(err => {
  console.error('💥 Critical Error:', err);
});

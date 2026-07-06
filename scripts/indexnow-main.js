const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://tckilaclama.com/sitemap.xml';
const HOST = 'tckilaclama.com';
const KEY = 'd8fb1628d0ee4c9cb1112b0ee3f9828d';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function run() {
  console.log('🚀 Starting IndexNow API submission for TCK Ilaclama Main Website...');

  // 1. Fetch sitemap URLs
  console.log(`🌐 Fetching sitemap from ${SITEMAP_URL}...`);
  let sitemapXml;
  try {
    const res = await fetch(SITEMAP_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    sitemapXml = await res.text();
  } catch (err) {
    console.error('❌ Failed to fetch sitemap from live URL, generating from local sitemap.ts...');
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

  // Extract URLs
  const locRegex = /<loc>(https:\/\/tckilaclama\.com\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }

  const uniqueUrls = [...new Set(urls)];
  console.log(`📊 Found ${uniqueUrls.length} unique URLs to index.`);
  if (uniqueUrls.length === 0) {
    console.log('⚠️ No URLs found. Exiting.');
    return;
  }

  // Prepare payload
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: uniqueUrls
  };

  try {
    console.log(`📡 Submitting URLs to IndexNow API (Bing/Yandex)...`);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log(`Response Status: ${res.status} (${res.statusText})`);

    if (res.ok) {
      console.log('✅ URLs successfully submitted to IndexNow! Search engines have been notified.');
    } else {
      const errorText = await res.text();
      console.error('❌ IndexNow Submission failed:', errorText);
    }
  } catch (err) {
    console.error('❌ Network Error:', err.message);
  }
}

run();

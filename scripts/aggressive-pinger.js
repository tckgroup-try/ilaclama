const http = require('http');
const https = require('https');

const SITE_TITLE = 'TCK İlaçlama | İstanbul Böcek İlaçlama';
const SITE_URL = 'https://tckilaclama.com';
const RSS_URL = 'https://tckilaclama.com/rss.xml';
const SITEMAP_URL = 'https://tckilaclama.com/sitemap.xml';

// XML-RPC Ping Targets
const xmlRpcTargets = [
  'http://rpc.pingomatic.com/',
  'http://rpc.weblogs.com/RPC2',
  'http://ping.blo.gs/',
  'http://ping.feedburner.com',
  'http://rpc.feedshark.com',
  'http://blogsearch.google.com/ping/RPC2'
];

// WebSub / PubSubHubbub Hubs to notify
const webSubHubs = [
  'https://pubsubhubbub.appspot.com',
  'https://pubsubhubbub.superfeedr.com'
];

// Helper to make XML-RPC POST request
function postXmlRpc(targetUrl, payload) {
  return new Promise((resolve) => {
    const parsed = new URL(targetUrl);
    const isHttps = parsed.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TCK-Pinger/1.0'
      },
      timeout: 8000
    };

    const req = client.request(options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          target: targetUrl,
          statusCode: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 300,
          response: body.substring(0, 200).replace(/\s+/g, ' ')
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        target: targetUrl,
        success: false,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        target: targetUrl,
        success: false,
        error: 'Timeout after 8s'
      });
    });

    req.write(payload);
    req.end();
  });
}

// Helper to notify WebSub hubs
function notifyWebSub(hubUrl, topicUrl) {
  return new Promise((resolve) => {
    const parsed = new URL(hubUrl);
    const isHttps = parsed.protocol === 'https:';
    const client = isHttps ? https : http;

    const postData = new URLSearchParams({
      'hub.mode': 'publish',
      'hub.url': topicUrl
    }).toString();

    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 TCK-WebSub/1.0'
      },
      timeout: 8000
    };

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          target: hubUrl,
          statusCode: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 300,
          response: body.substring(0, 100)
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        target: hubUrl,
        success: false,
        error: err.message
      });
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('📡 Starting Aggressive RSS & Sitemap Ping Operation...');

  // Construct XML-RPC Payloads
  const standardPayload = `<?xml version="1.0"?>
<methodCall>
  <methodName>weblogUpdates.ping</methodName>
  <params>
    <param><value>${SITE_TITLE}</value></param>
    <param><value>${SITE_URL}</value></param>
  </params>
</methodCall>`;

  const extendedPayload = `<?xml version="1.0"?>
<methodCall>
  <methodName>weblogUpdates.extendedPing</methodName>
  <params>
    <param><value>${SITE_TITLE}</value></param>
    <param><value>${SITE_URL}</value></param>
    <param><value>${RSS_URL}</value></param>
    <param><value>${SITEMAP_URL}</value></param>
  </params>
</methodCall>`;

  console.log('\n--- 1. XML-RPC Search Engine & Directory Pings ---');
  for (const target of xmlRpcTargets) {
    console.log(`📡 Pinging XML-RPC: ${target}...`);
    // Attempt extended ping first, fallback to standard if failure
    let result = await postXmlRpc(target, extendedPayload);
    if (!result.success) {
      console.log(`⚠️ Extended ping failed for ${target}, trying standard ping...`);
      result = await postXmlRpc(target, standardPayload);
    }

    if (result.success) {
      console.log(`✅ Success [${target}]: ${result.statusCode} - Response: ${result.response}`);
    } else {
      console.log(`❌ Failed [${target}]: ${result.error || result.statusCode}`);
    }
  }

  console.log('\n--- 2. WebSub (PubSubHubbub) Real-time Hub Notifications ---');
  for (const hub of webSubHubs) {
    console.log(`⚡ Notifying WebSub Hub: ${hub} with RSS topic...`);
    const result = await notifyWebSub(hub, RSS_URL);
    if (result.success) {
      console.log(`✅ Success [${hub}]: ${result.statusCode}`);
    } else {
      console.log(`❌ Failed [${hub}]: ${result.error || result.statusCode}`);
    }
  }

  console.log('\n🎉 Aggressive ping operations completed successfully!');
}

run().catch((err) => {
  console.error('💥 Unexpected Ping Error:', err);
});

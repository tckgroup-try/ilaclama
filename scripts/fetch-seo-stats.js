const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'service_account.json');
const SITE_URLS = ['https://tckilaclama.com', 'https://tckilaclama.com/', 'sc-domain:tckilaclama.com'];

async function getSearchConsoleData(authClient) {
  const webmasters = google.webmasters({
    version: 'v3',
    auth: authClient
  });

  console.log('\n--- 📊 Fetching Google Search Console Performance Data ---');
  
  // Find which site URL is registered and verified
  let verifiedSite = null;
  try {
    const listRes = await webmasters.sites.list();
    const sites = listRes.data.siteEntry || [];
    console.log('Detected sites in GSC:');
    sites.forEach(s => console.log(` - ${s.siteUrl} (${s.permissionLevel})`));
    
    for (const url of SITE_URLS) {
      const match = sites.find(s => s.siteUrl === url);
      if (match) {
        verifiedSite = match.siteUrl;
        break;
      }
    }
  } catch (err) {
    console.error('❌ Failed to list GSC sites:', err.message);
  }

  if (!verifiedSite) {
    console.log('⚠️ Could not find tckilaclama.com listed under this service account. Trying default: sc-domain:tckilaclama.com');
    verifiedSite = 'sc-domain:tckilaclama.com';
  }

  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  const startDate = formatDate(thirtyDaysAgo);
  const endDate = formatDate(today);

  console.log(`📅 Date range: ${startDate} to ${endDate}`);
  console.log(`🌐 Querying site: ${verifiedSite}`);

  try {
    const res = await webmasters.searchanalytics.query({
      siteUrl: verifiedSite,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 30
      }
    });

    const rows = res.data.rows || [];
    console.log(`✅ Retrieved ${rows.length} days of performance data.`);
    
    let totalClicks = 0;
    let totalImpressions = 0;
    let avgPositionSum = 0;
    
    rows.forEach(row => {
      totalClicks += row.clicks || 0;
      totalImpressions += row.impressions || 0;
      avgPositionSum += row.position || 0;
    });

    const avgPosition = rows.length > 0 ? (avgPositionSum / rows.length).toFixed(1) : 'N/A';
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%' : '0%';

    console.log('\n📈 GSC Summary (Last 30 Days):');
    console.log(` - Total Clicks: ${totalClicks}`);
    console.log(` - Total Impressions: ${totalImpressions}`);
    console.log(` - Average CTR: ${ctr}`);
    console.log(` - Average Position: ${avgPosition}`);

    // Query top queries
    const queryRes = await webmasters.searchanalytics.query({
      siteUrl: verifiedSite,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10
      }
    });

    const topQueries = queryRes.data.rows || [];
    console.log('\n🔑 Top 10 Search Queries:');
    if (topQueries.length === 0) {
      console.log('   No search query data available yet.');
    } else {
      topQueries.forEach((q, idx) => {
        console.log(`   ${idx + 1}. "${q.keys[0]}": ${q.clicks} clicks, ${q.impressions} imps, Pos: ${q.position.toFixed(1)}`);
      });
    }

    return {
      success: true,
      summary: { totalClicks, totalImpressions, ctr, avgPosition },
      queries: topQueries
    };

  } catch (err) {
    console.error(`❌ Search Console Query Failed:`, err.message);
    return { success: false, error: err.message };
  }
}

async function getGA4Data(authClient) {
  console.log('\n--- 📊 Fetching Google Analytics 4 (GA4) Traffic Data ---');
  
  const analyticsData = google.analyticsdata({
    version: 'v1beta',
    auth: authClient
  });

  // Try to find GA4 accounts/properties
  const admin = google.analyticsadmin({
    version: 'v1alpha',
    auth: authClient
  });

  let propertyId = process.env.GA4_PROPERTY_ID;

  if (!propertyId) {
    console.log('🔍 GA4_PROPERTY_ID env variable not set. Attempting to auto-detect GA4 Properties...');
    try {
      const accountsRes = await admin.accounts.list();
      const accounts = accountsRes.data.accounts || [];
      console.log(`Detected ${accounts.length} Google Analytics accounts.`);
      
      let properties = [];
      for (const account of accounts) {
        const propsRes = await admin.properties.list({
          filter: `parent:${account.name}`
        });
        if (propsRes.data.properties) {
          properties = properties.concat(propsRes.data.properties);
        }
      }

      if (properties.length > 0) {
        console.log('Detected GA4 Properties:');
        properties.forEach(p => console.log(` - Property: ${p.displayName} (ID: ${p.name.split('/')[1]})`));
        propertyId = properties[0].name.split('/')[1];
        console.log(`💡 Selecting first property: ${properties[0].displayName} (ID: ${propertyId})`);
      } else {
        console.log('⚠️ No GA4 properties found under this service account. Please make sure to add the service account email as a Viewer in Google Analytics.');
      }
    } catch (err) {
      console.log('⚠️ Failed to list GA4 Properties:', err.message);
    }
  }

  if (!propertyId) {
    console.log('❌ GA4 Property ID auto-detection failed. Skipping GA4 query.');
    return { success: false, reason: 'No Property ID' };
  }

  try {
    const res = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'conversions' }
        ],
        dimensions: [{ name: 'date' }]
      }
    });

    const rows = res.data.rows || [];
    console.log(`✅ Retrieved ${rows.length} days of GA4 traffic data.`);

    let totalUsers = 0;
    let totalPageviews = 0;
    let totalSessions = 0;
    let totalConversions = 0;

    rows.forEach(row => {
      totalUsers += parseInt(row.metricValues[0].value, 10);
      totalPageviews += parseInt(row.metricValues[1].value, 10);
      totalSessions += parseInt(row.metricValues[2].value, 10);
      totalConversions += parseInt(row.metricValues[3].value, 10);
    });

    console.log('\n📈 GA4 Traffic Summary (Last 30 Days):');
    console.log(` - Active Users: ${totalUsers}`);
    console.log(` - Pageviews: ${totalPageviews}`);
    console.log(` - Sessions: ${totalSessions}`);
    console.log(` - Conversions: ${totalConversions}`);

    return {
      success: true,
      summary: { totalUsers, totalPageviews, totalSessions, totalConversions }
    };
  } catch (err) {
    console.error('❌ GA4 Query Failed:', err.message);
    return { success: false, error: err.message };
  }
}

async function run() {
  console.log('🚀 Starting Google SEO & Traffic Data Collector...');

  if (!fs.existsSync(KEY_PATH)) {
    console.error(`❌ Error: service_account.json not found at ${KEY_PATH}`);
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/analytics.manage.users.readonly'
    ],
  });

  const authClient = await auth.getClient();

  const gscResults = await getSearchConsoleData(authClient);
  const ga4Results = await getGA4Data(authClient);

  // Generate a beautiful markdown report file
  const reportPath = path.join(__dirname, '..', 'docs', 'seo_performance_report.md');
  const reportDir = path.dirname(reportPath);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  let reportMarkdown = `# 📈 TCK İlaçlama SEO & Trafik Performans Raporu\n\n`;
  reportMarkdown += `*Rapor oluşturulma tarihi: ${new Date().toLocaleString('tr-TR')}*\n\n`;

  reportMarkdown += `## 1. Google Search Console Verileri (Son 30 Gün)\n`;
  if (gscResults.success) {
    reportMarkdown += `| Metrik | Değer |\n| :--- | :--- |\n`;
    reportMarkdown += `| Toplam Tıklama | **${gscResults.summary.totalClicks}** |\n`;
    reportMarkdown += `| Toplam Gösterim | **${gscResults.summary.totalImpressions}** |\n`;
    reportMarkdown += `| Ortalama CTR | **${gscResults.summary.ctr}** |\n`;
    reportMarkdown += `| Ortalama Pozisyon | **${gscResults.summary.avgPosition}** |\n\n`;

    reportMarkdown += `### 🔑 En Çok Tıklanan Anahtar Kelimeler\n`;
    reportMarkdown += `| Sıra | Anahtar Kelime | Tıklama | Gösterim | Pozisyon |\n| :---: | :--- | :---: | :---: | :---: |\n`;
    if (gscResults.queries.length > 0) {
      gscResults.queries.forEach((q, idx) => {
        reportMarkdown += `| ${idx + 1} | ${q.keys[0]} | ${q.clicks} | ${q.impressions} | ${q.position.toFixed(1)} |\n`;
      });
    } else {
      reportMarkdown += `| - | Veri yok | 0 | 0 | - |\n`;
    }
  } else {
    reportMarkdown += `❌ Search Console verileri alınamadı: \`${gscResults.error}\`\n`;
  }

  reportMarkdown += `\n## 2. Google Analytics 4 (GA4) Verileri (Son 30 Gün)\n`;
  if (ga4Results.success) {
    reportMarkdown += `| Metrik | Değer |\n| :--- | :--- |\n`;
    reportMarkdown += `| Aktif Kullanıcılar | **${ga4Results.summary.totalUsers}** |\n`;
    reportMarkdown += `| Sayfa Görüntüleme | **${ga4Results.summary.totalPageviews}** |\n`;
    reportMarkdown += `| Oturumlar | **${ga4Results.summary.totalSessions}** |\n`;
    reportMarkdown += `| Dönüşümler (Form/Arama) | **${ga4Results.summary.totalConversions}** |\n`;
  } else {
    reportMarkdown += `❌ Google Analytics 4 verileri alınamadı. \n`;
    reportMarkdown += `*İpucu: Servis hesabı e-postasını (\`${JSON.parse(fs.readFileSync(KEY_PATH)).client_email}\`) GA4 mülkünde "Görüntüleyici (Viewer)" olarak yetkilendirdiğinizden emin olun.* \n`;
  }

  fs.writeFileSync(reportPath, reportMarkdown);
  console.log(`\n📝 Report generated successfully: ${reportPath}`);
}

run().catch(console.error);

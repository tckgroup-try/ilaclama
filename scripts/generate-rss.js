const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://tckilaclama.com';

const districts = [
  'Kadıköy', 'Şişli', 'Beşiktaş', 'Bakırköy', 'Pendik', 
  'Ümraniye', 'Sarıyer', 'Beylikdüzü', 'Maltepe', 'Tuzla',
  'Kartal', 'Zeytinburnu', 'Ataşehir', 'Üsküdar', 'Beykoz',
  'Esenyurt', 'Avcılar', 'Fatih', 'Başakşehir', 'Eyüpsultan'
];

const pests = [
  { name: 'Fare', desc: 'Kemirgen' },
  { name: 'Hamam Böceği', desc: 'Blattodea' },
  { name: 'Pire', desc: 'Dış Parazit' },
  { name: 'Kene', desc: 'Dış Parazit' },
  { name: 'Böcek', desc: 'Genel Haşere' }
];

function slugify(text) {
  return text.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function run() {
  console.log('🚀 Generating RSS and Atom Feeds...');

  const items = [];

  // 1. Add static homepage route
  items.push({
    title: 'TCK İlaçlama | İstanbul Böcek ve Haşere İlaçlama Hizmetleri',
    link: `${BASE_URL}/`,
    description: 'İstanbul genelinde Sağlık Bakanlığı onaylı, %100 garantili ev, iş yeri ve villa böcek ilaçlama hizmetleri. 7/24 mobil ekiplerimizle haşere kontrol çözümleri.',
    pubDate: new Date().toUTCString(),
    isoDate: new Date().toISOString()
  });

  // 2. Add dynamic blog/niche routes
  let index = 0;
  for (const district of districts) {
    for (const pest of pests) {
      const slug = `${slugify(district)}-${slugify(pest.name)}-ilaclama`;
      const title = `${district} ${pest.name} İlaçlama | Profesyonel Çözüm`;
      const description = `${district} lokasyonunda ${pest.name} (${pest.desc}) problemlerine karşı garantili, kokusuz ve profesyonel haşere kontrol hizmetleri.`;
      const dateOffset = (index % 28) + 1;
      
      // Creating standard dates in July 2026
      const dateObj = new Date(2026, 6, dateOffset, 10, 0, 0);
      const pubDate = dateObj.toUTCString();
      const isoDate = dateObj.toISOString();

      items.push({
        title,
        link: `${BASE_URL}/blog/${slug}`,
        description,
        pubDate,
        isoDate
      });
      index++;
    }
  }

  // ----------------------------------------------------
  // 1. Generate RSS 2.0 Feed XML
  // ----------------------------------------------------
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>TCK İlaçlama - İstanbul Böcek İlaçlama</title>
  <link>${BASE_URL}</link>
  <description>Sağlık Bakanlığı Onaylı, %100 Garantili Haşere ve Böcek İlaçlama Çözümleri</description>
  <language>tr-TR</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${items.map(item => `
  <item>
    <title><![CDATA[${item.title}]]></title>
    <link>${item.link}</link>
    <guid isPermaLink="true">${item.link}</guid>
    <description><![CDATA[${item.description}]]></description>
    <pubDate>${item.pubDate}</pubDate>
  </item>`).join('')}
</channel>
</rss>`;

  // ----------------------------------------------------
  // 2. Generate Atom Feed XML
  // ----------------------------------------------------
  const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>TCK İlaçlama - İstanbul Böcek İlaçlama</title>
  <subtitle>Sağlık Bakanlığı Onaylı, %100 Garantili Haşere ve Böcek İlaçlama Çözümleri</subtitle>
  <link href="${BASE_URL}/atom.xml" rel="self"/>
  <link href="${BASE_URL}/"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${BASE_URL}/</id>
  <author>
    <name>TCK İlaçlama</name>
    <email>info@tckilaclama.com</email>
  </author>
  ${items.map(item => `
  <entry>
    <title><![CDATA[${item.title}]]></title>
    <link href="${item.link}"/>
    <id>${item.link}</id>
    <updated>${item.isoDate}</updated>
    <summary><![CDATA[${item.description}]]></summary>
  </entry>`).join('')}
</feed>`;

  const publicDir = path.join(__dirname, '..', 'public');
  
  // Write all feeds in UTF-8
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), rssXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'atom.xml'), atomXml, 'utf-8');

  console.log(`✅ Successfully generated:`);
  console.log(`   - public/rss.xml (${items.length} items)`);
  console.log(`   - public/feed.xml (${items.length} items)`);
  console.log(`   - public/atom.xml (${items.length} items)`);
}

run().catch(err => {
  console.error('❌ Feed Generation Error:', err);
});

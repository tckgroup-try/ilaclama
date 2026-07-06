require('dotenv').config();

const API_KEY = process.env.README_API_KEY;
const BRANCH = '1.0';
const BASE_URL = 'https://api.readme.com/v2';
const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'accept': 'application/json'
};

async function run() {
  const shortSlug = 'istanbul-adalar-bocek-ilaclama';
  console.log(`🔍 Checking if short slug "${shortSlug}" exists...`);
  try {
    const res = await fetch(`${BASE_URL}/branches/${BRANCH}/guides/${shortSlug}`, {
      method: 'GET',
      headers: HEADERS
    });
    console.log(`Status: ${res.status}`);
    
    if (res.status === 404) {
      console.log(`🚀 Attempting to create guide with slug "${shortSlug}"...`);
      const createRes = await fetch(`${BASE_URL}/branches/${BRANCH}/guides`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          title: 'İstanbul Adalar Bölgesinde Garantili Böcek İlaçlama Hizmetleri',
          slug: shortSlug,
          content: {
            body: 'Test body',
            excerpt: 'Test excerpt',
            type: 'markdown'
          },
          category: {
            uri: '/branches/1.0/categories/guides/Getting%20Started'
          }
        })
      });
      console.log(`Create Status: ${createRes.status}`);
      if (createRes.ok) {
        const data = await createRes.json();
        console.log(`Created Slug in Response: "${data.data.slug}"`);
        
        // Cleanup immediately so we don't leave junk
        console.log('🗑️ Cleaning up test guide...');
        await fetch(`${BASE_URL}/branches/${BRANCH}/guides/${data.data.slug}`, {
          method: 'DELETE',
          headers: HEADERS
        });
      }
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

run();

require('dotenv').config();

const API_KEY = process.env.README_API_KEY;
const BASE_URL = 'https://api.readme.com/v2';
const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'accept': 'application/json'
};

async function run() {
  const uris = [
    '/branches/1.0/categories/guides/Getting%20Started/docs',
    '/branches/1.0/categories/guides/getting-started/docs',
    '/branches/1.0/categories/guides/rehberler/docs',
    '/categories/Getting%20Started/docs',
    '/categories/getting-started/docs'
  ];
  for (const uri of uris) {
    console.log(`📡 Fetching from "${uri}"...`);
    try {
      const res = await fetch(`${BASE_URL}${uri}`, {
        method: 'GET',
        headers: HEADERS
      });
      console.log(`Status: ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        console.log(`Success! Total docs: ${data.data.length}`);
        console.log('Docs:', JSON.stringify(data.data.map(d => ({ title: d.title, slug: d.slug })), null, 2).slice(0, 1000));
        break;
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  }
}

run();

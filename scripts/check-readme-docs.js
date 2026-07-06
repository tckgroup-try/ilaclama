require('dotenv').config();

const API_KEY = process.env.README_API_KEY;
const BRANCH = '1.0';
const BASE_URL = 'https://api.readme.com/v2';
const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'accept': 'application/json'
};

async function check() {
  const testUris = [
    '/branches/1.0/guides/istanbul-adalar-bocek-ilaclama-rehberi',
    '/branches/1.0/docs/istanbul-adalar-bocek-ilaclama-rehberi',
    '/branches/1.0/guides',
    '/branches/1.0/docs'
  ];

  for (const uri of testUris) {
    console.log(`🔍 Querying URI: "${uri}"...`);
    try {
      const res = await fetch(`${BASE_URL}${uri}`, {
        method: 'GET',
        headers: HEADERS
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`✅ Success for "${uri}"!`);
        console.log(JSON.stringify(data, null, 2).slice(0, 500));
      } else {
        console.log(`   ❌ Failed with status: ${res.status}`);
      }
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
    }
  }
}

check();

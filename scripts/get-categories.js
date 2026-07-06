require('dotenv').config();

const API_KEY = process.env.README_API_KEY;
const BASE_URL = 'https://api.readme.com/v2';
const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'accept': 'application/json'
};

async function run() {
  console.log('📡 Fetching categories...');
  try {
    const res = await fetch(`${BASE_URL}/branches/1.0/categories/guides`, {
      method: 'GET',
      headers: HEADERS
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

run();

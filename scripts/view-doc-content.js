require('dotenv').config();

const API_KEY = process.env.README_API_KEY;
const BRANCH = '1.0';
const BASE_URL = 'https://api.readme.com/v2';
const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'accept': 'application/json'
};

async function check() {
  const slug = 'istanbul-adalar-bocek-ilaclama';
  try {
    const res = await fetch(`${BASE_URL}/branches/1.0/guides/${slug}`, {
      method: 'GET',
      headers: HEADERS
    });
    console.log(`Checking ${slug} via API:`);
    console.log(`Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`Title: ${data.data.title}`);
      console.log(`Slug: ${data.data.slug}`);
      console.log(`Excerpt: ${data.data.content.excerpt}`);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

check();

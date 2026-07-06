async function test() {
  const url = 'https://istanbul-bocek-ilaclama.readme.io/robots.txt';
  console.log(`🌐 Fetching robots.txt as Googlebot...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });
    console.log(`Status: ${res.status}`);
    const text = await res.text();
    console.log('--- robots.txt content ---');
    console.log(text);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}
test();

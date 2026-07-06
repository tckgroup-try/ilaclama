async function run() {
  const url = 'https://istanbul-bocek-ilaclama.readme.io/sitemap.xml';
  console.log(`🌐 Fetching sitemap content from: ${url}`);
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(`Content length: ${text.length} chars`);
    console.log('Raw text excerpt:');
    console.log(text.slice(0, 1500));
  } catch (err) {
    console.error('❌ Failed fetching sitemap:', err.message);
  }
}
run();

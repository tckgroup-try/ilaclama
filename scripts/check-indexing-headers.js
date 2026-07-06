async function check() {
  const url = 'https://istanbul-bocek-ilaclama.readme.io/docs/istanbul-adalar-bocek-ilaclama';
  console.log(`🌐 Checking canonicals and robots.txt at: ${url}`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    
    // Check canonical
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i) ||
                           html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
    if (canonicalMatch) {
      console.log(`Found canonical tag: ${canonicalMatch[0]}`);
      console.log(`Canonical URL: ${canonicalMatch[1]}`);
    } else {
      console.log('No canonical link tag found.');
    }
    
    // Fetch robots.txt
    const robotsUrl = 'https://istanbul-bocek-ilaclama.readme.io/robots.txt';
    console.log(`\n🌐 Fetching robots.txt from: ${robotsUrl}`);
    const robotsRes = await fetch(robotsUrl);
    const robotsText = await robotsRes.text();
    console.log('--- robots.txt content ---');
    console.log(robotsText);
    
  } catch (err) {
    console.error('❌ Error checking page:', err.message);
  }
}
check();

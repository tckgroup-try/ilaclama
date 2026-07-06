async function check() {
  const url = 'https://istanbul-bocek-ilaclama.readme.io/docs/istanbul-bagcilar-bocek-ilaclama/';
  console.log(`🌐 Checking trailing slash URL: ${url}`);
  try {
    const res = await fetch(url, {
      redirect: 'manual'
    });
    console.log(`Status: ${res.status}`);
    console.log('Location header:', res.headers.get('location'));
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}
check();

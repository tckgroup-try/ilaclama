const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'parasite-seo');
const DEST_DIR = path.join(__dirname, '..', 'docs', 'Getting Started');

const FILE_MAPPING = {
  'parasite-kadikoy-bocek.md': 'istanbul-kadikoy-bocek-ilaclama-rehberi.md',
  'parasite-sisli-hamam-bocegi.md': 'istanbul-sisli-hamam-bocegi-ilaclama-rehberi.md',
  'parasite-besiktas-pire.md': 'istanbul-besiktas-pire-ilaclama-rehberi.md',
  'parasite-bakirkoy-fare.md': 'istanbul-bakirkoy-fare-ilaclama-rehberi.md',
  'parasite-uskudar-tahtakurusu.md': 'istanbul-uskudar-tahtakurusu-ilaclama-rehberi.md'
};

function run() {
  console.log('📂 Creating directories for Git Sync...');
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log(`✅ Created directory: ${DEST_DIR}`);
  }

  for (const [srcName, destName] of Object.entries(FILE_MAPPING)) {
    const srcPath = path.join(SRC_DIR, srcName);
    const destPath = path.join(DEST_DIR, destName);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copied: ${srcName} -> docs/Getting Started/${destName}`);
    } else {
      console.error(`❌ Source file not found: ${srcPath}`);
    }
  }

  console.log('\n🎉 Git Sync files are ready in docs/Getting Started/ folder!');
}

run();

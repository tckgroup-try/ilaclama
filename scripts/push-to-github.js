const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '..', 'readme-git-temp');
const DOCS_SRC = path.join(__dirname, '..', 'docs');

function runCmd(cmd, cwd) {
  console.log(`Executing: ${cmd}`);
  try {
    const stdout = execSync(cmd, { cwd, encoding: 'utf-8' });
    console.log(stdout);
  } catch (error) {
    console.error(`Error executing command: ${cmd}`);
    console.error(error.stdout || error.message);
    throw error;
  }
}

async function run() {
  console.log('🚀 Preparing to push to dedicated ReadMe Git Sync repository...');

  // 1. Clean and create temp directory
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  // 2. Copy docs folder to temp directory
  const docsDest = path.join(TEMP_DIR, 'docs');
  fs.cpSync(DOCS_SRC, docsDest, { recursive: true });
  console.log('✅ Copied docs folder to temp repository.');

  // Copy sitemap README.md to the root of the Git repository for public GitHub SEO
  const seoReadmeSrc = path.join(DOCS_SRC, 'README.md');
  if (fs.existsSync(seoReadmeSrc)) {
    fs.copyFileSync(seoReadmeSrc, path.join(TEMP_DIR, 'README.md'));
    console.log('✅ Copied SEO README.md to temp repository root.');
  } else {
    fs.writeFileSync(
      path.join(TEMP_DIR, 'README.md'),
      '# TCK İlaçlama - İstanbul Böcek İlaçlama Servisi\n\nİstanbul geneli 7/24 Sağlık Bakanlığı onaylı dezenfeksiyon ve pest kontrol hizmetleri.',
      'utf-8'
    );
  }

  // 3. Git operations
  try {
    let remoteUrl = 'https://github.com/tckgroup-try/bocek-ilaclama-istanbul.git';
    try {
      const mainRemote = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
      const match = mainRemote.match(/https:\/\/([^@]+)@/);
      if (match && match[1]) {
        remoteUrl = `https://${match[1]}@github.com/tckgroup-try/bocek-ilaclama-istanbul.git`;
        console.log('🔑 Dynamically configured Git authentication.');
      }
    } catch (e) {
      console.warn('⚠️ Could not dynamically extract credentials, using default URL.');
    }

    runCmd('git init', TEMP_DIR);
    runCmd(`git remote add origin ${remoteUrl}`, TEMP_DIR);
    runCmd('git branch -M main', TEMP_DIR);
    runCmd('git add .', TEMP_DIR);
    runCmd('git commit -m "feat: upload parasite seo guides with images and CTAs"', TEMP_DIR);
    console.log('\n📤 Pushing to GitHub (bocek-ilaclama-istanbul)...');
    runCmd('git push -u origin main --force', TEMP_DIR);
    console.log('\n🎉 Push completed successfully!');
  } catch (error) {
    console.error('💥 Git operation failed:', error.message);
  } finally {
    // Cleanup temp directory
    try {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
      console.log('🧹 Cleaned up temporary repository folder.');
    } catch (e) {
      console.warn('⚠️ Could not remove temporary folder:', e.message);
    }
  }
}

run();

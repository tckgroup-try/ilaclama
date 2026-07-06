/**
 * TCK İlaçlama — PNG → WebP Batch Converter
 * Kullanım: node scripts/convert-images-webp.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images');

async function convertAll() {
  const files = fs.readdirSync(IMAGE_DIR).filter(f => f.endsWith('.png'));
  console.log(`🎨 ${files.length} PNG dosyası bulundu. WebP'ye dönüştürülüyor...`);

  let totalSaved = 0;

  for (const file of files) {
    const inputPath = path.join(IMAGE_DIR, file);
    const outputPath = path.join(IMAGE_DIR, file.replace('.png', '.webp'));
    
    if (fs.existsSync(outputPath)) {
      console.log(`  ⏭️  ${file} → zaten mevcut, atlanıyor`);
      continue;
    }

    const inputSize = fs.statSync(inputPath).size;
    
    await sharp(inputPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);
    
    const outputSize = fs.statSync(outputPath).size;
    const saved = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
    totalSaved += (inputSize - outputSize);
    
    console.log(`  ✅ ${file.padEnd(55)} ${(inputSize/1024).toFixed(0)}KB → ${(outputSize/1024).toFixed(0)}KB (-%${saved})`);
  }

  console.log(`\n🎉 Toplam kazanım: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

convertAll().catch(console.error);

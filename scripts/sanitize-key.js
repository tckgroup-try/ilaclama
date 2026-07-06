const fs = require('fs');
const path = require('path');

const key = 'd8fb1628d0ee4c9cb1112b0ee3f9828d';
const keyPath = path.join(__dirname, '..', 'public', `${key}.txt`);

// Keep old key file for ReadMe parasite verification if needed
const oldKeyPath = path.join(__dirname, '..', 'public', 'a62886f7b15a45279f046b9a89d3429f.txt');
if (!fs.existsSync(oldKeyPath)) {
  fs.writeFileSync(oldKeyPath, 'a62886f7b15a45279f046b9a89d3429f', { encoding: 'utf8', flag: 'w' });
  console.log('📝 Created ReadMe verification key file in public directory.');
}

// Write the key to public folder with absolutely no newlines or spacing
fs.writeFileSync(keyPath, key, { encoding: 'utf8', flag: 'w' });

// Verify size is exactly 32 bytes
const stats = fs.statSync(keyPath);
console.log(`Verified size of ${keyPath}: ${stats.size} bytes.`);
if (stats.size === 32) {
  console.log('✅ Success: Key file is exactly 32 bytes with no newlines!');
} else {
  console.log('❌ Error: Size mismatch!');
}

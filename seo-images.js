const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const piexif = require('piexifjs');

const images = [
  {
    name: 'kadikoy_ilaclama',
    file: 'kadikoy_ilaclama_1783278260345.png',
    lat: 40.990,
    lng: 29.020,
    alt: 'kadikoy-bocek-ilaclama-tck-ilaclama'
  },
  {
    name: 'sisli_ilaclama',
    file: 'sisli_ilaclama_1783278268494.png',
    lat: 41.060,
    lng: 28.987,
    alt: 'sisli-fare-ilaclama-tck-ilaclama'
  },
  {
    name: 'besiktas_ilaclama',
    file: 'besiktas_ilaclama_1783278277299.png',
    lat: 41.042,
    lng: 29.008,
    alt: 'besiktas-ev-ilaclama-tck-ilaclama'
  },
  {
    name: 'tuzla_ilaclama',
    file: 'tuzla_ilaclama_1783278285196.png',
    lat: 40.816,
    lng: 29.300,
    alt: 'pendik-tuzla-fabrika-ilaclama-tck-ilaclama'
  },
  {
    name: 'atasehir_ilaclama',
    file: 'atasehir_ilaclama_1783278294934.png',
    lat: 40.985,
    lng: 29.127,
    alt: 'umraniye-hamambocek-ilaclama-tck-ilaclama'
  }
];

// Coordinate conversion for EXIF
function degToDmsRational(degFloat) {
  const deg = Math.abs(degFloat);
  const minFloat = (deg % 1) * 60;
  const secFloat = (minFloat % 1) * 60;
  const degInt = Math.floor(deg);
  const minInt = Math.floor(minFloat);
  const secInt = Math.round(secFloat * 100);
  return [[degInt, 1], [minInt, 1], [secInt, 100]];
}

async function processImages() {
  const sourceDir = 'C:\\Users\\onurk\\.gemini\\antigravity\\brain\\1a8d24e7-3860-419e-b6a2-9210b37b61f7';
  const destDir = path.join(__dirname, 'public', 'images');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const img of images) {
    const sourcePath = path.join(sourceDir, img.file);
    const destJpegPath = path.join(destDir, \`\${img.alt}.jpg\`);

      const destJpegPath = path.join(destDir, img.alt + '.jpg');

      try {
        if (!fs.existsSync(sourcePath)) {
          console.error('Source missing:', sourcePath);
          continue;
        }

        // Convert PNG to JPEG using Sharp
        const jpegBuffer = await sharp(sourcePath)
          .jpeg({ quality: 90 })
          .toBuffer();

        // Convert to binary string for piexif
        const jpegString = jpegBuffer.toString('binary');

        // Create EXIF data
        const zeroth = {};
        const exif = {};
        const gps = {};

        zeroth[piexif.ImageIFD.Make] = "TCK Ilaclama";
        zeroth[piexif.ImageIFD.Model] = img.alt;

        const latRef = img.lat < 0 ? 'S' : 'N';
        const lngRef = img.lng < 0 ? 'W' : 'E';

        gps[piexif.GPSIFD.GPSLatitudeRef] = latRef;
        gps[piexif.GPSIFD.GPSLatitude] = degToDmsRational(img.lat);
        gps[piexif.GPSIFD.GPSLongitudeRef] = lngRef;
        gps[piexif.GPSIFD.GPSLongitude] = degToDmsRational(img.lng);

        const exifObj = { "0th": zeroth, "Exif": exif, "GPS": gps };
        const exifbytes = piexif.dump(exifObj);

        const newJpegString = piexif.insert(exifbytes, jpegString);
        const newJpegBuffer = Buffer.from(newJpegString, 'binary');

        fs.writeFileSync(destJpegPath, newJpegBuffer);
        console.log('Successfully geotagged and saved:', destJpegPath);

      } catch (e) {
        console.error('Error processing', img.name, e);
      }
  }
}

processImages();

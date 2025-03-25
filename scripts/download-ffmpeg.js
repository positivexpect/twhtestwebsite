const https = require('https');
const fs = require('fs');
const path = require('path');

const FFMPEG_VERSION = '0.12.9';
const BASE_URL = `https://unpkg.com/@ffmpeg/core@${FFMPEG_VERSION}/dist/umd`;

const files = [
  'ffmpeg-core.js',
  'ffmpeg-core.wasm'
];

const publicDir = path.join(process.cwd(), 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

files.forEach(file => {
  const url = `${BASE_URL}/${file}`;
  const filePath = path.join(publicDir, file);

  console.log(`Downloading ${file}...`);

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${file}`);
      });
    } else {
      console.error(`Failed to download ${file}: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${file}:`, err);
  });
}); 
const https = require('https');
const fs = require('fs');
const path = require('path');

const FFMPEG_VERSION = '0.12.9';
const BASE_URL = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_VERSION}/dist/umd`;

const files = [
  'ffmpeg-core.js',
  'ffmpeg-core.wasm'
];

const publicDir = path.join(process.cwd(), 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const downloadFile = (url, filePath) => {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${path.basename(filePath)}...`);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded ${path.basename(filePath)}`);
          resolve();
        });

        fileStream.on('error', (err) => {
          fs.unlink(filePath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download ${path.basename(filePath)}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(new Error(`Error downloading ${path.basename(filePath)}: ${err.message}`));
    });
  });
};

const downloadAllFiles = async () => {
  try {
    await Promise.all(files.map(file => {
      const url = `${BASE_URL}/${file}`;
      const filePath = path.join(publicDir, file);
      return downloadFile(url, filePath);
    }));
    console.log('All files downloaded successfully');
  } catch (error) {
    console.error('Error during download:', error.message);
    process.exit(1);
  }
};

downloadAllFiles(); 
const fs = require('fs');
const path = require('path');

const ffmpegFiles = [
  {
    src: 'node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.js',
    dest: 'public/ffmpeg/ffmpeg-core.js'
  },
  {
    src: 'node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.wasm',
    dest: 'public/ffmpeg/ffmpeg-core.wasm'
  }
];

// Create ffmpeg directory if it doesn't exist
const ffmpegDir = path.join(process.cwd(), 'public', 'ffmpeg');
if (!fs.existsSync(ffmpegDir)) {
  fs.mkdirSync(ffmpegDir, { recursive: true });
}

// Copy files
ffmpegFiles.forEach(({ src, dest }) => {
  const srcPath = path.join(process.cwd(), src);
  const destPath = path.join(process.cwd(), dest);

  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    process.exit(1);
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${src} to ${dest}`);
}); 
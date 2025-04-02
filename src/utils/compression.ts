import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export async function initializeFFmpeg() {
  if (ffmpeg) return ffmpeg;

  try {
    ffmpeg = new FFmpeg();
    await ffmpeg.load({
      coreURL: await toBlobURL('/ffmpeg/ffmpeg-core.js', 'text/javascript'),
      wasmURL: await toBlobURL('/ffmpeg/ffmpeg-core.wasm', 'application/wasm'),
    });
    return ffmpeg;
  } catch (error) {
    console.error('Failed to initialize FFmpeg:', error);
    return null;
  }
}

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  onProgress?: (progress: number) => void;
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export async function compressVideo(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const instance = await initializeFFmpeg();
  if (!instance) {
    console.warn('FFmpeg not available, returning original file');
    return file;
  }

  const { onProgress } = options;

  try {
    const inputFileName = 'input' + file.name.substring(file.name.lastIndexOf('.'));
    const outputFileName = 'output.mp4';

    await instance.writeFile(inputFileName, await fetchFile(file));

    instance.on('progress', ({ progress }) => {
      if (onProgress) {
        onProgress(Math.round(progress * 100));
      }
    });

    // Optimize compression settings based on file size
    const isLargeFile = file.size > 100 * 1024 * 1024; // 100MB
    const crf = isLargeFile ? '28' : '23'; // Higher CRF = more compression
    const preset = isLargeFile ? 'faster' : 'medium';

    await instance.exec([
      '-i', inputFileName,
      '-c:v', 'libx264',
      '-crf', crf,
      '-preset', preset,
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      outputFileName
    ]);

    const data = await instance.readFile(outputFileName);
    const compressedFile = new File([data], file.name.replace(/\.[^/.]+$/, '_compressed.mp4'), {
      type: 'video/mp4'
    });

    // Only use compressed version if it's actually smaller
    return compressedFile.size < file.size ? compressedFile : file;
  } catch (error) {
    console.error('Error compressing video:', error);
    return file;
  }
}

export async function compressFile(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  // Don't compress if file is small enough
  if (file.size < 1024 * 1024) { // 1MB
    return file;
  }

  try {
    if (file.type.startsWith('image/')) {
      return await compressImage(file, options);
    } else if (file.type.startsWith('video/')) {
      return await compressVideo(file, options);
    }
    return file;
  } catch (error) {
    console.error('Error compressing file:', error);
    return file;
  }
} 
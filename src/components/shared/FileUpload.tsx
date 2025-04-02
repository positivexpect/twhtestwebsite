import { useState } from 'react';

interface FileUploadProps {
  onUploadComplete: (url: string, file: File) => void;
  onUploadError: (error: Error) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  multiple?: boolean;
}

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  accept = 'image/*,video/*',
  maxSize = 100 * 1024 * 1024, // 100MB default
  className = '',
  multiple = true
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      // Basic validation
      if (file.size === 0) {
        onUploadError(new Error(`File "${file.name}" is empty`));
        continue;
      }

      if (file.size > maxSize) {
        onUploadError(new Error(`File "${file.name}" exceeds size limit of ${Math.round(maxSize / 1024 / 1024)}MB`));
        continue;
      }

      try {
        setIsUploading(true);
        setUploadProgress(0);

        // Create form data for upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('contentType', file.type);

        // Upload through API route with progress tracking
        const xhr = new XMLHttpRequest();
        
        // Create a promise to handle the upload
        const uploadPromise = new Promise<{ path: string; url: string }>((resolve, reject) => {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(progress);
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
              } catch (error) {
                reject(new Error('Invalid response from server'));
              }
            } else {
              try {
                const error = JSON.parse(xhr.responseText);
                reject(new Error(error.error || 'Upload failed'));
              } catch {
                reject(new Error(`Upload failed with status ${xhr.status}`));
              }
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error('Network error occurred'));
          });

          xhr.addEventListener('abort', () => {
            reject(new Error('Upload was aborted'));
          });
        });

        // Start the upload
        xhr.open('POST', '/api/upload');
        xhr.send(formData);

        const data = await uploadPromise;

        if (!data.url) {
          throw new Error('No URL returned from upload');
        }

        console.log('Upload successful:', {
          url: data.url,
          fileName: file.name
        });

        onUploadComplete(data.url, file);
      } catch (error) {
        console.error('Upload error:', error);
        onUploadError(error instanceof Error ? error : new Error('Upload failed'));
      } finally {
        setIsUploading(false);
      }
    }

    // Clear the input
    e.target.value = '';
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {accept.split(',').join(', ')} (Max {Math.round(maxSize / 1024 / 1024)}MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            multiple={multiple}
            disabled={isUploading}
          />
        </label>
      </div>

      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
} 
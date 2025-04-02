import { useState } from 'react';

interface FileUploadProps {
  onUploadComplete: (url: string, file: File) => void;
  onUploadError: (error: Error) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  multiple?: boolean;
  formType?: 'video_testimonial' | 'ugly_window_contest' | 'assessment';
}

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  accept = 'image/*,video/*',
  maxSize = 100 * 1024 * 1024, // 100MB default
  className = '',
  multiple = true,
  formType
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file: File): Error | null => {
    if (file.size === 0) {
      return new Error(`File "${file.name}" is empty`);
    }

    if (file.size > maxSize) {
      return new Error(`File "${file.name}" exceeds size limit of ${Math.round(maxSize / 1024 / 1024)}MB`);
    }

    const fileType = file.type.split('/')[0];
    if (formType === 'video_testimonial' && fileType !== 'video') {
      return new Error('Only video files are allowed for video testimonials');
    }
    if (formType === 'ugly_window_contest' && fileType !== 'image') {
      return new Error('Only image files are allowed for the ugly window contest');
    }

    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const validationError = validateFile(file);
      if (validationError) {
        onUploadError(validationError);
        continue;
      }

      try {
        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('contentType', file.type);
        if (formType) {
          formData.append('formType', formType);
        }

        const xhr = new XMLHttpRequest();
        
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
            reject(new Error('Network error occurred during upload'));
          });

          xhr.addEventListener('abort', () => {
            reject(new Error('Upload was aborted'));
          });

          xhr.addEventListener('timeout', () => {
            reject(new Error('Upload timed out. Please try again.'));
          });
        });

        xhr.open('POST', '/api/upload');
        xhr.timeout = 300000; // 5 minutes timeout
        xhr.send(formData);

        const data = await uploadPromise;

        if (!data.url) {
          throw new Error('No URL returned from upload');
        }

        console.log('Upload successful:', {
          url: data.url,
          fileName: file.name,
          formType
        });

        onUploadComplete(data.url, file);
      } catch (error) {
        console.error('Upload error:', error);
        onUploadError(error instanceof Error ? error : new Error('Upload failed'));
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
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
              {formType === 'video_testimonial' ? 'Video files only' :
               formType === 'ugly_window_contest' ? 'Image files only' :
               accept.split(',').join(', ')} (Max {Math.round(maxSize / 1024 / 1024)}MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={formType === 'video_testimonial' ? 'video/*' :
                   formType === 'ugly_window_contest' ? 'image/*' :
                   accept}
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
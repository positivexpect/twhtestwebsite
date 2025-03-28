import { useState, useRef } from 'react';
import { uploadFile } from '@/utils/fileUpload';

interface FileUploadProps {
  onUploadComplete: (filePath: string) => void;
  onUploadError: (error: string) => void;
  bucket: 'video-testimonials' | 'ugly-windows';
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  label?: string;
  required?: boolean;
}

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  bucket,
  accept = '*/*',
  maxSize = 100 * 1024 * 1024, // 100MB default
  className = '',
  label = 'Upload File',
  required = false,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize) {
      onUploadError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);

    try {
      const { filePath, error } = await uploadFile(file, bucket);
      
      if (error) {
        throw error;
      }

      onUploadComplete(filePath);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="flex items-center space-x-4">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          required={required}
          disabled={isUploading}
        />
        
        <button
          type="button"
          onClick={handleClick}
          disabled={isUploading}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
            ${isUploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
        >
          {isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Choose File'
          )}
        </button>

        {selectedFile && (
          <span className="text-sm text-gray-500">
            {selectedFile.name}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Maximum file size: {Math.round(maxSize / (1024 * 1024))}MB
      </p>
    </div>
  );
} 
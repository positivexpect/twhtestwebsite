import { useState, useRef } from 'react';
import { uploadFile } from '@/utils/fileUpload';
import ProgressBar from './ProgressBar';

interface FileUploadProps {
  onUploadComplete: (filePath: string) => void;
  onUploadError: (error: Error) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  multiple?: boolean;
}

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  accept = '*/*',
  maxSize = 1024 * 1024 * 1024, // 1GB default
  className = '',
  multiple = false
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    for (const file of Array.from(files)) {
      if (file.size > maxSize) {
        onUploadError(new Error(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`));
        continue;
      }

      setIsUploading(true);
      setUploadProgress(0);

      try {
        const { filePath, error } = await uploadFile(file, 'form-uploads', (progress) => {
          setUploadProgress(progress);
        });

        if (error) {
          // Only throw if it's a real error, not just a status check
          if (error.message && !error.message.includes('200')) {
            throw error;
          }
        }
        
        if (!filePath) {
          throw new Error('No file path returned from upload');
        }

        onUploadComplete(filePath);
      } catch (error) {
        console.error('Upload error:', error);
        onUploadError(error instanceof Error ? error : new Error('Failed to upload file'));
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className={className}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }`}
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-600">Uploading...</div>
            <ProgressBar progress={uploadProgress} className="max-w-md mx-auto" />
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-600">
              Drag and drop your {multiple ? 'files' : 'file'} here, or click to select
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
            </div>
          </>
        )}
      </div>
    </div>
  );
} 
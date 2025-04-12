import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ExistingImagePickerProps {
  onSelect: (imageUrl: string) => void;
  onClose: () => void;
}

export default function ExistingImagePicker({ onSelect, onClose }: ExistingImagePickerProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase.storage
          .from('blog-post-images')
          .list();

        if (error) throw error;

        const imageUrls = data.map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from('blog-post-images')
            .getPublicUrl(file.name);
          return publicUrl;
        });

        setImages(imageUrls);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Select Existing Image</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No images found</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {images.map((imageUrl, index) => (
              <div
                key={index}
                className="relative group cursor-pointer border rounded-lg overflow-hidden hover:border-[#CD2028]"
                onClick={() => {
                  onSelect(imageUrl);
                  onClose();
                }}
              >
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
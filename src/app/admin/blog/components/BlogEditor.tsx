'use client';

import { BlogPost } from '@/types/blog';
import { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from 'react';
import { parseMarkdownContent, separateContentAndMetadata } from '@/lib/blogUtils';
import dynamic from 'next/dynamic';
import ImageUploader from './ImageUploader';
import ExistingImagePicker from './ExistingImagePicker';
import { generateImageMarkdown } from '@/lib/imageUtils';
import BlogPostLayout from '@/components/BlogPostLayout';

// Add ContextMenu component
interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onImageUpload: () => void;
  onExistingImage: () => void;
}

function ContextMenu({ x, y, onClose, onImageUpload, onExistingImage }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white shadow-lg rounded-md py-1 border border-gray-200 z-50"
      style={{ left: x, top: y }}
    >
      <button
        onClick={() => {
          onImageUpload();
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Upload New Image
      </button>
      <button
        onClick={() => {
          onExistingImage();
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Insert Existing Image
      </button>
    </div>
  );
}

// Dynamically import ReactMarkdown to avoid SSR issues
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

interface BlogEditorProps {
  post: BlogPost;
  onChange: Dispatch<SetStateAction<BlogPost>>;
  onPreview: () => void;
  onSave: (post: BlogPost) => Promise<void>;
}

export default function BlogEditor({ post, onChange, onPreview, onSave }: BlogEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showExistingImagePicker, setShowExistingImagePicker] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const handleChange = (field: keyof BlogPost, value: any) => {
    onChange(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      await onSave(post);
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error instanceof Error ? error.message : 'Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    const imageMarkdown = `![](${imageUrl})`;
    const textArea = textAreaRef.current;
    if (textArea) {
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const text = post.content || '';
      const before = text.substring(0, start);
      const after = text.substring(end);
      const newContent = before + imageMarkdown + after;
      handleChange('content', newContent);
      
      // Set cursor position after the inserted image markdown
      setTimeout(() => {
        textArea.focus();
        const newCursorPos = start + imageMarkdown.length;
        textArea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setContextMenuPosition({ x, y });
    setShowContextMenu(true);
  };

  if (showPreview) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowPreview(false)}
            className="text-[#CD2028] hover:text-[#B01B22]"
          >
            Back to Editor
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        <div className="bg-white shadow sm:rounded-lg">
          <BlogPostLayout post={post} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowPreview(true)}
          className="text-[#CD2028] hover:text-[#B01B22]"
        >
          Preview
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {showImageUploader && (
        <ImageUploader
          onUpload={handleImageUpload}
          onClose={() => setShowImageUploader(false)}
        />
      )}

      {showExistingImagePicker && (
        <ExistingImagePicker
          onSelect={handleImageUpload}
          onClose={() => setShowExistingImagePicker(false)}
        />
      )}

      {showContextMenu && contextMenuPosition && (
        <ContextMenu
          x={contextMenuPosition.x}
          y={contextMenuPosition.y}
          onClose={() => setShowContextMenu(false)}
          onImageUpload={() => {
            setShowContextMenu(false);
            setShowImageUploader(true);
          }}
          onExistingImage={() => {
            setShowContextMenu(false);
            setShowExistingImagePicker(true);
          }}
        />
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={2}
            value={post.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content (Markdown)
          </label>
          <textarea
            ref={textAreaRef}
            id="content"
            rows={20}
            value={post.content}
            onChange={(e) => handleChange('content', e.target.value)}
            onContextMenu={handleContextMenu}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028] font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={post.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
            />
          </div>

          <div>
            <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">
              Read Time
            </label>
            <input
              type="text"
              id="readTime"
              value={post.readTime}
              onChange={(e) => handleChange('readTime', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={post.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
          />
        </div>

        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            id="keywords"
            value={post.keywords}
            onChange={(e) => handleChange('keywords', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={post.isDraft}
                onChange={(e) => {
                  const isDraft = e.target.checked;
                  handleChange('isDraft', isDraft);
                  // If it's a draft, it can't be published
                  if (isDraft) {
                    handleChange('published', false);
                  }
                }}
                className="rounded border-gray-300 text-[#CD2028] focus:ring-[#CD2028]"
              />
              <span className="ml-2">Draft</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={post.published}
                onChange={(e) => {
                  const isPublished = e.target.checked;
                  handleChange('published', isPublished);
                  // If it's published, it can't be a draft
                  if (isPublished) {
                    handleChange('isDraft', false);
                  }
                }}
                className="rounded border-gray-300 text-[#CD2028] focus:ring-[#CD2028]"
              />
              <span className="ml-2">Published</span>
            </label>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <input
                type="text"
                id="metaTitle"
                value={post.metaTitle}
                onChange={(e) => handleChange('metaTitle', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
              />
            </div>

            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                rows={2}
                value={post.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
              />
            </div>

            <div>
              <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700">
                Canonical URL
              </label>
              <input
                type="text"
                id="canonicalUrl"
                value={post.canonicalUrl}
                onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
              />
            </div>

            <div>
              <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700">
                OG Image URL
              </label>
              <input
                type="text"
                id="ogImage"
                value={post.ogImage}
                onChange={(e) => handleChange('ogImage', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CD2028] focus:border-[#CD2028]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
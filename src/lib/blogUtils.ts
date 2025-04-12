import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

interface ParsedBlogContent {
  content: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    structuredData?: Record<string, any>;
  };
}

const METADATA_DELIMITER = '---METADATA---';

export async function parseMarkdownContent(markdown: string): Promise<string> {
  // Remove metadata section before parsing markdown
  const [content] = markdown.split(METADATA_DELIMITER);
  
  const result = await remark()
    .use(remarkGfm)
    .use(remarkToc, { heading: 'Table of Contents' })
    .use(html, { sanitize: true }) // Enable sanitization for security
    .process(content.trim());

  return result.toString();
}

export function separateContentAndMetadata(content: string): ParsedBlogContent {
  const parts = content.split(METADATA_DELIMITER);
  const mainContent = parts[0].trim();
  const metadataSection = parts[1] || '';

  const metadata: ParsedBlogContent['metadata'] = {
    title: '',
    description: '',
    keywords: [],
    structuredData: undefined
  };

  // Parse metadata section
  const metadataLines = metadataSection.trim().split('\n');
  let inStructuredData = false;
  let structuredDataString = '';

  metadataLines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('Title: ')) {
      metadata.title = trimmedLine.replace('Title: ', '').trim();
    } else if (trimmedLine.startsWith('Description: ')) {
      metadata.description = trimmedLine.replace('Description: ', '').trim();
    } else if (trimmedLine.startsWith('Keywords: ')) {
      metadata.keywords = trimmedLine
        .replace('Keywords: ', '')
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
    } else if (trimmedLine.startsWith('```json')) {
      inStructuredData = true;
      structuredDataString = '';
    } else if (trimmedLine === '```' && inStructuredData) {
      inStructuredData = false;
      try {
        metadata.structuredData = JSON.parse(structuredDataString);
      } catch (e) {
        console.error('Failed to parse structured data:', e);
      }
    } else if (inStructuredData) {
      structuredDataString += trimmedLine + '\n';
    }
  });

  return {
    content: mainContent,
    metadata
  };
}

export function generateMetadataHead(metadata: ParsedBlogContent['metadata']): string {
  return `
    <title>${metadata.title}</title>
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.keywords.join(', ')}" />
    ${metadata.structuredData ? `
    <script type="application/ld+json">
      ${JSON.stringify(metadata.structuredData)}
    </script>
    ` : ''}
  `;
} 
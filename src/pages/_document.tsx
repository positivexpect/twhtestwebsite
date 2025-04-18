import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Critical CSS */}
          <style dangerouslySetInnerHTML={{ __html: `
            /* Critical CSS for above-the-fold content */
            .hero-container { position: relative; height: 80vh; width: 100%; }
            .hero-image { position: absolute; height: 100%; width: 100%; object-fit: cover; }
            
            /* Critical typography */
            h1 { font-size: 2.25rem; line-height: 2.5rem; font-weight: 800; color: #111827; }
            @media (min-width: 640px) { h1 { font-size: 3rem; line-height: 1; } }
            @media (min-width: 768px) { h1 { font-size: 3.75rem; line-height: 1; } }
            
            /* Critical layout */
            .container { width: 100%; margin-left: auto; margin-right: auto; }
            @media (min-width: 640px) { .container { max-width: 640px; } }
            @media (min-width: 768px) { .container { max-width: 768px; } }
            @media (min-width: 1024px) { .container { max-width: 1024px; } }
            @media (min-width: 1280px) { .container { max-width: 1280px; } }
            
            /* Critical colors */
            .text-primary { color: #CD2028; }
            .bg-primary { background-color: #CD2028; }
            .text-white { color: #ffffff; }
            .bg-white { background-color: #ffffff; }
          `}} />

          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="/fonts/inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Preconnect to critical third-party domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 
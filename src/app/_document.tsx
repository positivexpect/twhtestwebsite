import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Base styles that should load immediately */
              :root {
                --primary: #CD2028;
                --primary-dark: #B01B22;
              }
              
              /* Critical above-the-fold styles */
              .bg-white { background-color: #ffffff; }
              .text-gray-900 { color: #111827; }
              .font-extrabold { font-weight: 800; }
              .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
              .text-[#CD2028] { color: var(--primary); }
              .bg-[#CD2028] { background-color: var(--primary); }
              .hover\\:bg-[#B01B22]:hover { background-color: var(--primary-dark); }
              
              /* Prevent content shift */
              body { margin: 0; }
              .min-h-screen { min-height: 100vh; }
              
              /* Optimize mobile performance */
              @media (max-width: 640px) {
                .text-4xl {
                  font-size: 1.875rem;
                  line-height: 2.25rem;
                }
              }
            `,
          }}
        />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 
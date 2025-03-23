declare namespace JSX {
  interface IntrinsicElements {
    'gmpx-api-loader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      key?: string;
      'solution-channel'?: string;
    }, HTMLElement>;
    'gmpx-store-locator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      'map-id'?: string;
    }, HTMLElement>;
  }
} 
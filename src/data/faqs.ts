import { FAQItem } from '@/components/client/FAQSection';

export const defaultFaqs: FAQItem[] = [
  {
    question: "Can I replace just the glass in my window?",
    answer: "Yes, in 85% of cases, you can replace just the glass for $200-$600, saving thousands over full replacement. We specialize in glass-only replacement, which preserves your existing frame while restoring clarity and energy efficiency.",
    media: {
      type: 'image',
      url: '/images/faqs/brokenglass.jpg',
      alt: 'Glass replacement example'
    }
  },
  {
    question: "Why do my windows become foggy?",
    answer: "Foggy windows result from seal failure, letting moisture condense between panes. This common issue is fixable for $200-$600 through our specialized glass replacement process.",
    media: {
      type: 'image',
      url: '/images/faqs/foggy.jpg',
      alt: 'Foggy window example'
    }
  },
  {
    question: "If I have Low-E, can I save money by opting for clear glass?",
    answer: "While clear glass is less expensive, we recommend maintaining your existing Low-E configuration for optimal energy efficiency. The image shows the difference between Low-E (left) and clear glass (right).",
    media: {
      type: 'image',
      url: '/images/faqs/loweleftclearright.jpg',
      alt: 'Low-E vs Clear glass comparison'
    }
  },
  {
    question: "What's the difference between contour and flat grids?",
    answer: "We offer both contour (sculptured) and flat grid options. Contour grids have a more dimensional, decorative appearance, while flat grids provide a classic, clean look.",
    media: {
      type: 'image',
      url: '/images/faqs/contour.jpg',
      alt: 'Contour grid example'
    }
  },
  {
    question: "What grid patterns are available?",
    answer: "We offer various grid patterns including 6-lite and 9-lite configurations. The choice depends on your home's style and personal preference.",
    media: {
      type: 'image',
      url: '/images/faqs/6lite.png',
      alt: '6-lite grid pattern'
    }
  },
  {
    question: "How can you tell if Low-E glass is hazy?",
    answer: "Hazy Low-E glass can be identified by a milky or cloudy appearance. This is different from normal Low-E coating and may indicate a need for replacement.",
    media: {
      type: 'image',
      url: '/images/faqs/hazylowe.jpg',
      alt: 'Hazy Low-E glass example'
    }
  },
  {
    question: "How do you accurately price through photos?",
    answer: "We use a systematic approach to evaluate window issues through photos. Watch this video to learn how we assess and price repairs accurately.",
    media: {
      type: 'video',
      url: 'https://youtu.be/PiOGtX46SnA',
      alt: 'Photo pricing process video'
    }
  },
  {
    question: "Can you replace just one side of my glass?",
    answer: "Watch this detailed video explanation of how we handle single-side glass replacement and when it's appropriate.",
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=4IZhMaRsJ6w',
      alt: 'Single side glass replacement video'
    }
  }
]; 
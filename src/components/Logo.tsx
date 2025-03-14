type LogoProps = {
  variant?: 'full' | 'icon';
  className?: string;
};

export default function Logo({ variant = 'full', className = '' }: LogoProps) {
  const redColor = '#CD2028';
  const blackColor = '#000000';

  if (variant === 'full') {
    return (
      <div className={`flex items-center ${className}`}>
        <svg width="400" height="60" viewBox="0 0 800 120" className="h-12 w-auto">
          <g transform="translate(10, 10)">
            {/* Icon */}
            <g transform="translate(0, -20) scale(1.2)">
              {/* Red cross base */}
              <path 
                d="M10,30 L50,30 L50,10 L70,10 L70,50 L50,50 L50,70 L10,70 L10,50 L0,50 L0,30 L10,30 Z" 
                fill={redColor}
              />
              {/* Black shadow */}
              <path 
                d="M50,10 L70,10 L50,30 Z" 
                fill={blackColor}
                fillOpacity="0.8"
              />
              {/* White window circle */}
              <circle cx="30" cy="40" r="10" fill="white" />
              {/* Window cross */}
              <path 
                d="M30,34 L30,46 M24,40 L36,40" 
                stroke={redColor}
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
            </g>
            {/* Text */}
            <text 
              x="100" 
              y="35" 
              fontFamily="Arial Black, sans-serif" 
              fontSize="28" 
              fontWeight="900"
              letterSpacing="2"
              fill={blackColor}
            >THE</text>
            <text 
              x="100" 
              y="75" 
              fontFamily="Arial Black, sans-serif" 
              fontSize="52" 
              fontWeight="900"
              letterSpacing="2"
              fill={blackColor}
            >WINDOW</text>
            <text 
              x="100" 
              y="110" 
              fontFamily="Arial Black, sans-serif" 
              fontSize="52" 
              fontWeight="900"
              letterSpacing="2"
              fill={redColor}
            >HOSPITAL</text>
            <text 
              x="390" 
              y="110" 
              fontFamily="Arial Black, sans-serif" 
              fontSize="52" 
              fontWeight="900"
              letterSpacing="2"
              fill={redColor}
            >INC</text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <svg width="60" height="60" viewBox="0 0 80 80" className="h-12 w-auto">
        <g transform="translate(5, 5)">
          {/* Red cross base */}
          <path 
            d="M10,30 L50,30 L50,10 L70,10 L70,50 L50,50 L50,70 L10,70 L10,50 L0,50 L0,30 L10,30 Z" 
            fill={redColor}
          />
          {/* Black shadow */}
          <path 
            d="M50,10 L70,10 L50,30 Z" 
            fill={blackColor}
            fillOpacity="0.8"
          />
          {/* White window circle */}
          <circle cx="30" cy="40" r="10" fill="white" />
          {/* Window cross */}
          <path 
            d="M30,34 L30,46 M24,40 L36,40" 
            stroke={redColor}
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

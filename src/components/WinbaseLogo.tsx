import React from 'react';

interface WinbaseLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  isLightText?: boolean;
  animated?: boolean;
}

export const WinbaseLogo: React.FC<WinbaseLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  isLightText = false,
  animated = false,
}) => {
  const iconSizeMap = {
    sm: 24,
    md: 36,
    lg: 52,
    xl: 72,
    hero: 120,
  };

  const currentIconSize = iconSizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon matching the uploaded Winbase 11 brand */}
      <div className={`relative flex items-center justify-center ${animated ? 'hover:scale-105 transition-transform duration-300' : ''}`}>
        <svg
          width={currentIconSize}
          height={currentIconSize}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Mask to cut out the Coinbase/Base style circle in the center */}
          <defs>
            <mask id="winbase-center-mask">
              {/* White background enables all drawing */}
              <rect x="0" y="0" width="120" height="120" fill="white" />
              {/* Black ring cutout in the center with gap on the right */}
              {/* Outer radius 36, inner radius 20 */}
              <circle cx="60" cy="60" r="36" fill="black" />
              {/* Center fill remains */}
              <circle cx="60" cy="60" r="20" fill="white" />
              {/* Gap at right side of circle for the 'C' opening */}
              <rect x="60" y="52" width="40" height="16" fill="white" />
            </mask>
          </defs>

          {/* Quadrant 1: Top Left */}
          <path
            d="M8 12 H56 V56 H8 Z"
            fill="#0052FF"
            className="transition-colors"
          />
          {/* Quadrant 2: Top Right */}
          <path
            d="M64 12 H112 V56 H64 Z"
            fill="#0052FF"
            className="transition-colors"
          />
          {/* Quadrant 3: Bottom Left */}
          <path
            d="M8 64 H56 V108 H8 Z"
            fill="#0052FF"
            className="transition-colors"
          />
          {/* Quadrant 4: Bottom Right */}
          <path
            d="M64 64 H112 V108 H64 Z"
            fill="#0052FF"
            className="transition-colors"
          />

          {/* The White Base 'C' circle overlaid in the exact center matching image */}
          {/* Circle base with thickness and right gap */}
          <path
            d="M 60 26 
               A 34 34 0 1 0 84 36 
               L 72 45 
               A 20 20 0 1 1 60 40 
               A 20 20 0 0 1 73.5 47
               L 85 38
               A 34 34 0 0 0 60 26 Z"
            fill="white"
          />

          {/* Center cross division lines for windows aesthetic */}
          <rect x="57" y="10" width="6" height="100" fill="transparent" />
          <rect x="6" y="57" width="108" height="6" fill="transparent" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-black tracking-tight font-sans ${
              size === 'sm'
                ? 'text-lg'
                : size === 'md'
                ? 'text-2xl'
                : size === 'lg'
                ? 'text-3xl'
                : size === 'xl'
                ? 'text-4xl'
                : 'text-6xl'
            } ${
              isLightText
                ? 'text-white'
                : 'text-[#0052FF]'
            }`}
          >
            WINBASE 11
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] tracking-widest font-semibold uppercase opacity-70 text-slate-500 dark:text-slate-400">
              The Meme Operating System
            </span>
          )}
        </div>
      )}
    </div>
  );
};

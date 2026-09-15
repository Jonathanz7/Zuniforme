import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showSubtitle = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // Sizes
  const sizeMap = {
    sm: { box: 'h-9', zu: 'text-2xl', text: 'text-[9px] tracking-[0.25em]', sub: 'text-[7px]' },
    md: { box: 'h-12', zu: 'text-3xl sm:text-4xl', text: 'text-[11px] sm:text-xs tracking-[0.28em]', sub: 'text-[8px] sm:text-[9px]' },
    lg: { box: 'h-16', zu: 'text-5xl', text: 'text-sm tracking-[0.32em]', sub: 'text-[10px]' },
  };

  const currentSize = sizeMap[size];

  // When user places logo.png in public folder, this will load seamlessly;
  // otherwise our exact vector monogram renders cleanly
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {!imageError ? (
        <img
          src="/logo.png"
          alt="ZUniforme Logo"
          className={`${currentSize.box} w-auto object-contain hidden`}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : null}

      {/* Monogram Script Graphic + Overlaid Typography */}
      <div className="relative flex items-center">
        {/* Soft decorative dusty-rose blush circle */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{
              background: variant === 'dark' 
                ? 'linear-gradient(135deg, rgba(168, 87, 127, 0.35) 0%, rgba(244, 184, 204, 0.2) 100%)' 
                : 'linear-gradient(135deg, #FBEAF1 0%, #F5CEE0 100%)',
              border: variant === 'dark' ? '1px solid rgba(244, 184, 204, 0.3)' : '1px solid #F4B8CC'
            }}
          >
            <span
              className="font-script leading-none select-none text-2xl sm:text-3xl font-normal"
              style={{
                color: variant === 'dark' ? '#F4B8CC' : '#A8577F',
                transform: 'translateY(-1px)'
              }}
            >
              ZU
            </span>
          </div>
        </div>

        {/* Wordmark next to monogram */}
        <div className="flex flex-col justify-center ml-2.5">
          <div className="flex items-center">
            <span
              className={`font-extrabold uppercase ${currentSize.text} font-sans leading-none`}
              style={{
                color: variant === 'dark' ? '#FFFFFF' : '#A8577F',
                letterSpacing: '0.22em'
              }}
            >
              ZUNIFORME
            </span>
          </div>

          {showSubtitle && (
            <span
              className={`font-medium uppercase ${currentSize.sub} tracking-[0.16em] mt-1 leading-tight`}
              style={{
                color: variant === 'dark' ? '#D6C0CB' : '#8A5370'
              }}
            >
              Uniformes & Dotaciones · Neiva
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

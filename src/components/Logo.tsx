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

  // Proportional heights and sizing matching the layout
  const sizeMap = {
    sm: { imgHeight: 'h-8 sm:h-9', subText: 'text-[7px]' },
    md: { imgHeight: 'h-10 sm:h-12', subText: 'text-[8px] sm:text-[9px]' },
    lg: { imgHeight: 'h-12 sm:h-14', subText: 'text-[10px]' },
  };

  const currentSize = sizeMap[size];
  const logoSrc = variant === 'dark' ? '/logo-white.png' : '/logo.png';

  return (
    <div className={`inline-flex flex-col justify-center select-none ${className}`}>
      <div className="flex items-center">
        {!imageError ? (
          <img
            src={logoSrc}
            alt="ZUniforme - Marca de Uniformes y Dotaciones"
            className={`${currentSize.imgHeight} w-auto object-contain transition-transform duration-200 hover:opacity-95`}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          /* Fallback in case of image load delay */
          <div className="flex items-center gap-2">
            <span
              className="font-script text-3xl font-bold leading-none"
              style={{ color: variant === 'dark' ? '#F4B8CC' : '#A8577F' }}
            >
              ZU
            </span>
            <span
              className="font-extrabold uppercase tracking-[0.25em] text-xs font-sans"
              style={{ color: variant === 'dark' ? '#FFFFFF' : '#A8577F' }}
            >
              ZUNIFORME
            </span>
          </div>
        )}
      </div>

      {showSubtitle && (
        <span
          className={`font-medium uppercase ${currentSize.subText} tracking-[0.18em] -mt-0.5 leading-tight pl-1`}
          style={{
            color: variant === 'dark' ? '#D6C0CB' : '#8A5370'
          }}
        >
          Uniformes & Dotaciones · Neiva
        </span>
      )}
    </div>
  );
};

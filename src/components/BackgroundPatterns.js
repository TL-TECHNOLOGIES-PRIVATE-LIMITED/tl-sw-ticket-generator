import React from 'react';

const BackgroundPatterns = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Top right decorative circle */}
      <svg
        className="absolute -right-20 -top-20 text-pink-200 opacity-20"
        width="404"
        height="404"
        fill="none"
      >
        <defs>
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#pattern-circles)" />
      </svg>

      {/* Bottom left decorative dots */}
      <svg
        className="absolute -left-20 -bottom-20 text-pink-200 opacity-20"
        width="404"
        height="404"
        fill="none"
      >
        <defs>
          <pattern
            id="pattern-dots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#pattern-dots)" />
      </svg>

      {/* Center decorative waves */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-100 opacity-30"
        width="404"
        height="404"
        fill="none"
      >
        <path
          d="M0 200C0 200 50 150 100 150C150 150 150 200 200 200C250 200 250 150 300 150C350 150 400 200 400 200"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-[wave_3s_ease-in-out_infinite]"
        />
        <path
          d="M0 220C0 220 50 170 100 170C150 170 150 220 200 220C250 220 250 170 300 170C350 170 400 220 400 220"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-[wave_3s_ease-in-out_infinite]"
          style={{ animationDelay: '0.2s' }}
        />
      </svg>
    </div>
  );
};

export default BackgroundPatterns;
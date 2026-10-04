import React from 'react';

// Horizontal Brand Logo for Navbar (matching all screenshots)
export function LashLookHorizontalLogo({ className = '', height = 30 }) {
  return (
    <div className={`lashlook-logo-horizontal ${className}`} style={{ height: `${height}px`, display: 'inline-flex', alignItems: 'center' }}>
      <svg 
        viewBox="0 0 240 50" 
        height={height}
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* LASH */}
        <text 
          x="0" 
          y="38" 
          fontFamily="'Plus Jakarta Sans', 'Prompt', sans-serif" 
          fontWeight="900" 
          fontSize="36" 
          letterSpacing="-1.5"
          fill="#0B0B0B"
        >
          LASH
        </text>

        {/* L in LOOK */}
        <text 
          x="96" 
          y="38" 
          fontFamily="'Plus Jakarta Sans', 'Prompt', sans-serif" 
          fontWeight="900" 
          fontSize="36" 
          letterSpacing="-1"
          fill="#0B0B0B"
        >
          L
        </text>

        {/* First Cat Eye O */}
        <g transform="translate(122, 10)">
          {/* Cat Ear */}
          <polygon points="4,12 11,0 18,10" fill="#0B0B0B" />
          <polygon points="6,11 11,3 16,9" fill="#EE6B9D" />
          {/* Eye Outline */}
          <path d="M 0,22 Q 13,8 26,22 Q 13,36 0,22 Z" fill="#0B0B0B" />
          <path d="M 3,22 Q 13,12 23,22 Q 13,32 3,22 Z" fill="#FFFFFF" />
          {/* Pupil */}
          <ellipse cx="13" cy="22" rx="3.5" ry="8" fill="#0B0B0B" />
          <ellipse cx="13" cy="22" rx="1.5" ry="6" fill="#16D9B6" />
          {/* Upper Eyelashes */}
          <path d="M 5,16 Q 2,10 0,6" stroke="#0B0B0B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 12,12 Q 12,5 12,2" stroke="#0B0B0B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 20,15 Q 24,9 27,6" stroke="#0B0B0B" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Second Cat Eye O */}
        <g transform="translate(154, 10)">
          {/* Cat Ear */}
          <polygon points="8,10 15,0 22,12" fill="#0B0B0B" />
          <polygon points="10,9 15,3 20,11" fill="#EE6B9D" />
          {/* Eye Outline */}
          <path d="M 0,22 Q 13,8 26,22 Q 13,36 0,22 Z" fill="#0B0B0B" />
          <path d="M 3,22 Q 13,12 23,22 Q 13,32 3,22 Z" fill="#FFFFFF" />
          {/* Pupil */}
          <ellipse cx="13" cy="22" rx="3.5" ry="8" fill="#0B0B0B" />
          <ellipse cx="13" cy="22" rx="1.5" ry="6" fill="#16D9B6" />
          {/* Upper Eyelashes */}
          <path d="M 6,15 Q 2,9 -1,6" stroke="#0B0B0B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 14,12 Q 14,5 14,2" stroke="#0B0B0B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 21,16 Q 24,10 26,6" stroke="#0B0B0B" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* K in LOOK */}
        <text 
          x="186" 
          y="38" 
          fontFamily="'Plus Jakarta Sans', 'Prompt', sans-serif" 
          fontWeight="900" 
          fontSize="36" 
          letterSpacing="-1"
          fill="#0B0B0B"
        >
          K
        </text>
      </svg>
    </div>
  );
}

// Big Stacked Cat Logo for Virtual Try-On Studio Launch Card (matching Image 3)
export function LashLookStackedLogo({ className = '', width = 320 }) {
  const height = width * 0.72;
  return (
    <div className={`lashlook-logo-stacked ${className}`} style={{ width: `${width}px`, height: `${height}px`, display: 'inline-block' }}>
      <svg 
        viewBox="0 0 320 230" 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* LASH (Top blocky font) */}
        <g fill="#EF8EB3">
          <text 
            x="160" 
            y="95" 
            fontFamily="'Plus Jakarta Sans', 'Prompt', sans-serif" 
            fontWeight="900" 
            fontSize="84" 
            textAnchor="middle"
            letterSpacing="8"
          >
            LASH
          </text>
        </g>

        {/* Two Cat Ears in the center */}
        <g fill="#EF8EB3" stroke="#0B0B0B" strokeWidth="2">
          {/* Left Cat Ear */}
          <polygon points="120,118 136,75 152,118" />
          <polygon points="126,115 136,86 146,115" fill="#EE6B9D" stroke="none" />

          {/* Right Cat Ear */}
          <polygon points="168,118 184,75 200,118" />
          <polygon points="174,115 184,86 194,115" fill="#EE6B9D" stroke="none" />
        </g>

        {/* LOOK with Cat Eyes */}
        <g fill="#EF8EB3">
          {/* L */}
          <text 
            x="36" 
            y="200" 
            fontFamily="'Plus Jakarta Sans', 'Prompt', sans-serif" 
            fontWeight="900" 
            fontSize="84" 
            letterSpacing="2"
          >
            L
          </text>

          {/* First O - Cat Eye */}
          <g transform="translate(108, 145)">
            {/* Outer Almond Eye Shape */}
            <path d="M 0,32 Q 26,2 52,32 Q 26,62 0,32 Z" fill="#EF8EB3" />
            <path d="M 6,32 Q 26,10 46,32 Q 26,54 6,32 Z" fill="#0B0B0B" />
            {/* Pupil */}
            <ellipse cx="26" cy="32" rx="6" ry="16" fill="#EF8EB3" />
            <ellipse cx="26" cy="32" rx="2.5" ry="12" fill="#16D9B6" />
            {/* Upper Cat Eyelashes */}
            <path d="M 10,18 Q 4,8 0,2" stroke="#EF8EB3" strokeWidth="3" strokeLinecap="round" />
            <path d="M 26,12 Q 26,2 26,-4" stroke="#EF8EB3" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 42,18 Q 48,8 54,2" stroke="#EF8EB3" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Second O - Cat Eye */}
          <g transform="translate(168, 145)">
            {/* Outer Almond Eye Shape */}
            <path d="M 0,32 Q 26,2 52,32 Q 26,62 0,32 Z" fill="#EF8EB3" />
            <path d="M 6,32 Q 26,10 46,32 Q 26,54 6,32 Z" fill="#0B0B0B" />
            {/* Pupil */}
            <ellipse cx="26" cy="32" rx="6" ry="16" fill="#EF8EB3" />
            <ellipse cx="26" cy="32" rx="2.5" ry="12" fill="#16D9B6" />
            {/* Upper Cat Eyelashes */}
            <path d="M 10,18 Q 4,8 0,2" stroke="#EF8EB3" strokeWidth="3" strokeLinecap="round" />
            <path d="M 26,12 Q 26,2 26,-4" stroke="#EF8EB3" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 42,18 Q 48,8 54,2" stroke="#EF8EB3" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* K */}
          <text 
            x="240" 
            y="200" 
            fontFamily="'Plus Jakarta Sans', 'Prompt', sans-serif" 
            fontWeight="900" 
            fontSize="84" 
            letterSpacing="2"
          >
            K
          </text>
        </g>
      </svg>
    </div>
  );
}

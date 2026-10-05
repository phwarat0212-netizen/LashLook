import React from 'react';
import './LashLookLogo.css';

// Horizontal Brand Logo for Navbar / Header
export function LashLookHorizontalLogo({ className = '', height = 34 }) {
  const basePath = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;

  return (
    <div 
      className={`lashlook-logo-horizontal ${className}`} 
      style={{ height: `${height}px`, display: 'inline-flex', alignItems: 'center' }}
    >
      <img 
        src={`${basePath}images/logo_horizontal.png`} 
        alt="LashLook Logo" 
        className="lashlook-logo-horizontal-img"
        style={{ height: `${height}px`, width: 'auto', display: 'block', objectFit: 'contain' }}
      />
    </div>
  );
}

// Stacked Pink Brand Logo for Studio / TryOn Launch Card
export function LashLookStackedLogo({ className = '', width = 340 }) {
  const basePath = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;

  return (
    <div 
      className={`lashlook-logo-stacked ${className}`} 
      style={{ width: `${width}px`, maxWidth: '100%', display: 'inline-flex', justifyContent: 'center' }}
    >
      <img 
        src={`${basePath}images/logo_stacked.png`} 
        alt="LashLook Stacked Logo" 
        className="lashlook-logo-stacked-img"
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
      />
    </div>
  );
}

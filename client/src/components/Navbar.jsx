import React from 'react';
import { LashLookHorizontalLogo } from './LashLookLogo';
import { Sun, Moon } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ 
  activeSection, 
  onSelectSection, 
  onOpenQuiz,
  darkMode, 
  onToggleDarkMode 
}) {
  const navItems = [
    { id: 'tryon', label: 'ลองเสมือน' },
    { id: 'quiz', label: 'ค้นหาสไตล์', isAction: true },
    { id: 'significance', label: 'ที่มาและความสำคัญ' },
    { id: 'survey', label: 'ผลสำรวจข้อมูล' },
    { id: 'persona', label: 'Persona' },
    { id: 'vpc', label: 'VPC' },
  ];

  const handleItemClick = (item) => {
    if (item.id === 'quiz') {
      onOpenQuiz();
    } else {
      onSelectSection(item.id);
    }
  };

  return (
    <header className="site-navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div 
          className="navbar-brand-clickable" 
          onClick={() => onSelectSection('hero')}
          title="กลับไปหน้าแรก (Home)"
        >
          <LashLookHorizontalLogo height={32} />
        </div>

        {/* Center Navigation Links */}
        <nav className="navbar-menu-items">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Switch: Theme Switch matching screenshots */}
        <div className="navbar-actions">
          <button 
            className={`theme-toggle-switch ${darkMode ? 'dark' : 'light'}`}
            onClick={onToggleDarkMode}
            title={darkMode ? 'เปลี่ยนเป็นธีมสีชมพู (Pink Mode)' : 'เปลี่ยนเป็นธีมกลางคืน (Dark Mode)'}
            aria-label="Toggle Theme"
          >
            <div className="toggle-track">
              <div className="toggle-knob">
                {darkMode ? <Moon size={13} className="text-dark" /> : <Sun size={13} className="text-dark" />}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

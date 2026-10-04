import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TryOnLaunchCard from './components/TryOnLaunchCard';
import SignificanceSection from './components/SignificanceSection';
import SurveySection from './components/SurveySection';
import PersonaSection from './components/PersonaSection';
import VPCSection from './components/VPCSection';
import SnaplockSection from './components/SnaplockSection';
import WebsiteEcosystemSection from './components/WebsiteEcosystemSection';
import SmartQuizModal from './components/SmartQuizModal';
import CameraScanner from './components/CameraScanner';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedStyleId, setSelectedStyleId] = useState('style1');
  const [darkMode, setDarkMode] = useState(false);

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    if (isStudioOpen) {
      setIsStudioOpen(false);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchCamera = () => {
    setIsStudioOpen(true);
  };

  const handleApplyStyleFromQuiz = (styleId) => {
    setSelectedStyleId(styleId);
    setIsStudioOpen(true);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'pink-mode'}`}>
      {isStudioOpen ? (
        <main className="app-camera-viewport">
          <CameraScanner 
            onClose={() => setIsStudioOpen(false)} 
            initialStyleId={selectedStyleId} 
          />
        </main>
      ) : (
        <div className="landing-page-shell">
          <Navbar 
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            onOpenQuiz={() => setIsQuizOpen(true)}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />

          <main className="landing-page-content">
            <HeroSection 
              onOpenTryOn={() => handleSelectSection('tryon')}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />

            <TryOnLaunchCard 
              onLaunchCamera={handleLaunchCamera}
            />

            <SignificanceSection />

            <SurveySection />

            <PersonaSection />

            <VPCSection />

            <SnaplockSection />

            <WebsiteEcosystemSection 
              onOpenTryOn={() => handleSelectSection('tryon')}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          </main>

          <SmartQuizModal 
            isOpen={isQuizOpen}
            onClose={() => setIsQuizOpen(false)}
            onApplyStyle={handleApplyStyleFromQuiz}
          />
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Camera, ShieldCheck, Zap } from 'lucide-react';
import './LoadingScreen.css';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('กำลังเชื่อมต่อระบบ AI Neural Engine...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          setStatusText('ระบบตรวจจับใบหน้า & ขนตา AR พร้อมแล้ว');
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next < 30) {
          setStatusText('กำลังเริ่มต้น AI Face Tracking & Eye Contours...');
        } else if (next < 65) {
          setStatusText('กำลังคาลิเบรตเลนส์ตรวจจับพิกเซลดวงตา...');
        } else if (next < 90) {
          setStatusText('กำลังโหลดโมเดลขนตาเสมือนจริง 3D (Manga, Wet Look, Volume)...');
        } else {
          setStatusText('กำลังประมวลผลขั้นตอนสุดท้าย...');
        }

        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`preloader-overlay ${progress === 100 && isReady ? 'is-complete' : ''}`}>
      <div className="preloader-content">
        {/* Glowing Eye Logo Container */}
        <div className="preloader-logo-wrapper">
          <div className="glow-ring-turquoise"></div>
          <div className="glow-ring-hotpink"></div>
          <div className="eye-scanner-box">
            <svg 
              className="eye-svg" 
              viewBox="0 0 100 60" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Eyelid curves */}
              <path 
                d="M 5 30 Q 50 -10 95 30" 
                stroke="#EE6B9D" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                className="eyelid-path"
              />
              <path 
                d="M 5 30 Q 50 65 95 30" 
                stroke="#EF8EB3" 
                strokeWidth="2" 
                strokeLinecap="round" 
                opacity="0.6"
              />

              {/* Iris & Pupil */}
              <circle cx="50" cy="30" r="14" stroke="#16D9B6" strokeWidth="2.5" />
              <circle cx="50" cy="30" r="6" fill="#16D9B6" />
              <circle cx="47" cy="27" r="2.5" fill="#FFFFFF" />

              {/* Individual Eyelash Hairs growing with progress */}
              <path d="M 20 20 Q 15 5 10 2" stroke="#EE6B9D" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 32 12 Q 30 -2 24 -6" stroke="#EE6B9D" strokeWidth="2" strokeLinecap="round" />
              <path d="M 50 10 Q 50 -5 50 -9" stroke="#16D9B6" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 68 12 Q 70 -2 76 -6" stroke="#EE6B9D" strokeWidth="2" strokeLinecap="round" />
              <path d="M 80 20 Q 85 5 90 2" stroke="#EE6B9D" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <div className="vertical-scan-laser"></div>
          </div>
        </div>

        {/* Brand Title */}
        <div className="preloader-text-group">
          <div className="brand-pill">
            <Zap size={13} className="text-turquoise" />
            <span>REAL-TIME FACE AR STUDIO</span>
          </div>
          <h1 className="preloader-title">
            Lash<span className="text-hot-pink">Look</span> <span className="text-turquoise">AR</span>
          </h1>
          <p className="preloader-subtitle">
            กล้องสแกนใบหน้าและจำลองใส่ขนตาเสมือนจริงแบบเรียลไทม์
          </p>
        </div>

        {/* Progress Bar */}
        <div className="preloader-progress-section">
          <div className="progress-labels">
            <span className="progress-status">{statusText}</span>
            <span className="progress-percentage">{progress}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Launch Button when ready */}
        <div className="preloader-action-zone">
          {progress >= 100 ? (
            <button 
              className="btn-hot-pink preloader-start-btn animate-fade-in"
              onClick={onLoaded}
            >
              <Camera size={18} />
              <span>เปิดกล้องสแกนหน้าทันที</span>
            </button>
          ) : (
            <div className="preloader-loading-badge">
              <span className="loading-dot"></span>
              <span>กำลังเตรียมความพร้อมของกล้อง...</span>
            </div>
          )}
        </div>

        {/* Security & Device info note */}
        <div className="preloader-security-note">
          <ShieldCheck size={14} className="text-turquoise" />
          <span>ระบบประมวลผลบนเบราว์เซอร์ของอุปกรณ์คุณ 100% ไม่มีการบันทึกภาพขึ้นคลาวด์</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import './HeroSection.css';

export default function HeroSection({ onOpenTryOn, onOpenQuiz }) {
  return (
    <section className="hero-section" id="hero">
      {/* Background Left & Right False Lash Cluster Box Decor matching Image 2 */}
      <div className="hero-side-decor left-decor">
        <img 
          src={`${import.meta.env.BASE_URL}images/lash_boxes_stacked.png`} 
          alt="LashLook Packaging Left" 
          className="hero-lash-box-img left-img" 
        />
      </div>

      <div className="hero-side-decor right-decor">
        <img 
          src={`${import.meta.env.BASE_URL}images/lash_boxes_stacked.png`} 
          alt="LashLook Packaging Right" 
          className="hero-lash-box-img right-img" 
        />
      </div>

      {/* Center Content */}
      <div className="hero-center-content">
        {/* Paradigm Shift Badge */}
        <div className="hero-paradigm-pill">
          <span className="paradigm-dot"></span>
          <span>A Paradigm Shift In Eyelash Design</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-main-title">
          <span className="title-eyelash">The Eyelash,</span>
          <span className="title-reimagined">Reimagined.</span>
        </h1>

        {/* Subtitle / Description in Thai */}
        <p className="hero-description">
          ลืมกาวหลอดที่เลอะเทอะ การรอคอย 15 นาที และอาการแพ้เคมีแสบตา<br />
          สัมผัสนวัตกรรมช่อขนตาแถบกาวในตัวแบบ Pre-Glued PSA Cluster ติดสมบูรณ์แบบใน 3 วินาที
        </p>

        {/* Action Buttons */}
        <div className="hero-action-buttons">
          <button 
            className="hero-btn-vr"
            onClick={onOpenTryOn}
            id="hero-tryon-btn"
          >
            ทดลองขนตาด้วย VR ตอนนี้
          </button>

          <button 
            className="hero-btn-quiz"
            onClick={onOpenQuiz}
            id="hero-quiz-btn"
          >
            เริ่ม SMART QUIZ ( 30 วิ ) →
          </button>
        </div>
      </div>

      {/* Bottom Highlights & Stats Bar (4 columns) */}
      <div className="hero-stats-bar">
        <div className="stats-container">
          <div className="stat-col">
            <div className="stat-value text-turquoise">3 วินาที</div>
            <div className="stat-label">เวลาในการติดตั้งต่อช่อ</div>
          </div>

          <div className="stat-col">
            <div className="stat-value text-turquoise">0.05 mm</div>
            <div className="stat-label">ความบางไฟเบอร์ระดับนาโน</div>
          </div>

          <div className="stat-col">
            <div className="stat-value text-turquoise">99.98%</div>
            <div className="stat-label">ปราศจากกาวเหลว & LATEX</div>
          </div>

          <div className="stat-col">
            <div className="stat-value text-turquoise">5 ครั้ง+</div>
            <div className="stat-label">นำกลับมาใช้ซ้ำได้</div>
          </div>
        </div>
      </div>
    </section>
  );
}

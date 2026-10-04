import React from 'react';
import { Camera } from 'lucide-react';
import { LashLookStackedLogo } from './LashLookLogo';
import './TryOnLaunchCard.css';

export default function TryOnLaunchCard({ onLaunchCamera }) {
  return (
    <section className="tryon-page-wrapper" id="tryon">
      <div className="tryon-studio-card animate-fade-in">
        {/* Card Header */}
        <div className="studio-card-header">
          <h2 className="studio-card-title">Virtual Lash Try-On Studio</h2>
          <p className="studio-card-subtitle">
            จำลองการทาบช่อขนตากับดวงตาของคุณแบบ Real-Time พร้อมสลับสไตล์และระดับความงอนได้ทันที
          </p>
        </div>

        <div className="studio-card-divider"></div>

        {/* Center Graphic: LashLook Cat Logo */}
        <div className="studio-card-body">
          <div className="studio-logo-container">
            <LashLookStackedLogo width={340} />
          </div>

          {/* Progress Bar (Ready at 100%) */}
          <div className="studio-progress-zone">
            <div className="progress-status-row">
              <span className="status-label">ระบบตรวจจับใบหน้า&ขนตา AR พร้อมแล้ว</span>
              <span className="status-percent text-turquoise">100%</span>
            </div>

            <div className="studio-progress-track">
              <div className="studio-progress-bar"></div>
            </div>
          </div>

          {/* Launch Camera Button */}
          <button 
            className="btn-launch-camera" 
            onClick={onLaunchCamera}
            id="launch-camera-btn"
          >
            <Camera size={22} className="camera-icon" />
            <span>เปิดกล้องสแกนหน้าทันที</span>
          </button>
        </div>
      </div>
    </section>
  );
}

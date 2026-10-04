import React from 'react';
import { LashLookHorizontalLogo } from './LashLookLogo';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import './WebsiteEcosystemSection.css';

export default function WebsiteEcosystemSection({ onOpenTryOn, onOpenQuiz }) {
  const basePath = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;

  return (
    <section className="eco-full-section" id="website">
      <div className="eco-container animate-fade-in">

        {/* Top Distressed Brush Banner matching Image 2 */}
        <div className="eco-brush-header">
          <div className="eco-brush-banner">
            <svg className="brush-svg-bg" viewBox="0 0 700 110" preserveAspectRatio="none">
              <path 
                d="M15,25 Q35,8 80,12 T200,8 Q350,5 500,10 T680,22 Q695,45 685,75 T660,95 Q520,102 360,98 T120,105 Q30,100 12,78 Q5,48 15,25 Z" 
                fill="#0B0B0B" 
              />
              <path d="M5,42 Q20,38 35,46 Q18,52 5,42 Z" fill="#0B0B0B" opacity="0.9" />
              <path d="M668,30 Q690,38 678,55 Q662,48 668,30 Z" fill="#0B0B0B" opacity="0.85" />
              <path d="M60,10 Q140,4 280,7 Q190,14 60,10 Z" fill="#0B0B0B" opacity="0.9" />
              <path d="M450,96 Q580,104 645,95 Q560,92 450,96 Z" fill="#0B0B0B" opacity="0.95" />
            </svg>
            <h2 className="eco-brush-title">WWW.LOOKLASH.COM</h2>
          </div>
        </div>

        {/* Main Content White Card */}
        <div className="eco-card">
          
          {/* Subtitle matching top-left of Image 2 */}
          <div className="eco-card-top-header">
            <span className="eco-badge-subtitle">เว็บไซต์ LASHLOOK</span>
          </div>

          <div className="eco-grid">
            
            {/* LEFT COLUMN: Features 1, 2, 3, 4 */}
            <div className="eco-col eco-left-col">
              
              <div className="eco-feature-item">
                <h3 className="eco-feature-title">
                  1. Virtual Lash Try-On ทดลองขนตาเสมือนจริง
                </h3>
                <p className="eco-feature-desc">
                  เป็นฟังก์ชันที่ให้ผู้ใช้งานเปิดกล้องและทดลองขนตาแบบช่อของ LASHLOOK บนดวงตาแบบ Real-Time สามารถเปลี่ยนรูปแบบ ความยาว ความงอน และความหนาของขนตาได้ทันที ช่วยให้ผู้ใช้งานเห็นภาพก่อนเลือกซื้อว่าขนตาทรงไหนเหมาะกับรูปตาของตนเอง
                </p>
              </div>

              <div className="eco-feature-item">
                <h3 className="eco-feature-title">
                  2. AI Lash Match แนะนำขนตาที่เหมาะกับรูปตา
                </h3>
                <p className="eco-feature-desc">
                  เป็นระบบที่ช่วยวิเคราะห์ลักษณะรูปตาของผู้ใช้งาน และแนะนำทรงขนตาที่เหมาะสม เช่น Natural, Doll, Cat Eye หรือ Wispy พร้อมแนะนำตำแหน่งและความยาวของแต่ละช่อ เพื่อให้ผู้ใช้สามารถติดขนตาได้ง่ายและได้ลุคที่เหมาะกับตัวเอง
                </p>
              </div>

              <div className="eco-feature-item">
                <h3 className="eco-feature-title">
                  3. Lash Designer ออกแบบขนตาด้วยตัวเอง
                </h3>
                <p className="eco-feature-desc">
                  เป็นฟังก์ชันที่ให้ผู้ใช้งานออกแบบการเรียงช่อขนตาของตัวเอง โดยสามารถเลือกความยาวของแต่ละช่อและกำหนดตำแหน่งตั้งแต่หัวตาไปจนถึงหางตา ระบบจะแสดงตัวอย่างลุคที่ออกแบบแบบเสมือนจริงก่อนนำไปติดจริง
                </p>
              </div>

              <div className="eco-feature-item">
                <h3 className="eco-feature-title">
                  4. Smart Tutorial คู่มือการติดขนตาแบบเฉพาะบุคคล
                </h3>
                <p className="eco-feature-desc">
                  เว็บไซต์จะแนะนำขั้นตอนการติด <strong>LASLOOK SNAPLOCK™</strong> แบบทีละขั้นตอน โดยระบบสามารถแนะนำตำแหน่งการติด จำนวนช่อ และลำดับความยาวที่เหมาะกับลุคที่ผู้ใช้เลือก ช่วยลดปัญหาติดขนตาเอียง เบี้ยว หรือเรียง ช่อไม่สวย
                </p>
              </div>

            </div>

            {/* CENTER COLUMN: Website Interactive Mockup Frame */}
            <div className="eco-col eco-center-col">
              <div className="eco-mockup-frame">
                
                {/* Mockup Top Header */}
                <div className="eco-mockup-topbar">
                  <div className="eco-mockup-logo">
                    <LashLookHorizontalLogo height={16} />
                  </div>
                  <div className="eco-mockup-navlinks">
                    <span>หน้าแรก</span>
                    <span>สินค้า</span>
                    <span>วิธีใช้</span>
                    <span>คำแนะนำ</span>
                    <span>เช็คแต้ม</span>
                  </div>
                  <div className="eco-mockup-top-actions">
                    <div className="eco-mockup-search">
                      <Search size={10} />
                      <span className="search-placeholder">ค้นหา...</span>
                    </div>
                    <div className="eco-mockup-cart">
                      <ShoppingBag size={12} />
                      <span className="cart-badge">1</span>
                    </div>
                  </div>
                </div>

                {/* Mockup Hero Stage */}
                <div className="eco-mockup-hero">
                  
                  {/* Left Floating Box */}
                  <img 
                    src={`${basePath}images/lash_box_side.jpg`} 
                    alt="Packaging Left" 
                    className="mockup-side-box mockup-left-box"
                  />

                  {/* Center Hero Text */}
                  <div className="mockup-hero-body">
                    <div className="mockup-pill-badge">
                      <span className="mockup-pill-dot"></span>
                      <span>A Paradigm Shift In Eyelash Design</span>
                    </div>

                    <h4 className="mockup-hero-heading">
                      The Eyelash, <br />
                      <span className="mockup-cursive">Reimagined.</span>
                    </h4>

                    <p className="mockup-hero-sub">
                      ลืมกาวหยอดที่เลอะเทอะ การรอคอย 15 นาที และอาการแพ้เคมีแสบตา สัมผัสนวัตกรรมช่อขนตาแถบกาวในตัวแบบ Pre-Glued PSA Cluster ติดสมบูรณ์แบบใน 3 วินาที
                    </p>

                    <div className="mockup-hero-cta-row">
                      <button 
                        className="mockup-cta-green"
                        onClick={onOpenTryOn}
                        title="ลองเปิดกล้อง AR"
                      >
                        ทดลองขนตาด้วย VR ตอนนี้
                      </button>
                      <button 
                        className="mockup-cta-pink"
                        onClick={onOpenQuiz}
                        title="ทำควิซแนะนำทรงขนตา"
                      >
                        เริ่ม SMART QUIZ (30 วิ) <ArrowRight size={10} style={{ marginLeft: 3 }} />
                      </button>
                    </div>
                  </div>

                  {/* Right Floating Box */}
                  <img 
                    src={`${basePath}images/lash_box_side.jpg`} 
                    alt="Packaging Right" 
                    className="mockup-side-box mockup-right-box"
                  />
                </div>

                {/* Mockup Bottom Stats Bar */}
                <div className="eco-mockup-stats">
                  <div className="mockup-stat-cell">
                    <strong>3 วินาที</strong>
                    <span>เวลาในการติดตั้งต่อช่อ</span>
                  </div>
                  <div className="mockup-stat-cell">
                    <strong>0.05 mm</strong>
                    <span>ความบางโฟกัสระดับนาโน</span>
                  </div>
                  <div className="mockup-stat-cell">
                    <strong>99.99%</strong>
                    <span>ปราศจากกาวเหลว & LATEX</span>
                  </div>
                  <div className="mockup-stat-cell">
                    <strong>5 ครั้ง</strong>
                    <span>นำกลับมาใช้ซ้ำได้</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Features 5, 6, 7, 8 */}
            <div className="eco-col eco-right-col">
              
              <div className="eco-feature-item">
                <h3 className="eco-feature-title">
                  5. QR Code Product Connect เชื่อมต่อจากกล่องสู่เว็บไซต์
                </h3>
                <p className="eco-feature-desc">
                  ผู้ใช้งานสามารถสแกน QR Code ด้านหลังกล่อง เพื่อเข้าสู่เว็บไซต์ LASHLOOK ได้ทันที โดยสามารถเลือก Product ที่ซื้อและเข้าสู่ฟังก์ชัน Virtual Lash Try-On, AI Lash Match และคู่มือการใช้งานได้ ทำให้บรรจุภัณฑ์ไม่ได้เป็นเพียงกล่องสินค้า แต่เป็นจุดเริ่มต้นของ Digital Experience
                </p>
              </div>

              <div className="eco-feature-item">
                <h3 className="eco-feature-title">
                  6. Lash Look Library รวมไอเดียการแต่งตา
                </h3>
                <p className="eco-feature-desc">
                  เป็นพื้นที่รวมลุคขนตาที่สามารถนำไปใช้เป็น Reference ได้ เช่น Everyday Look, Korean Look, Sweet Look, Cat Eye และ Glam Look พร้อมแสดงวิธีเรียงช่อและจำนวนช่อที่ใช้ เพื่อให้ผู้ใช้งานสามารถเลือกและทำตามได้ง่าย
                </p>
              </div>

              <div className="eco-feature-item">
                <h3 className="eco-feature-title">
                  7. ระบบสะสมคะแนนและสิทธิพิเศษ
                </h3>
                <p className="eco-feature-desc">
                  ผู้ใช้งานสามารถสะสมคะแนนจากการซื้อสินค้า การสแกน QR Code หรือการทำกิจกรรมบนเว็บไซต์ เพื่อนำคะแนนมาแลกเป็นส่วนลด โปรโมชั่น หรือสิทธิพิเศษจาก LASHLOOK ช่วยสร้างการกลับมาใช้งานซ้ำและสร้างความสัมพันธ์ระหว่างแบรนด์กับลูกค้า
                </p>
              </div>

              <div className="eco-feature-item">
                <h3 className="eco-feature-title">
                  8. รีวิวและแชร์ Lash Look
                </h3>
                <p className="eco-feature-desc">
                  ผู้ใช้งานสามารถแชร์ลุคที่ตัวเองออกแบบหรือทดลองผ่าน Virtual Lash Try-On พร้อมรีวิวผลิตภัณฑ์และให้คะแนนความพึงพอใจ เพื่อสร้าง Community ของผู้ใช้ LASHLOOK และช่วยให้ลูกค้าคนอื่นใช้เป็นแนวทางในการเลือกทรงขนตา
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

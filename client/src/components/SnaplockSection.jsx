import React from 'react';
import './SnaplockSection.css';

export default function SnaplockSection() {
  const basePath = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;

  return (
    <section className="snaplock-full-section" id="snaplock">
      <div className="snaplock-container animate-fade-in">
        
        {/* Top Distressed Brush Banner matching Image 1 */}
        <div className="snaplock-brush-header">
          <div className="snaplock-brush-banner">
            <svg className="brush-svg-bg" viewBox="0 0 700 110" preserveAspectRatio="none">
              <path 
                d="M15,25 Q35,8 80,12 T200,8 Q350,5 500,10 T680,22 Q695,45 685,75 T660,95 Q520,102 360,98 T120,105 Q30,100 12,78 Q5,48 15,25 Z" 
                fill="#0B0B0B" 
              />
              {/* Extra brush splatter & texture strokes */}
              <path d="M5,42 Q20,38 35,46 Q18,52 5,42 Z" fill="#0B0B0B" opacity="0.9" />
              <path d="M668,30 Q690,38 678,55 Q662,48 668,30 Z" fill="#0B0B0B" opacity="0.85" />
              <path d="M60,10 Q140,4 280,7 Q190,14 60,10 Z" fill="#0B0B0B" opacity="0.9" />
              <path d="M450,96 Q580,104 645,95 Q560,92 450,96 Z" fill="#0B0B0B" opacity="0.95" />
            </svg>
            <h2 className="snaplock-brush-title">LASHLOCK SNAPLOCK</h2>
          </div>
        </div>

        {/* Main Content White Card */}
        <div className="snaplock-card">
          <div className="snaplock-grid">
            
            {/* LEFT COLUMN: Features 1, 2, 3 */}
            <div className="snaplock-col snaplock-left-col">
              
              <div className="snaplock-feature-item">
                <h3 className="snaplock-feature-title">
                  1. ขนตาแบบช่อมีกาวในตัว Pre-Glued PSA
                </h3>
                <p className="snaplock-feature-desc">
                  เป็นขนตาปลอมแบบช่อที่มี <strong>แถบกาวในตัว (Pre-Glued PSA)</strong> บริเวณฐานของแต่ละช่อ ช่วยให้ผู้ใช้งานสามารถหยิบช่อขนตาและติดลงบนแนวขนตาจริงได้ทันที โดยไม่ต้องใช้กาวแบบหลอด ลดปัญหากาวเลอะมือ กาวเหนียว และขั้นตอนการติดที่ยุ่งยาก
                </p>
              </div>

              <div className="snaplock-feature-item">
                <h3 className="snaplock-feature-title">
                  2. ฐานช่อขนตาแบบ Ultra-Flexible
                </h3>
                <p className="snaplock-feature-desc">
                  ออกแบบฐานของแต่ละช่อให้มีขนาดเล็ก บาง และยืดหยุ่น สามารถโค้งรับกับแนวขนตาและรูปทรงเปลือกตาได้ดี ช่วยให้ขนตาแนบสนิทกับขนตาจริงและลดปัญหาฐานขนตาเด้งหรือเห็นรอยต่อหลังติด
                </p>
              </div>

              <div className="snaplock-feature-item">
                <h3 className="snaplock-feature-title">
                  3. ระบบช่อขนตาแบบ Modular Mix & Match
                </h3>
                <p className="snaplock-feature-desc">
                  ภายในกล่องประกอบด้วยช่อขนตาหลายรูปแบบ หรือหลายความยาว เพื่อให้ผู้ใช้สามารถเลือกจัดวางและผสมช่อแต่ละแบบได้ตามต้องการ เช่น ช่อสั้นบริเวณหัวตา ช่อกลางบริเวณกลางตา และช่อยาวบริเวณหางตา ทำให้สามารถออกแบบลุคและระดับความหนาของขนตาได้ด้วยตัวเอง
                </p>
              </div>

            </div>

            {/* CENTER COLUMN: Stacked Pink Acrylic Lash Boxes */}
            <div className="snaplock-col snaplock-center-col">
              <div className="snaplock-visual-wrapper">
                <div className="snaplock-box-pedestal"></div>
                <img 
                  src={`${basePath}images/snaplock_boxes.jpg`} 
                  alt="LashLook Snaplock 3 Stacked Acrylic Lash Boxes" 
                  className="snaplock-stacked-boxes-img"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Features 4, 5, 6, 7 */}
            <div className="snaplock-col snaplock-right-col">
              
              <div className="snaplock-feature-item">
                <h3 className="snaplock-feature-title">
                  4. เส้นใยน้ำหนักเบา ลดความรู้สึกหนักตา
                </h3>
                <p className="snaplock-feature-desc">
                  เลือกใช้เส้นใยขนตาที่มีน้ำหนักเบาและออกแบบช่อให้มีปริมาณเส้นใยเหมาะสม เพื่อให้ขนตาดูฟูและเป็นธรรมชาติ โดยไม่เพิ่มน้ำหนักบนเปลือกตามากเกินไป ช่วยลดปัญหาความรู้สึกหนักตาหรือรำคาญขณะสวมใส่
                </p>
              </div>

              <div className="snaplock-feature-item">
                <h3 className="snaplock-feature-title">
                  5. กาวในตัวแบบติดเร็วและจัดตำแหน่งได้ง่าย
                </h3>
                <p className="snaplock-feature-desc">
                  ออกแบบชั้นกาวให้สามารถยึดติดได้อย่างรวดเร็วหลังวางลงบนแนวขนตา พร้อมออกแบบฐานให้หยิบและจัดตำแหน่งได้ง่าย ช่วยลดปัญหาขนตาเอียงหรือเบี้ยวจากการติด และลดเวลาในการแต่งหน้าเมื่อเทียบกับการใช้กาวชนตาแบบเดิม
                </p>
              </div>

              <div className="snaplock-feature-item">
                <h3 className="snaplock-feature-title">
                  6. กล่องจัดเก็บช่อขนตาแบบแยกตำแหน่ง
                </h3>
                <p className="snaplock-feature-desc">
                  ออกแบบภายในกล่องให้มีพื้นที่จัดวางช่อขนตาแต่ละแบบอย่างเป็นระเบียบ ทำให้ผู้ใช้สามารถเลือกหยิบความยาวหรือรูปแบบที่ต้องการได้ง่าย และช่วยป้องกันช่อขนตาเสียรูปหรือพันกันก่อนใช้งาน
                </p>
              </div>

              <div className="snaplock-feature-item">
                <h3 className="snaplock-feature-title">
                  7. QR Code เชื่อมต่อประสบการณ์การใช้งานบนเว็บไซต์
                </h3>
                <p className="snaplock-feature-desc">
                  บริเวณด้านหลังกล่องมี QR Code สำหรับสแกนเข้าสู่เว็บไซต์ของแบรนด์ เพื่อเข้าถึงบริการและฟังก์ชันเสริมของผลิตภัณฑ์ เช่น การทดลองขนตาแบบเสมือนจริง (Virtual Lash Try-On) การแนะนำทรงขนตาที่เหมาะกับผู้ใช้ และวิธีการติดขนตาอย่างถูกต้อง โดย QR Code ทำหน้าที่เป็น จุดเชื่อมระหว่าง Product กับ Digital Service ไม่ได้เป็นส่วนหนึ่งของตัวขนตาโดยตรง
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

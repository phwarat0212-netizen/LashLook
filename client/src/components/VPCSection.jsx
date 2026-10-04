import React from 'react';
import './VPCSection.css';

// Hand-drawn Eye Sketch SVG Component matching Image 5
export function EyeSketchGraphic({ className = '', style = {} }) {
  return (
    <svg 
      viewBox="0 0 160 80" 
      width="130" 
      height="65" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`eye-sketch-svg ${className}`}
      style={style}
    >
      {/* Eyelid curves */}
      <path 
        d="M 10 45 Q 80 5 150 45" 
        stroke="#0B0B0B" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M 15 45 Q 80 80 145 45" 
        stroke="#0B0B0B" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      {/* Crease */}
      <path 
        d="M 30 22 Q 80 12 130 26" 
        stroke="#0B0B0B" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.7" 
      />
      {/* Iris */}
      <circle cx="80" cy="45" r="22" stroke="#0B0B0B" strokeWidth="2" />
      <circle cx="80" cy="45" r="10" fill="#0B0B0B" />
      <circle cx="75" cy="40" r="3.5" fill="#FFFFFF" />
      {/* Shading */}
      <path d="M 68 32 Q 80 30 92 32" stroke="#0B0B0B" strokeWidth="1" opacity="0.5" />
      {/* Dramatic Eyelashes */}
      <path d="M 25 38 Q 15 20 5 12" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 45 28 Q 40 10 32 2" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 65 20 Q 65 5 62 -2" stroke="#0B0B0B" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 85 18 Q 90 2 92 -4" stroke="#0B0B0B" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 105 22 Q 115 8 122 2" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 125 30 Q 140 18 152 14" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 140 40 Q 155 35 162 32" stroke="#0B0B0B" strokeWidth="2" strokeLinecap="round" />
      {/* Lower Lashes */}
      <path d="M 40 55 Q 35 68 32 74" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 65 62 Q 65 72 64 78" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 90 62 Q 92 72 95 78" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 115 58 Q 122 68 128 72" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function VPCSection({ onNavigateToPersona }) {
  return (
    <section className="vpc-canvas-section" id="vpc">
      <div className="vpc-canvas-container animate-fade-in">
        {/* Distressed Black Brush Title Banner matching Image 5 */}
        <div className="vpc-brush-banner-wrap">
          <div className="vpc-brush-banner">
            <h2 className="vpc-brush-banner-text">VALUE PROPOSITION CANVAS</h2>
          </div>
        </div>

        {/* Main Canvas Grid: Left Square vs Center FIT vs Right Circle */}
        <div className="vpc-diagram-layout">
          {/* LEFT SIDE: Value Proposition (The Square) */}
          <div className="vpc-square-column">
            {/* Box 1: PRODUCTS & SERVICES */}
            <div className="vpc-box box-products">
              <h3 className="vpc-box-title">PRODUCTS & SERVICES</h3>
              <ul className="vpc-box-bullets">
                <li>
                  • ขนตาปลอมแบบมีกาวในตัว (Pre-glued false eyelashes) ที่ออกแบบมาให้ใช้งานง่าย น้ำหนักเบา
                </li>
                <li>
                  • เว็บไซต์ Virtual Lash Try-On Studio: ฟีเจอร์เปิดกล้องจำลองทาบช่อขนตากับดวงตาแบบ Real-Time ให้ลองสลับทรงขนตาได้ทันทีก่อนตัดสินใจซื้อ
                </li>
              </ul>
            </div>

            {/* Box 2: PAIN RELIEVERS */}
            <div className="vpc-box box-relievers">
              <h3 className="vpc-box-title">PAIN RELIEVERS</h3>
              <ul className="vpc-box-bullets">
                <li>• พัฒนาสูตรกาวที่ไม่เหนียวติดมือ วางตำแหน่งได้แม่นยำ</li>
                <li>• และสามารถขยับปรับตำแหน่งได้หากติดผิดพลาด</li>
                <li>• ออกแบบแถบขนตาให้นุ่ม เบา สบายตา ไม่ระคายเคือง และติดทนกันน้ำกันเหงื่อ ไม่หลุดกลางทาง</li>
              </ul>
            </div>

            {/* Box 3: GAIN CREATORS */}
            <div className="vpc-box box-creators">
              <h3 className="vpc-box-title">GAIN CREATORS</h3>
              <ul className="vpc-box-bullets">
                <li>• ดีไซน์ทรงขนตาหลากหลายสไตล์ที่เข้ากับรูปตาคนไทย (เน้นความเป็นธรรมชาติ หรือสไตล์เกาหลี)</li>
                <li>• ระบบทดลองขนตาเสมือนจริง: ช่วยให้ค้นพบรูปทรงและความงอนที่ตอบโจทย์เข้ากับโครงหน้าตัวเองได้แม่นยำ หมดปัญหาซื้อมาแล้วไม่เข้ากับตา</li>
                <li>• ราคาเข้าถึงง่าย (50–99 บาท) คุ้มค่ากับการใช้งานในชีวิตประจำวัน</li>
                <li>• มีคลิปรีวิวและคอนเทนต์สอนวิธีติดง่ายๆ จากอินฟลูเอนเซอร์และผู้ใช้จริง ช่วยเพิ่มความมั่นใจในการตัดสินใจซื้อผ่าน TikTok Shop และ Shopee/Lazada</li>
              </ul>
            </div>
          </div>

          {/* CENTER: FIT Badge */}
          <div className="vpc-fit-center-badge">
            <div className="fit-circle">
              <span className="fit-text">FIT</span>
            </div>
          </div>

          {/* RIGHT SIDE: Customer Profile (The Circle) */}
          <div className="vpc-circle-column">
            <div className="vpc-circle-card">
              {/* Top Segment: PAINS */}
              <div className="circle-segment segment-pains">
                <div className="segment-content">
                  <h3 className="circle-segment-title">PAINS</h3>
                  <ul className="circle-bullets">
                    <li>• แต่งหน้าให้สวยงาม ดูดี เป็นธรรมชาติในเวลาที่จำกัด</li>
                    <li>• ติดขนตาปลอมให้รวดเร็วโดยไม่ต้องพึ่งช่างแต่งหน้าหรือใช้อุปกรณ์เสริมเยอะ</li>
                  </ul>
                </div>
              </div>

              {/* Middle Segment: CUSTOMER JOBS (With Eye Sketch) */}
              <div className="circle-segment segment-jobs">
                <div className="segment-content">
                  <h3 className="circle-segment-title">CUSTOMER JOBS</h3>
                  <ul className="circle-bullets">
                    <li>• ติดแล้วระคายเคืองตา หนักเปลือกตา ขนตาหลุดหรือเบี้ยวระหว่างวัน</li>
                    <li>• กาวเลอะนิ้วเหนียวเหนอะหนะระหว่างติด</li>
                    <li>• เสียเวลาในการติด หรือต้องคอยแก้ความผิดพลาดระหว่างติด</li>
                  </ul>
                </div>

                <div className="segment-eye-decor eye-right">
                  <EyeSketchGraphic />
                </div>
              </div>

              {/* Bottom Segment: GAINS (With Eye Sketch) */}
              <div className="circle-segment segment-gains">
                <div className="segment-eye-decor eye-left">
                  <EyeSketchGraphic style={{ transform: 'scaleX(-1)' }} />
                </div>

                <div className="segment-content">
                  <h3 className="circle-segment-title">GAINS</h3>
                  <ul className="circle-bullets">
                    <li>• ดวงตากลมโต สวยเป็นธรรมชาติแบบไม่ต้องพยายาม</li>
                    <li>• ประหยัดเวลาแต่งหน้า แต่งเองได้ง่ายในไม่กี่นาที</li>
                    <li>• สวมใส่สบายตลอดทั้งวันโดยไม่รู้สึกเคือง</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

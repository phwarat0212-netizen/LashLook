import React from 'react';
import './PersonaSection.css';

export function BlackCatPeeking({ style = {} }) {
  return (
    <svg 
      viewBox="0 0 100 80" 
      width="80" 
      height="64" 
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* Head & Ears */}
      <polygon points="15,40 5,5 35,28" fill="#0B0B0B" />
      <polygon points="65,28 95,5 85,40" fill="#0B0B0B" />
      <path d="M 12 35 Q 50 18 88 35 Q 96 65 50 75 Q 4 65 12 35 Z" fill="#0B0B0B" />
      
      {/* Big Round White Eyes */}
      <circle cx="36" cy="48" r="10" fill="#FFFFFF" />
      <circle cx="64" cy="48" r="10" fill="#FFFFFF" />
      
      {/* Slit / Round Pupils */}
      <ellipse cx="36" cy="48" rx="4" ry="8" fill="#0B0B0B" />
      <ellipse cx="64" cy="48" rx="4" ry="8" fill="#0B0B0B" />
      
      {/* Eye highlights */}
      <circle cx="34" cy="44" r="2.5" fill="#FFFFFF" />
      <circle cx="62" cy="44" r="2.5" fill="#FFFFFF" />
      
      {/* Cute Little Nose & Whiskers */}
      <polygon points="47,60 53,60 50,63" fill="#EE6B9D" />
      <path d="M 22 56 L 6 54 M 22 61 L 8 63" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
      <path d="M 78 56 L 94 54 M 78 61 L 92 63" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export default function PersonaSection() {
  const basePath = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;

  return (
    <section className="persona-full-section" id="persona">
      <div className="persona-container animate-fade-in">
        <div className="persona-layout-card">
          {/* LEFT SIDE: Fashion Girls Imagery + Brush Banner matching Image 4 */}
          <div className="persona-visual-column">
            <div className="persona-photo-wrapper">
              <img 
                src={`${basePath}images/persona_meangirls.png`} 
                alt="Target Persona Mean Girls" 
                className="persona-main-img" 
              />
              
              {/* Cat Silhouette sitting on the right edge */}
              <div className="persona-cat-decor-top">
                <img 
                  src={`${basePath}images/persona_cat.png`} 
                  alt="Cute Black Cat Sitting" 
                  className="persona-cat-img-top" 
                />
              </div>

              {/* Distressed Black Brush Title Overlay matching Image 4 */}
              <div className="persona-brush-title-box">
                <span className="persona-brush-text">PERSONA</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: White Information Modules matching Image 4 */}
          <div className="persona-info-column">
            {/* 1. ข้อมูลพื้นฐานลูกค้า (Demographics) */}
            <div className="persona-info-block">
              <h4 className="persona-block-heading">ข้อมูลพื้นฐานลูกค้า (Demographics)</h4>
              <ul className="persona-bullet-list">
                <li>
                  <span className="bullet-label">• เพศ :</span> 
                  <span>ส่วนใหญ่เป็นผู้หญิง และ LGBTQ+</span>
                </li>
                <li>
                  <span className="bullet-label">• อายุ :</span> 
                  <span>ช่วงวัยรุ่นตอนปลายถึงวัยทำงานตอนต้น อายุ 21–30 ปี เป็นหลัก</span>
                </li>
                <li>
                  <span className="bullet-label">• อาชีพ :</span> 
                  <span>พนักงานบริษัท/เอกชน และกลุ่มนักเรียน/นักศึกษา</span>
                </li>
                <li>
                  <span className="bullet-label">• รายได้เฉลี่ยต่อเดือน :</span> 
                  <span>ส่วนใหญ่อยู่ในช่วง ต่ำกว่า 10,000 ถึง 20,000 บาท</span>
                </li>
              </ul>
            </div>

            {/* 2. พฤติกรรมการใช้ชีวิต (Lifestyle) */}
            <div className="persona-info-block">
              <h4 className="persona-block-heading">พฤติกรรมการใช้ชีวิต (Lifestyle)</h4>
              <ul className="persona-bullet-list">
                <li>
                  <span>• ชื่นชอบความรวดเร็วในการแต่งหน้า มักแต่งหน้าทั้งในชีวิตประจำวัน ไปเรียน/ไปทำงาน หรือไปเที่ยว/ถ่ายรูป</span>
                </li>
                <li>
                  <span>• ต้องการความสะดวกสบาย ไม่ชอบขั้นตอนที่ยุ่งยาก แต่งหน้าเองได้รวดเร็ว (ใช้เวลาติดขนตาไม่เกิน 5–10 นาที )</span>
                </li>
              </ul>
            </div>

            {/* 3. ช่องทางที่ลูกค้าใช้ (Channels) */}
            <div className="persona-info-block">
              <h4 className="persona-block-heading">ช่องทางที่ลูกค้าใช้ (Channels)</h4>
              <ul className="persona-bullet-list">
                <li>
                  <span className="bullet-label">• ช่องทางซื้อสินค้า (Where to buy) :</span> 
                  <span>นิยมซื้อผ่าน TikTok Shop และ Shopee / Lazada มากที่สุด</span>
                </li>
                <li>
                  <span className="bullet-label">• ช่องทางรับรู้ข้อมูล / อิทธิพล (Touchpoints) :</span> 
                  <span>เพื่อน/คนรอบข้าง , รีวิวคลิปสไตล์ Before-After จากผู้ใช้งานจริง , บิวตี้บล็อกเกอร์/อินฟลูเอนเซอร์ และการเห็นการวางจำหน่าย/โฆษณาตามแพลตฟอร์มอย่าง TikTok และ Instagram</span>
                </li>
              </ul>
            </div>

            {/* 4. พฤติกรรมการซื้อ (Buying Behavior) */}
            <div className="persona-info-block">
              <h4 className="persona-block-heading">พฤติกรรมการซื้อ (Buying Behavior)</h4>
              <ul className="persona-bullet-list">
                <li>
                  <span className="bullet-label">• ความถี่ในการใช้งาน :</span> 
                  <span>นิยมใช้เป็นประจำทุกวัน หรือ 4–6 ครั้งต่อสัปดาห์</span>
                </li>
                <li>
                  <span className="bullet-label">• ความเต็มใจจ่าย (Price Willingness) :</span> 
                  <span>ส่วนใหญ่ยินดีจ่ายในราคาย่อมเยา ระหว่าง 50–99 บาท</span>
                </li>
                <li>
                  <span className="bullet-label">• พฤติกรรมหลังการใช้ :</span> 
                  <span>นิยมใช้แบบ Single-use หรือแกะทิ้งทันทีหลังใช้งานหรือเก็บไว้แปะซ้ำหากกาวยังไม่เหนียว</span>
                </li>
              </ul>
            </div>

            {/* 5. ความต้องการและปัญหา (Needs & Pain Points) Split 2 Columns */}
            <div className="persona-info-block needs-pains-block">
              <h4 className="persona-block-heading">ความต้องการและปัญหา (Needs & Pain Points)</h4>
              
              <div className="needs-pains-split-grid">
                {/* Needs */}
                <div className="needs-subcol">
                  <h5 className="subcol-title">ความต้องการ (Needs)</h5>
                  <ul className="subcol-list">
                    <li>• ขนตาน้ำหนักเบา สบายตา ไม่ระคายเคือง</li>
                    <li>• ติดแน่นและไม่หลุดง่ายระหว่างวัน กันน้ำ กันเหงื่อ</li>
                    <li>• ความเป็นธรรมชาติ เนียนไปกับตา และใช้งานง่าย หยิบปุ๊บติดปั๊บ ไม่ต้องเล็งนาน</li>
                  </ul>
                </div>

                {/* Pain Points */}
                <div className="pains-subcol">
                  <h5 className="subcol-title">ปัญหา (Pain Points)</h5>
                  <ul className="subcol-list">
                    <li>• ขนตาเอียง/เบี้ยว ไม่ตรงตำแหน่ง</li>
                    <li>• กาวติดนิ้วมือหรือเหนอะหนะ</li>
                    <li>• รู้สึกเคืองหรือระคายเคือง / หนักเปลือกตา</li>
                    <li>• ขนตาเคลื่อนจากตำแหน่งเดิมหรือหลุดง่ายระหว่างวัน</li>
                  </ul>
                </div>
              </div>

              {/* Peeking Cat on the bottom right */}
              <div className="persona-cat-decor-bottom">
                <BlackCatPeeking style={{ transform: 'scale(1.2)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

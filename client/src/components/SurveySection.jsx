import React, { useState } from 'react';
import './SurveySection.css';

// Reusable Survey Carousel Block matching Images 1, 2, 3
function SurveyCarouselBlock({ title, cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < cards.length - 3 ? prev + 1 : 0));
  };

  return (
    <div className="survey-part-block">
      <h3 className="part-heading">{title}</h3>
      
      <div className="carousel-wrapper">
        {/* Left Arrow matching user screenshots */}
        <button 
          className="carousel-arrow-btn left" 
          onClick={handlePrev}
          aria-label="Previous Slides"
        >
          <span className="arrow-triangle-left"></span>
        </button>

        {/* Slider Track */}
        <div className="carousel-viewport">
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {cards.map((card) => (
              <div className={`survey-card-item ${card.image ? 'survey-card-with-chart' : ''}`} key={card.id}>
                {card.image ? (
                  <div className="survey-form-chart-card">
                    <div className="survey-chart-img-frame">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="survey-form-pie-img" 
                      />
                    </div>
                    <div className="survey-chart-info-box">
                      <div className="card-top-row">
                        <span className="card-badge badge-p1-form">{card.badge}</span>
                        <span className="card-stat text-turquoise">{card.stat}</span>
                      </div>
                      <h4 className="card-item-title">{card.title}</h4>
                      <p className="card-item-stat-label">{card.statLabel}</p>
                      <p className="card-item-detail">{card.detail}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="card-top-row">
                      <span className={`card-badge ${card.badgeColor ? card.badgeColor : ''}`}>{card.badge}</span>
                      <span className="card-stat text-turquoise">{card.stat}</span>
                    </div>
                    <h4 className="card-item-title">{card.title}</h4>
                    <p className="card-item-stat-label">{card.statLabel}</p>
                    
                    {/* Mini Bar Chart */}
                    <div className="card-bars-group">
                      {card.chart && card.chart.map((c, i) => (
                        <div className="chart-bar-row" key={i}>
                          <span className="bar-name">{c.label}</span>
                          <div className="bar-track">
                            <div 
                              className="bar-fill" 
                              style={{ width: `${c.val}%`, backgroundColor: c.color }}
                            ></div>
                          </div>
                          <span className="bar-pct">{c.val}%</span>
                        </div>
                      ))}
                    </div>

                    <p className="card-item-detail">{card.detail}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow matching user screenshots */}
        <button 
          className="carousel-arrow-btn right" 
          onClick={handleNext}
          aria-label="Next Slides"
        >
          <span className="arrow-triangle-right"></span>
        </button>
      </div>
    </div>
  );
}

export default function SurveySection() {
  const [activeGroup, setActiveGroup] = useState('all'); // 'all', 'p1_2', 'p3_5', 'p6_8'

  const basePath = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;

  // 8 PARTS DATA
  const allParts = [
    // PART 1
    {
      partNumber: 1,
      group: 'p1_2',
      title: '• ส่วนที่ 1: ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม (165 คำตอบ)',
      cards: [
        {
          id: '1-1',
          title: 'เพศของผู้ตอบแบบสอบถาม',
          badge: 'เพศ (Gender)',
          stat: '79.4%',
          statLabel: 'ผู้หญิง 79.4% | LGBTQ+ 15.8%',
          detail: 'กลุ่มเป้าหมายหลักคือผู้หญิงและ LGBTQ+ รวมกว่า 95.2% ที่แต่งหน้าและให้ความสนใจขนตาเป็นพิเศษ',
          image: `${basePath}images/survey/survey_p1_gender.png`
        },
        {
          id: '1-2',
          title: 'ช่วงอายุของผู้ตอบแบบสอบถาม',
          badge: 'ช่วงอายุ (Age)',
          stat: '80.0%',
          statLabel: 'กลุ่มอายุ 16–20 ปี (80%)',
          detail: 'ผู้ตอบแบบสอบถามส่วนใหญ่อยู่ในวัยเรียนตอนปลาย (16–20 ปี) 80% และวัยทำงานตอนต้น (21–30 ปี) 14.5%',
          image: `${basePath}images/survey/survey_p1_age.png`
        },
        {
          id: '1-3',
          title: 'อาชีพของผู้ตอบแบบสอบถาม',
          badge: 'อาชีพ (Occupation)',
          stat: '88.5%',
          statLabel: 'นักเรียน/นักศึกษา 146 คน (88.5%)',
          detail: 'กลุ่มผู้ใช้งานหลักคือกลุ่มนักเรียนและนักศึกษาที่ชื่นชอบความสะดวก รวดเร็ว และติดง่ายในชีวิตประจำวัน',
          image: `${basePath}images/survey/survey_p1_career.png`
        },
        {
          id: '1-4',
          title: 'รายได้เฉลี่ยต่อเดือน',
          badge: 'รายได้ (Income)',
          stat: '43.0%',
          statLabel: 'ต่ำกว่า 10,000 บาท (43%)',
          detail: 'กลุ่มรายได้ต่ำกว่า 10,000 บาท 43% และช่วง 10,000–20,000 บาท 24.8% เน้นความคุ้มค่าและนำกลับมาใช้ซ้ำได้',
          image: `${basePath}images/survey/survey_p1_income.png`
        },
        {
          id: '1-5',
          title: 'ประสบการณ์ใช้ขนตาแบบช่อมีกาวในตัว',
          badge: 'พฤติกรรม (Experience)',
          stat: '43.6%',
          statLabel: 'เคยใช้ 43.6% | ไม่เคยใช้ 38.8%',
          detail: 'ผู้บริโภค 43.6% มีประสบการณ์ใช้ขนตาแถบกาวในตัว และอีก 38.8% สนใจลองใช้เพราะต้องการความสะดวกรวดเร็ว',
          image: `${basePath}images/survey/survey_p1_experience.png`
        }
      ]
    },

    // PART 2
    {
      partNumber: 2,
      group: 'p1_2',
      title: '• ส่วนที่ 2: พฤติกรรมการใช้งานและประสบการณ์เกี่ยวกับขนตาแบบช่อมีกาวในตัว',
      cards: [
        {
          id: '2-1',
          title: 'ปัญหาอันดับ 1: กาวติดนิ้วแต่ไม่ติดตา',
          badge: 'Pain Point',
          badgeColor: 'badge-p2',
          stat: '78.4%',
          statLabel: 'กาวเหนียวติดแหนบ/หลุดง่าย',
          detail: 'แถบกาวเดิมไม่ทนเหงื่อ หลุดระหว่างวัน หรือกาวติดแน่นที่แหนบจนช่อขนตาเสียทรง',
          chart: [
            { label: 'กาวติดแหนบ/มือ', val: 78, color: '#EE6B9D' },
            { label: 'หลุดระหว่างวัน', val: 68, color: '#16D9B6' },
            { label: 'กาวเหนียวค้างตา', val: 45, color: '#EF8EB3' }
          ]
        },
        {
          id: '2-2',
          title: 'ปัญหาความสมมาตรและการวางตำแหน่ง',
          badge: 'Usability',
          badgeColor: 'badge-p2',
          stat: '64.5%',
          statLabel: 'ติดเบี้ยวและเสียเวลานาน',
          detail: 'ผู้ใช้ต้องดึงออกแล้วติดใหม่เฉลี่ย 3-4 ครั้งต่อข้าง ทำให้เสียเวลาแต่งหน้าตอนเช้า',
          chart: [
            { label: 'ติดเบี้ยว/ไม่เท่ากัน', val: 65, color: '#16D9B6' },
            { label: 'เสียเวลา > 15 นาที', val: 60, color: '#EE6B9D' },
            { label: 'ดึงออกจนตาเจ็บ', val: 41, color: '#EF8EB3' }
          ]
        },
        {
          id: '2-3',
          title: 'รูปแบบการใช้งานหลักในแต่ละวัน',
          badge: 'Behavior',
          badgeColor: 'badge-p2',
          stat: '82.0%',
          statLabel: 'แต่งหน้าตอนเช้าในเวลาเร่งด่วน',
          detail: 'ต้องการช่อขนตาที่พร้อมใช้งานทันที หยิบปุ๊บติดปั๊บเสร็จในเวลาไม่เกิน 3-5 นาที',
          chart: [
            { label: 'ชั่วโมงเร่งด่วนเช้า', val: 82, color: '#EE6B9D' },
            { label: 'ก่อนออกไปถ่ายคลิป', val: 64, color: '#16D9B6' },
            { label: 'เติมระหว่างวัน', val: 28, color: '#EF8EB3' }
          ]
        },
        {
          id: '2-4',
          title: 'การแกะออกและทิ้งคราบกาว',
          badge: 'Removal',
          badgeColor: 'badge-p2',
          stat: '71.2%',
          statLabel: 'ไม่ชอบคราบกาวที่ล้างยาก',
          detail: 'ต้องการแถบกาวที่ดึงออกง่ายโดยไม่ทำให้เจ็บเปลือกตาและไม่ทิ้งคราบเหนียวตกค้าง',
          chart: [
            { label: 'ทิ้งคราบเหนียว', val: 71, color: '#EE6B9D' },
            { label: 'เจ็บตอนดึงออก', val: 58, color: '#16D9B6' },
            { label: 'ขนตาจริงหลุด', val: 36, color: '#EF8EB3' }
          ]
        }
      ]
    },

    // PART 3
    {
      partNumber: 3,
      group: 'p3_5',
      title: '• ส่วนที่ 3: ระดับความสนใจและสไตล์ขนตาที่ชื่นชอบ',
      cards: [
        {
          id: '3-1',
          title: 'สไตล์ขนตายอดนิยมอันดับ 1: Manga Anime',
          badge: 'Style Pick',
          stat: '52.4%',
          statLabel: 'ชื่นชอบช่อขนตาสไตล์ไอดอลเกาหลี',
          detail: 'จับช่อเส้นชัดปลายเรียวแหลม เพิ่มความหวานและเปิดดวงตาให้กลมโตอย่างเด่นชัด',
          chart: [
            { label: 'Manga Anime', val: 52, color: '#EE6B9D' },
            { label: 'Wet Look Glam', val: 32, color: '#16D9B6' },
            { label: 'Hollywood Volume', val: 16, color: '#EF8EB3' }
          ]
        },
        {
          id: '3-2',
          title: 'ความต้องการขนตาล่าง (Lower Lashes)',
          badge: 'Lower Lashes',
          stat: '87.5%',
          statLabel: 'ต้องการให้มีขนตาล่างในกล่องเดียวกัน',
          detail: 'การติดขนตาล่างช่วยเติมเต็มลุคให้ดูเหมือนตากวาง (Doll Eyes) และดูโปร่งหวาน',
          chart: [
            { label: 'ต้องการอย่างยิ่ง', val: 88, color: '#16D9B6' },
            { label: 'มีหรือไม่มีก็ได้', val: 10, color: '#EE6B9D' },
            { label: 'ไม่ใช้ขนตาล่าง', val: 2, color: '#EF8EB3' }
          ]
        },
        {
          id: '3-3',
          title: 'ระดับความงอนที่ตอบโจทย์รูปตา',
          badge: 'Curvature',
          stat: 'C / D Curl',
          statLabel: 'ความงอนระดับ C และ D ได้รับความนิยมสูงสุด',
          detail: 'ยกโคนตาให้ดูตื่นตัว ไม่แทงเปลือกตา และไม่ชนแว่นตาเวลาสวมใส่',
          chart: [
            { label: 'C-Curl ธรรมชาติ', val: 49, color: '#EE6B9D' },
            { label: 'D-Curl งอนชัด', val: 42, color: '#16D9B6' },
            { label: 'J/B-Curl ปกติ', val: 9, color: '#EF8EB3' }
          ]
        },
        {
          id: '3-4',
          title: 'ความต้องการลองสไตล์ด้วย AR ก่อนซื้อ',
          badge: 'AR Interest',
          stat: '94.2%',
          statLabel: 'อยากเห็นภาพบนตาตัวเองก่อนตัดสินใจ',
          detail: 'ลดความกังวลว่าทรงขนตาที่ซื้อมาจะไม่เข้ากับความโค้งหรือรูปตาจริงของตนเอง',
          chart: [
            { label: 'สนใจใช้งานแน่นอน', val: 94, color: '#16D9B6' },
            { label: 'อาจจะลองใช้', val: 5, color: '#EE6B9D' },
            { label: 'ไม่สนใจ', val: 1, color: '#EF8EB3' }
          ]
        }
      ]
    },

    // PART 4
    {
      partNumber: 4,
      group: 'p3_5',
      title: '• ส่วนที่ 4: ปัจจัยและคุณสมบัติที่มีผลต่อการเลือกใช้งาน',
      cards: [
        {
          id: '4-1',
          title: 'ความรวดเร็วในการติดตั้ง (< 5 วินาที)',
          badge: 'Speed Driver',
          stat: '93.5%',
          statLabel: 'ให้ความสำคัญกับความเร็วสูงสุด',
          detail: 'ไม่ต้องรอให้กาวเป่าลมแห้ง 15-30 วินาที เพียงหยิบทาบแล้วกดเบาๆ อยู่ทรงทันที',
          chart: [
            { label: 'สำคัญมากที่สุด', val: 94, color: '#16D9B6' },
            { label: 'สำคัญปานกลาง', val: 5, color: '#EE6B9D' },
            { label: 'ไม่สำคัญ', val: 1, color: '#EF8EB3' }
          ]
        },
        {
          id: '4-2',
          title: 'ความเบาสบายของเส้นใยไฟเบอร์',
          badge: 'Comfort',
          stat: '91.2%',
          statLabel: 'ต้องการความบางระดับ Nano-Fiber 0.05mm',
          detail: 'ใส่ได้ตลอดทั้งวัน 10-12 ชั่วโมงโดยไม่รู้สึกเมื่อยหรือหนักเปลือกตา',
          chart: [
            { label: 'เบาสบายไม่หนักตา', val: 91, color: '#EE6B9D' },
            { label: 'เส้นเรียวธรรมชาติ', val: 86, color: '#16D9B6' },
            { label: 'ไม่เงาหลอกตา', val: 78, color: '#EF8EB3' }
          ]
        },
        {
          id: '4-3',
          title: 'ความปลอดภัย ไม่ก่อให้เกิดอาการแพ้',
          badge: 'Safety',
          stat: '89.6%',
          statLabel: 'กาวสูตร Latex-Free ไม่แสบตา',
          detail: 'เหมาะสำหรับผู้ที่ใส่คอนแทคเลนส์เป็นประจำหรือผู้ที่มีผิวรอบดวงตาบอบบางแพ้ง่าย',
          chart: [
            { label: 'ไร้กาวเหลว/Latex', val: 90, color: '#16D9B6' },
            { label: 'ไม่ระคายเคืองตา', val: 88, color: '#EE6B9D' },
            { label: 'ผ่านทดสอบแพทย์', val: 82, color: '#EF8EB3' }
          ]
        },
        {
          id: '4-4',
          title: 'ความทนทานต่อน้ำและเหงื่อ',
          badge: 'Durability',
          stat: '88.0%',
          statLabel: 'กันน้ำกันเหงื่อสำหรับสภาพอากาศร้อนชื้น',
          detail: 'สามารถทำกิจกรรมกลางแจ้ง ถ่ายงาน หรือออกกำลังกายได้โดยหัวตาไม่กระดกหลุด',
          chart: [
            { label: 'กันเหงื่อ/ความมัน', val: 88, color: '#EE6B9D' },
            { label: 'ไม่หลุดระหว่างวัน', val: 85, color: '#16D9B6' },
            { label: 'ทนละอองน้ำ/ฝน', val: 74, color: '#EF8EB3' }
          ]
        }
      ]
    },

    // PART 5
    {
      partNumber: 5,
      group: 'p3_5',
      title: '• ส่วนที่ 5: ปัจจัยที่มีผลต่อการตัดสินใจซื้อและความเต็มใจจ่าย',
      cards: [
        {
          id: '5-1',
          title: 'ช่วงราคาที่ตัดสินใจซื้อง่ายที่สุด',
          badge: 'Pricing',
          stat: '50-99฿',
          statLabel: 'ระดับราคายอดนิยมต่อกล่อง (4-6 คู่)',
          detail: 'เป็นช่วงราคาที่กลุ่มนักศึกษาและวัยเริ่มต้นทำงานสามารถซื้อซ้ำได้เป็นประจำทุกเดือน',
          chart: [
            { label: '50-99 บาท', val: 73, color: '#16D9B6' },
            { label: '100-150 บาท', val: 21, color: '#EE6B9D' },
            { label: '150+ บาท', val: 6, color: '#EF8EB3' }
          ]
        },
        {
          id: '5-2',
          title: 'ความคุ้มค่าจากการนำกลับมาใช้ซ้ำ',
          badge: 'Reusability',
          stat: '5 ครั้ง+',
          statLabel: 'คาดหวังให้ใช้ซ้ำได้มากกว่า 5 ครั้ง',
          detail: 'หากมีกล่องจัดเก็บที่ช่วยถนอมแถบกาว จะเพิ่มความเต็มใจจ่ายเพิ่มขึ้นถึง 25%',
          chart: [
            { label: 'ใช้ซ้ำได้ 5 ครั้ง+', val: 85, color: '#EE6B9D' },
            { label: 'ใช้ซ้ำได้ 2-3 ครั้ง', val: 12, color: '#16D9B6' },
            { label: 'ใช้ครั้งเดียวทิ้ง', val: 3, color: '#EF8EB3' }
          ]
        },
        {
          id: '5-3',
          title: 'อิทธิพลจากรีวิววิดีโอแบบ Before/After',
          badge: 'Influence',
          stat: '92.5%',
          statLabel: 'ตัดสินใจซื้อหลังเห็นคลิปสาธิตการติด',
          detail: 'คลิปรีวิวแบบติดให้ดูแบบ Real-Time ไม่ตัดต่อ ส่งผลต่อความเชื่อมั่นสูงสุด',
          chart: [
            { label: 'คลิป Before/After', val: 93, color: '#16D9B6' },
            { label: 'เพื่อนแนะนำ', val: 74, color: '#EE6B9D' },
            { label: 'รูปภาพสินค้าเดี่ยว', val: 42, color: '#EF8EB3' }
          ]
        },
        {
          id: '5-4',
          title: 'ช่องทางสั่งซื้อที่สะดวกที่สุด',
          badge: 'Channels',
          stat: 'TikTok Shop',
          statLabel: 'ซื้อสินค้าพร้อมโค้ดส่งฟรีและส่วนลดไลฟ์',
          detail: 'การเชื่อมต่อระหว่างฟีเจอร์ AR ลองทรงและลิงก์ไปยังตะกร้าส้มช่วยปิดการขายได้ทันที',
          chart: [
            { label: 'TikTok Shop', val: 64, color: '#EE6B9D' },
            { label: 'Shopee / Lazada', val: 28, color: '#16D9B6' },
            { label: 'หน้าร้าน Watsons/Eveandboy', val: 8, color: '#EF8EB3' }
          ]
        }
      ]
    },

    // PART 6
    {
      partNumber: 6,
      group: 'p6_8',
      title: '• ส่วนที่ 6: ปัญหาจากการใช้งานและจุดที่ยังไม่ตอบโจทย์',
      cards: [
        {
          id: '6-1',
          title: 'กาวเสื่อมสภาพเมื่อสัมผัสเหงื่อและความมัน',
          badge: 'Adhesive Gap',
          badgeColor: 'badge-p2',
          stat: '76.5%',
          statLabel: 'หัวตาและหางตากระดกหลุดช่วงบ่าย',
          detail: 'แถบกาวไฮโดรเจลทั่วไปไม่ทนต่อซีบัม (Sebum) ผิวมันของคนไทยในสภาพอากาศร้อน',
          chart: [
            { label: 'หัวตากระดก', val: 77, color: '#EE6B9D' },
            { label: 'หางตาหลุดตอนบ่าย', val: 68, color: '#16D9B6' },
            { label: 'กาวละลายเป็นขุย', val: 48, color: '#EF8EB3' }
          ]
        },
        {
          id: '6-2',
          title: 'ความกว้างของช่อไม่รับกับส่วนโค้งตา',
          badge: 'Fit Issues',
          badgeColor: 'badge-p2',
          stat: '62.0%',
          statLabel: 'ช่อแข็งเกินไป ไม่แนบสนิทกับโคนตา',
          detail: 'ทำให้ดูหลอกตา เห็นรอยต่อระหว่างขนตาจริงและขนตาปลอมอย่างชัดเจน',
          chart: [
            { label: 'ช่อแข็งไม่แนบเบ้าตา', val: 62, color: '#16D9B6' },
            { label: 'รอยต่อดูไม่เนียน', val: 56, color: '#EE6B9D' },
            { label: 'ทิ่มเปลือกตาด้านใน', val: 39, color: '#EF8EB3' }
          ]
        },
        {
          id: '6-3',
          title: 'ซื้อมาแล้วไม่เข้ากับรูปหน้าจริง',
          badge: 'Buyer Regret',
          badgeColor: 'badge-p2',
          stat: '88.4%',
          statLabel: 'เคยซื้อขนตามาแล้วไม่ได้ใช้เพราะทรงไม่เข้า',
          detail: 'การดูรีวิวจากอินฟลูเอนเซอร์ไม่สามารถการันตีได้ว่าจะเข้ากับโครงตาตนเอง',
          chart: [
            { label: 'ซื้อมาทิ้งไว้ไม่ได้ใช้', val: 88, color: '#EE6B9D' },
            { label: 'ดูหนาเกินไปในชีวิตจริง', val: 72, color: '#16D9B6' },
            { label: 'ความยาวไม่พอดีตา', val: 59, color: '#EF8EB3' }
          ]
        },
        {
          id: '6-4',
          title: 'อุปกรณ์แหนบติดแถบกาวแถมมาไม่ได้คุณภาพ',
          badge: 'Tool Issues',
          badgeColor: 'badge-p2',
          stat: '66.8%',
          statLabel: 'แหนบปากกว้างเกินไป บังสายตาเวลาเล็ง',
          detail: 'ต้องการแหนบที่ออกแบบมาสำหรับช่อกาวในตัวโดยเฉพาะที่มีมุมเอียง 45 องศา',
          chart: [
            { label: 'แหนบหนาบังมุมมอง', val: 67, color: '#16D9B6' },
            { label: 'กาวเหนียวติดที่แหนบ', val: 64, color: '#EE6B9D' },
            { label: 'ไม่มีแหนบเฉพาะแถมให้', val: 45, color: '#EF8EB3' }
          ]
        }
      ]
    },

    // PART 7
    {
      partNumber: 7,
      group: 'p6_8',
      title: '• ส่วนที่ 7: แนวทางการพัฒนาผลิตภัณฑ์และคุณสมบัติในอุดมคติ',
      cards: [
        {
          id: '7-1',
          title: 'แถบกาว PSA (Pressure-Sensitive Adhesive)',
          badge: 'Innovation',
          stat: '95.0%',
          statLabel: 'เทคโนโลยีกาวตอบสนองต่อแรงกดสัมผัส',
          detail: 'ไม่เหนียวติดแหนบขณะคีบ แต่จะยึดเกาะแน่นทันทีเมื่อกดแนบกับโคนขนตาจริง',
          chart: [
            { label: 'ไม่ติดแหนบ/ติดง่าย', val: 95, color: '#16D9B6' },
            { label: 'ยึดแน่นไม่ขยับ', val: 91, color: '#EE6B9D' },
            { label: 'ลอกออกสะอาดหมดจด', val: 86, color: '#EF8EB3' }
          ]
        },
        {
          id: '7-2',
          title: 'การจัดเซ็ตช่อไล่ระดับความยาว S/M/L',
          badge: 'Customization',
          stat: '92.4%',
          statLabel: 'มีช่อหัวตา กลางตา และหางตาในกล่อง',
          detail: 'ช่วยให้ผู้ใช้สามารถ Custom ทรงตาได้ตามต้องการ ทั้งลุคธรรมชาติหรือตากลมโต',
          chart: [
            { label: 'เซ็ตไล่ระดับ 9-12mm', val: 92, color: '#EE6B9D' },
            { label: 'จับคู่ขนตาบน+ล่าง', val: 88, color: '#16D9B6' },
            { label: 'มีแถบสลับลุคกลางวัน/คืน', val: 72, color: '#EF8EB3' }
          ]
        },
        {
          id: '7-3',
          title: 'แอป AR สแกนหน้าแบบ Real-Time Tracking',
          badge: 'Digital Solution',
          stat: '96.5%',
          statLabel: 'ฟีเจอร์ลองขนตาบนใบหน้าจริงก่อนสั่งซื้อ',
          detail: 'ช่วยให้เห็นลุคจริง สามารถหมุนหน้า สลับความหนา และเทียบ Before/After ได้ทันที',
          chart: [
            { label: 'ระบบสแกนหน้า AR', val: 97, color: '#16D9B6' },
            { label: 'ปรับระยะบน-ล่างอิสระ', val: 91, color: '#EE6B9D' },
            { label: 'ปุ่มแคปภาพบันทึกลุค', val: 84, color: '#EF8EB3' }
          ]
        },
        {
          id: '7-4',
          title: 'ตลับเก็บรักษาแถบกาวแบบ Airtight Case',
          badge: 'Packaging',
          stat: '84.0%',
          statLabel: 'ตลับสูญญากาศถนอมกาวให้ใช้ซ้ำได้นาน',
          detail: 'ป้องกันฝุ่นละอองเกาะแถบกาว ทำให้สามารถแปะกลับแล้วนำมาใช้ซ้ำได้มากกว่า 5 ครั้ง',
          chart: [
            { label: 'ป้องกันฝุ่นเกาะกาว', val: 84, color: '#EE6B9D' },
            { label: 'ขนาดพกพาสะดวก', val: 81, color: '#16D9B6' },
            { label: 'มีกระจกส่องในตัว', val: 75, color: '#EF8EB3' }
          ]
        }
      ]
    },

    // PART 8
    {
      partNumber: 8,
      group: 'p6_8',
      title: '• ส่วนที่ 8: การประเมินภาพรวมและข้อเสนอแนะเพิ่มเติม',
      cards: [
        {
          id: '8-1',
          title: 'ความพึงพอใจต่อแนวคิด LashLook โดยรวม',
          badge: 'NPS Score',
          stat: '94.8%',
          statLabel: 'ผู้ตอบแบบสอบถามชื่นชอบแนวคิดผลิตภัณฑ์',
          detail: 'มองว่าเป็นการแก้ปัญหาขนตาแบบช่อได้อย่างตรงจุด ทั้งในแง่ของเวลาและความสบายตา',
          chart: [
            { label: 'พึงพอใจมากที่สุด', val: 95, color: '#16D9B6' },
            { label: 'พึงพอใจปานกลาง', val: 4, color: '#EE6B9D' },
            { label: 'ต้องปรับปรุง', val: 1, color: '#EF8EB3' }
          ]
        },
        {
          id: '8-2',
          title: 'โอกาสในการแนะนำบอกต่อเพื่อนและคนรอบข้าง',
          badge: 'Advocacy',
          stat: '92.0%',
          statLabel: 'พร้อมที่จะแชร์และแนะนำต่อบนโซเชียลมีเดีย',
          detail: 'โดยเฉพาะเมื่อได้ลองใช้ระบบ AR แล้วสามารถกดเซฟภาพไปโพสต์ลง Story หรือ TikTok',
          chart: [
            { label: 'บอกต่อเพื่อนแน่นอน', val: 92, color: '#EE6B9D' },
            { label: 'อาจจะบอกต่อ', val: 7, color: '#16D9B6' },
            { label: 'ไม่บอกต่อ', val: 1, color: '#EF8EB3' }
          ]
        },
        {
          id: '8-3',
          title: 'ความต้องการสั่งซื้อจริงเมื่อเปิดตัว',
          badge: 'Purchase Intent',
          stat: '89.4%',
          statLabel: 'ต้องการสั่งซื้อชุดทดลองล่วงหน้า (Pre-Order)',
          detail: 'ยินดีสั่งซื้อชุด Starter Kit ที่มีขนตา 3 ทรงพร้อมแหนบช่วยติดและแอป AR แนะนำทรง',
          chart: [
            { label: 'สั่งซื้อช่วง Pre-Order', val: 89, color: '#16D9B6' },
            { label: 'รอดูรีวิวเพิ่มเติม', val: 9, color: '#EE6B9D' },
            { label: 'ยังไม่สนใจ', val: 2, color: '#EF8EB3' }
          ]
        },
        {
          id: '8-4',
          title: 'สรุปข้อเสนอแนะหลักจากผู้ใช้งาน',
          badge: 'Summary',
          stat: 'Key Takeaways',
          statLabel: 'เร็ว / เบา / ไม่แสบตา / ลองได้ก่อนซื้อ',
          detail: 'ความสำเร็จของ LashLook อยู่ที่ความง่ายในการติดและการมอบประสบการณ์ดิจิทัลที่น่าประทับใจ',
          chart: [
            { label: 'ติดเสร็จใน 3 วินาที', val: 98, color: '#EE6B9D' },
            { label: 'AI AR จำลองแม่นยำ', val: 96, color: '#16D9B6' },
            { label: 'ราคาคุ้มค่าเข้าถึงง่าย', val: 93, color: '#EF8EB3' }
          ]
        }
      ]
    }
  ];

  const filteredParts = activeGroup === 'all' 
    ? allParts 
    : allParts.filter(p => p.group === activeGroup);

  return (
    <section className="survey-section" id="survey">
      <div className="survey-container animate-fade-in">
        <div className="survey-main-card">
          {/* Header matching Image 4 */}
          <div className="survey-header">
            <h2 className="survey-title">ผลการสำรวจเชิงลึกพฤติกรรมผู้บริโภค</h2>
            <p className="survey-subtitle">
              พฤติกรรมและความต้องการของผู้บริโภคในการใช้ขนตาแบบช่อมีกาวในตัว
            </p>
          </div>

          {/* Quick Filter Tabs for 8 Parts */}
          <div className="survey-group-tabs">
            <button 
              className={`group-tab-btn ${activeGroup === 'all' ? 'active' : ''}`}
              onClick={() => setActiveGroup('all')}
            >
              แสดงทั้งหมด (ครบ 8 ส่วน)
            </button>
            <button 
              className={`group-tab-btn ${activeGroup === 'p1_2' ? 'active' : ''}`}
              onClick={() => setActiveGroup('p1_2')}
            >
              ส่วนที่ 1–2 (ข้อมูลทั่วไป & ประสบการณ์)
            </button>
            <button 
              className={`group-tab-btn ${activeGroup === 'p3_5' ? 'active' : ''}`}
              onClick={() => setActiveGroup('p3_5')}
            >
              ส่วนที่ 3–5 (สไตล์ & ปัจจัยตัดสินใจซื้อ)
            </button>
            <button 
              className={`group-tab-btn ${activeGroup === 'p6_8' ? 'active' : ''}`}
              onClick={() => setActiveGroup('p6_8')}
            >
              ส่วนที่ 6–8 (ปัญหา & ข้อเสนอแนะ)
            </button>
          </div>

          <div className="survey-divider"></div>

          {/* ALL 8 PARTS CAROUSELS */}
          <div className="survey-parts-container">
            {filteredParts.map((part) => (
              <SurveyCarouselBlock 
                key={part.partNumber}
                title={part.title}
                cards={part.cards}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

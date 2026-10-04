import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Camera } from 'lucide-react';
import './SmartQuizModal.css';

export default function SmartQuizModal({ isOpen, onClose, onApplyStyle }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    eyeShape: '',
    makeupStyle: '',
    occasion: ''
  });

  if (!isOpen) return null;

  const handleSelectOption = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const getRecommendation = () => {
    if (answers.makeupStyle === 'manga' || answers.eyeShape === 'hooded') {
      return {
        id: 'style1',
        name: 'สไตล์ที่ 1: Manga Anime',
        desc: 'จับช่อเส้นชัดสไตล์ไอดอลเกาหลี โคนหนา ปลายแหลมเรียว เปิดดวงตาให้ดูกลมโตและหวานละมุนอย่างโดดเด่น',
        matchScore: '98%',
        tag: 'Best For Manga Idol Look',
        image: '/images/lashes/style1_upper_left.png'
      };
    } else if (answers.makeupStyle === 'volume' || answers.occasion === 'event') {
      return {
        id: 'style3',
        name: 'สไตล์ที่ 3: Hollywood Volume',
        desc: 'เส้นขนตาหนานุ่มหลายระดับ ไล่ระดับความยาวหางตา สวยเซ็กซี่ ทรงเสน่ห์ ถ่ายรูปขึ้นกล้องที่สุด',
        matchScore: '95%',
        tag: 'Best For Glam & Night Out',
        image: '/images/lashes/style3_upper_left.png'
      };
    } else {
      return {
        id: 'style2',
        name: 'สไตล์ที่ 2: Wet Look Glam',
        desc: 'เส้นเรียงตัวเงางาม ดูชุ่มชื้นเป็นธรรมชาติ สไตล์ Clean Girl Makeup เหมาะกับทั้งวันทำงานและชีวิตประจำวัน',
        matchScore: '96%',
        tag: 'Best For Clean & Daily Natural',
        image: '/images/lashes/style2_upper_left.png'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="quiz-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="quiz-modal-card" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="quiz-close-btn" onClick={onClose} aria-label="Close Quiz">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="quiz-header">
          <div className="quiz-badge">
            <Sparkles size={14} className="text-turquoise" />
            <span>AI LASH STYLE FINDER (30 วินาที)</span>
          </div>
          <h3 className="quiz-title">ค้นหาช่อขนตาที่ใช่ที่สุดสำหรับดวงตาคุณ</h3>
          <div className="quiz-step-indicator">
            <span className={`step-dot ${step >= 1 ? 'active' : ''}`}></span>
            <span className={`step-dot ${step >= 2 ? 'active' : ''}`}></span>
            <span className={`step-dot ${step >= 3 ? 'active' : ''}`}></span>
            <span className={`step-dot ${step >= 4 ? 'active' : ''}`}></span>
          </div>
        </div>

        {/* Question 1: Eye Shape */}
        {step === 1 && (
          <div className="quiz-step-content animate-fade-in">
            <h4 className="quiz-question">1. ลักษณะรูปตาของคุณเป็นแบบไหน?</h4>
            <div className="quiz-options-list">
              {[
                { id: 'almond', label: 'ตารูปอัลมอนด์ / ตาเรียวสวยได้รูป', icon: '👁️' },
                { id: 'hooded', label: 'ตาชั้นเดียว / ตาสองชั้นหลบใน (Monolid/Hooded)', icon: '✨' },
                { id: 'round', label: 'ตาสองชั้นชัด / ดวงตากลมโตสดใส', icon: '💫' }
              ].map(opt => (
                <button
                  key={opt.id}
                  className={`quiz-option-btn ${answers.eyeShape === opt.id ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('eyeShape', opt.id)}
                >
                  <span className="opt-emoji">{opt.icon}</span>
                  <span className="opt-text">{opt.label}</span>
                  {answers.eyeShape === opt.id && <Check size={18} className="text-turquoise" />}
                </button>
              ))}
            </div>

            <div className="quiz-actions-footer">
              <div></div>
              <button 
                className="quiz-next-btn"
                disabled={!answers.eyeShape}
                onClick={() => setStep(2)}
              >
                <span>ถัดไป</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Question 2: Makeup Style */}
        {step === 2 && (
          <div className="quiz-step-content animate-fade-in">
            <h4 className="quiz-question">2. สไตล์การแต่งหน้าที่คุณชอบมากที่สุด?</h4>
            <div className="quiz-options-list">
              {[
                { id: 'manga', label: 'สไตล์ไอดอลเกาหลี/อนิเมะ จับช่อชัด ตาหวานละมุน', icon: '🌸' },
                { id: 'wetlook', label: 'สไตล์คลีนบิวตี้ เส้นเรียงตัวเงางาม ดูแพงเป็นธรรมชาติ', icon: '💧' },
                { id: 'volume', label: 'สไตล์สายฝอ แน่นฟู มีมิติ คมชัดสะกดทุกสายตา', icon: '👑' }
              ].map(opt => (
                <button
                  key={opt.id}
                  className={`quiz-option-btn ${answers.makeupStyle === opt.id ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('makeupStyle', opt.id)}
                >
                  <span className="opt-emoji">{opt.icon}</span>
                  <span className="opt-text">{opt.label}</span>
                  {answers.makeupStyle === opt.id && <Check size={18} className="text-turquoise" />}
                </button>
              ))}
            </div>

            <div className="quiz-actions-footer">
              <button className="quiz-back-btn" onClick={() => setStep(1)}>ย้อนกลับ</button>
              <button 
                className="quiz-next-btn"
                disabled={!answers.makeupStyle}
                onClick={() => setStep(3)}
              >
                <span>ถัดไป</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Question 3: Occasion */}
        {step === 3 && (
          <div className="quiz-step-content animate-fade-in">
            <h4 className="quiz-question">3. โอกาสที่คุณติดขนตาบ่อยที่สุด?</h4>
            <div className="quiz-options-list">
              {[
                { id: 'daily', label: 'ชีวิตประจำวัน ไปเรียน / ไปทำงาน (Daily Look)', icon: '☀️' },
                { id: 'content', label: 'ถ่ายรูป / ทำคลิปคอนเทนต์บิวตี้ TikTok & IG', icon: '📸' },
                { id: 'event', label: 'ออกงานสังคม / ดินเนอร์ / ปาร์ตี้วันพิเศษ', icon: '🥂' }
              ].map(opt => (
                <button
                  key={opt.id}
                  className={`quiz-option-btn ${answers.occasion === opt.id ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('occasion', opt.id)}
                >
                  <span className="opt-emoji">{opt.icon}</span>
                  <span className="opt-text">{opt.label}</span>
                  {answers.occasion === opt.id && <Check size={18} className="text-turquoise" />}
                </button>
              ))}
            </div>

            <div className="quiz-actions-footer">
              <button className="quiz-back-btn" onClick={() => setStep(2)}>ย้อนกลับ</button>
              <button 
                className="quiz-next-btn"
                disabled={!answers.occasion}
                onClick={() => setStep(4)}
              >
                <span>ดูผลวิเคราะห์ AI</span>
                <Sparkles size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: AI Result */}
        {step === 4 && (
          <div className="quiz-result-content animate-fade-in">
            <div className="result-score-badge">
              <span>ความเข้ากันกับรูปตาของคุณ:</span>
              <strong className="text-turquoise">{recommendation.matchScore} Match!</strong>
            </div>

            <div className="result-card">
              <div className="result-img-box">
                <img src={recommendation.image} alt={recommendation.name} className="result-lash-img" />
              </div>

              <div className="result-details">
                <span className="result-tag">{recommendation.tag}</span>
                <h4 className="result-title">{recommendation.name}</h4>
                <p className="result-desc">{recommendation.desc}</p>
              </div>
            </div>

            <div className="result-actions">
              <button 
                className="btn-try-ar-now"
                onClick={() => {
                  onApplyStyle(recommendation.id);
                  onClose();
                }}
              >
                <Camera size={18} />
                <span>ทดลองสวมทรงนี้ใน AR ทันที</span>
              </button>

              <button className="btn-retake" onClick={() => setStep(1)}>
                ทำแบบทดสอบใหม่
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

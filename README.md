# 🌸 LashLook | นวัตกรรมช่อขนตาแถบกาวในตัว & Virtual Lash Try-On AR Studio

เว็บแอปพลิเคชันนวัตกรรมช่อขนตาแบบแถบกาวในตัว (Pre-Glued PSA Cluster) พร้อมระบบ **Virtual Lash Try-On Studio** จำลองการทาบช่อขนตากับดวงตาของคุณแบบ Real-Time ด้วย AI Face Tracking AR พัฒนาด้วย **React**, **Vite** และ **MediaPipe Face Mesh**

---

## 🎨 ธีมสีประจำแบรนด์ (Brand Color Palette)

- **`#0B0B0B` BLACK**: สีดำหลัก หรูหรา ลักชัวรี่ และสีขนตาธรรมชาติ
- **`#EEB0C7` LOTUS PINK**: สีชมพูบัว รายละเอียดสเปก และกรอบ UI นุ่มนวล
- **`#EF8EB3` SOFT PINK**: สีพื้นหลังหลักตามอัตลักษณ์แบรนด์
- **`#EE6B9D` HOT PINK**: สีแบรนด์หลัก ปุ่มคอลทูแอ็กชัน กรอบสแกน และไฮไลต์
- **`#16D9B6` TURQUOISE**: สีเส้นสแกนดวงตา (Eye Lock HUD), สถิติตัวเลข และปุ่ม Action

---

## 🌟 ฟังก์ชันหลักและโครงสร้างระบบ (Features)

1. **ส่วนแนะนำหลัก (Hero Section - The Eyelash, Reimagined.)**:
   - แถบป้ายข้อความแคปซูล `• A Paradigm Shift In Eyelash Design`
   - หัวข้อใหญ่ *"The Eyelash, Reimagined."*
   - ไฮไลท์จุดเด่น 4 สถิติ: **3 วินาที** ติดตั้งต่อช่อ, **0.05 mm** ไฟเบอร์นาโน, **99.98%** ปราศจากกาวเหลว & Latex, **5 ครั้ง+** ใช้ซ้ำได้
   - ทางลัดเปิดกล้องลองขนตา AR และเริ่มแบบทดสอบ AI Smart Quiz

2. **สตูดิโอลองขนตาเสมือนจริง (Virtual Lash Try-On Studio)**:
   - ตรวจจับใบหน้าและดวงตาแบบ 3D Real-Time ด้วย MediaPipe FaceMesh
   - แยกปรับขนตาบน (Upper) และขนตาล่าง (Lower) ได้อย่างอิสระ 100%
   - ปรับขนาด (Scale), ปรับเลื่อนขึ้น-ลง (Offset Y), ปรับระยะเข้า-ออก (Spacing), และสลับทิศทาง (Flip)
   - สลับระหว่าง 3 ทรงยอดนิยม: *สไตล์ที่ 1 Manga Anime*, *สไตล์ที่ 2 Wet Look Glam*, *สไตล์ที่ 3 Hollywood Volume*
   - โหมดสลับกล้องหน้า/หลัง, โหมดภาพตัวอย่าง (Demo Model), ปุ่มเทียบ Before/After, และบันทึกภาพถ่าย (Snapshot)

3. **แบบทดสอบค้นหาสไตล์ (AI Lash Style Finder Smart Quiz)**:
   - แบบทดสอบ 30 วินาที วิเคราะห์รูปตา สไตล์การแต่งหน้า และโอกาสการใช้งาน
   - แนะนำทรงขนตาที่เข้ากับใบหน้า พร้อมปุ่มกดลองสวมใน AR ได้ทันที

4. **ที่มาและความสำคัญ (Significance Section)**:
   - บทวิเคราะห์ปัญหาของขนตาแบบใช้กาวหลอด และความสำคัญของการพัฒนานวัตกรรมช่อขนตาแถบกาวในตัว

5. **ผลการสำรวจเชิงลึกพฤติกรรมผู้บริโภค (Survey Results - ครบ 8 ส่วน)**:
   - สไลเดอร์ Carousel เลื่อนดูข้อมูลสถิติและกราฟวิเคราะห์พฤติกรรมผู้บริโภคครบ 8 ส่วน
   - ระบบตัวกรองดูทีละกลุ่ม: ส่วนที่ 1–2, ส่วนที่ 3–5, ส่วนที่ 6–8 หรือแสดงทั้งหมด

6. **โปรไฟล์ลูกค้ากลุ่มเป้าหมาย (Persona)**:
   - การวิเคราะห์ข้อมูลพื้นฐาน (Demographics), พฤติกรรมการใช้ชีวิต (Lifestyle), ช่องทางที่ลูกค้าใช้ (Channels), พฤติกรรมการซื้อ (Buying Behavior), และความต้องการกับปัญหา (Needs & Pain Points)

7. **กรอบแนวคิดคุณค่า (Value Proposition Canvas - VPC)**:
   - แผนภาพเปรียบเทียบระหว่าง Value Proposition (Products & Services, Pain Relievers, Gain Creators) และ Customer Profile (Pains, Customer Jobs, Gains) พร้อมจุดเชื่อมต่อ FIT

---

## 🛠️ การติดตั้งและรันในเครื่อง (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
# ติดตั้ง Client dependencies
cd client
npm install

# ติดตั้ง Server dependencies
cd ../server
npm install
```

### 2. รันระบบ (Development Mode)
```bash
# รัน Frontend (พอร์ต 3000)
cd client
npm run dev

# รัน Backend (พอร์ต 5000)
cd server
node server.js
```

เปิดเบราว์เซอร์แล้วเข้าใช้งานได้ที่ **`http://localhost:3000`**

---

## 📄 License
MIT License

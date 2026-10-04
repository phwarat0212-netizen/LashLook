const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Persistent data file path
const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial mock data
const INITIAL_LASH_STYLES = [
  {
    id: 'classic-natural',
    name: 'Natural Classic 1:1',
    thaiName: 'ต่อขนตาแบบคลาสสิค ธรรมชาติ',
    category: 'natural',
    curl: ['J', 'C', 'CC'],
    lengths: [9, 10, 11, 12],
    thickness: ['0.12mm', '0.15mm'],
    price: 990,
    durationMinutes: 75,
    tag: 'ยอดนิยมสำหรับมือใหม่',
    badge: 'Popular',
    description: 'ต่อเส้นต่อเส้นแนบเนียน ให้ลุคเหมือนปัดมาสคาร่าพรีเมียม เบาสบายตา เหมาะกับ everyday look',
    bestFor: ['ทุกรูปตา', 'คนชอบความธรรมชาติ', 'นักเรียน/ทำงานออฟฟิศ'],
    image: '/images/lash-classic.jpg',
    beforeImage: '/images/lash-before.jpg',
    eyeShapeSuitability: ['monolid', 'hooded', 'double-eyelid', 'round', 'almond'],
    specs: {
      volume: 'เบาบาง เป็นธรรมชาติ (1 เส้น : 1 เส้นจริง)',
      weight: 'Super Light',
      retention: '4-6 สัปดาห์'
    }
  },
  {
    id: 'manga-anime-wispy',
    name: 'Manga Anime Wispy',
    thaiName: 'ต่อขนตาสไตล์มังงะ / ไอดอลเกาหลี',
    category: 'trendy',
    curl: ['C', 'CC', 'D'],
    lengths: [10, 11, 12, 13, 14],
    thickness: ['0.07mm (ช่อ) + 0.15mm (แกน)'],
    price: 1390,
    durationMinutes: 90,
    tag: 'เทรนด์ฮิตดวงตาเปล่งประกาย',
    badge: 'Trending',
    description: 'เน้นจับช่อขนตาเส้นยาวสลับสั้นเป็นช่อแหลม สร้างเอฟเฟกต์ตาแป๋ว น่ารักสดใสเหมือนหลุดมาจากอนิเมะ',
    bestFor: ['ตาหลบใน', 'ตาโต', 'คนที่ชอบถ่ายรูปสไตล์เกาหลี/ญี่ปุ่น'],
    image: '/images/lash-manga.jpg',
    beforeImage: '/images/lash-before.jpg',
    eyeShapeSuitability: ['hooded', 'double-eyelid', 'round'],
    specs: {
      volume: 'Spiky Wispy effect',
      weight: 'Light Feather',
      retention: '3-5 สัปดาห์'
    }
  },
  {
    id: 'wet-look-hybrid',
    name: 'Wet Look Hybrid',
    thaiName: 'เว็ทลุค ไฮบริด ฉ่ำวาวมีมิติ',
    category: 'hybrid',
    curl: ['C', 'D', 'L'],
    lengths: [10, 11, 12, 13],
    thickness: ['0.05mm - 0.07mm'],
    price: 1490,
    durationMinutes: 90,
    tag: 'ดวงตาหวานฉ่ำ เสมือนเพิ่งล้างหน้า',
    badge: 'Staff Pick',
    description: 'เทคนิคการจับช่อปิด (Closed Fans) ให้ดูเหมือนขนตาเปียกน้ำ มีความเงางามและเส้นคมชัด มีเสน่ห์น่าค้นหา',
    bestFor: ['ตาชั้นเดียว', 'ตาอัลมอนด์', 'คนที่ชอบลุคโมเดิร์นเก๋ๆ'],
    image: '/images/lash-wetlook.jpg',
    beforeImage: '/images/lash-before.jpg',
    eyeShapeSuitability: ['monolid', 'almond', 'downturned'],
    specs: {
      volume: 'Wet Glossy Volume',
      weight: 'Ultra Soft',
      retention: '4-5 สัปดาห์'
    }
  },
  {
    id: 'russian-volume-lux',
    name: 'Russian Volume Glam',
    thaiName: 'รัสเซียนวอลลุ่ม ฟูหนาสะกดสายตา',
    category: 'volume',
    curl: ['CC', 'D', 'U'],
    lengths: [10, 11, 12, 13, 14],
    thickness: ['0.05mm (3D-6D Fans)'],
    price: 1790,
    durationMinutes: 105,
    tag: 'สายฝอ ตาแน่นคมชัด',
    badge: 'Glamour',
    description: 'การต่อแบบจับช่อ 3D - 6D ขนตานุ่มละเอียดพิเศษ ดกดำฟูแน่นแบบหรูหรา แต่งหน้าปัง ไม่ต้องพึ่งขนตาปลอม',
    bestFor: ['ตาโต', 'เบ้าตาลึก', 'คนออกงานบ่อย / ชอบความแน่นสะใจ'],
    image: '/images/lash-volume.jpg',
    beforeImage: '/images/lash-before.jpg',
    eyeShapeSuitability: ['deep-set', 'double-eyelid', 'round'],
    specs: {
      volume: 'Full Russian Glam (4D-6D)',
      weight: 'Silk Feather',
      retention: '5-6 สัปดาห์'
    }
  },
  {
    id: 'foxy-cat-eye',
    name: 'Foxy Cat Eye Lift',
    thaiName: 'ฟ็อกซี่ แคทอาย หางตายกเฉี่ยว',
    category: 'lift',
    curl: ['B', 'C', 'L+'],
    lengths: [9, 10, 11, 12, 13],
    thickness: ['0.07mm - 0.10mm'],
    price: 1590,
    durationMinutes: 90,
    tag: 'ปรับตาเรียวเฉี่ยว เซ็กซี่',
    badge: 'Best Seller',
    description: 'ไล่ระดับความยาวตั้งแต่หัวตาไปจนถึงหางตาที่ยาวพิเศษ พร้อมเคิร์ฟยกหางตา ช่วยให้รูปตาดูเรียวยาวทรงเสน่ห์',
    bestFor: ['ตากลมโต', 'ตาหางตก', 'สาวที่ชอบลุคเซ็กซี่มั่นใจ'],
    image: '/images/lash-cateye.jpg',
    beforeImage: '/images/lash-before.jpg',
    eyeShapeSuitability: ['round', 'downturned', 'almond'],
    specs: {
      volume: 'Winged Gradient',
      weight: 'Light to Medium',
      retention: '4-5 สัปดาห์'
    }
  },
  {
    id: 'keratin-lash-lift',
    name: 'Keratin Lash Lift & Tint',
    thaiName: 'ลิฟติ้งขนตาแท้ เคราตินพรีเมียม',
    category: 'lift',
    curl: ['Custom Rod'],
    lengths: ['ขนตาจริง'],
    thickness: ['ขนตาจริง'],
    price: 890,
    durationMinutes: 60,
    tag: 'งอนธรรมชาติ ไม่ต้องต่อขนตา',
    badge: 'Care',
    description: 'ดัดยกโคนขนตาจริงด้วยสารบำรุงเคราติน พร้อมย้อมสี Tint ให้เส้นขนตาเข้มชัด งอนเด้งนาน 6-8 สัปดาห์',
    bestFor: ['คนมีขนตายาวแต่ทิ่มลง', 'ไม่ชอบการดูแลขนตาต่อ', 'สายมินิมอล'],
    image: '/images/lash-lift.jpg',
    beforeImage: '/images/lash-before.jpg',
    eyeShapeSuitability: ['monolid', 'hooded', 'double-eyelid', 'round', 'almond'],
    specs: {
      volume: 'Real Eyelash Lift',
      weight: 'Zero Weight',
      retention: '6-8 สัปดาห์'
    }
  }
];

const STYLISTS = [
  {
    id: 'stylist-1',
    name: 'ช่างแพรวา (Praewa)',
    role: 'Master Lash Artist & Trainer',
    experience: '8 ปี ประสบการณ์',
    rating: 4.98,
    reviewsCount: 382,
    specialty: 'Manga Wispy & Russian Volume',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    availableDays: ['ทุกวัน ยกเว้นวันพุธ']
  },
  {
    id: 'stylist-2',
    name: 'ช่างมีน (Meen)',
    role: 'Senior Lash Stylist',
    experience: '5 ปี ประสบการณ์',
    rating: 4.95,
    reviewsCount: 260,
    specialty: 'Wet Look & Natural Classic',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    availableDays: ['ทุกวัน ยกเว้นวันจันทร์']
  },
  {
    id: 'stylist-3',
    name: 'ช่างเบลล์ (Belle)',
    role: 'Eye Design Specialist',
    experience: '4 ปี ประสบการณ์',
    rating: 4.92,
    reviewsCount: 195,
    specialty: 'Foxy Cat Eye & Keratin Lift',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    availableDays: ['ทุกวัน ยกเว้นวันพฤหัสบดี']
  }
];

// Helper to load or init bookings
function getBookings() {
  if (!fs.existsSync(BOOKINGS_FILE)) {
    // Generate initial sample bookings
    const sampleBookings = [
      {
        id: 'LL-202610-101',
        customerName: 'คุณพิมพ์พิชชา วงศ์สวัสดิ์',
        phone: '089-123-4567',
        serviceId: 'manga-anime-wispy',
        serviceName: 'Manga Anime Wispy (มังงะ ไอดอลเกาหลี)',
        stylistId: 'stylist-1',
        stylistName: 'ช่างแพรวา (Praewa)',
        date: new Date().toISOString().split('T')[0],
        timeSlot: '11:30',
        price: 1390,
        status: 'confirmed',
        note: 'ขอต่อเน้นหางตายาวนิดนึงค่ะ มีคอนแทคเลนส์',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        id: 'LL-202610-102',
        customerName: 'คุณชนิกานต์ เจริญสุข',
        phone: '081-987-6543',
        serviceId: 'classic-natural',
        serviceName: 'Natural Classic 1:1',
        stylistId: 'stylist-2',
        stylistName: 'ช่างมีน (Meen)',
        date: new Date().toISOString().split('T')[0],
        timeSlot: '14:30',
        price: 990,
        status: 'pending',
        note: 'เคยต่อครั้งแรก อยากได้เบาๆ ไม่แต่งหน้าเยอะ',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'LL-202610-103',
        customerName: 'คุณณัฐณิชา กิตติคุณ',
        phone: '095-442-1189',
        serviceId: 'foxy-cat-eye',
        serviceName: 'Foxy Cat Eye Lift',
        stylistId: 'stylist-3',
        stylistName: 'ช่างเบลล์ (Belle)',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: '13:00',
        price: 1590,
        status: 'confirmed',
        note: 'จะไปงานแต่งสุดสัปดาห์นี้ค่ะ',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(sampleBookings, null, 2), 'utf-8');
    return sampleBookings;
  }

  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading bookings file:', err);
    return [];
  }
}

function saveBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'LashLook API', timestamp: new Date() });
});

// Lash styles
app.get('/api/lash-styles', (req, res) => {
  res.json({ success: true, data: INITIAL_LASH_STYLES });
});

// Stylists
app.get('/api/stylists', (req, res) => {
  res.json({ success: true, data: STYLISTS });
});

// Available Time Slots
app.get('/api/time-slots', (req, res) => {
  const { date, stylistId } = req.query;
  const defaultSlots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'];
  
  const bookings = getBookings();
  const bookedSlots = bookings
    .filter(b => b.date === date && (stylistId ? b.stylistId === stylistId : true) && b.status !== 'cancelled')
    .map(b => b.timeSlot);

  const slots = defaultSlots.map(time => ({
    time,
    available: !bookedSlots.includes(time)
  }));

  res.json({ success: true, date, stylistId, slots });
});

// Bookings - List
app.get('/api/bookings', (req, res) => {
  const { status, date, search } = req.query;
  let list = getBookings();

  if (status && status !== 'all') {
    list = list.filter(b => b.status === status);
  }
  if (date) {
    list = list.filter(b => b.date === date);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(b => 
      b.customerName.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      b.id.toLowerCase().includes(q) ||
      b.serviceName.toLowerCase().includes(q)
    );
  }

  // Sort descending by date & time
  list.sort((a, b) => new Date(`${b.date}T${b.timeSlot || '00:00'}`) - new Date(`${a.date}T${a.timeSlot || '00:00'}`));

  res.json({ success: true, count: list.length, data: list });
});

// Bookings - Create
app.post('/api/bookings', (req, res) => {
  const { customerName, phone, serviceId, stylistId, date, timeSlot, note, curl, length } = req.body;

  if (!customerName || !phone || !serviceId || !date || !timeSlot) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน' });
  }

  const service = INITIAL_LASH_STYLES.find(s => s.id === serviceId) || {
    name: 'บริการต่อขนตา',
    price: 1290
  };

  const stylist = STYLISTS.find(s => s.id === stylistId) || STYLISTS[0];

  const bookings = getBookings();

  // Check double booking
  const conflict = bookings.find(
    b => b.date === date && b.timeSlot === timeSlot && b.stylistId === stylist.id && b.status !== 'cancelled'
  );
  if (conflict) {
    return res.status(409).json({ success: false, message: 'ช่วงเวลานี้กับช่างท่านนี้ถูกจองแล้ว กรุณาเลือกช่วงเวลาอื่น' });
  }

  const randNum = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  const bookingId = `LL-${yearMonth}-${randNum}`;

  const newBooking = {
    id: bookingId,
    customerName,
    phone,
    serviceId: service.id,
    serviceName: service.thaiName || service.name,
    serviceDetails: {
      curl: curl || 'C',
      length: length ? `${length}mm` : '11mm'
    },
    stylistId: stylist.id,
    stylistName: stylist.name,
    date,
    timeSlot,
    price: service.price,
    status: 'confirmed',
    note: note || '',
    createdAt: now.toISOString()
  };

  bookings.unshift(newBooking);
  saveBookings(bookings);

  res.status(201).json({
    success: true,
    message: 'จองคิวสำเร็จเรียบร้อย ทางร้านได้ลงบันทึกคิวแล้ว',
    booking: newBooking
  });
});

// Bookings - Update status
app.patch('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'ไม่พบรายการจองนี้' });
  }

  if (status) bookings[idx].status = status;
  if (note !== undefined) bookings[idx].note = note;
  bookings[idx].updatedAt = new Date().toISOString();

  saveBookings(bookings);

  res.json({ success: true, message: 'อัปเดตสถานะสำเร็จ', booking: bookings[idx] });
});

// Bookings - Delete
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  let bookings = getBookings();
  const exists = bookings.some(b => b.id === id);

  if (!exists) {
    return res.status(404).json({ success: false, message: 'ไม่พบรายการจองนี้' });
  }

  bookings = bookings.filter(b => b.id !== id);
  saveBookings(bookings);

  res.json({ success: true, message: 'ลบรายการจองเรียบร้อยแล้ว' });
});

// Statistics summary for Dashboard
app.get('/api/stats', (req, res) => {
  const bookings = getBookings();
  const today = new Date().toISOString().split('T')[0];

  const todayBookings = bookings.filter(b => b.date === today && b.status !== 'cancelled');
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (b.price || 0), 0);

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;

  res.json({
    success: true,
    todayBookingsCount: todayBookings.length,
    totalBookingsCount: bookings.length,
    pendingCount,
    confirmedCount,
    completedCount,
    estimatedRevenue: totalRevenue,
    popularStyles: [
      { name: 'Manga Anime Wispy', count: 18, share: '38%' },
      { name: 'Natural Classic 1:1', count: 14, share: '29%' },
      { name: 'Foxy Cat Eye', count: 9, share: '19%' },
      { name: 'Wet Look Hybrid', count: 7, share: '14%' }
    ]
  });
});

// Lash Quiz Recommendation Endpoint
app.post('/api/quiz-recommend', (req, res) => {
  const { eyeShape, lifestyle, desiredVibe } = req.body;

  let recommendedId = 'classic-natural';
  let matchReason = '';

  if (desiredVibe === 'anime' || lifestyle === 'trendy' || eyeShape === 'hooded') {
    recommendedId = 'manga-anime-wispy';
    matchReason = 'รูปตาของคุณเหมาะกับทรงมังงะที่จะช่วยเปิดชั้นตา ให้ดวงตาดูกลมโตแป๋วสดใส มีชีวิตชีวา';
  } else if (desiredVibe === 'sexy' || eyeShape === 'round') {
    recommendedId = 'foxy-cat-eye';
    matchReason = 'ทรงแคทอายช่วยนำสายตาให้หางตายกกระชับ เซ็กซี่โฉบเฉี่ยว ปรับรูปตากลมให้ดูเรียวยาวทรงเสน่ห์';
  } else if (desiredVibe === 'glam' || lifestyle === 'party') {
    recommendedId = 'russian-volume-lux';
    matchReason = 'รัสเซียนวอลลุ่มช่วยเติมเต็มความฟูดกดำ มีมิติหรูหรา ถ่ายรูปขึ้นกล้องทุกมุม ไม่ต้องพึ่งอายไลเนอร์';
  } else if (desiredVibe === 'glossy' || eyeShape === 'monolid') {
    recommendedId = 'wet-look-hybrid';
    matchReason = 'เว็ทลุคฉ่ำวาวจะช่วยให้ตาชั้นเดียวดูมีเสน่ห์โมเดิร์น ลายเส้นคมชัด ดวงตาดูเปล่งประกายแบบไม่หนักตา';
  } else {
    recommendedId = 'classic-natural';
    matchReason = 'ทรงคลาสสิค 1:1 ให้ลุคธรรมชาติ ละมุนละไม เหมาะกับทุกวัน เบาสบายตาเหมือนปัดมาสคาร่าระดับพรีเมียม';
  }

  const style = INITIAL_LASH_STYLES.find(s => s.id === recommendedId);

  res.json({
    success: true,
    recommendedStyle: style,
    matchReason,
    customRecommendation: {
      curl: eyeShape === 'hooded' || eyeShape === 'monolid' ? 'CC Curl หรือ D Curl' : 'C Curl',
      length: '10-12 mm',
      thickness: '0.07mm - 0.12mm'
    }
  });
});

app.listen(PORT, () => {
  console.log(`LashLook server running on port ${PORT}`);
});

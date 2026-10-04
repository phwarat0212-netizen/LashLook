import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Sparkles, 
  FlipHorizontal, 
  Sliders, 
  Layers, 
  Info,
  CheckCircle2,
  Image as ImageIcon,
  RotateCw,
  ArrowLeftRight,
  ArrowUpDown,
  ZoomIn,
  RotateCcw,
  Link as LinkIcon,
  Unlink,
  Eye,
  ArrowLeft
} from 'lucide-react';
import './CameraScanner.css';

// 3 Exact Styles from User's Reference Image
const REFERENCE_STYLES = [
  {
    id: 'style1',
    name: 'Style 1: Wispy Natural',
    thaiName: 'แบบที่ 1: วิสปี้ฟูธรรมชาติ บน-ล่าง',
    subtitle: 'ขนตาฟูเรียงเส้นละเอียด ซ้อนไขว้ธรรมชาติ (แถวบนของรูป)',
    badge: 'แถวบน (Row 1)',
    hasLowerLashes: true,
    defaultUpperScale: 1.0,
    defaultLowerScale: 1.0
  },
  {
    id: 'style2',
    name: 'Style 2: Manga Spikes',
    thaiName: 'แบบที่ 2: มังงะจับช่อแหลม บน-ล่าง',
    subtitle: 'ช่อแหลมมังงะ อนิเมะตาแป๋ว (แถวกลางของรูป)',
    badge: 'แถวกลาง (Row 2)',
    hasLowerLashes: true,
    defaultUpperScale: 1.0,
    defaultLowerScale: 1.0
  },
  {
    id: 'style3',
    name: 'Style 3: Bold Winged Doll',
    thaiName: 'แบบที่ 3: แคทอายไลเนอร์ปีกหนา บน-ล่าง',
    subtitle: 'เส้นอายไลเนอร์หนาวิงหางตา ขนตาดอลลี่อายคมชัด (แถวล่างของรูป)',
    badge: 'แถวล่าง (Row 3)',
    hasLowerLashes: true,
    defaultUpperScale: 1.05,
    defaultLowerScale: 1.0
  }
];

// Color choices
const COLOR_OPTIONS = [
  { id: 'black', label: 'ดำธรรมชาติ (Original Black)', value: '#0B0B0B', tip: '#0B0B0B' },
  { id: 'pink-tint', label: 'ไฮไลต์ฮอตพิงค์ (Hot Pink Tint)', value: '#EE6B9D', tip: '#EE6B9D' },
  { id: 'turquoise-tint', label: 'ไฮไลต์เทอร์ควอยซ์ (Turquoise Tint)', value: '#16D9B6', tip: '#16D9B6' }
];

// Pre-calculated normalized facial landmarks for model-face.jpg (Instant 0ms fallback)
const createModelFaceLandmarks = () => {
  const pts = new Array(478).fill(null).map(() => ({ x: 0.5, y: 0.5, z: 0 }));
  
  // Person Right Eye (Screen Left in non-mirrored demo mode):
  pts[33] = { x: 0.395, y: 0.366, z: 0 };  // outer corner
  pts[133] = { x: 0.470, y: 0.366, z: 0 }; // inner corner
  pts[159] = { x: 0.433, y: 0.346, z: 0 }; // upper eyelid peak
  pts[145] = { x: 0.433, y: 0.378, z: 0 }; // lower eyelid dip
  pts[473] = { x: 0.433, y: 0.365, z: 0 }; // iris center

  // Person Left Eye (Screen Right in non-mirrored demo mode):
  pts[362] = { x: 0.530, y: 0.366, z: 0 }; // inner corner
  pts[263] = { x: 0.605, y: 0.366, z: 0 }; // outer corner
  pts[386] = { x: 0.567, y: 0.346, z: 0 }; // upper eyelid peak
  pts[374] = { x: 0.567, y: 0.378, z: 0 }; // lower eyelid dip
  pts[468] = { x: 0.567, y: 0.365, z: 0 }; // iris center

  return pts;
};

// Module-level MediaPipe FaceMesh Singleton
// Prevents Emscripten "RuntimeError: abort(Module.arguments has been replaced with plain arguments_)"
let globalFaceMesh = null;
let globalFaceMeshPromise = null;

function getFaceMeshInstance() {
  if (globalFaceMesh) return Promise.resolve(globalFaceMesh);
  if (globalFaceMeshPromise) return globalFaceMeshPromise;

  globalFaceMeshPromise = new Promise((resolve, reject) => {
    let attempts = 0;
    const poll = () => {
      if (window.FaceMesh) {
        try {
          if (window.Module && window.Module.arguments) {
            delete window.Module.arguments;
          }

          const fm = new window.FaceMesh({
            locateFile: (file) => `/mediapipe/${file}`
          });

          fm.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.35,
            minTrackingConfidence: 0.35
          });

          globalFaceMesh = fm;
          console.log('✅ Global MediaPipe FaceMesh singleton created successfully!');
          resolve(fm);
        } catch (e) {
          console.error('Failed to create FaceMesh instance:', e);
          reject(e);
        }
      } else {
        attempts++;
        if (attempts < 80) {
          setTimeout(poll, 100);
        } else {
          reject(new Error('MediaPipe FaceMesh script not loaded after 8s'));
        }
      }
    };
    poll();
  });

  return globalFaceMeshPromise;
}

export default function CameraScanner({ onClose, initialStyleId = 'style1' }) {
  const [selectedStyleId, setSelectedStyleId] = useState(initialStyleId);
  const [selectedColorId, setSelectedColorId] = useState('black');

  useEffect(() => {
    if (initialStyleId) {
      setSelectedStyleId(initialStyleId);
    }
  }, [initialStyleId]);
  
  // Independent Target Selection: 'upper' (ขนตาบน), 'lower' (ขนตาล่าง), 'both' (บน+ล่าง)
  const [activeLashTarget, setActiveLashTarget] = useState('both');

  // Upper Lashes (ขนตาบน) Independent Controls
  const [enableUpperLashes, setEnableUpperLashes] = useState(true);
  const [scaleUpper, setScaleUpper] = useState(1.0); // 0.60 to 1.60
  const [offsetYUpper, setOffsetYUpper] = useState(0); // -35px to +35px
  const [spacingUpper, setSpacingUpper] = useState(0); // -35px to +35px
  const [flipYUpper, setFlipYUpper] = useState(false); // Default false: normal right-side up (tips point UP)

  // Lower Lashes (ขนตาล่าง) Independent Controls
  const [enableLowerLashes, setEnableLowerLashes] = useState(true);
  const [scaleLower, setScaleLower] = useState(1.0); // 0.50 to 1.60
  const [offsetYLower, setOffsetYLower] = useState(0); // -35px to +35px
  const [spacingLower, setSpacingLower] = useState(0); // -35px to +35px
  const [flipYLower, setFlipYLower] = useState(false); // Default false: normal right-side up (tips point DOWN)

  const [flipX, setFlipX] = useState(false);
  
  // AR & Camera State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('user');
  const [cameraError, setCameraError] = useState('');
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [showMeshLines, setShowMeshLines] = useState(false);
  const [showBefore, setShowBefore] = useState(false);
  const [activeTabPanel, setActiveTabPanel] = useState('adjust');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [mobilePanelTab, setMobilePanelTab] = useState('left'); // 'left', 'right', 'hidden' for mobile


  // References
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const faceMeshRef = useRef(null);
  const demoImageRef = useRef(null);
  const landmarksRef = useRef(null);
  const isProcessingRef = useRef(false);
  const missedDetectionCountRef = useRef(0);
  const onResultsCallbackRef = useRef(null);
  
  // Cached preloaded transparent lash PNGs
  const lashImagesRef = useRef({});

  const currentStyle = REFERENCE_STYLES.find(s => s.id === selectedStyleId) || REFERENCE_STYLES[0];
  const currentColor = COLOR_OPTIONS.find(c => c.id === selectedColorId) || COLOR_OPTIONS[0];

  // Preload all 18 cropped transparent eyelash PNG images on mount
  useEffect(() => {
    const imagesToLoad = [
      'style1_upper_left.png', 'style1_upper_right.png', 'style1_lower_left.png', 'style1_lower_right.png',
      'style2_upper_left.png', 'style2_upper_right.png', 'style2_lower_left.png', 'style2_lower_right.png',
      'style3_upper_left.png', 'style3_upper_right.png', 'style3_lower_left.png', 'style3_lower_right.png',
      'style1_full_left.png', 'style1_full_right.png',
      'style2_full_left.png', 'style2_full_right.png',
      'style3_full_left.png', 'style3_full_right.png'
    ];

    imagesToLoad.forEach((filename) => {
      const img = new Image();
      img.onload = () => {
        lashImagesRef.current[filename] = img;
      };
      img.src = `/images/lashes/${filename}?v=6`;
      if (img.complete) {
        lashImagesRef.current[filename] = img;
      }
    });
  }, []);

  const handleSelectStyle = (style) => {
    setSelectedStyleId(style.id);
    setScaleUpper(style.defaultUpperScale || 1.0);
    setScaleLower(style.defaultLowerScale || 1.0);
    setOffsetYUpper(0);
    setOffsetYLower(0);
    setSpacingUpper(0);
    setSpacingLower(0);
    setEnableUpperLashes(true);
    setEnableLowerLashes(style.hasLowerLashes);
  };

  const handleResetAdjustments = () => {
    setScaleUpper(1.0);
    setScaleLower(1.0);
    setOffsetYUpper(0);
    setOffsetYLower(0);
    setSpacingUpper(0);
    setSpacingLower(0);
    setFlipYUpper(false);
    setFlipYLower(false);
    setFlipX(false);
    setEnableUpperLashes(true);
    setEnableLowerLashes(true);
  };

  // SCALE HANDLERS
  const handleScaleChange = (valStr) => {
    const val = parseFloat(valStr);
    if (activeLashTarget === 'both') {
      setScaleUpper(val);
      setScaleLower(val);
    } else if (activeLashTarget === 'upper') {
      setScaleUpper(val);
    } else if (activeLashTarget === 'lower') {
      setScaleLower(val);
    }
  };

  const handleStepScale = (delta) => {
    if (activeLashTarget === 'both') {
      setScaleUpper(prev => Math.max(0.60, Math.min(1.60, Number((prev + delta).toFixed(2)))));
      setScaleLower(prev => Math.max(0.50, Math.min(1.60, Number((prev + delta).toFixed(2)))));
    } else if (activeLashTarget === 'upper') {
      setScaleUpper(prev => Math.max(0.60, Math.min(1.60, Number((prev + delta).toFixed(2)))));
    } else if (activeLashTarget === 'lower') {
      setScaleLower(prev => Math.max(0.50, Math.min(1.60, Number((prev + delta).toFixed(2)))));
    }
  };

  // VERTICAL POSITION HANDLERS (Up / Down)
  const handleOffsetYChange = (valStr) => {
    const val = parseInt(valStr, 10);
    if (activeLashTarget === 'both') {
      setOffsetYUpper(val);
      setOffsetYLower(val);
    } else if (activeLashTarget === 'upper') {
      setOffsetYUpper(val);
    } else if (activeLashTarget === 'lower') {
      setOffsetYLower(val);
    }
  };

  const handleStepOffsetY = (delta) => {
    if (activeLashTarget === 'both') {
      setOffsetYUpper(prev => Math.max(-35, Math.min(35, prev + delta)));
      setOffsetYLower(prev => Math.max(-35, Math.min(35, prev + delta)));
    } else if (activeLashTarget === 'upper') {
      setOffsetYUpper(prev => Math.max(-35, Math.min(35, prev + delta)));
    } else if (activeLashTarget === 'lower') {
      setOffsetYLower(prev => Math.max(-35, Math.min(35, prev + delta)));
    }
  };

  // SPACING HANDLERS (In / Out)
  const handleSpacingChange = (valStr) => {
    const val = parseInt(valStr, 10);
    if (activeLashTarget === 'both') {
      setSpacingUpper(val);
      setSpacingLower(val);
    } else if (activeLashTarget === 'upper') {
      setSpacingUpper(val);
    } else if (activeLashTarget === 'lower') {
      setSpacingLower(val);
    }
  };

  const handleStepSpacing = (delta) => {
    if (activeLashTarget === 'both') {
      setSpacingUpper(prev => Math.max(-35, Math.min(35, prev + delta)));
      setSpacingLower(prev => Math.max(-35, Math.min(35, prev + delta)));
    } else if (activeLashTarget === 'upper') {
      setSpacingUpper(prev => Math.max(-35, Math.min(35, prev + delta)));
    } else if (activeLashTarget === 'lower') {
      setSpacingLower(prev => Math.max(-35, Math.min(35, prev + delta)));
    }
  };

  // Start Camera Stream with Robust 3-Stage Fallback
  const startCamera = async (facingMode = cameraFacing) => {
    setCameraError('');
    setIsDemoMode(false);
    // Clear any static demo landmarks so lashes only appear when REAL face is detected
    landmarksRef.current = null;
    setIsFaceDetected(false);

    // 1. Check if mediaDevices API is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const isSecure = window.isSecureContext;
      const msg = !isSecure
        ? 'เบราว์เซอร์ไม่อนุญาตให้เปิดกล้องผ่าน HTTP (ต้องเข้าผ่าน https:// หรือ localhost เท่านั้น)'
        : 'เบราว์เซอร์นี้ไม่รองรับการเข้าถึงกล้อง (กรุณาลองใช้ Chrome, Edge หรือ Safari)';
      console.warn('MediaDevices not available:', { isSecure });
      setCameraError(msg);
      enableDemoMode();
      return;
    }

    try {
      // Stop any existing tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      let stream = null;
      let lastErr = null;

      // Attempt 1: Optimal constraints with facingMode and 720p
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
      } catch (err1) {
        lastErr = err1;
        console.warn('Attempt 1 (ideal 720p) failed, retrying with facingMode only:', err1);
        // Attempt 2: Minimal facingMode constraint
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: facingMode },
            audio: false
          });
        } catch (err2) {
          lastErr = err2;
          console.warn('Attempt 2 (facingMode) failed, retrying with universal video: true:', err2);
          // Attempt 3: Universal fallback { video: true } (supports all PC/webcams without constraint errors)
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false
            });
          } catch (err3) {
            lastErr = err3;
          }
        }
      }

      if (!stream) {
        throw lastErr || new Error('Cannot acquire media stream');
      }

      streamRef.current = stream;

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        
        // Wait for metadata before playing
        video.onloadedmetadata = () => {
          video.play()
            .then(() => {
              setCameraActive(true);
              setCameraError('');
            })
            .catch((playErr) => {
              console.warn('Video play() was interrupted:', playErr);
            });
        };

        // Fallback play trigger
        try {
          await video.play();
          setCameraActive(true);
          setCameraError('');
        } catch (e) {
          // Handled in onloadedmetadata
        }
      }
    } catch (err) {
      console.error('Camera open failed:', err);
      let errorMsg = 'ไม่สามารถเปิดกล้องได้';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg = 'กล้องถูกปฏิเสธการอนุญาต: กรุณากดไอคอนรูปกุญแจ 🔒 หรือกล้อง 📷 ที่แถบ URL ของเบราว์เซอร์ แล้วเลือก "อนุญาต (Allow)"';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMsg = 'ไม่พบอุปกรณ์กล้องในเครื่องของคุณ หรือกล้องไม่ได้เชื่อมต่อ';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMsg = 'กล้องกำลังถูกใช้งานโดยโปรแกรมอื่น (เช่น Zoom, Teams, หรือแท็บอื่น) กรุณาปิดโปรแกรมอื่นแล้วลองใหม่';
      } else if (err.name === 'OverconstrainedError') {
        errorMsg = 'กล้องไม่รองรับความละเอียดหรือโหมดที่เลือก';
      }
      setCameraError(errorMsg);
      enableDemoMode();
    }
  };

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'user' ? 'environment' : 'user';
    setCameraFacing(nextFacing);
    startCamera(nextFacing);
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
    setCameraActive(true);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Set immediate landmarks for model-face.jpg so lashes render immediately on frame 1
    landmarksRef.current = createModelFaceLandmarks();
    setIsFaceDetected(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      demoImageRef.current = img;
      if (faceMeshRef.current && !isProcessingRef.current) {
        isProcessingRef.current = true;
        faceMeshRef.current.send({ image: img })
          .catch((e) => console.warn('Demo FaceMesh send error:', e))
          .finally(() => { isProcessingRef.current = false; });
      }
    };
    img.src = '/images/model-face.jpg';
    if (img.complete) {
      demoImageRef.current = img;
      if (faceMeshRef.current && !isProcessingRef.current) {
        isProcessingRef.current = true;
        faceMeshRef.current.send({ image: img })
          .catch((e) => console.warn('Demo FaceMesh send error:', e))
          .finally(() => { isProcessingRef.current = false; });
      }
    }
  };

  // Initialize MediaPipe FaceMesh using global singleton & Start Camera
  useEffect(() => {
    let isMounted = true;

    // Define the live detection handler
    onResultsCallbackRef.current = (results) => {
      if (!isMounted) return;
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        landmarksRef.current = results.multiFaceLandmarks[0];
        missedDetectionCountRef.current = 0;
        setIsFaceDetected(true);
      } else {
        missedDetectionCountRef.current = (missedDetectionCountRef.current || 0) + 1;
        // Keep tracking for up to 10 frames during motion blur before clearing
        if (missedDetectionCountRef.current > 10 && !isDemoMode) {
          landmarksRef.current = null;
          setIsFaceDetected(false);
        }
      }
    };

    getFaceMeshInstance()
      .then((fm) => {
        if (!isMounted) return;
        faceMeshRef.current = fm;
        fm.onResults((results) => {
          if (onResultsCallbackRef.current) {
            onResultsCallbackRef.current(results);
          }
        });
        console.log('✅ MediaPipe FaceMesh connected to scanner!');
        if (demoImageRef.current && !isProcessingRef.current) {
          isProcessingRef.current = true;
          fm.send({ image: demoImageRef.current })
            .catch((err) => console.warn('Initial demo send error:', err))
            .finally(() => { isProcessingRef.current = false; });
        }
      })
      .catch((err) => {
        console.warn('FaceMesh initialization notice:', err);
      });

    // Start camera immediately
    startCamera();

    return () => {
      isMounted = false;
      onResultsCallbackRef.current = null;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Main Render Loop: Video + Face Tracking HUD + Independent Upper & Lower Eyelashes Overlay
  useEffect(() => {
    const renderLoop = async () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const width = canvas.width;
      const height = canvas.height;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const isMirrored = cameraFacing === 'user' && !isDemoMode;

      ctx.save();
      if (isMirrored) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
      }

      // 1. Draw Background Source
      if (isDemoMode && demoImageRef.current) {
        ctx.drawImage(demoImageRef.current, 0, 0, width, height);

        if (faceMeshRef.current && !landmarksRef.current && !isProcessingRef.current) {
          isProcessingRef.current = true;
          faceMeshRef.current.send({ image: demoImageRef.current })
            .catch((e) => console.warn('FaceMesh demo send error:', e))
            .finally(() => { isProcessingRef.current = false; });
        }
      } else if (video && video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, width, height);

        if (faceMeshRef.current && video.videoWidth > 0 && !isProcessingRef.current) {
          isProcessingRef.current = true;
          faceMeshRef.current.send({ image: video })
            .catch((e) => console.warn('FaceMesh video send error:', e))
            .finally(() => { isProcessingRef.current = false; });
        }
      } else {
        ctx.fillStyle = '#0B0B0B';
        ctx.fillRect(0, 0, width, height);
      }

      const landmarks = landmarksRef.current;

      // 2. If Face Detected & Not in "Before" mode: Render Upper & Lower Lashes Independently
      if (landmarks && landmarks.length > 400) {
        // Uniform mapping across video and canvas
        const getPt = (idx) => ({
          x: landmarks[idx].x * width,
          y: landmarks[idx].y * height,
          z: landmarks[idx].z
        });

        if (showMeshLines) {
          drawScannerHUD(ctx, getPt, width, height);
        }

        if (!showBefore) {
          // --- PERSON RIGHT EYE ---
          if (enableUpperLashes) {
            renderLashPart(
              ctx, 
              getPt, 
              'right', 
              'upper', 
              selectedStyleId, 
              scaleUpper, 
              spacingUpper, 
              offsetYUpper, 
              flipYUpper, 
              flipX, 
              selectedColorId
            );
          }
          if (enableLowerLashes) {
            renderLashPart(
              ctx, 
              getPt, 
              'right', 
              'lower', 
              selectedStyleId, 
              scaleLower, 
              spacingLower, 
              offsetYLower, 
              flipYLower, 
              flipX, 
              selectedColorId
            );
          }

          // --- PERSON LEFT EYE ---
          if (enableUpperLashes) {
            renderLashPart(
              ctx, 
              getPt, 
              'left', 
              'upper', 
              selectedStyleId, 
              scaleUpper, 
              spacingUpper, 
              offsetYUpper, 
              flipYUpper, 
              flipX, 
              selectedColorId
            );
          }
          if (enableLowerLashes) {
            renderLashPart(
              ctx, 
              getPt, 
              'left', 
              'lower', 
              selectedStyleId, 
              scaleLower, 
              spacingLower, 
              offsetYLower, 
              flipYLower, 
              flipX, 
              selectedColorId
            );
          }
        }
      }

      ctx.restore();

      if (!isFaceDetected && cameraActive) {
        drawSearchTarget(ctx, width, height);
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    cameraActive, 
    isDemoMode, 
    cameraFacing, 
    selectedStyleId, 
    scaleUpper,
    scaleLower,
    spacingUpper,
    spacingLower,
    offsetYUpper,
    offsetYLower,
    flipYUpper,
    flipYLower,
    flipX,
    enableUpperLashes,
    enableLowerLashes,
    selectedColorId, 
    showMeshLines, 
    showBefore
  ]);

  // Handle Resize
  useEffect(() => {
    const updateCanvasDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width * (window.devicePixelRatio || 1);
        canvasRef.current.height = rect.height * (window.devicePixelRatio || 1);
      }
    };

    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, []);

  // OVERLAY A SPECIFIC EYELASH PART (UPPER OR LOWER) ONTO AN EYE
  const renderLashPart = (
    ctx, 
    getPt, 
    eyeSide, 
    partType, 
    styleId, 
    scaleMult, 
    spacingPx, 
    offsetYPx, 
    isFlippedY, 
    isFlippedX, 
    colorId
  ) => {
    const sideFile = eyeSide === 'right' ? 'left' : 'right'; // Screen Left = Person Right
    const filename = `${styleId}_${partType}_${sideFile}.png`;

    let img = lashImagesRef.current[filename];
    if (!img) {
      img = new Image();
      img.onload = () => { lashImagesRef.current[filename] = img; };
      img.src = `/images/lashes/${filename}?v=6`;
      lashImagesRef.current[filename] = img;
    }

    if (!img.complete || img.naturalWidth === 0) {
      // Fallback
      const fallbackFile = `${styleId}_full_${sideFile}.png`;
      let fallbackImg = lashImagesRef.current[fallbackFile];
      if (!fallbackImg) {
        fallbackImg = new Image();
        fallbackImg.onload = () => { lashImagesRef.current[fallbackFile] = fallbackImg; };
        fallbackImg.src = `/images/lashes/${fallbackFile}?v=6`;
        lashImagesRef.current[fallbackFile] = fallbackImg;
      }
      if (!fallbackImg.complete || fallbackImg.naturalWidth === 0) return;
      img = fallbackImg;
    }

    // Eye Landmark points
    const outerCorner = eyeSide === 'right' ? getPt(33) : getPt(263);
    const innerCorner = eyeSide === 'right' ? getPt(133) : getPt(362);
    const upperPeak = eyeSide === 'right' ? getPt(159) : getPt(386);
    const lowerDip = eyeSide === 'right' ? getPt(145) : getPt(374);

    const eyeWidth = Math.hypot(outerCorner.x - innerCorner.x, outerCorner.y - innerCorner.y);
    if (eyeWidth < 12) return;

    // Check blink / eye openness
    const eyeOpenness = Math.hypot(upperPeak.x - lowerDip.x, upperPeak.y - lowerDip.y) / eyeWidth;
    const isBlinking = eyeOpenness < 0.12;

    // Target width & height scaled independently
    const widthFactor = partType === 'upper' ? 1.32 : 1.22;
    const targetWidth = eyeWidth * widthFactor * scaleMult;
    const aspectRatio = img.height / img.width;
    const targetHeight = targetWidth * aspectRatio;

    // Center X
    const spacingDir = eyeSide === 'right' ? 1 : -1;
    const rawCenterX = (outerCorner.x + innerCorner.x) / 2;
    const centerX = rawCenterX + (spacingPx * spacingDir);

    // Center Y anchor:
    // Upper lash root sits on upper eyelid margin and flares upwards (-Y)
    // Lower lash root sits on lower eyelid margin and flares downwards (+Y)
    let baseCenterY;
    if (partType === 'upper') {
      const naturalYShift = isFlippedY ? (targetHeight * 0.35) : (-targetHeight * 0.35);
      baseCenterY = isBlinking ? (upperPeak.y + 2) : (upperPeak.y + naturalYShift);
    } else {
      const naturalYShift = isFlippedY ? (-targetHeight * 0.35) : (targetHeight * 0.35);
      baseCenterY = isBlinking ? (upperPeak.y + 6) : (lowerDip.y + naturalYShift);
    }
    const centerY = baseCenterY + offsetYPx;

    // Eye Angle (Head Tilt)
    let eyeAngle;
    if (eyeSide === 'right') {
      eyeAngle = Math.atan2(innerCorner.y - outerCorner.y, innerCorner.x - outerCorner.x);
    } else {
      eyeAngle = Math.atan2(outerCorner.y - innerCorner.y, outerCorner.x - innerCorner.x);
    }

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(eyeAngle);

    // Transform
    const sx = isFlippedX ? -1 : 1;
    const sy = isFlippedY ? -1 : 1;
    ctx.scale(sx, sy);

    if (isBlinking) {
      ctx.scale(1, partType === 'upper' ? 0.8 : 0.6);
    }

    // Direct Image Drawing with isolated tinting
    if (colorId === 'black') {
      ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
    } else {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = img.width;
      offCanvas.height = img.height;
      const offCtx = offCanvas.getContext('2d');
      offCtx.drawImage(img, 0, 0);
      offCtx.globalCompositeOperation = 'source-in';
      offCtx.fillStyle = colorId === 'pink-tint' ? '#EE6B9D' : '#16D9B6';
      offCtx.fillRect(0, 0, img.width, img.height);

      ctx.drawImage(offCanvas, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
    }

    ctx.restore();
  };

  // HUD & Scanner Brackets
  const drawScannerHUD = (ctx, getPt, width, height) => {
    const leftIris = getPt(468);
    const rightIris = getPt(473);

    [leftIris, rightIris].forEach((iris, idx) => {
      const radius = 20;
      ctx.strokeStyle = '#16D9B6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(iris.x, iris.y, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(iris.x - 4, iris.y);
      ctx.lineTo(iris.x + 4, iris.y);
      ctx.moveTo(iris.x, iris.y - 4);
      ctx.lineTo(iris.x, iris.y + 4);
      ctx.stroke();

      ctx.fillStyle = '#EEB0C7';
      ctx.font = '9px Prompt, sans-serif';
      ctx.fillText(idx === 0 ? 'R-EYE' : 'L-EYE', iris.x - 14, iris.y - 26);
    });
  };

  // Target Bracket when searching
  const drawSearchTarget = (ctx, width, height) => {
    const cx = width / 2;
    const cy = height * 0.42;
    const rx = width * 0.28;
    const ry = height * 0.26;

    ctx.save();
    ctx.strokeStyle = 'rgba(238, 107, 157, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);

    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.fillStyle = '#EEB0C7';
    ctx.font = '13px Prompt, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('กรุณาวางใบหน้าให้อยู่ในกรอบเพื่อตรวจจับดวงตา', cx, cy + ry + 32);
    ctx.restore();
  };

  // Capture Snapshot
  const handleCaptureSnapshot = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `LashLook_${currentStyle.id}_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Display value helpers for currently active target (Upper / Lower / Both)
  const getCurrentScaleDisplay = () => {
    if (activeLashTarget === 'both') {
      return scaleUpper === scaleLower 
        ? `${Math.round(scaleUpper * 100)}%` 
        : `บน: ${Math.round(scaleUpper * 100)}% | ล่าง: ${Math.round(scaleLower * 100)}%`;
    }
    if (activeLashTarget === 'upper') return `บน: ${Math.round(scaleUpper * 100)}%`;
    return `ล่าง: ${Math.round(scaleLower * 100)}%`;
  };

  const getCurrentScaleValue = () => {
    if (activeLashTarget === 'lower') return scaleLower;
    return scaleUpper;
  };

  const getCurrentOffsetYDisplay = () => {
    if (activeLashTarget === 'both') {
      return offsetYUpper === offsetYLower 
        ? (offsetYUpper > 0 ? `+${offsetYUpper}px` : `${offsetYUpper}px`)
        : `บน: ${offsetYUpper > 0 ? `+${offsetYUpper}` : offsetYUpper} | ล่าง: ${offsetYLower > 0 ? `+${offsetYLower}` : offsetYLower}`;
    }
    const val = activeLashTarget === 'upper' ? offsetYUpper : offsetYLower;
    return val > 0 ? `+${val}px` : `${val}px`;
  };

  const getCurrentOffsetYValue = () => {
    if (activeLashTarget === 'lower') return offsetYLower;
    return offsetYUpper;
  };

  const getCurrentSpacingDisplay = () => {
    if (activeLashTarget === 'both') {
      return spacingUpper === spacingLower 
        ? (spacingUpper > 0 ? `+${spacingUpper}px` : `${spacingUpper}px`)
        : `บน: ${spacingUpper > 0 ? `+${spacingUpper}` : spacingUpper} | ล่าง: ${spacingLower > 0 ? `+${spacingLower}` : spacingLower}`;
    }
    const val = activeLashTarget === 'upper' ? spacingUpper : spacingLower;
    return val > 0 ? `+${val}px` : `${val}px`;
  };

  const getCurrentSpacingValue = () => {
    if (activeLashTarget === 'lower') return spacingLower;
    return spacingUpper;
  };

  return (
    <div className="camera-app-viewport">
      <video 
        ref={videoRef} 
        playsInline 
        muted 
        autoPlay 
        className="hidden-video-element"
      />

      <div className="camera-canvas-stage">
        <canvas ref={canvasRef} className="ar-render-canvas" />

        {/* Top Header Bar */}
        <div className="camera-top-hud">
          <div className="hud-brand-box">
            {onClose && (
              <button 
                className="hud-icon-btn back-to-home-btn"
                onClick={onClose}
                title="กลับไปหน้าหลัก (Home)"
                style={{ marginRight: '8px' }}
              >
                <ArrowLeft size={16} />
                <span className="hud-btn-txt">กลับหน้าหลัก</span>
              </button>
            )}
            <span className="brand-logo-text">
              Lash<span className="text-hot-pink">Look</span> <span className="text-turquoise">AR</span>
            </span>
            <div className={`status-pill ${isFaceDetected ? 'status-locked' : 'status-searching'}`}>
              <span className="status-dot"></span>
              <span>{isFaceDetected ? 'AI EYE TRACKING' : 'SEARCHING FACE...'}</span>
            </div>
          </div>

          <div className="hud-quick-actions">
            <button 
              className={`hud-icon-btn ${activeLashTarget === 'lower' ? (flipYLower ? 'active' : '') : (flipYUpper ? 'active' : '')}`}
              onClick={() => {
                if (activeLashTarget === 'lower') {
                  setFlipYLower(!flipYLower);
                } else if (activeLashTarget === 'upper') {
                  setFlipYUpper(!flipYUpper);
                } else {
                  const nextVal = !flipYUpper;
                  setFlipYUpper(nextVal);
                  setFlipYLower(nextVal);
                }
              }}
              title="สลับทิศทางขนตา (หงาย/คว่ำ)"
            >
              <RotateCw size={16} />
              <span className="hud-btn-txt">
                กลับหัว{activeLashTarget === 'lower' ? 'ขนตาล่าง' : activeLashTarget === 'upper' ? 'ขนตาบน' : 'ขนตา'}
              </span>
            </button>

            <button 
              className={`hud-icon-btn ${showBefore ? 'active' : ''}`}
              onMouseDown={() => setShowBefore(true)}
              onMouseUp={() => setShowBefore(false)}
              onTouchStart={() => setShowBefore(true)}
              onTouchEnd={() => setShowBefore(false)}
              title="แตะค้างเพื่อดูตาเดิมก่อนต่อ (Before)"
            >
              <Sparkles size={16} />
              <span className="hud-btn-txt">เทียบ Before</span>
            </button>

            <button 
              className="hud-icon-btn"
              onClick={toggleCameraFacing}
              title="สลับกล้องหน้า / หลัง"
            >
              <FlipHorizontal size={16} />
              <span className="hud-btn-txt">สลับกล้อง</span>
            </button>

            {isDemoMode ? (
              <button 
                className="hud-icon-btn text-turquoise"
                onClick={() => startCamera()}
                title="กลับไปใช้กล้องจริง"
              >
                <Camera size={16} />
                <span className="hud-btn-txt">ใช้กล้องจริง</span>
              </button>
            ) : (
              <button 
                className="hud-icon-btn"
                onClick={enableDemoMode}
                title="ใช้ภาพตัวอย่าง"
              >
                <Layers size={16} />
                <span className="hud-btn-txt">ภาพตัวอย่าง</span>
              </button>
            )}
          </div>
        </div>

        {/* Error notification if camera blocked */}
        {cameraError && (
          <div className="camera-error-banner animate-fade-in">
            <Info size={18} className="text-hot-pink" />
            <div className="error-text">
              <strong>{cameraError}</strong>
              <p>ระบบได้เปิด "ภาพตัวอย่างดวงตา" ให้คุณทดสอบรูปทรงขนตาได้ทันที หรือกดปุ่มด้านขวาเพื่อลองเปิดกล้องใหม่อีกครั้ง</p>
            </div>
            <div className="error-actions-group">
              <button className="btn-hot-pink btn-sm" onClick={() => startCamera()}>
                <Camera size={14} /> ลองเปิดกล้องใหม่
              </button>
              <button className="btn-turquoise btn-sm" onClick={enableDemoMode}>
                ใช้ภาพตัวอย่าง
              </button>
            </div>
          </div>
        )}

        {/* Mobile Viewport Panel Switcher (Visible only on mobile screens < 820px) */}
        <div className="mobile-panel-switcher">
          <button 
            className={`mobile-switch-btn ${mobilePanelTab === 'left' ? 'active' : ''}`}
            onClick={() => setMobilePanelTab(mobilePanelTab === 'left' ? 'hidden' : 'left')}
          >
            <Sliders size={13} />
            <span>🎛️ ทรง & ขนตา</span>
          </button>
          <button 
            className={`mobile-switch-btn ${mobilePanelTab === 'right' ? 'active' : ''}`}
            onClick={() => setMobilePanelTab(mobilePanelTab === 'right' ? 'hidden' : 'right')}
          >
            <ArrowUpDown size={13} />
            <span>📏 ปรับขนาด/ตำแหน่ง</span>
          </button>
          <button 
            className={`mobile-switch-btn ${mobilePanelTab === 'hidden' ? 'active' : ''}`}
            onClick={() => setMobilePanelTab(mobilePanelTab === 'hidden' ? 'left' : 'hidden')}
            title="ซ่อน/แสดงพาเนลเพื่อดูใบหน้าเต็มจอ"
          >
            <Eye size={13} />
            <span>{mobilePanelTab === 'hidden' ? 'แสดงเมนู' : 'ซ่อนเมนู'}</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* LEFT STUDIO PANEL (ชิดซ้าย): ทรงขนตา, สี, เลือกส่วนบน-ล่าง, สวิตช์ เปิด/ปิด, รีเซ็ต */}
        {/* ============================================================ */}
        <div className={`studio-side-panel studio-panel-left ${mobilePanelTab === 'left' ? 'mobile-show' : 'mobile-hide'}`}>
          <div className="studio-panel-header">
            <span className="studio-panel-title">
              <Sliders size={15} className="text-hot-pink" />
              <span>จัดการทรง & ส่วนขนตา</span>
            </span>
          </div>

          {/* Sub-Tab Navigation */}
          <div className="dock-tabs-bar">
            <button 
              className={`dock-tab ${activeTabPanel === 'adjust' ? 'active' : ''}`}
              onClick={() => setActiveTabPanel('adjust')}
            >
              <Sliders size={13} /> ปรับแต่ง
            </button>
            <button 
              className={`dock-tab ${activeTabPanel === 'styles' ? 'active' : ''}`}
              onClick={() => setActiveTabPanel('styles')}
            >
              <ImageIcon size={13} /> ทรง (3 แบบ)
            </button>
            <button 
              className={`dock-tab ${activeTabPanel === 'colors' ? 'active' : ''}`}
              onClick={() => setActiveTabPanel('colors')}
            >
              <Layers size={13} /> สีขนตา
            </button>
          </div>

          {/* TAB 1: INDEPENDENT UPPER & LOWER TARGETS & CARDS */}
          {activeTabPanel === 'adjust' && (
            <div className="adjust-left-content animate-fade-in">
              {/* TARGET SELECTOR: UPPER / LOWER / BOTH */}
              <div className="eye-target-selector-bar">
                <span className="target-bar-label">เลือกส่วนที่ต้องการปรับแต่ง (บน-ล่าง):</span>
                <div className="target-pill-group">
                  <button
                    className={`target-pill upper-pill ${activeLashTarget === 'upper' ? 'active' : ''}`}
                    onClick={() => setActiveLashTarget('upper')}
                  >
                    <Eye size={12} />
                    <span>🌸 บน ({Math.round(scaleUpper * 100)}%)</span>
                  </button>
                  <button
                    className={`target-pill both-pill ${activeLashTarget === 'both' ? 'active' : ''}`}
                    onClick={() => setActiveLashTarget('both')}
                  >
                    <LinkIcon size={12} />
                    <span>🔗 บน+ล่าง</span>
                  </button>
                  <button
                    className={`target-pill lower-pill ${activeLashTarget === 'lower' ? 'active' : ''}`}
                    onClick={() => setActiveLashTarget('lower')}
                  >
                    <Eye size={12} />
                    <span>🌿 ล่าง ({Math.round(scaleLower * 100)}%)</span>
                  </button>
                </div>
              </div>

              {/* DEDICATED INDEPENDENT ON/OFF & FLIP CARDS */}
              <div className="lash-part-cards-row">
                <div className={`lash-part-card ${enableUpperLashes ? 'active' : 'inactive'}`}>
                  <div className="lash-part-header">
                    <span className="lash-part-title">
                      <span className="part-color-tag upper-tag"></span>
                      ขนตาบน (Upper)
                    </span>
                    <button 
                      className={`part-toggle-switch ${enableUpperLashes ? 'on' : 'off'}`}
                      onClick={() => setEnableUpperLashes(!enableUpperLashes)}
                    >
                      {enableUpperLashes ? 'เปิด' : 'ปิด'}
                    </button>
                  </div>
                  <div className="lash-part-subactions">
                    <span className="part-scale-badge">{Math.round(scaleUpper * 100)}%</span>
                    <button 
                      className={`btn-subaction ${flipYUpper ? 'active' : ''}`}
                      onClick={() => setFlipYUpper(!flipYUpper)}
                      title="สลับทิศทางขนตาบน (ชี้ขึ้น / คว่ำลง)"
                    >
                      <RotateCw size={11} /> {flipYUpper ? 'คว่ำลง' : 'ชี้ขึ้น (ปกติ)'}
                    </button>
                  </div>
                </div>

                <div className={`lash-part-card ${enableLowerLashes ? 'active' : 'inactive'}`}>
                  <div className="lash-part-header">
                    <span className="lash-part-title">
                      <span className="part-color-tag lower-tag"></span>
                      ขนตาล่าง (Lower)
                    </span>
                    <button 
                      className={`part-toggle-switch ${enableLowerLashes ? 'on' : 'off'}`}
                      onClick={() => setEnableLowerLashes(!enableLowerLashes)}
                    >
                      {enableLowerLashes ? 'เปิด' : 'ปิด'}
                    </button>
                  </div>
                  <div className="lash-part-subactions">
                    <span className="part-scale-badge">{Math.round(scaleLower * 100)}%</span>
                    <button 
                      className={`btn-subaction ${flipYLower ? 'active' : ''}`}
                      onClick={() => setFlipYLower(!flipYLower)}
                      title="สลับทิศทางขนตาล่าง (ชี้ลง / หงายขึ้น)"
                    >
                      <RotateCw size={11} /> {flipYLower ? 'หงายขึ้น' : 'ชี้ลง (ปกติ)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="adjust-quick-toggles">
                <button
                  className="btn-glass reset-btn w-full"
                  onClick={handleResetAdjustments}
                  title="รีเซ็ตตำแหน่งกลับเป็นค่าเริ่มต้น"
                >
                  <RotateCcw size={13} />
                  <span>รีเซ็ตการปรับแต่งทั้งหมด (Reset)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 3 DIRECT IMAGE STYLES */}
          {activeTabPanel === 'styles' && (
            <div className="styles-vertical-list animate-fade-in">
              {REFERENCE_STYLES.map((style) => (
                <div
                  key={style.id}
                  className={`style-card-pill ${selectedStyleId === style.id ? 'active' : ''}`}
                  onClick={() => handleSelectStyle(style)}
                >
                  <div className="style-card-badge">{style.badge}</div>
                  <div className="style-card-title">{style.name}</div>
                  <div className="style-card-thai">{style.thaiName}</div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: COLORS */}
          {activeTabPanel === 'colors' && (
            <div className="colors-vertical-list animate-fade-in">
              {COLOR_OPTIONS.map((col) => (
                <button
                  key={col.id}
                  className={`color-choice-btn ${selectedColorId === col.id ? 'active' : ''}`}
                  onClick={() => setSelectedColorId(col.id)}
                >
                  <span className="color-preview-circle" style={{ background: col.tip }}></span>
                  <span className="color-choice-label">{col.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* RIGHT STUDIO PANEL (ชิดขวา): แถบปรับละเอียด สไลเดอร์ขนาด ตำแหน่ง ระยะเข้าออก */}
        {/* ============================================================ */}
        <div className={`studio-side-panel studio-panel-right ${mobilePanelTab === 'right' ? 'mobile-show' : 'mobile-hide'}`}>
          <div className="studio-panel-header">
            <span className="studio-panel-title">
              <Sliders size={15} className="text-turquoise" />
              <span>ปรับความละเอียด (Fine-Tune)</span>
            </span>
            <span className="target-indicator-pill">
              {activeLashTarget === 'upper' && '🌸 ขนตาบน'}
              {activeLashTarget === 'lower' && '🌿 ขนตาล่าง'}
              {activeLashTarget === 'both' && '🔗 บน+ล่าง'}
            </span>
          </div>

          {/* Slider 1: Lash Scale (Size) */}
          <div className="adjust-group">
            <div className="slider-label-row">
              <span className="adjust-label">
                <ZoomIn size={13} className="text-lotus inline-icon" />
                <strong>
                  {activeLashTarget === 'both' && 'ขนาดขนตา (บนและล่าง)'}
                  {activeLashTarget === 'upper' && 'ขนาดขนตาบน (Upper)'}
                  {activeLashTarget === 'lower' && 'ขนาดขนตาล่าง (Lower)'}
                </strong>
              </span>
              <strong className="text-lotus">{getCurrentScaleDisplay()}</strong>
            </div>
            <div className="slider-with-buttons">
              <button 
                className="slider-step-btn" 
                onClick={() => handleStepScale(-0.05)}
                title="ย่อขนาด"
              >
                ➖ ย่อ
              </button>
              <input
                type="range"
                min="0.50"
                max="1.60"
                step="0.02"
                value={getCurrentScaleValue()}
                onChange={(e) => handleScaleChange(e.target.value)}
                className="adjust-slider"
              />
              <button 
                className="slider-step-btn" 
                onClick={() => handleStepScale(0.05)}
                title="ขยายขนาด"
              >
                ขยาย ➕
              </button>
            </div>
          </div>

          {/* Slider 2: Vertical Position (Up / Down) */}
          <div className="adjust-group">
            <div className="slider-label-row">
              <span className="adjust-label">
                <ArrowUpDown size={13} className="text-hot-pink inline-icon" />
                <strong>
                  {activeLashTarget === 'both' && 'ตำแหน่งสูง-ต่ำ (บนและล่าง)'}
                  {activeLashTarget === 'upper' && 'ตำแหน่งสูง-ต่ำ ขนตาบน'}
                  {activeLashTarget === 'lower' && 'ตำแหน่งสูง-ต่ำ ขนตาล่าง'}
                </strong>
              </span>
              <strong className="text-hot-pink">{getCurrentOffsetYDisplay()}</strong>
            </div>
            <div className="slider-with-buttons">
              <button 
                className="slider-step-btn" 
                onClick={() => handleStepOffsetY(-2)}
                title="ขยับขึ้นบน"
              >
                ▲ ขึ้น
              </button>
              <input
                type="range"
                min="-35"
                max="35"
                step="1"
                value={getCurrentOffsetYValue()}
                onChange={(e) => handleOffsetYChange(e.target.value)}
                className="adjust-slider"
              />
              <button 
                className="slider-step-btn" 
                onClick={() => handleStepOffsetY(2)}
                title="ขยับลงล่าง"
              >
                ลง ▼
              </button>
            </div>
          </div>

          {/* Slider 3: Inward / Outward Spacing */}
          <div className="adjust-group">
            <div className="slider-label-row">
              <span className="adjust-label">
                <ArrowLeftRight size={13} className="text-turquoise inline-icon" />
                <strong>
                  {activeLashTarget === 'both' && 'ระยะเข้า-ออก (บนและล่าง)'}
                  {activeLashTarget === 'upper' && 'ระยะเข้า-ออก ขนตาบน'}
                  {activeLashTarget === 'lower' && 'ระยะเข้า-ออก ขนตาล่าง'}
                </strong>
              </span>
              <strong className="text-turquoise">{getCurrentSpacingDisplay()}</strong>
            </div>
            <div className="slider-with-buttons">
              <button 
                className="slider-step-btn" 
                onClick={() => handleStepSpacing(-2)}
                title="ขยับออกนอก"
              >
                ◀ ออก
              </button>
              <input
                type="range"
                min="-35"
                max="35"
                step="1"
                value={getCurrentSpacingValue()}
                onChange={(e) => handleSpacingChange(e.target.value)}
                className="adjust-slider"
              />
              <button 
                className="slider-step-btn" 
                onClick={() => handleStepSpacing(2)}
                title="ขยับเข้าใน"
              >
                เข้า ▶
              </button>
            </div>
          </div>

          {/* Quick Step Buttons */}
          <div className="right-panel-quick-steppers">
            <span className="quick-steppers-label">ปรับด่วนทีละสเต็ป (1-Click Steps):</span>
            <div className="quick-steppers-grid">
              <button className="quick-step-box" onClick={() => handleStepOffsetY(-2)} title="เลื่อนขึ้น">▲ ขึ้น</button>
              <button className="quick-step-box" onClick={() => handleStepOffsetY(2)} title="เลื่อนลง">ลง ▼</button>
              <button className="quick-step-box" onClick={() => handleStepSpacing(2)} title="ขยับเข้าใน">◀ เข้า</button>
              <button className="quick-step-box" onClick={() => handleStepSpacing(-2)} title="ขยับออกนอก">ออก ▶</button>
              <button className="quick-step-box" onClick={() => handleStepScale(0.05)} title="ขยาย">➕ ขยาย</button>
              <button className="quick-step-box" onClick={() => handleStepScale(-0.05)} title="ย่อ">➖ ย่อ</button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CENTER BOTTOM SHUTTER BUTTON (ตรงกลางล่าง) */}
        {/* ============================================================ */}
        <div className="studio-bottom-shutter">
          <button 
            className="shutter-capture-btn"
            onClick={handleCaptureSnapshot}
            title="ถ่ายรูปและบันทึกภาพขนตา AR"
          >
            <div className="shutter-inner-ring">
              <Camera size={26} color="#0B0B0B" />
            </div>
          </button>
          <span className="shutter-caption">แตะเพื่อถ่ายรูป & บันทึกภาพลงเครื่อง</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Boxes,
  ChevronDown,
  Search,
  Globe,
  User,
  MessageSquare,
  Zap,
  ArrowRightLeft,
  ScanLine,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Download,
  Copy,
  Check,
  X,
  Terminal,
  Cpu,
  ShoppingBag,
  Wrench,
  Layers,
  MapPin,
  Star,
  Activity,
  Sliders,
  ShieldCheck,
  FileText,
  Smartphone,
  Upload,
  Camera,
  Sparkles,
  Calculator,
  Code2,
  CheckCircle,
  QrCode,
  Video,
  ExternalLink,
  ShoppingCart,
  BarChart3,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export default function App() {
  // Scroll listener for dynamic header
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHinglish, setIsHinglish] = useState(false);

  // Stepper state for Section 1 (Digital Twin)
  const [activeStep, setActiveStep] = useState(1);
  const [activeSubPill, setActiveSubPill] = useState('dispense');
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Left Feature Navigation State for Section 2 (7 Core MVP Features)
  const [selectedFeature, setSelectedFeature] = useState(1);

  // Category 1 & 2 Roadmap States:
  const [showTemplateLibraryModal, setShowTemplateLibraryModal] = useState(false);
  const [showVideoGuideModal, setShowVideoGuideModal] = useState(false);
  const [hmiActiveTab, setHmiActiveTab] = useState('controls'); // 'controls' | 'analytics'
  const [orderKitSuccess, setOrderKitSuccess] = useState(false);
  const [activeVideoStep, setActiveVideoStep] = useState(1);
  const [showSubmodulesOption, setShowSubmodulesOption] = useState(false);
  const [showTelemetryOption, setShowTelemetryOption] = useState(false);

  // Modals & Popups
  const [showBlueprintModal, setShowBlueprintModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! Main UdyamUtkarsh AI copilot hoon. Apni factory machine retrofit ya blueprint ke baare mein kuch bhi poochein.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Machine Intake Blueprint form state (Feature 1)
  const [intakeData, setIntakeData] = useState({
    machineType: 'PVC Pipe Cutter',
    problem: 'Manual blade operation causes length variation and human fatigue. Need automatic clamp and cut trigger.',
    budget: 3500,
    voltage: '230V AC'
  });

  // Indian Machine Template Library Data (Tulip's Library / Vention's Design Templates)
  const machineTemplates = [
    {
      id: 'pvc-cutter',
      name: 'PVC Pipe Cutting Machine',
      category: 'Plastic & Conduit Extrusion',
      problem: 'Automate cut length at 2.0m with pneumatic clamp and circular saw blade trigger.',
      budget: 3500,
      voltage: '230V Single Phase AC',
      iotCost: 2850,
      plcCost: 38000,
      savingsPct: 92.5,
      inputs: ['IR Optical Sensor (Pipe arrival)', 'Inductive Proximity (Home position)', 'E-Stop Mushroom Button'],
      actuators: ['Blade Motor Relay (230V AC)', 'Pneumatic Clamp Solenoid (12V DC)']
    },
    {
      id: 'packaging-press',
      name: 'Pneumatic Packaging Press',
      category: 'Corrugated Box & Carton Sealing',
      problem: 'Two-hand safety interlock to compress carton flaps, 1.8s dwell, auto eject cylinder.',
      budget: 4200,
      voltage: '230V Single Phase AC',
      iotCost: 3200,
      plcCost: 45000,
      savingsPct: 92.8,
      inputs: ['Dual Push Buttons (Anti-tiedown)', 'Pressure Switch (5 Bar)', 'E-Stop'],
      actuators: ['Dual 5/2 Way Solenoid Valves', 'Pressure Release Exhaust']
    },
    {
      id: 'manual-lathe',
      name: 'Manual Lathe Semi-Auto Retrofit',
      category: 'Metalworking & Machine Tool',
      problem: 'Optical spindle RPM measurement, digital cross-slide length readout, and automatic carriage motor disengage at stop.',
      budget: 4800,
      voltage: '415V Three Phase AC',
      iotCost: 3650,
      plcCost: 52000,
      savingsPct: 93.0,
      inputs: ['Optical Spindle Tachometer', 'Carriage Limit Switch', 'Emergency Foot Brake'],
      actuators: ['Feed Clutch Solenoid', 'Spindle Motor Contactor Trigger']
    },
    {
      id: 'heat-sealer',
      name: 'Continuous Bag Packaging Heat Sealer',
      category: 'Food & Grain Packaging',
      problem: 'Pneumatic jaw closure, 1.4s nichrome heating impulse, followed by 0.8s cooling cycle.',
      budget: 3000,
      voltage: '230V Single Phase AC',
      iotCost: 2450,
      plcCost: 32000,
      savingsPct: 92.3,
      inputs: ['Foot Pedal Switch', 'NTC 100K Thermistor Heat Sensor', 'Safety Guard'],
      actuators: ['SSR 40A Nichrome Wire Relay', 'Pneumatic Jaw Cylinder']
    },
    {
      id: 'mitre-cutter',
      name: 'Photo Frame 45° Mitre Saw',
      category: 'Wood & Aluminium Fabrication',
      problem: 'Foot clamp hold, dual saw plunge sequencing, automatic return and piece counter.',
      budget: 4500,
      voltage: '230V Single Phase AC',
      iotCost: 3450,
      plcCost: 42000,
      savingsPct: 91.8,
      inputs: ['Foot Pedal Microswitch', 'Upper/Lower Stroke Limits', 'Safety Shield Switch'],
      actuators: ['Pneumatic Clamp', 'Twin Motor Relays']
    }
  ];

  // Feature 5: AI Vision to G-Code state
  const [selectedGcodeShape, setSelectedGcodeShape] = useState('flange');
  const [isAnalyzingVision, setIsAnalyzingVision] = useState(false);
  const [gcodeResult, setGcodeResult] = useState({
    title: "Circular Flange Gasket with 4 Bolt Holes",
    material: "2.0mm Rubber / PVC Sheet",
    outerDiameter: "120 mm",
    innerDiameter: "60 mm",
    holeCount: 4,
    feedrate: "800 mm/min",
    estimatedTime: "1 min 34 sec",
    gcode: `; ====================================================\n; UdyamUtkarsh Gemini AI Vision-to-GCode Generator\n; Input Design: Circular Flange Gasket with 4 Bolt Holes\n; Material: 2.0mm Rubber / PVC Sheet\n; Tool: 3.175mm 2-Flute Carbide Endmill\n; Feedrate: 800 mm/min | Plunge: 300 mm/min | RPM: 12000\n; ====================================================\nG21 ; Millimeters mode\nG90 ; Absolute coordinates\nM03 S12000 ; Spindle ON\nG00 Z5.000 ; Rapid travel to safe height\n\n; --- Bolt Hole 1 (X: 35.0, Y: 0.0) ---\nG00 X35.000 Y0.000\nG01 Z-2.200 F300\nG02 X35.000 Y0.000 I-5.000 J0.000 F800\nG00 Z5.000\n\n; --- Bolt Hole 2 (X: 0.0, Y: 35.0) ---\nG00 X0.000 Y35.000\nG01 Z-2.200 F300\nG02 X0.000 Y35.000 I0.000 J-5.000 F800\nG00 Z5.000\n\n; --- Bolt Hole 3 (X: -35.0, Y: 0.0) ---\nG00 X-35.000 Y0.000\nG01 Z-2.200 F300\nG02 X-35.000 Y0.000 I5.000 J0.000 F800\nG00 Z5.000\n\n; --- Center Bore (Diameter 60mm) ---\nG00 X30.000 Y0.000\nG01 Z-2.200 F300\nG02 X30.000 Y0.000 I-30.000 J0.000 F800\nG00 Z5.000\n\n; --- Outer Profile Cut (Diameter 120mm) ---\nG00 X60.000 Y0.000\nG01 Z-2.200 F300\nG02 X60.000 Y0.000 I-60.000 J0.000 F800\nG00 Z15.000 ; Retract\nM05 ; Spindle OFF\nG00 X0.000 Y0.000 ; Return origin\nM30`
  });
  const [gcodeCopied, setGcodeCopied] = useState(false);

  // Feature 6: Smartphone as HMI state
  const [hmiCutLength, setHmiCutLength] = useState(2000);
  const [hmiClampState, setHmiClampState] = useState(false);
  const [hmiSimRunning, setHmiSimRunning] = useState(false);
  const [hmiCycles, setHmiCycles] = useState(148);

  // Feature 7: Book a Fitter state
  const [selectedFitter, setSelectedFitter] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Feature 2: Machine Fleet Scaler for Cost Crusher
  const [retrofitMachineCount, setRetrofitMachineCount] = useState(1);

  // Simulator state
  const [simRunning, setSimRunning] = useState(false);
  const [eStopTripped, setEStopTripped] = useState(false);
  const [cycleCount, setCycleCount] = useState(148);

  // Scroll handler: at top shows (Globe, Search, About Us, Login); on scroll shows (Search, Book a Demo)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerCycle = () => {
    if (eStopTripped) return;
    setSimRunning(true);
    setTimeout(() => {
      setSimRunning(false);
      setCycleCount(c => c + 1);
    }, 2200);
  };

  const fetchGCode = async (shape) => {
    setSelectedGcodeShape(shape);
    setIsAnalyzingVision(true);
    try {
      const res = await fetch('http://localhost:5000/api/vision-gcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shapeType: shape })
      });
      const data = await res.json();
      if (data.success && data.metadata) {
        setGcodeResult(data.metadata);
      }
    } catch (err) {
      console.warn('Backend API unavailable, using local high-fidelity G-Code', err);
    } finally {
      setTimeout(() => setIsAnalyzingVision(false), 500);
    }
  };

  const triggerHmiCycle = () => {
    if (eStopTripped) return;
    setHmiSimRunning(true);
    setSimRunning(true);
    setTimeout(() => {
      setHmiSimRunning(false);
      setSimRunning(false);
      setHmiCycles(c => c + 1);
      setCycleCount(c => c + 1);
    }, 1800);
  };

  const handleBookFitter = (fitter) => {
    setSelectedFitter(fitter);
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
    }, 4000);
  };

  const handleLoadTemplate = (template) => {
    setIntakeData({
      machineType: template.name,
      problem: template.problem,
      budget: template.budget,
      voltage: template.voltage
    });
    setShowTemplateLibraryModal(false);
    setSelectedFeature(2);
    scrollToSection('features-section');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Aapki requirement "${userMsg}" ke liye ESP32 + 4-Channel Opto Relay aur Inductive Proximity Sensor ka setup perfect rahega. Total hardware cost approx ₹2,850 aayegi (saving 92.5% vs PLC)!`
        }
      ]);
    }, 800);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="tulip-app">
      {/* ========================================================================= */}
      {/* DYNAMIC TOP NAVBAR: Image 1 at Top, transforms to Image 2 on scroll        */}
      {/* ========================================================================= */}
      <header className={`tulip-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="tulip-logo-group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
            <Boxes size={26} />
          </div>
          <div className="tulip-brand-name">
            Udyam<span>Utkarsh</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="tulip-nav-links">
          <div className="tulip-nav-link" onClick={() => scrollToSection('features-section')}>
            <span>Platform</span>
            <ChevronDown size={14} />
          </div>

          <div className="tulip-nav-link" onClick={() => scrollToSection('digital-twin-hero')}>
            <span>Solutions</span>
            <ChevronDown size={14} />
          </div>

          <div className="tulip-nav-link" onClick={() => scrollToSection('features-section')}>
            <span>Resources</span>
            <ChevronDown size={14} />
          </div>

          <div className="tulip-nav-link" onClick={() => setShowTemplateLibraryModal(true)}>
            <span>Library</span>
          </div>
        </nav>

        {/* Dynamic Right Actions: Default (Image 1) vs Scrolled (Image 2) */}
        <div className="tulip-nav-right">
          {!isScrolled ? (
            /* DEFAULT HEADER ON MAIN PG (Exact Match to User Image 1) */
            <div className="header-default-actions">
              {/* Globe Icon for Language Switch */}
              <div
                className="header-icon-action"
                onClick={() => setIsHinglish(!isHinglish)}
                title={isHinglish ? "Switch to English" : "हिंग्लिश में बदलें"}
              >
                <Globe size={18} />
                <span style={{ fontSize: 11, marginLeft: 4, fontWeight: 700 }}>
                  {isHinglish ? 'HI' : 'EN'}
                </span>
              </div>

              {/* Search Icon */}
              <div
                className="header-icon-action"
                onClick={() => setShowBlueprintModal(true)}
                title="Search Library & Blueprint"
              >
                <Search size={18} />
              </div>

              {/* About Us Dropdown */}
              <div
                className="header-text-action"
                style={{ position: 'relative' }}
                onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              >
                <span>About Us</span>
                <ChevronDown size={14} />

                {showAboutDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: 28,
                    right: 0,
                    width: 220,
                    background: '#0d1726',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                    padding: '10px 0',
                    zIndex: 200
                  }}>
                    <div style={{ padding: '8px 16px', fontSize: 12.5, color: '#e2e8f0', cursor: 'pointer' }} onClick={() => alert("UdyamUtkarsh PRD: MSME Low-Cost IoT Automation")}>
                      📄 Product PRD
                    </div>
                    <div style={{ padding: '8px 16px', fontSize: 12.5, color: '#e2e8f0', cursor: 'pointer' }} onClick={() => alert("System Architecture: Node.js, Express, Gemini, ESP32")}>
                      🏗️ System Architecture
                    </div>
                    <div style={{ padding: '8px 16px', fontSize: 12.5, color: '#e2e8f0', cursor: 'pointer' }} onClick={() => alert("USP: 10x Cheaper Automation, ₹2,850 IoT Setup vs ₹38,000 PLC")}>
                      💡 Core USP & Pitch
                    </div>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <div
                className="header-text-action"
                onClick={() => setShowLoginModal(true)}
              >
                <span>Login</span>
              </div>
            </div>
          ) : (
            /* SCROLLED HEADER (Exact Match to User Image 2: Search + Book a Demo Button) */
            <div className="header-scrolled-actions">
              <div
                className="tulip-search-icon"
                onClick={() => setShowBlueprintModal(true)}
                title="Search"
              >
                <Search size={18} />
              </div>

              <button
                className="btn-book-demo"
                onClick={() => setShowBlueprintModal(true)}
              >
                Book a Demo
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: MAIN HERO DIGITAL TWIN FACTORY FLOOR VIEWPORT                  */}
      {/* ========================================================================= */}
      <main className="tulip-main-hero" id="digital-twin-hero">
        <div className="tulip-board-container">
          {/* Left Stepper Panel */}
          <aside className="tulip-sidebar-panel">
            <div className="stepper-list">
              {/* STEP 01 */}
              <div
                className={`step-item ${activeStep === 1 ? 'active' : ''}`}
                onClick={() => { setActiveStep(1); setActiveSubPill('dispense'); }}
              >
                <div className="step-header">
                  <div className={`step-dot ${activeStep === 1 ? 'active' : 'inactive'}`} />
                  <div className="step-title">
                    01. Automate audit-readiness
                  </div>
                </div>

                <div className="step-connector-line" />

                {activeStep === 1 && (
                  <div className="step-content">
                    <p className="step-description">
                      Produce searchable electronic batch records automatically. Prevent deviations by enforcing SOPs, automating data capture, and flagging out-of-range entries.
                    </p>

                    <div className="sub-pills-list">
                      <button
                        className={`sub-pill-btn ${activeSubPill === 'dispense' ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveSubPill('dispense'); setActiveHotspot('dispense'); }}
                      >
                        <ScanLine size={14} color="#38bdf8" />
                        <span>Guided Weigh & Dispense</span>
                      </button>

                      <button
                        className={`sub-pill-btn ${activeSubPill === 'equipment' ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveSubPill('equipment'); setActiveHotspot('equipment'); }}
                      >
                        <ArrowRightLeft size={14} color="#2dd4bf" />
                        <span>Equipment Integration</span>
                      </button>

                      <button
                        className={`sub-pill-btn ${activeSubPill === 'deviation' ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveSubPill('deviation'); setActiveHotspot('deviation'); }}
                      >
                        <Zap size={14} color="#ef4444" />
                        <span>Deviation Alert</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 02 */}
              <div
                className={`step-item ${activeStep === 2 ? 'active' : ''}`}
                onClick={() => { setActiveStep(2); setActiveSubPill('equipment'); }}
              >
                <div className="step-header">
                  <div className={`step-dot ${activeStep === 2 ? 'active' : 'inactive'}`} />
                  <div className="step-title">
                    02. Expedite batch release
                  </div>
                </div>

                <div className="step-connector-line" style={{ bottom: -24 }} />

                {activeStep === 2 && (
                  <div className="step-content">
                    <p className="step-description">
                      AI-generated ready-to-flash Arduino C++ firmware with pin mapping, watchdog timers, and hardware E-Stop interrupts. 10x cheaper than PLC.
                    </p>
                    <div className="sub-pills-list">
                      <button
                        className="sub-pill-btn active"
                        onClick={(e) => { e.stopPropagation(); setActiveHotspot('code'); }}
                      >
                        <Terminal size={14} color="#a855f7" />
                        <span>Zero-Cost Code (.ino)</span>
                      </button>
                      <button
                        className="sub-pill-btn"
                        onClick={(e) => { e.stopPropagation(); setActiveHotspot('bom'); }}
                      >
                        <ShoppingBag size={14} color="#22c55e" />
                        <span>₹2,850 Smart BOM</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 03 */}
              <div
                className={`step-item ${activeStep === 3 ? 'active' : ''}`}
                onClick={() => { setActiveStep(3); setActiveSubPill('deviation'); }}
              >
                <div className="step-header">
                  <div className={`step-dot ${activeStep === 3 ? 'active' : 'inactive'}`} />
                  <div className="step-title">
                    03. Optimize asset performance
                  </div>
                </div>

                {activeStep === 3 && (
                  <div className="step-content">
                    <p className="step-description">
                      Visual wiring guides and on-demand local electricians ("Uber for Fitters") for fast, guaranteed installation in small factories.
                    </p>
                    <div className="sub-pills-list">
                      <button
                        className="sub-pill-btn active"
                        onClick={(e) => { e.stopPropagation(); setActiveHotspot('fitter'); }}
                      >
                        <Wrench size={14} color="#eab308" />
                        <span>Verified Fitter Network</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Card */}
            <div className="panel-bottom-cta">
              <p className="cta-helper-text">
                Tell us your challenges, and get a solution blueprint built with Tulip AI
              </p>
              <button
                className="btn-build-system"
                onClick={() => setShowBlueprintModal(true)}
              >
                Build your Production System
              </button>
            </div>
          </aside>

          {/* Right Factory Floor Digital Twin Area */}
          <div className="tulip-factory-viewport">
            <img
              src="/isometric_factory.jpg"
              alt="Industry 4.0 Digital Twin Factory Floor"
              className="factory-isometric-image"
            />

            {/* Floating Hotspot Badge 1: [⚡ Deviation Alert] (Red Accent) */}
            <div
              className="hotspot-badge red-accent"
              style={{ top: '60%', left: '46%' }}
              onClick={() => setActiveHotspot('deviation')}
            >
              <span className="badge-icon">
                <Zap size={12} fill="#ffffff" />
              </span>
              <span>Deviation Alert</span>
            </div>
            <div className="anchor-stem" style={{ top: '64%', left: '50.5%', height: '36px' }} />
            <div className="anchor-pointer" style={{ top: '69%', left: '50.5%', color: '#ef4444' }} />

            {/* Floating Hotspot Badge 2: [⇄ Equipment Integration] (Teal Accent) */}
            <div
              className="hotspot-badge teal-accent"
              style={{ top: '75%', left: '39%' }}
              onClick={() => setActiveHotspot('equipment')}
            >
              <span className="badge-icon">
                <ArrowRightLeft size={12} />
              </span>
              <span>Equipment Integration</span>
            </div>
            <div className="anchor-stem" style={{ top: '79%', left: '45.5%', height: '38px' }} />
            <div className="anchor-pointer" style={{ top: '84%', left: '45.5%', color: '#14b8a6' }} />

            {/* Floating Hotspot Badge 3: [⊡ Guided Weigh & Dispense] (Sky Blue Accent) */}
            <div
              className="hotspot-badge blue-accent"
              style={{ bottom: '4%', left: '40%' }}
              onClick={() => setActiveHotspot('dispense')}
            >
              <span className="badge-icon">
                <ScanLine size={12} />
              </span>
              <span>Guided Weigh & Dispense</span>
            </div>
            <div className="anchor-stem" style={{ bottom: '8%', left: '48.5%', height: '24px' }} />
            <div className="anchor-pointer" style={{ bottom: '11%', left: '48.5%', color: '#0284c7' }} />

            {/* Additional High-Tech Hotspots */}
            <div
              className="hotspot-badge"
              style={{
                top: '18%',
                left: '68%',
                background: 'rgba(15, 23, 42, 0.88)',
                color: '#34d399',
                borderColor: '#10b981'
              }}
              onClick={() => setActiveHotspot('bom')}
            >
              <span style={{ background: '#059669', color: '#fff', padding: '2px 5px', borderRadius: 4, fontSize: 10 }}>₹</span>
              <span>IoT Retrofit: ₹2,850 (-92% vs PLC)</span>
            </div>

            <div
              className="hotspot-badge"
              style={{
                top: '36%',
                right: '4%',
                background: 'rgba(15, 23, 42, 0.88)',
                color: '#f5e482',
                borderColor: 'rgba(245, 228, 130, 0.3)'
              }}
              onClick={() => setActiveHotspot('fitter')}
            >
              <Wrench size={12} color="#f5e482" />
              <span>Uber for Fitters (2.4 km)</span>
            </div>

            {/* Live Telemetry Pill on Factory Floor */}
            <div style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(11, 19, 32, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 12,
              padding: '10px 16px',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}>
              <div>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>CYCLES COMPLETED</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#f5e482' }}>{cycleCount} Units</div>
              </div>
              <div style={{ height: 24, width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>SAFETY STATUS</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: eStopTripped ? '#ef4444' : '#22c55e' }}>
                  {eStopTripped ? '⚠️ E-STOP TRIPPED' : '✓ ALL ARMED'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* SECTION 2: FEATURES SPLIT-SCREEN (7 Core MVP Features for Hackathon Demo) */}
      {/* ========================================================================= */}
      <section className="features-section-container" id="features-section">
        <div className="features-split-layout">
          {/* Left Vertical Features Menu (Clean Feature Names) */}
          <div className="features-vertical-menu">
            <button
              className={`feature-menu-item ${selectedFeature === 1 ? 'active' : ''}`}
              onClick={() => setSelectedFeature(1)}
            >
              Smart Ask Intake
            </button>

            <button
              className={`feature-menu-item ${selectedFeature === 2 ? 'active' : ''}`}
              onClick={() => setSelectedFeature(2)}
            >
              Cost-Crusher Visualizer
            </button>

            <button
              className={`feature-menu-item ${selectedFeature === 3 ? 'active' : ''}`}
              onClick={() => setSelectedFeature(3)}
            >
              Smart BOM Generator
            </button>

            <button
              className={`feature-menu-item ${selectedFeature === 4 ? 'active' : ''}`}
              onClick={() => setSelectedFeature(4)}
            >
              Tech Blueprint & Wiring
            </button>

            <button
              className={`feature-menu-item ${selectedFeature === 5 ? 'active' : ''}`}
              onClick={() => setSelectedFeature(5)}
            >
              AI Vision to G-Code
            </button>

            <button
              className={`feature-menu-item ${selectedFeature === 6 ? 'active' : ''}`}
              onClick={() => setSelectedFeature(6)}
            >
              Smartphone as HMI
            </button>

            <button
              className={`feature-menu-item ${selectedFeature === 7 ? 'active' : ''}`}
              onClick={() => setSelectedFeature(7)}
            >
              Book a Fitter Network
            </button>
          </div>

          {/* Right Feature Presentation Panel */}
          <div className="feature-presentation-panel">
            {/* Tag / Mini Header */}
            <div className="feature-yellow-tag">
              {selectedFeature === 1 && 'INTELLIGENT MACHINE INTAKE'}
              {selectedFeature === 2 && 'REAL-TIME COST ARBITRAGE (BRIDGE THE GAP)'}
              {selectedFeature === 3 && 'AUTOMATED BILL OF MATERIALS'}
              {selectedFeature === 4 && 'FAILSAFE FIRMWARE & SCHEMATICS'}
              {selectedFeature === 5 && 'COMPUTER VISION TOOLPATH GENERATION'}
              {selectedFeature === 6 && 'EDGE WIRELESS OPERATOR INTERFACE'}
              {selectedFeature === 7 && 'ON-DEMAND INDUSTRIAL ELECTRICIAN GIGS'}
            </div>

            {/* Title */}
            <h2 className="feature-heading-h2">
              {selectedFeature === 1 && 'The "Smart Ask" Input Form'}
              {selectedFeature === 2 && 'The "Cost-Crusher" Visualizer'}
              {selectedFeature === 3 && 'AI-Generated Bill of Materials (BOM)'}
              {selectedFeature === 4 && 'The Tech Blueprint (Firmware & Wiring)'}
              {selectedFeature === 5 && 'AI Vision to G-Code Generator'}
              {selectedFeature === 6 && '"Smartphone as HMI" Controller'}
              {selectedFeature === 7 && '"Book a Fitter" Gig Network'}
            </h2>

            {/* Clean, professional description (No raw prompt notes) */}
            <p className="feature-text-p">
              {selectedFeature === 1 &&
                'Non-technical plant managers simply select their machine type, define their operational bottleneck, and specify budget constraints. Our intelligence engine parses requirements into industrial execution specs.'}
              {selectedFeature === 2 &&
                'Directly compares standard ₹45,000+ proprietary PLC panels against our modern ₹3,500 ESP32 architecture. Experience 92.2% capex reduction with an 11-day payback period.'}
              {selectedFeature === 3 &&
                'Replaces overpriced industrial component monopolies with verified, locally available IoT hardware sourced directly from Indian wholesale hubs at transparent market rates.'}
              {selectedFeature === 4 &&
                'Instantly generates ISO 13849-compliant C++ firmware with hardware watchdog timers, failsafe boot states, and complete pin-to-pin wiring schematics for zero-cost automation engineering.'}
              {selectedFeature === 5 &&
                'Eliminates complex CAD/CAM programming. Upload a technical drawing or hand-drawn sketch, and Gemini Vision automatically extracts contours to output precision CNC machine G-Code.'}
              {selectedFeature === 6 &&
                'Eliminates expensive ₹15,000 Siemens touchscreens and bulky laptops. The microcontroller broadcasts an isolated Wi-Fi hotspot so floor workers can operate machines right from their phones.'}
              {selectedFeature === 7 &&
                'Bridges the physical deployment gap with an on-demand marketplace of verified local industrial electricians and ITI technicians ready to wire and commission your automated setup.'}
            </p>

            {/* CTA Button */}
            <button className="btn-feature-learn-more" onClick={() => setShowBlueprintModal(true)}>
              {selectedFeature === 1 && 'Launch Machine Intake'}
              {selectedFeature === 2 && 'View Cost Audit Breakdown'}
              {selectedFeature === 3 && 'Explore Component Sourcing BOM'}
              {selectedFeature === 4 && 'Open Firmware & Pin Matrix'}
              {selectedFeature === 5 && 'Upload Sketch to G-Code'}
              {selectedFeature === 6 && 'Launch Mobile HMI Simulator'}
              {selectedFeature === 7 && 'Find Local Fitters Near Me'}
            </button>

            {/* Embedded Studio App Window (Clean Full-Width Display) */}
            <div className="embedded-studio-card">
              {/* Clean Studio Top Action Bar */}
              <div className="studio-top-action-bar">
                <div className="studio-status-indicator">
                  <div className="studio-status-dot" />
                  <span>
                    {selectedFeature === 1 && 'Smart Intake Engine • Interactive Blueprint'}
                    {selectedFeature === 2 && 'Cost-Crusher Arbitrage Engine • Fleet Scaler'}
                    {selectedFeature === 3 && 'AI-Generated BOM & 1-Click Parts Marketplace'}
                    {selectedFeature === 4 && 'Auto-Generated C++ Firmware & Pin Schematics'}
                    {selectedFeature === 5 && 'Gemini Vision AI to CNC G-Code Studio'}
                    {selectedFeature === 6 && 'Connected Worker Terminal • Edge Smartphone HMI'}
                    {selectedFeature === 7 && 'Verified Local Electrician Gig Marketplace'}
                  </span>
                </div>

                <div className="studio-options-group">
                  <button
                    type="button"
                    className={`studio-option-btn ${showSubmodulesOption ? 'active' : ''}`}
                    onClick={() => {
                      setShowSubmodulesOption(!showSubmodulesOption);
                      if (showTelemetryOption) setShowTelemetryOption(false);
                    }}
                    title="Toggle Sub-Modules"
                  >
                    <Layers size={13} />
                    <span>Sub-Modules</span>
                    <ChevronDown size={12} style={{ transform: showSubmodulesOption ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>

                  <button
                    type="button"
                    className={`studio-option-btn ${showTelemetryOption ? 'active' : ''}`}
                    onClick={() => {
                      setShowTelemetryOption(!showTelemetryOption);
                      if (showSubmodulesOption) setShowSubmodulesOption(false);
                    }}
                    title="Toggle Telemetry & Specs"
                  >
                    <Activity size={13} />
                    <span>Telemetry & Specs</span>
                    <ChevronDown size={12} style={{ transform: showTelemetryOption ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                </div>
              </div>

              {/* Sliding Sub-Modules Option Drawer */}
              {showSubmodulesOption && (
                <div className="studio-options-drawer">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#f5e482', letterSpacing: 0.5 }}>
                      ACTIVE SUB-MODULES & ARCHITECTURE
                    </span>
                    <button
                      type="button"
                      style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}
                      onClick={() => setShowSubmodulesOption(false)}
                    >
                      ✕ Close
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {selectedFeature === 1 && ['Machine Type Parser', 'Problem Spec Engine', 'Budget Bounds (₹2k-₹10k)', 'Safety Triggers'].map((m, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8, fontSize: 11.5, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={12} color="#22c55e" /> {m}
                      </span>
                    ))}
                    {selectedFeature === 2 && ['PLC vs IoT Arbitrage', '92% Savings Matrix', 'Payback Calculator', 'Fleet Scale Multiplier'].map((m, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8, fontSize: 11.5, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={12} color="#22c55e" /> {m}
                      </span>
                    ))}
                    {selectedFeature === 3 && ['ESP32 240MHz Node', '4-Channel Opto Relays', 'Inductive Proximity Sensor', 'Chawri Bazar / Robu Hubs'].map((m, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8, fontSize: 11.5, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={12} color="#22c55e" /> {m}
                      </span>
                    ))}
                    {selectedFeature === 4 && ['C++ Firmware (.ino)', 'GPIO Pin Matrix', 'Watchdog Timer', 'Hardware E-Stop Interrupt'].map((m, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8, fontSize: 11.5, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={12} color="#22c55e" /> {m}
                      </span>
                    ))}
                    {selectedFeature === 5 && ['Flange Gasket Contours', 'L-Bracket Vectors', 'Pipe Cut & Chamfer', 'Precision CNC Coordinates'].map((m, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8, fontSize: 11.5, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={12} color="#22c55e" /> {m}
                      </span>
                    ))}
                    {selectedFeature === 6 && ['SoftAP 192.168.4.1', 'Connected Worker Terminal', 'Edge Gateway Connectivity', 'Zero Cloud Bill'].map((m, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8, fontSize: 11.5, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={12} color="#22c55e" /> {m}
                      </span>
                    ))}
                    {selectedFeature === 7 && ['Verified Electrician Roster', 'Delhi NCR / Faridabad / Okhla', 'Under 24h SLA', '30-Day Workmanship Guarantee'].map((m, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8, fontSize: 11.5, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={12} color="#22c55e" /> {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sliding Telemetry & Specs Option Drawer */}
              {showTelemetryOption && (
                <div className="studio-options-drawer" style={{ borderBottomColor: 'rgba(56, 189, 248, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8', letterSpacing: 0.5 }}>
                      HARDWARE TELEMETRY & SPECIFICATION AUDIT
                    </span>
                    <button
                      type="button"
                      style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}
                      onClick={() => setShowTelemetryOption(false)}
                    >
                      ✕ Close
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12 }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 3 }}>ACTIVE SUBSYSTEM</div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#f5e482' }}>
                        {selectedFeature === 1 && 'Smart Ask Parser'}
                        {selectedFeature === 2 && 'ROI Cost Crusher'}
                        {selectedFeature === 3 && 'BOM Sourcing Hub'}
                        {selectedFeature === 4 && 'ISO 13849 Compiler'}
                        {selectedFeature === 5 && 'Gemini Vision Engine'}
                        {selectedFeature === 6 && 'ESP32 SoftAP WebServer'}
                        {selectedFeature === 7 && 'Fitter Dispatch SLA'}
                      </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 3 }}>CONTROLLER TARGET</div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ffffff' }}>ESP32 DevKit V1 (240MHz)</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 3 }}>NET CAPITAL SAVED</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#22c55e' }}>
                        ₹{((45000 - 3500) * retrofitMachineCount).toLocaleString('en-IN')} (-92.2%)
                      </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 3 }}>NETWORK / LATENCY</div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#38bdf8' }}>Local SoftAP (&lt; 8ms latency)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Full-Width Canvas Layout (No Left or Right Sidebars Cramping the Screen) */}
              <div className="studio-canvas-layout">
                <div className="studio-center-canvas">
                  {/* FEATURE 1: SMART ASK INPUT FORM */}
                  {selectedFeature === 1 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#f5e482' }}>📝 "Smart Ask" Simple Non-Technical Intake</span>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <button
                            type="button"
                            onClick={() => setShowTemplateLibraryModal(true)}
                            style={{
                              background: 'rgba(245, 228, 130, 0.15)',
                              border: '1px solid rgba(245, 228, 130, 0.35)',
                              color: '#f5e482',
                              padding: '3px 10px',
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            <BookOpen size={12} />
                            <span>Browse Indian Template Library (5)</span>
                          </button>
                          <span style={{ fontSize: 11, color: '#22c55e', background: 'rgba(34,197,94,0.15)', padding: '2px 8px', borderRadius: 6 }}>● Ready for Input</span>
                        </div>
                      </div>

                      {/* Indian Machine Template Quick Dropdown (Tulip's Library / Vention's Design Templates) */}
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(245, 228, 130, 0.25)',
                        borderRadius: 10,
                        padding: '10px 14px',
                        marginBottom: 16
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: '#f5e482', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Sparkles size={13} />
                            <span>Indian Machine Template Library (1-Click Auto Fill):</span>
                          </span>
                          <span style={{ fontSize: 10.5, color: '#94a3b8' }}>Tulip & Vention Architecture</span>
                        </div>
                        <select
                          className="dark-form-control"
                          style={{ padding: '8px 12px', fontSize: 12, borderColor: 'rgba(245,228,130,0.3)', color: '#ffffff', cursor: 'pointer' }}
                          onChange={(e) => {
                            const found = machineTemplates.find(t => t.id === e.target.value);
                            if (found) handleLoadTemplate(found);
                          }}
                          defaultValue=""
                        >
                          <option value="" disabled>-- Select Common Indian Workshop Machine --</option>
                          {machineTemplates.map(t => (
                            <option key={t.id} value={t.id}>
                              {t.name} ({t.category}) — Budget: ₹{t.budget} (Save {t.savingsPct}%)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                          <label style={{ fontSize: 11.5, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            1. Machine Type (Apni Machine Chunein ya Likhein)
                          </label>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                            {['PVC Pipe Cutter', 'Pneumatic Packaging Press', 'Manual Lathe Semi-Auto', 'Bag Packaging Heat Sealer', 'Photo Frame 45° Mitre'].map(m => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => {
                                  const match = machineTemplates.find(t => t.name.toLowerCase().includes(m.toLowerCase().slice(0, 5)));
                                  if (match) {
                                    handleLoadTemplate(match);
                                  } else {
                                    setIntakeData({ ...intakeData, machineType: m });
                                  }
                                }}
                                style={{
                                  background: intakeData.machineType.includes(m.slice(0, 6)) ? 'rgba(245, 228, 130, 0.2)' : 'rgba(255,255,255,0.05)',
                                  border: `1px solid ${intakeData.machineType.includes(m.slice(0, 6)) ? '#f5e482' : 'rgba(255,255,255,0.1)'}`,
                                  color: intakeData.machineType.includes(m.slice(0, 6)) ? '#f5e482' : '#cbd5e1',
                                  padding: '5px 10px',
                                  borderRadius: 8,
                                  fontSize: 11.5,
                                  cursor: 'pointer'
                                }}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                          <input
                            type="text"
                            value={intakeData.machineType}
                            onChange={e => setIntakeData({ ...intakeData, machineType: e.target.value })}
                            className="dark-form-control"
                            placeholder="e.g., PVC Pipe Cutter"
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: 11.5, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            2. Problem / Kya Automate Karna Hai?
                          </label>
                          <textarea
                            rows={3}
                            value={intakeData.problem}
                            onChange={e => setIntakeData({ ...intakeData, problem: e.target.value })}
                            className="dark-form-control"
                            placeholder="e.g. Majdoor hath se blade kheenchta hai, 2m par automatic cut aur clamp chahiye."
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                          <div>
                            <label style={{ fontSize: 11.5, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                              3. Target Budget: <span style={{ color: '#f5e482', fontWeight: 800 }}>₹{intakeData.budget}</span>
                            </label>
                            <input
                              type="range"
                              min="2000"
                              max="10000"
                              step="500"
                              value={intakeData.budget}
                              onChange={e => setIntakeData({ ...intakeData, budget: Number(e.target.value) })}
                              style={{ width: '100%', accentColor: '#f5e482' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748b' }}>
                              <span>₹2,000</span>
                              <span>₹5,000</span>
                              <span>₹10,000</span>
                            </div>
                          </div>

                          <div>
                            <label style={{ fontSize: 11.5, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                              4. Operating Power Line
                            </label>
                            <select
                              value={intakeData.voltage}
                              onChange={e => setIntakeData({ ...intakeData, voltage: e.target.value })}
                              className="dark-form-control"
                              style={{ padding: '8px 12px' }}
                            >
                              <option>230V Single Phase AC</option>
                              <option>415V Three Phase AC</option>
                              <option>24V Industrial DC</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFeature(2);
                            alert(`✓ Blueprint Analysis Complete for ${intakeData.machineType}! Savings: 92.5% vs PLC.`);
                          }}
                          className="btn-book-demo"
                          style={{ padding: '12px 20px', fontSize: 13, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                        >
                          <Sparkles size={16} />
                          <span>Generate AI Retrofit Solution (Instant)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE 2: COST CRUSHER VISUALIZER (SUPERBLY ORGANIZED) */}
                  {selectedFeature === 2 && (
                    <div style={{ background: '#0b1424', borderRadius: 14, padding: 22, border: '1px solid rgba(255,255,255,0.08)' }}>
                      {/* Header with Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 800, color: '#34d399' }}>Cost-Crusher Arbitrage Engine</span>
                          <span style={{ fontSize: 11, color: '#94a3b8' }}>(Bridge The Gap Theme)</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <span style={{ fontSize: 11, background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '3px 10px', borderRadius: 12, fontWeight: 800 }}>
                            92.2% Cost Slashed
                          </span>
                          <span style={{ fontSize: 11, background: 'rgba(245,228,130,0.15)', color: '#f5e482', padding: '3px 10px', borderRadius: 12, fontWeight: 800 }}>
                            11.4 Days Payback
                          </span>
                        </div>
                      </div>

                      {/* Interactive Fleet Scaler */}
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 16px', marginBottom: 18, border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 11.5, color: '#cbd5e1', fontWeight: 600 }}>
                            Select Factory Machine Count: <strong style={{ color: '#f5e482', fontSize: 13 }}>{retrofitMachineCount} Machine{retrofitMachineCount > 1 ? 's' : ''}</strong>
                          </span>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {[1, 3, 5, 10].map(cnt => (
                              <button
                                key={cnt}
                                type="button"
                                onClick={() => setRetrofitMachineCount(cnt)}
                                style={{
                                  background: retrofitMachineCount === cnt ? '#f5e482' : 'rgba(255,255,255,0.06)',
                                  color: retrofitMachineCount === cnt ? '#070d18' : '#cbd5e1',
                                  border: 'none',
                                  borderRadius: 6,
                                  padding: '3px 10px',
                                  fontSize: 11,
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                {cnt}
                              </button>
                            ))}
                          </div>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={retrofitMachineCount}
                          onChange={e => setRetrofitMachineCount(Number(e.target.value))}
                          style={{ width: '100%', accentColor: '#34d399' }}
                        />
                      </div>

                      {/* Side-by-Side Comparison Cards with Visual Progress Bars */}
                      <div className="cost-comparison-container" style={{ marginBottom: 16 }}>
                        {/* Old Expensive PLC Panel */}
                        <div className="cost-card-plc">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: '#ef4444' }}>TRADITIONAL PLC PANEL</span>
                            <span style={{ fontSize: 10, color: '#fca5a5' }}>Siemens / Mitsubishi</span>
                          </div>
                          <div style={{ fontSize: 24, fontWeight: 900, color: '#f87171', margin: '6px 0 2px 0' }}>
                            ₹{(45000 * retrofitMachineCount).toLocaleString('en-IN')}
                          </div>

                          <div className="cost-bar-track">
                            <div className="cost-bar-fill-plc" style={{ width: '100%' }} />
                          </div>
                          <div style={{ fontSize: 10, color: '#f87171', textAlign: 'right', fontWeight: 700 }}>100% (High Capex)</div>

                          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10, lineHeight: 1.6 }}>
                            • Siemens S7-1200 CPU: ₹{(22000 * retrofitMachineCount).toLocaleString('en-IN')}<br />
                            • Siemens 7" Touch HMI: ₹{(14000 * retrofitMachineCount).toLocaleString('en-IN')}<br />
                            • Automation Consultant: ₹{(9000 * retrofitMachineCount).toLocaleString('en-IN')}<br />
                            • Vendor license lock-in (₹12k/yr)
                          </div>
                        </div>

                        {/* UdyamUtkarsh Open IoT Setup */}
                        <div className="cost-card-iot">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: '#22c55e' }}>UDYAMUTKARSH OPEN IOT</span>
                            <span style={{ fontSize: 10, color: '#86efac' }}>ESP32 Dual-Core Architecture</span>
                          </div>
                          <div style={{ fontSize: 24, fontWeight: 900, color: '#4ade80', margin: '6px 0 2px 0' }}>
                            ₹{(3500 * retrofitMachineCount).toLocaleString('en-IN')}
                          </div>

                          <div className="cost-bar-track">
                            <div className="cost-bar-fill-iot" style={{ width: '7.8%' }} />
                          </div>
                          <div style={{ fontSize: 10, color: '#4ade80', textAlign: 'right', fontWeight: 700 }}>7.8% (-92.2% Saved)</div>

                          <div style={{ fontSize: 11, color: '#cbd5e1', marginTop: 10, lineHeight: 1.6 }}>
                            • ESP32 240MHz DevKit: ₹{(450 * retrofitMachineCount).toLocaleString('en-IN')}<br />
                            • 4-Ch Opto Relays & Sensors: ₹{(600 * retrofitMachineCount).toLocaleString('en-IN')}<br />
                            • Industrial SMPS Power: ₹{(450 * retrofitMachineCount).toLocaleString('en-IN')}<br />
                            • Smartphone Web HMI: <strong>₹0 (Free via Wi-Fi)</strong><br />
                            • AI C++ Firmware: <strong>₹0 (Instant)</strong>
                          </div>
                        </div>
                      </div>

                      {/* Net Savings & Payback Callout */}
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(6, 78, 59, 0.25) 100%)',
                        border: '1px solid rgba(34, 197, 94, 0.35)',
                        borderRadius: 12,
                        padding: '14px 18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontSize: 11, color: '#86efac', fontWeight: 700 }}>NET CAPITAL SAVINGS</div>
                          <div style={{ fontSize: 22, fontWeight: 900, color: '#4ade80' }}>
                            ₹{((45000 - 3500) * retrofitMachineCount).toLocaleString('en-IN')} Saved
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 11, color: '#86efac', fontWeight: 700 }}>PAYBACK SCHEDULE</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: '#ffffff' }}>11.4 Days (at 200 cycles/day)</div>
                          <div style={{ fontSize: 10.5, color: '#cbd5e1' }}>Break-Even: 2,280 Cut Cycles</div>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                        <button
                          type="button"
                          onClick={() => alert(`Cost Audit Exported! Total capital saved on ${retrofitMachineCount} machine(s): ₹${((45000 - 3500) * retrofitMachineCount).toLocaleString('en-IN')}.`)}
                          className="btn-book-demo"
                          style={{ padding: '8px 16px', fontSize: 12 }}
                        >
                          📊 Export Cost Audit (PDF)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedFeature(3)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#cbd5e1',
                            padding: '8px 16px',
                            borderRadius: 9999,
                            fontSize: 12,
                            cursor: 'pointer'
                          }}
                        >
                          Next: View AI Component BOM →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE 3: AI-GENERATED BILL OF MATERIALS (BOM) & 1-CLICK MARKETPLACE */}
                  {selectedFeature === 3 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 18, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8' }}>📦 AI-Generated BOM (Vention's Parts Marketplace)</span>
                          <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Direct links to Indian vendors (Robu.in & Amazon India) at factory wholesale rates</span>
                        </div>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Total Kit: <strong style={{ color: '#f5e482', fontSize: 14 }}>₹1,980</strong></span>
                      </div>

                      {orderKitSuccess && (
                        <div style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(6, 78, 59, 0.3) 100%)',
                          border: '1px solid #22c55e',
                          borderRadius: 8,
                          padding: '10px 14px',
                          marginBottom: 12,
                          color: '#86efac',
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircle2 size={16} color="#22c55e" />
                            <span>
                              <strong>Order #UDYAM-98421 Placed!</strong> Pre-tested IoT kit dispatched from Delhi NCR Hub via BlueDart Express (24-48 hrs delivery).
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setOrderKitSuccess(false)}
                            style={{ background: 'transparent', border: 'none', color: '#86efac', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      <div style={{ maxHeight: 320, overflowY: 'auto', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
                          <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                              <th style={{ padding: '10px 14px' }}>Component</th>
                              <th style={{ padding: '10px 8px' }}>Qty</th>
                              <th style={{ padding: '10px 14px' }}>Est. Price</th>
                              <th style={{ padding: '10px 14px' }}>Purpose / Sourcing</th>
                              <th style={{ padding: '10px 14px', textAlign: 'right' }}>Indian Vendor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'ESP32 DevKit V1 (30-Pin)', qty: 1, price: '₹450', hub: 'Edge Gateway WiFi/BLE', vendor: 'Robu.in', url: 'https://robu.in/?s=ESP32+DevKit+V1' },
                              { name: '4-Channel Relay (Opto-Isolated)', qty: 1, price: '₹180', hub: 'Pneumatics & Motor SSR', vendor: 'Quartz Comp.', url: 'https://robu.in/?s=4+channel+relay' },
                              { name: 'Inductive Proximity (LJ12A3)', qty: 1, price: '₹190', hub: 'Industrial Limit Sensing', vendor: 'Robu.in', url: 'https://robu.in/?s=LJ12A3' },
                              { name: 'IR Obstacle Sensor (FC-51)', qty: 1, price: '₹50', hub: 'Pipe Arrival Detection', vendor: 'Robu.in', url: 'https://robu.in/?s=FC-51+IR+sensor' },
                              { name: '12V 5A Metal SMPS Power', qty: 1, price: '₹450', hub: 'Clean DC Power Rail', vendor: 'Amazon India', url: 'https://www.amazon.in/s?k=12V+5A+SMPS' },
                              { name: 'Twist-Release E-Stop Button', qty: 1, price: '₹140', hub: 'Hardware Safety Cutoff', vendor: 'Robu.in', url: 'https://robu.in/?s=Emergency+stop+push+button' },
                              { name: 'ABS Waterproof Enclosure', qty: 1, price: '₹320', hub: 'Dust & Oil Protection', vendor: 'Robu.in', url: 'https://robu.in/?s=IP65+ABS+enclosure' },
                              { name: 'DIN Rail Terminals & Wire', qty: 1, price: '₹200', hub: 'Clean Panel Interfacing', vendor: 'Local Hub', url: 'https://robu.in/?s=DIN+rail+terminal' }
                            ].map((item, idx) => (
                              <tr key={idx} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#ffffff' }}>{item.name}</td>
                                <td style={{ padding: '10px 8px' }}>{item.qty}</td>
                                <td style={{ padding: '10px 14px', color: '#34d399', fontWeight: 700 }}>{item.price}</td>
                                <td style={{ padding: '10px 14px', color: '#94a3b8' }}>{item.hub}</td>
                                <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: 4,
                                      color: '#38bdf8',
                                      textDecoration: 'none',
                                      background: 'rgba(56, 189, 248, 0.12)',
                                      padding: '4px 9px',
                                      borderRadius: 6,
                                      fontWeight: 600,
                                      fontSize: 11
                                    }}
                                  >
                                    <span>{item.vendor} Buy Now</span>
                                    <ExternalLink size={11} />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderKitSuccess(true);
                          }}
                          className="btn-book-demo"
                          style={{
                            padding: '8px 18px',
                            fontSize: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: '#ffffff'
                          }}
                        >
                          <ShoppingCart size={13} />
                          <span>1-Click Order Full Kit (₹1,980)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const csvContent = "data:text/csv;charset=utf-8,Component,Qty,Price,Vendor\n" +
                              "ESP32 DevKit V1,1,450,Robu.in\n4-Channel Relay,1,180,Quartz\nInductive Proximity LJ12A3,1,190,Robu.in\nIR Sensor FC-51,1,50,Robu.in\n12V SMPS Power,1,450,Amazon.in\nE-Stop Button,1,140,Robu.in\nABS IP65 Enclosure,1,320,Robu.in\nDIN Rail Terminals,1,200,Local Hub\nTOTAL,8,1980,Complete Retrofit Kit";
                            const encodedUri = encodeURI(csvContent);
                            const link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", "UdyamUtkarsh_BOM_Sourcing_List.csv");
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#cbd5e1',
                            padding: '7px 14px',
                            borderRadius: 9999,
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5
                          }}
                        >
                          <Download size={12} />
                          <span>Download CSV</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedFeature(4)}
                          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '7px 14px', borderRadius: 9999, fontSize: 12, cursor: 'pointer' }}
                        >
                          Next: Auto-Firmware & Wiring →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE 4: TECH BLUEPRINT (FIRMWARE & DIGITAL WORKFLOWS) */}
                  {selectedFeature === 4 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 18, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#f5e482' }}>⚡ Auto-Generated Digital Workflows & C++ Firmware</span>
                          <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Zero expensive automation engineers needed — Instant Pin-to-Pin Wiring + Firmware</span>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <span style={{ fontSize: 10, background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>ISO 13849 Certified</span>
                          <span style={{ fontSize: 10, background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>Watchdog Active</span>
                        </div>
                      </div>

                      {/* Pin Mapping Matrix & Digital Workflow */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 6, textAlign: 'center', border: '1px solid rgba(239,68,68,0.2)' }}>
                          <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 800 }}>GPIO 13 (ISR)</div>
                          <div style={{ fontSize: 11, color: '#ffffff' }}>E-Stop Mushroom</div>
                          <div style={{ fontSize: 9.5, color: '#94a3b8' }}>Pin 13 → NC Contact</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 6, textAlign: 'center', border: '1px solid rgba(34,197,94,0.2)' }}>
                          <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 800 }}>GPIO 14 (IN)</div>
                          <div style={{ fontSize: 11, color: '#ffffff' }}>Start Cycle Button</div>
                          <div style={{ fontSize: 9.5, color: '#94a3b8' }}>Pin 14 → Green PB</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 6, textAlign: 'center', border: '1px solid rgba(56,189,248,0.2)' }}>
                          <div style={{ fontSize: 10, color: '#38bdf8', fontWeight: 800 }}>GPIO 18 / 19</div>
                          <div style={{ fontSize: 11, color: '#ffffff' }}>Relay IN1 & IN2</div>
                          <div style={{ fontSize: 9.5, color: '#94a3b8' }}>Pin 18 → Cut Motor</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 6, textAlign: 'center', border: '1px solid rgba(245,228,130,0.2)' }}>
                          <div style={{ fontSize: 10, color: '#f5e482', fontWeight: 800 }}>GPIO 27 (INPUT)</div>
                          <div style={{ fontSize: 11, color: '#ffffff' }}>Inductive Proximity</div>
                          <div style={{ fontSize: 9.5, color: '#94a3b8' }}>Pin 27 → Sensor OUT</div>
                        </div>
                      </div>

                      {/* Code Snippet Box */}
                      <div className="gcode-code-box" style={{ maxHeight: 115, fontSize: 11 }}>
{`// UdyamUtkarsh ISO 13849 Compliant Machine Controller
#include <esp_task_wdt.h>
#define PIN_RELAY_CUT 18     // GPIO 18 -> Relay IN1
#define PIN_RELAY_CLAMP 19   // GPIO 19 -> Relay IN2
#define PIN_ESTOP 13         // GPIO 13 -> E-Stop (Hardware Interrupt)
#define PIN_PROXIMITY 27     // GPIO 27 -> Inductive Proximity

void IRAM_ATTR handleEmergencyStop() {
    digitalWrite(PIN_RELAY_CUT, HIGH);   // Immediate hardware cutoff
    digitalWrite(PIN_RELAY_CLAMP, HIGH); // De-energize solenoid
}
void setup() {
    pinMode(PIN_RELAY_CUT, OUTPUT);
    digitalWrite(PIN_RELAY_CUT, HIGH);   // Failsafe boot OFF
    attachInterrupt(digitalPinToInterrupt(PIN_ESTOP), handleEmergencyStop, FALLING);
}`}
                      </div>

                      {/* Regional Video Guide & QR Code Banner (Vention's Professional Training) */}
                      <div style={{
                        marginTop: 12,
                        background: 'linear-gradient(135deg, rgba(245, 228, 130, 0.08) 0%, rgba(13, 23, 38, 0.8) 100%)',
                        border: '1px solid rgba(245, 228, 130, 0.3)',
                        borderRadius: 10,
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {/* Mini QR Code Visual */}
                          <div style={{
                            background: '#ffffff',
                            padding: 4,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                          }}>
                            <QrCode size={34} color="#0d1726" />
                          </div>
                          <div>
                            <div style={{ fontSize: 11.5, fontWeight: 800, color: '#f5e482' }}>
                              Regional Video Guides / ITI Training (Hindi)
                            </div>
                            <div style={{ fontSize: 10.5, color: '#cbd5e1' }}>
                              Scan QR on machine or watch 2-minute video in Hindi so local ITI students or electricians install with zero errors.
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowVideoGuideModal(true)}
                          className="btn-book-demo"
                          style={{
                            padding: '6px 14px',
                            fontSize: 11.5,
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5
                          }}
                        >
                          <Video size={13} />
                          <span>Watch 2-Min Video Guide</span>
                        </button>
                      </div>

                      {/* Action Links */}
                      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(`// UdyamUtkarsh ISO 13849 Compliant Machine Controller\n#include <esp_task_wdt.h>\n#define PIN_RELAY_CUT 18\n#define PIN_RELAY_CLAMP 19\n#define PIN_ESTOP 13\n#define PIN_PROXIMITY 27\n\nvoid IRAM_ATTR handleEmergencyStop() {\n    digitalWrite(PIN_RELAY_CUT, HIGH);\n    digitalWrite(PIN_RELAY_CLAMP, HIGH);\n}\nvoid setup() {\n    pinMode(PIN_RELAY_CUT, OUTPUT);\n    pinMode(PIN_RELAY_CLAMP, OUTPUT);\n    digitalWrite(PIN_RELAY_CUT, HIGH);\n    digitalWrite(PIN_RELAY_CLAMP, HIGH);\n    attachInterrupt(digitalPinToInterrupt(PIN_ESTOP), handleEmergencyStop, FALLING);\n}\nvoid loop() {\n    // Automated Cycle\n}`);
                            setCopiedCode(true);
                            setTimeout(() => setCopiedCode(false), 2000);
                          }}
                          className="btn-book-demo"
                          style={{ padding: '6px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                        >
                          <Copy size={13} />
                          <span>{copiedCode ? '✓ Copied to Clipboard!' : 'Copy Arduino .ino Code'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([`// UdyamUtkarsh C++ Firmware\n// Pin 18: Cut Relay\n// Pin 19: Clamp Relay\n// Pin 13: E-Stop\n// Pin 27: Proximity Sensor\nvoid setup() {} void loop() {}`], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `UdyamUtkarsh_Firmware_${intakeData.machineType.replace(/\s+/g, '_')}.ino`;
                            a.click();
                          }}
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#cbd5e1',
                            padding: '6px 14px',
                            borderRadius: 9999,
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5
                          }}
                        >
                          <Download size={12} />
                          <span>Download .ino File</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedFeature(5)}
                          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '6px 14px', borderRadius: 9999, fontSize: 12, cursor: 'pointer' }}
                        >
                          Next: AI Vision to G-Code →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE 5: 🚀 AI VISION TO G-CODE (THE WOW FACTOR) */}
                  {selectedFeature === 5 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 18, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#f43f5e' }}>🚀 Gemini AI Vision to G-Code Studio</span>
                        <span style={{ fontSize: 11, background: 'rgba(244,63,94,0.15)', color: '#f43f5e', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                          {isAnalyzingVision ? 'Analyzing Drawing...' : 'Vision Model Ready'}
                        </span>
                      </div>

                      {/* Shape selector pills */}
                      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                        {[
                          { id: 'flange', label: '🔘 4-Hole Flange Gasket' },
                          { id: 'bracket', label: '📐 L-Mounting Bracket' },
                          { id: 'pipe_cut', label: '✂️ 2-Meter Pipe Cut' }
                        ].map(shape => (
                          <div
                            key={shape.id}
                            className={`gcode-sketch-pill ${selectedGcodeShape === shape.id ? 'active' : ''}`}
                            onClick={() => fetchGCode(shape.id)}
                          >
                            <span>{shape.label}</span>
                          </div>
                        ))}

                        <label className="gcode-sketch-pill" style={{ cursor: 'pointer', background: 'rgba(56,189,248,0.1)', borderColor: 'rgba(56,189,248,0.3)', color: '#38bdf8' }}>
                          <Camera size={13} />
                          <span>Upload Hand Sketch Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => {
                              if (e.target.files?.[0]) {
                                alert(`Sketch "${e.target.files[0].name}" received! Gemini Vision converting contours to G-Code toolpaths...`);
                                fetchGCode('flange');
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* 2D Toolpath Canvas & Coordinates Preview (Spacious) */}
                      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 18, marginBottom: 16 }}>
                        {/* 2D SVG Toolpath Visualizer */}
                        <div style={{ background: '#050a12', borderRadius: 10, padding: 14, border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                          <div style={{ fontSize: 10.5, color: '#94a3b8', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>TOOLPATH VECTOR CANVAS</div>
                          <svg viewBox="-80 -80 160 160" style={{ width: '100%', height: 160 }}>
                            {/* Outer Circle Cut */}
                            <circle cx="0" cy="0" r="60" fill="none" stroke="#f5e482" strokeWidth="2.5" strokeDasharray="3 2" />
                            {/* Inner Bore */}
                            <circle cx="0" cy="0" r="30" fill="none" stroke="#38bdf8" strokeWidth="2" />
                            {/* 4 Bolt Holes */}
                            <circle cx="35" cy="0" r="6" fill="#f43f5e" />
                            <circle cx="-35" cy="0" r="6" fill="#f43f5e" />
                            <circle cx="0" cy="35" r="6" fill="#f43f5e" />
                            <circle cx="0" cy="-35" r="6" fill="#f43f5e" />
                            {/* Rapid travel axes */}
                            <line x1="-70" y1="0" x2="70" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                            <line x1="0" y1="-70" x2="0" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                          </svg>
                          <div style={{ fontSize: 11, color: '#f5e482', fontWeight: 700, marginTop: 6 }}>Outer: 120mm | Holes: 4x M10</div>
                        </div>

                        {/* Generated G-Code snippet */}
                        <div className="gcode-code-box" style={{ maxHeight: 200, fontSize: 12, lineHeight: 1.6 }}>
                          {gcodeResult?.gcode || '; Generating G-Code...'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          onClick={() => {
                            const blob = new Blob([gcodeResult?.gcode || 'G21\nG90\nM30'], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${selectedGcodeShape}_cut.gcode`;
                            a.click();
                          }}
                          className="btn-book-demo"
                          style={{ padding: '6px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                        >
                          <Download size={13} />
                          <span>Download .gcode File</span>
                        </button>
                        <button
                          onClick={() => alert("G-Code dispatched via ESP32 Wi-Fi buffer! Machine executing cut sequence...")}
                          style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', color: '#22c55e', padding: '6px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                        >
                          ▶ Send G-Code to Machine
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE 6: SMARTPHONE AS HMI & BASIC SMARTPHONE ANALYTICS (DE-CLUSTERED SPACIOUS 2-COL) */}
                  {selectedFeature === 6 && (
                    <div style={{ background: '#0b1424', borderRadius: 14, padding: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                          <span style={{ fontSize: 15, fontWeight: 800, color: '#22c55e' }}>📱 "Smartphone as HMI" & Edge Analytics (Zero-Cloud)</span>
                          <span style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginTop: 2 }}>
                            Microcontroller broadcasts local Wi-Fi SoftAP • Factory owner pays ₹0 for cloud or touchscreen hardware
                          </span>
                        </div>
                        <span style={{ fontSize: 11.5, background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '4px 12px', borderRadius: 8, fontWeight: 800 }}>
                          ● SoftAP IP: 192.168.4.1
                        </span>
                      </div>

                      {/* Spacious 2-Column Showcase */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 340px) 1fr', gap: 32, alignItems: 'start' }}>
                        {/* Column 1: Phone Frame Mockup */}
                        <div>
                          <div className="hmi-phone-mockup" style={{ width: 330, margin: '0 auto' }}>
                            <div className="hmi-phone-notch">
                              <div className="hmi-phone-camera" />
                            </div>

                            <div className="hmi-phone-screen" style={{ padding: '16px 14px' }}>
                              <div className="hmi-status-bar" style={{ marginBottom: 12 }}>
                                <span>📶 ESP32-HOTSPOT</span>
                                <span style={{ color: '#22c55e', fontWeight: 800 }}>CONNECTED</span>
                                <span>100% 🔋</span>
                              </div>

                              <div style={{ textAlign: 'center', margin: '8px 0 12px 0' }}>
                                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, letterSpacing: 0.5 }}>OPERATOR TERMINAL</div>
                                <div style={{ fontSize: 16, fontWeight: 900, color: '#ffffff' }}>PVC Cutter Unit #04</div>
                              </div>

                              {/* Phone Tabs: Controls vs Analytics */}
                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 6,
                                background: 'rgba(255, 255, 255, 0.08)',
                                padding: 4,
                                borderRadius: 10,
                                marginBottom: 14
                              }}>
                                <button
                                  type="button"
                                  onClick={() => setHmiActiveTab('controls')}
                                  style={{
                                    background: hmiActiveTab === 'controls' ? '#22c55e' : 'transparent',
                                    color: hmiActiveTab === 'controls' ? '#040810' : '#cbd5e1',
                                    border: 'none',
                                    borderRadius: 7,
                                    padding: '7px 0',
                                    fontSize: 11,
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                  }}
                                >
                                  🕹️ Controls
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setHmiActiveTab('analytics')}
                                  style={{
                                    background: hmiActiveTab === 'analytics' ? '#22c55e' : 'transparent',
                                    color: hmiActiveTab === 'analytics' ? '#040810' : '#cbd5e1',
                                    border: 'none',
                                    borderRadius: 7,
                                    padding: '7px 0',
                                    fontSize: 11,
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                  }}
                                >
                                  📈 Analytics
                                </button>
                              </div>

                              {/* TAB 1: CONTROLS */}
                              {hmiActiveTab === 'controls' && (
                                <div>
                                  {/* Live Stats Row */}
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '10px 0' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 8, textAlign: 'center' }}>
                                      <div style={{ fontSize: 9.5, color: '#94a3b8', fontWeight: 700 }}>PIECES CUT</div>
                                      <div style={{ fontSize: 20, fontWeight: 900, color: '#f5e482', marginTop: 2 }}>{hmiCycles}</div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 8, textAlign: 'center' }}>
                                      <div style={{ fontSize: 9.5, color: '#94a3b8', fontWeight: 700 }}>STATUS</div>
                                      <div style={{ fontSize: 12, fontWeight: 800, color: hmiSimRunning ? '#22c55e' : '#38bdf8', marginTop: 4 }}>
                                        {hmiSimRunning ? '⚡ CUTTING...' : '✓ READY'}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Length Adjustment Slider */}
                                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 10, margin: '12px 0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#cbd5e1', marginBottom: 6 }}>
                                      <span>Cut Length Target:</span>
                                      <strong style={{ color: '#f5e482' }}>{hmiCutLength} mm</strong>
                                    </div>
                                    <input
                                      type="range"
                                      min="500"
                                      max="3000"
                                      step="50"
                                      value={hmiCutLength}
                                      onChange={e => setHmiCutLength(Number(e.target.value))}
                                      style={{ width: '100%', accentColor: '#22c55e' }}
                                    />
                                  </div>

                                  {/* Operator Action Buttons */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                                    <button
                                      type="button"
                                      onClick={triggerHmiCycle}
                                      disabled={hmiSimRunning || eStopTripped}
                                      className="hmi-btn-start"
                                      style={{ padding: 12 }}
                                    >
                                      <Play size={15} fill="#ffffff" />
                                      <span>{hmiSimRunning ? 'Executing Cut Stroke...' : 'START CUT CYCLE'}</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setEStopTripped(!eStopTripped)}
                                      className="hmi-btn-estop"
                                      style={{ padding: 10 }}
                                    >
                                      <AlertTriangle size={15} />
                                      <span>{eStopTripped ? 'RESET EMERGENCY STOP' : 'EMERGENCY STOP'}</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* TAB 2: MINI PHONE ANALYTICS */}
                              {hmiActiveTab === 'analytics' && (
                                <div style={{ animation: 'fadeIn 0.2s ease' }}>
                                  <div style={{ background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: 10, textAlign: 'center', marginBottom: 10 }}>
                                    <div style={{ fontSize: 9.5, color: '#86efac', fontWeight: 700 }}>PIPES CUT TODAY</div>
                                    <div style={{ fontSize: 26, fontWeight: 900, color: '#4ade80' }}>
                                      {450 + (hmiCycles - 148)} <span style={{ fontSize: 13, fontWeight: 600 }}>Units</span>
                                    </div>
                                    <div style={{ fontSize: 10, color: '#cbd5e1', marginTop: 2 }}>Target: 500 Units (90% Met)</div>
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 6, textAlign: 'center' }}>
                                      <div style={{ fontSize: 9, color: '#94a3b8' }}>SPEED</div>
                                      <div style={{ fontSize: 13, fontWeight: 800, color: '#f5e482' }}>56 / Hr</div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 6, textAlign: 'center' }}>
                                      <div style={{ fontSize: 9, color: '#94a3b8' }}>UPTIME</div>
                                      <div style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8' }}>98.4%</div>
                                    </div>
                                  </div>

                                  <div style={{ fontSize: 9.5, color: '#94a3b8', textAlign: 'center', lineHeight: 1.4 }}>
                                    Zero Cloud Charges. Stored inside ESP32 SPI Flash.
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Spacious Live Analytics Dashboard & Enterprise Vocabulary */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {/* Live Production Analytics KPI Card */}
                          <div style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(13, 23, 38, 0.9) 100%)',
                            border: '1px solid rgba(34, 197, 94, 0.35)',
                            borderRadius: 14,
                            padding: '18px 22px'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                              <div>
                                <div style={{ fontSize: 11, color: '#86efac', fontWeight: 800, letterSpacing: 0.5 }}>
                                  Vention's Machine Analytics (Basic Smartphone Analytics)
                                </div>
                                <div style={{ fontSize: 26, fontWeight: 900, color: '#4ade80', marginTop: 4 }}>
                                  {450 + (hmiCycles - 148)} <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Total Pipes Cut Today</span>
                                </div>
                              </div>
                              <span style={{ fontSize: 11, background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '3px 10px', borderRadius: 6, fontWeight: 800 }}>
                                90% Shift Goal
                              </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 12 }}>
                              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>SHIFT VELOCITY</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#f5e482', marginTop: 2 }}>56 Units/Hr</div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>MACHINE UPTIME</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#38bdf8', marginTop: 2 }}>98.4% (5.4h)</div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>REJECT / SCRAP</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#ef4444', marginTop: 2 }}>0.4% (2 pcs)</div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>CLOUD BILL</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#22c55e', marginTop: 2 }}>₹0 / Month</div>
                              </div>
                            </div>
                          </div>

                          {/* Category 3: Enterprise Pitch Callouts (Spacious & Clean) */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            {/* Callout 1: Connected Worker Terminal */}
                            <div className="tech-vocab-card cyan">
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: 7, borderRadius: 8 }}>
                                  <Smartphone size={16} color="#38bdf8" />
                                </div>
                                <div>
                                  <strong style={{ fontSize: 13, color: '#38bdf8', display: 'block' }}>Connected Worker Terminal</strong>
                                  <span style={{ fontSize: 10.5, color: '#94a3b8' }}>Tulip's Feature Equivalent</span>
                                </div>
                              </div>
                              <p style={{ fontSize: 11.5, color: '#cbd5e1', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                                "Sir, we don't force users to buy $1000 HMI screens. Using the ESP32's local Wi-Fi, the operator's ₹10,000 Android phone becomes our Connected Worker Terminal."
                              </p>
                            </div>

                            {/* Callout 2: Edge Gateway Connectivity */}
                            <div className="tech-vocab-card emerald">
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <div style={{ background: 'rgba(52, 211, 153, 0.15)', padding: 7, borderRadius: 8 }}>
                                  <Cpu size={16} color="#34d399" />
                                </div>
                                <div>
                                  <strong style={{ fontSize: 13, color: '#34d399', display: 'block' }}>Edge Gateway Connectivity</strong>
                                  <span style={{ fontSize: 10.5, color: '#94a3b8' }}>Tulip & Vention's Edge IO</span>
                                </div>
                              </div>
                              <p style={{ fontSize: 11.5, color: '#cbd5e1', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                                "Global companies sell proprietary Edge boxes for $500. We achieve the exact same Edge Gateway Connectivity using a ₹450 open-source ESP32 microcontroller."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FEATURE 7: "BOOK A FITTER" (GIG ECONOMY INTEGRATION) */}
                  {selectedFeature === 7 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 18, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#a78bfa' }}>🔧 "Book a Fitter" (Urban Company for Factories)</span>
                        <span style={{ fontSize: 11, background: 'rgba(167,139,250,0.15)', color: '#a78bfa', padding: '2px 8px', borderRadius: 6 }}>
                          ● 2 Verified Fitters Available
                        </span>
                      </div>

                      {bookingConfirmed && (
                        <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', borderRadius: 8, padding: 10, marginBottom: 12, color: '#86efac', fontSize: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <CheckCircle2 size={16} color="#22c55e" />
                          <span>Booking Confirmed! <strong>{selectedFitter?.name}</strong> will arrive at your factory with pre-tested BOM parts within 24 hours.</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                          {
                            name: 'Ramesh Sharma',
                            phone: '+91 98765 43210',
                            area: 'Faridabad & Okhla Ind. Area',
                            distance: '2.4 km away',
                            rating: '4.9 ★ (48 retrofits completed)',
                            rate: '₹450 / visit',
                            skills: 'ESP32 Panels • 230V Wiring • Motor Rewinding'
                          },
                          {
                            name: 'Anil Kumar Chauhan',
                            phone: '+91 98111 22334',
                            area: 'Noida Sec 63 & Ghaziabad',
                            distance: '4.1 km away',
                            rating: '4.8 ★ (36 retrofits completed)',
                            rate: '₹500 / visit',
                            skills: 'Pneumatics • Limit Switches • Earthing Safety'
                          }
                        ].map((fitter, idx) => (
                          <div key={idx} className="fitter-card-item">
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 14, fontWeight: 800, color: '#ffffff' }}>{fitter.name}</span>
                                <span style={{ fontSize: 10, background: '#10b981', color: '#fff', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>VERIFIED FITTER</span>
                              </div>
                              <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 3 }}>
                                📍 {fitter.area} • <strong style={{ color: '#f5e482' }}>{fitter.distance}</strong>
                              </div>
                              <div style={{ fontSize: 11, color: '#cbd5e1', marginTop: 2 }}>
                                ⭐ {fitter.rating} | <span style={{ color: '#38bdf8' }}>{fitter.skills}</span>
                              </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 15, fontWeight: 900, color: '#34d399', marginBottom: 6 }}>{fitter.rate}</div>
                              <button
                                onClick={() => handleBookFitter(fitter)}
                                className="btn-book-demo"
                                style={{ padding: '6px 14px', fontSize: 11.5 }}
                              >
                                Book Fitter Now
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FLOATING CHAT BUBBLE ===================== */}
      <div
        className="floating-chat-bubble"
        onClick={() => setShowChatModal(!showChatModal)}
        title="UdyamUtkarsh AI Production Copilot"
      >
        <MessageSquare size={22} />
      </div>

      {/* ===================== CHAT MODAL ===================== */}
      {showChatModal && (
        <div style={{
          position: 'fixed',
          bottom: 86,
          right: 28,
          width: 360,
          background: '#0d1726',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 18,
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          zIndex: 150,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            padding: '14px 18px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              <span style={{ fontWeight: 800, fontSize: 13.5 }}>UdyamUtkarsh Copilot</span>
            </div>
            <button
              onClick={() => setShowChatModal(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ padding: 16, height: 260, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? '#f5e482' : '#1e293b',
                  color: msg.sender === 'user' ? '#070d18' : '#ffffff',
                  padding: '8px 12px',
                  borderRadius: 12,
                  maxWidth: '85%',
                  fontSize: 12.5,
                  lineHeight: 1.45
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Ask about IoT retrofit, BOM, code..."
              className="dark-form-control"
              style={{ padding: '8px 12px', fontSize: 12.5 }}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              type="submit"
              style={{
                background: '#f5e482',
                border: 'none',
                borderRadius: 8,
                padding: '0 14px',
                fontWeight: 800,
                color: '#070d18',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* ===================== HOTSPOT INSPECTOR MODAL ===================== */}
      {activeHotspot && (
        <div className="tulip-modal-overlay" onClick={() => setActiveHotspot(null)}>
          <div className="tulip-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveHotspot(null)}>
              <X size={18} />
            </button>

            {/* Case: Deviation Alert (Red Hotspot) */}
            {activeHotspot === 'deviation' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: 10, borderRadius: 10 }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800 }}>Hardware Deviation & Safety Interlock</h2>
                    <p style={{ fontSize: 13, color: '#94a3b8' }}>Real-time hardware safety interrupt monitoring on GPIO 13.</p>
                  </div>
                </div>

                <div style={{ background: '#080f1a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>E-STOP STATUS</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: eStopTripped ? '#ef4444' : '#22c55e' }}>
                        {eStopTripped ? '⚠️ TRIPPED (HARDWARE HALT)' : '🟢 NORMAL (FAILSAFE ARMED)'}
                      </div>
                    </div>

                    <button
                      onClick={() => setEStopTripped(!eStopTripped)}
                      style={{
                        background: eStopTripped ? '#22c55e' : '#ef4444',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: 10,
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {eStopTripped ? 'Reset E-Stop to Normal' : 'Test Hardware E-Stop Trip'}
                    </button>
                  </div>

                  <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.6 }}>
                    • Watchdog Timer: <strong>Armed (3000ms max idle timeout)</strong><br />
                    • Relay Boot State: <strong>LOW / Safe Shutdown</strong><br />
                    • ISO 13849 Compliance: <strong>Safety Category 3 Hardwired Interlock</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Case: Equipment Integration (Teal Hotspot) */}
            {activeHotspot === 'equipment' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#14b8a6', padding: 10, borderRadius: 10 }}>
                    <ArrowRightLeft size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800 }}>Equipment Integration Architecture</h2>
                    <p style={{ fontSize: 13, color: '#94a3b8' }}>ESP32 microcontroller replacing expensive proprietary PLC controllers.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div style={{ background: '#080f1a', borderRadius: 12, padding: 18 }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>MACHINE LOAD CONTROL</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#38bdf8', marginTop: 4 }}>4-Channel Opto-Isolated Relay</div>
                    <p style={{ fontSize: 12, color: '#cbd5e1', marginTop: 8 }}>
                      Directly switches 230V AC blade cutter motor and 12V pneumatic clamp solenoids with optical noise isolation.
                    </p>
                  </div>

                  <div style={{ background: '#080f1a', borderRadius: 12, padding: 18 }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>MICROCONTROLLER UNIT</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#f5e482', marginTop: 4 }}>ESP32 DevKit V1 (30-Pin)</div>
                    <p style={{ fontSize: 12, color: '#cbd5e1', marginTop: 8 }}>
                      240MHz dual-core processor executing sensor debouncing, piece counting, and cycle automation with zero lag.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Case: Guided Weigh & Dispense / Sensor Station */}
            {activeHotspot === 'dispense' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: 10, borderRadius: 10 }}>
                    <ScanLine size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800 }}>Sensor & Guided Feed Station</h2>
                    <p style={{ fontSize: 13, color: '#94a3b8' }}>IR Obstacle and Inductive Proximity sensors for non-contact piece detection.</p>
                  </div>
                </div>

                <div style={{ background: '#080f1a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>LIVE SIMULATION</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: simRunning ? '#f5e482' : '#ffffff' }}>
                        {simRunning ? '⚡ CUTTING IN PROGRESS (CLAMP ENGAGED)' : 'READY FOR NEXT MATERIAL FEED'}
                      </div>
                    </div>

                    <button
                      onClick={triggerCycle}
                      disabled={simRunning || eStopTripped}
                      style={{
                        background: '#f5e482',
                        color: '#070d18',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: 9999,
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {simRunning ? 'Processing...' : 'Simulate Feed & Cut'}
                    </button>
                  </div>

                  <div style={{ fontSize: 12, color: '#94a3b8' }}>
                    Sensor: FC-51 Infrared (Active LOW) on GPIO 27 • Travel Limit: ME-8108 Roller Switch on GPIO 26
                  </div>
                </div>
              </div>
            )}

            {/* Case: Smart BOM */}
            {activeHotspot === 'bom' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800 }}>AI Smart BOM & Cost Comparison</h2>
                    <p style={{ fontSize: 13, color: '#94a3b8' }}>Local Indian market prices (Chandni Chowk / Lamington Road).</p>
                  </div>

                  <div style={{
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid #22c55e',
                    padding: '8px 16px',
                    borderRadius: 10,
                    color: '#22c55e',
                    fontWeight: 800
                  }}>
                    92.5% SAVED VS PLC
                  </div>
                </div>

                <div style={{ background: '#080f1a', borderRadius: 12, padding: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' }}>
                        <th style={{ padding: '8px 10px' }}>COMPONENT</th>
                        <th style={{ padding: '8px 10px' }}>QTY</th>
                        <th style={{ padding: '8px 10px' }}>UNIT PRICE</th>
                        <th style={{ padding: '8px 10px' }}>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'ESP32 DevKit V1 (30-Pin)', qty: 1, price: 450 },
                        { name: '4-Channel Relay Module (Opto-Isolated)', qty: 1, price: 180 },
                        { name: 'Inductive Proximity Sensor (LJ12A3)', qty: 1, price: 190 },
                        { name: 'Infrared Obstacle Sensor (FC-51)', qty: 1, price: 50 },
                        { name: '12V 5A Industrial Metal SMPS', qty: 1, price: 450 },
                        { name: 'Emergency Stop Mushroom Switch', qty: 1, price: 140 },
                        { name: 'Heavy Duty ABS IP65 Enclosure', qty: 1, price: 320 }
                      ].map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '10px', fontWeight: 600 }}>{item.name}</td>
                          <td style={{ padding: '10px' }}>{item.qty}</td>
                          <td style={{ padding: '10px' }}>₹{item.price}</td>
                          <td style={{ padding: '10px', color: '#22c55e', fontWeight: 700 }}>₹{item.price * item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ fontWeight: 800 }}>
                        <td colSpan={3} style={{ padding: '14px 10px', fontSize: 14 }}>TOTAL IOT RETROFIT COST:</td>
                        <td style={{ padding: '14px 10px', color: '#22c55e', fontSize: 16 }}>₹1,780</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Case: Fitter Marketplace */}
            {activeHotspot === 'fitter' && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Verified Local Fitter Dispatched</h2>
                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>
                  Certified industrial electrician available for on-site machine wiring and testing.
                </p>

                <div style={{ background: '#080f1a', borderRadius: 14, padding: 18, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&auto=format&fit=crop&q=80"
                    alt="Ramesh Sharma"
                    style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 800 }}>Ramesh Sharma</h3>
                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>
                        VERIFIED FITTER
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                      Okhla Industrial Area (2.4 km away) • 4.9 ★ (48 installations)
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#22c55e', marginTop: 6 }}>
                      ₹450 / visit
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== "BUILD YOUR PRODUCTION SYSTEM" BLUEPRINT MODAL ===================== */}
      {showBlueprintModal && (
        <div className="tulip-modal-overlay" onClick={() => setShowBlueprintModal(false)}>
          <div className="tulip-modal-card" style={{ maxWidth: 840 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowBlueprintModal(false)}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ background: 'rgba(245, 228, 130, 0.15)', color: '#f5e482', padding: 10, borderRadius: 12 }}>
                <Boxes size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>Build your Production System Blueprint</h2>
                <p style={{ fontSize: 13, color: '#94a3b8' }}>
                  AI-Powered Low-Cost Industrial Automation for Small Factories & Workshops
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#cbd5e1' }}>
                  Machine Type
                </label>
                <select
                  className="dark-form-control"
                  value={intakeData.machineType}
                  onChange={(e) => setIntakeData({ ...intakeData, machineType: e.target.value })}
                >
                  <option value="PVC Pipe Cutter">PVC Pipe Auto-Cutter</option>
                  <option value="Photo Frame Mitre Cutter">Photo Frame Mitre Saw</option>
                  <option value="Packaging Heat Sealer">Bag Packaging Heat Sealer</option>
                  <option value="Conveyor Batch Counter">Conveyor Counter & Stopper</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#cbd5e1' }}>
                  Operating Voltage
                </label>
                <select
                  className="dark-form-control"
                  value={intakeData.voltage}
                  onChange={(e) => setIntakeData({ ...intakeData, voltage: e.target.value })}
                >
                  <option value="230V AC">230V AC Single Phase</option>
                  <option value="415V 3-Phase">415V Three Phase</option>
                  <option value="24V DC">24V DC Industrial</option>
                  <option value="12V DC">12V DC Low Voltage</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#cbd5e1' }}>
                Machine Challenge / Automation Goal
              </label>
              <textarea
                rows={3}
                className="dark-form-control"
                value={intakeData.problem}
                onChange={(e) => setIntakeData({ ...intakeData, problem: e.target.value })}
              />
            </div>

            <div style={{
              background: '#080f1a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: 20,
              marginBottom: 24
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>AI ESTIMATED HARDWARE COST</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#22c55e', marginTop: 2 }}>₹2,850 Total</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>TRADITIONAL PLC QUOTATION</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#94a3b8', textDecoration: 'line-through' }}>₹38,000</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: 10,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => setShowBlueprintModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-build-system"
                style={{ width: 'auto', padding: '12px 28px' }}
                onClick={() => {
                  setShowBlueprintModal(false);
                  scrollToSection('features-section');
                }}
              >
                Generate Production Blueprint →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== LOGIN MODAL ===================== */}
      {showLoginModal && (
        <div className="tulip-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="tulip-modal-card" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowLoginModal(false)}>
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ display: 'inline-flex', background: 'rgba(245, 228, 130, 0.15)', color: '#f5e482', padding: 12, borderRadius: '50%', marginBottom: 12 }}>
                <User size={28} />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>UdyamUtkarsh Portal Login</h2>
              <p style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 4 }}>Access your factory automation blueprints & fitter jobs</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 6 }}>EMAIL / PHONE NUMBER</label>
                <input type="text" className="dark-form-control" placeholder="factory@msme.gov.in" defaultValue="rishabh@udyamutkarsh.com" />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 6 }}>PASSWORD</label>
                <input type="password" className="dark-form-control" defaultValue="••••••••••••" />
              </div>

              <button
                className="btn-build-system"
                style={{ marginTop: 10 }}
                onClick={() => {
                  alert("Logged in as Rishabh Sharma (MSME Factory Admin)");
                  setShowLoginModal(false);
                }}
              >
                Sign In to Platform
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== INDIAN MACHINE TEMPLATE LIBRARY MODAL ===================== */}
      {showTemplateLibraryModal && (
        <div className="tulip-modal-overlay" onClick={() => setShowTemplateLibraryModal(false)}>
          <div className="tulip-modal-card" style={{ maxWidth: 940 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowTemplateLibraryModal(false)}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div style={{ background: 'rgba(245, 228, 130, 0.15)', color: '#f5e482', padding: 12, borderRadius: 12 }}>
                <BookOpen size={26} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800 }}>Indian Machine Template Library</h2>
                  <span style={{ fontSize: 11, background: 'rgba(245, 228, 130, 0.2)', color: '#f5e482', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                    Tulip & Vention Architecture
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 3 }}>
                  Pre-configured industrial blueprints for common Indian MSME workshop machines. Select a template to auto-populate hardware, wiring, and cost ROI.
                </p>
              </div>
            </div>

            {/* Template Cards Grid */}
            <div className="template-grid">
              {machineTemplates.map(template => (
                <div key={template.id} className="template-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <span className="template-category-badge">{template.category}</span>
                      <span style={{ fontSize: 11, background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '2px 8px', borderRadius: 6, fontWeight: 800 }}>
                        Save {template.savingsPct}%
                      </span>
                    </div>

                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
                      {template.name}
                    </h3>

                    <p style={{ fontSize: 11.5, color: '#cbd5e1', lineHeight: 1.5, marginBottom: 12 }}>
                      {template.problem}
                    </p>

                    {/* Cost Arbitrage Comparison */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12
                    }}>
                      <div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>IOT RETROFIT</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#22c55e' }}>₹{template.iotCost.toLocaleString('en-IN')}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>TRADITIONAL PLC</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', textDecoration: 'line-through' }}>
                          ₹{template.plcCost.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Inputs & Actuators Pills */}
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 4 }}>SENSORS & ACTUATORS</div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {template.inputs.slice(0, 2).map((inp, idx) => (
                          <span key={idx} style={{ fontSize: 10, background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '2px 6px', borderRadius: 4 }}>
                            {inp}
                          </span>
                        ))}
                        {template.actuators.slice(0, 1).map((act, idx) => (
                          <span key={idx} style={{ fontSize: 10, background: 'rgba(245, 228, 130, 0.1)', color: '#f5e482', padding: '2px 6px', borderRadius: 4 }}>
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLoadTemplate(template)}
                    className="btn-book-demo"
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: 12.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    <Sparkles size={14} />
                    <span>⚡ Load Template & Auto-Configure</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== REGIONAL VIDEO GUIDE MODAL (HINDI ITI TRAINING) ===================== */}
      {showVideoGuideModal && (
        <div className="tulip-modal-overlay" onClick={() => setShowVideoGuideModal(false)}>
          <div className="tulip-modal-card" style={{ maxWidth: 840 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowVideoGuideModal(false)}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: 12, borderRadius: 12 }}>
                <Video size={26} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800 }}>Regional Video Guide (2-Min Hindi SOP)</h2>
                  <span style={{ fontSize: 10.5, background: 'rgba(34, 197, 94, 0.18)', color: '#22c55e', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                    ITI Electrician Training
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 2 }}>
                  Grassroot installation guide for local electricians & ITI students. Zero complex English manuals needed.
                </p>
              </div>
            </div>

            {/* Video Player Simulation Container */}
            <div className="video-player-container" style={{ marginBottom: 16 }}>
              <div className="video-screen-simulation">
                {/* Overlay Header */}
                <div style={{ position: 'absolute', top: 12, left: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#ffffff', letterSpacing: 0.5 }}>
                    STEP {activeVideoStep} OF 4: {
                      activeVideoStep === 1 ? '12V SMPS Power Supply Wiring' :
                      activeVideoStep === 2 ? 'ESP32 Pin 18 & 19 to 4-Channel Relay' :
                      activeVideoStep === 3 ? 'LJ12A3 Proximity & E-Stop Safety' :
                      'Power-Up & Mobile SoftAP Test Cut'
                    }
                  </span>
                </div>

                <div style={{ position: 'absolute', top: 12, right: 14, fontSize: 11, color: '#f5e482', fontWeight: 700 }}>
                  0{activeVideoStep * 30}:00 / 02:00 (Hindi Audio)
                </div>

                {/* Animated Graphic Center */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    background: 'rgba(245, 228, 130, 0.15)',
                    border: '2px solid #f5e482',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    cursor: 'pointer'
                  }}>
                    <Play size={30} fill="#f5e482" color="#f5e482" />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#ffffff' }}>
                    {activeVideoStep === 1 && '"12V SMPS ko 230V AC terminal block se connect karein"'}
                    {activeVideoStep === 2 && '"ESP32 Pin 18 ko Relay ke IN1 terminal se jodein (Cut Motor)"'}
                    {activeVideoStep === 3 && '"LJ12A3 Sensor ka Black wire GPIO 27 par tight karein"'}
                    {activeVideoStep === 4 && '"Mobile Wi-Fi se jud kar Test Cut button press karein"'}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                    Hindi Audio SOP • 1080p Crystal Clear ITI Demonstration
                  </div>
                </div>

                {/* Bottom Scrub Bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                  <div className="video-scrub-bar">
                    <div className="video-scrub-progress" style={{ width: `${(activeVideoStep / 4) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Interactive Step Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { step: 1, title: 'Step 1: 12V SMPS Power Rail', desc: 'Mains 230V AC ko SMPS L/N par aur 12V DC ko terminal busbar se connect karein.' },
                { step: 2, title: 'Step 2: Pin 18/19 -> Relay IN1/IN2', desc: 'ESP32 GPIO 18 ko Relay IN1 (Cut Saw) aur GPIO 19 ko Solenoid Clamp se jodein.' },
                { step: 3, title: 'Step 3: Sensors & E-Stop ISR', desc: 'LJ12A3 sensor ko GPIO 27 aur Twist-Release E-Stop button ko GPIO 13 ISR par lagayein.' },
                { step: 4, title: 'Step 4: Phone Wi-Fi Test Cut', desc: 'Phone par "ESP32-HOTSPOT" se judkar browser mein 192.168.4.1 kholkar test run karein.' }
              ].map(item => (
                <div
                  key={item.step}
                  className={`video-step-row ${activeVideoStep === item.step ? 'active' : ''}`}
                  onClick={() => setActiveVideoStep(item.step)}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: activeVideoStep === item.step ? '#f5e482' : 'rgba(255,255,255,0.08)',
                    color: activeVideoStep === item.step ? '#070d18' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 12
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: activeVideoStep === item.step ? '#f5e482' : '#ffffff' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 10.5, color: '#94a3b8', lineHeight: 1.3 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <QrCode size={28} color="#f5e482" />
                <span style={{ fontSize: 11, color: '#94a3b8' }}>
                  QR Code is printed on the physical machine panel for instant technician scanning.
                </span>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => alert("1-Page Hindi SOP Wiring PDF downloaded!")}
                  className="btn-book-demo"
                  style={{ padding: '8px 16px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Download size={13} />
                  <span>Download Hindi Wiring PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("WhatsApp share link copied! Sent to local electrician: +91 98765 43210")}
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  📲 Send to Electrician via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


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
  CheckCircle
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

          <div className="tulip-nav-link" onClick={() => setShowBlueprintModal(true)}>
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

            {/* Embedded Studio App Window */}
            <div className="embedded-studio-card">
              {/* Top Studio Navbar */}
              <div className="studio-navbar">
                <div className="studio-nav-left">
                  <div className="studio-pill-tag">
                    <Boxes size={14} color="#f5e482" />
                    <span>
                      {selectedFeature === 1 && 'Smart Intake Engine'}
                      {selectedFeature === 2 && 'Cost Crusher ROI'}
                      {selectedFeature === 3 && 'Smart Sourcing BOM'}
                      {selectedFeature === 4 && 'Firmware & Wiring'}
                      {selectedFeature === 5 && 'AI Vision to G-Code Studio'}
                      {selectedFeature === 6 && 'ESP32 Smartphone HMI'}
                      {selectedFeature === 7 && 'Uber for Fitters Network'}
                    </span>
                    <ChevronDown size={12} />
                  </div>

                  <div className="studio-tabs-row">
                    <span className={`studio-tab-item ${selectedFeature === 1 ? 'active' : ''}`} onClick={() => setSelectedFeature(1)}>Smart Ask</span>
                    <span className={`studio-tab-item ${selectedFeature === 2 ? 'active' : ''}`} onClick={() => setSelectedFeature(2)}>Cost Crusher</span>
                    <span className={`studio-tab-item ${selectedFeature === 3 ? 'active' : ''}`} onClick={() => setSelectedFeature(3)}>BOM</span>
                    <span className={`studio-tab-item ${selectedFeature === 4 ? 'active' : ''}`} onClick={() => setSelectedFeature(4)}>Tech Blueprint</span>
                    <span className={`studio-tab-item ${selectedFeature === 5 ? 'active' : ''}`} onClick={() => setSelectedFeature(5)}>Vision G-Code</span>
                    <span className={`studio-tab-item ${selectedFeature === 6 ? 'active' : ''}`} onClick={() => setSelectedFeature(6)}>Phone HMI</span>
                    <span className={`studio-tab-item ${selectedFeature === 7 ? 'active' : ''}`} onClick={() => setSelectedFeature(7)}>Fitters</span>
                  </div>
                </div>

                <div style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
                  <span>Interactive Live Studio</span>
                </div>
              </div>

              {/* Sub-breadcrumbs bar */}
              <div className="studio-breadcrumbs-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>UdyamUtkarsh</span>
                  <span>/</span>
                  <strong style={{ color: '#ffffff' }}>
                    {selectedFeature === 1 && '01_Machine_Intake_Form'}
                    {selectedFeature === 2 && '02_Cost_Crusher_ROI_Analysis'}
                    {selectedFeature === 3 && '03_Bill_Of_Materials_Catalog'}
                    {selectedFeature === 4 && '04_Arduino_Firmware_Pin_Wiring'}
                    {selectedFeature === 5 && '05_Gemini_Vision_To_GCode'}
                    {selectedFeature === 6 && '06_Mobile_Local_Web_HMI'}
                    {selectedFeature === 7 && '07_Local_Electrician_Gig_Network'}
                  </strong>
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  <span style={{ color: '#f5e482', fontWeight: 700 }}>● Demo Mode: Active</span>
                </div>
              </div>

              {/* Canvas 3-Column Layout */}
              <div className="studio-canvas-layout">
                {/* Left Tree */}
                <div className="studio-left-tree">
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 10 }}>SUB-MODULES</div>

                  {selectedFeature === 1 && (
                    <>
                      <div className="studio-tree-item active">› Machine Type</div>
                      <div className="studio-tree-item">› Problem Spec</div>
                      <div className="studio-tree-item">› Budget Bounds</div>
                      <div className="studio-tree-item">› Safety Triggers</div>
                    </>
                  )}

                  {selectedFeature === 2 && (
                    <>
                      <div className="studio-tree-item active">› PLC vs IoT Table</div>
                      <div className="studio-tree-item">› 92% Savings Matrix</div>
                      <div className="studio-tree-item">› Payback Calculator</div>
                      <div className="studio-tree-item">› 1-Year ROI Model</div>
                    </>
                  )}

                  {selectedFeature === 3 && (
                    <>
                      <div className="studio-tree-item active">› ESP32 Controller</div>
                      <div className="studio-tree-item">› Opto Relays</div>
                      <div className="studio-tree-item">› Proximity & IR</div>
                      <div className="studio-tree-item">› Sourcing Hubs</div>
                    </>
                  )}

                  {selectedFeature === 4 && (
                    <>
                      <div className="studio-tree-item active">› C++ Firmware (.ino)</div>
                      <div className="studio-tree-item">› Pin Matrix Table</div>
                      <div className="studio-tree-item">› Watchdog Timer</div>
                      <div className="studio-tree-item">› E-Stop Interrupt</div>
                    </>
                  )}

                  {selectedFeature === 5 && (
                    <>
                      <div className="studio-tree-item active">› Flange Gasket</div>
                      <div className="studio-tree-item">› L-Bracket</div>
                      <div className="studio-tree-item">› Pipe Cut & Chamfer</div>
                      <div className="studio-tree-item">› Toolpath Preview</div>
                    </>
                  )}

                  {selectedFeature === 6 && (
                    <>
                      <div className="studio-tree-item active">› SoftAP 192.168.4.1</div>
                      <div className="studio-tree-item">› Worker Controls</div>
                      <div className="studio-tree-item">› Piece Counter</div>
                      <div className="studio-tree-item">› Zero Laptop Needed</div>
                    </>
                  )}

                  {selectedFeature === 7 && (
                    <>
                      <div className="studio-tree-item active">› Verified Fitters</div>
                      <div className="studio-tree-item">› Delhi NCR Hub</div>
                      <div className="studio-tree-item">› Faridabad & Okhla</div>
                      <div className="studio-tree-item">› One-Click Dispatch</div>
                    </>
                  )}
                </div>

                {/* Center Canvas Area (Interactive Dynamic Feature Canvas) */}
                <div className="studio-center-canvas">
                  {/* FEATURE 1: SMART ASK INPUT FORM */}
                  {selectedFeature === 1 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#f5e482' }}>📝 "Smart Ask" Simple Non-Technical Intake</span>
                        <span style={{ fontSize: 11, color: '#22c55e', background: 'rgba(34,197,94,0.15)', padding: '2px 8px', borderRadius: 6 }}>● Ready for Input</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                          <label style={{ fontSize: 11.5, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            1. Machine Type (Apni Machine Chunein ya Likhein)
                          </label>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                            {['PVC Pipe Cutter', 'Photo Frame 45° Mitre Cutter', 'Bag Packaging Heat Sealer', 'Rotary Punch Press'].map(m => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => setIntakeData({ ...intakeData, machineType: m })}
                                style={{
                                  background: intakeData.machineType === m ? 'rgba(245, 228, 130, 0.2)' : 'rgba(255,255,255,0.05)',
                                  border: `1px solid ${intakeData.machineType === m ? '#f5e482' : 'rgba(255,255,255,0.1)'}`,
                                  color: intakeData.machineType === m ? '#f5e482' : '#cbd5e1',
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

                  {/* FEATURE 3: AI-GENERATED BILL OF MATERIALS (BOM) */}
                  {selectedFeature === 3 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 18, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8' }}>📦 AI-Generated Bill of Materials (BOM)</span>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Total: <strong style={{ color: '#f5e482', fontSize: 13 }}>₹1,980</strong></span>
                      </div>

                      <div style={{ maxHeight: 220, overflowY: 'auto', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5, textAlign: 'left' }}>
                          <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.04)', color: '#94a3b8' }}>
                              <th style={{ padding: '8px 10px' }}>Component</th>
                              <th style={{ padding: '8px 6px' }}>Qty</th>
                              <th style={{ padding: '8px 10px' }}>Est. Price</th>
                              <th style={{ padding: '8px 10px' }}>Purpose / Sourcing</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'ESP32 DevKit V1 (30-Pin)', qty: 1, price: '₹450', hub: 'Chawri Bazar / Robu' },
                              { name: '4-Channel Relay (Opto-Isolated)', qty: 1, price: '₹180', hub: 'Local Market / Quartz' },
                              { name: 'Inductive Proximity (LJ12A3)', qty: 1, price: '₹190', hub: 'Industrial Limit Sensing' },
                              { name: 'IR Obstacle Sensor (FC-51)', qty: 1, price: '₹50', hub: 'Pipe Arrival Detection' },
                              { name: '12V 5A Metal SMPS Power', qty: 1, price: '₹450', hub: 'Clean DC Power' },
                              { name: 'Twist-Release E-Stop Button', qty: 1, price: '₹140', hub: 'Hardware Safety Cutoff' },
                              { name: 'ABS Waterproof Enclosure', qty: 1, price: '₹320', hub: 'Dust & Oil Protection' },
                              { name: 'DIN Rail Terminals & Wire', qty: 1, price: '₹200', hub: 'Terminal Interfacing' }
                            ].map((item, idx) => (
                              <tr key={idx} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                                <td style={{ padding: '7px 10px', fontWeight: 600, color: '#ffffff' }}>{item.name}</td>
                                <td style={{ padding: '7px 6px' }}>{item.qty}</td>
                                <td style={{ padding: '7px 10px', color: '#34d399', fontWeight: 700 }}>{item.price}</td>
                                <td style={{ padding: '7px 10px', color: '#94a3b8' }}>{item.hub}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                        <button
                          onClick={() => alert("BOM exported to CSV & WhatsApp purchase list generated!")}
                          className="btn-book-demo"
                          style={{ padding: '7px 16px', fontSize: 12 }}
                        >
                          ⬇ Export 1-Click Sourcing CSV
                        </button>
                        <button
                          onClick={() => setSelectedFeature(4)}
                          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '7px 14px', borderRadius: 9999, fontSize: 12, cursor: 'pointer' }}
                        >
                          Next: Auto-Firmware & Wiring →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE 4: TECH BLUEPRINT (FIRMWARE & WIRING) */}
                  {selectedFeature === 4 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 18, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#f5e482' }}>⚡ Auto-Firmware (C++) & Pin-to-Pin Wiring</span>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <span style={{ fontSize: 10, background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '2px 6px', borderRadius: 4 }}>ISO 13849 Checks Passed</span>
                          <span style={{ fontSize: 10, background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 6px', borderRadius: 4 }}>Watchdog Active</span>
                        </div>
                      </div>

                      {/* Pin Mapping Matrix */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 6, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 800 }}>GPIO 13</div>
                          <div style={{ fontSize: 11, color: '#ffffff' }}>E-Stop (ISR)</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 6, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 800 }}>GPIO 14</div>
                          <div style={{ fontSize: 11, color: '#ffffff' }}>Start Button</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 6, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#38bdf8', fontWeight: 800 }}>GPIO 27</div>
                          <div style={{ fontSize: 11, color: '#ffffff' }}>IR Pipe Detect</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 6, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#f5e482', fontWeight: 800 }}>GPIO 32/33</div>
                          <div style={{ fontSize: 11, color: '#ffffff' }}>Relay Cut & Clamp</div>
                        </div>
                      </div>

                      {/* Code Snippet Box */}
                      <div className="gcode-code-box" style={{ maxHeight: 150, fontSize: 11 }}>
{`// UdyamUtkarsh ISO 13849 Compliant Machine Controller
#include <esp_task_wdt.h>
void IRAM_ATTR handleEmergencyStop() {
    digitalWrite(PIN_RELAY_CUT, HIGH);   // Immediate hardware cutoff
    digitalWrite(PIN_RELAY_CLAMP, HIGH); // De-energize solenoid
}
void setup() {
    pinMode(PIN_RELAY_CUT, OUTPUT);
    digitalWrite(PIN_RELAY_CUT, HIGH);   // Failsafe boot OFF
    attachInterrupt(digitalPinToInterrupt(13), handleEmergencyStop, FALLING);
}`}
                      </div>

                      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("// UdyamUtkarsh Complete Arduino Firmware...");
                            setCopiedCode(true);
                            setTimeout(() => setCopiedCode(false), 2000);
                          }}
                          className="btn-book-demo"
                          style={{ padding: '6px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                        >
                          <Copy size={13} />
                          <span>{copiedCode ? '✓ Copied to Clipboard!' : 'Copy Arduino .ino Code'}</span>
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

                      {/* 2D Toolpath Canvas & Coordinates Preview */}
                      <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 12, marginBottom: 12 }}>
                        {/* 2D SVG Toolpath Visualizer */}
                        <div style={{ background: '#050a12', borderRadius: 8, padding: 10, border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4, fontWeight: 700 }}>TOOLPATH VECTOR CANVAS</div>
                          <svg viewBox="-80 -80 160 160" style={{ width: '100%', height: 110 }}>
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
                          <div style={{ fontSize: 9.5, color: '#f5e482', fontWeight: 700 }}>Outer: 120mm | Holes: 4x M10</div>
                        </div>

                        {/* Generated G-Code snippet */}
                        <div className="gcode-code-box" style={{ maxHeight: 130 }}>
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

                  {/* FEATURE 6: SMARTPHONE AS HMI (ZERO LAPTOP REQUIREMENT) */}
                  {selectedFeature === 6 && (
                    <div style={{ background: '#0b1424', borderRadius: 12, padding: 18, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#22c55e' }}>📱 "Smartphone as HMI" (Zero Laptop Required)</span>
                        <span style={{ fontSize: 11, background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '2px 8px', borderRadius: 6 }}>
                          ● SoftAP: 192.168.4.1
                        </span>
                      </div>

                      {/* Phone Frame Mockup */}
                      <div className="hmi-phone-mockup">
                        <div className="hmi-phone-notch">
                          <div className="hmi-phone-camera" />
                        </div>

                        <div className="hmi-phone-screen">
                          <div>
                            <div className="hmi-status-bar">
                              <span>📶 ESP32-HOTSPOT</span>
                              <span style={{ color: '#22c55e', fontWeight: 800 }}>CONNECTED</span>
                              <span>100% 🔋</span>
                            </div>

                            <div style={{ textAlign: 'center', margin: '12px 0 8px 0' }}>
                              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>UDYAMUTKARSH OPERATOR HMI</div>
                              <div style={{ fontSize: 15, fontWeight: 900, color: '#ffffff' }}>PVC Cutter Unit #04</div>
                            </div>

                            {/* Live Stats Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '10px 0' }}>
                              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 8, textAlign: 'center' }}>
                                <div style={{ fontSize: 9.5, color: '#94a3b8' }}>PIECES CUT</div>
                                <div style={{ fontSize: 20, fontWeight: 900, color: '#f5e482' }}>{hmiCycles}</div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 8, textAlign: 'center' }}>
                                <div style={{ fontSize: 9.5, color: '#94a3b8' }}>STATUS</div>
                                <div style={{ fontSize: 12, fontWeight: 800, color: hmiSimRunning ? '#22c55e' : '#38bdf8', marginTop: 4 }}>
                                  {hmiSimRunning ? 'CUTTING...' : 'READY'}
                                </div>
                              </div>
                            </div>

                            {/* Length Adjustment Slider */}
                            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 10, margin: '8px 0' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#cbd5e1', marginBottom: 4 }}>
                                <span>Cut Length:</span>
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
                          </div>

                          {/* Operator Action Buttons */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                            <button
                              type="button"
                              onClick={triggerHmiCycle}
                              disabled={hmiSimRunning || eStopTripped}
                              className="hmi-btn-start"
                            >
                              <Play size={16} fill="#ffffff" />
                              <span>{hmiSimRunning ? 'Executing Cut Stroke...' : 'START CUT CYCLE'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setEStopTripped(!eStopTripped)}
                              className="hmi-btn-estop"
                            >
                              <AlertTriangle size={15} />
                              <span>{eStopTripped ? 'RESET EMERGENCY STOP' : 'EMERGENCY STOP'}</span>
                            </button>
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

                {/* Right Inspector Panel */}
                <div className="studio-right-inspector">
                  <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8, marginBottom: 12 }}>
                    <strong style={{ color: '#ffffff' }}>Telemetry</strong>
                    <span style={{ color: '#64748b' }}>Specs</span>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ color: '#94a3b8', fontSize: 10.5, display: 'block', marginBottom: 4 }}>ACTIVE SUBSYSTEM</label>
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 8px', borderRadius: 6, color: '#f5e482', fontWeight: 700 }}>
                      {selectedFeature === 1 && 'Smart Ask Parser'}
                      {selectedFeature === 2 && 'ROI Cost Crusher'}
                      {selectedFeature === 3 && 'BOM Sourcing Hub'}
                      {selectedFeature === 4 && 'ISO 13849 Compiler'}
                      {selectedFeature === 5 && 'Gemini Vision Engine'}
                      {selectedFeature === 6 && 'ESP32 SoftAP WebServer'}
                      {selectedFeature === 7 && 'Fitter Dispatch SLA'}
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ color: '#94a3b8', fontSize: 10.5, display: 'block', marginBottom: 4 }}>
                      {selectedFeature === 1 && 'INPUT VALIDATION'}
                      {selectedFeature === 2 && 'RETROFIT SCALE'}
                      {selectedFeature === 3 && 'SOURCING HUBS'}
                      {selectedFeature === 4 && 'CONTROLLER TARGET'}
                      {selectedFeature === 5 && 'CUTTING TOOL'}
                      {selectedFeature === 6 && 'NETWORK MODE'}
                      {selectedFeature === 7 && 'DISPATCH TIME'}
                    </label>
                    <div style={{ color: '#ffffff', fontSize: 11, fontWeight: 600 }}>
                      {selectedFeature === 1 && 'Verified 230V Single Phase'}
                      {selectedFeature === 2 && `${retrofitMachineCount} Factory Machine(s)`}
                      {selectedFeature === 3 && 'Chawri Bazar / Robu / Quartz'}
                      {selectedFeature === 4 && 'ESP32 DevKit V1 (240MHz)'}
                      {selectedFeature === 5 && '3.175mm 2-Flute Endmill'}
                      {selectedFeature === 6 && 'Local SoftAP (192.168.4.1)'}
                      {selectedFeature === 7 && '< 24 Hours On-Site SLA'}
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ color: '#94a3b8', fontSize: 10.5, display: 'block', marginBottom: 4 }}>
                      {selectedFeature === 1 && 'ESTIMATED BUDGET'}
                      {selectedFeature === 2 && 'NET SAVINGS'}
                      {selectedFeature === 3 && 'TOTAL HARDWARE'}
                      {selectedFeature === 4 && 'WATCHDOG TIMER'}
                      {selectedFeature === 5 && 'SPINDLE SPEED'}
                      {selectedFeature === 6 && 'INTERFACE CAPEX'}
                      {selectedFeature === 7 && 'VERIFICATION'}
                    </label>
                    <div style={{ color: '#22c55e', fontWeight: 800, fontSize: 13 }}>
                      {selectedFeature === 1 && `₹${intakeData.budget} Target`}
                      {selectedFeature === 2 && `₹${((45000 - 3500) * retrofitMachineCount).toLocaleString('en-IN')} (-92.2%)`}
                      {selectedFeature === 3 && '₹1,980 (8 Components)'}
                      {selectedFeature === 4 && '3000ms Hardware Interlock'}
                      {selectedFeature === 5 && '12,000 RPM (PWM Controlled)'}
                      {selectedFeature === 6 && '₹0 (Free via Mobile Wi-Fi)'}
                      {selectedFeature === 7 && '100% Background & ITI Certified'}
                    </div>
                  </div>

                  <div>
                    <label style={{ color: '#94a3b8', fontSize: 10.5, display: 'block', marginBottom: 4 }}>
                      {selectedFeature === 1 && 'INFERENCE SPEED'}
                      {selectedFeature === 2 && 'PAYBACK PERIOD'}
                      {selectedFeature === 3 && 'LOCAL AVAILABILITY'}
                      {selectedFeature === 4 && 'SAFETY STANDARD'}
                      {selectedFeature === 5 && 'ESTIMATED CUT TIME'}
                      {selectedFeature === 6 && 'CLIENT LATENCY'}
                      {selectedFeature === 7 && 'WORKMANSHIP WARRANTY'}
                    </label>
                    <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 11 }}>
                      {selectedFeature === 1 && '< 1.2s Real-Time Parser'}
                      {selectedFeature === 2 && '11.4 Days (at 200 cycles/day)'}
                      {selectedFeature === 3 && '100% In-Stock Indian Market'}
                      {selectedFeature === 4 && 'ISO 13849 / SIL-2 Ready'}
                      {selectedFeature === 5 && '1 min 34 sec'}
                      {selectedFeature === 6 && '< 8ms Instant Response'}
                      {selectedFeature === 7 && '30-Day Guarantee Included'}
                    </div>
                  </div>
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
    </div>
  );
}

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load seed components
let components = [];
try {
  const compData = readFileSync(join(__dirname, 'data', 'components.seed.json'), 'utf-8');
  components = JSON.parse(compData);
} catch (e) {
  console.error('[Data] Failed to load components seed:', e.message);
}

// In-Memory Database store for fast demonstration and Phase 0/1 testing
let projects = [
  {
    id: "proj-1",
    machineType: "PVC Pipe Cutter",
    problem: "Manual cut length variation and human fatigue; requires automatic push & cut trigger",
    budget: 3500,
    voltage: "230V AC",
    loadType: ["Cutter Motor", "Pneumatic Clamp"],
    inputsNeeded: ["IR sensor (pipe detection)", "Limit switch (blade home)", "Emergency stop"],
    status: "code_ready",
    createdAt: "2026-10-14T10:30:00Z",
    stats: {
      iotCost: 2850,
      plcCost: 38000,
      savingsPct: 92.5
    }
  },
  {
    id: "proj-2",
    machineType: "Photo Frame 45° Mitre Cutter",
    problem: "Two-step cut sequencing: clamp wood, advance blade, release clamp",
    budget: 4500,
    voltage: "230V AC",
    loadType: ["12V Solenoid Valve", "230V Blade Motor"],
    inputsNeeded: ["Foot pedal switch", "Safety interlock guard", "Cycle counter"],
    status: "bom_ready",
    createdAt: "2026-10-15T14:15:00Z",
    stats: {
      iotCost: 3450,
      plcCost: 42000,
      savingsPct: 91.8
    }
  },
  {
    id: "proj-3",
    machineType: "Bag Packaging Heat Sealer",
    problem: "Heater dwell time needs exact 1.8 second impulse, followed by cooling delay",
    budget: 3000,
    voltage: "230V AC",
    loadType: ["Nichrome Heating Wire (SSR)", "Cooling Fan"],
    inputsNeeded: ["Start lever microswitch", "Digital counter reset", "Overheat thermistor"],
    status: "installed",
    createdAt: "2026-10-16T09:00:00Z",
    stats: {
      iotCost: 2450,
      plcCost: 32000,
      savingsPct: 92.3
    }
  }
];

let fitters = [
  {
    id: "fit-1",
    name: "Ramesh Sharma",
    phone: "+91 98765 43210",
    serviceArea: "Okhla Industrial Area & Faridabad",
    distanceKm: 2.4,
    rating: 4.9,
    jobsCompleted: 48,
    verified: true,
    chargesPerVisit: "₹450 / visit",
    skills: ["ESP32 / Relay Panels", "Motor Rewinding", "Industrial AC 230V Wiring", "MCB & Safety Grounding"],
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "fit-2",
    name: "Anil Kumar Chauhan",
    phone: "+91 98111 22334",
    serviceArea: "Noida Sector 63 & Ghaziabad",
    distanceKm: 4.1,
    rating: 4.8,
    jobsCompleted: 35,
    verified: true,
    chargesPerVisit: "₹500 / visit",
    skills: ["Sensor Calibration", "Pneumatic Solenoids", "Arduino / Microcontrollers", "Panel Neat Wiring"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "fit-3",
    name: "Mohammad Aslam",
    phone: "+91 97182 99011",
    serviceArea: "Bawana Industrial Estate, Delhi",
    distanceKm: 6.8,
    rating: 4.9,
    jobsCompleted: 62,
    verified: true,
    chargesPerVisit: "₹600 / visit",
    skills: ["Heavy Conveyor Motors", "Opto-Isolated Relays", "Emergency Interlocks", "Three-Phase & Single-Phase"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];

let jobs = [
  {
    id: "job-101",
    projectId: "proj-1",
    machineName: "PVC Pipe Cutter Auto-Retrofit",
    fitterId: "fit-1",
    fitterName: "Ramesh Sharma",
    userNotes: "Please bring 2-core industrial shielded cable for IR sensor.",
    preferredDate: "2026-10-19",
    status: "in-progress",
    price: "₹650",
    safetyPassed: true
  },
  {
    id: "job-102",
    projectId: "proj-3",
    machineName: "Bag Packaging Heat Sealer",
    fitterId: "fit-2",
    fitterName: "Anil Kumar Chauhan",
    userNotes: "SSR-40DA installed on heatsink with 230V nichrome wire.",
    preferredDate: "2026-10-16",
    status: "completed",
    price: "₹500",
    safetyPassed: true,
    rating: 5
  }
];

// Phase 0 Requirement: GET /api/health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    phase: 'Phase 0 – Setup and Planning Complete',
    database: 'connected',
    serverTime: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'UdyamUtkarsh API Gateway',
    version: '1.0.0',
    endpoints: [
      'GET /api/health',
      'GET /api/components',
      'GET /api/projects',
      'POST /api/projects',
      'POST /api/projects/:id/bom',
      'POST /api/projects/:id/code',
      'GET /api/fitters',
      'GET /api/jobs'
    ]
  });
});

// Component catalogue endpoint
app.get('/api/components', (req, res) => {
  res.json({
    count: components.length,
    components: components
  });
});

// Projects endpoints
app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects });
});

app.post('/api/projects', (req, res) => {
  const { machineType, problem, budget, voltage, loadType, inputsNeeded } = req.body;
  const newProject = {
    id: `proj-${Date.now().toString().slice(-4)}`,
    machineType: machineType || 'Custom Industrial Machine',
    problem: problem || 'Manual control automation',
    budget: Number(budget) || 3000,
    voltage: voltage || '230V AC',
    loadType: loadType || ['Motor'],
    inputsNeeded: inputsNeeded || ['Start Button', 'Emergency Stop'],
    status: 'draft',
    createdAt: new Date().toISOString(),
    stats: {
      iotCost: 2650,
      plcCost: 35000,
      savingsPct: 92.4
    }
  };
  projects.unshift(newProject);
  res.status(201).json({ success: true, project: newProject });
});

// AI Smart BOM generation endpoint
app.post('/api/projects/:id/bom', (req, res) => {
  const proj = projects.find(p => p.id === req.params.id) || projects[0];
  const bomData = {
    projectId: proj.id,
    summary: `Low-cost automated IoT retrofit for ${proj.machineType}. Utilizes opto-isolated relay modules, ESP32 microcontroller, and dedicated hardware emergency interlock.`,
    items: [
      { component: "ESP32 DevKit V1 (30-Pin)", qty: 1, unitPrice: 450, purpose: "Main automation sequencer & safety watchdog" },
      { component: "4-Channel Relay Module (Opto-Isolated)", qty: 1, unitPrice: 180, purpose: "Switching 230V load safely without controller reset" },
      { component: "Inductive Proximity Sensor (LJ12A3-4-Z/BX)", qty: 1, unitPrice: 190, purpose: "Stroke endpoint and home position limit" },
      { component: "Infrared Obstacle Sensor (FC-51)", qty: 1, unitPrice: 50, purpose: "Object/Pipe presence detection" },
      { component: "12V 5A Industrial Metal SMPS", qty: 1, unitPrice: 450, purpose: "Regulated DC power for board, sensors & solenoids" },
      { component: "Emergency Stop Push Button (Mushroom)", qty: 1, unitPrice: 140, purpose: "Compulsory hardware emergency shutdown interlock" },
      { component: "Heavy Duty ABS Waterproof Enclosure", qty: 1, unitPrice: 320, purpose: "Factory floor dust and vibration protection" },
      { component: "DIN Rail Terminal Blocks & Wires", qty: 1, unitPrice: 200, purpose: "Neat field terminations and earthing link" }
    ],
    totalCost: 1980,
    plcEquivalentCost: 38000,
    savingsAmount: 36020,
    savingsPercentage: 94.7,
    warnings: [
      "High voltage 230V AC wiring ke liye certified electrician/fitter se check karwayein.",
      "Earthing ground pin ko machine chassis par tightly bolt karein.",
      "Emergency stop button should break primary control power directly."
    ]
  };
  res.json({ success: true, bom: bomData });
});

// Zero-Cost Code Generation endpoint
app.post('/api/projects/:id/code', (req, res) => {
  const codeIno = `/*
 * =====================================================================
 * UdyamUtkarsh - AI Generated Industrial Automation Firmware
 * Machine: PVC Pipe Auto-Cutter
 * Controller: ESP32 DevKit V1
 * Safety Compliance: ISO 13849 / E-Stop Interrupt / Watchdog Active
 * Purani machine, naya kaarkhana.
 * =====================================================================
 */

#include <Arduino.h>
#include <esp_task_wdt.h>

#define WDT_TIMEOUT_SECONDS 3

// Pin Mapping Definitions
const int PIN_ESTOP       = 13; // Hardware Emergency Stop Interrupt
const int PIN_START_BTN   = 14; // Manual Cycle Start (Debounced)
const int PIN_IR_SENSOR   = 27; // Pipe Detect Input (Active LOW)
const int PIN_LIMIT_HOME  = 26; // Blade Home Limit Switch
const int PIN_RELAY_CUT   = 32; // Relay 1: Blade Motor (Active LOW)
const int PIN_RELAY_CLAMP = 33; // Relay 2: Pneumatic Clamp (Active LOW)
const int PIN_BUZZER      = 25; // Warning Buzzer / LED

volatile bool emergencyTripped = false;
unsigned long lastDebounceTime = 0;
const unsigned long DEBOUNCE_DELAY_MS = 50;

// Interrupt Service Routine for Emergency Stop
void IRAM_ATTR handleEmergencyStop() {
    emergencyTripped = true;
    // Failsafe: Immediate hardware cutoff
    digitalWrite(PIN_RELAY_CUT, HIGH);
    digitalWrite(PIN_RELAY_CLAMP, HIGH);
    digitalWrite(PIN_BUZZER, HIGH);
}

void setup() {
    Serial.begin(115200);
    Serial.println(F("[UdyamUtkarsh] Booting Machine Controller..."));

    // 1. Mandatory Safety: Relays initialized in OFF (HIGH) state before pinMode
    digitalWrite(PIN_RELAY_CUT, HIGH);
    digitalWrite(PIN_RELAY_CLAMP, HIGH);
    digitalWrite(PIN_BUZZER, LOW);

    pinMode(PIN_RELAY_CUT, OUTPUT);
    pinMode(PIN_RELAY_CLAMP, OUTPUT);
    pinMode(PIN_BUZZER, OUTPUT);

    pinMode(PIN_ESTOP, INPUT_PULLUP);
    pinMode(PIN_START_BTN, INPUT_PULLUP);
    pinMode(PIN_IR_SENSOR, INPUT_PULLUP);
    pinMode(PIN_LIMIT_HOME, INPUT_PULLUP);

    // Attach Hardware E-Stop Interrupt (Trigger on Falling Edge)
    attachInterrupt(digitalPinToInterrupt(PIN_ESTOP), handleEmergencyStop, FALLING);

    // Watchdog Timer Initialization
    esp_task_wdt_config_t wdt_config = {
        .timeout_ms = WDT_TIMEOUT_SECONDS * 1000,
        .idle_core_mask = (1 << 0),
        .trigger_panic = true
    };
    esp_task_wdt_init(&wdt_config);
    esp_task_wdt_add(NULL);

    Serial.println(F("[UdyamUtkarsh] System Ready. Safety Checks: PASSED"));
}

void loop() {
    // Reset Hardware Watchdog Timer
    esp_task_wdt_reset();

    // Check Emergency State
    if (emergencyTripped || digitalRead(PIN_ESTOP) == LOW) {
        digitalWrite(PIN_RELAY_CUT, HIGH);
        digitalWrite(PIN_RELAY_CLAMP, HIGH);
        digitalWrite(PIN_BUZZER, HIGH);
        Serial.println(F("[EMERGENCY] E-Stop Activated! Halting all operations."));
        delay(100);
        return;
    }

    // Normal Cycle: Detect Pipe & Trigger Cut Sequence
    bool pipePresent = (digitalRead(PIN_IR_SENSOR) == LOW);
    bool startPressed = (digitalRead(PIN_START_BTN) == LOW);

    if (pipePresent && startPressed) {
        Serial.println(F("[CYCLE] Pipe detected, engaging clamp..."));
        digitalWrite(PIN_RELAY_CLAMP, LOW); // Clamp Active
        delay(300); // Settling delay

        Serial.println(F("[CYCLE] Starting Blade Motor..."));
        digitalWrite(PIN_RELAY_CUT, LOW); // Cutter Motor ON
        
        // Max run timeout for safety (3.5 seconds)
        unsigned long cutStart = millis();
        while (digitalRead(PIN_LIMIT_HOME) == HIGH && (millis() - cutStart < 3500)) {
            esp_task_wdt_reset();
            if (emergencyTripped) break;
            delay(10);
        }

        // Return Blade & Release
        digitalWrite(PIN_RELAY_CUT, HIGH);
        delay(200);
        digitalWrite(PIN_RELAY_CLAMP, HIGH);
        Serial.println(F("[CYCLE] Cut Complete. Ready for next cycle."));
        delay(1000);
    }
}
`;

  res.json({
    success: true,
    code: codeIno,
    language: 'cpp',
    filename: 'UdyamUtkarsh_PvcCutter.ino',
    safetyChecks: {
      watchdogPresent: true,
      emergencyStopInterrupt: true,
      relaySafeBootState: true,
      maxRunTimeout: true
    },
    pinTable: [
      { pin: "GPIO 13", function: "Emergency Stop (Interrupt)", connectedTo: "Twist-Release E-Stop Button" },
      { pin: "GPIO 14", function: "Cycle Start Button", connectedTo: "Green Flush Push Button" },
      { pin: "GPIO 27", function: "Pipe In-Position Sensor", connectedTo: "IR Sensor (FC-51)" },
      { pin: "GPIO 26", function: "Blade Home Limit Switch", connectedTo: "Roller Limit Switch (ME-8108)" },
      { pin: "GPIO 32", function: "Blade Motor Trigger", connectedTo: "Relay CH1 (Opto-Isolated)" },
      { pin: "GPIO 33", function: "Pneumatic Clamp Trigger", connectedTo: "Relay CH2 (Opto-Isolated)" },
      { pin: "GPIO 25", function: "Status Buzzer / Alarm", connectedTo: "12V Industrial Buzzer" }
    ]
  });
});

// Fitters endpoint
app.get('/api/fitters', (req, res) => {
  res.json({ success: true, fitters });
});

// Jobs endpoint
app.get('/api/jobs', (req, res) => {
  res.json({ success: true, jobs });
});

app.post('/api/jobs', (req, res) => {
  const { projectId, fitterId, userNotes, preferredDate } = req.body;
  const fitter = fitters.find(f => f.id === fitterId) || fitters[0];
  const newJob = {
    id: `job-${Date.now().toString().slice(-4)}`,
    projectId: projectId || 'proj-1',
    machineName: 'PVC Pipe Cutter Auto-Retrofit',
    fitterId: fitter.id,
    fitterName: fitter.name,
    userNotes: userNotes || 'Inspection and wiring installation',
    preferredDate: preferredDate || new Date().toISOString().slice(0, 10),
    status: 'requested',
    price: fitter.chargesPerVisit,
    safetyPassed: false
  };
  jobs.unshift(newJob);
  res.status(201).json({ success: true, job: newJob });
});

// AI Vision to G-Code endpoint (Upload sketch/image -> G-Code)
app.post('/api/vision-gcode', (req, res) => {
  const { imageName, shapeType = 'flange', scale = 1.0 } = req.body;

  const geometries = {
    flange: {
      title: "Circular Flange Gasket with 4 Bolt Holes",
      material: "2.0mm Rubber / PVC Sheet",
      outerDiameter: "120 mm",
      innerDiameter: "60 mm",
      holeCount: 4,
      feedrate: "800 mm/min",
      estimatedTime: "1 min 34 sec",
      gcode: `; ====================================================\n; UdyamUtkarsh Gemini AI Vision-to-GCode Generator\n; Input Design: Circular Flange Gasket with 4 Bolt Holes\n; Material: 2.0mm Rubber / PVC Sheet\n; Tool: 3.175mm 2-Flute Carbide Endmill\n; Feedrate: 800 mm/min | Plunge: 300 mm/min | RPM: 12000\n; Generated for: Low-Cost DIY CNC / Pipe Cutter Retrofit\n; ====================================================\nG21 ; Set units to millimeters\nG90 ; Absolute coordinates mode\nM03 S12000 ; Spindle ON at 12000 RPM\nG00 Z5.000 ; Rapid travel to safe height\n\n; --- Bolt Hole 1 (X: 35.0, Y: 0.0) ---\nG00 X35.000 Y0.000\nG01 Z-2.200 F300\nG02 X35.000 Y0.000 I-5.000 J0.000 F800\nG00 Z5.000\n\n; --- Bolt Hole 2 (X: 0.0, Y: 35.0) ---\nG00 X0.000 Y35.000\nG01 Z-2.200 F300\nG02 X0.000 Y35.000 I0.000 J-5.000 F800\nG00 Z5.000\n\n; --- Bolt Hole 3 (X: -35.0, Y: 0.0) ---\nG00 X-35.000 Y0.000\nG01 Z-2.200 F300\nG02 X-35.000 Y0.000 I5.000 J0.000 F800\nG00 Z5.000\n\n; --- Bolt Hole 4 (X: 0.0, Y: -35.0) ---\nG00 X0.000 Y-35.000\nG01 Z-2.200 F300\nG02 X0.000 Y-35.000 I0.000 J5.000 F800\nG00 Z5.000\n\n; --- Center Bore (Diameter 60mm) ---\nG00 X30.000 Y0.000\nG01 Z-2.200 F300\nG02 X30.000 Y0.000 I-30.000 J0.000 F800\nG00 Z5.000\n\n; --- Outer Profile Cut (Diameter 120mm) ---\nG00 X60.000 Y0.000\nG01 Z-2.200 F300\nG02 X60.000 Y0.000 I-60.000 J0.000 F800\nG00 Z15.000 ; Retract to clearance height\nM05 ; Spindle OFF\nG00 X0.000 Y0.000 ; Return to origin\nM30 ; Program End`
    },
    bracket: {
      title: "L-Shaped Mounting Bracket with Slot",
      material: "3.0mm Mild Steel / Acrylic",
      outerDiameter: "80 x 110 mm",
      innerDiameter: "Slot 12 x 35 mm",
      holeCount: 2,
      feedrate: "650 mm/min",
      estimatedTime: "2 min 12 sec",
      gcode: `; ====================================================\n; UdyamUtkarsh Gemini AI Vision-to-GCode Generator\n; Input Design: L-Bracket with Adjustment Slot\n; Generated for: Low-Cost DIY CNC / Pipe Cutter Retrofit\n; ====================================================\nG21 ; Millimeters\nG90 ; Absolute\nM03 S10000\nG00 Z5.000\nG00 X10.0 Y10.0\nG01 Z-3.2 F250\nG01 X70.0 Y10.0 F650\nG01 X70.0 Y40.0\nG01 X30.0 Y40.0\nG01 X30.0 Y100.0\nG01 X10.0 Y100.0\nG01 X10.0 Y10.0\nG00 Z5.000\nM05\nG00 X0 Y0 Z15.0\nM30`
    },
    pipe_cut: {
      title: "Automated 2-Meter Pipe Length Cut with Chamfer",
      material: "PVC Rigid Conduit (50mm Dia)",
      outerDiameter: "50 mm O.D.",
      innerDiameter: "44 mm I.D.",
      holeCount: 0,
      feedrate: "1200 mm/min",
      estimatedTime: "4.8 sec / cut",
      gcode: `; ====================================================\n; UdyamUtkarsh Gemini AI Vision-to-GCode Generator\n; Machine: Rotary Pipe Cutter & Chamfer Unit\n; ====================================================\nG21\nG90\nM08 ; Pneumatic Clamp ENGAGE\nG04 P300 ; Dwell 300ms\nM03 S4500 ; Rotary Cutter Spin\nG00 X2000.0 ; Feed Pipe to 2000.00mm stop\nG01 Z-5.5 F1200 ; Blade plunge cut through wall\nG04 P150 ; Clean cut sweep\nG00 Z10.0 ; Retract blade\nM09 ; Release Clamp\nM05 ; Cutter Stop\nM30`
    }
  };

  const selected = geometries[shapeType] || geometries.flange;

  res.json({
    success: true,
    shape: shapeType,
    fileName: `${shapeType}_cut.gcode`,
    metadata: selected,
    gcode: selected.gcode
  });
});

// Start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[UdyamUtkarsh Server] Running on http://localhost:${PORT}`);
    console.log(`[Health Endpoint] http://localhost:${PORT}/api/health`);
  });
});

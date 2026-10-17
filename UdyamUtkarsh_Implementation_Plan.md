# UdyamUtkarsh – Implementation Plan

*Purani machine, naya kaarkhana.*

Prepared by: Rishabh Sharma | Version 1.0

Yeh document batata hai ki project ko step-by-step kaise build karna hai: setup, backend, AI, frontend, hardware demo, testing aur deployment.

---

## 1. Implementation Overview

| Phase | Focus | Output |
|---|---|---|
| Phase 0 | Setup and planning | Repo, folder structure, env, DB connected |
| Phase 1 | Auth + Machine Intake | Login/register, intake form, project saved |
| Phase 2 | AI Smart BOM | Gemini BOM with cost comparison |
| Phase 3 | Code Generation + Wiring Guide | Arduino code, wiring steps |
| Phase 4 | Fitter Marketplace | Fitter profiles, job requests |
| Phase 5 | Hardware Demo | One real machine automated (e.g., PVC pipe cutter) |
| Phase 6 | Testing, Deployment, Pitch | Live link, demo video, pitch deck |

**Suggested timeline:** 4 se 5 hafte (college ke baad ke evenings aur weekends ke hisaab se). Hackathon deadline kam ho toh Phase 4 ko basic rakho aur Phase 5 ko priority do, kyunki live demo sabse zyada impact karta hai.

---

## 2. Phase 0 – Setup

**Tasks**
- [ ] GitHub repo banao: `udyamutkarsh` (monorepo: `client/` aur `server/`)
- [ ] Frontend: `npm create vite@latest client -- --template react`, Tailwind CSS add karo
- [ ] Backend: `npm init`, Express, Mongoose, dotenv, cors, helmet, express-rate-limit, jsonwebtoken, bcrypt
- [ ] MongoDB Atlas cluster banao aur connection string `.env` mein rakho
- [ ] Gemini API key lo (Google AI Studio) aur sirf backend `.env` mein rakho
- [ ] ESLint + Prettier setup

**Folder structure**

```
udyamutkarsh/
├── client/
│   └── src/
│       ├── pages/        (Landing, Login, Dashboard, NewProject, BOM, Code, Wiring, Fitters, Jobs)
│       ├── components/
│       ├── services/     (api.js, axios instance)
│       └── context/      (AuthContext)
└── server/
    ├── config/           (db.js, gemini.js)
    ├── models/           (User, Project, BOM, CodeArtifact, Component, FitterProfile, Job)
    ├── routes/
    ├── controllers/
    ├── middleware/       (auth.js, role.js, rateLimit.js, errorHandler.js)
    ├── services/         (aiService.js, bomValidator.js, safetyChecker.js, wiringService.js)
    ├── data/             (components.seed.json, templates/)
    └── server.js
```

**Done when:** `GET /api/health` chalta hai aur DB connected hai.

---

## 3. Phase 1 – Auth and Machine Intake

**Backend**
- `POST /api/auth/register`, `POST /api/auth/login` (JWT, roles: user, fitter, admin)
- `auth` middleware aur `role` middleware
- `POST /api/projects` – machine details save
- `GET /api/projects`, `GET /api/projects/:id`

**Project schema (main fields)**

```js
{
  userId, machineType, problem, budget,
  voltage: "230V AC", loadType: ["motor", "heater", "solenoid"],
  inputsNeeded: ["start button", "limit switch", "counter"],
  status: "draft" | "bom_ready" | "code_ready" | "installed"
}
```

**Frontend**
- Landing page (tagline, problem, solution, CTA)
- Login / Register
- Intake form: machine type (dropdown + custom), problem, budget, voltage, inputs/outputs
- Dashboard: projects list

**Done when:** user login karke project create kar sakta hai aur dashboard par dekh sakta hai.

---

## 4. Phase 2 – AI Smart BOM

**Step 1: Component catalogue seed karo**

`server/data/components.seed.json` mein 25 se 30 common parts daalo, har ek ke saath category, specs, approx local price aur use-case.

```json
{ "name": "ESP32 DevKit V1", "category": "controller", "avgLocalPrice": 450, "specs": "WiFi+BT, 30 pins" }
```

Examples: ESP32, Arduino Nano, 1/2/4-channel relay module (opto-isolated), IR sensor, inductive proximity sensor, limit switch, ultrasonic sensor, SSR, L298N/BTS7960 motor driver, 5V/12V SMPS, push buttons, buzzer, LCD/OLED, enclosure, terminal blocks, wires.

**Step 2: Gemini prompt design** (`aiService.js`)
- System prompt: "Tum ek industrial automation expert ho jo low-cost IoT solutions banata hai..."
- Input: machine details + component catalogue (sirf names/prices) + budget
- Output: **strict JSON**

```json
{
  "summary": "...",
  "items": [{ "component": "ESP32 DevKit V1", "qty": 1, "unitPrice": 450, "purpose": "Main controller" }],
  "totalCost": 2850,
  "plcEquivalentCost": 38000,
  "warnings": ["High voltage wiring ke liye certified electrician se check karwayein"]
}
```

- Gemini ke structured/JSON response mode ka use karo, aur fallback ke liye ```json fences strip karke parse karo.

**Step 3: Validation layer** (`bomValidator.js`)
- Har component catalogue mein hona chahiye; price catalogue ke price se override karo
- Total cost recalculate karo (AI par bharosa mat karo)
- Budget exceed ho toh alternative suggest karne ke liye dobara call
- Relay/SSR rating load se match kare (e.g., motor ke liye rating check)

**Step 4: Endpoint**
- `POST /api/projects/:id/bom` → BOM generate + save
- Rate limit: 10 requests/hour per user

**Frontend:** BOM table, total cost vs PLC cost comparison (bar chart ya savings badge), "Approve BOM" button.

**Done when:** PVC pipe cutter jaisi input par 3 second se 30 second mein valid BOM milta hai.

---

## 5. Phase 3 – Code Generation and Wiring Guide

**Code generation** (`POST /api/projects/:id/code`)
- Input: approved BOM + machine logic description
- Prompt requirements (compulsory):
  - Pin mapping comments ke saath
  - Debounce for buttons/sensors
  - Emergency stop pin (interrupt based)
  - Watchdog timer enable
  - Relays ki default state OFF at boot
  - Motor/heater ke liye timeout/max-run-time limit
- Output: single `.ino` file (C++/Arduino) + pin table JSON

**Safety checker** (`safetyChecker.js`) – generated code par rule-based scan:
- `esp_task_wdt` / watchdog present?
- Emergency stop handler present?
- Relay pins `setup()` mein LOW/safe state par set?
- Fail hone par code ko regenerate karo (max 2 retries) ya warning flag lagao.

**Wiring guide** (`GET /api/projects/:id/wiring`)
- Pin table se step-by-step instructions banao:
  1. Power supply connections
  2. Sensor connections
  3. Relay and load connections
  4. Safety / E-stop
- Diagram: simple SVG generate karo (ESP32 box → modules → load) ya pre-made templates use karo.
- Safety checklist (power OFF, MCB, earthing, insulation) har step ke saath.

**Frontend:** Code viewer (syntax highlight), copy/download `.ino`, flashing instructions (Arduino IDE / PlatformIO steps), wiring guide with checklist.

**Done when:** generated code Arduino IDE mein compile hota hai aur wiring guide samajh aata hai.

---

## 6. Phase 4 – Fitter Marketplace

**Backend**
- `FitterProfile` model: skills, serviceArea (city, GeoJSON point), rating, verified, charges
- `GET /api/fitters?lat&lng&radius` – MongoDB `$near` geo query
- `POST /api/jobs` – user job request (projectId, fitterId, notes, preferred date)
- `PATCH /api/jobs/:id` – accept / reject / in-progress / completed
- `POST /api/jobs/:id/review` – rating + comment
- Admin route: fitter verify/approve

**Frontend**
- Fitter list with distance, rating, charges
- Job request modal, job status tracker
- Fitter dashboard: incoming requests, accept/reject

**Notifications (basic):** pehle in-app status; baad mein email (Nodemailer) ya WhatsApp link (`wa.me`) se.

**Done when:** user fitter ko request bhejta hai, fitter accept karta hai aur status update hota hai.

---

## 7. Phase 5 – Hardware Demo (Sabse Important)

Hackathon mein working demo hi judges ko jeetta hai.

**Demo setup suggestion: "Auto Cutter / Counter" machine mockup**

| Part | Use |
|---|---|
| ESP32 | Controller |
| IR sensor | Pipe detect karna |
| 2-channel relay module | Cutter motor / indicator load |
| Push button + E-stop | Start / Stop |
| 12V DC motor ya LED/bulb | Demo load |
| SMPS / adapter | Power |

**Demo flow**
1. Platform par machine details daalo.
2. BOM generate hota hai (~₹2,000–₹5,000) vs PLC (₹35,000+).
3. Code generate karke ESP32 par flash karo.
4. Wiring guide follow karke hardware connect karo.
5. Live: sensor trigger → relay on → motor chalta hai; E-stop se turant band.
6. (Optional) Fitter request flow dikhao.

**Safety for demo:** 230V AC par kaam na karo agar experience nahi hai. Demo ke liye low-voltage (5V/12V DC) load use karo.

**Done when:** ek real (ya mockup) machine AI-generated code se chal rahi hai.

---

## 8. Phase 6 – Testing, Deployment and Pitch

**Testing checklist**
- [ ] Auth: wrong password, expired token, role access
- [ ] BOM: 5 alag machine types par output check (PVC pipe, photo frame, CNC, packing, conveyor)
- [ ] Code: har generated code Arduino IDE mein compile
- [ ] Safety checker: jaan-boojhkar bina E-stop wala code daalo, fail hona chahiye
- [ ] API rate limit aur error handling (Gemini down/timeout)
- [ ] Mobile responsiveness (PWA)

**Fallback plan:** Gemini fail ho toh 3 pre-built templates (PVC pipe cutter, photo frame cutter, basic CNC) se BOM + code serve karo. Demo ke time internet issue ho sakta hai, isliye ek recorded video backup rakho.

**Deployment**
- Frontend → Vercel
- Backend → Render / Railway (env variables set karo)
- DB → MongoDB Atlas (IP whitelist, production user)
- CORS sirf frontend domain ke liye

**Pitch assets**
- 5 to 7 slides: Problem → Solution → Demo → Cost comparison → Business model → Impact
- 2 minute demo video
- Live link + GitHub repo
- Short pitch line: *"Humara AI platform lakhon ki automation technology ko kuch hazaar rupaye ke IoT components aur AI-generated code se replace karta hai, taaki India ki har chhoti factory apni machines ko easily aur cheaply smart bana sake."*

---

## 9. Weekly Plan (Suggested)

| Week | Goal |
|---|---|
| Week 1 | Phase 0 + Phase 1 (setup, auth, intake form) |
| Week 2 | Phase 2 (component catalogue, Gemini BOM, validation) |
| Week 3 | Phase 3 (code generation, safety checker, wiring guide) |
| Week 4 | Phase 4 (fitter marketplace, basic) + Phase 5 hardware demo build |
| Week 5 | Phase 6 (testing, deployment, pitch deck, demo video) |

---

## 10. Risks During Implementation

| Risk | Fix |
|---|---|
| Gemini JSON format break kare | JSON mode + parse fallback + retry |
| AI galat price de | Catalogue se price override |
| Generated code compile na ho | Compile-tested templates + regenerate with error message |
| Time kam pade | Fitter marketplace ko basic rakho, demo + BOM + code ko priority |
| Hardware parts late milein | Pehle hi order karo, ya Wokwi simulator se backup demo |

---

## 11. MVP Priority (Agar Time Kam Hai)

1. **Must have:** Intake form → Smart BOM → Code generation → Wiring guide → Hardware demo
2. **Should have:** Safety checker, cost comparison chart, dashboard
3. **Nice to have:** Fitter marketplace, notifications, reviews
4. **Future:** MQTT monitoring, supplier ordering, voice input

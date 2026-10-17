# UdyamUtkarsh – System Architecture

*Purani machine, naya kaarkhana.*

Prepared by: Rishabh Sharma | Version 1.0

## 1. High-Level Architecture

```
+---------------------+        +----------------------------+
|  Client (React PWA) | <----> |  API Gateway / Express.js  |
|  Mobile-first UI    |  HTTPS |  (Node.js, JWT auth)       |
+---------------------+        +-------------+--------------+
                                             |
        +----------------+-------------------+------------------+
        |                |                   |                  |
+-------v------+  +------v--------+  +-------v-------+  +-------v--------+
| AI Service   |  | Project       |  | Fitter        |  | Notification   |
| (Gemini API) |  | Service       |  | Marketplace   |  | Service        |
| BOM + Code + |  | Machines, BOM,|  | Matching,     |  | SMS / WhatsApp |
| Wiring prompt|  | code versions |  | jobs, ratings |  | / Email        |
+-------+------+  +------+--------+  +-------+-------+  +----------------+
        |                |                   |
        |         +------v-------------------v------+
        |         |   MongoDB (Users, Projects,      |
        |         |   Components, Jobs, Reviews)     |
        |         +----------------------------------+
        |
+-------v----------------+     +-----------------------------+
| Component Price DB     |     | File Storage (Cloudinary/S3)|
| (local rates, curated) |     | Wiring diagrams, code files |
+------------------------+     +-----------------------------+
```

## 2. Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React + Vite, Tailwind CSS, PWA |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| AI | Google Gemini API (structured JSON output) |
| Auth | JWT, role-based (User, Fitter, Admin) |
| Maps / Location | Google Maps or Leaflet for fitter search |
| Storage | Cloudinary / S3 |
| Hosting | Vercel (frontend), Render/Railway (backend), MongoDB Atlas |

## 3. AI Pipeline

1. **Input normalization:** User form ko structured prompt mein convert karna (machine type, problem, budget, voltage, I/O needs).
2. **BOM generation:** Gemini ko system prompt aur component catalogue ke saath call; output strict JSON (component, qty, unit price, purpose).
3. **Validation layer:** Catalogue se prices cross-check, budget limit enforce, incompatible parts reject.
4. **Code generation:** Selected BOM ke basis par Arduino/C++ code, safety interlocks ke saath.
5. **Wiring guide:** Pin mapping se wiring steps aur diagram data generate.
6. **Safety post-check:** Rule-based check ki emergency stop, relay isolation aur warnings present hain.

## 4. Data Model (Main Collections)

- **User:** name, phone, role, location, createdAt.
- **Project:** userId, machineType, problem, budget, status.
- **BOM:** projectId, items \[componentId, qty, price\], totalCost, plcComparisonCost.
- **CodeArtifact:** projectId, version, language, fileUrl, safetyChecksPassed.
- **Component:** name, category, specs, avgLocalPrice, alternatives.
- **FitterProfile:** userId, skills, serviceArea, rating, verified.
- **Job:** projectId, fitterId, status (requested, accepted, in-progress, done), price, review.

## 5. Key API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | /api/auth/register, /login | Authentication |
| POST | /api/projects | Machine details submit |
| POST | /api/projects/:id/bom | Smart BOM generate |
| POST | /api/projects/:id/code | Arduino code generate |
| GET | /api/projects/:id/wiring | Wiring guide |
| GET | /api/fitters?lat&lng | Nearby fitters |
| POST | /api/jobs | Fitter job request |
| PATCH | /api/jobs/:id | Accept / complete / rate |

## 6. Hardware Reference Architecture (On the Machine)

```
Sensors (IR / proximity / limit switch)
        |
        v
   ESP32 (generated firmware) --> Relay module (opto-isolated) --> Motor / Solenoid / Heater
        |
   Emergency stop + watchdog timer
        |
   Optional: Wi-Fi / MQTT --> Cloud dashboard (future)
```

## 7. Security and Safety

- Input sanitization aur rate limiting on AI endpoints.
- Gemini API key backend par hi rahegi, client ko expose nahi hogi.
- Fitter verification (ID + admin approval).
- Generated code par disclaimer aur mandatory safety checklist before installation.

## 8. Deployment

- Frontend: Vercel, Backend: Render/Railway, Database: MongoDB Atlas.
- Environment variables for API keys, separate dev and production configs.
- Basic logging aur error monitoring for AI failures aur slow responses.

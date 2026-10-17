# UdyamUtkarsh – Product Requirements Document (PRD)

*Purani machine, naya kaarkhana.*

Prepared by: Rishabh Sharma | Version 1.0 | Purpose: Hackathon submission

## 1. Product Overview

UdyamUtkarsh ek AI-powered platform hai jo chhoti factories aur local machine builders (PVC pipe, photo frame, CNC jaisi machines) ko apni purani ya manual machines ko bahut kam budget mein automate karne ka solution deta hai. Mehnge PLC/HMI panels aur automation engineer ki jagah, platform saste IoT components, AI-generated code aur local fitters ka network deta hai.

## 2. Problem Statement

- Machine automate karne ke liye PLC, HMI aur industrial control panels lagte hain, jinki cost ₹35,000 se lakhon tak jaati hai.
- Automation engineer hire karna ya consultant bulana MSMEs ke liye mehnga aur mushkil hai.
- Knowledge gap hai: owner ko pata hi nahi ki kaunsa saste component kaam karega.
- Result: lakhon chhoti factories manual operation par atki hain, jisse productivity, quality aur safety affect hoti hain.

## 3. Target Users

| User | Need | Pain point |
| --- | --- | --- |
| Factory owner (MSME) | Machine automate karna, low budget mein | Cost aur technical knowledge ki kami |
| Local machine builder | Apni machines ko smart banakar bechna | Engineer aur control-panel cost |
| Local electrician / fitter | Extra kaam aur income | Leads nahi milti, standard guide nahi |
| Admin (platform team) | Quality, vendors, fitters manage karna | Verification aur dispute handling |

## 4. Goals and Success Metrics

**Goals**

1. Automation ka hardware cost ₹2,000 – ₹5,000 range mein laana.
2. Specialist engineer ke bina working code dena.
3. Installation ke liye verified local fitter se connect karna.

**Metrics**

- Time to first BOM: 2 minute se kam.
- Cost saving vs PLC solution: 80%+.
- Generated code compile success rate: 90%+.
- Fitter job completion rate aur user rating.

## 5. Functional Requirements (MVP)

### 5.1 Machine Intake

User machine type, current problem (manual cutting, timing control, counting), budget aur power details daalta hai. Guided form, Hindi/English dono support.

### 5.2 Smart BOM (Sasta Saaman)

Gemini requirement ke hisaab se IoT components ki list banata hai (ESP32, relays, proximity/IR sensors, motor drivers, SMPS, enclosure) local market ke approximate rates ke saath. PLC option ke saath cost comparison bhi dikhta hai.

### 5.3 Zero-Cost Coding

AI selected hardware ke liye C++/Arduino code generate karta hai: pin mapping, logic, safety interlocks aur comments ke saath. User code download ya flash kar sakta hai.

### 5.4 Visual Wiring Guide

Step-by-step wiring diagram aur checklist, taaki fitter ya user bina confusion ke connections kar sake.

### 5.5 Fitter Marketplace ("Uber for Fitters")

Location ke basis par verified electricians dikhte hain. User job request bhejta hai, fitter accept karta hai, BOM aur wiring guide share hota hai, kaam ke baad rating milti hai.

### 5.6 User Dashboard

Saved projects, BOM history, code versions, fitter jobs aur status tracking.

## 6. User Flow

1. Sign up / login.
2. Machine type, problem aur budget enter karo.
3. AI Smart BOM aur cost comparison dikhata hai.
4. User BOM approve karta hai.
5. AI code aur wiring guide generate karta hai.
6. User DIY karta hai ya fitter request bhejta hai.
7. Fitter install karta hai, user feedback deta hai.

## 7. Non-Functional Requirements

- **Safety:** Generated code mein emergency stop, watchdog aur safe defaults compulsory. High-voltage wiring ke liye warning aur certified fitter recommendation.
- **Performance:** BOM aur code response 30 second ke andar.
- **Usability:** Simple Hinglish/Hindi UI, mobile-first.
- **Reliability:** Gemini fail hone par common machines ke liye fallback templates.
- **Security:** JWT auth, role-based access, data encryption in transit.

## 8. Future Scope (Post-MVP)

- Live machine monitoring dashboard (production count, uptime) via MQTT.
- Component order integration with local suppliers.
- Voice input in regional languages.
- Simulation of generated code before flashing.
- Predictive maintenance alerts.

## 9. Risks and Mitigation

| Risk | Mitigation |
| --- | --- |
| AI galat code ya BOM de | Validation layer, templates for common machines, fitter review |
| Electrical safety hazards | Mandatory safety rules, warnings, certified fitter recommendation |
| Price data outdated | Curated price DB with periodic updates |
| Fitter trust and quality | Verification, ratings, dispute handling |
| IoT reliability in factory noise | Industrial-grade enclosures, opto-isolated relays, watchdog timers |

## 10. Milestones (Hackathon Plan)

| Phase | Deliverable |
| --- | --- |
| Phase 1 | UI + machine intake form |
| Phase 2 | Gemini Smart BOM with cost comparison |
| Phase 3 | Code generation and wiring guide |
| Phase 4 | Fitter marketplace (basic matching) |
| Phase 5 | Demo with one real machine (e.g., PVC pipe cutter) and pitch |

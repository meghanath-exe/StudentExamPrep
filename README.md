# 📖 Exam Prep — Minimal & Focused Study Tracker

A clean, distraction-free study and exam tracking tool built with **semantic HTML5, modern CSS, and pure Vanilla JavaScript**.

Designed with **Apple Design & Emil Kowalski Design Engineering** principles:
- **Full SF Pro Typography Stack** (`SF Pro Display` for clock & headings, `SF Pro Text` for body) with increased boldness and crisp contrast for effortless legibility.
- **Tabular figures** across all numbers, timers, countdowns, and percentages for zero layout shift.
- **Individual Subject Mastery Tracking**: Live completion counts and progress badges (`3/5 completed (60%)`) on each subject header.
- **Numbered Units**: Clearly marked `UNIT 1`, `UNIT 2`, etc. left of each unit title.
- **Centered Focus Timer**: Dedicated, distraction-free study clock with segmented controls.
- **Tactile button press feedback** (`transform: scale(0.97)` on `:active` with smooth custom cubic-bezier curves).
- **Standalone execution**: Zero dependencies, runs directly in any browser by double-clicking `index.html`.

---

## 📅 Active Exam Schedule & Curriculum

| Exam Date | Subject Name | Curriculum Highlights |
|---|---|---|
| **04/12/2026** (Dec 4) | **Software Engineering** | SDLC & Agile, Design Patterns & Architecture, Testing & QA |
| **04/12/2026** (Dec 4) | **Economics and Accounting for Engineers** | Engineering Economics, Cost Analysis, Financial & Cost Accounting |
| **05/12/2026** (Dec 5) | **Java Programming** | Core OOP & JVM, Collections & Generics, Multithreading & Concurrency |
| **05/12/2026** (Dec 5) | **Discrete Mathematics** | Logic, Proofs & Sets, Combinatorics & Graph Theory |

---

## 🌟 Core Functions

### 1. Focus Timer
- **SF Pro Display Typographic Clock**: Clean, large digital countdown (`25:00`).
- **Segmented Control**: Switch seamlessly between Study (25m) and Break (5m) sessions.
- **Centered Header**: Cleanly centered title without extraneous captions.
- **Gentle Completion Chime**: Synthesized harmonic bell chime via the browser's native Web Audio API.

### 2. Upcoming Review Queue & Earliest Exam Reminder
- **Dynamic Earliest Exam Calculation**: Automatically tracks all subject exam dates and showcases the earliest upcoming exam in the navigation bar (`Earliest Exam: Software Engineering · 13 days left`).
- **Upcoming Review**: Automatically surfaces topics currently marked as *In Progress* or pending review across all subjects and chapters.

### 3. Curriculum Hierarchy (Subjects ➔ Chapters ➔ Topics)
- **Individual Progress Trackers**: Each subject displays its own completion badge (e.g. `1/7 completed (14%)`) alongside a visual mini-bar.
- **Exam Date Showcase**: Every subject displays its exam date and remaining days directly beside the subject title (`Dec 4, 2026 · 13 days left`).
- **Numbered Units**: Units are cleanly numbered on the left (e.g. `UNIT 1  Software Development Life Cycle & Agile`).
- **Status Cycling**: Click any status tag to cycle between `To Do` → `In Progress` → `Completed`.
- **Global Completion Progress Bar**: Real-time progress bar across all subjects and chapters.

---

## 📂 File Structure

```
smart_exam_prep/
├── index.html              # Standalone web application (Double-click to open)
├── README.md               # Documentation
│
└── assets/
    ├── css/
    │   └── style.css       # Clean, high-contrast SF Pro stylesheet
    └── js/
        └── app.js          # Minimal Vanilla JS with localStorage persistence
```

---

## 🚀 How to Run

Simply **double-click `index.html`** in your file explorer to open it in Chrome, Edge, Safari, or Firefox. All data persists automatically in your browser's `localStorage`.

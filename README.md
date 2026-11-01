# 🎮 Interactive Game-Style Developer Portfolio

<div align="center">

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-Synthesizer-FF6B6B?style=for-the-badge&logo=soundcharts&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

**A retro-futuristic, cyberpunk arcade-style interactive developer portfolio.**<br/>
Transforming personal resumes into an engaging sci-fi game menu interface featuring procedural synthesized audio, 3D tilt physics, keyboard-driven navigation, and fluid GSAP micro-animations.

[🚀 Explore Live Demo](https://github.com/yasir-abbas-dev/interactive-game-style-portfolio) • [🐛 Report Bug](https://github.com/yasir-abbas-dev/interactive-game-style-portfolio/issues) • [✨ Request Feature](https://github.com/yasir-abbas-dev/interactive-game-style-portfolio/issues)

</div>

---

## 📸 Preview Showcase

<div align="center">
  <img src="./preview.png" alt="Interactive Game-Style Portfolio Preview" width="100%" style="border-radius: 10px; border: 1px solid rgba(0, 255, 255, 0.3); box-shadow: 0 0 25px rgba(0, 255, 255, 0.2);" />
</div>

---

## 📑 Table of Contents

- [💡 Overview](#-overview)
- [✨ Key Features & Game Mechanics](#-key-features--game-mechanics)
- [🕹️ Controls & Navigation Cheatsheet](#️-controls--navigation-cheatsheet)
- [🛠️ Tech Stack & Libraries](#️-tech-stack--libraries)
- [📁 Project Architecture](#-project-architecture)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [⚙️ Customization Guide](#️-customization-guide)
  - [1. Personal Bio & Profile](#1-personal-bio--profile)
  - [2. Missions (Projects)](#2-missions-projects)
  - [3. Abilities & Skill Bars](#3-abilities--skill-bars)
  - [4. Achievements & Trophies](#4-achievements--trophies)
  - [5. Audio Synthesis & Frequencies](#5-audio-synthesis--frequencies)
  - [6. Color Palette & Cyberpunk Theme](#6-color-palette--cyberpunk-theme)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author & Connect](#-author--connect)

---

## 💡 Overview

Traditional portfolio websites are often static text pages that visitors scroll through once and forget. **This portfolio flips the script** by turning the developer showcase into a **fully playable arcade HUD experience**.

Visitors step into the boots of a Player exploring:
- **System Boot Protocol**: Diagnostic loading screen with simulated progress calibration.
- **Player Character Sheet**: XP levels, core competencies, and background lore.
- **Abilities Matrix**: Skill progress meters categorized by specialty.
- **Missions Log**: Completed client and personal projects ranked by difficulty with XP rewards.
- **Achievements Locker**: Tiered unlockable trophies celebrating milestones.
- **Holographic Transmission Terminal**: Built-in transmission form and direct communication channels.

Everything is tied together with native **Web Audio API procedural sound effects** — hover chirps, UI click snaps, screen transition sweeps, success chimes, and a sci-fi ambient drone with LFO frequency modulation — all synthesized mathematically in code with **zero external audio asset weight**!

---

## ✨ Key Features & Game Mechanics

### 🎮 1. Retro-Futuristic HUD & Arcade Controls
- **Full Keyboard Navigation**: Navigate menu options using <kbd>↑</kbd> and <kbd>↓</kbd> arrows, confirm with <kbd>Enter</kbd>, and return with <kbd>Esc</kbd>.
- **Screen Shake Effects**: Custom physics-driven screen shake triggerable on clicks, transitions, and selections for tactile game-feel.
- **Cyberpunk HUD Frame**: High-tech corner brackets, digital scanlines, interactive glowing cursor, and dynamic ambient dust particles.

### 🔊 2. Pure Web Audio API Synthesizer (0-Asset Audio)
- Built from the ground up without relying on heavy MP3 or WAV downloads.
- Generates procedural audio in real-time via `AudioContext`:
  - **Hover**: 800Hz to 1200Hz sine frequency sweeps.
  - **Click**: 150Hz square wave punch.
  - **Transition**: 200Hz low-pass filtered sawtooth whoosh.
  - **Success / Completion**: 3-note harmonic arpeggio (`C5`, `E5`, `G5`).
  - **Ambient Drone**: Deep 55Hz sub-bass sine wave modulated by an LFO (Low-Frequency Oscillator) with harmonic overtones.
- Full UI toggles for **Mute FX** and **Ambient Drone toggle**.

### ⚡ 3. 3D Tilt Card Physics & GSAP Micro-Animations
- Custom 3D perspective mouse-tracking tilt effects on project and skill cards.
- Coordinated GSAP stagger timelines for buttery-smooth screen entry transitions.
- Interactive typewriter text animation for system dialogues and titles.

### 👤 4. Player Profile & Leveling System
- Custom character card displaying avatar insignia, class tags (`Creative`, `UI Specialist`), and level status (`Leveling Up` XP bar).
- Quick statistics grid: Projects Completed (`10+`), Focus Area (`UI/UX`), and Base Location (`Pakistan`).

### 🎯 5. Missions Log (Project Showcase)
- RPG-style mission registry showcasing projects categorized with difficulty badges (`EASY`, `MEDIUM`, `HARD`).
- Tech stack tag pills and XP reward bounties (`+3000 XP`, `+1800 XP`, `+1200 XP`).
- Mobile-friendly long-press interaction to expand full mission briefings.

### 🏆 6. Achievement Badge Locker
- Gamified milestone trophies classified by rarity tiers:
  - ⚪ **COMMON** (Muted border & subtle backdrop)
  - 🔵 **RARE** (Cyan neon glow)
  - 🟣 **EPIC** (Purple neon aura)
  - 🟡 **LEGENDARY** (Gold high-voltage luminescence)
- Live progress gauge displaying unlocked ratio (e.g., `7 / 8 UNLOCKED`).

### 🛸 7. Holographic Transmission Terminal (Contact)
- Interactive decision modal: `"DO YOU WANT TO CONNECT? [YES] / [NO]"`.
- Built-in transmission form that automatically constructs formatted mailto payloads with CC redundancy.
- Quick-launch direct links to **WhatsApp**, **LinkedIn**, **Instagram**, and **Email**.

### 📱 8. Mobile & Touch Optimized
- Native touch swipe gestures: **Swipe right** anywhere to step back to the previous screen.
- Long-press touch triggers to inspect deep mission data.
- Fluid auto-scaling typography and responsive layouts for desktop, tablet, and mobile.

---

## 🕹️ Controls & Navigation Cheatsheet

| Action | Desktop Keyboard | Mouse / Pointer | Mobile / Touch |
| :--- | :--- | :--- | :--- |
| **Navigate Menu** | <kbd>↑</kbd> / <kbd>↓</kbd> Arrow Keys | Hover menu item | Tap menu item |
| **Select / Confirm** | <kbd>Enter</kbd> or <kbd>Space</kbd> | Click item | Tap item |
| **Back to Menu** | <kbd>Esc</kbd> | Click `BACK` button | **Swipe Right** or tap `BACK` |
| **Inspect Mission** | Click card | Hover / Click card | **Long Press (400ms)** |
| **Audio Toggles** | Click HUD Audio Icons | Click top HUD buttons | Tap top HUD buttons |

---

## 🛠️ Tech Stack & Libraries

```
┌───────────────────────────────────────────────────────────┐
│                      FRONTEND STACK                       │
├───────────────────┬───────────────────────────────────────┤
│ Core Framework    │ React 18.3 + TypeScript 5.8           │
│ Build Tool        │ Vite 7.2 (Lightning fast HMR)         │
│ Styling           │ Tailwind CSS 3.4 + Tailwind Animate   │
│ Animation Engine  │ GSAP (GreenSock) 3.14                 │
│ Sound Engine      │ Web Audio API (Procedural Synthesizer)│
│ UI Primitives     │ Radix UI + shadcn-ui + Lucide Icons   │
│ Toast System      │ Sonner                                │
│ Code Formatter    │ ESLint 9 + TypeScript-ESLint          │
└───────────────────┴───────────────────────────────────────┘
```

---

## 📁 Project Architecture

```
yasir-dev-portfolio/
├── public/                     # Static assets & icons
│   ├── favicon.ico
│   ├── preview.png             # Readme & social preview banner
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── game/               # Core game screens & UI elements
│   │   │   ├── AchievementsScreen.tsx   # Trophies & rarity grid
│   │   │   ├── AudioControls.tsx        # Mute & ambient sound buttons
│   │   │   ├── CursorGlow.tsx           # Sci-fi mouse cursor follower
│   │   │   ├── ExitScreen.tsx           # Contact terminal & social links
│   │   │   ├── FloatingParticles.tsx    # Ambient dust particle canvas
│   │   │   ├── GameInterface.tsx        # Master orchestrator & screen manager
│   │   │   ├── HUDFrame.tsx             # Futuristic corner brackets & borders
│   │   │   ├── LoadingScreen.tsx        # System boot sequence
│   │   │   ├── MenuScreen.tsx           # Main arcade menu & arrow navigation
│   │   │   ├── MissionsScreen.tsx       # Portfolio projects & XP rewards
│   │   │   ├── NotificationPanel.tsx    # Slide-out instructions modal
│   │   │   ├── NotificationScreen.tsx   # System initialized briefing
│   │   │   ├── PlayerScreen.tsx         # Developer profile & XP progression
│   │   │   ├── Screen.tsx               # Wrapper with entrance transitions
│   │   │   ├── SkillsScreen.tsx         # 3D tilt ability cards & meters
│   │   │   ├── StartScreen.tsx          # "Press Start" hero showcase
│   │   │   └── TypewriterText.tsx       # Terminal typing text effect
│   │   └── ui/                          # Radix / shadcn atomic primitives
│   ├── hooks/                           # Custom React game hooks
│   │   ├── useAudio.ts                  # Web Audio synthesizer manager
│   │   ├── useGameState.ts              # Screen router & history navigation
│   │   ├── useLongPress.ts              # Mobile long-press detector
│   │   ├── useScreenShake.ts            # Screen trauma / shake generator
│   │   ├── useSwipeGesture.ts           # Touch swipe-to-back detector
│   │   └── useTilt.ts                   # 3D card tilt calculator
│   ├── pages/
│   │   ├── Index.tsx                    # Main entry page
│   │   └── NotFound.tsx                 # 404 game over page
│   ├── index.css                        # Cyberpunk design system & CSS vars
│   ├── main.tsx                         # React root bootstrap
│   └── App.tsx                          # App provider & routing
├── index.html                           # HTML template & fonts
├── package.json                         # Dependencies & npm scripts
├── tailwind.config.ts                   # Cyberpunk theme extensions
└── vite.config.ts                       # Vite configuration
```

---

## 🚀 Quick Start & Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your system.

### 1. Clone the repository

```bash
git clone https://github.com/yasir-abbas-dev/interactive-game-style-portfolio.git
cd interactive-game-style-portfolio
```

### 2. Install dependencies

```bash
# Using npm
npm install

# Or using bun
bun install

# Or using pnpm
pnpm install
```

### 3. Start the development server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173/` to launch the game!

### 4. Build for production

```bash
npm run build
```

The optimized static production bundle will be generated in the `dist/` directory.

### 5. Preview production build

```bash
npm run preview
```

---

## ⚙️ Customization Guide

Easily adapt this portfolio to feature your own name, projects, and skills:

### 1. Personal Bio & Profile
Edit [`src/components/game/PlayerScreen.tsx`](./src/components/game/PlayerScreen.tsx):
```tsx
// Update developer name, title, tags and stats:
<h3 className="font-display text-xl md:text-3xl text-foreground">YOUR NAME</h3>
<p className="text-muted-foreground font-display">Frontend Web Developer</p>

const stats = [
  { label: 'Projects Completed', value: '15+', icon: Trophy },
  { label: 'Focus Area', value: 'UI/UX', icon: Calendar },
  { label: 'Location', value: 'Your City', icon: MapPin },
];
```
Also update the start screen banner in [`src/components/game/StartScreen.tsx`](./src/components/game/StartScreen.tsx).

### 2. Missions (Projects)
Edit [`src/components/game/MissionsScreen.tsx`](./src/components/game/MissionsScreen.tsx):
```tsx
const missions = [
  {
    id: 1,
    name: 'Your Project Title',
    status: 'COMPLETED',       // 'COMPLETED' or 'IN PROGRESS'
    difficulty: 'HARD',        // 'EASY', 'MEDIUM', 'HARD', or 'EXPERT'
    tech: ['React', 'TypeScript', 'Tailwind'],
    description: 'A brief description of the mission objectives and features.',
    xp: 3000,                  // XP bounty reward
  },
  // Add more missions...
];
```

### 3. Abilities & Skill Bars
Edit [`src/components/game/SkillsScreen.tsx`](./src/components/game/SkillsScreen.tsx):
```tsx
const skills = [
  { name: 'React / Next.js', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Languages' },
  { name: 'GSAP Animations', level: 80, category: 'Animation' },
  { name: 'Node.js / Express', level: 75, category: 'Backend' },
];
```

### 4. Achievements & Trophies
Edit [`src/components/game/AchievementsScreen.tsx`](./src/components/game/AchievementsScreen.tsx):
```tsx
const achievements = [
  {
    id: 1,
    name: 'First Blood',
    description: 'Shipped first commercial client application',
    icon: Trophy,
    unlocked: true,
    rarity: 'common', // 'common' | 'rare' | 'epic' | 'legendary'
    date: '2023',
  },
];
```

### 5. Audio Synthesis & Frequencies
Adjust sound synthesis parameters in [`src/hooks/useAudio.ts`](./src/hooks/useAudio.ts):
```ts
// Tweak master volume (default 0.3):
private masterVolume = 0.3;

// Customize hover or click frequencies:
playHoverSound() {
  oscillator.frequency.setValueAtTime(800, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
}
```

### 6. Color Palette & Cyberpunk Theme
Modify HSL color variables in [`src/index.css`](./src/index.css):
```css
:root {
  --primary: 180 100% 50%;    /* Cyber Cyan */
  --secondary: 280 100% 60%;  /* Neon Purple / Violet */
  --accent: 45 100% 50%;      /* Arcade Gold / Yellow */
  --background: 220 20% 4%;   /* Deep Void Black */
  --foreground: 180 100% 90%; /* Hologram White-Cyan */
}
```

---

## 🌐 Deployment

Deploy your game portfolio for free with one click:

### Deploy with Vercel
1. Push your repository to GitHub.
2. Visit [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select your repository. Vite settings will be detected automatically.
4. Click **Deploy**.

### Deploy with Netlify
1. Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

### Deploy with GitHub Pages
Add this script to your `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
And set `base: '/interactive-game-style-portfolio/'` in `vite.config.ts`.

---

## 🤝 Contributing

Contributions, feedback, and star ratings are warmly welcomed!

1. Fork the Project (`https://github.com/yasir-abbas-dev/interactive-game-style-portfolio/fork`)
2. Create your Feature Branch (`git checkout -b feature/EpicArcadeFeature`)
3. Commit your Changes (`git commit -m 'Add EpicArcadeFeature'`)
4. Push to the Branch (`git push origin feature/EpicArcadeFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author & Connect

**Muhammad Yasir Abbas**  
*Frontend Web Developer & UI / Animation Enthusiast*

- 💬 **WhatsApp**: [+92 305 3480084](https://wa.me/923053480084)
- 💼 **LinkedIn**: [Yasir Gujjar](https://www.linkedin.com/in/yasir-gujjar-9a896a38a/)
- 📸 **Instagram**: [@mickey_x_toman](https://www.instagram.com/mickey_x_toman)
- ✉️ **Email**: [yasirgujjar16may2009@gmail.com](mailto:yasirgujjar16may2009@gmail.com)
- 🐙 **GitHub**: [@yasir-abbas-dev](https://github.com/yasir-abbas-dev)

<div align="center">
  <sub>Built with ⚡, neon, and passion by Yasir Abbas. If you enjoyed this project, don't forget to star the repo! ⭐</sub>
</div>

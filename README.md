# 🎮 Sai Sathya Dhawan | Interactive Portfolio

> **"Code is my weapon. Design is my armor. Welcome to my world."**

A gamified, immersive developer portfolio built to showcase advanced Frontend, AI Engineering, and Creative Development skills. This project treats the user's journey as a game, featuring progression systems, audio-reactive elements, and interactive "Boss Battles" (Projects) that demonstrate technical mastery.

🔗 **Live Demo:** [http://localhost:5173](http://localhost:5173) *(Local Dev Build)*

---

## 🚀 Mission Brief

This isn't just a website; it's an experience. The goal was to break the mold of static, boring resumes and create a living, breathing digital identity that users actually *want* to explore.

### Key Features
-   **Gamified Navigation**: Unlock levels (Profile, Skills, Projects, Contact) as you progress.
-   **Audio-Reactive Core**: Hybrid BGM system using **Web Audio API** (procedural synth) + **Howler.js** (samples).
-   **Immersive UI**: CRT effects, glassmorphism, dynamic glowing borders, and Framer Motion animations.
-   **Boss Battles**: Detailed project case studies presented as "Boss Fights" with loot (Github links) and lore.

---

## 🛠️ Tech Stack (The Engine)

| Core | Styling & UI | Audio & Logic |
| :--- | :--- | :--- |
| **React 19** | **Tailwind CSS v4** | **Web Audio API** |
| **Vite** | **Framer Motion** | **Howler.js** |
| **Javascript (ES6+)** | **PostCSS** | **React Context API** |

---

## 📂 Project Structure (Map)

```bash
src/
├── components/
│   ├── layout/       # global containers (GameContainer, HUD)
│   ├── levels/       # Level 0-6 (Intro -> Contact)
│   ├── audio/        # Audio logic & controls
│   └── ui/           # Reusable UI tokens
├── context/          # Global State & Audio Context
├── assets/           # SFX triggers
└── main.jsx          # Entry point
```

---

## 🕹️ How to Run

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/07Dha1/sai-dhawan-game-portfolio.git
    cd sai-dhawan-game-portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Engine**
    ```bash
    npm run dev
    ```

4.  **Engage**
    Open `http://localhost:5173` to start the game.

---

## 👤 Player Profile

**Sai Sathya Dhawan**
*AI Engineer // Full Stack Developer // Creative Technologist*

-   **Specialization**: Computer Vision, Generative AI, React Ecosystem
-   **Current Status**: Open to Work / New Quests

---

*Verified Production Build: v1.0.0 (Stable)*

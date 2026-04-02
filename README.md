# 🚀 Quenedy Pabular | Developer Portfolio 💻

My personal portfolio as a Fresh Graduate developer. Showcasing my passion for building full-stack web, mobile, and desktop applications through real-world projects, modern UI design, and continuous learning.

## 🌐 Live Demo
[View Live Portfolio Here](https://quenedypabular.vercel.app)

---

## 🏗️ Project Architecture (Vanilla Modular)
This project has been refactored from a monolithic ~4,000 line structure into a **Modular, Scalable, and Vanilla** architecture. This ensures high maintainability without the need for complex build tools.

### 📂 Folder Structure
```text
/
├── index.html          # Main entry point (Valid HTML5 Skeleton)
├── assets/
│   ├── css/            # Modular Stylesheets
│   │   ├── base/       # Reset, Variables, & Animations
│   │   ├── components/ # Shared UI (Navbar, Loader, Footer)
│   │   ├── sections/   # Individual page sections (Hero, About, etc.)
│   │   └── main.css    # Global orchestration & unified headers
│   ├── js/             # Modular Logic
│   │   ├── modules/    # Individual features (Particles, Lightbox, etc.)
│   │   └── main.js     # Global initialization
│   ├── images/         # Optimized visual assets
│   └── docs/           # Resumes & Documents
└── scripts/            # Development Utility Scripts (Compression, etc.)
```

### 🛠️ Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Modern Flexbox/Grid), JavaScript (ES6)
- **Backend/Services:** Supabase (Contact Form), Google Analytics (GA4)
- **Icons & Fonts:** Devicons, Google Fonts (Inter, Cinzel, Fira Code)
- **Hosting:** [Vercel](https://quenedypabular.vercel.app/)

## 🚀 Development & Maintenance
- **Adding Styles**: Create a new `.css` file in `assets/css/sections/` and link it in the `<head>` of `index.html`.
- **Adding Logic**: Create a new `.js` file in `assets/js/modules/` and initialize it in `assets/js/main.js`.
- **Image Optimization**: Use the provided scripts in `scripts/` (requires `sharp`) to compress assets for better LCP.

## 📈 Analytics
- Integrated with Google Analytics (GA4) (`G-XW1RT7KE81`) to track visitor engagement.

---
*Built with ❤️ by Quenedy Pabular*

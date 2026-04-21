# 🚀 Quenedy Pabular | Developer Portfolio 💻

My personal portfolio as a Fresh Graduate developer. Showcasing my passion for building full-stack web, mobile, and desktop applications through real-world projects, modern UI design, and continuous learning.

## 🌐 Live Demo

[View Live Portfolio Here](https://quenedypabular.vercel.app)

---

## 🏗️ Project Architecture (Data-Driven Modular)

The portfolio has been refactored into a modern, modular architecture with a dedicated build pipeline. This ensures high maintainability, perfectly optimized SEO, and clean, readable code.

### 📂 Folder Structure

```text
/
├── src/                # 🛠️ Source Files (WORK HERE)
│   ├── components/     # Reusable HTML components (Navbar, Loader, etc.)
│   ├── sections/       # Modular page sections (Hero, About, etc.)
│   └── template.html   # Main HTML blueprint with {{PLACEHOLDERS}}
├── data/               # 📦 Content Data (EDIT HERE)
│   ├── projects.json   # All project details, long descriptions & links
│   ├── experience.json # Work history and internships
│   └── skills.json     # Tech stack categories and icons
├── assets/             # 🎨 Static Assets
│   ├── css/            # Modular Stylesheets
│   ├── js/             # Modular Logic (Particles, Lightbox, etc.)
│   └── images/         # Optimized assets & icons.svg sprite sheet
├── scripts/            # ⚙️ Automation Scripts
│   └── build.js        # The Build Logic (Assembles data + HTML)
└── index.html          # 🚀 Generated Production File (DO NOT EDIT)
```

### 🛠️ Development & Maintenance

The site is now **Data-Driven**. To update your portfolio, you no longer need to touch complex HTML:

- **Updating Projects/Skills/Experience**: Simply edit the corresponding file in the `data/` folder.
- **Modifying Layout**: Edit the specific section in `src/sections/` or the main blueprint in `src/template.html`.

### 🚀 Building for Production

Once you've made your changes, run the following command to generate the optimized `index.html`:

```powershell
npm run build
```

This script will:

1.  Inject your modular sections into the template.
2.  Pre-render your JSON data into HTML (Great for SEO!).
3.  Minify the final output to a microscopic file size for maximum performance.

## 📈 Technical Stack

- **Architecture:** Node.js Build Pipeline + Vanilla HTML/CSS/JS
- **Frontend:** HTML5 (Modular), CSS3 (Modern Flexbox/Grid), JavaScript (ES6 Modules)
- **Data:** JSON-driven content management
- **Assets:** SVG Sprite Sheets for icon optimization
- **Hosting:** [Vercel](https://quenedypabular.vercel.app/)

---

_Built with ❤️ by Quenedy Pabular_

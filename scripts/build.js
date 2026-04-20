const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const SRC_DIR = path.join(__dirname, '../src');
const DATA_DIR = path.join(__dirname, '../data');
const DIST_FILE = path.join(__dirname, '../index.html');

function loadFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error loading file ${filePath}:`, err);
    return '';
  }
}

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`Error loading JSON ${filePath}:`, err);
    return [];
  }
}

function generateProjectCards(projects) {
  return projects.map(p => {
    const techData = JSON.stringify(p.tech);
    const imagesHtml = p.images && p.images.length > 0 
      ? p.images.map(img => `<img src="${img}" alt="${p.title}" loading="lazy" width="800" height="600" />`).join('\n          ')
      : '';

    const statusBadgeHtml = p.status 
      ? `<div class="status-badge" title="${p.status}">
                  <i class="${p.tech[0]?.icon || ''}"></i>
                  <span>${p.status}</span>
                </div>`
      : '';

    const imageSection = p.comingSoon 
      ? `<div class="project-placeholder">
                <div class="placeholder-icon">
                  <i class="${p.tech[0]?.icon || ''}"></i>
                </div>
                <div class="placeholder-text">${p.title.split('').join(' ')}</div>
              </div>`
      : `<div class="carousel">
                <div class="carousel-slides">
                  ${imagesHtml}
                </div>
                <button class="carousel-btn prev" aria-label="Previous image">&#8249;</button>
                <button class="carousel-btn next" aria-label="Next image">&#8250;</button>
                <div class="carousel-dots" aria-label="Image selection indicators"></div>
              </div>`;

    const liveBtn = p.live 
      ? `<a href="${p.live}" target="_blank" class="live-btn">
                    <svg><use xlink:href="assets/images/icons.svg#icon-external"></use></svg>
                    Live Demo
                  </a>`
      : '';

    return `
          <div
            class="project ${p.comingSoon ? 'coming-soon' : ''}"
            data-title="${p.title}"
            data-description="${p.longDescription || p.description}"
            data-tech='${techData}'
            ${p.github ? `data-github="${p.github}"` : ''}
            ${p.live ? `data-live="${p.live}"` : ''}
            data-type="${p.type || 'desktop'}"
          >
            <div class="project-image">
              ${statusBadgeHtml}
              ${imageSection}
              <span class="project-category">${p.category}</span>
            </div>
            <div class="project-info">
              <h3>${p.title}</h3>
              <p>${p.description}</p>
              <div class="project-footer">
                ${p.live ? `<div class="footer-links">${liveBtn}</div>` : ''}
                <button class="view-project-btn">View More ▹</button>
              </div>
            </div>
          </div>`;
  }).join('\n');
}

function generateExperienceItems(experience) {
  return experience.map(exp => `
        <div class="experience-item">
          <h3>${exp.title}</h3>
          <h4>${exp.company}</h4>
          <p><strong>Role: </strong>${exp.role} (${exp.period})</p>
          <ul>
            ${exp.description.map(item => `<li>${item}</li>`).join('\n            ')}
          </ul>
        </div>`).join('\n');
}

function generateSkillCards(skills) {
  return skills.map(cat => `
          <div class="bento-card">
            <h3>${cat.category}</h3>
            <div class="bento-skills">
              ${cat.skills.map(s => `
              <div class="skill-item">
                ${s.icon === 'render' 
                  ? `<svg><use xlink:href="assets/images/icons.svg#icon-render"></use></svg>`
                  : `<i class="${s.icon}"></i>`}
                <span>${s.name}</span>
              </div>`).join('')}
            </div>
          </div>`).join('\n');
}

async function build() {
  console.log('Starting build process...');

  let template = loadFile(path.join(SRC_DIR, 'template.html'));

  // Load Components
  template = template.replace('{{LOADER}}', loadFile(path.join(SRC_DIR, 'components/loader.html')));
  template = template.replace('{{NAVBAR}}', loadFile(path.join(SRC_DIR, 'components/navbar.html')));
  template = template.replace('{{FOOTER}}', loadFile(path.join(SRC_DIR, 'components/footer.html')));
  template = template.replace('{{LIGHTBOX}}', loadFile(path.join(SRC_DIR, 'components/lightbox.html')));

  // Load Sections
  template = template.replace('{{HERO}}', loadFile(path.join(SRC_DIR, 'sections/hero.html')));
  template = template.replace('{{ABOUT}}', loadFile(path.join(SRC_DIR, 'sections/about.html')));
  template = template.replace('{{CONTACT}}', loadFile(path.join(SRC_DIR, 'sections/contact.html')));

  // Generate Data Sections
  const projects = loadJSON(path.join(DATA_DIR, 'projects.json'));
  const projectsSection = loadFile(path.join(SRC_DIR, 'sections/projects.html'))
    .replace('{{PROJECT_CARDS}}', generateProjectCards(projects));
  template = template.replace('{{PROJECTS}}', projectsSection);

  const experience = loadJSON(path.join(DATA_DIR, 'experience.json'));
  const experienceSection = loadFile(path.join(SRC_DIR, 'sections/experience.html'))
    .replace('{{EXPERIENCE_ITEMS}}', generateExperienceItems(experience));
  template = template.replace('{{EXPERIENCE}}', experienceSection);

  const skills = loadJSON(path.join(DATA_DIR, 'skills.json'));
  const skillsSection = loadFile(path.join(SRC_DIR, 'sections/skills.html'))
    .replace('{{SKILL_CARDS}}', generateSkillCards(skills));
  template = template.replace('{{SKILLS}}', skillsSection);

  // Minification
  const minified = await minify(template, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true,
    minifyCSS: true,
    processConditionalComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    trimCustomFragments: true,
    useShortDoctype: true
  });

  // Write output
  fs.writeFileSync(DIST_FILE, minified);
  console.log('Build complete! index.html has been generated and minified.');
}

build();

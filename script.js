// Canvas particles for loader
const canvas = document.getElementById("loaderCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 80;
const maxDistance = 150;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.vx *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.vy *= -1;
    }
  }
}

// Create particles
function initParticles() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Draw lines between nearby particles
function connectParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateLoader() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dark background
  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  // Connect nearby particles
  connectParticles();

  requestAnimationFrame(animateLoader);
}

initParticles();
animateLoader();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray.length = 0;
  initParticles();
});

// ── Background canvas (persistent body background) ──────────────────────────
const bgCanvas = document.getElementById("bgCanvas");
const bgCtx = bgCanvas.getContext("2d");

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

const bgParticles = [];
const BG_COUNT = 100;
const BG_MAX_DIST = 160;

class BgParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.radius = Math.random() * 1.8 + 0.4;
    this.alpha = Math.random() * 0.35 + 0.1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }
  draw() {
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`;
    bgCtx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x - this.radius < 0 || this.x + this.radius > bgCanvas.width) this.vx *= -1;
    if (this.y - this.radius < 0 || this.y + this.radius > bgCanvas.height) this.vy *= -1;
  }
}

function initBg() {
  for (let i = 0; i < BG_COUNT; i++) bgParticles.push(new BgParticle());
}

function connectBg() {
  for (let i = 0; i < bgParticles.length; i++) {
    for (let j = i + 1; j < bgParticles.length; j++) {
      const dx = bgParticles[i].x - bgParticles[j].x;
      const dy = bgParticles[i].y - bgParticles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < BG_MAX_DIST) {
        const op = (1 - dist / BG_MAX_DIST) * 0.18;
        bgCtx.beginPath();
        bgCtx.strokeStyle = `rgba(139, 92, 246, ${op})`;
        bgCtx.lineWidth = 0.6;
        bgCtx.moveTo(bgParticles[i].x, bgParticles[i].y);
        bgCtx.lineTo(bgParticles[j].x, bgParticles[j].y);
        bgCtx.stroke();
      }
    }
  }
}

function animateBg() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgParticles.forEach(p => { p.update(); p.draw(); });
  connectBg();
  requestAnimationFrame(animateBg);
}

initBg();
animateBg();

window.addEventListener("resize", () => {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  bgParticles.length = 0;
  initBg();
});
// ────────────────────────────────────────────────────────────────────────────

// ── Loader Logic ──────────────────────────────────────────────────────────
// Hide loader after 2.5 seconds - moved to top for resilience
// This runs independently to ensure the site is never stuck if other scripts error
const hideLoader = () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
    document.body.style.overflow = ""; // Ensure scrolling is restored
  }
};

window.addEventListener("load", () => {
  setTimeout(hideLoader, 2500);
});

// Fallback: If 'load' event doesn't fire for some reason, hide anyway after 5s
setTimeout(hideLoader, 5000);
// ────────────────────────────────────────────────────────────────────────────

const roles = [
  "Fresh Graduate",
  "Aspiring Full-Stack Developer",
  "Turning Ideas Into Practical Applications",
  "Problem Solver",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingRole = document.getElementById("typing-role");

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingRole.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingRole.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeRole, 1500);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 300);
    return;
  }

  const speed = isDeleting ? 50 : 100;
  setTimeout(typeRole, speed);
}
typeRole();

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 500;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const fadeElements = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

fadeElements.forEach((element) => {
  observer.observe(element);
});

//hamburger menu

const hamburger = document.getElementById("hamburger");
const navUl = document.querySelector("nav ul");
const navClose = document.getElementById("navClose");

// Open/close menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navUl.classList.toggle("open");
});

// Close button
navClose.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navUl.classList.remove("open");
});

// Close when link clicked
navUl.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navUl.classList.remove("open");
  });
});

// CAROUSEL
function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const slides = carousel.querySelector(".carousel-slides");
    const imgs = slides.querySelectorAll("img");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    let current = 0;
    let autoSlide;

    // ONE blurred bg
    const bg = document.createElement("div");
    bg.classList.add("carousel-bg");
    bg.style.backgroundImage = `url('${imgs[0].src}')`;
    carousel.insertBefore(bg, slides);

    // create dots
    imgs.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        stopAuto();
        goTo(i);
        startAuto();
      });
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = (index + imgs.length) % imgs.length;
      slides.style.transform = `translateX(-${current * 100}%)`;
      dotsContainer.querySelectorAll("span").forEach((d, i) => {
        d.classList.toggle("active", i === current);
      });
      bg.style.backgroundImage = `url('${imgs[current].src}')`;
    }

    function startAuto() {
      autoSlide = setInterval(() => goTo(current + 1), 4000);
    }

    function stopAuto() {
      clearInterval(autoSlide);
    }

    prevBtn.addEventListener("click", () => { stopAuto(); goTo(current - 1); startAuto(); });
    nextBtn.addEventListener("click", () => { stopAuto(); goTo(current + 1); startAuto(); });

    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);

    startAuto();
  });
}

initCarousels();

// LIGHTBOX
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxDots = lightbox.querySelector(".lightbox-dots");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-btn.prev");
  const nextBtn = lightbox.querySelector(".lightbox-btn.next");
  
  // New details elements
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-description");
  const lightboxTechList = document.getElementById("lightbox-tech-list");
  const lightboxGithub = document.getElementById("lightbox-github");

  let currentImgs = [];
  let currentIndex = 0;

  // open lightbox when clicking view button
  document.querySelectorAll(".view-project-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const project = btn.closest(".project");
      const carousel = project.querySelector(".carousel");
      const slides = carousel.querySelector(".carousel-slides");
      
      currentImgs = Array.from(slides.querySelectorAll("img")).map((i) => i.src);
      currentIndex = 0; // always start from first image
      
      // Populate details from data attributes
        if (project) {
          lightboxTitle.textContent = project.getAttribute("data-title") || "Project";
          
          // Parse Description into structured HTML
          const rawDesc = project.getAttribute("data-description") || "";
          const lines = rawDesc.split('\n').map(line => line.trim()).filter(line => line.length > 0);
          
          let parsedHTML = "";
          let inList = false;
          
          lines.forEach((line, index) => {
            if (line.startsWith("Key Features:")) {
              if (inList) { parsedHTML += "</ul>"; inList = false; }
              parsedHTML += `<h3 class="features-title">${line}</h3>`;
            } else if (line.startsWith("▹")) {
              if (!inList) { parsedHTML += '<ul class="features-list">'; inList = true; }
              parsedHTML += `<li>${line.substring(1).trim()}</li>`;
            } else {
              if (inList) { parsedHTML += "</ul>"; inList = false; }
              // First line is usually the main summary
              if (index === 0) {
                parsedHTML += `<p class="lightbox-main-desc">${line}</p>`;
              } else {
                parsedHTML += `<p>${line}</p>`;
              }
            }
          });
          if (inList) parsedHTML += "</ul>";
          
          lightboxDesc.innerHTML = parsedHTML;
          
        // Handle Device Frames
        const gallery = lightbox.querySelector(".lightbox-gallery");
        const projectType = project.getAttribute("data-type");
        gallery.classList.remove("phone-frame", "desktop-frame");
        if (projectType) {
          gallery.classList.add(`${projectType}-frame`);
        }

        // Handle Github Link
        const githubUrl = project.getAttribute("data-github");
        if (githubUrl) {
          lightboxGithub.href = githubUrl;
          lightboxGithub.style.display = "inline-flex";
        } else {
          lightboxGithub.style.display = "none";
        }

        // Handle Tech Stack
        try {
          const techData = JSON.parse(project.getAttribute("data-tech") || "[]");
          lightboxTechList.innerHTML = "";
          techData.forEach(tech => {
            const techTag = document.createElement("div");
            techTag.classList.add("tech-tag");
            techTag.innerHTML = `
              <i class="${tech.icon}"></i>
              <span>${tech.name}</span>
            `;
            lightboxTechList.appendChild(techTag);
          });
        } catch (e) {
          console.error("Error parsing tech data:", e);
          lightboxTechList.innerHTML = "";
        }
      }
      
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    buildDots();
    showImg(currentIndex);
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function buildDots() {
    lightboxDots.innerHTML = "";
    currentImgs.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => showImg(i));
      lightboxDots.appendChild(dot);
    });
  }

  function showImg(index) {
    currentIndex = (index + currentImgs.length) % currentImgs.length;
    lightboxImg.src = currentImgs[currentIndex];
    lightboxDots.querySelectorAll("span").forEach((d, i) => {
      d.classList.toggle("active", i === currentIndex);
    });
  }

  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showImg(currentIndex - 1); });
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showImg(currentIndex + 1); });
  closeBtn.addEventListener("click", closeLightbox);

  // click outside container to close
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowLeft") showImg(currentIndex - 1);
    if (e.key === "ArrowRight") showImg(currentIndex + 1);
    if (e.key === "Escape") closeLightbox();
  });
}

initLightbox();

// ── Supabase Contact Form Integration ─────────
let supabaseClient = null;

try {
  // Initialize Supabase Client with safety check
  const supabaseUrl = 'https://vzrrwbzthpbbfkmbifne.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cnJ3Ynp0aHBiYmZrbWJpZm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODgyNzgsImV4cCI6MjA4OTA2NDI3OH0.rHBYIw8KrUXPAcBA2zYFI3RCcBO-apA5Jms8hmbFFL8';
  
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
  } else {
    console.warn("Supabase library not loaded. Contact form will be disabled.");
  }
} catch (e) {
  console.error("Critical error during Supabase initialization:", e);
}

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI Loading State
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><div class="btn-glow"></div>';
    submitBtn.style.opacity = '0.7';
    submitBtn.style.pointerEvents = 'none';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    // Get Data
    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;
    const message = document.getElementById('sender-message').value;

    try {
      if (!supabaseClient) {
        throw new Error("Supabase client is not initialized. Please check your internet connection or Brave Shields.");
      }
      // Insert into Supabase
      const { data, error } = await supabaseClient
        .from('messages')
        .insert([
          { name: name, email: email, message: message }
        ]);

      if (error) throw error;

      // Success UI
      formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
      formStatus.classList.add('success');
      contactForm.reset();
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback: This error usually happens if Row Level Security (RLS) policies aren't set up yet,
      // or if the table 'messages' doesn't exist.
      formStatus.textContent = "Failed to send message. Please ensure your database is configured correctly.";
      formStatus.classList.add('error');
    } finally {
      // Reset Button State
      submitBtn.innerHTML = originalBtnText;
      submitBtn.style.opacity = '1';
      submitBtn.style.pointerEvents = 'auto';
      
      // Auto-clear success/error message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    }
  });
}
/**
 * Portfolio Script - Refactored for Modularity & Reliability
 */

// ── Particle System for Loader ──────────────────────────────────────────────
const initLoaderParticles = () => {
  const canvas = document.getElementById("loaderCanvas");
  if (!canvas) return;
  
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
      if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) this.vx *= -1;
      if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) this.vy *= -1;
    }
  }

  const init = () => {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
  };

  const connect = () => {
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - distance / maxDistance) * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  };

  init();
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
};

// ── Background Particle System ───────────────────────────────────────────────
const initBackgroundParticles = () => {
  const bgCanvas = document.getElementById("bgCanvas");
  if (!bgCanvas) return;
  
  const ctx = bgCanvas.getContext("2d");
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;

  const bgParticles = [];
  const COUNT = 100;
  const MAX_DIST = 160;

  class BgParticle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * bgCanvas.width;
      this.y = Math.random() * bgCanvas.height;
      this.radius = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.35 + 0.1;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`;
      ctx.fill();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > bgCanvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > bgCanvas.height) this.vy *= -1;
    }
  }

  const init = () => {
    bgParticles.length = 0;
    for (let i = 0; i < COUNT; i++) bgParticles.push(new BgParticle());
  };

  const connect = () => {
    for (let i = 0; i < bgParticles.length; i++) {
      for (let j = i + 1; j < bgParticles.length; j++) {
        const dx = bgParticles[i].x - bgParticles[j].x;
        const dy = bgParticles[i].y - bgParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / MAX_DIST) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(bgParticles[i].x, bgParticles[i].y);
          ctx.lineTo(bgParticles[j].x, bgParticles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgParticles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  };

  init();
  animate();

  window.addEventListener("resize", () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    init();
  });
};

// ── UI Interactions & Effects ────────────────────────────────────────────────
const initUIEffects = () => {
  // Loader visibility
  const hideLoader = () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };
  window.addEventListener("load", () => setTimeout(hideLoader, 2500));
  setTimeout(hideLoader, 5000); // Fallback

  // Typing Effect
  const roles = ["Fresh Graduate", "Aspiring Full-Stack Developer", "Problem Solver"];
  let roleIdx = 0, charIdx = 0, isDeleting = false;
  const typingEl = document.getElementById("typing-role");

  const type = () => {
    const current = roles[roleIdx];
    typingEl.textContent = current.substring(0, isDeleting ? charIdx - 1 : charIdx + 1);
    charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  };
  if (typingEl) type();

  // Scroll Effects (Header & Section Reveal)
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
    
    let current = "";
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 500) current = s.id; });
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  sections.forEach(s => observer.observe(s));

  // Mobile Menu
  const ham = document.getElementById("hamburger");
  const nav = document.querySelector("nav ul");
  const close = document.getElementById("navClose");
  const toggleMenu = () => { ham.classList.toggle("active"); nav.classList.toggle("open"); };
  
  ham?.addEventListener("click", toggleMenu);
  close?.addEventListener("click", toggleMenu);
  nav?.querySelectorAll("a").forEach(l => l.addEventListener("click", toggleMenu));
};

// ── Carousel System ──────────────────────────────────────────────────────────
const initCarousels = () => {
  document.querySelectorAll(".carousel").forEach(carousel => {
    const slides = carousel.querySelector(".carousel-slides");
    const imgs = slides.querySelectorAll("img");
    const dots = carousel.querySelector(".carousel-dots");
    let current = 0, timer;

    const bg = document.createElement("div");
    bg.classList.add("carousel-bg");
    bg.style.backgroundImage = `url('${imgs[0].src}')`;
    carousel.insertBefore(bg, slides);

    imgs.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => { stop(); goTo(i); start(); });
      dots.appendChild(dot);
    });

    const goTo = (idx) => {
      current = (idx + imgs.length) % imgs.length;
      slides.style.transform = `translateX(-${current * 100}%)`;
      dots.querySelectorAll("span").forEach((d, i) => d.classList.toggle("active", i === current));
      bg.style.backgroundImage = `url('${imgs[current].src}')`;
    };

    const start = () => timer = setInterval(() => goTo(current + 1), 4000);
    const stop = () => clearInterval(timer);

    carousel.querySelector(".prev")?.addEventListener("click", () => { stop(); goTo(current - 1); start(); });
    carousel.querySelector(".next")?.addEventListener("click", () => { stop(); goTo(current + 1); start(); });
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    start();
  });
};

// ── Lightbox System ──────────────────────────────────────────────────────────
const initLightbox = () => {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  const lbImg = document.getElementById("lightbox-img");
  const lbDots = lb.querySelector(".lightbox-dots");
  const lbTitle = document.getElementById("lightbox-title");
  const lbDesc = document.getElementById("lightbox-description");
  const lbTech = document.getElementById("lightbox-tech-list");
  const lbGithub = document.getElementById("lightbox-github");
  
  let currentImages = [], currentIdx = 0;

  document.querySelectorAll(".view-project-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = btn.closest(".project");
      currentImages = Array.from(p.querySelectorAll(".carousel-slides img")).map(i => i.src);
      currentIdx = 0;

      lbTitle.textContent = p.getAttribute("data-title") || "Project";
      lbDesc.innerHTML = parseDescription(p.getAttribute("data-description") || "");
      lbGithub.href = p.getAttribute("data-github") || "#";
      lbGithub.style.display = p.getAttribute("data-github") ? "inline-flex" : "none";
      
      updateTechStack(p.getAttribute("data-tech"), lbTech);
      
      lb.querySelector(".lightbox-gallery").className = `lightbox-gallery ${p.getAttribute("data-type") || ""}-frame`;
      open();
    });
  });

  const parseDescription = (raw) => {
    const lines = raw.split("\n").map(l => l.trim()).filter(l => l);
    let html = "", inList = false;
    lines.forEach((l, i) => {
      if (l.startsWith("Key Features:")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h3 class="features-title">${l}</h3>`;
      } else if (l.startsWith("▹")) {
        if (!inList) { html += '<ul class="features-list">'; inList = true; }
        html += `<li>${l.substring(1).trim()}</li>`;
      } else {
        if (inList) { html += "</ul>"; inList = false; }
        html += i === 0 ? `<p class="lightbox-main-desc">${l}</p>` : `<p>${l}</p>`;
      }
    });
    return inList ? html + "</ul>" : html;
  };

  const updateTechStack = (json, container) => {
    try {
      const data = JSON.parse(json || "[]");
      container.innerHTML = data.map(t => `<div class="tech-tag"><i class="${t.icon}"></i><span>${t.name}</span></div>`).join("");
    } catch (e) { container.innerHTML = ""; }
  };

  const open = () => { lb.classList.add("active"); document.body.style.overflow = "hidden"; show(0); };
  const close = () => { lb.classList.remove("active"); document.body.style.overflow = ""; };
  
  const show = (idx) => {
    currentIdx = (idx + currentImages.length) % currentImages.length;
    lbImg.src = currentImages[currentIdx];
    lbDots.innerHTML = currentImages.map((_, i) => `<span class="${i === currentIdx ? 'active' : ''}"></span>`).join("");
    lbDots.querySelectorAll("span").forEach((s, i) => s.onclick = () => show(i));
  };

  lb.querySelector(".lightbox-close")?.addEventListener("click", close);
  lb.querySelector(".prev")?.addEventListener("click", (e) => { e.stopPropagation(); show(currentIdx - 1); });
  lb.querySelector(".next")?.addEventListener("click", (e) => { e.stopPropagation(); show(currentIdx + 1); });
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("active")) return;
    if (e.key === "ArrowLeft") show(currentIdx - 1);
    if (e.key === "ArrowRight") show(currentIdx + 1);
    if (e.key === "Escape") close();
  });
};

// ── Contact Form (Supabase) ──────────────────────────────────────────────────
const initContactForm = () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const btn = document.getElementById("submit-btn");
  const status = document.getElementById("form-status");
  let client = null;

  try {
    const url = "https://vzrrwbzthpbbfkmbifne.supabase.co";
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cnJ3Ynp0aHBiYmZrbWJpZm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODgyNzgsImV4cCI6MjA4OTA2NDI3OH0.rHBYIw8KrUXPAcBA2zYFI3RCcBO-apA5Jms8hmbFFL8";
    if (window.supabase) client = window.supabase.createClient(url, key);
  } catch (e) { console.error("Supabase Init Error:", e); }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!client) return status.textContent = "Service unavailable. Please try again later.";

    const originalText = btn.innerHTML;
    btn.innerHTML = "<span>Sending...</span>";
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none";

    const formData = {
      name: document.getElementById("sender-name").value,
      email: document.getElementById("sender-email").value,
      message: document.getElementById("sender-message").value
    };

    try {
      const { error } = await client.from("messages").insert([formData]);
      if (error) throw error;
      status.textContent = "Success! I'll get back to you soon.";
      status.className = "form-status success";
      form.reset();
    } catch (err) {
      status.textContent = "Error sending message. Please check your connection.";
      status.className = "form-status error";
    } finally {
      btn.innerHTML = originalText;
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
      setTimeout(() => { status.textContent = ""; status.className = "form-status"; }, 5000);
    }
  });
};

// ── App Initialization ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initLoaderParticles();
  initBackgroundParticles();
  initUIEffects();
  initCarousels();
  initLightbox();
  initContactForm();
});
/**
 * Particle Systems for Loader and Background
 */

const initLoaderParticles = () => {
  const canvas = document.getElementById("loaderCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  const numberOfParticles = window.innerWidth < 768 ? 30 : 50;
  const maxDistance = 130;
  let animId = null;
  let stopped = false;

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
      if (this.x - this.radius < 0 || this.x + this.radius > canvas.width)
        this.vx *= -1;
      if (this.y - this.radius < 0 || this.y + this.radius > canvas.height)
        this.vy *= -1;
    }
  }

  const init = () => {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++)
      particlesArray.push(new Particle());
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
    if (stopped) return;
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((p) => {
      p.update();
      p.draw();
    });
    connect();
    animId = requestAnimationFrame(animate);
  };

  window._stopLoaderParticles = () => {
    stopped = true;
    if (animId) cancelAnimationFrame(animId);
    canvas.width = 1;
    canvas.height = 1;
  };

  init();
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
};

const initBackgroundParticles = () => {
  const bgCanvas = document.getElementById("bgCanvas");
  if (!bgCanvas) return;

  const ctx = bgCanvas.getContext("2d");
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;

  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 30 : 60;
  const MAX_DIST = isMobile ? 120 : 160;
  const bgParticles = [];

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
    bgParticles.forEach((p) => {
      p.update();
      p.draw();
    });
    connect();
    requestAnimationFrame(animate);
  };

  init();
  animate();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
      init();
    }, 200);
  });
};

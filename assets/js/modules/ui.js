/**
 * UI Interactions: Loader, Typing, Scroll Reveal, and Mobile Menu
 */

const initUIEffects = () => {
  // 1. Loader Hide Logic
  const hideLoader = () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (window._stopLoaderParticles) window._stopLoaderParticles();
      }, 650);
    }
  };

  const MIN_LOADER_MS = 800;
  const loaderStart = Date.now();
  const scheduleHide = () => {
    const elapsed = Date.now() - loaderStart;
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
    setTimeout(hideLoader, remaining);
  };

  window.addEventListener("load", scheduleHide);
  setTimeout(hideLoader, 3000); // safety fallback

  // 2. Typing Effect
  const roles = ["Fresh Graduate", "Aspiring Full-Stack Developer", "Problem Solver"];
  let roleIdx = 0, charIdx = 0, isDeleting = false;
  const typingEl = document.getElementById("typing-role");

  const type = () => {
    if (!typingEl) return;
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

  // 3. Scroll Reveal & Active Links
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 50);

    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 500) current = s.id;
    });
    navLinks.forEach((link) =>
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`)
    );
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((s) => observer.observe(s));

  // 4. Mobile Menu
  const ham = document.getElementById("hamburger");
  const nav = document.querySelector("nav ul");
  const close = document.getElementById("navClose");
  const toggleMenu = () => {
    ham?.classList.toggle("active");
    nav?.classList.toggle("open");
  };

  ham?.addEventListener("click", toggleMenu);
  close?.addEventListener("click", toggleMenu);
  nav?.querySelectorAll("a").forEach((l) => l.addEventListener("click", toggleMenu));
};

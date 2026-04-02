/**
 * Main Entry Point: Portfolio Modular Initialization (Global Scope Version)
 * For compatibility with local file:// protocol
 */

// NOTE: Sub-modules (particles.js, ui.js, etc.) must be loaded in index.html 
// BEFORE this file for the functions below to be available.

document.addEventListener("DOMContentLoaded", () => {
  // 1. Critical for visual experience
  if (typeof initLoaderParticles === "function") initLoaderParticles();
  
  // 2. Main UI Interactions
  if (typeof initUIEffects === "function") initUIEffects();
  if (typeof initCarousels === "function") initCarousels();
  if (typeof initLightbox === "function") initLightbox();
  if (typeof initContactForm === "function") initContactForm();

  // 3. Defer background particles to ensure smooth LCP
  const startBg = () => {
    if (typeof initBackgroundParticles === "function") initBackgroundParticles();
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(startBg, { timeout: 2000 });
  } else {
    setTimeout(startBg, 300);
  }
});

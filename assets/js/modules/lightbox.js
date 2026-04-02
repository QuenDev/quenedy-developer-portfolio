/**
 * Lightbox System: Project Deep Dive
 */

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

  document.querySelectorAll(".view-project-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = btn.closest(".project");
      currentImages = Array.from(p.querySelectorAll(".carousel-slides img")).map((i) => i.src);
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
    const lines = raw.split("\n").map((l) => l.trim()).filter((l) => l);
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
      container.innerHTML = data
        .map((t) => `<div class="tech-tag"><i class="${t.icon}"></i><span>${t.name}</span></div>`)
        .join("");
    } catch (e) {
      container.innerHTML = "";
    }
  };

  const open = () => {
    lb.classList.add("active");
    document.body.style.overflow = "hidden";
    show(0);
  };

  const close = () => {
    lb.classList.remove("active");
    document.body.style.overflow = "";
  };

  const show = (idx) => {
    currentIdx = (idx + currentImages.length) % currentImages.length;
    lbImg.src = currentImages[currentIdx];
    lbDots.innerHTML = currentImages.map((_, i) => `<span class="${i === currentIdx ? "active" : ""}"></span>`).join("");
    lbDots.querySelectorAll("span").forEach((s, i) => (s.onclick = () => show(i)));
  };

  lb.querySelector(".lightbox-close")?.addEventListener("click", close);
  lb.querySelector(".prev")?.addEventListener("click", (e) => { e.stopPropagation(); show(currentIdx - 1); });
  lb.querySelector(".next")?.addEventListener("click", (e) => { e.stopPropagation(); show(currentIdx + 1); });
  
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("active")) return;
    if (e.key === "ArrowLeft") show(currentIdx - 1);
    if (e.key === "ArrowRight") show(currentIdx + 1);
    if (e.key === "Escape") close();
  });
};

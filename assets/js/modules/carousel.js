/**
 * Project Card Carousel Logic
 */

const initCarousels = () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const slides = carousel.querySelector(".carousel-slides");
    const imgs = slides.querySelectorAll("img");
    const dots = carousel.querySelector(".carousel-dots");
    let current = 0, timer;

    // Set background blur image
    const bg = document.createElement("div");
    bg.classList.add("carousel-bg");
    bg.style.backgroundImage = `url('${imgs[0].src}')`;
    carousel.insertBefore(bg, slides);

    // Create pagination dots
    imgs.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        stop();
        goTo(i);
        start();
      });
      dots.appendChild(dot);
    });

    const goTo = (idx) => {
      current = (idx + imgs.length) % imgs.length;
      slides.style.transform = `translateX(-${current * 100}%)`;
      dots.querySelectorAll("span").forEach((d, i) => d.classList.toggle("active", i === current));
      bg.style.backgroundImage = `url('${imgs[current].src}')`;
    };

    const start = () => (timer = setInterval(() => goTo(current + 1), 4000));
    const stop = () => clearInterval(timer);

    carousel.querySelector(".prev")?.addEventListener("click", () => {
      stop();
      goTo(current - 1);
      start();
    });
    carousel.querySelector(".next")?.addEventListener("click", () => {
      stop();
      goTo(current + 1);
      start();
    });

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    start();
  });
};

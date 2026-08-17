/* ============================================
   donate.js — WE1A Donate Page
   ============================================ */


/* ── CAROUSEL (reusable — supports multiple independent instances) ── */
function initCarousel({ wrapId, trackId, dotsId, prevId, nextId, dotClass, autoRotateMs = 6000 }) {
  const wrap  = document.getElementById(wrapId);
  const track = document.getElementById(trackId);
  const dotsEl = document.getElementById(dotsId);
  if (!wrap || !track || !dotsEl) return;

  const slides = track.children;
  let current = 0;

  // Build dots ONCE
  Array.from(slides).forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = dotClass + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => showSlide(i));
    dotsEl.appendChild(dot);
  });

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = "translateX(-" + (current * 100) + "%)";
    dotsEl.querySelectorAll("." + dotClass).forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  function nextSlide() { showSlide(current + 1); }
  function prevSlide()  { showSlide(current - 1); }

  // Arrow buttons
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  // Keyboard — scoped to this carousel so a second instance doesn't fight it
  wrap.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Swipe
  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? nextSlide() : prevSlide();
  }, { passive: true });

  // Auto-rotate, paused on hover
  let autoTimer = setInterval(nextSlide, autoRotateMs);
  wrap.addEventListener("mouseenter", () => clearInterval(autoTimer));
  wrap.addEventListener("mouseleave", () => { autoTimer = setInterval(nextSlide, autoRotateMs); });
}

initCarousel({
  wrapId: "carousel", trackId: "carouselTrack", dotsId: "dotsContainer",
  prevId: "prevBtn", nextId: "nextBtn", dotClass: "dot",
});

initCarousel({
  wrapId: "qrCarousel", trackId: "qrTrack", dotsId: "qrDotsContainer",
  prevId: "qrPrevBtn", nextId: "qrNextBtn", dotClass: "qr-dot",
});


/* ── IMPACT COUNTERS ───────────────────────── */
function updateCounter(element) {
  const target    = parseInt(element.getAttribute("data-target"));
  const suffix    = element.getAttribute("data-suffix") || "";
  const increment = Math.ceil(target / 100);
  const speed     = 20;
  let count       = 0;

  function update() {
    if (count < target) {
      count += increment;
      if (count > target) count = target;
      element.innerText = count.toLocaleString() + suffix;
      setTimeout(update, speed);
    } else {
      element.innerText = target.toLocaleString() + suffix;
    }
  }

  update();
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll(".count").forEach(counter => observer.observe(counter));


/* ── FREQUENCY TOGGLE ──────────────────────── */
document.querySelectorAll(".freq-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".freq-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


/* ── AMOUNT TILES ──────────────────────────── */
const customInput = document.getElementById("customAmount");

document.querySelectorAll(".amount-tile").forEach(tile => {
  tile.addEventListener("click", () => {
    document.querySelectorAll(".amount-tile").forEach(t => t.classList.remove("selected"));
    tile.classList.add("selected");
    if (customInput) customInput.value = "";
  });
});

if (customInput) {
  customInput.addEventListener("focus", () => {
    document.querySelectorAll(".amount-tile").forEach(t => t.classList.remove("selected"));
  });
}


/* ── CONTINUE TO SQUARESPACE DONATE PAGE ───── */
// Replace with the published URL of your Squarespace Donate Block page.
const SQUARESPACE_DONATE_URL = "https://YOUR-SITE.squarespace.com/donate";

const continueBtn = document.getElementById("donateContinueBtn");
const amountError = document.getElementById("amountError");

if (continueBtn) {
  continueBtn.addEventListener("click", function () {
    const selectedTile = document.querySelector(".amount-tile.selected");
    const customVal    = customInput ? customInput.value.trim() : "";

    if (!selectedTile && !customVal) {
      amountError.classList.add("visible");
      return;
    }

    amountError.classList.remove("visible");
    window.location.href = SQUARESPACE_DONATE_URL;
  });
}
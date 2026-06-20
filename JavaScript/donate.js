/* ============================================
   donate.js — WE1A Donate Page
   ============================================ */


/* ── CAROUSEL ──────────────────────────────── */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const track  = document.getElementById("carouselTrack");
const dotsEl = document.getElementById("dotsContainer");

// Build dots ONCE
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", "Go to slide " + (i + 1));
  dot.addEventListener("click", () => showSlide(i));
  dotsEl.appendChild(dot);
});

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide()  { showSlide(currentSlide - 1); }

// Arrow buttons
document.getElementById("prevBtn").addEventListener("click", prevSlide);
document.getElementById("nextBtn").addEventListener("click", nextSlide);

// Keyboard
document.addEventListener("keydown", (e) => {
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

// Auto-rotate every 6 seconds
let autoTimer = setInterval(nextSlide, 6000);

// Pause on hover
const wrap = document.getElementById("carousel");
wrap.addEventListener("mouseenter", () => clearInterval(autoTimer));
wrap.addEventListener("mouseleave", () => { autoTimer = setInterval(nextSlide, 6000); });


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


/* ── FORM VALIDATION ───────────────────────── */
const form        = document.getElementById("donateForm");
const successMsg  = document.getElementById("donateSuccess");
const amountError = document.getElementById("amountError");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const selectedTile = document.querySelector(".amount-tile.selected");
    const customVal    = customInput ? customInput.value.trim() : "";

    if (!selectedTile && !customVal) {
      amountError.classList.add("visible");
      valid = false;
    } else {
      amountError.classList.remove("visible");
    }

    form.querySelectorAll("input[required]").forEach(input => {
      const errorSpan = input.nextElementSibling;
      const isEmpty   = input.value.trim() === "";
      const badEmail  = input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());

      if (isEmpty || badEmail) {
        input.classList.add("error");
        if (errorSpan && errorSpan.classList.contains("field-error")) {
          errorSpan.classList.add("visible");
        }
        valid = false;
      } else {
        input.classList.remove("error");
        if (errorSpan && errorSpan.classList.contains("field-error")) {
          errorSpan.classList.remove("visible");
        }
      }
    });

    if (valid) {
      form.style.display = "none";
      successMsg.classList.add("visible");
      successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  form.querySelectorAll("input[required]").forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("error");
      const errorSpan = input.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains("field-error")) {
        errorSpan.classList.remove("visible");
      }
    });
  });
}
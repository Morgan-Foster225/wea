
let lastScroll = 0;
const header = document.querySelector(".header");
const delta = 10;            // Minimum scroll to trigger hide/show
const headerHeight = header.offsetHeight;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Don't hide the header while the mobile menu is open
    if (header.classList.contains("nav-open")) return;

    // Only run if scroll is more than delta
    if (Math.abs(currentScroll - lastScroll) <= delta) return;

    if (currentScroll > lastScroll && currentScroll > headerHeight) {
        // Scrolling down
        header.classList.add("hide");
    } else if (currentScroll + window.innerHeight < document.body.scrollHeight) {
        // Scrolling up
        header.classList.remove("hide");
    }

    lastScroll = currentScroll;
});

/* ── Mobile hamburger menu ──────────────────────────────────────────
   This runs on every page that loads header.js. It:
   1. Creates the hamburger button (the three-line icon)
   2. Opens/closes the menu when you tap it
   3. Also closes it on Escape, on link clicks, and back on desktop
   The actual animation lives in header.css — this file only toggles
   the CSS classes ("nav-open", "hide", "nav-lock") that turn it on/off. */
(function () {
    const nav = header && header.querySelector("nav");
    if (!nav) return; // No nav on this page, nothing to do.

    // --- 1. Create the hamburger button (three stacked bars) ---
    const toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false"); // Tells screen readers if it's open.
    toggle.innerHTML =
        '<span class="nav-toggle__bar"></span>' +
        '<span class="nav-toggle__bar"></span>' +
        '<span class="nav-toggle__bar"></span>';
    header.appendChild(toggle);

    // Give each link a number so header.css can fade them in one after another.
    const links = Array.from(nav.querySelectorAll("a"));
    links.forEach((link, index) => link.style.setProperty("--i", index));

    // --- 2. Open and close helpers ---
    function openMenu() {
        header.classList.add("nav-open");      // Show the menu.
        header.classList.remove("hide");       // Make sure the header is visible.
        document.body.classList.add("nav-lock"); // Stop the page behind from scrolling.
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
    }

    function closeMenu() {
        header.classList.remove("nav-open");
        document.body.classList.remove("nav-lock");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
    }

    function isOpen() {
        return header.classList.contains("nav-open");
    }

    // --- 3. Wire up the ways to open/close the menu ---

    // Tapping the hamburger toggles it.
    toggle.addEventListener("click", () => {
        isOpen() ? closeMenu() : openMenu();
    });

    // Tapping a link closes the menu. If it goes to another page, let the
    // menu finish its close animation (380ms) before navigating away.
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            if (!isOpen()) return;

            const href = link.getAttribute("href");
            const isSamePageAnchor = !href || href.charAt(0) === "#";

            closeMenu();
            if (isSamePageAnchor) return; // Same page: just close, no navigation.

            event.preventDefault(); // Pause navigation...
            window.setTimeout(() => {
                window.location.href = href; // ...then go, after the animation.
            }, 380);
        });
    });

    // Pressing Escape closes the menu.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) closeMenu();
    });

    // If the window grows to desktop size while open, close the menu.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && isOpen()) closeMenu();
    });
})();

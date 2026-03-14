let lastScroll = 0;
const header = document.querySelector(".header");
const delta = 10;            // Minimum scroll to trigger hide/show
const headerHeight = header.offsetHeight;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

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

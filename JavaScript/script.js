let count = 0;
let target = 6600;

const increment = 50;
const speed = 20;

function updateCounter(counterElement) {
    if (count < target) {
        count += increment;

        if (count > target) count = target;

        counterElement.innerText = count.toLocaleString() + "+";

        setTimeout(() => updateCounter(counterElement), speed);
    } else {
        counterElement.innerText = target.toLocaleString() + "+";
    }
}

// Select the counter element
const participantCounter = document.getElementById("participants");

// Trigger when visible
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateCounter(participantCounter);
            observer.unobserve(participantCounter);
        }
    });
}, { threshold: 0.6 });

observer.observe(participantCounter);



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

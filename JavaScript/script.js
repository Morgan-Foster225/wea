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


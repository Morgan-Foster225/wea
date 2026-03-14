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


/* =========================
   EMAILJS SETUP
========================= */

// 🔴 REPLACE THESE WITH YOUR REAL KEYS
const publicKey = "YOUR_PUBLIC_KEY";
const serviceID = "YOUR_SERVICE_ID";
const templateID = "YOUR_TEMPLATE_ID";

// Initialize EmailJS
emailjs.init(publicKey);

const form = document.getElementById("partnerForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    message.style.color = "black";
    message.textContent = "Sending...";

    emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            message.style.color = "green";
            message.textContent = "✅ Partnership request sent successfully!";
            form.reset();
        }, function(error) {
            message.style.color = "red";
            message.textContent = "❌ Something went wrong. Please try again.";
            console.error("EmailJS Error:", error);
        });
});


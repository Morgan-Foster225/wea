
// =========================
  // EMAILJS SETUP
const form = document.getElementById("partnerForm");
const message = document.getElementById("formMessage");

// Your Formspree endpoint
const endpoint = "https://formspree.io/f/mreoblpp";

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    message.style.color = "black";
    message.textContent = "Sending...";

    const formData = new FormData(form);

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        const result = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.textContent = "✅ Request sent successfully!";
            form.reset();
        } else {
            message.style.color = "red";
            message.textContent = result?.errors?.[0]?.message || "❌ Something went wrong.";
        }
    } catch (error) {
        message.style.color = "red";
        message.textContent = "❌ Network error. Please check your connection.";
        console.error("Formspree Error:", error);
    }
});

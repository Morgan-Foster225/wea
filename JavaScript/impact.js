let lastScroll = 0;
const header = document.querySelector(".header");
const delta = 10;

if (header) {
    const headerHeight = header.offsetHeight;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (Math.abs(currentScroll - lastScroll) <= delta) return;

        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }

        lastScroll = currentScroll;
    });
}


/* ==========================
   YOUTUBE VIDEO SYSTEM
========================== */

const videos = [
    {
        src: "https://www.youtube.com/embed/qta77jp_Qro",
        title: "Mahogany's Impact Story",
        description: "Mahogany shares how she deeply appreciated the schedule and structure the program offered, finding comfort and stability in the consistency it provided. The thoughtful organization allowed her to fully engage with each session, and she continues to use the valuable information and tools she learned to this day."
    },
    {
        src: "https://www.youtube.com/embed/CoNxYJSefls",
        title: "Joan's Impact Story",
        description: "Joan shares that when she first joined the program, she was in a very dark place, carrying a great deal of pain and emotional baggage. Initially, she signed up simply out of boredom, not expecting it to have much of an impact. However, after just a few sessions, she began to experience something she hadn’t felt in a long time—a sense of safety and belonging."
    },
    {
        src: "https://www.youtube.com/embed/q68hEpUcoRI",
        title: "Syndi's Impact Story",
        description: "Syndi shares that she originally had no real interest in the program and joined without many expectations. However, after attending a few meetings, she began to realize how much she could relate to what was being discussed and to the reflection prompts that were shared. What once felt distant quickly became personal and meaningful."
    },
    {
        src: "https://www.youtube.com/embed/ZSxekbP_2lA",
        title: "Shaquille's Impact Story",
        description: "Shaquille shares that she initially attended the program simply because it offered a time reduction, without expecting much beyond that practical benefit. However, what she found was far more meaningful than she anticipated. The program became a safe space where she could focus on her mental health, begin healing, and actively work toward recovery."
    }
];

let currentIndex = 0;
const videoPlayer = document.getElementById("carouselVideo");

function updateVideo() {
    videoPlayer.src = videos[currentIndex].src;
    document.getElementById("videoTitle").textContent = videos[currentIndex].title;
    document.getElementById("videoDescription").textContent = videos[currentIndex].description;
}

function nextVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    updateVideo();
}

function prevVideo() {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    updateVideo();
}

window.addEventListener("load", updateVideo);
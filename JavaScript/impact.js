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


const videos = [
    {
        src: "videos/Thomas-Keel.mp4",
        title: "Mahogany's Story ",
        description: "Mahogany's shares her journey of  growth, and rebuilding life after incarceration through structured support, using tactics learned while particapting and coummity found in wea1."
    },
    {
        src: "videos/LeesImpact.mp4",
        title: "Lee's Impact Story",
        description: "Lee reflects on overcoming trauma with wea1 while rediscovering identity, stability, and hope."
    },
    {
        src: "videos/Richardson.mp4",
        title: "Cindy's Story",
        description: "A powerful story of resilience and transformation made possible through strong bonds, mentorship and sisterhood."
    },
    {
        src: "videos/Whitehead.mp4",
        title: "A Story of new found growth and healing",
        description: "This testimony highlights healing, accountability, and restored purpose after attending and particapating in wea1."
    }
];

let currentIndex = 0;
let autoSlideInterval;
const videoPlayer = document.getElementById("carouselVideo");

function updateVideo() {
    videoPlayer.src = videos[currentIndex].src;
    videoPlayer.load();

    document.getElementById("videoTitle").textContent =
        videos[currentIndex].title;

    document.getElementById("videoDescription").textContent =
        videos[currentIndex].description;
}

function setVideo(index) {
    currentIndex = index;
    updateVideo();
    resetAutoSlide();
}

function nextVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    updateVideo();
}

function nextVideoManual() {
    nextVideo();
    resetAutoSlide();
}

function prevVideo() {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    updateVideo();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextVideo, 8000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

/* Pause carousel while video is playing */
videoPlayer.addEventListener("play", stopAutoSlide);
videoPlayer.addEventListener("pause", startAutoSlide);
videoPlayer.addEventListener("ended", startAutoSlide);

window.onload = function () {
    updateVideo();      // THIS was missing
    startAutoSlide();
};
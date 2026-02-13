/*
  User-editable content:
  - Put your image files in assets/images/
  - Put optional music in assets/audio/
  - Update only this top section for personalization
*/
const recipientName = "Yashvi";
const boyfriendName = "Jenish";
const messageText = "Wishing you the happiest birthday ever. You make life brighter every day, and I am so lucky to celebrate you.";
const imageList = ["1.jpeg", "2.jpeg", "3.jpeg"];
const musicFile = "L.mp3"; // Example: "song.mp3". Leave empty to disable music.

const pageRoot = document.getElementById("pageRoot");
const giftBox = document.getElementById("giftBox");
const birthdayCard = document.getElementById("birthdayCard");
const birthdayHeading = document.getElementById("birthdayHeading");
const birthdayMessage = document.getElementById("birthdayMessage");
const photoFrame = document.getElementById("photoFrame");
const slideCounter = document.getElementById("slideCounter");
const nextSlideBtn = document.getElementById("nextSlideBtn");
const replayBtn = document.getElementById("replayBtn");
const confettiLayer = document.getElementById("confetti");
const sparklesLayer = document.getElementById("sparkles");
const balloonsLayer = document.getElementById("balloons");

let currentSlide = 0;
let slideInterval = null;
let hasOpened = false;
let audio = null;

const safeImages = imageList.filter(Boolean).map((fileName) => `assets/images/${fileName}`);

function initContent() {
  birthdayHeading.textContent = `Happy Birthday ${recipientName} 🎂💖`;
  birthdayMessage.textContent = `${messageText} - ${boyfriendName}`;

  if (safeImages.length > 0) {
    setSlide(0, false);
  } else {
    photoFrame.alt = "Add birthday photos in assets/images";
    slideCounter.textContent = "No images yet";
    nextSlideBtn.disabled = true;
  }

  setupAudio();
}

function setSlide(index, animate = true) {
  if (safeImages.length === 0) return;

  const nextIndex = (index + safeImages.length) % safeImages.length;

  if (animate) {
    photoFrame.classList.add("fading");
    window.setTimeout(() => {
      currentSlide = nextIndex;
      photoFrame.src = safeImages[currentSlide];
      photoFrame.alt = `Birthday photo ${currentSlide + 1}`;
      slideCounter.textContent = `${currentSlide + 1} / ${safeImages.length}`;
      photoFrame.classList.remove("fading");
    }, 170);
  } else {
    currentSlide = nextIndex;
    photoFrame.src = safeImages[currentSlide];
    photoFrame.alt = `Birthday photo ${currentSlide + 1}`;
    slideCounter.textContent = `${currentSlide + 1} / ${safeImages.length}`;
    photoFrame.classList.remove("fading");
  }
}

function nextSlide() {
  setSlide(currentSlide + 1);
}

function startAutoPlay() {
  if (safeImages.length <= 1) return;
  stopAutoPlay();
  slideInterval = window.setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
  if (!slideInterval) return;
  window.clearInterval(slideInterval);
  slideInterval = null;
}

function clearEffects() {
  confettiLayer.innerHTML = "";
  sparklesLayer.innerHTML = "";
  balloonsLayer.innerHTML = "";
}

function spawnConfetti() {
  const colors = ["#ff8bc1", "#ffd977", "#94d8c8", "#93b7ff", "#ffc2a1"];

  for (let i = 0; i < 40; i += 1) {
    const piece = document.createElement("span");
    piece.className = "particle";
    piece.style.left = `${45 + Math.random() * 10}%`;
    piece.style.top = `${34 + Math.random() * 10}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 220)}px`);
    piece.style.setProperty("--dy", `${Math.round(70 + Math.random() * 170)}px`);
    confettiLayer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function spawnSparkles() {
  for (let i = 0; i < 18; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${24 + Math.random() * 52}%`;
    spark.style.top = `${24 + Math.random() * 42}%`;
    spark.style.setProperty("--sx", `${Math.round((Math.random() - 0.5) * 180)}px`);
    spark.style.setProperty("--sy", `${Math.round((Math.random() - 0.5) * 140)}px`);
    sparklesLayer.appendChild(spark);
    spark.addEventListener("animationend", () => spark.remove(), { once: true });
  }
}

function spawnBalloons() {
  const balloonColors = ["#ffa9cf", "#9de0cf", "#ffe59a", "#adc9ff"];

  for (let i = 0; i < 8; i += 1) {
    const balloon = document.createElement("span");
    balloon.className = "balloon";
    balloon.style.left = `${20 + i * 8 + Math.random() * 6}%`;
    balloon.style.top = `${56 + Math.random() * 10}%`;
    balloon.style.background = balloonColors[i % balloonColors.length];
    balloon.style.setProperty("--bx", `${Math.round((Math.random() - 0.5) * 65)}px`);
    balloon.style.setProperty("--by", `${Math.round(-150 - Math.random() * 130)}px`);
    balloonsLayer.appendChild(balloon);
    balloon.addEventListener("animationend", () => balloon.remove(), { once: true });
  }
}

async function playBackgroundMusic() {
  if (!audio) return;

  try {
    await audio.play();
  } catch (error) {
    // Playback can fail due to browser policies or missing files; fail silently.
  }
}

function openGift() {
  if (hasOpened) return;

  hasOpened = true;
  pageRoot.classList.add("opened");
  birthdayCard.setAttribute("aria-hidden", "false");

  clearEffects();
  spawnConfetti();
  spawnSparkles();
  spawnBalloons();
  startAutoPlay();
  playBackgroundMusic();
}

function replayExperience() {
  hasOpened = false;
  stopAutoPlay();
  clearEffects();
  pageRoot.classList.remove("opened");
  birthdayCard.setAttribute("aria-hidden", "true");

  if (safeImages.length > 0) {
    setSlide(0, false);
  }

  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function setupAudio() {
  if (!musicFile) return;

  audio = new Audio(`assets/audio/${musicFile}`);
  audio.loop = true;
}

giftBox.addEventListener("click", openGift);
giftBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openGift();
  }
});

nextSlideBtn.addEventListener("click", () => {
  nextSlide();
  startAutoPlay();
});

replayBtn.addEventListener("click", replayExperience);

initContent();
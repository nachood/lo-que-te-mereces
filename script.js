const envelopeButton = document.getElementById("openLetter");
const envelopeSection = document.querySelector(".letter-section");
const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");
const emojiBurst = document.getElementById("emojiBurst");
const revealItems = document.querySelectorAll(".reveal");

envelopeButton?.addEventListener("click", () => {
  const isOpen = envelopeSection.classList.toggle("letter-open");
  envelopeButton.setAttribute("aria-expanded", String(isOpen));
});

secretButton?.addEventListener("click", () => {
  const isVisible = secretMessage.classList.toggle("show");
  secretButton.setAttribute("aria-expanded", String(isVisible));
  createEmojiBurst();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

function createEmojiBurst() {
  if (!emojiBurst) return;

  const emojis = ["💖", "💗", "💘", "✨", "💋", "💕", "💞", "🌟", "😘"];

  for (let index = 0; index < 22; index += 1) {
    const emoji = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 22;
    const distance = 90 + Math.random() * 110;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 40;
    const rotation = `${Math.random() * 80 - 40}deg`;

    emoji.className = "burst-emoji";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.setProperty("--x", `${x}px`);
    emoji.style.setProperty("--y", `${y}px`);
    emoji.style.setProperty("--r", rotation);
    emoji.style.animationDelay = `${Math.random() * 0.18}s`;

    emojiBurst.appendChild(emoji);
    emoji.addEventListener("animationend", () => emoji.remove(), { once: true });
  }
}

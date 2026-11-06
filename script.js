// ==========================================================
// InquizeX OSINT
// ==========================================================

const CHANNEL_ID = "UCuyLmOJb7PVCvx8zbRT9_GQ";
const UPLOADS_ID = "UU" + CHANNEL_ID.slice(2); // channel's uploads playlist

const SOURCES = {
  live: `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`,
  uploads: `https://www.youtube.com/embed/videoseries?list=${UPLOADS_ID}`,
};

// ---------- Nav: background on scroll + mobile menu ----------
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// ---------- Player tabs ----------
const player = document.getElementById("player");
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    player.src = SOURCES[tab.dataset.src];
  });
});

// ---------- Terminal typing ----------
const lines = [
  ["> init inquizex.osint", ""],
  ["> connecting live camera feeds", " [ok]"],
  ["> syncing news wires", " [ok]"],
  ["> geolocation module", " [ok]"],
  ["> cross-referencing sources", " [ok]"],
  ["> status: monitoring", ""],
];
const term = document.getElementById("typing");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderStatic() {
  term.innerHTML = lines.map(([t, ok]) => t + (ok ? `<span class="ok">${ok}</span>` : "")).join("\n") +
    ' <span class="cursor"></span>';
}

if (reduceMotion) {
  renderStatic();
} else {
  let li = 0, ci = 0, html = "";
  (function type() {
    if (li >= lines.length) { term.innerHTML = html + '<span class="cursor"></span>'; return; }
    const [text, ok] = lines[li];
    if (ci < text.length) {
      html += text[ci++];
      term.innerHTML = html + '<span class="cursor"></span>';
      setTimeout(type, 28);
    } else {
      if (ok) html += `<span class="ok">${ok}</span>`;
      html += li < lines.length - 1 ? "\n" : "";
      li++; ci = 0;
      term.innerHTML = html + '<span class="cursor"></span>';
      setTimeout(type, 380);
    }
  })();
}

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  io.observe(el);
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ==========================================================
// InquizeX OSINT
// ==========================================================

// Live streams. To change a stream, swap the video ID (the part after "watch?v=").
const STREAMS = {
  ukraine:    { id: "mTEqaZj2aho", label: "FEED // UKRAINE" },
  middleeast: { id: "fn_ZWTr0Tb8", label: "FEED // MIDDLE EAST" },
};

// Recent uploads = the channel's uploads playlist (channel ID with "UC" swapped for "UU").
const CHANNEL_ID = "UCuyLmOJb7PVCvx8zbRT9_GQ";
const UPLOADS = {
  embed: `https://www.youtube.com/embed/videoseries?list=UU${CHANNEL_ID.slice(2)}`,
  link: "https://www.youtube.com/@Inquizex/videos",
  label: "FEED // RECENT UPLOADS",
  title: "InquizeX OSINT recent uploads",
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
    const s = tab.dataset.src === "uploads" ? UPLOADS : {
      ...STREAMS[tab.dataset.src],
      embed: `https://www.youtube.com/embed/${STREAMS[tab.dataset.src].id}`,
      link: `https://www.youtube.com/watch?v=${STREAMS[tab.dataset.src].id}`,
      title: `InquizeX OSINT live stream: ${tab.textContent.replace("Live now:", "").trim()}`,
    };
    player.src = s.embed;
    player.title = s.title;
    document.getElementById("playerLabel").textContent = s.label;
    document.getElementById("playerLink").href = s.link;
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

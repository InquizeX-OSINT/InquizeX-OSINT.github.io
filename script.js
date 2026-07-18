// ==============================
// Terminal Typing Animation
// ==============================

const lines = [
    "> Initializing InquizeX OSINT...",
    "> Connecting to intelligence feeds...",
    "> Monitoring global events...",
    "> Loading OSINT modules...",
    "> Tracking public data...",
    "> Intelligence Ready."
];

const terminal = document.getElementById("typing");

let line = 0;
let char = 0;

function typeLine() {

    if (line >= lines.length) return;

    if (char < lines[line].length) {

        terminal.innerHTML += lines[line].charAt(char);

        char++;

        setTimeout(typeLine, 35);

    } else {

        terminal.innerHTML += "\n";

        line++;

        char = 0;

        setTimeout(typeLine, 400);

    }

}

terminal.innerHTML = "";

typeLine();


// ==============================
// Scroll Reveal
// ==============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


// ==============================
// Mouse Glow
// ==============================

const glow = document.createElement("div");

glow.id = "cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});

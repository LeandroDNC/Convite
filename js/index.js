
// ===== Configuração da data: sempre 22 de novembro =====
(function setDate() {
    const now = new Date();
    const year = (now.getMonth() > 10 || (now.getMonth() === 10 && now.getDate() > 22)) ? now.getFullYear() + 1 : now.getFullYear();
    const elYear = document.getElementById('year');
    const elMonth = document.getElementById('month');
    const elDay = document.getElementById('day');
    elYear.textContent = year;
    elMonth.textContent = 'NOV';
    elDay.textContent = '22';
    document.getElementById('addCalendar').dataset.date = year + '-11-22';
    startCountdown(new Date(year + '-11-22T18:00:00'));
})();

// ===== Contagem regressiva =====
function startCountdown(target) {
    const out = document.getElementById('countdown');
    function tick() {
        const diff = target - new Date();
        if (diff <= 0) { out.textContent = 'Hoje é o grande dia!'; return; }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        out.textContent = `${d} dias ${h}h ${m}m para o nosso noivado`;
        requestAnimationFrame(() => setTimeout(tick, 1000));
    }
    tick();
}

// ===== Pétalas caindo continuamente =====
const colors = ['#dbe6f6', '#e8c5c2', '#c9d7ea', '#f1e9dc'];
function spawnPetal() {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = Math.random() * 10 + 8; // 8-18px
    p.style.width = size + 'px'; p.style.height = (size * 1.2) + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 7) + 's';
    p.style.opacity = .45 + Math.random() * .35;
    p.style.background = `radial-gradient(circle at 60% 40%, #fff 0 36%, transparent 38%),
                            radial-gradient(circle at 40% 60%, #fff 0 38%, transparent 40%),
                            radial-gradient(80% 50% at 50% 50%, ${colors[(Math.random() * colors.length) | 0]}, #d6e0ef 60%)`;
    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
}
setInterval(spawnPetal, 550);

// ===== Revelação suave =====
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .18 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));


// ===== ICS: adicionar ao calendário =====
document.getElementById('addCalendar').addEventListener('click', () => {
    // Dados do evento
    const title = "Noivado Leandro e Erwelly";
    const description = "Esperamos por você!";
    const location = "Endereço do evento";
    
    // Data de início e fim (formato: AAAAMMDDTHHMMSS)
    const startDate = "20251122T180000"; // 22 de novembro de 2025 às 18:00
    const endDate = "20251122T210000";   // 22 de novembro de 2025 às 21:00

    // Conteúdo do ICS
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SeuSite//Eventos//PT
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR
`.trim();

    // Criar blob e link temporário
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'noivado_leandro_ervelly.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});


// Música romântica com fade-in automático
const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0; // começa mudo

function startMusic() {
    bgMusic.play().then(() => {
        let vol = 0;
        const fadeIn = setInterval(() => {
            if (vol < 0.4) { // sobe até 40% de volume
                vol += 0.01;
                bgMusic.volume = vol;
            } else {
                clearInterval(fadeIn);
            }
        }, 200);
    }).catch(() => {
        // se ainda houver bloqueio, espera o clique
        document.body.addEventListener("click", startMusic, { once: true });
    });
}

// tenta tocar imediatamente
startMusic();


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

// ===== Confete ao toque =====
function confettiBurst(x, y) {
    const n = 24; const live = document.getElementById('aria-confetti');
    live.textContent = 'Confete!';
    for (let i = 0; i < n; i++) {
        const d = document.createElement('div');
        d.style.position = 'fixed'; d.style.left = x + 'px'; d.style.top = y + 'px';
        d.style.width = '7px'; d.style.height = '12px'; d.style.background = ['#9fb7d1', '#c7b288', '#e8c5c2', '#8aa6c9'][i % 4];
        d.style.borderRadius = '2px'; d.style.transform = `rotate(${Math.random() * 360}deg)`;
        d.style.zIndex = 5; d.style.opacity = .95; d.style.pointerEvents = 'none';
        document.body.appendChild(d);
        const ang = Math.random() * Math.PI * 2; const vel = 2 + Math.random() * 4;
        const dx = Math.cos(ang) * vel, dy = Math.sin(ang) * vel;
        let vx = dx, vy = dy, ay = .12 + Math.random() * .08, life = 0;
        (function anim() {
            const t = setTimeout(anim, 16);
            life += 1; vx *= .99; vy += ay; x += vx * 3; y += vy * 3;
            d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.transform += ' rotate(6deg)';
            if (life > 120) { clearTimeout(t); d.remove(); }
        })();
    }
}
document.getElementById('confetti').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    confettiBurst(rect.left + rect.width / 2, rect.top);
});

// ===== ICS: adicionar ao calendário =====
document.getElementById('addCalendar').addEventListener('click', (e) => {
    const dateStr = e.currentTarget.dataset.date; // YYYY-MM-DD
    const dtStart = dateStr.replace(/-/g, '') + 'T180000';
    const dtEnd = dateStr.replace(/-/g, '') + 'T210000';
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Convite Noivado//PT-BR\nBEGIN:VEVENT\nUID:${Date.now()}@convite\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nSUMMARY:Noivado – Leandro & Erwelly\nDESCRIPTION:Esperamos por você! Local: Boi e Brasa, Abreu e Lima – PE.\nLOCATION:Boi e Brasa, Abreu e Lima – PE\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'noivado-leandro-erwelly.ics'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
});
// Música romântica com fade-in automático
const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 2; // começa mudo
bgMusic.play().then(() => {
    let vol = 1;
    const fadeIn = setInterval(() => {
        if (vol < 0.4) { // sobe até 40% de volume
            vol += 0.01;
            bgMusic.volume = vol;
        } else {
            clearInterval(fadeIn);
        }
    }, 200);
}).catch(() => {
    // Caso o navegador bloqueie autoplay, inicia no primeiro clique
    document.body.addEventListener("click", () => {
        bgMusic.play();
    }, { once: true });
});

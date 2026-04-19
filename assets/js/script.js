document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // ── Active nav link on scroll ─────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));

    // ── Hamburger (mobile) ────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinksEl = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinksEl.classList.toggle('open');
    });

    // Close on link click
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinksEl.classList.remove('open');
        });
    });

    // ── Hero Terminal Typewriter ──────────────────────────────
    const termBody = document.getElementById('termBody');
    if (termBody) {

        const LINES = [
            { type: 'cmd' },
            { type: 'blank' },
            { type: 'obj', key: 'name', val: '"Bagus Hary"', vtype: 'str' },
            { type: 'obj', key: 'role', val: '"Software Developer"', vtype: 'str' },
            { type: 'obj', key: 'location', val: '"Depok, ID"', vtype: 'str' },
            { type: 'obj', key: 'openTo', val: 'true', vtype: 'val' },
            { type: 'blank' },
            { type: 'ok', text: '✓ Ready to build.' },
            { type: 'cursor' },
        ];

        function createLine(l) {
            const div = document.createElement('div');
            div.className = 'term-line';

            if (l.type === 'cmd') {
                div.innerHTML = `<span class="t-prompt">~$</span><span class="t-cmd"> node portfolio.js</span>`;
            } else if (l.type === 'blank') {
                div.innerHTML = `<span> </span>`;
            } else if (l.type === 'obj') {
                const cls = l.vtype === 'str' ? 't-str' : 't-val';
                div.innerHTML = `<span>  <span class="t-key">${l.key}</span>: <span class="${cls}">${l.val}</span></span>`;
            } else if (l.type === 'ok') {
                div.innerHTML = `<span class="t-ok"> ${l.text}</span>`;
            } else if (l.type === 'cursor') {
                div.innerHTML = `<span class="t-prompt">~$</span><span> </span><span class="t-cursor"></span>`;
            }

            return div;
        }

        let idx = 0;

        function typeNext() {
            if (idx >= LINES.length) return;
            const line = LINES[idx];
            const el = createLine(line);
            termBody.appendChild(el);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => el.classList.add('show'));
            });

            idx++;

            const delay =
                line.type === 'cmd' ? 650 :
                    line.type === 'cursor' ? 0 :
                        line.type === 'blank' ? 100 : 160;

            if (idx < LINES.length) setTimeout(typeNext, delay);
        }

        setTimeout(typeNext, 600);
    }

});
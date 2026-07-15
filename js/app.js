const appState = {
    quiz: { phase: null, symptom: null },
    patient: {
        name: 'María González',
        day: 15,
        manual: {
            1:  { title: "Día 1 · Inicio", desc: "Agua termal cada 20 min. Dormir semisentado.", meds: ["Cefadroxilo 500mg", "Prednisona 20mg"] },
            5:  { title: "Día 5 · Curación temprana", desc: "Primera evaluación profesional. Revisión injerto a injerto.", meds: ["Cefadroxilo 500mg"] },
            10: { title: "Día 10 · Caída de costras", desc: "Retiro de costras. Inicio rutina Lazartigue Thicker.", meds: ["Shampoo Thicker"] },
            15: { title: "Día 15 · Efluvio activo", desc: "Caída del pelo injertado: es normal y esperado.", meds: ["Lazartigue Cica-Calm"] },
            20: { title: "Día 20 · Actividad liviana", desc: "Ejercicio físico liviano permitido. Sin pesas.", meds: ["Lazartigue Cica-Calm"] },
            30: { title: "Día 30 · Hito 1 mes", desc: "Casco duro y pesas permitidos. Tintes desde día 60.", meds: ["Lazartigue Stronger"] }
        }
    }
};

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast-enter pointer-events-auto w-full sm:w-auto sm:max-w-sm p-4 rounded-xl shadow-lg border text-xs font-semibold bg-white ${type === 'success' ? 'border-sage text-navy' : 'border-red-300 text-red-800'}`;
    const label = document.createElement('span');
    label.textContent = message;
    toast.appendChild(label);
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 200);
    }, 3000);
}

function showSection(id) {
    ['landing', 'login-patient', 'login-professional', 'dashboard-patient', 'dashboard-professional'].forEach(s => {
        const el = document.getElementById('section-' + s);
        if (el) el.classList.add('hidden');
    });
    const active = document.getElementById('section-' + id);
    if (active) active.classList.remove('hidden');
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.toggle('hidden', id.startsWith('dashboard'));
    const cta = document.getElementById('sticky-cta');
    if (cta && id !== 'landing') cta.classList.add('hidden');
    closeMobileMenu();
    window.scrollTo(0, 0);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('btn-mobile-menu');
    if (!menu) return;
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    if (btn) btn.setAttribute('aria-expanded', String(!isOpen));
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('btn-mobile-menu');
    if (menu) menu.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

function submitLead(event) {
    event.preventDefault();
    showToast('¡Solicitud enviada! Nos contactaremos por WhatsApp.', 'success');
    event.target.reset();
}

/* ── Autoevaluación (dolores → precarga el formulario) ─── */
function selectTriage(card) {
    document.querySelectorAll('#self-triage-grid .triage-card').forEach(c => c.classList.remove('triage-selected'));
    card.classList.add('triage-selected');
    const motivo = card.dataset.motivo;
    const select = document.getElementById('lead-motivo');
    if (select) {
        [...select.options].forEach(o => { o.selected = o.value === motivo || o.text === motivo; });
    }
    const result = document.getElementById('triage-result');
    if (result) result.classList.remove('hidden');
}

/* ── CTA móvil persistente ─────────────────────────────── */
function initStickyCta() {
    const cta = document.getElementById('sticky-cta');
    const hero = document.querySelector('header');
    if (!cta || !hero || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
        cta.classList.toggle('hidden', entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(hero);
}
document.addEventListener('DOMContentLoaded', initStickyCta);

function loginPatient() {
    showToast('Bienvenida');
    showSection('dashboard-patient');
    loadPatientDashboard();
}

function loginProfessional() {
    showToast('Acceso autorizado');
    showSection('dashboard-professional');
}

function logout() {
    showSection('landing');
}

function setQuizAnswer(key, val, btn) {
    appState.quiz[key] = val;
    if (btn) {
        btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('quiz-selected'));
        btn.classList.add('quiz-selected');
    }
    if (appState.quiz.phase && appState.quiz.symptom) {
        const r = document.getElementById('quiz-result');
        r.classList.remove('hidden');
        document.getElementById('result-title').innerText =
            appState.quiz.symptom === 'itchy'  ? 'Gama Cica-Calm' :
            appState.quiz.symptom === 'weak'   ? 'Gama Stronger Capixyl' :
                                                 'Gama Thicker';
        document.getElementById('result-desc').innerText =
            'Fórmula botánica francesa vegana, adaptada a tu fase actual.';
    }
}

let lastMilestoneKey = null;

function applyDayContent(pd) {
    document.getElementById('p-action-title').innerText = pd.title;
    document.getElementById('p-action-desc').innerText  = pd.desc;
    const ml = document.getElementById('p-action-meds');
    if (ml) {
        ml.innerHTML = '';
        pd.meds.forEach(m => {
            const li = document.createElement('li');
            li.innerText = m;
            ml.appendChild(li);
        });
    }
}

function updateEvolutionDay(dayVal) {
    appState.patient.day = parseInt(dayVal);
    document.getElementById('lbl-evolution-day').innerText = dayVal;
    const key =
        dayVal >= 30 ? 30 :
        dayVal >= 20 ? 20 :
        dayVal >= 15 ? 15 :
        dayVal >= 10 ? 10 :
        dayVal >= 5  ? 5  : 1;
    const pd = appState.patient.manual[key];
    const card = document.getElementById('card-action');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (card && lastMilestoneKey !== null && key !== lastMilestoneKey && !reduceMotion) {
        card.classList.add('content-swap');
        setTimeout(() => {
            applyDayContent(pd);
            card.classList.remove('content-swap');
        }, 150);
    } else {
        applyDayContent(pd);
    }
    lastMilestoneKey = key;
    renderCalendar(parseInt(dayVal));
}

let calendarAnimated = false;

function renderCalendar(cd) {
    const grid = document.getElementById('grid-30-days');
    if (!grid) return;
    grid.innerHTML = '';
    const milestones = [2, 5, 10, 15, 20, 30];
    const stagger = !calendarAnimated && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for (let i = 1; i <= 30; i++) {
        const c = document.createElement('div');
        c.innerText = i;
        c.className =
            i === cd          ? 'p-2 rounded-lg bg-navy text-white border-2 border-sage' :
            milestones.includes(i) ? 'p-2 rounded-lg bg-sage text-navy' :
            i < cd            ? 'p-2 rounded-lg bg-creme text-navy/70' :
                                'p-2 rounded-lg bg-white border border-navy/10 text-navy/55';
        if (stagger) {
            c.classList.add('cal-enter');
            c.style.animationDelay = `${i * 12}ms`;
        }
        c.style.cursor = 'pointer';
        c.onclick = () => {
            const slider = document.getElementById('evolution-day-slider');
            if (slider) slider.value = i;
            updateEvolutionDay(i);
        };
        grid.appendChild(c);
    }
    if (stagger) calendarAnimated = true;
}

/* ── Reveals de scroll ─────────────────────────────────── */
/* El contenido es visible por defecto: solo las secciones bajo el
   fold reciben la clase de entrada, y solo si hay JS y sin
   preferencia de reduced-motion. */
function initScrollReveals() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('#section-landing > section').forEach(sec => {
        if (sec.getBoundingClientRect().top > window.innerHeight) {
            sec.classList.add('reveal-init');
            io.observe(sec);
        }
    });
}
document.addEventListener('DOMContentLoaded', initScrollReveals);

function loadPatientDashboard() {
    updateEvolutionDay(appState.patient.day);
}

/* ── Dashboard profesional ─────────────────────────────── */

function scrollToProSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function focusQuickEntry() {
    const input = document.getElementById('qe-name');
    if (!input) return;
    input.closest('form').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => input.focus({ preventScroll: true }), 350);
}

function createFollowup(event) {
    event.preventDefault();
    const name = document.getElementById('qe-name').value.trim();
    const tech = document.getElementById('qe-tech').value;
    const uf   = document.getElementById('qe-uf').value.trim();
    const obs  = document.getElementById('qe-obs').value.trim();
    if (!name) {
        showToast('Ingresa el nombre del paciente.', 'error');
        return;
    }
    const list = document.getElementById('patient-list');
    const row = document.createElement('div');
    row.className = 'p-5 hover:bg-creme/35 transition-colors bg-sage/5';
    const detail = [ 'Día 1', tech, uf ? `${uf} UF` : null, obs || 'ingreso reciente' ].filter(Boolean).join(' · ');
    row.innerHTML = `
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="flex items-start gap-4">
                <span class="traffic-dot bg-emerald-500 mt-2"></span>
                <div>
                    <p class="font-bold text-navy"><span class="patient-name"></span> <span class="text-[10px] text-sage-dark bg-sage/15 px-2 py-1 rounded-full ml-2">Nuevo</span></p>
                    <p class="text-xs text-navy/65 mt-1 patient-detail"></p>
                </div>
            </div>
            <div class="text-xs text-navy/65">Sin fotos aún</div>
        </div>`;
    row.querySelector('.patient-name').textContent = name;
    row.querySelector('.patient-detail').textContent = detail;
    list.prepend(row);
    event.target.reset();
    showToast(`Seguimiento creado para ${name}.`, 'success');
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function previewPhoto(event, input) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const label = input.closest('label');
        const tile = document.createElement('div');
        tile.className = label.classList.contains('h-32')
            ? 'h-32 rounded-xl overflow-hidden border border-sage/40 relative'
            : 'h-24 rounded-xl overflow-hidden border border-sage/40 relative';
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Foto de control subida';
        img.className = 'w-full h-full object-cover';
        tile.appendChild(img);
        const tag = document.createElement('span');
        tag.textContent = 'Hoy';
        tag.className = 'absolute bottom-1 right-1 text-[9px] font-bold uppercase bg-navy/80 text-white px-1.5 py-0.5 rounded';
        tile.appendChild(tag);
        label.parentElement.insertBefore(tile, label);
        input.value = '';
        showToast('Foto agregada al registro de evolución.', 'success');
    };
    reader.readAsDataURL(file);
}

function setPatientTab(id) {
    ['panel', 'evolution', 'meds', 'lazartigue'].forEach(t => {
        const el  = document.getElementById(`p-tab-${t}`);
        const btn = document.getElementById(`btn-tab-${t}`);
        if (el)  el.style.display = t === id ? 'block' : 'none';
        if (btn) btn.className = t === id
            ? 'shrink-0 whitespace-nowrap lg:w-full text-left px-4 py-2 lg:px-3 lg:py-2.5 rounded-lg font-medium bg-white/10 text-white'
            : 'shrink-0 whitespace-nowrap lg:w-full text-left px-4 py-2 lg:px-3 lg:py-2.5 rounded-lg font-medium text-creme/75 hover:bg-white/5';
    });
    scrollTabContentIntoView(`p-tab-${id}`);
}

/* Solo baja el scroll si el contenido de la pestaña no está ya a la
   vista: en desktop (sidebar fijo al lado) casi nunca hace falta; en
   móvil (sidebar apilado arriba) es lo que evita que el cambio de
   pestaña parezca no haber hecho nada. */
function scrollTabContentIntoView(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.5;
    if (!alreadyVisible) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const appState = {
    quiz: { phase: null, symptom: null },
    patient: {
        name: 'María González',
        day: 15,
        manual: {
            1:  { title: "Día 1 · Inicio", desc: "Agua termal cada 20 min. Dormir semisentado.", meds: ["Cefadroxilo 500mg", "Prednisona 20mg"] },
            5:  { title: "Día 5 · Curación temprana", desc: "Primera evaluación profesional. Revisión injerto a injerto.", meds: ["Cefadroxilo 500mg"] },
            10: { title: "Día 10 · Caída de costras", desc: "Retiro de costras. Inicio rutina Lazartigue Thicker.", meds: ["Shampoo Thicker"] },
            15: { title: "Día 15 · Efluvio activo", desc: "Caída del pelo injertado — es normal y esperado.", meds: ["Lazartigue Cica-Calm"] },
            20: { title: "Día 20 · Actividad liviana", desc: "Ejercicio físico liviano permitido. Sin pesas.", meds: ["Lazartigue Cica-Calm"] },
            30: { title: "Día 30 · Hito 1 mes", desc: "Casco duro y pesas permitidos. Tintes desde día 60.", meds: ["Lazartigue Stronger"] }
        }
    }
};

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto p-4 rounded-xl shadow-lg border text-xs font-semibold bg-white ${type === 'success' ? 'border-sage text-navy' : 'border-red-300 text-red-800'}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showSection(id) {
    ['landing', 'login-patient', 'login-professional', 'dashboard-patient', 'dashboard-professional'].forEach(s => {
        const el = document.getElementById('section-' + s);
        if (el) el.classList.add('hidden');
    });
    const active = document.getElementById('section-' + id);
    if (active) active.classList.remove('hidden');
    window.scrollTo(0, 0);
}

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

function setQuizAnswer(key, val) {
    appState.quiz[key] = val;
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
    renderCalendar(parseInt(dayVal));
}

function renderCalendar(cd) {
    const grid = document.getElementById('grid-30-days');
    if (!grid) return;
    grid.innerHTML = '';
    const milestones = [2, 5, 10, 15, 20, 30];
    for (let i = 1; i <= 30; i++) {
        const c = document.createElement('div');
        c.innerText = i;
        c.className =
            i === cd          ? 'p-2 rounded-lg bg-navy text-white border-2 border-sage' :
            milestones.includes(i) ? 'p-2 rounded-lg bg-sage text-navy' :
            i < cd            ? 'p-2 rounded-lg bg-creme text-navy/60' :
                                'p-2 rounded-lg bg-white border border-navy/10 text-navy/40';
        c.style.cursor = 'pointer';
        c.onclick = () => {
            const slider = document.getElementById('evolution-day-slider');
            if (slider) slider.value = i;
            updateEvolutionDay(i);
        };
        grid.appendChild(c);
    }
}

function loadPatientDashboard() {
    updateEvolutionDay(appState.patient.day);
}

function setPatientTab(id) {
    ['panel', 'evolution', 'meds', 'lazartigue'].forEach(t => {
        const el  = document.getElementById(`p-tab-${t}`);
        const btn = document.getElementById(`btn-tab-${t}`);
        if (el)  el.style.display = t === id ? 'block' : 'none';
        if (btn) btn.className = t === id
            ? 'w-full text-left px-3 py-2.5 rounded-lg font-medium bg-white/10 text-white'
            : 'w-full text-left px-3 py-2.5 rounded-lg font-medium text-creme/75 hover:bg-white/5';
    });
}

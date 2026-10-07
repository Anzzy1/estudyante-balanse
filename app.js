// Shared helpers
function saveName(e) {
    const input = document.getElementById('nameInput');
    if (input && input.value.trim()) {
        localStorage.setItem('userName', input.value.trim());
    }
}

// Get Started: required name + Enter to continue
function submitName() {
    const input = document.getElementById('nameInput');
    const name = input ? input.value.trim() : '';
    if (!name) {
        if (input) input.focus();
        showToast('Please enter your name first.');
        return;
    }
    localStorage.setItem('userName', name);
    window.location.href = 'create-account.html';
}

function togglePassword() {
    const pwd = document.getElementById('passwordInput');
    const btn = document.getElementById('toggleBtn');
    if (!pwd) return;
    const show = pwd.type === 'password';
    pwd.type = show ? 'text' : 'password';
    if (btn) {
        btn.innerHTML = show
            ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>'
            : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Init password toggle icon
    const toggleBtn = document.getElementById('toggleBtn');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
    }

    // Welcome name
    const welcomeName = document.getElementById('welcomeName');
    if (welcomeName) {
        const n = localStorage.getItem('userName');
        if (n) welcomeName.textContent = 'Welcome, ' + n + '!';
    }

    // Enter key sa name input = Continue
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitName();
            }
        });
    }

    // Enter key sa login inputs = Login
    ['loginEmail', 'loginPassword'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    doLogin();
                }
            });
        }
    });

    // Enter key sa register inputs = Create Account
    ['emailInput', 'passwordInput'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    doRegister();
                }
            });
        }
    });

    // OTP: auto-advance like React handleChange
    const otpIds = ['otp-0','otp-1','otp-2','otp-3','otp-4','otp-5'];
    const otpEls = otpIds.map(id => document.getElementById(id)).filter(Boolean);
    otpEls.forEach((input, i) => {
        input.addEventListener('input', function() {
            if (!/^[0-9]?$/.test(this.value)) { this.value = ''; return; }
            if (this.value && i < otpEls.length - 1) otpEls[i+1].focus();
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && i > 0) otpEls[i-1].focus();
        });
    });

    // Setup wizard
    const stepIndicators = document.getElementById('stepIndicators');
    if (stepIndicators) {
        let step = 1;
        let subjects = [];
        let days = [];
        const colors = ["bg-[#3d9bf5]", "bg-[#20b978]", "bg-[#ffbd19]", "bg-[#9b5de5]"];

        function renderSteps() {
            stepIndicators.innerHTML = [1,2,3,4,5].map(s => `
                <div class="flex items-center">
                    <span class="w-10 h-10 rounded-full flex items-center justify-center font-black ${s < step ? 'bg-[#ffbd28] text-white' : s === step ? 'bg-[#ffbd28] text-white shadow-[0_0_0_5px_#fff4d5]' : 'bg-[#e9f1fb] text-[#254d81]'}">${s < step ? '✓' : s}</span>
                    ${s < 5 ? `<span class='w-8 h-1 rounded ${s < step ? 'bg-[#ffbd28]' : 'bg-[#e3ecf7]'}'></span>` : ""}
                </div>`).join('');
            document.getElementById('stepNum').textContent = step;
            for (let i = 1; i <= 5; i++) {
                const el = document.getElementById('s' + i);
                if (el) el.classList.toggle('hidden', i !== step);
            }
            const backBtn = document.getElementById('backBtn');
            const nextBtn = document.getElementById('nextBtn');
            const finishBtn = document.getElementById('finishBtn');
            const navBtns = document.getElementById('navBtns');
            if (step > 1) { backBtn.style.display = 'flex'; backBtn.classList.remove('hidden'); navBtns.classList.remove('justify-end'); navBtns.classList.add('justify-between'); }
            else { backBtn.style.display = 'none'; navBtns.classList.add('justify-end'); navBtns.classList.remove('justify-between'); }
            if (step < 5) { nextBtn.style.display = 'flex'; finishBtn.style.display = 'none'; finishBtn.classList.add('hidden'); }
            else { nextBtn.style.display = 'none'; finishBtn.style.display = 'flex'; finishBtn.classList.remove('hidden'); }
            if (step === 5) renderReview();
        }

        function renderReview() {
            const edu = document.getElementById('eduLevel');
            const job = document.getElementById('hasJob');
            document.getElementById('revLevel').textContent = edu ? edu.value : '—';
            document.getElementById('revJob').textContent = job ? job.value : '—';
            document.getElementById('revSubCount').textContent = subjects.length;
            document.getElementById('revSubjects').innerHTML = subjects.length
                ? subjects.map(s => `<div class="flex rounded-xl border border-[#e0edfb] mb-2 bg-white overflow-hidden"><div class="w-2 self-stretch ${s.color}"></div><div class="flex-1 px-3 py-2"><strong class="block text-[14px] text-[#123c7a]" style="font-family: 'Nunito', sans-serif">${s.name}</strong><span class="text-[#6684b3] text-[12px]">${s.time} · ${s.days}</span></div></div>`).join('')
                : '<div class="bg-[#f7fbff] border border-dashed border-[#c8e1ff] rounded-xl px-4 py-3 text-[#6684b3] text-[14px]">No subjects added yet.</div>';
            document.getElementById('revComCount').textContent = commitments.length;
            document.getElementById('revCommits').innerHTML = commitments.length
                ? commitments.map(c => `<div class="flex items-center gap-3 bg-white border border-[#e0edfb] rounded-xl p-2.5 mb-2"><div class="w-[37px] h-[37px] rounded-[10px] ${c.work ? 'bg-[#fff2c9]' : 'bg-[#edf6ff]'} flex items-center justify-center flex-none">${c.icon}</div><div class="flex-1 leading-tight"><strong class="block text-[14px] text-[#123c7a]" style="font-family: 'Nunito', sans-serif">${c.name}</strong><span class="text-[#6684b3] text-[12px]">${c.days} · ${c.time}</span></div></div>`).join('')
                : '<div class="bg-[#f7fbff] border border-dashed border-[#c8e1ff] rounded-xl px-4 py-3 text-[#6684b3] text-[14px]">No commitments added yet.</div>';
            document.getElementById('revPrio').textContent = priorities.length ? priorities.join(', ') : '—';
            document.getElementById('revStudy').textContent = studyTime || '—';
            document.getElementById('revTask').textContent = taskTime || '—';
        }

        document.querySelectorAll('.goto-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                step = Number(btn.dataset.goto);
                renderSteps();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        document.getElementById('nextBtn').addEventListener('click', () => { if (step < 5) { step++; renderSteps(); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
        document.getElementById('backBtn').addEventListener('click', () => { if (step > 1) { step--; renderSteps(); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
        document.getElementById('finishBtn').addEventListener('click', async (e) => {
            try {
                localStorage.setItem('eb_setup', JSON.stringify({
                    name: localStorage.getItem('userName') || '',
                    level: document.getElementById('eduLevel') ? document.getElementById('eduLevel').value : '',
                    job: document.getElementById('hasJob') ? document.getElementById('hasJob').value : '',
                    subjects: subjects,
                    commitments: commitments,
                    priorities: priorities,
                    studyTime: studyTime,
                    taskTime: taskTime
                }));
            } catch (err) {}
            // Kailangan ng account para ma-save sa database (para makapag-login ulit)
            e.preventDefault();
            if (!getUser()) {
                window.location.href = 'create-account.html?finish=1';
                return;
            }
            await syncSetupToAPI();
            window.location.href = 'dashboard.html';
        });

        document.querySelectorAll('#daysWrap button').forEach(btn => {
            btn.addEventListener('click', () => {
                const d = btn.dataset.day;
                if (days.includes(d)) {
                    days = days.filter(x => x !== d);
                    btn.className = 'min-w-[45px] h-[34px] px-2 rounded-full text-xs font-bold cursor-pointer bg-[#e7f1fc] text-[#4775a9]';
                } else {
                    days.push(d);
                    btn.className = 'min-w-[45px] h-[34px] px-2 rounded-full text-xs font-bold cursor-pointer bg-[#4b9af5] text-white';
                }
            });
        });

        document.getElementById('addSubjectBtn').addEventListener('click', () => {
            const subName = document.getElementById('subName').value;
            const start = document.getElementById('startTime').value;
            const end = document.getElementById('endTime').value;
            if (!subName || !start || !end) { showToast('Fill subject + time'); return; }
            const subConflict = findConflict(days, start, end, [[subjects, 'subject'], [commitments, 'commitment']]);
            if (subConflict) { showToast(subConflict); return; }
            const random = colors[Math.floor(Math.random() * colors.length)];
            subjects.push({ id: Date.now(), name: subName, time: start + ' - ' + end, days: days.join(', '), color: random });
            document.getElementById('subName').value = '';
            document.getElementById('startTime').value = '07:00';
            document.getElementById('endTime').value = '09:00';
            days = [];
            document.querySelectorAll('#daysWrap button').forEach(b => {
                b.className = 'min-w-[45px] h-[34px] px-2 rounded-full text-xs font-bold cursor-pointer bg-[#e7f1fc] text-[#4775a9]';
            });
            renderSchedule();
        });

        function renderSchedule() {
            const list = document.getElementById('scheduleList');
            if (!list) return;
            list.innerHTML = subjects.map(s => `
                <div class="flex rounded-2xl border-[1.5px] border-[#cfe4ff] mb-3 bg-white">
                    <div class="w-2 self-stretch rounded-l-[10px] ${s.color}"></div>
                    <div class="flex-1 p-3">
                        <strong class="block text-[13px] text-[#123f82]">${s.time}</strong>
                        <h3 class="text-[13px] font-bold text-[#164b91]">${s.name}</h3>
                        <span class="inline-block mt-1 px-2 py-1 rounded-full bg-[#e3f0ff] text-[#3678b9] text-[10px] font-bold">${s.days}</span>
                    </div>
                    <button data-id="${s.id}" class="m-3 cursor-pointer text-[#7d99be] del-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></button>
                </div>`).join('');
            list.querySelectorAll('.del-btn').forEach(b => {
                b.addEventListener('click', () => {
                    subjects = subjects.filter(x => String(x.id) !== b.dataset.id);
                    renderSchedule();
                });
            });
        }

        // Step 3: commitments (same pattern as subjects)
        let selectedActivity = 'Work / Part-time Job';
        let commitDays = [];
        let commitments = [];

        function fmtTime(v) {
            if (!v) return '';
            const parts = v.split(':');
            let h = Number(parts[0]);
            const m = parts[1];
            const ap = h >= 12 ? 'PM' : 'AM';
            let hh = h % 12;
            if (hh === 0) hh = 12;
            return hh + ':' + m + ' ' + ap;
        }

        const activityGrid = document.getElementById('activityGrid');
        if (activityGrid) {
            const activeCls = 'flex items-center gap-3 min-h-[82px] border-2 border-[#ffbd2e] rounded-[15px] p-3 text-left cursor-pointer bg-[#fffdf6] hover:-translate-y-0.5 transition-all';
            const inactiveCls = 'flex items-center gap-3 min-h-[82px] border-2 border-[#c8e1ff] rounded-[15px] p-3 text-left cursor-pointer bg-white hover:border-[#438fe8] hover:bg-[#f8fcff] hover:-translate-y-0.5 transition-all';
            const actBtns = activityGrid.querySelectorAll('[data-activity]');
            function setActiveActivity(activeBtn) {
                actBtns.forEach(b => {
                    b.className = (b === activeBtn ? activeCls : inactiveCls);
                });
            }
            function toggleCommitForm(disabled) {
                ['actName', 'commitStart', 'commitEnd', 'saveCommitBtn'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.disabled = disabled;
                        el.classList.toggle('opacity-50', disabled);
                        el.classList.toggle('cursor-not-allowed', disabled);
                    }
                });
                document.querySelectorAll('#commitDaysWrap button').forEach(b => {
                    b.disabled = disabled;
                    b.classList.toggle('opacity-50', disabled);
                    b.classList.toggle('cursor-not-allowed', disabled);
                });
            }
            actBtns.forEach(btn => {
                if (btn.getAttribute('data-activity') === selectedActivity) btn.className = activeCls;
                btn.addEventListener('click', () => {
                    selectedActivity = btn.getAttribute('data-activity');
                    setActiveActivity(btn);
                    toggleCommitForm(selectedActivity === 'None');
                    document.getElementById('commitTitle').textContent = selectedActivity;
                    const nameInput = document.getElementById('actName');
                    nameInput.value = '';
                    nameInput.placeholder = 'e.g. ' + selectedActivity;
                });
            });
            document.getElementById('addOtherActivity').addEventListener('click', () => {
                selectedActivity = 'Other Activity';
                setActiveActivity(null);
                toggleCommitForm(false);
                document.getElementById('commitTitle').textContent = selectedActivity;
                document.getElementById('actName').focus();
            });
        }

        document.querySelectorAll('#commitDaysWrap button').forEach(btn => {
            btn.addEventListener('click', () => {
                const d = btn.dataset.day;
                if (commitDays.includes(d)) {
                    commitDays = commitDays.filter(x => x !== d);
                    btn.className = 'min-w-[45px] h-[34px] px-2 rounded-full text-xs font-bold cursor-pointer bg-[#e7f1fc] text-[#4775a9]';
                } else {
                    commitDays.push(d);
                    btn.className = 'min-w-[45px] h-[34px] px-2 rounded-full text-xs font-bold cursor-pointer bg-[#4b9af5] text-white';
                }
            });
        });

        const saveCommitBtn = document.getElementById('saveCommitBtn');
        if (saveCommitBtn) {
            saveCommitBtn.addEventListener('click', () => {
                const actName = document.getElementById('actName').value.trim() || selectedActivity;
                const start = document.getElementById('commitStart').value;
                const end = document.getElementById('commitEnd').value;
                if (!commitDays.length || !start || !end) { showToast('Pick days + start/end time'); return; }
                const comConflict = findConflict(commitDays, start, end, [[subjects, 'subject'], [commitments, 'commitment']]);
                if (comConflict) { showToast(comConflict); return; }
                commitments.push({ id: Date.now(), name: actName, days: commitDays.join(', '), time: fmtTime(start) + ' – ' + fmtTime(end), icon: '⏰', work: selectedActivity.indexOf('Work') === 0 });
                document.getElementById('actName').value = '';
                document.getElementById('commitStart').value = '17:00';
                document.getElementById('commitEnd').value = '22:00';
                commitDays = [];
                document.querySelectorAll('#commitDaysWrap button').forEach(b => {
                    b.className = 'min-w-[45px] h-[34px] px-2 rounded-full text-xs font-bold cursor-pointer bg-[#e7f1fc] text-[#4775a9]';
                });
                renderCommits();
            });
        }

        function renderCommits() {
            const list = document.getElementById('commitList');
            const count = document.getElementById('commitCount');
            if (!list || !count) return;
            count.textContent = commitments.length + ' added';
            list.innerHTML = commitments.map(c => `
                <div class="flex items-center gap-3 bg-white border border-[#e0edfb] rounded-xl p-2.5 mt-2">
                    <div class="w-[37px] h-[37px] rounded-[10px] ${c.work ? 'bg-[#fff2c9]' : 'bg-[#edf6ff]'} flex items-center justify-center flex-none">${c.icon}</div>
                    <div class="flex-1 flex flex-col leading-tight">
                        <strong class="text-[#123c7a] text-[14px]">${c.name}</strong>
                        <span class="text-[#6684b3] text-[11px] mt-0.5">${c.days}</span>
                    </div>
                    <div class="text-[#123c7a] text-[12px] font-bold">${c.time}</div>
                    <button data-id="${c.id}" class="border-none bg-transparent cursor-pointer text-[#7d99be] del-commit"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></button>
                </div>`).join('');
            list.querySelectorAll('.del-commit').forEach(b => {
                b.addEventListener('click', () => {
                    commitments = commitments.filter(x => String(x.id) !== b.dataset.id);
                    renderCommits();
                });
            });
        }

        renderCommits();

        // Step 4: priorities (multi) + study/task time (single)
        let priorities = [];
        let studyTime = '';
        let taskTime = '';
        const prioActive = 'flex items-center gap-3 min-h-[60px] border-2 border-[#ffbd2e] rounded-[15px] p-3 text-left cursor-pointer bg-[#fffdf6] hover:-translate-y-0.5 transition-all';
        const prioInactive = 'flex items-center gap-3 min-h-[60px] border-2 border-[#c8e1ff] rounded-[15px] p-3 text-left cursor-pointer bg-white hover:border-[#438fe8] hover:-translate-y-0.5 transition-all';
        const pillActive = 'min-h-[40px] px-4 rounded-full text-sm font-bold cursor-pointer bg-[#4b9af5] text-white';
        const pillInactive = 'min-h-[40px] px-4 rounded-full text-sm font-bold cursor-pointer bg-[#e7f1fc] text-[#4775a9]';

        document.querySelectorAll('#prioGrid button').forEach(btn => {
            btn.addEventListener('click', () => {
                const p = btn.dataset.prio;
                if (priorities.includes(p)) {
                    priorities = priorities.filter(x => x !== p);
                    btn.className = prioInactive;
                } else {
                    priorities.push(p);
                    btn.className = prioActive;
                }
            });
        });

        function singleSelect(wrapId, setter) {
            const wrap = document.getElementById(wrapId);
            if (!wrap) return;
            wrap.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    setter(btn.dataset.val);
                    wrap.querySelectorAll('button').forEach(b => { b.className = pillInactive; });
                    btn.className = pillActive;
                });
            });
        }
        singleSelect('studyTimeWrap', v => { studyTime = v; });
        singleSelect('taskTimeWrap', v => { taskTime = v; });

        renderSteps();
    }
});

// ============ BACKEND (XAMPP) ============
const API_BASE = 'api/';

// Track last focused input para dito lumabas ang error message
let lastInput = null;
document.addEventListener('focusin', function(e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) lastInput = e.target;
});
document.addEventListener('input', function(e) {
    document.querySelectorAll('.eb-inline-err').forEach(function(el) { el.textContent = ''; if (el._target) el._target.style.borderColor = ''; });
});
function inlineError(msg) {
    const li = lastInput || (document.activeElement && document.activeElement.tagName === 'INPUT' ? document.activeElement : null);
    if (!li) return;
    lastInput = li;
    // kunin ang outer wrapper (may border) kung meron, para doon lumabas ang error
    let target = li;
    const p = li.parentElement;
    if (p && (String(p.className).indexOf('border') >= 0)) target = p;

    let el = document.querySelector('.eb-inline-err');
    if (!el) {
        el = document.createElement('div');
        el.className = 'eb-inline-err';
        el.style.cssText = 'color:#e74c3c;font-size:12px;font-weight:700;margin-top:6px;';
    }
    target.insertAdjacentElement('afterend', el);
    target.style.borderColor = '#e74c3c';
    el._target = target;
    el.textContent = msg;
    clearTimeout(el._t);
    el._t = setTimeout(function() { el.textContent = ''; if (el._target) el._target.style.borderColor = ''; }, 3500);
}

// Inline toast (kapalit ng alert dialog)
function showToast(text, isError) {
    if (isError !== false && lastInput) {
        inlineError(text);
        return;
    }
    let t = document.getElementById('eb-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'eb-toast';
        t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;max-width:min(480px,90vw);padding:12px 20px;border-radius:12px;font-family:Nunito,sans-serif;font-size:15px;font-weight:700;color:#fff;box-shadow:0 8px 22px rgba(0,0,0,.18);transition:opacity .3s;';
        document.body.appendChild(t);
    }
    t.style.background = isError === false ? '#2ECC71' : '#e74c3c';
    t.textContent = text;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(function() { t.style.opacity = '0'; }, 3200);
}

function getUser() {
    try { return JSON.parse(localStorage.getItem('eb_user') || 'null'); }
    catch (e) { return null; }
}

async function apiPost(path, data) {
    const res = await fetch(API_BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

function apiError() {
    showToast('Hindi makakonekta sa server. Buksan ang project sa XAMPP: http://localhost/estudyante-balanse/');
}

// Register mula sa create-account.html (name galing sa get-started)
async function doRegister() {
    const email = (document.getElementById('emailInput') || {}).value || '';
    const password = (document.getElementById('passwordInput') || {}).value || '';
    const name = localStorage.getItem('userName') || email.split('@')[0] || 'Student';
    if (!email.trim() || !password) { showToast('Ilagay ang email at password.'); return; }
    let data;
    try { data = await apiPost('register.php', { name: name.trim(), email: email.trim(), password: password }); }
    catch (e) { apiError(); return; }
    if (!data.success) { showToast(data.error || 'Registration failed.'); return; }
    localStorage.setItem('eb_user', JSON.stringify(data.user));
    const params = new URLSearchParams(window.location.search);
    if (params.get('finish') === '1') {
        await syncSetupToAPI();
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'verify-email.html';
    }
}

// Login mula sa login.html
async function doLogin() {
    const email = (document.getElementById('loginEmail') || {}).value || '';
    const password = (document.getElementById('loginPassword') || {}).value || '';
    if (!email.trim() || !password) { showToast('Ilagay ang email at password.'); return; }
    let data;
    try { data = await apiPost('login.php', { email: email.trim(), password: password }); }
    catch (e) { apiError(); return; }
    if (!data.success) { showToast(data.error || 'Login failed.'); return; }
    localStorage.setItem('eb_user', JSON.stringify(data.user));
    localStorage.setItem('userName', data.user.name);
    window.location.href = (data.setupDone === false) ? 'setup.html' : 'dashboard.html';
}

function logout() {
    localStorage.removeItem('eb_user');
    localStorage.removeItem('eb_setup');
    localStorage.removeItem('eb_today_schedules');
    localStorage.removeItem('userName');
    localStorage.removeItem('eb_deleted');
    localStorage.removeItem('eb_edits');
    window.location.href = 'index.html';
}

// "HH:MM" o "h:MM AM/PM" -> "HH:MM" (24h)
function to24hs(t) {
    const m = String(t || '').match(/(\d{1,2}):(\d{2})\s*([AP]M)?/i);
    if (!m) return '08:00';
    let h = Number(m[1]);
    if (m[3]) {
        const ap = m[3].toUpperCase();
        if (ap === 'PM' && h < 12) h += 12;
        if (ap === 'AM' && h === 12) h = 0;
    }
    return String(h).padStart(2, '0') + ':' + m[2];
}

function splitRange24(t) {
    const p = String(t || '').split(/–|-/);
    return [to24hs(p[0] || '08:00'), to24hs(p[1] || '09:00')];
}

// Days string/array -> ["Mon", ...]
function normDays(d) {
    if (!d) return [];
    if (Array.isArray(d)) return d;
    return String(d).split(',').map(function(x) { return x.trim().substring(0, 3); }).filter(Boolean);
}

function toMin(t) {
    const p = to24hs(t).split(':');
    return Number(p[0]) * 60 + Number(p[1]);
}

// [startMin, endMin] mula sa item (time "A - B" o start/end fields)
function itemRange(it) {
    if (it.time) {
        const p = String(it.time).split(/–|-/);
        return [toMin(p[0]), toMin(p[1])];
    }
    return [toMin(it.start), toMin(it.end)];
}

// '' = walang conflict; may mensahe kung may overlap (excludeId para sa edit)
function findConflict(daysArr, start, end, lists, excludeId) {
    const s = toMin(start), e = toMin(end);
    if (!(e > s)) return 'End time must be later than start time.';
    for (let i = 0; i < lists.length; i++) {
        const arr = lists[i][0], label = lists[i][1];
        for (let j = 0; j < arr.length; j++) {
            const it = arr[j];
            if (excludeId && String(it.id) === String(excludeId)) continue;
            const r = itemRange(it);
            const sameDay = normDays(it.days).some(function(d) { return daysArr.indexOf(d) >= 0; });
            if (sameDay && s < r[1] && r[0] < e) {
                return 'Conflict with "' + it.name + '" (' + label + ').';
            }
        }
    }
    return '';
}

// I-save ang eb_setup (localStorage) sa DB gamit ang naka-login na user
async function syncSetupToAPI() {
    const user = getUser();
    if (!user) return false;
    let setup = null;
    try { setup = JSON.parse(localStorage.getItem('eb_setup') || 'null'); } catch (e) { setup = null; }
    if (!setup) return true;
    const subjects = (setup.subjects || []).map(function(s) {
        const r = splitRange24(s.time);
        return { name: s.name, start: r[0], end: r[1], days: s.days || '', color: 'blue' };
    });
    const commitments = (setup.commitments || []).map(function(c) {
        const r = splitRange24(c.time);
        return { name: c.name, start: r[0], end: r[1], days: c.days || '', icon: '💼' };
    });
    let data;
    try {
        data = await apiPost('schedules.php?action=save', {
            user_id: user.id,
            subjects: subjects,
            commitments: commitments,
            preferences: {
                level: setup.level || '',
                job: setup.job || '',
                priorities: (setup.priorities || []).join(', '),
                studyTime: setup.studyTime || '',
                taskTime: setup.taskTime || ''
            }
        });
    } catch (e) { apiError(); return false; }
    if (!data.success) { showToast(data.error || 'Save failed.'); return false; }
    return true;
}

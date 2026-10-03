// Shared helpers
function saveName(e) {
    const input = document.getElementById('nameInput');
    if (input && input.value.trim()) {
        localStorage.setItem('userName', input.value.trim());
    }
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
        document.getElementById('finishBtn').addEventListener('click', () => {
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
            } catch (e) {}
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
            if (!subName || !start || !end) { alert('Fill subject + time'); return; }
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
        let commitments = [
            { id: 1, name: 'Part-time Job', days: 'Mon, Tue, Thu, Fri', time: '5:00 PM – 10:00 PM', icon: '💼', work: true },
            { id: 2, name: 'Household Chores', days: 'Saturday', time: '8:00 AM – 10:00 AM', icon: '🏠', work: false }
        ];

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
                if (!commitDays.length || !start || !end) { alert('Pick days + start/end time'); return; }
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

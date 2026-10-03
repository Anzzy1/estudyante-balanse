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
            ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>'
            : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Init password toggle icon
    const toggleBtn = document.getElementById('toggleBtn');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
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
                    <span class="w-10 h-10 rounded-full flex items-center justify-center font-black ${s === step ? 'bg-[#ffbd28] text-white' : 'bg-[#e9f1fb] text-[#254d81]'}">${s}</span>
                    ${s < 5 ? "<span class='w-8 h-1 bg-[#e3ecf7] rounded'></span>" : ""}
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
        }

        document.getElementById('nextBtn').addEventListener('click', () => { if (step < 5) { step++; renderSteps(); } });
        document.getElementById('backBtn').addEventListener('click', () => { if (step > 1) { step--; renderSteps(); } });

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
            list.innerHTML = subjects.map(s => `
                <div class="flex rounded-2xl border-[1.5px] border-[#cfe4ff] mb-3 bg-white">
                    <div class="w-2 self-stretch rounded-l-[10px] ${s.color}"></div>
                    <div class="flex-1 p-3">
                        <strong class="block text-[13px] text-[#123f82]">${s.time}</strong>
                        <h3 class="text-[13px] font-bold text-[#164b91]">${s.name}</h3>
                        <span class="inline-block mt-1 px-2 py-1 rounded-full bg-[#e3f0ff] text-[#3678b9] text-[10px] font-bold">${s.days}</span>
                    </div>
                    <button data-id="${s.id}" class="m-3 cursor-pointer text-[#3678b9] del-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
                </div>`).join('');
            list.querySelectorAll('.del-btn').forEach(b => {
                b.addEventListener('click', () => {
                    subjects = subjects.filter(x => String(x.id) !== b.dataset.id);
                    renderSchedule();
                });
            });
        }

        renderSteps();
    }
});

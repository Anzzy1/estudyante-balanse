import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Building2, BookOpen, Trash2, CalendarDays, Sparkles } from 'lucide-react'

function Setup() {
  const [step, setStep] = useState(1)
  const [subjects, setSubjects] = useState([
    
  ])
  const [subName, setSubName] = useState("")
  const [start, setStart] = useState("07:00")
  const [end, setEnd] = useState("09:00")
  const [days, setDays] = useState([])

  const colors = ["bg-[#3d9bf5]", "bg-[#20b978]", "bg-[#ffbd19]", "bg-[#9b5de5]"]
  const random = colors[Math.floor(Math.random() * colors.length)]

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url(/images/eb_start_bg.jpeg)" }}>
      <div className="p-10 pt-5">
        <img src="/images/eb_login_logo.png" alt="logo" className='h-25 w-auto' />
      </div>

      <div className='flex flex-col md:flex-row items-start justify-start pr-6 pb-10'>
        <div className='flex-none w-fit -ml-10'>
          <img src="/images/eb_setup-1.png" alt="comic" className='w-full max-w-2xl' />
        </div>

        <div className='flex-1 flex justify-center -mt-38'>
          <div className='w-full p-5'>
            <div  className='flex items-center'>
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className='flex items-center' >
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${s === step ? "bg-[#ffbd28] text-white" : "bg-[#e9f1fb] text-[#254d81]"}`} >{s}</span>
                  {s < 5 && <span className='w-8 h-1 bg-[#e3ecf7] rounded'></span>}
                </div>
              ))}
            </div>
            <p className='text-[#6684b3] font-normal mb-5'>Step {step} of 5</p>

            {step === 1 && (
              <div key="s1" className='w-full max-w-xl'>
                <img src="/images/eb_setup-1-header.png" alt="header" className='w-full max-w-lg -ml-12' />
                <p className="text-[#6684b3] text-lg mt-3 mb-5">Tell us few details so we can personalize your <br /> time management plan</p>

                <div className='border-2 border-[#cfe5fc] rounded-2xl p-5 mb-3 bg-white/80 flex items-start gap-4'>
                  <span className="text-[#4372ad] flex-none mt-1">
                    <GraduationCap size={40} />
                  </span>
                  <div className="flex-1">
                    <label className='block text-[18px] font-black text-[#0b3475]' style={{ fontFamily: "'Nunito', sans-serif" }}>What is your level of education?</label>
                    <p className="text-[#6684b3] text-md">Select your current level.</p>
                    <div className="relative mt-2">
                      <select style={{ fontFamily: "'Nunito', sans-serif" }} className="w-full h-[52px] mt-2 border-2 border-[#c9e1fb] rounded-xl pl-4 pr-12 outline-none bg-white text-[16px] font-semibold text-[#254d81] appearance-none cursor-pointer">
                        <option>Choose your level</option>
                        <option>Junior High School</option>
                        <option>Senior High School</option>
                        <option>College</option>
                      </select>
                      <span className="absolute right-5 top-[58%] -translate-y-1/2 text-[#4372ad] pointer-events-none">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-[#cfe5fc] rounded-2xl p-5 mb-3 bg-white/80 flex items-start gap-4">
                <span className="text-[#4372ad] flex-none mt-1">
                    <Building2 size={40} />
                  </span>
                  <div className="flex-1">
                    <label className='block text-[18px] font-black text-[#0b3475]' style={{ fontFamily: "'Nunito', sans-serif" }}>Do you have a job?</label>
                    <p className="text-[#6684b3] text-md">Let us know if you're currently working.</p>
                    <div className="relative mt-2">
                      <select style={{ fontFamily: "'Nunito', sans-serif" }} className="w-full h-[52px] mt-2 border-2 border-[#c9e1fb] rounded-xl pl-4 pr-12 outline-none bg-white text-[16px] font-semibold text-[#254d81] appearance-none cursor-pointer">
                        <option>Select an option</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                      <span className="absolute right-5 top-[58%] -translate-y-1/2 text-[#4372ad] pointer-events-none">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {step === 2 && (
              <div key="s2">
                <img src="/images/eb_step-2_header.png" alt="header" className='w-full max-w-md -ml-10' />
                <p className='font-bold text-[#6684b3] mt-2 mb-5'
                style={{ fontFamily: "'Nunito', sans-serif" }}>Tell us what subjects you have and when they happen, <br /> You can add multiple subjects and set the days repeat.</p>

                <div className='grid grid-cols-[1.45fr_.85fr] gap-[18px] items-stretch w-full max-w-[1000px]'>
                  <div className='bg-white border-2 border-[#cfe4ff] rounded-[22px] p-6'>
                    <div className='flex items-center gap-3 mb-5 '>
                      <span className="text-[27px] text-[#144487] "><BookOpen size={28} /></span>
                      <h2 className='text-[21px] font-black text-[#123c7a]' style={{ fontFamily: "'Nunito', sans-serif" }}>Add Subject</h2>
                    </div>

                    <div className='grid grid-cols-2 gap-x-[22px] gap-y-4'>
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm font-bold text-[#144487]' style={{ fontFamily: "'Nunito', sans-serif" }}>Subject Name</label>
                        <input value={subName} onChange={(e) => setSubName(e.target.value)} placeholder='e.g. Mathematics'
                        className='h-11 px-3 font-semibold border-2 border-[#c9e2ff] rounded-xl outline-none text-sm placeholder:text-[#6684b3]' style={{ fontFamily: "'Nunito', sans-serif" }} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm font-bold text-[#144487]' style={{ fontFamily: "'Nunito', sans-serif" }}>Start Time</label>
                        <input type="time" value={start} onChange={(e) => setStart(e.target.value)}
                        className='h-11 px-3 font-semibold border-2 text-[#144487] border-[#c9e2ff] rounded-xl outline-none text-sm' style={{ fontFamily: "'Nunito', sans-serif" }} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm font-bold text-[#144487]' style={{ fontFamily: "'Nunito', sans-serif" }}>End Time</label>
                        <input type="time" value={end} onChange={(e) => setEnd(e.target.value)}
                        className='h-11 px-3 font-semibold border-2 text-[#144487] border-[#c9e2ff] rounded-xl outline-none text-sm' style={{ fontFamily: "'Nunito', sans-serif" }} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm font-bold text-[#144487]' style={{ fontFamily: "'Nunito', sans-serif" }}>Repeat Days</label>
                        <div className='flex flex-wrap gap-[7px]'>
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                          <button key={d} type="button" onClick={() => setDays(days.includes(d) ?  days.filter((x) => x !== d) : [...days, d])} 
                          className={`min-w-[45px] h-[34px] px-2 rounded-full text-xs font-bold cursor-pointer ${days.includes(d) ? "bg-[#4b9af5] text-white" : "bg-[#e7f1fc] text-[#4775a9]"}`}>{d}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                      
                    <button onClick={() => {
                      if (!subName || !start || !end) return alert("Fill subject + time")
                      setSubjects([...subjects, { id: Date.now(), name: subName, time:  `${start} - ${end}`, days: days.join(", "), color: random}])
                      setSubName(""); setStart("07:00"); setEnd("09:00");
                    }} className='w-[280px] h-[46px] mt-5 rounded-3xl bg-[#FFD75A] hover:bg-[#FFCA3A] text-[#17243a] font-extrabold cursor-pointer' style={{ fontFamily: "'Nunito', sans-serif" }}>
                      ＋ Add Subject
                    </button>
                  </div>

                  <div className='bg-white/95 border-2 border-[#cfe4ff] rounded-[22px] p-5'>
                  <div className='flex gap-2'>
                    <h2 className='text-[18px] font-black text-[#123c7a] mb-5' style={{ fontFamily: "'Nunito', sans-serif" }}>Your Schedule Preview</h2>
                    <span className='text-[#123c7a]'><CalendarDays size={28} /></span>
                  </div>
                    {subjects.map((s) => (
                      <div key={s.id} className='flex rounded-2xl border-[1.5px] border-[#cfe4ff] mb-3 bg-white'>
                        <div className={`w-2 self-stretch rounded-l-[10px] ${s.color}`}></div>
                        <div className="flex-1 p-3">
                          <strong className="block text-[13px] text-[#123f82]">{s.time}</strong>
                          <h3 className="text-[13px] font-bold text-[#164b91]">{s.name}</h3>
                          <span className="inline-block mt-1 px-2 py-1 rounded-full bg-[#e3f0ff] text-[#3678b9] text-[10px] font-bold">{s.days}</span>
                        </div>
                        <button onClick={() => setSubjects(subjects.filter((x) => x.id !== s.id))}
                        className="m-3 cursor-pointer text-[#3678b9] "><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            <div className={`flex mt-6 ${step > 1 ? "justify-between" : "justify-end"}`}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className='w-full max-w-2xs text-[20px] flex items-center font-extrabold text-[#6f8fbc] gap-2 cursor-pointer'
                style={{ fontFamily: "'Nunito', sans-serif" }}> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></svg>
                  Back</button>
              )}
              {step < 5 ? (
                <button onClick={() => setStep(step + 1)} className="w-full max-w-3xs h-[60px] bg-[#FFD75A] text-[#17243a] font-extrabold text-[18px] rounded-full flex items-center justify-center gap-2 mr-10 hover:bg-[#FFCA3A] cursor-pointer"
                style={{ fontFamily: "'Nunito', sans-serif" }}>Next 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg> 
                </button>
              ) : (
                <Link to="/" className="w-full max-w-3xs h-[60px] bg-[#FFD75A] text-[#17243a] font-extrabold text-[18px] rounded-full flex items-center justify-center gap-2 hover:bg-[#FFCA3A] cursor-pointer"
                style={{ fontFamily: "'Nunito', sans-serif" }}>Finish 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Setup
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Briefcase, Building2 } from 'lucide-react'

function Setup() {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url(/images/eb_start_bg.jpeg)" }}>
      <div className="p-10 pt-5">
        <img src="/images/eb_login_logo.png" alt="logo" className='h-25 w-auto' />
      </div>

      <div className='flex flex-col md:flex-row items-start justify-start gap-4 pl-6 pr-6 pb-10'>
        <div className='flex-none w-fit'>
          <img src="/images/eb_setup-1.png" alt="comic" className='w-full max-w-2xl' />
        </div>

        <div className='flex-1 flex justify-center md:-mt-35'>
          <div className='w-full max-w-2xl p-5'>
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
              <div key="s1">
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

            <div className={`flex mt-6 ${step > 1 ? "justify-between" : "justify-end"}`}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className='font-extrabold text-[#6f8fbc] cursor-pointer'> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></svg>
                  Back</button>
              )}
              {step > 5 ? (
                <button onClick={() => setStep(step + 1)} className="w-full max-w-2xs h-[60px] bg-[#FFD75A] text-[#17243a] font-extrabold text-[18px] rounded-full flex items-center justify-center gap-2 hover:bg-[#FFCA3A] cursor-pointer"
                style={{ fontFamily: "'Nunito', sans-serif" }}>Next 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg> 
                </button>
              ) : (
                <Link to="/" className="w-full max-w-2xs h-[60px] bg-[#FFD75A] text-[#17243a] font-extrabold text-[18px] rounded-full flex items-center justify-center gap-2 hover:bg-[#FFCA3A] cursor-pointer"
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
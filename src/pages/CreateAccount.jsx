import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function CreateAccount() {
  const [show, setShow] = useState(false)

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/eb_start_bg.jpeg)"}}
    >
      <div className="p-10 pt-5">
        <img src="/images/eb_login_logo.png" alt="logo" className="h-25 w-auto" />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-start gap-3 pl-20 pr-6 pb-10">
        <div>
          <img src="/images/eb_create_comic.png" alt="comic" className="w-full max-w-2xl" />
        </div>

        <div className="flex-1 flex justify-center md:-mt-24">
          <div className="w-full max-w-lg p-5 flex flex-col items-start">
            <img src="/images/eb_welcome_header.png" alt="Welcome" className="w-full max-w-lg object-contain mb-4 -ml-20" />
            <h2 className="text-4xl font-black mt-2 text-[#002C77]" style={{ fontFamily: "'Nunito', sans-serif"}}>Create your account</h2>
            <p className="text-lg font-semibold text-[#71819A] mt-2 mb-6" style={{ fontFamily: "'Nunito', sans-serif"}}>Let's get you set up so you can start your <br /> journey toward a brighter future.</p>
            
            <div className="w-full h-[58px] flex items-center bg-white border-2 border-[#D4DFEC] rounded-[18px] px-5 mb-4 focus-within:border-[#FDD050]">
              <span className="mr-3 text-[#7795bd] flex items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 7 10 6L22 7" /></svg></span>
              <input placeholder="Email address" 
              className="flex-1 outline-none bg-transparent text-[18px] font-semibold text-[#193257] placeholder:font-['Nunito']"/>
            </div>

            <div className="w-full h-[58px] flex items-center bg-white border-2 border-[#D4DFEC] rounded-[18px] px-5 mb-4 focus-within:border-[#FDD050]">
              <span className="mr-3 text-[#7795bd] flex items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="3" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></span>
              <input 
              type={show ? "text" : "password"}
              placeholder="Create password" 
              className="flex-1 outline-none bg-transparent text-[18px] font-semibold text-[#193257] placeholder:font-['Nunito']"/>
              <button type="button" onClick={() => setShow(!show)} className="ml-2 text-[#7d99be] cursor-pointer">
                {show ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            <Link to="" 
            className="w-full h-[50px] bg-[#FFD75A] text-[#17243a] font-extrabold text-[18px] rounded-[18px] flex items-center justify-center gap-2 hover:bg-[#FFCA3A] cursor-pointer"
            style={{ fontFamily: "'Nunito Sans', 'Nunito', sans-serif"}}
            >Create Account
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg> 
            </Link>

            <div style={{ fontFamily: "'Nunito Sans', 'Nunito', sans-serif" }}
            className="w-full flex justify-center items-center gap-2 mt-[10px] text-[18px] font-medium text-[#71819A]">
              <span>Already have an account?</span>
              <Link to="" href="#" className="text-[#3186D8] font-semibold underline decoration-[#3186D8] underline-offset-[2px] cursor-pointer transition-all hover:text-[#193257] hover:decoration-[#193257]">Login</ Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateAccount
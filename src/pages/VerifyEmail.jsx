import { useState } from 'react'
import { Link } from 'react-router-dom'

function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""])

  const handleChange = (val, i) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...code]
    next[i] = val
    setCode(next)
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus()
  }

  return (
    <div 
    className="min-h-screen bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: "url(/images/eb_start_bg.jpeg)"}}>
      
      <div className="p-10 pt-5">
        <img src="/images/eb_login_logo.png" alt="logo" className="h-25 w-auto" />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-start gap-4 pl-6 pr-6 pb-10">
        <div className="flex-none w-fit">
          <img src="/images/eb_comic_otp.png" alt="comic" className="w-full max-w-2xl" />
        </div>

        <div className="flex-1 flex justify-center md:-mt-20" >
          <div className="w-full max-w-lg p-5 flex flex-col items-start -ml-30">
            <img src="/images/eb_otp_header.png" alt="Verify Email" className="w-full max-w-md -ml-10" />
            <p className="text-xl font-semibold text-[#71819A] mt-5" style={{ fontFamily: "'Nunito', sans-serif" }}
            >We sent a 6-digit verification code <br /> to your email address.</p>

            <div className="flex gap-2 mb-1 px-10 py-10">
              {code.map((c, i) => (
                <input 
                key={i}
                id={`otp-${i}`}
                value={c}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, i)} 
                className="w-[52px] h-[68px] text-center text-2xl text-[#17243a] font-black border-[3px] border-[#c4ddf8] rounded-2xl outline-none focus:border-[#ffbf27]" />
              ))}
            </div>

            <Link to="" className="w-full h-[50px] bg-[#FFD75A] text-[#17243a] font-extrabold text-[18px] rounded-[18px] flex items-center justify-center gap-2 hover:bg-[#FFCA3A] cursor-pointer"
            style={{ fontFamily: "'Nunito', sans-serif" }}>Verify Email 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg> 
            </Link>
            <div style={{ fontFamily: "'Nunito Sans', 'Nunito', sans-serif" }}
            className="w-full flex justify-center items-center gap-2 mt-[10px] text-[18px] font-medium text-[#71819A]">
              <span>Didn't receive code? </span>
              <Link to="" href="#" className="text-[#3186D8] font-semibold underline decoration-[#3186D8] underline-offset-[2px] cursor-pointer transition-all hover:text-[#193257] hover:decoration-[#193257]">Resend code</ Link>
            </div>

            <Link to="/create-account"
            className="w-full flex items-center justify-center gap-2 text-center mt-8 text-[#3186D8] font-semibold underline decoration-[#3186D8] underline-offset-[2px] cursor-pointer transition-all hover:text-[#193257] hover:decoration-[#193257]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></svg>
              Change Email</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default VerifyEmail
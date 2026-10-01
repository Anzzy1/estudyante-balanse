import { Link, useLocation } from 'react-router-dom'

function Welcome() {

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url(/images/eb_start_bg.jpeg)"}}>
      
      <div className="p-10 pt-5">
        <img src="/images/eb_login_logo.png" alt="logo" className="h-25 w-auto" />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-start gap-2 pl-17 pr-6 pb-10">
        <div className="flex-none w-fit">
          <img src="/images/eb_welcome_comic.png" alt="comic" className="w-full max-w-xl" />
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-2xl p-5 flex flex-col items-start">
            <h1 style={{ fontFamily: "'Baloo 2', sans-serif" }} className="font-black text-[#002C77] flex items-center -ml-8 gap-2 -rotate-2">
              <span className="text-7xl font-black">Welcome, Anzar!</span>
              <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#FFC83D] rounded-full flex-none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
            </h1>
            <h2 className="text-4xl font-bold mt-6 text-[#002C77]" style={{ fontFamily: "'Nunito', sans-serif"}}>Your account is ready.</h2>
            <p className="text-[#6682AD] text-xl mt-4 mb-8">You're all set! Estudyante Balance includes both <br /> allowance tracking and time management to help <br /> you manage your student life.</p>
    
            <Link to="/welcome" className="w-full max-w-md h-[60px] bg-[#FFD75A] text-[#17243a] font-extrabold text-[18px] rounded-full flex items-center justify-center gap-2 hover:bg-[#FFCA3A] cursor-pointer"
            style={{ fontFamily: "'Nunito', sans-serif" }}>Set Up My Account 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg> 
            </Link>

            <p className="text-[#6682AD] text-lg mt-5 mb-6">Let's personalize your dashboard next.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
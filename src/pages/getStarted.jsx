import { Link } from 'react-router-dom'

function GetStarted() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/eb_start_bg.jpeg)"}}
      >

      <div className="p-10 pt-5">
        <img src="/images/eb_login_logo.png" alt="logo" className="h-25 w-auto" />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-start gap-10 pl-20 pr-6 pb-10">
        <div className="flex-none w-fit">
          <img 
          src="/images/eb_comic_start.png" alt="comic"
          className="w-full max-w-xl rounded-3xl"
          />
        </div>

        <div className="flex-1 flex justify-start mb-2 -mt-10">
          <div className="w-full max-w-lg p-5 flex flex-col items-start">
            <img 
            src="/images/eb_start_header.jpeg" 
            alt="let's get started"
            className="w-full h-42 object-contain mb-2"
            />
            <div className="ml-10 w-full mt-10">
              <h2 className="text-3xl text-left font-black font-['Nunito'] text-[#002C77]">What should we call you?</h2>

              <div className="w-full h-[55px] flex items-center bg-[#FEFEFE] border-2 border-[#D4DFEC] rounded-[18px] box-border transition-all focus-within:border-[#FDD050] focus-within:shadow-[0_0_0_4px_rgba(253,208,80,0.12)] mt-5 mb-4">
                <span className="ml-[25px] mr-[15px] text-[25px] text-[#6E819D]"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></span>
                <input 
                type="text"
                placeholder="Enter your name"
                style={{ fontFamily: "'Nunito Sans', 'Nunito', sans-serif"}}
                className="flex-1 h-full pr-[25px] border-none outline-none bg-transparent text-[20px] font-semibold text-[#193257] placeholder:text-[#71819A]"
                />
              </div>
              <Link to="/create-account"
                style={{ fontFamily: "'Nunito Sans', 'Nunito', sans-serif"}}
                className="w-full h-[50px] bg-[#FFD75A] text-[#17243a] font-extrabold text-[18px] rounded-[18px] flex items-center justify-center gap-2 hover:bg-[#FFCA3A] cursor-pointer">
                Continue
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
              </Link>

              <div 
                style={{ fontFamily: "'Nunito Sans', 'Nunito', sans-serif" }}
                className="w-full flex justify-center items-center gap-2 mt-[10px] text-[18px] font-medium text-[#71819A]"
              >
                <span>Already have an account?</span>
                <Link to="" href="#" className="text-[#3186D8] font-semibold underline decoration-[#3186D8] underline-offset-[3px] cursor-pointer transition-all hover:text-[#193257] hover:decoration-[#193257]">Login</ Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
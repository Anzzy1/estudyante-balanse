import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import '../styles.css'
import GetStarted from './pages/getStarted'
import CreateAccount from './pages/CreateAccount'
import VerifyEmail from './pages/VerifyEmail'

function Home() {
  return (
    <>
      <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/eb_home_bg.jpeg)" }}>
        <nav>
          <img src="/images/eb_home_logo.jpeg" alt="Estudyante Balanse" className="logo" />
          <div className="nav-buttons">
            <Link to="#" className="btn-login">Login</Link>
            <Link to="/get-started" className="btn-start">Get Started</Link>
          </div>
        </nav>

        <section className="hero">
          <div>
            <h1>Balance Your<br /><span>Student Life.</span></h1>
            <p>Plan your time, manage your allowance,<br /> and make better decisions with your <br />personal AI-powered student companion.</p>
            <div className="hero-btns">
              <Link to="/get-started" className="hero-btn">Get Started
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
              </Link>
              <Link to="/" className="hero-explore">Explore Features
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
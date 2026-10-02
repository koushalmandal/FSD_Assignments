import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import FindJobs from './pages/FindJobs.jsx'
import FindTalent from './pages/FindTalent.jsx'
import UploadJob from './pages/UploadJob.jsx'
import About from './pages/About.jsx'
import JobDetails from './pages/JobDetails.jsx'
import TalentProfile from './pages/TalentProfile.jsx'
import Company from './pages/Company.jsx'
import PostedJobs from './pages/PostedJobs.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#292929]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/post-job" element={<UploadJob />} />
          <Route path="/about" element={<About />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job-details" element={<JobDetails />} />
          <Route path="/talent-profile" element={<TalentProfile />} />
          <Route path="/company" element={<Company />} />
          <Route path="/posted-jobs" element={<PostedJobs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
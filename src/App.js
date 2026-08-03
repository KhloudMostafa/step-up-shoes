import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"

function App() {
  return (
      <div className="position-relative overflow-hidden min-vh-100 bg-white">
        <div 
          className="position-absolute top-0 end-0 h-100 d-none d-lg-block" 
          style={{ width: '58.333%', backgroundColor: '#ebebeb', zIndex: 0 }}
        ></div>

      <div className="position-relative z-1 d-flex flex-column min-vh-100">
        <Navbar />
        <HeroSection />
      </div>
    </div>
    )
}

export default App
import { useState, React } from "react";
import { Link } from "react-router-dom";
// import "./WealthTracker.module.css";
import "./LandingPage.css";

import HeroSection from "./HeroSection";
import Section2 from "./Section2";
import Navbar from "./Navbar";
import Section4 from "./Section4";
import Section3 from "./Section3";
import Accordion from "./Accordion";
import Footer from "./Footer";
import ReviewMyportfolioForm from "./ReviewMyportfolioForm";
import GlassSurface from "./GlassSurface";
import { showFormContext } from "./contexts/showFormContext";

function WealthTracker() {
  const [showForm, setShowForm] = useState(false);

  return (
    <showFormContext.Provider value={{ showForm, setShowForm }}>
      <div className="relative">
        <Navbar />
        <main className="w-full">
          <HeroSection />
          <Section2 />
          <Section3 />
          <Section4 />
          <Accordion />
        </main>
        <Footer />
      </div>

      {/* Apple Glass Style Download Widget */}
      <a href="https://investza.in/wealth-tracker/" target="_blank" rel="noopener noreferrer" className="download-widget-link">
        <GlassSurface
          width={280}
          height={100}
          borderRadius={24}
          brightness={30}
          opacity={0.5}
          blur={15}
          displace={0}
          backgroundOpacity={0}
          saturation={1.2}
          redOffset={2}
          greenOffset={4}
          blueOffset={6}
          distortionScale={-200}
          className="download-widget visible"
        >
          <div className="download-content">
            <div className="qr-container">
              <img src="/qr-code.svg" alt="QR Code" className="qr-code-image" />
            </div>
            <div className="download-info">
              <div className="download-title">Download Wealth Tracker</div>
              <div className="app-store-buttons">
                <div className="store-button google-play-btn">
                  <img src="/google_play_icon.svg" alt="Google Play" className="store-icon" />
                </div>
                <div className="store-button app-store-btn">
                  <img src="/app_store_icon.svg" alt="App Store" className="store-icon" />
                </div>
              </div>
            </div>
          </div>
        </GlassSurface>
      </a>

      {/* Floating Download Badge - Mobile Only */}
      <div className="floating-download-badge" id="downloadBadge">
        <div className="badge-logo">
          <div className="badge-logo-text">WEALTH</div>
          <div className="badge-logo-text">TRACKER</div>
        </div>
        <div className="badge-content">
          <p className="badge-title">Download Wealth Tracker App</p>
        </div>
        <button className="badge-button" onClick={() => {
          const userAgent = navigator.userAgent || navigator.vendor || window.opera;
          let storeUrl;
          
          if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            storeUrl = 'https://apps.apple.com/in/app/wealth-tracker-mf-analysis/id6751183825';
          } else if (/android/i.test(userAgent)) {
            storeUrl = 'https://play.google.com/store/apps/details?id=com.nvcproject.InvestzaApp&hl=en_IN';
          } else {
            storeUrl = 'https://play.google.com/store/apps/details?id=com.nvcproject.InvestzaApp&hl=en_IN';
          }
          
          window.open(storeUrl, '_blank', 'noopener,noreferrer');
        }}>
          Get App
        </button>
        <div className="badge-close" onClick={() => document.getElementById('downloadBadge').classList.add('hidden')}>
          ✕
        </div>
      </div>

      {showForm && <ReviewMyportfolioForm onClose={() => setShowForm(false)} />}
    </showFormContext.Provider>
  );
}

export default WealthTracker;

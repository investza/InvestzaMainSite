import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventsPage from './pages/EventsPage';
import AboutUs from './pages/AboutUs';
import TeamPage from './pages/TeamPage';
import ContactUs from './pages/ContactUs';
import FAQPage from './pages/FAQPage';
import LearnWhy from './pages/LearnWhy';
import Newsletter from './pages/Newsletter';
import RefundPolicy from './pages/RefundPolicy';
import Disclaimer from './pages/Disclaimer';
import TermsConditions from './pages/TermsConditions';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/learn-why" element={<LearnWhy />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
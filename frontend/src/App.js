
// IMPORTS THAT MUST ALWAYS BE LOADED AT START
// (Small libraries, CSS, contexts, utilities)

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Preloader from './components/Preloader';
import './App.css';
import './components/PreloaderAnimations.css';

// Shared assets
import AdnanKhan from './assets/Adnan-Khan.webp';
import AnkitMehta from './assets/Ankit-Mehta.webp';



//  PAGE-LEVEL LAZY LOADING (Major optimization)

const LandingPage = lazy(() => import('./components/LandingPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const LearnWhy = lazy(() => import('./pages/LearnWhy'));
const Newsletter = lazy(() => import('./pages/Newsletter'));
const NewsletterDetail = lazy(() => import('./pages/NewsletterDetail'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const WealthTracker = lazy(() => import('./components/WealthTracker'));
const Page = lazy(() => import('./components/Page'));
const ShowQR = lazy(() => import('./components/ShowQR'));
const AdminApp = lazy(()=> import('./admin/AdminApp'));

const MainLayout = lazy(()=> import('./layout/MainLayout'));



// CALL SCHEDULING FLOW LAZY IMPORTS
const Information = lazy(() => import('./components/Information'));
const NameDetails = lazy(() => import('./components/NameDetails'));
const VerifyOtp = lazy(() => import('./components/VerifyOtp'));
const Vision = lazy(() => import('./components/Vision'));
const ContactDetails = lazy(() => import('./components/ContactDetails'));
const InvestmentDetails = lazy(() => import('./components/InvestmentDetails'));
const ConfirmationPage = lazy(() => import('./components/ConfirmationPage'));
const ScheduleComponent = lazy(() => import('./components/ScheduleComponent'));
const EmailDetails = lazy(() => import('./components/EmailDetails'));


const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// Scroll-to-top logic
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  
  // Preloader logic
  useEffect(() => {
    const seen = sessionStorage.getItem('preloaderShown');
    if (seen) {
      setShowPreloader(false);
    } else {
      document.body.classList.add('preloader-active');
    }
  }, []);

  const handlePreloaderComplete = () => {
    // Ensure body has black background to prevent white flash
    document.body.style.backgroundColor = '#000000';
    document.documentElement.style.backgroundColor = '#000000';
    
    document.body.classList.remove('preloader-active');
    document.body.classList.add('preloader-complete');
    
    // Preloader handles its own timing now
    setShowPreloader(false);
    
    sessionStorage.setItem('preloaderShown', 'true');
  };

  return (
    <Router>
      <ScrollToTop />

      {/*  Preloader visible ONLY until bundle + first route is ready */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`App ${showPreloader ? 'preloader-active' : ''}`}>
              {/*  Suspense wraps all lazy routes */}
              <Suspense>
                <Routes>
                  {/* Standard Routes */}
                  <Route element={<MainLayout/>}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/learn-why" element={<LearnWhy />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/newsletter/:id" element={<NewsletterDetail />} />
                    <Route path="/refund" element={<RefundPolicy />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/terms" element={<TermsConditions />} />
                  </Route>
                  <Route path="/wealth-tracker" element={<WealthTracker />} />
                  <Route path="/showQR" element={<ShowQR />} />

                  
                  {/*  CALL SCHEDULING ROUTES */}
                  <Route
                    path="/schedule-call"
                    element={<Page Left={<Information />} Right={<NameDetails />} />}
                  />

                  <Route
                    path="/contactDetails"
                    element={
                      <Page
                        Left={
                          <Vision
                            authorName={'Mr. Adnan Khan'}
                            authorTestimony={`What I appreciate most about Investza is the transparency.`}
                            authorTitle={'Actor'}
                            authorImage={AdnanKhan}
                          />
                        }
                        Right={<ContactDetails />}
                      />
                    }
                  />

                  <Route path="/verification" element={<VerifyOtp />} />

                  <Route
                    path="/investmentDetails"
                    element={
                      <Page
                        Left={
                          <Vision
                            authorName={`Mr. Ankit Mehta`}
                            authorTestimony={`With Investza, I feel like I have real partner.`}
                            authorTitle={'MD at Chemkart LTD'}
                            authorImage={AnkitMehta}
                          />
                        }
                        Right={<InvestmentDetails />}
                      />
                    }
                  />

                  <Route
                    path="/scheduleCall"
                    element={<Page Left={<Information />} Right={<ScheduleComponent />} />}
                  />

                  <Route
                    path="/emailDetails"
                    element={<Page Left={<Information />} Right={<EmailDetails />} />}
                  />

                  <Route path="/confirmation" element={<ConfirmationPage />} />
                  <Route path="/adminlogin/*" element={<AdminApp />} />
                  <Route path = "*" element={<PageNotFound />} /> 
                </Routes> 
              </Suspense>
      </div>
    </Router>
  );
}

export default App;

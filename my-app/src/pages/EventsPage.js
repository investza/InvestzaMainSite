import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import './EventsPage.css';

const EventsPage = () => {
  const lenisRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      normalizeWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      syncTouchLerp: 0.1,
      __experimental__naiveDimensions: false
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const header = document.querySelector('.header');
      const heroOverlay = document.querySelector('.hero-overlay');
      const heroSection = document.querySelector('.events-hero');
      const eventsContent = document.querySelector('.events-content');
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

      // Calculate opacity based on scroll position relative to hero height
      const scrollProgress = Math.min(scrollY / (heroHeight * 0.8), 1);
      const tintOpacity = scrollProgress * 0.6; // Max 60% additional tint

      // Lift up effect: content section reveals from bottom
      if (eventsContent && scrollY < heroHeight) {
        const liftProgress = scrollY / heroHeight;
        const translateY = (1 - liftProgress) * 100;
        eventsContent.style.transform = `translateY(${translateY}vh)`;
      } else if (eventsContent) {
        eventsContent.style.transform = 'translateY(0)';
      }

      if (scrollY > 50) {
        header.classList.add('scrolled');

        // Check if we've scrolled past the hero section
        if (scrollY >= heroHeight) {
          // Past hero section - add black bar to header
          header.classList.add('past-video');
          if (heroOverlay) {
            heroOverlay.style.background = `rgba(0, 0, 0, ${0.3 + 0.6})`; // Keep max tint
          }
        } else {
          // Still in hero section - progressive tint on hero only
          header.classList.remove('past-video');
          if (heroOverlay) {
            heroOverlay.style.background = `rgba(0, 0, 0, ${0.3 + tintOpacity})`;
          }
        }
      } else {
        header.classList.remove('scrolled');
        header.classList.remove('past-video');
        if (heroOverlay) {
          heroOverlay.style.background = 'rgba(0, 0, 0, 0.3)';
        }
      }
    };

    // Add Lenis class to html element
    document.documentElement.classList.add('lenis');

    lenis.on('scroll', handleScroll);

    // Animation frame for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, []);

  return (
    <div className="events-page">
      <Header />
      
      <section className="events-hero" style={{ backgroundImage: 'url(/webinar_pic.webp)' }}>
        <div className="hero-overlay"></div>
        <div className="events-hero-content">
          <h1>Upcoming Events</h1>
          <p>Join us for exclusive investment insights and networking opportunities</p>
        </div>
      </section>

      <section className="events-content">
        <div className="container">
          <h2 className="section-title">Past Events</h2>
          
          <div className="events-grid">
            <div className="event-card">
              <div className="event-image">
                <img src="/event1.jpg" alt="Event" />
              </div>
              <div className="event-details">
                <span className="event-date">October 15, 2024</span>
                <h3 className="event-title">Management Masterclass</h3>
                <p className="event-description">
                  Learn advanced strategies for portfolio diversification and risk management
                </p>
                <button className="event-register-btn">View Details</button>
              </div>
            </div>

            <div className="event-card">
              <div className="event-image">
                <img src="/event2.jpg" alt="Event" />
              </div>
              <div className="event-details">
                <span className="event-date">September 22, 2024</span>
                <h3 className="event-title">Tax Planning Workshop</h3>
                <p className="event-description">
                  Discover effective tax-saving strategies and optimize your investment returns
                </p>
                <button className="event-register-btn">View Details</button>
              </div>
            </div>

            <div className="event-card">
              <div className="event-image">
                <img src="/event3.jpg" alt="Event" />
              </div>
              <div className="event-details">
                <span className="event-date">August 10, 2024</span>
                <h3 className="event-title">Market Trends & Analysis</h3>
                <p className="event-description">
                  Expert insights on current market conditions and future investment opportunities
                </p>
                <button className="event-register-btn">View Details</button>
              </div>
            </div>
          </div>

          <h2 className="section-title" style={{ marginTop: '80px' }}>Upcoming Events</h2>
          
          <div className="events-grid">
            <div className="event-card">
              <div className="event-image">
                <img src="/event4.jpg" alt="Event" />
              </div>
              <div className="event-details">
                <span className="event-date">December 15, 2024</span>
                <h3 className="event-title">Investment Strategy Summit</h3>
                <p className="event-description">
                  Join industry leaders to explore cutting-edge investment strategies for 2025
                </p>
                <button className="event-register-btn">Register</button>
              </div>
            </div>

            <div className="event-card">
              <div className="event-image">
                <img src="/event5.jpg" alt="Event" />
              </div>
              <div className="event-details">
                <span className="event-date">January 20, 2025</span>
                <h3 className="event-title">Retirement Planning Seminar</h3>
                <p className="event-description">
                  Plan your retirement with confidence through comprehensive wealth strategies
                </p>
                <button className="event-register-btn">Register</button>
              </div>
            </div>

            <div className="event-card">
              <div className="event-image">
                <img src="/event6.jpg" alt="Event" />
              </div>
              <div className="event-details">
                <span className="event-date">February 8, 2025</span>
                <h3 className="event-title">Investments Forums</h3>
                <p className="event-description">
                  Explore alternative investment opportunities beyond traditional markets
                </p>
                <button className="event-register-btn">Register</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Mentor Section */}
      <section className="mentor-section">
        <div className="container">
          <div className="mentor-content">
            <div className="mentor-left">
              <h2 className="mentor-title">Meet Your Mentor</h2>
              <p className="mentor-quote">
                "Early Retirement isn't a dream-it's a strategy. And with the right tools, you can make it a reality."
              </p>
              <ul className="mentor-highlights">
                <li>Over 15 years of experience in wealth management</li>
                <li>Helped 10,000+ professionals reshape their financial future</li>
                <li>Known for simplifying complex strategies into actionable steps</li>
              </ul>
              <button className="mentor-cta-btn">Know More</button>
            </div>
            <div className="mentor-right">
              <div className="mentor-image-wrapper">
                <img src="/abhishek_working.webp" alt="Abhishek Mehta" className="mentor-image" />
              </div>
              <div className="mentor-name-card">
                <h3 className="mentor-name">Abhishek Mehta</h3>
                <p className="mentor-role">Founder & Chief Strategist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="team-title">WHO'S BEHIND INVESTZA</h2>

          <div className="team-grid">
            <div className="team-member">
              <a href="https://www.linkedin.com/in/abhishek-mehta-ca-cfa/" target="_blank" rel="noopener noreferrer" className="member-image-link">
                <div className="member-image">
                  <img src="/abhishek.webp" alt="Abhishek Mehta" />
                  <div className="hover-overlay">
                    <div className="linkedin-icon">
                      <img src="/linkedin_icon.png" alt="LinkedIn" />
                    </div>
                  </div>
                </div>
              </a>
              <div className="member-info">
                <h3 className="member-name">Abhishek Mehta</h3>
                <p className="member-role">Founder & Chief Strategist</p>
              </div>
            </div>

            <div className="team-member">
              <a href="https://www.linkedin.com/in/pooja-chandgothia-470054108/" target="_blank" rel="noopener noreferrer" className="member-image-link">
                <div className="member-image">
                  <img src="/pooja.webp" alt="Pooja Chandgothia" />
                  <div className="hover-overlay">
                    <div className="linkedin-icon">
                      <img src="/linkedin_icon.png" alt="LinkedIn" />
                    </div>
                  </div>
                </div>
              </a>
              <div className="member-info">
                <h3 className="member-name">Pooja Chandgothia</h3>
                <p className="member-role">Founder & CEO</p>
              </div>
            </div>

            <div className="team-member">
              <a href="https://www.linkedin.com/in/varunvinayan/" target="_blank" rel="noopener noreferrer" className="member-image-link">
                <div className="member-image">
                  <img src="/varun.webp" alt="Varun Vinayan" />
                  <div className="hover-overlay">
                    <div className="linkedin-icon">
                      <img src="/linkedin_icon.png" alt="LinkedIn" />
                    </div>
                  </div>
                </div>
              </a>
              <div className="member-info">
                <h3 className="member-name">Varun Vinayan</h3>
                <p className="member-role">Vice President</p>
              </div>
            </div>
          </div>

          <div className="team-cta">
            <button className="meet-team-btn">
              Meet the Team
              <div className="btn-arrow">→</div>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-left">
              <h2 className="faq-title">FAQ's</h2>
              
              <div className="faq-accordion">
                <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(0)}>
                    <span>How I'll get the link to attend the program?</span>
                    <span className="faq-icon">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>Once you register for the event, you'll receive a confirmation email with the event link and all necessary details to join the program.</p>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(1)}>
                    <span>What will be the language for the masterclass?</span>
                    <span className="faq-icon">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>The masterclass will be conducted in English with Hindi support available for better understanding.</p>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(2)}>
                    <span>I am a beginner who has absolutely no knowledge about personal finance. Will it be useful for me?</span>
                    <span className="faq-icon">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>Absolutely! Our events are designed for all levels, from beginners to experienced investors. We start with the basics and build up to more advanced concepts.</p>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(3)}>
                    <span>What if I do have any questions regarding registration and login?</span>
                    <span className="faq-icon">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>Our support team is available to help you with any registration or login issues. You can reach out to us via email or phone, and we'll assist you promptly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="faq-right">
              <div className="faq-illustration">
                <img src="/faq.webp" alt="FAQ" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;

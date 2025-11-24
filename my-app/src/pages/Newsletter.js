import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './Newsletter.css';

function Newsletter() {
  const lenisRef = useRef(null);
  const navigate = useNavigate();

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

    // Store lenis instance globally for modal access
    window.lenis = lenis;

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const header = document.querySelector('.header');
      const heroSection = document.querySelector('.newsletter-hero');
      const newsletterContent = document.querySelector('.newsletter-content');
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

      // Calculate opacity for hero section - gradually fade as user scrolls
      const scrollProgress = Math.min(scrollY / heroHeight, 1);
      const heroOpacity = 1 - (scrollProgress * 0.6); // Fade from 1 to 0.4

      if (heroSection) {
        heroSection.style.opacity = heroOpacity;
      }

      // Lift up effect: content section reveals from bottom
      if (newsletterContent && scrollY < heroHeight) {
        const liftProgress = scrollY / heroHeight;
        const translateY = (1 - liftProgress) * 10; // Changed from 70 to 50 for even earlier appearance
        newsletterContent.style.transform = `translateY(${translateY}vh)`;
      } else if (newsletterContent) {
        newsletterContent.style.transform = 'translateY(0)';
      }

      if (scrollY > 50) {
        header.classList.add('scrolled');

        // Check if we've scrolled past the hero section
        if (scrollY >= heroHeight) {
          // Past hero section - add black bar to header
          header.classList.add('past-video');
        } else {
          // Still in hero section
          header.classList.remove('past-video');
        }
      } else {
        header.classList.remove('scrolled');
        header.classList.remove('past-video');
      }
    };

    lenis.on('scroll', handleScroll);

    document.documentElement.classList.add('lenis');

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const newsletters = [
    {
      id: 1,
      title: 'Market Insights - January 2024',
      date: 'January 15, 2024',
      description: 'Discover the latest market trends and investment opportunities for the new year.',
      image: '/newsletter1.jpg',
      category: 'Market Analysis'
    },
    {
      id: 2,
      title: 'Investment Strategies for 2024',
      date: 'January 8, 2024',
      description: 'Learn about effective investment strategies to maximize your portfolio returns.',
      image: '/newsletter2.jpg',
      category: 'Investment Tips'
    },
    {
      id: 3,
      title: 'Understanding Mutual Funds',
      date: 'December 28, 2023',
      description: 'A comprehensive guide to mutual funds and how they can benefit your financial goals.',
      image: '/newsletter3.jpg',
      category: 'Education'
    },
    {
      id: 4,
      title: 'Tax Planning for Investors',
      date: 'December 20, 2023',
      description: 'Essential tax planning tips to optimize your investment returns this fiscal year.',
      image: '/newsletter4.jpg',
      category: 'Tax Planning'
    },
    {
      id: 5,
      title: 'Retirement Planning Guide',
      date: 'December 12, 2023',
      description: 'Plan your retirement with confidence using our expert financial advice.',
      image: '/newsletter5.jpg',
      category: 'Retirement'
    },
    {
      id: 6,
      title: 'Market Volatility Insights',
      date: 'December 5, 2023',
      description: 'Navigate market volatility with smart investment decisions and risk management.',
      image: '/newsletter6.jpg',
      category: 'Market Analysis'
    }
  ];

  return (
    <div className="newsletter-page">
      <Header />
      
      <div 
        className="newsletter-hero"
        style={{
          backgroundImage: `url(/team/newsletter_hero.jpeg?v=${Date.now()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="newsletter-hero-overlay"></div>
        <div className="newsletter-hero-content">
          <h1>Newsletter</h1>
          <p>Stay informed with the latest insights, market trends, and investment strategies</p>
        </div>
      </div>

      <div className="newsletter-content">
        <div className="newsletter-container">
          <div className="newsletter-grid">
            {newsletters.map((newsletter) => (
              <div key={newsletter.id} className="newsletter-card">
                <div className="newsletter-image">
                  <img src={newsletter.image} alt={newsletter.title} />
                  <div className="newsletter-category">{newsletter.category}</div>
                </div>
                <div className="newsletter-card-content">
                  <div className="newsletter-date">{newsletter.date}</div>
                  <h3 className="newsletter-title">{newsletter.title}</h3>
                  <p className="newsletter-description">{newsletter.description}</p>
                  <button 
                    className="newsletter-read-btn"
                    onClick={() => navigate(`/newsletter/${newsletter.id}`)}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default Newsletter;

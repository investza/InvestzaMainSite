import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GlassSurface from './GlassSurface';
import './Header.css';

const Header = ({ onReviewPortfolio }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showMobileResourcesDropdown, setShowMobileResourcesDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileLoginText, setMobileLoginText] = useState('Login');
  const location = useLocation();
  const closeTimeoutRef = React.useRef(null);
  const loginCloseTimeoutRef = React.useRef(null);

  const isActive = (path) => location.pathname === path;

  // Check if current page is a light mode page
  const lightModePages = ['/terms', '/disclaimer', '/refund', '/faq', '/contact', '/team', '/newsletter', '/about', '/privacy'];
  const isLightModePage = lightModePages.some(page => location.pathname.startsWith(page));

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setShowResourcesDropdown(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowResourcesDropdown(false);
    }, 100);
  };

  const handleLoginMouseEnter = () => {
    if (loginCloseTimeoutRef.current) {
      clearTimeout(loginCloseTimeoutRef.current);
    }
    setShowLoginDropdown(true);
  };

  const handleLoginMouseLeave = () => {
    loginCloseTimeoutRef.current = setTimeout(() => {
      setShowLoginDropdown(false);
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReviewPortfolio = () => {
    // Navigate to portfolio review flow
    window.location.href = '/review-portfolio';
  };

  return (
    <>
      <header 
        className={`header-container ${isScrolled ? 'header-scrolled' : 'header-top'} ${showResourcesDropdown ? 'dropdown-open' : ''} ${isLightModePage && isScrolled ? 'light-mode-scrolled' : ''}`}
      >
        <div className="header-glass-wrapper">
          <GlassSurface
            width="auto"
            height="auto"
            borderRadius={isScrolled ? 35 : 0}
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
            className="header-glass"
            style={{ zIndex: 1002 }}
          >
            <div className="header-glass-inner">
              <nav className="header-nav">
            {/* Logo */}
            <Link to="/" className="header-logo">
              <img src="/logo.svg" alt="Investza" className="header-logo-img" />
            </Link>

            {/* Desktop Navigation */}
            <div className="header-links">
              {/* About Us Link */}
              <Link
                to="/about"
                className={`header-link ${isActive('/about') ? 'active' : ''}`}
              >
                About Us
              </Link>

              {/* Events Link */}
              <Link
                to="/events"
                className={`header-link ${isActive('/events') ? 'active' : ''}`}
              >
                Events
              </Link>

              {/* Wealth Tracker Link */}
              <Link
                to="/wealth-tracker"
                className={`header-link ${isActive('/wealth-tracker') ? 'active' : ''}`}
              >
                Wealth Tracker
              </Link>

              {/* Resources Dropdown */}
              <div 
                className="header-dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="header-link dropdown-trigger">
                  Resources
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    style={{ 
                      marginLeft: '4px',
                      transition: 'transform 0.3s ease, stroke 0.4s ease',
                      transform: showResourcesDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <path 
                      d="M3 4.5L6 7.5L9 4.5" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="header-actions">
              <button 
                className="header-cta-btn"
                onClick={handleReviewPortfolio}
              >
                Review My Portfolio
              </button>

              {/* Login Button */}
              <div 
                className="header-login-dropdown-wrapper"
                onMouseEnter={handleLoginMouseEnter}
                onMouseLeave={handleLoginMouseLeave}
              >
                <button className="header-login-btn">
                  Login
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    style={{ 
                      marginLeft: '6px',
                      transition: 'transform 0.3s ease',
                      transform: showLoginDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <path 
                      d="M3 4.5L6 7.5L9 4.5" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="header-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
          </nav>

          {/* Dropdown content inside same glass surface */}
          {showResourcesDropdown && (
            <div 
              className="header-dropdown-content"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="dropdown-separator"></div>
              <div className="dropdown-cards-container">

              {/* Card 1 - Newsletter */}
              <Link 
                to="/newsletter" 
                className="dropdown-card"
                onClick={() => setShowResourcesDropdown(false)}
              >
                <div className="dropdown-card-inner">
                  <h3 className="dropdown-card-title">Newsletter</h3>
                  <p className="dropdown-card-description">Stay updated with market insights and investment strategies</p>
                </div>
              </Link>

              {/* Card 2 - Contact Us */}
              <Link 
                to="/contact" 
                className="dropdown-card"
                onClick={() => setShowResourcesDropdown(false)}
              >
                <div className="dropdown-card-inner">
                  <h3 className="dropdown-card-title">Contact Us</h3>
                  <p className="dropdown-card-description">Get in touch with our team for personalized support</p>
                </div>
              </Link>

              {/* Card 3 - Meet the Team */}
              <Link 
                to="/team" 
                className="dropdown-card"
                onClick={() => setShowResourcesDropdown(false)}
              >
                <div className="dropdown-card-inner">
                  <h3 className="dropdown-card-title">Meet the Team</h3>
                  <p className="dropdown-card-description">Learn about our experienced investment advisors</p>
                </div>
              </Link>


              </div>
            </div>
          )}
            </div>
          </GlassSurface>
        </div>
      </header>

      {/* Login Dropdown - Outside header container */}
      {showLoginDropdown && (
        <div 
          className="login-dropdown-portal"
          onMouseEnter={handleLoginMouseEnter}
          onMouseLeave={handleLoginMouseLeave}
        >
          <GlassSurface
            width="auto"
            height="auto"
            borderRadius={16}
            brightness={30}
            opacity={0.5}
            blur={15}
            backgroundOpacity={0}
            saturation={1.2}
            redOffset={2}
            greenOffset={4}
            blueOffset={6}
            distortionScale={-200}
            className="login-dropdown-glass"
          >
            <div className="login-dropdown-options">
              <button 
                className="login-dropdown-option"
                onClick={() => {
                  window.open('https://app.investza.in', '_blank');
                  setShowLoginDropdown(false);
                }}
              >
                <span className="login-option-default">Client Login</span>
                <span className="login-option-hover">Coming Soon</span>
              </button>
              <button 
                className="login-dropdown-option"
                onClick={() => {
                  window.open('https://partner.investza.in', '_blank');
                  setShowLoginDropdown(false);
                }}
              >
                <span className="login-option-default">Partner Login</span>
                <span className="login-option-hover">Coming Soon</span>
              </button>
            </div>
          </GlassSurface>
        </div>
      )}

      {/* Mobile Menu - Full Screen Blur */}
      {isMenuOpen && (
        <div className="header-mobile-menu-fullscreen">
          <div className="mobile-menu-container">
            {/* Close Button */}
            <button 
              className="mobile-menu-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Menu Links */}
            <div className="mobile-menu-links">
              <Link to="/about" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/events" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Events</Link>
              <Link to="/wealth-tracker" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Wealth Tracker</Link>
              
              {/* Resources Dropdown */}
              <div className="mobile-resources-dropdown">
                <button 
                  className="mobile-menu-link mobile-resources-trigger"
                  onClick={() => setShowMobileResourcesDropdown(!showMobileResourcesDropdown)}
                >
                  Resources
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    style={{ 
                      marginLeft: '8px',
                      transition: 'transform 0.3s ease',
                      transform: showMobileResourcesDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <path 
                      d="M3 4.5L6 7.5L9 4.5" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {showMobileResourcesDropdown && (
                  <div className="mobile-resources-submenu">
                    <Link to="/newsletter" className="mobile-submenu-link" onClick={() => setIsMenuOpen(false)}>Newsletter</Link>
                    <Link to="/contact" className="mobile-submenu-link" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                    <Link to="/team" className="mobile-submenu-link" onClick={() => setIsMenuOpen(false)}>Meet the Team</Link>
                  </div>
                )}
              </div>

              <Link to="/faq" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
              
              {/* Review My Portfolio Button */}
              <button 
                className="mobile-menu-cta"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleReviewPortfolio();
                }}
              >
                Review My Portfolio
              </button>

              {/* Login Button */}
              <button 
                className="mobile-menu-login"
                onClick={() => {
                  setMobileLoginText('Coming Soon');
                  setTimeout(() => setMobileLoginText('Login'), 2000);
                }}
              >
                {mobileLoginText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

import { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Lenis from 'lenis';
import Header from '../components/Header';
import TeamFooter from './TeamFooter';
import TeamCard from '../components/TeamCard';
import './TeamPage.css';

const TeamPage = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const handleScroll = () => {
    const targetSection = document.getElementById('team-members-section');
    if (targetSection && lenisRef.current) {
      lenisRef.current.scrollTo(targetSection, {
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <div className="team-page-wrapper">
      <Header />
      
      <div className="team-page">
        {/* Hero Section */}
        <div className="team-hero-section">
          <div className="team-heading-div">
            <h1 className="team-heading">Team Members</h1>
          </div>

          <div
            className="arrow-stack"
            role="button"
            tabIndex={0}
            aria-label="Scroll indicator"
            onClick={handleScroll}
          >
            <ChevronDown className="arrow a1" />
            <ChevronDown className="arrow a2" />
            <ChevronDown className="arrow a3" />
          </div>
        </div>

        {/* Main Team Members */}
        <div id="team-members-section" className="main-team-section">
          <TeamCard
            frontImage="/team/abhishek.webp"
            name="Abhishek\nMehta"
            title="Co-Founder & Chief Strategist"
            isMainMember={true}
          />
          <TeamCard
            frontImage="/team/pooja.webp"
            name="Pooja\nChandgothia"
            title="CEO & Founder"
            isMainMember={true}
          />
          <TeamCard
            frontImage="/team/varun.webp"
            name="Varun\nVinayan"
            title="Vice President"
            isMainMember={true}
          />
        </div>

        {/* Co-Team Members */}
        <div className="co-team-section">
          <div className="co-team-container">
            <TeamCard
              frontImage="/team/vinay.webp"
              name="Vinay\nPhadtare"
              title="Accountant Manager"
              isMainMember={false}
            />
            <TeamCard
              frontImage="/team/manisha.webp"
              name="Manisha\nParmar"
              title="Accountant & Taxation"
              isMainMember={false}
            />
            <TeamCard
              frontImage="/team/priya.webp"
              name="Priya\nDodiya"
              title="Accountant & Taxation"
              isMainMember={false}
            />
            <TeamCard
              frontImage="/team/arshia.webp"
              name="Arshia\nPehel"
              title="Brand Manager"
              isMainMember={false}
            />
            <TeamCard
              frontImage="/team/mansi.webp"
              name="Mansi\nMhatre"
              title="Operation Execute"
              isMainMember={false}
            />
            <TeamCard
              frontImage="/team/Ayesha.webp"
              name="Ayesha\nParadiwalla"
              title="Research Analyst"
              isMainMember={false}
            />
          </div>
        </div>
      </div>

      <TeamFooter />
    </div>
  );
};

export default TeamPage;

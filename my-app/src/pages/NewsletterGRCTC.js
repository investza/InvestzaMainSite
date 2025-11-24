import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './NewsletterGRCTC.css';

function NewsletterGRCTC() {
  const lenisRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;
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

  return (
    <div className="newsletter-grctc-page">
      <Header />
      
      <div className="grctc-content">
        <div className="grctc-container">
          <div className="grctc-spacer"></div>
          
          <h1 className="grctc-main-title">Why GRCTCs Matter for India's Financial Future</h1>
          
          <div className="grctc-intro">
            <p>In today's rapidly evolving financial landscape, having a comprehensive wealth management strategy is no longer optional—it's essential. The GRCTC framework stands for Gift, Retirement, Children, Tax, and Charity, representing five critical pillars that form the foundation of holistic financial planning.</p>
            
            <p>At Investza, we believe that understanding and implementing these five pillars can transform your financial future, ensuring security, growth, and legacy for generations to come.</p>
          </div>

          <div className="grctc-image-section">
            <img src="https://investza.in/wp-content/uploads/image-14.png" alt="GRCTC Framework" className="grctc-main-image" />
          </div>

          <h2 className="grctc-section-title">Understanding the GRCTC Framework</h2>
          
          <p>The GRCTC framework is a comprehensive approach to financial planning that addresses the most important aspects of wealth management. Each pillar plays a unique role in building a secure and prosperous financial future.</p>

          <div className="grctc-pillars">
            <div className="grctc-pillar">
              <div className="grctc-pillar-icon">🎁</div>
              <div className="grctc-pillar-title">Gift</div>
              <div className="grctc-pillar-desc">Strategic wealth transfer during your lifetime</div>
            </div>
            
            <div className="grctc-pillar">
              <div className="grctc-pillar-icon">🏖️</div>
              <div className="grctc-pillar-title">Retirement</div>
              <div className="grctc-pillar-desc">Planning for financial independence</div>
            </div>
            
            <div className="grctc-pillar">
              <div className="grctc-pillar-icon">👨‍👩‍👧‍👦</div>
              <div className="grctc-pillar-title">Children</div>
              <div className="grctc-pillar-desc">Securing your children's future</div>
            </div>
            
            <div className="grctc-pillar">
              <div className="grctc-pillar-icon">💰</div>
              <div className="grctc-pillar-title">Tax</div>
              <div className="grctc-pillar-desc">Optimizing tax efficiency</div>
            </div>
            
            <div className="grctc-pillar">
              <div className="grctc-pillar-icon">❤️</div>
              <div className="grctc-pillar-title">Charity</div>
              <div className="grctc-pillar-desc">Creating lasting social impact</div>
            </div>
          </div>

          <h2 className="grctc-section-title">The Five Pillars Explained</h2>

          <h3 className="grctc-subsection-title">1. Gift: Strategic Wealth Transfer</h3>
          
          <p>Gifting is more than just generosity—it's a strategic tool for wealth management and tax planning. In India, gifting to family members can help reduce your taxable estate while supporting loved ones during your lifetime.</p>
          
          <ul className="grctc-list">
            <li><strong>Tax-Free Gifts:</strong> Gifts to specified relatives are exempt from tax under Indian law</li>
            <li><strong>Wealth Distribution:</strong> Transfer assets strategically to reduce estate complexity</li>
            <li><strong>Family Support:</strong> Help children with education, marriage, or business ventures</li>
            <li><strong>Estate Planning:</strong> Reduce the burden of inheritance disputes</li>
          </ul>

          <h3 className="grctc-subsection-title">2. Retirement: Planning for Financial Independence</h3>
          
          <p>Retirement planning is about ensuring you maintain your lifestyle and dignity in your golden years. With increasing life expectancy, planning for 25-30 years of retirement is crucial.</p>
          
          <ul className="grctc-list">
            <li><strong>Early Start:</strong> Begin retirement planning in your 20s or 30s to leverage compound growth</li>
            <li><strong>Multiple Income Streams:</strong> Diversify with EPF, NPS, mutual funds, and rental income</li>
            <li><strong>Healthcare Planning:</strong> Account for rising medical costs with adequate health insurance</li>
            <li><strong>Inflation Protection:</strong> Invest in assets that beat inflation over the long term</li>
          </ul>

          <div className="grctc-highlight-box">
            <p><strong>Key Insight:</strong> Indians need approximately 25-30 times their annual expenses saved for a comfortable retirement. Starting early makes this goal achievable through systematic investing.</p>
          </div>

          <h3 className="grctc-subsection-title">3. Children: Securing the Next Generation</h3>
          
          <p>Planning for your children's future involves more than just saving for education. It's about providing opportunities, security, and financial literacy.</p>
          
          <ul className="grctc-list">
            <li><strong>Education Planning:</strong> Start SIPs early for higher education costs, both domestic and international</li>
            <li><strong>Skill Development:</strong> Invest in extracurricular activities and skill-building programs</li>
            <li><strong>Financial Literacy:</strong> Teach children about money management from an early age</li>
            <li><strong>Insurance Protection:</strong> Ensure adequate term insurance to protect their future</li>
            <li><strong>Succession Planning:</strong> Create a clear plan for asset transfer and management</li>
          </ul>

          <h3 className="grctc-subsection-title">4. Tax: Optimizing Your Tax Efficiency</h3>
          
          <p>Tax planning is not about evasion—it's about making smart, legal choices to minimize your tax burden and maximize wealth accumulation.</p>
          
          <ul className="grctc-list">
            <li><strong>Section 80C Investments:</strong> Utilize ELSS, PPF, and life insurance for tax deductions</li>
            <li><strong>Capital Gains Planning:</strong> Time your investments to optimize long-term capital gains tax</li>
            <li><strong>Business Structure:</strong> Choose the right entity structure for tax efficiency</li>
            <li><strong>Deductions & Exemptions:</strong> Maximize all available deductions under various sections</li>
            <li><strong>Tax-Loss Harvesting:</strong> Offset gains with strategic loss booking</li>
          </ul>

          <h3 className="grctc-subsection-title">5. Charity: Creating Lasting Impact</h3>
          
          <p>Charitable giving is increasingly becoming part of comprehensive wealth planning, allowing you to create social impact while enjoying tax benefits.</p>
          
          <ul className="grctc-list">
            <li><strong>Tax Benefits:</strong> Donations to registered charities qualify for 50-100% tax deduction</li>
            <li><strong>Legacy Building:</strong> Create a lasting impact through charitable trusts or foundations</li>
            <li><strong>Values Transfer:</strong> Instill philanthropic values in the next generation</li>
            <li><strong>Strategic Giving:</strong> Align donations with causes you're passionate about</li>
            <li><strong>Corporate Social Responsibility:</strong> Integrate giving into business operations</li>
          </ul>

          <h2 className="grctc-section-title">Why GRCTCs Matter Now More Than Ever</h2>
          
          <p>India is experiencing unprecedented wealth creation, with projections showing massive intergenerational wealth transfer in the coming decades. Without proper planning across all five GRCTC pillars, this wealth risks being eroded by taxes, inflation, disputes, and poor management.</p>
          
          <div className="grctc-highlight-box">
            <p><strong>The Reality:</strong> Only a small percentage of Indian families have comprehensive financial plans covering all five GRCTC pillars. This gap represents both a risk and an opportunity.</p>
          </div>

          <h2 className="grctc-section-title">How Investza Helps You Master GRCTCs</h2>
          
          <p>At <a href="https://investza.in/" target="_blank" rel="noopener noreferrer">Investza</a>, we specialize in holistic financial planning that addresses all five GRCTC pillars. Our approach includes:</p>
          
          <ul className="grctc-list">
            <li><strong>Comprehensive Assessment:</strong> We analyze your current financial situation across all five pillars</li>
            <li><strong>Customized Strategy:</strong> Every family is unique—we create personalized plans aligned with your goals</li>
            <li><strong>Expert Guidance:</strong> Our team includes financial planners, tax experts, and legal advisors</li>
            <li><strong>Regular Reviews:</strong> Financial planning is ongoing—we review and adjust your strategy regularly</li>
            <li><strong>Education & Empowerment:</strong> We help you understand your finances and make informed decisions</li>
          </ul>

          <h2 className="grctc-section-title">Getting Started with GRCTC Planning</h2>
          
          <p>Implementing the GRCTC framework doesn't have to be overwhelming. Here's how to begin:</p>
          
          <ul className="grctc-list">
            <li><strong>Assess Your Current State:</strong> Evaluate where you stand on each of the five pillars</li>
            <li><strong>Set Clear Goals:</strong> Define what success looks like for each pillar</li>
            <li><strong>Prioritize Actions:</strong> Identify the most urgent areas requiring attention</li>
            <li><strong>Seek Professional Help:</strong> Work with experts who understand the complete picture</li>
            <li><strong>Take Action:</strong> Start implementing your plan systematically</li>
            <li><strong>Monitor & Adjust:</strong> Review progress regularly and make necessary adjustments</li>
          </ul>

          <div className="grctc-video">
            <p style={{marginBottom: '20px', fontSize: '18px', color: '#333'}}>Watch our detailed webinar on GRCTC planning and how it can transform your financial future:</p>
            <iframe 
              width="100%" 
              height="450" 
              src="https://www.youtube.com/embed/your-video-id" 
              title="GRCTC Framework Explained"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

          <div className="grctc-conclusion">
            <p><strong>Conclusion:</strong> The GRCTC framework—Gift, Retirement, Children, Tax, and Charity—provides a comprehensive roadmap for financial success. By addressing all five pillars, you create a robust financial plan that protects your wealth, supports your family, optimizes your taxes, and creates lasting impact.</p>
            
            <p>In India's dynamic economic environment, having a holistic approach to wealth management is no longer a luxury—it's a necessity. Whether you're just starting your career or planning your legacy, the GRCTC framework ensures you're prepared for every stage of your financial journey.</p>
            
            <p>At Investza, we're committed to helping Indian families master the GRCTC framework and build lasting financial security. Contact us today to begin your comprehensive financial planning journey.</p>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default NewsletterGRCTC;

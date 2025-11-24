import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './NewsletterWealth.css';

function NewsletterWealth() {
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
    <div className="newsletter-wealth-page">
      <Header />
      
      <div className="wealth-content">
        <div className="wealth-container">
          <div className="wealth-spacer"></div>
          
          <h1 className="wealth-main-title">Do You Really Need a Wealth Manager?</h1>
          
          <div className="wealth-intro">
            <p>In today's complex financial landscape, managing wealth has become increasingly challenging. With countless investment options, changing tax laws, and evolving market conditions, many individuals find themselves asking: "Do I really need a wealth manager?"</p>
            
            <p>The answer isn't one-size-fits-all. Whether you need professional wealth management depends on your financial situation, goals, expertise, and the time you can dedicate to managing your finances.</p>
          </div>

          <div className="wealth-image-section">
            <img src="https://investza.in/wp-content/uploads/image-15.png" alt="Wealth Management" className="wealth-main-image" />
          </div>

          <h2 className="wealth-section-title">What Does a Wealth Manager Do?</h2>
          
          <p>A wealth manager is a financial professional who provides comprehensive financial planning and investment management services. Unlike traditional financial advisors who may focus on specific products, wealth managers take a holistic approach to your financial life.</p>
          
          <ul className="wealth-list">
            <li><strong>Investment Management:</strong> Creating and managing diversified investment portfolios aligned with your risk tolerance and goals</li>
            <li><strong>Financial Planning:</strong> Developing comprehensive plans for retirement, education, and major life events</li>
            <li><strong>Tax Optimization:</strong> Structuring investments and income to minimize tax liability</li>
            <li><strong>Estate Planning:</strong> Ensuring smooth wealth transfer to the next generation</li>
            <li><strong>Risk Management:</strong> Protecting wealth through appropriate insurance and hedging strategies</li>
            <li><strong>Goal Setting:</strong> Helping you define and achieve your financial objectives</li>
          </ul>

          <h2 className="wealth-section-title">Signs You Might Need a Wealth Manager</h2>

          <h3 className="wealth-subsection-title">1. Your Financial Situation is Complex</h3>
          
          <p>If you have multiple income sources, diverse investments, business interests, or international assets, managing everything yourself can become overwhelming. A wealth manager can help coordinate all these moving parts.</p>

          <h3 className="wealth-subsection-title">2. You Lack Time or Expertise</h3>
          
          <p>Managing wealth effectively requires significant time, knowledge, and ongoing education. If you're busy with your career or business, or if financial markets aren't your area of expertise, professional help can be invaluable.</p>

          <h3 className="wealth-subsection-title">3. You're Approaching Major Life Events</h3>
          
          <p>Retirement, inheritance, business sale, or other significant financial events require careful planning. A wealth manager can help you navigate these transitions smoothly.</p>

          <h3 className="wealth-subsection-title">4. You Want to Optimize Tax Efficiency</h3>
          
          <p>Tax planning is complex and constantly evolving. Wealth managers stay updated on tax laws and can structure your finances to minimize tax burden legally.</p>

          <h3 className="wealth-subsection-title">5. You Need Objective Advice</h3>
          
          <p>Emotions can cloud financial decisions. A wealth manager provides objective, professional guidance based on data and experience rather than fear or greed.</p>

          <div className="wealth-highlight-box">
            <p><strong>Key Insight:</strong> Studies show that individuals working with professional wealth managers typically achieve better long-term financial outcomes compared to those managing investments alone, primarily due to disciplined strategy and emotional control.</p>
          </div>

          <h2 className="wealth-section-title">When You Might Not Need a Wealth Manager</h2>
          
          <p>Wealth management isn't for everyone. You might be fine managing your own finances if:</p>
          
          <ul className="wealth-list">
            <li>Your financial situation is relatively simple</li>
            <li>You have the time and interest to manage your investments</li>
            <li>You're comfortable with financial concepts and market dynamics</li>
            <li>You're disciplined about following your investment strategy</li>
            <li>Your assets are below the typical minimum for wealth management services</li>
          </ul>

          <h2 className="wealth-section-title">The Cost vs. Value Equation</h2>
          
          <p>Wealth managers typically charge fees based on assets under management (AUM), usually ranging from 0.5% to 2% annually. While this might seem expensive, consider the value they provide:</p>
          
          <ul className="wealth-list">
            <li><strong>Better Returns:</strong> Professional management often leads to improved risk-adjusted returns</li>
            <li><strong>Tax Savings:</strong> Strategic tax planning can save more than the management fee</li>
            <li><strong>Time Savings:</strong> Your time has value—what could you earn or enjoy instead?</li>
            <li><strong>Mistake Avoidance:</strong> Preventing costly errors can far exceed management fees</li>
            <li><strong>Peace of Mind:</strong> Knowing your finances are professionally managed reduces stress</li>
          </ul>

          <h2 className="wealth-section-title">What to Look for in a Wealth Manager</h2>
          
          <p>If you decide to work with a wealth manager, choosing the right one is crucial. Consider these factors:</p>

          <h3 className="wealth-subsection-title">Credentials and Experience</h3>
          
          <p>Look for professionals with relevant certifications (CFP, CFA, etc.) and proven track records. Experience in managing situations similar to yours is valuable.</p>

          <h3 className="wealth-subsection-title">Fee Structure</h3>
          
          <p>Understand how they're compensated. Fee-only advisors (paid directly by you) typically have fewer conflicts of interest than commission-based advisors.</p>

          <h3 className="wealth-subsection-title">Fiduciary Duty</h3>
          
          <p>Ensure your wealth manager is a fiduciary, legally obligated to act in your best interest at all times.</p>

          <h3 className="wealth-subsection-title">Services Offered</h3>
          
          <p>Confirm they provide comprehensive services covering all aspects of your financial life, not just investment management.</p>

          <h3 className="wealth-subsection-title">Communication Style</h3>
          
          <p>You should feel comfortable discussing your finances openly. Good communication is essential for a successful relationship.</p>

          <h3 className="wealth-subsection-title">Technology and Tools</h3>
          
          <p>Modern wealth managers should offer digital tools for tracking your portfolio, accessing reports, and communicating efficiently.</p>

          <h2 className="wealth-section-title">The Investza Approach to Wealth Management</h2>
          
          <p>At <a href="https://investza.in/" target="_blank" rel="noopener noreferrer">Investza</a>, we believe wealth management should be accessible, transparent, and personalized. Our approach includes:</p>
          
          <ul className="wealth-list">
            <li><strong>Holistic Planning:</strong> We look at your complete financial picture, not just investments</li>
            <li><strong>Customized Strategies:</strong> Every client receives a personalized plan aligned with their unique goals</li>
            <li><strong>Transparent Fees:</strong> No hidden charges—you know exactly what you're paying for</li>
            <li><strong>Regular Communication:</strong> We keep you informed and involved in all decisions</li>
            <li><strong>Technology-Enabled:</strong> Modern tools combined with personal service</li>
            <li><strong>Fiduciary Standard:</strong> Your interests always come first</li>
          </ul>

          <h2 className="wealth-section-title">Making the Decision</h2>
          
          <p>Deciding whether to hire a wealth manager is a personal choice that depends on your unique circumstances. Ask yourself these questions:</p>
          
          <ul className="wealth-list">
            <li>Am I confident in my ability to manage my investments effectively?</li>
            <li>Do I have the time to stay informed about markets and financial planning?</li>
            <li>Is my financial situation becoming more complex?</li>
            <li>Could professional guidance help me achieve my goals faster or more efficiently?</li>
            <li>Would I benefit from objective, professional advice?</li>
            <li>Am I making emotional decisions that hurt my long-term returns?</li>
          </ul>

          <div className="wealth-highlight-box">
            <p><strong>Remember:</strong> Hiring a wealth manager isn't an admission of failure—it's a strategic decision to leverage professional expertise, just like hiring a lawyer or accountant for specialized needs.</p>
          </div>

          <h2 className="wealth-section-title">Getting Started</h2>
          
          <p>If you're considering working with a wealth manager, start by:</p>
          
          <ul className="wealth-list">
            <li>Assessing your current financial situation and goals</li>
            <li>Researching potential wealth managers in your area</li>
            <li>Scheduling consultations with multiple firms</li>
            <li>Asking detailed questions about services, fees, and approach</li>
            <li>Checking credentials and references</li>
            <li>Trusting your instincts about the relationship fit</li>
          </ul>

          <div className="wealth-conclusion">
            <p><strong>Conclusion:</strong> Whether you need a wealth manager depends on your financial complexity, available time, expertise, and personal preferences. For many individuals, especially those with significant assets or complex situations, professional wealth management provides value that far exceeds its cost.</p>
            
            <p>The key is finding the right wealth manager who understands your goals, communicates clearly, and acts as a true partner in your financial journey. At Investza, we're committed to providing that level of service and expertise to help you achieve your financial dreams.</p>
            
            <p>Ready to explore whether wealth management is right for you? Contact us for a complimentary consultation to discuss your financial situation and goals.</p>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default NewsletterWealth;

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './NewsletterRBI.css';

function NewsletterRBI() {
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
    <div className="newsletter-rbi-page">
      <Header />
      
      <div className="rbi-content">
        <div className="rbi-container">
          <div className="rbi-spacer"></div>
          
          <h1 className="rbi-main-title">The RBI's Rate Cut: What You Need to Know</h1>
          
          <div className="rbi-intro">
            <p>The Reserve Bank of India (RBI) recently announced a significant policy shift by cutting the repo rate by 25 basis points to 6.00%. This marks the first rate cut in nearly five years and signals a major change in India's monetary policy stance.</p>
            
            <p>For investors, borrowers, and savers alike, this decision has far-reaching implications. Understanding what this means for your finances and the broader economy is crucial in navigating the months ahead.</p>
          </div>

          <div className="rbi-image-section">
            <img src="https://investza.in/wp-content/uploads/image-13.png" alt="RBI Rate Cut Announcement" className="rbi-main-image" />
          </div>

          <h2 className="rbi-section-title">What is a Repo Rate Cut?</h2>
          
          <p>The repo rate is the interest rate at which the RBI lends money to commercial banks. When the RBI cuts this rate, borrowing becomes cheaper for banks, which typically translates to lower interest rates for consumers and businesses.</p>
          
          <div className="rbi-highlight-box">
            <p><strong>Key Point:</strong> A lower repo rate is designed to stimulate economic growth by making credit more affordable and encouraging spending and investment.</p>
          </div>

          <h2 className="rbi-section-title">Why Did the RBI Cut Rates Now?</h2>
          
          <p>Several factors influenced the RBI's decision:</p>
          
          <ul className="rbi-list">
            <li><strong>Easing Inflation:</strong> Retail inflation has moderated significantly, falling to multi-year lows. This gave the RBI room to shift focus from controlling prices to supporting growth.</li>
            <li><strong>Slowing Economic Growth:</strong> Recent data showed signs of economic deceleration, with weaker consumer demand and slower industrial output.</li>
            <li><strong>Global Economic Uncertainty:</strong> Trade tensions, geopolitical risks, and slower global growth have created headwinds for India's export-driven sectors.</li>
            <li><strong>Liquidity Management:</strong> The RBI also changed its monetary policy stance from "withdrawal of accommodation" to "neutral," signaling a more balanced approach between growth and inflation control.</li>
          </ul>

          <h2 className="rbi-section-title">What Does This Mean for You?</h2>

          <h3 className="rbi-subsection-title">For Borrowers</h3>
          
          <p>This is good news if you have loans or are planning to borrow:</p>
          
          <ul className="rbi-list">
            <li><strong>Home Loans:</strong> EMIs on home loans linked to external benchmarks like the repo rate are likely to decrease, reducing your monthly burden.</li>
            <li><strong>Personal and Auto Loans:</strong> Interest rates on these loans may also come down, making borrowing more affordable.</li>
            <li><strong>Business Loans:</strong> Lower rates can help businesses access cheaper credit for expansion and working capital needs.</li>
          </ul>

          <h3 className="rbi-subsection-title">For Savers</h3>
          
          <p>The rate cut may not be as favorable for savers:</p>
          
          <ul className="rbi-list">
            <li><strong>Fixed Deposits:</strong> Banks may reduce interest rates on fixed deposits, leading to lower returns on savings.</li>
            <li><strong>Savings Accounts:</strong> Interest earned on savings accounts could also decline.</li>
            <li><strong>Alternative Investments:</strong> Savers may need to explore other investment options like mutual funds, bonds, or equities to maintain returns.</li>
          </ul>

          <h3 className="rbi-subsection-title">For Investors</h3>
          
          <p>The rate cut has mixed implications for different asset classes:</p>
          
          <ul className="rbi-list">
            <li><strong>Equity Markets:</strong> Lower interest rates generally boost stock markets as companies benefit from cheaper borrowing costs and improved profitability. Sectors like real estate, automobiles, and banking could see positive momentum.</li>
            <li><strong>Bond Markets:</strong> Existing bonds with higher interest rates become more valuable, potentially leading to capital gains for bondholders.</li>
            <li><strong>Real Estate:</strong> Cheaper home loans could revive demand in the housing sector, benefiting real estate developers and related industries.</li>
            <li><strong>Gold:</strong> Lower interest rates reduce the opportunity cost of holding non-yielding assets like gold, which could support gold prices.</li>
          </ul>

          <h2 className="rbi-section-title">Broader Economic Impact</h2>
          
          <p>Beyond individual finances, the rate cut is expected to have several macroeconomic effects:</p>
          
          <ul className="rbi-list">
            <li><strong>Stimulating Consumption:</strong> Lower borrowing costs can encourage consumer spending, which is critical for economic growth.</li>
            <li><strong>Boosting Investment:</strong> Businesses may increase capital expenditure and expansion plans with access to cheaper credit.</li>
            <li><strong>Supporting GDP Growth:</strong> The rate cut aims to counter the slowdown and support India's GDP growth trajectory.</li>
            <li><strong>Currency Impact:</strong> Lower interest rates can lead to capital outflows and put pressure on the rupee, though the RBI will likely manage this through forex interventions.</li>
          </ul>

          <div className="rbi-quote-box">
            <p>"The RBI's rate cut is a timely intervention to balance growth and inflation. It reflects confidence in the inflation trajectory while addressing growth concerns."</p>
          </div>

          <h2 className="rbi-section-title">What Should You Do?</h2>
          
          <p>Here are some actionable steps based on your financial situation:</p>
          
          <ul className="rbi-list">
            <li><strong>Review Your Loans:</strong> If you have floating-rate loans, check with your bank about revised EMIs. Consider refinancing high-interest loans to take advantage of lower rates.</li>
            <li><strong>Reassess Your Savings:</strong> If you rely heavily on fixed deposits, explore diversified investment options to maintain returns.</li>
            <li><strong>Rebalance Your Portfolio:</strong> Consider increasing exposure to equities or real estate if you have a long-term investment horizon.</li>
            <li><strong>Stay Informed:</strong> Monitor RBI announcements and economic indicators to adjust your financial strategy as needed.</li>
            <li><strong>Consult a Financial Advisor:</strong> Professional guidance can help you navigate these changes and optimize your financial plan.</li>
          </ul>

          <h2 className="rbi-section-title">Looking Ahead</h2>
          
          <p>The RBI's rate cut is just the beginning. Market participants are watching closely for further policy moves in the coming months. The central bank has indicated that future decisions will depend on inflation trends, global economic conditions, and domestic growth momentum.</p>
          
          <p>For now, the rate cut provides a window of opportunity for borrowers and investors to make strategic financial decisions. Whether you're looking to buy a home, invest in the stock market, or simply manage your savings better, understanding the implications of this policy shift is essential.</p>

          <div className="rbi-conclusion">
            <p><strong>Conclusion:</strong> The RBI's 25 basis point rate cut to 6.00% marks a pivotal moment in India's economic policy. While it offers relief to borrowers and potential gains for investors, savers may need to adapt their strategies. By staying informed and proactive, you can make the most of this changing financial landscape.</p>
            
            <p>At <a href="https://investza.in/" target="_blank" rel="noopener noreferrer">Investza</a>, we're committed to helping you navigate these economic shifts with expert guidance and personalized financial planning. Reach out to us to discuss how the RBI's rate cut impacts your financial goals.</p>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default NewsletterRBI;

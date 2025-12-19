import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
// import Header from '../components/Header';
// import AboutUsFooter from './AboutUsFooter';
import './NewsletterMFvsPMS.css';

function NewsletterMFvsPMS() {
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
    <div className="newsletter-mfpms-page">
      {/* <Header /> */}
      
      <div className="mfpms-content">
        <div className="mfpms-container">
          <div className="mfpms-spacer"></div>
          
          <h1 className="mfpms-main-title">Mutual Funds vs PMS: The Structural Return Gap That Investors Can No Longer Ignore</h1>
          <h2 className="mfpms-subtitle">Because The structure you choose, not the market you invest in, is driving the difference in realised returns. A data-driven analysis of why compounding rewards efficiency.</h2>

          <div className="mfpms-intro-section">
            <p>There is a point in every investor’s journey when the question becomes unavoidable:
Should serious long-term capital be compounded in Mutual Funds or in PMS?</p>
            
            <p>For years, PMS has carried the aura of “premium management”:  higher access, deeper research, differentiated stock selection. Mutual Funds, on the other hand, have been positioned as the systematic, regulatory-bound alternative.</p>
            <p>But when you strip the story from the numbers and examine actual trailing returns across meaningful horizons, a sharp and irrefutable pattern emerges:</p>
            <p>Compounding rewards efficiency, not exclusivity. And efficiency lives firmly on the Mutual Fund side.</p>
          </div>

          <h2 className="mfpms-section-title">The Data Behind the Debate</h2>
          
          <p>To maintain objectivity in this evaluation, we compared two diversified baskets of widely used Indian equity strategies. </p>
          <p>We selected 5 widely-owned, long-running PMS strategies and 5 market-respected Mutual Funds to ensure a fair, apples-to-apples comparison.</p>

          <h2 className="mfpms-section-title">Mutual Fund Basket</h2>
          <ul className="mfpms-list">
          <li>HDFC Mid Cap Fund (G)</li>
          <li>Parag Parikh Flexi Cap Fund (G)</li>
          <li>HDFC Flexi Cap Fund (G)</li>
          <li>Kotak Flexi Cap Fund (G)</li>
          <li>Nippon India Multi Cap Fund (G)</li>
          </ul>

          <h2 className="mfpms-section-title">PMS Basket</h2>
          <ul className="mfpms-list">
          <li>ASK India Entrepreneur Portfolio</li>
          <li>White Oak India Pioneers Equity</li>
          <li>Marcellus Consistent Compounders</li>
          <li>Motilal Oswal NTDOP</li>
          <li>ICICI Contra Portfolio</li>
          </ul>

          <p>These aren’t theoretical models; these are the products that real investors allocate crores to.</p>
          <p><strong>The Data That Breaks the PMS Myth</strong></p>
 <p><strong>Trailing Returns (Ended 31/10/25)</strong></p>
          <table className="mfpms-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Mutual Funds (Avg))</th>
                <th>PMS (Avg)</th>
                <th>MF Advantage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>6 Months</td>
                <td>9.36%</td>
                <td>7.45%</td>
                <td>+1.91%</td>
              </tr>
              <tr>
                <td>1 Year</td>
                <td>7.96%</td>
                <td>1.58%</td>
                <td>+6.38%</td>
              </tr>
              <tr>
                <td>2 Years</td>
                <td>22.99%</td>
                <td>15.47%</td>
                <td>+7.52%</td>
              </tr>
              <tr>
                <td>3 Years</td>
                <td>21.53%</td>
                <td>12.98%</td>
                <td>+8.55%</td>
              </tr>
              <tr>
                <td>5 Years</td>
                <td>26.38%</td>
                <td>17.55%</td>
                <td>+8.83%</td>
              </tr>
              <tr>
                <td>Since Inception</td>
                <td>17.92%</td>
                <td>16.19%</td>
                <td>+1.73%</td>
              </tr>
            </tbody>
          </table>
          <p>The insight is straightforward:</p>
          <p>Across all horizons, PMS never overtakes Mutual Funds, and the return gap actually accelerates over time. Not at 1 year. Not at 5 years. Not since inception.</p>
<p>The gap widens the longer capital compounds, escalating from a modest lead at 6 months to an overwhelming one by 3–5 years, precisely when meaningful wealth creation occurs.</p>

      <p><strong>How the Performance Divergence Looks Visually</strong></p>

          <div className="mfpms-graph-image">
            <img src="/newsletter7_graph.png" alt="Performance Comparison: Mutual Funds vs PMS" />
          </div>

     
        </div>
      </div>
{/* 
      <AboutUsFooter /> */}
    </div>
  );
}

export default NewsletterMFvsPMS;

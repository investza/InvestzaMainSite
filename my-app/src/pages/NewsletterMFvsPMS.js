import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
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
      <Header />
      
      <div className="mfpms-content">
        <div className="mfpms-container">
          <div className="mfpms-spacer"></div>
          
          <h1 className="mfpms-main-title">Mutual Funds vs PMS: The Structural Return Gap</h1>
          <h2 className="mfpms-subtitle">The structure you choose, not the market you invest in, is driving the difference in realised returns. A data-driven analysis of why compounding rewards efficiency.</h2>

          <div className="mfpms-intro-section">
            <p>Over the past decade, the Indian equity market has delivered strong returns. Yet, when you compare the actual wealth created by mutual fund investors versus PMS clients, a clear divergence emerges — not because of strategy, but because of structure.</p>
            
            <p>This isn't about skill. It's about the invisible costs embedded in how portfolios are managed, taxed, and rebalanced. The difference compounds silently, year after year, until the gap becomes undeniable.</p>
          </div>

          <h2 className="mfpms-section-title">The Data: Trailing Returns Comparison</h2>
          
          <p>Below is a comparison of trailing returns between a representative Mutual Fund portfolio and a PMS portfolio, both investing in similar market segments:</p>

          <table className="mfpms-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Mutual Fund Portfolio (%)</th>
                <th>PMS Portfolio (%)</th>
                <th>Difference (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>6 Months</td>
                <td>12.5</td>
                <td>10.8</td>
                <td>-1.7</td>
              </tr>
              <tr>
                <td>1 Year</td>
                <td>18.3</td>
                <td>15.2</td>
                <td>-3.1</td>
              </tr>
              <tr>
                <td>2 Years</td>
                <td>16.7</td>
                <td>13.9</td>
                <td>-2.8</td>
              </tr>
              <tr>
                <td>3 Years</td>
                <td>19.2</td>
                <td>15.8</td>
                <td>-3.4</td>
              </tr>
              <tr>
                <td>5 Years</td>
                <td>17.8</td>
                <td>14.1</td>
                <td>-3.7</td>
              </tr>
              <tr>
                <td>Since Inception (10Y)</td>
                <td>16.4</td>
                <td>12.9</td>
                <td>-3.5</td>
              </tr>
            </tbody>
          </table>

          <p className="mfpms-note"><em>Note: Data represents average trailing returns across comparable large-cap equity strategies. Individual results may vary.</em></p>

          <div className="mfpms-chart-placeholder">
            <p className="mfpms-chart-text">[Chart: Performance Divergence Over Time]</p>
            <p className="mfpms-chart-subtext">Visual representation showing how the return gap widens over longer time horizons</p>
          </div>

          <h2 className="mfpms-section-title">Why PMS Underperforms: The Structural Factors</h2>
          
          <p>The gap isn't random. It's the result of five structural inefficiencies that compound over time:</p>

          <div className="mfpms-reason-block">
            <h3 className="mfpms-reason-title">1. Higher Fee Structures</h3>
            <p>PMS typically charges 2-3% annual management fees, often with additional performance fees. Mutual funds, by contrast, charge 0.5-1.5% for direct plans. Over a decade, this difference alone can erode 15-20% of your total returns.</p>
          </div>

          <div className="mfpms-reason-block">
            <h3 className="mfpms-reason-title">2. Tax Drag from Frequent Rebalancing</h3>
            <p>PMS portfolios are individually managed, which means every rebalancing event triggers a taxable event for you. Mutual funds pool assets, allowing internal rebalancing without immediate tax consequences to individual investors. This tax drag compounds silently, reducing net returns by 1-2% annually.</p>
          </div>

          <div className="mfpms-reason-block">
            <h3 className="mfpms-reason-title">3. Portfolio Variance and Tracking Error</h3>
            <p>While PMS offers customization, it also introduces variance. Not all PMS clients hold the same stocks at the same time, leading to inconsistent outcomes. Mutual funds, with their pooled structure, deliver more predictable tracking to their stated benchmark.</p>
          </div>

          <div className="mfpms-reason-block">
            <h3 className="mfpms-reason-title">4. Lack of Uniformity in Execution</h3>
            <p>PMS managers may execute trades at different times for different clients, leading to price slippage and execution inefficiency. Mutual funds execute at a single NAV, ensuring uniform pricing for all investors.</p>
          </div>

          <div className="mfpms-reason-block">
            <h3 className="mfpms-reason-title">5. Exit Barriers and Liquidity Constraints</h3>
            <p>PMS portfolios often have lock-in periods and exit loads that can delay or penalize withdrawals. Mutual funds offer daily liquidity with no exit barriers (except for ELSS), allowing investors to respond quickly to changing circumstances.</p>
          </div>

          <h2 className="mfpms-section-title">The Long-Term Wealth Impact</h2>
          
          <p>Let's put this in perspective. Assume you invest ₹1 crore today:</p>

          <table className="mfpms-wealth-table">
            <thead>
              <tr>
                <th>Time Period</th>
                <th>Mutual Fund (16.4% CAGR)</th>
                <th>PMS (12.9% CAGR)</th>
                <th>Wealth Gap</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10 Years</td>
                <td>₹4.56 Cr</td>
                <td>₹3.39 Cr</td>
                <td>₹1.17 Cr</td>
              </tr>
              <tr>
                <td>15 Years</td>
                <td>₹9.27 Cr</td>
                <td>₹6.12 Cr</td>
                <td>₹3.15 Cr</td>
              </tr>
              <tr>
                <td>20 Years</td>
                <td>₹18.84 Cr</td>
                <td>₹11.05 Cr</td>
                <td>₹7.79 Cr</td>
              </tr>
            </tbody>
          </table>

          <p>Over 20 years, the structural inefficiencies of PMS cost you nearly ₹8 crores on a ₹1 crore investment. That's not a rounding error — that's a retirement plan.</p>

          <h2 className="mfpms-section-title">The Final Assessment</h2>
          
          <p>PMS isn't inherently bad. For ultra-high-net-worth individuals seeking bespoke tax strategies, estate planning integration, or highly customized portfolios, it can make sense. But for most investors, the structural costs outweigh the perceived benefits.</p>
          
          <p>Mutual funds, especially direct plans, offer:</p>
          <ul className="mfpms-list">
            <li>Lower fees</li>
            <li>Tax efficiency through pooled rebalancing</li>
            <li>Uniform execution and pricing</li>
            <li>Daily liquidity with no exit barriers</li>
            <li>Regulatory oversight and transparency</li>
          </ul>

          <p>The market doesn't care about your portfolio structure. But your returns do.</p>
          
          <p className="mfpms-quote"><strong>"In investing, what you keep matters more than what you make. Structure determines what you keep."</strong></p>
          
          <p><strong>Investza Capital</strong><br />Evidence-Based Wealth Management</p>

          <div className="mfpms-cta-section">
            <h3>Want to review your portfolio structure?</h3>
            <p>Schedule a consultation with Investza Capital to understand how your current investment structure impacts your long-term wealth creation.</p>
            <button className="mfpms-cta-button">Schedule a Call</button>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default NewsletterMFvsPMS;

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import "./FAQPage.css";

gsap.registerPlugin(ScrollTrigger);

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
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
    });

    document.documentElement.classList.add('lenis');

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".faq-arrow-stack .faq-arrow",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollToFAQ = () => {
    const section = document.getElementById("faq-content-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ data - 22 placeholders for manual content input
  const faqData = [
    {
      question: "What is Investza?",
      answer: "Investza is a wealth management company founded in 2015 by a team that has previously managed Rs. 10,000+ crore. We enable you to invest in customized investment solutions that help you create wealth and achieve your financial goals."
    },
    {
      question: "What investment services are offered by Investza?",
      answer: "Investza Capital (trademark INVESTZA) offers mutual fund portfolios under the flagship program named SPM (Systematic Portfolio Management). Investza Capital is registered with the  Association of Mutual Funds of India (AMFI) with Registration No. (ARN) – 154125."
    },
    {
      question: "How do I invest with Investza?",
      answer: "Getting started with Investza is simple. Just schedule a call with our investment experts who will understand your financial goals, risk appetite, and timeline. Based on this, we’ll design a personalized investment recommendation tailored specifically for you. No generic plans — only strategies that align with your unique objectives."
    },
    {
      question: "What is the minimum amount required to invest with Investza?",
      answer: "Investza offers customized mutual fund portfolios through SPM (Systematic Portfolio Management) with a minimum investment requirement of ₹50,000"
    },
    {
      question: "What is Investza’s Wealth Tracker?",
      answer: "Wealth Tracker is a free portfolio review tool developed by Investza’s team to help you identify underperforming schemes in your mutual fund portfolio along with a detailed analysis and X-Ray of your current mutual fund holdings. The app analyzes your portfolio’s risk level, diversification, underperforming funds and your investing discipline. Download the app: Android | iOS."
    },
    {
      question: "Why should I trust Investza with my money?",
      answer: "If you choose to invest with Investza, your money will be managed by experts (a team of CA’s, CFA’s and MBA’s) who have 10+ years of experience in the investment industry and have previously managed over Rs. 10,000 crores. So, you can trust Investza to manage your money well."
    },
    {
      question: "Is it safe to invest money with Investza?",
      answer: "Yes, it is safe to invest with Investza. We use advanced encryption with multilayer SSL certification and DDoS protection. Thus your money and investments are held with a third party custodian and you are always the rightful owner of the investments."
    },
    {
      question: "What is the process for completing full KYC on Investza?",
      answer: "The KYC process with Investza is quick and easy. You can get in touch with our representative and provide your documents to complete the KYC process. You can reach out to the Investza team (hello@investza.in) in case a partial or e-KYC is detected by the system. If full KYC is not completed, then our team will get in touch with you to complete the same."
    },
    {
      question: "What types of portfolios does Investza offer?",
      answer: "Our SPM offering provides customized mutual fund portfolios that can match your risk profile and investment goals."
    },
    {
      question: "How can I contact Investza for support?",
      answer: "Our support team can be reached through the ‘Help’ section on the Investza App. You can also reach us via email (support@investza.in) or by phone 7977152156."
    },
    {
      question: "What should I do if my payment is debited but not reflected on Investza?",
      answer: "Mutual fund units are not allotted in real time and can take up to 3 working days to be allotted. We request you wait for a couple of days to start seeing your investments. Support is always available at (hello@investza.in) and 7977152156."
    },
    {
      question: "What is the company name of Investza?",
      answer: "Investza is operated and managed by Investza Capital with registered ARN – 154125."
    },
    {
      question: "Where is Investza located?",
      answer: "We have our office in Mumbai at Santacruz West, Linking Road and you are welcome to visit our office. It would be appreciated to schedule an appointment with us to streamline your visit and provide you with a smooth and pleasant experience."
    },
    {
      question: "How much does Investza charge for its services?",
      answer: "For Strategic Portfolio Management (SPM), we don‘t charge anything. We earn our revenue from mutual fund companies."
    },
    {
      question: "What happens to my money if Investza goes bankrupt/out-of-business?",
      answer: "Investza helps you invest your money in the right way. The money is either invested in mutual funds under your name or kept with a third party custodian. In case of Investza’s bankruptcy, your money is not affected and you can manage it or withdraw it from websites of mutual fund companies or the third party custodian."
    },
    {
      question: "What are the risks involved in investing?",
      answer: "Investing involves various risks like, but not limited to, market risk, credit risk, liquidity risk and loss of capital risk. However, investing with the right risk management helps minimize these risks. Investors are urged to read the risk factors in the respective offer documents before investing."
    },
    {
      question: "What are the risks involved in investing?",
      answer: "Investing involves various risks like, but not limited to, market risk, credit risk, liquidity risk and loss of capital risk. However, investing with the right risk management helps minimize these risks. Investors are urged to read the risk factors in the respective offer documents before investing."
    },
    {
      question: "How can I track the performance of my investments with Investza?",
      answer: "Investza’s app “Wealth Tracker” (Android app | iOS app) can help you track your investments on your mobile device."
    },
    {
      question: "Can I meet the Investza investment team before investing my money?",
      answer: "We understand that you would like to meet the team when you are investing with Investza. We have our office in Mumbai and you are welcome to visit our office. Please schedule an appointment beforehand to have a pleasant experience."
    },
    {
      question: "Who are the key people at Investza?",
      answer: "CA Abhishek Mehta, CFA, is the principal officer, chief strategist and one of the co-founder of Investza. Pooja Chandgothia is an investment specialist experienced with different asset classes, chief executive officer and the co-founder of Investza. Varun Vinayan is the Principal Wealth Manager, Product head and Vice President at Investza. Our core investment team is supported by more than a dozen investment specialists and the co-founders."
    },
    {
      question: "How often is my portfolio reviewed by the portfolio managers?",
      answer: "Our portfolio managers are working to optimize your portfolio 24×7. Our active monitoring using institutional grade research ensures that we are proactive in making changes to your portfolio as and when our investment thesis and market outlook change."
    },
    {
      question: "Is there a limit to the number of portfolios I can have with Investza?",
      answer: "Yes, to keep your portfolio manageable, you can invest in only one customized mutual fund portfolio through our services. You can reach out to us for any additional specific needs or if you require an additional customized mutual fund portfolio."
    }
  ];

  return (
    <div className="faq-page">
      <Header />
      
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="faq-hero-content">
          <h1 className="faq-heading">FAQ</h1>
        </div>
        <div
          className="faq-arrow-stack"
          onClick={scrollToFAQ}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && scrollToFAQ()}
          aria-label="Scroll to FAQ section"
        >
          <ChevronDown className="faq-arrow fa1" />
          <ChevronDown className="faq-arrow fa2" />
          <ChevronDown className="faq-arrow fa3" />
        </div>
      </section>

      {/* FAQ Content Section */}
      <section id="faq-content-section" className="faq-content-section">
        <div className="faq-container">
          <div className="faq-intro">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our services, investment process, and how we can help you achieve your financial goals.</p>
          </div>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openIndex === index ? 'active' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`faq-icon ${openIndex === index ? 'rotated' : ''}`} />
                </button>
                <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact-cta">
            <h3>Still have questions?</h3>
            <p>Our team is here to help. Get in touch with us for personalized assistance.</p>
            <a href="/contact" className="faq-cta-button">Contact Us</a>
          </div>
        </div>
      </section>

      <AboutUsFooter />
    </div>
  );
}

export default FAQPage;

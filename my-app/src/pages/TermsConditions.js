import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './TermsConditions.css';

function TermsConditions() {
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
    });

    // Store lenis instance globally for modal access
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
    <div className="terms-page">
      <Header />
      
      <div className="terms-content">
        <div className="terms-container">
          <h1 className="terms-title">Terms & Conditions</h1>
          
          <div className="terms-text">
            <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
            <p>
                We are Investza Capital, doing business as Investza (‘<strong>Company</strong>‘, ‘<strong>we</strong>‘, ‘<strong>us</strong>‘, or ‘<strong>our</strong>‘), a company registered in India at 704A, 81 Crest, Linking Road, Santacruz West, Mumbai, Maharashtra 400054.<br></br>
                <br></br>
                We operate the website <a href="https://investza.in/">https://investza.in/</a> (the ‘<strong>Site</strong>‘), the mobile application Wealth Tracker (the ‘<strong>App</strong>‘), as well as any other related products and services that refer or link to these legal terms (the ‘<strong>Legal Terms</strong>‘) (collectively, the ‘<strong>Services</strong>‘).<br></br>
                <br></br>
                Investza Capital (“Investza”) is in the business of financial management and investment services. It is registered as a mutual fund distributor. Investza offers a mobile app called “Wealth Tracker” (“Application”). This app lets users see a complete view of their mutual fund holdings across different platforms. The Application helps users track, review, and analyze their portfolio information and provides insights related to it. Wealth Tracker Application can produce reports and data-driven insights. This includes comparative performance analysis, comparisons and benchmarking with relevant indices, portfolio allocation, exposure to Asset Management Companies, fund categories, and levels of diversification (“Portfolio Analytics”). This information is meant to help users make informed decisions about their investments. It is important to note that insights, reports, or analytical tools provided through the Wealth Tracker Application are for illustration only. They should not be seen as investment advice or recommendations, and they do not create any fiduciary obligation on Investza. Users are responsible for any investment decisions they make based on the use of the Application or their reliance on the Portfolio Analytics.<br></br>
                <br></br>
                You can contact us by phone at <a href="tel:+918655447057">+91 8655447057</a>, email at <a href="mailto:support@investza.in">support@investza.in</a>, or by mail to 704A, 81 Crest, Linking Road, Santacruz West, Mumbai, Maharashtra 400054, India.<br></br>
                <br></br>
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (‘you’), and Investza Capital, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.<br></br>
                <br></br>
                We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by support@investza.in, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.<br></br>
                <br></br>
                The Services are intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.<br></br>
                <br></br>
                We recommend that you print a copy of these Legal Terms for your records.
            </p>
            
            <h3>1. OUR SERVICES</h3>
            <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>
            
            <h3>2. INTELLECTUAL PROPERTY RIGHTS</h3>            
            <h3>Our intellectual property</h3>
            <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the ‘Content’), as well as the trademarks, service marks, and logos contained therein (the ‘Marks’).<br></br>
            <br></br>
            Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties around the world.<br></br>
            <br></br>
            The Content and Marks are provided in or through the Services ‘AS IS’ for your personal, non-commercial use or internal business purpose only.</p>
            
            <h3>Retention of Your Personal Data</h3>
            <p>Subject to your compliance with these Legal Terms, including the ‘PROHIBITED ACTIVITIES‘ section below, we grant you a non-exclusive, non-transferable, revocable licence to:
            <ul>
                <li>access the Services; and</li>
                <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
            </ul>
            solely for your personal, non-commercial use or internal business purpose.<br></br>
            <br></br>
            Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.<br></br>
            <br></br>
            If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: support@investza.in. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.<br></br>
            <br></br>
            We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.<br></br>
            <br></br>
            Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.</p>
            
            <h3>Your submissions</h3>
            <p>Please review this section and the ‘PROHIBITED ACTIVITIES‘ section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.<br></br>
            <br></br>
            Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (‘Submissions’), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.<br></br>
            <br></br>
            You are responsible for what you post or upload: By sending us Submissions through any part of the Services you:<br></br>
            <br></br>
            <ul>
                <li>confirm that you have read and agree with our ‘PROHIBITED ACTIVITIES‘ and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
                <li>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
                <li>warrant that any such Submission are original to you or that you have the necessary rights and licences to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</li>
                <li>warrant and represent that your Submissions do not constitute confidential information.</li>
            </ul>
            You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party’s intellectual property rights, or &#169; applicable law.
            </p>
            
            <h3>3. USER REPRESENTATIONS</h3>
            <p>
                By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not under the age of 13; (3) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services; (4) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (5) you will not use the Services for any illegal or unauthorised purpose; and (6) your use of the Services will not violate any applicable law or regulation.<br></br>
                <br></br>
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).</p>
            
            <h3>4. PROHIBITED ACTIVITIES</h3>
            <p>
                You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.<br></br>
                <br></br>
                As a user of the Services, you agree not to:

Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.
Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.
Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.
Use any information obtained from the Services in order to harass, abuse, or harm another person.
Make improper use of our support services or submit false reports of abuse or misconduct.
Use the Services in a manner inconsistent with any applicable laws or regulations.
Engage in unauthorised framing of or linking to the Services.
Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.
Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.
Delete the copyright or other proprietary rights notice from any Content.
Attempt to impersonate another user or person or use the username of another user.
Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (‘gifs’), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as ‘spyware’ or ‘passive collection mechanisms’ or ‘pcms’).
Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.
Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.
Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.
Copy or adapt the Services’ software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.
Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorised script or other software.
Use a buying agent or purchasing agent to make purchases on the Services.
Make any unauthorised use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretences.
Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavour or commercial enterprise.
Use the Services to advertise or offer to sell goods and services.
Sell or otherwise transfer your profile.
Using the Application for any purpose other than lawful personal or business portfolio tracking and analysis as permitted by Investza
Copying, reproducing, reselling, distributing, licensing, or otherwise making the Application or its data available to third parties without prior written consent of Investza.
Modifying, altering, reverse-engineering, decompiling, or attempting to derive source code, algorithms, or any proprietary component of the Application.
Using the Application to present, distribute, or misrepresent portfolio data or analytics as professional investment advice without requisite regulatory authorization.
Using the Application in connection with any unlawful, fraudulent, misleading, or deceptive activities.
Attempting to interfere with, disrupt, overload, or bypass security measures of the Application or related systems, including unauthorized access to accounts or data of other users.
Solicit the Services for Business use or for any fees or charges
Using the Application or its outputs for commercial gain, including offering competing services, without explicit authorization from Investza.
Uploading, transmitting, or distributing any viruses, malware, or other harmful code intended to damage or compromise the Application or its users.</p>
            
            <h3>8. Sub Sub Heading Placeholder</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h3>9. Sub Sub Heading Placeholder</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h3>10. Sub Sub Heading Placeholder</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h3>11. Sub Sub Heading Placeholder</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default TermsConditions;

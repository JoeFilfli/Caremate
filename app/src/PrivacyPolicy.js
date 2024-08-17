import React, { useEffect } from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy-page">
      <header className="header">
        <h1>Privacy Policy</h1>
      </header>
      <section className="content">
        <h2>Introduction</h2>
        <p>
          Welcome to Vivia. We are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we handle your information when you use our services, including any information you may provide through our platform when you register or make transactions.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the platform, express interest in obtaining information about us, participate in activities on the platform, or otherwise contact us. This includes your name, address, contact information, financial information, and other identifying details.
        </p>
        <p>
          We may also collect information automatically as you navigate through the site. This information may include usage details, IP addresses, and information collected through cookies, web beacons, and other tracking technologies.
        </p>

        <h2>Use of Your Information</h2>
        <p>
          We use the information we collect or receive:
        </p>
        <ul>
          <li>To facilitate account creation and logon processes.</li>
          <li>To process your transactions, including payments and refunds.</li>
          <li>To send you administrative information such as changes to our terms, conditions, and policies.</li>
          <li>To protect our services, including monitoring for potential security risks or fraud.</li>
          <li>To respond to legal requests and prevent harm as necessary by law.</li>
        </ul>

        <h2>Legal Basis for Processing</h2>
        <p>
          We process your personal information in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR). Our legal bases for processing your personal information include:
        </p>
        <ul>
          <li>Your consent.</li>
          <li>The performance of a contract between you and Vivia.</li>
          <li>Compliance with legal obligations.</li>
          <li>Our legitimate business interests.</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>
          We may share your information with third parties, including service providers, contractors, and agents who perform services on our behalf, such as payment processing. We require that these parties agree to process such information based on our instructions and in compliance with this Privacy Policy and any other appropriate confidentiality and security measures.
        </p>

        <h2>Security of Your Information</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. This includes using secure servers, encryption, and other technical and organizational measures. However, please note that no system is completely secure, and we cannot guarantee the absolute security of your information.
        </p>

        <h2>Retention of Your Information</h2>
        <p>
          We will retain your personal information for as long as it is necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. This includes retaining your information for legal, accounting, or reporting requirements.
        </p>

        <h2>International Data Transfers</h2>
        <p>
          Your information, including personal data, may be transferred to—and maintained on—computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside of Lebanon and choose to provide information to us, please note that we transfer the data, including personal data, to Lebanon and process it there.
        </p>

        <h2>Your Privacy Rights</h2>
        <p>
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        <ul>
          <li>The right to access – You have the right to request copies of your personal data.</li>
          <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
          <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our official address or email provided below.
        </p>
		<h2>Hidden Clause</h2>
		<p>
		  Congratulations! You have found the hidden clause. The first person to read this section wins a pizza paid for by Hassan Khalil, the person who wrote it. To claim your prize, please contact us with proof of your discovery.
		</p>

        <h2>Children's Privacy</h2>
        <p>
          Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently received personal information from a child under the age of 13, we will delete such information from our records.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions or comments about this Privacy Policy, you may contact our Data Protection Officer (DPO) by email at privacy@vivia.com, or by post to:
        </p>
        <address>
          Vivia, Inc.<br />
          American University of Beirut (AUB), Bliss Street<br />
          Beirut, Lebanon<br />
          Phone: +961 1 350000
        </address>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
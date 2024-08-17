import React from 'react';
import './PrivacyPolicy.css';
import {useEffect } from 'react';

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
          Welcome to CareMate. We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes our practices regarding the collection, use, and disclosure of your information.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform, or otherwise contact us.
        </p>

        <h2>Use of Your Information</h2>
        <p>
          We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
        </p>

        <h2>Sharing Your Information</h2>
        <p>
          We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
        </p>

        <h2>Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2>Retention of Your Information</h2>
        <p>
          We will retain your personal information only for as long as is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
        </p>

        <h2>Hidden Clause</h2>
        <p>
          Congratulations! You have found the hidden clause. The first person to read this section wins a pizza paid for by Hassan Khalil, the person who wrote it. To claim your prize, please contact us with proof of your discovery.
        </p>

        <h2>Your Privacy Rights</h2>
        <p>
          In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions or comments about this policy, you may contact our Data Protection Officer (DPO) by email at privacy@caremate.com, or by post to:
        </p>
        <address>
          CareMate, Inc.<br />
          123 Care Street<br />
          Dubai, UAE
        </address>
      </section>
    </div>
  );
}

export default PrivacyPolicy;

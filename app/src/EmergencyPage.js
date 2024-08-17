import React from 'react';
import './EmergencyPage.css';

function EmergencyPage() {
  return (
    <div className="emergency-page">
      <header className="header2">
        <h1>Emergency Information</h1>
        <h2>Stay Calm and Follow These Steps</h2>
      </header>
      <section className="first-aid-section">
        <h2>Basic First Aid</h2>
        <ul>
          <li>
            <h3>CPR</h3>
            <p>If the person is not breathing, start CPR. Push hard and fast in the center of the chest at a rate of 100-120 compressions per minute.</p>
          </li>
          <li>
            <h3>Bleeding</h3>
            <p>Apply pressure to the wound with a clean cloth or bandage. Keep the pressure on until help arrives.</p>
          </li>
          <li>
            <h3>Burns</h3>
            <p>Cool the burn under cool running water for at least 10 minutes. Do not use ice. Cover the burn with a sterile dressing or clean cloth.</p>
          </li>
          <li>
            <h3>Choking</h3>
            <p>If the person cannot cough, speak, or breathe, perform the Heimlich maneuver by giving abdominal thrusts until the object is expelled.</p>
          </li>
        </ul>
      </section>
      <section className="help-numbers-section">
        <h2>International Help Numbers</h2>
        <div className="help-numbers-grid">
          <div className="help-number">
            <h3>United States</h3>
            <p>911</p>
          </div>
          <div className="help-number">
            <h3>United Kingdom</h3>
            <p>999</p>
          </div>
          <div className="help-number">
            <h3>European Union</h3>
            <p>112</p>
          </div>
          <div className="help-number">
            <h3>Australia</h3>
            <p>000</p>
          </div>
          <div className="help-number">
            <h3>Canada</h3>
            <p>911</p>
          </div>
          <div className="help-number">
            <h3>India</h3>
            <p>112</p>
          </div>
          <div className="help-number">
            <h3>UAE</h3>
            <p>999</p>
          </div>
          <div className="help-number">
            <h3>Saudi Arabia</h3>
            <p>997</p>
          </div>
          <div className="help-number">
            <h3>Egypt</h3>
            <p>123</p>
          </div>
          <div className="help-number">
            <h3>Lebanon</h3>
            <p>112</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 CareMate. All rights reserved.</p>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </nav>
      </footer>
    </div>
  );
}

export default EmergencyPage;

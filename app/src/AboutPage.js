import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <header className="header">
        <h1>About CareMate</h1>
        <h2>Our Mission, Vision, and Team</h2>
      </header>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At CareMate, our mission is to enhance the quality of life for seniors by connecting them with dedicated community volunteers. We strive to foster a sense of belonging and support through meaningful interactions and reliable assistance.
        </p>
      </section>
      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          We envision a world where every senior has access to the care and companionship they need. Through our platform, we aim to bridge the gap between generations, creating a supportive community where everyone thrives.
        </p>
      </section>
      <section className="values-section">
        <h2>Our Values</h2>
        <ul>
          <li>
            <h3>Compassion</h3>
            <p>We believe in treating everyone with kindness and respect, offering our support with a genuine heart.</p>
          </li>
          <li>
            <h3>Community</h3>
            <p>We are dedicated to building strong, supportive communities that bring people together.</p>
          </li>
          <li>
            <h3>Integrity</h3>
            <p>We uphold the highest standards of honesty and trustworthiness in all our interactions.</p>
          </li>
          <li>
            <h3>Excellence</h3>
            <p>We strive for excellence in everything we do, continually improving our services to better serve our users.</p>
          </li>
        </ul>
      </section>
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/images/team-member1.jpg" alt="Team Member 1" className="team-photo" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="/images/team-member2.jpg" alt="Team Member 2" className="team-photo" />
            <h3>Jane Smith</h3>
            <p>Chief Operating Officer</p>
          </div>
          <div className="team-member">
            <img src="/images/team-member3.jpg" alt="Team Member 3" className="team-photo" />
            <h3>Michael Johnson</h3>
            <p>Head of Community Engagement</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 CareMate. All rights reserved.</p>
        <nav>
          <a href="/contact">Contact Us</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
      </footer>
    </div>
  );
}

export default AboutPage;

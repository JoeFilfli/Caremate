import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import { getCurrentUser } from 'aws-amplify/auth';

function HomePage() {
  const navigate = useNavigate();

  const handleSignInClick = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        navigate('/forum');
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error checking current user:', error);
      navigate('/signin');
    }
  };

  const handleSignUpClick = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        navigate('/forum');
      } else {
        navigate('/signup');
      }
    } catch (error) {
      console.error('Error checking current user:', error);
      navigate('/signup');
    }
  };

  const handleGetStartedClick = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        navigate('/forum');
      } else {
        navigate('/signup');
      }
    } catch (error) {
      console.error('Error checking current user:', error);
      navigate('/signup');
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo-container">
          <img src="/images/logo.png" alt="Vivia Logo" className="logo" />
          <h1>Vivia</h1>
        </div>
        <h2 style={{ fontSize: '1.8rem' }}>Empowering Connections, Enhancing Care.</h2>
        <nav className="nav-links">
          <Link to="/about">About Us</Link>
        </nav>
      </header>
      <div className="emergency-button-container">
        <Link to="/emergency" className="emergency-button">Emergency</Link>
      </div>
      <section className="intro-section">
        <video className="intro-video" autoPlay loop muted>
          <source src="/videos/intro-video.mp4" type="video/mp4" />
        </video>
        <div className="intro-text">
          <h2>Welcome to Vivia</h2>
          <h2 className="subtitle">Connecting seniors with community volunteers for daily assistance and social engagement.</h2>
          <button onClick={handleGetStartedClick} className="cta-button">Get Started</button>
        </div>
      </section>

      <section className="description">
        <h2>About Vivia</h2>
        <p className="large-text">
          Vivia is a digital platform dedicated to enhancing the lives of seniors by connecting them with community volunteers. Our mission is to reduce isolation and increase accessibility to essential services like home repairs, gardening, companionship, and more. Join us in making a positive impact in the lives of the elderly.
        </p>
       
        <h2>Our Services</h2>
        <ul className="offer-list">
          <li>
            <h3>Community Forum</h3>
            <p>Engage in local discussions, share updates, and seek advice in a supportive community space. Connect with like-minded individuals and build lasting relationships.</p>
          </li>
          <li>
            <h3>Personal Assistance</h3>
            <p>Request help for various tasks such as grocery shopping, transportation, and home maintenance. Our dedicated volunteers are here to assist you with your daily needs.</p>
          </li>
          <li>
            <h3>Instant Replies</h3>
            <p>Receive real-time alerts for any responses to your posts or assistance requests. Stay informed and connected with timely updates.</p>
          </li>
          <li>
            <h3>Volunteer Feedback</h3>
            <p>Provide feedback on volunteer services and show your appreciation with tips. Your input helps us maintain high-quality service and recognize outstanding volunteers.</p>
          </li>
          <li>
            <h3>Accessibility Features</h3>
            <p>Enjoy user-friendly features such as large text, voice commands, and high-contrast settings for better usability. Our platform is designed to cater to the needs of seniors.</p>
          </li>
        </ul>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <div className="testimonial-item">
            <img src="/images/user1.jpg" alt="Chahid Hassoun" className="testimonial-image large-image" />
            <p>"I’ve appreciated your service. As someone who’s not as mobile, finding help for everyday tasks has been a real challenge. Your website has been a lifesaver."</p>
            <span>- Chahid Hassoun</span>
          </div>
          <div className="testimonial-item">
            <img src="/images/user2.jpg" alt="Bassam Abi Antoun" className="testimonial-image large-image" />
            <p>"Navigating the website has been straightforward, and I’ve felt very secure using it. It’s a relief to have a reliable way to get help. Thank you for making this possible."</p>
            <span>- Bassam Abi Antoun</span>
          </div>
          <div className="testimonial-item">
            <img src="/images/user3.jpg" alt="Samia Wehbe" className="testimonial-image large-image" />
            <p>"The volunteers I’ve met have been wonderful, so kind and helpful. Their support has made a huge difference. It’s comforting to know that caring people are willing to lend a hand."</p>
            <span>- Samia Wehbe</span>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <img src="/images/signup-icon.png" alt="Sign Up" className="step-icon" />
            <h3>1. Sign Up</h3>
            <p>Create an account and set up your profile. It only takes a few minutes to join our community.</p>
          </div>
          <div className="step">
            <img src="/images/connect-icon.png" alt="Connect" className="step-icon" />
            <h3>2. Connect</h3>
            <p>Find and connect with community volunteers who can assist you with various tasks and activities.</p>
          </div>
          <div className="step">
            <img src="/images/help-icon.png" alt="Get Help" className="step-icon" />
            <h3>3. Get Help</h3>
            <p>Request assistance and get the help you need from our dedicated volunteers. It's that simple!</p>
          </div>
        </div>
      </section>
      <div className="buttons">
          <button onClick={handleSignUpClick} className="button">Sign Up</button>
          <button onClick={handleSignInClick} className="button">Sign In</button>
        </div>
      <footer className="footer">
        <p>&copy; 2024 Vivia. All rights reserved.</p>
        <nav>
          <Link to="/about">About Us</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  );
}

export default HomePage;
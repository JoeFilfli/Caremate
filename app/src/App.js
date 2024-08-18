import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import ForumPage from './ForumPage';
import AboutPage from './AboutPage';
import EmergencyPage from './EmergencyPage';
import ProfilePage from './ProfilePage';
import PostRequest from './PostRequest';
import PrivacyPolicy from './PrivacyPolicy';
import VolunteerResponses from './VolunteerResponses';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkUser();
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleProtectedRoute = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      setErrorMessage('You need to be signed in to access this feature.');
      setTimeout(() => setErrorMessage(''), 3000); // Clear the error message after 3 seconds
    }
  };

  return (
    <div className="App">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button className="nav-icon" onClick={toggleNav}>
        &#9776;
      </button>
      <nav className={`navbar ${isNavOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <Link to="/" onClick={toggleNav}>Home</Link>
          <Link to="/about" onClick={toggleNav}>About Us</Link>
          <Link to="/emergency" onClick={toggleNav}>Emergency</Link>
          <Link to="/privacy" onClick={toggleNav}>Privacy Policy</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={toggleNav}>View My Profile</Link>
              <Link to="/post-request" onClick={toggleNav}>View My Posts</Link>
              <Link to="/volunteer-responses" onClick={toggleNav}>View My Responses</Link>
            </>
          ) : (
            <>
              <button className="link-button" onClick={() => handleProtectedRoute('/profile')}>View My Profile</button>
              <button className="link-button" onClick={() => handleProtectedRoute('/post-request')}>View My Posts</button>
              <button className="link-button" onClick={() => handleProtectedRoute('/volunteer-responses')}>View My Responses</button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post-request" element={<PostRequest />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/volunteer-responses" element={<VolunteerResponses />} />
      </Routes>
    </div>
  );
}

export default App;

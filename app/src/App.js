import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { fetchUserAttributes, signOut, getCurrentUser } from 'aws-amplify/auth';
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
import CommunityRequests from './CommunityRequests';
import ConfirmSignUpPage from './ConfirmSignUpPage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ViewResponses from './ViewResponses';
import Leaderboard from './Leaderboard';
import PostForm from './PostForm';
import ViewMyPostsPage from './ViewMyPostsPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        const attributes = await fetchUserAttributes();
        setIsAuthenticated(true);
        setUserRole(attributes['custom:role']); // Assuming the role is stored in a custom attribute named 'role'
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

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

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUserRole(null);
      navigate('/');
    } catch (error) {
      console.log('Error signing out:', error);
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
              <Link to="/forum" onClick={toggleNav}>Community Forum</Link>
              <Link to="/view-my-posts" onClick={toggleNav}>View My Posts</Link>
              <Link to="/requests" onClick={toggleNav}>Community Requests</Link>
              {userRole === 'senior' ? (
                <Link to="/senior-responses" onClick={toggleNav}>View My Requests</Link>
              ) : (
                <Link to="/volunteer-responses" onClick={toggleNav}>View My Responses</Link>
              )}
              <Link to="/leaderboard" onClick={toggleNav}>Leaderboard</Link>
              <button className="link-button" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element = {<SignUpPage />} />
        <Route path="/signin" element={<SignInPage onSignIn={checkUser} />} /> {/* Pass checkUser to trigger after sign in */}
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post-request" element={<PostRequest />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        {userRole !== 'senior' && (
          <Route path="/volunteer-responses" element={<VolunteerResponses />} />
        )}
        <Route path="/confirm-signup" element={<ConfirmSignUpPage onConfirmSignUp={checkUser} />} />
        <Route path="/requests" element={<CommunityRequests />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/senior-responses" element={<ViewResponses />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/view-my-posts" element={<ViewMyPostsPage />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import ForumPage from './ForumPage';
import CommunityRequests from './CommunityRequests';
import ConfirmSignUpPage from './ConfirmSignUpPage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import AboutPage from './AboutPage';
import EmergencyPage from './EmergencyPage';
import ProfilePage from './ProfilePage';
import PostRequest from './PostRequest';
import PrivacyPolicy from './PrivacyPolicy';
import VolunteerResponses from './VolunteerResponses';
import ViewResponses from './ViewResponses';
import Leaderboard from './Leaderboard';
import PostForm from './PostForm';
import './App.css';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', 'VNdweRJKugZVtfygwxOJz');
    script.setAttribute('domain', 'www.chatbase.co');
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/confirm-signup" element={<ConfirmSignUpPage />} />
        <Route path="/requests" element={<CommunityRequests />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/post-request" element={<PostRequest />} />
        <Route path="/senior-responses" element={<ViewResponses />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/volunteer-responses" element={<VolunteerResponses/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/post-form" element={<PostForm/>} />
      </Routes>
      
    </div>
  );
}

export default App;

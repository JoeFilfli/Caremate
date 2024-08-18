import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from 'aws-amplify/auth';
import './SignInPage.css';

function SignInPage() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in the user using AWS Amplify Auth
      await signIn({ username, password });
      
      // Redirect to the forum or any other page after successful sign-in
      navigate('/forum');
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please check your email and password.');
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-header">
          <h2>Welcome Back</h2>
          <p>Please sign in to continue</p>
        </div>
        <section className="signin-section">
          <form onSubmit={handleSubmit} className="signin-form">
            <label>Email: 
              <input
                type="email"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="signin-input"
              />
            </label><br />
            <label>Password: 
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="signin-input"
              />
            </label><br />
            <button type="submit" className="signin-button">Sign In</button>
          </form>
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        </section>
      </div>
    </div>
  );
}

export default SignInPage;

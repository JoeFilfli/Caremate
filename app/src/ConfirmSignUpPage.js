import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmSignUp, signIn } from 'aws-amplify/auth';
import './ConfirmSignUpPage.css';

function ConfirmSignUpPage({ onConfirmSignUp }) { // Receive the onConfirmSignUp function as a prop
  const [confirmationCode, setConfirmationCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const password = location.state?.password; // Assuming password is passed through the location state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await confirmSignUp({ username, confirmationCode });
      await signIn({ username, password });

      // After signing in, trigger the onConfirmSignUp to update the navbar
      if (onConfirmSignUp) {
        await onConfirmSignUp();
      }

      // Navigate to the forum or another protected page after confirmation
      navigate('/forum');
    } catch (error) {
      console.error('Error confirming sign-up:', error);
      alert('Error confirming sign-up. Please try again.');
    }
  };

  return (
    <div className="confirm-signup-page">
      <section className="confirm-signup-section">
        <form onSubmit={handleSubmit}>
          <label>
            Confirmation Code:
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Confirm Sign Up</button>
        </form>
      </section>
    </div>
  );
}

export default ConfirmSignUpPage;

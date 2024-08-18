import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, autoSignIn, getCurrentUser } from 'aws-amplify/auth';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SignUpPage.css';
import { Link } from 'react-router-dom';

async function handleAutoSignIn() {
  try {
    await autoSignIn();
  } catch (error) {
    console.log(error);
  }
}

function SignUpPage() {
  const [isSenior, setIsSenior] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [password, setPassword] = useState('');
  const [locale, setLocale] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  const handleAlreadyHaveAccountClick = async () => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setLocale(null);
  };

  const handleLocaleChange = (selectedLocale) => {
    setLocale(selectedLocale);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (isSenior === null) {
      setError('Please select whether you are a Senior or a Volunteer.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (!agreeToTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    try {
      const role = isSenior ? 'senior' : 'volunteer';
      let profilePictureUrl = '';

      if (profilePicture) {
        // Handle profile picture upload...
      }

      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email: email,
            phone_number: phoneNumber,
            birthdate: birthdate.toISOString().split('T')[0],
            name: name,
            locale: locale.label,
            'custom:country': country.label,
            'custom:role': role,
            'custom:picture': profilePictureUrl,
          },
          autoSignIn: true,
        },
      });

      await handleAutoSignIn();

      navigate('/confirm-signup', { state: { username: email, password } });
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again.');
    }
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const localeOptions = country
    ? State.getStatesOfCountry(country.value).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }))
    : [];

  return (
    <div className="signup-page">
      <section className="signup-section">
        <h2>Join Us!</h2>
        <p>Please select your role to get started</p>
        <div className="toggle-buttons">
          <button
            onClick={() => setIsSenior(true)}
            className={`role-button ${isSenior === true ? 'active' : ''}`}
          >
            Senior
          </button>
          <button
            onClick={() => setIsSenior(false)}
            className={`role-button ${isSenior === false ? 'active' : ''}`}
          >
            Volunteer
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+14155552671"
              required
            />
          </label>
          <br />
          <label>
            Birthdate:
            <DatePicker
              selected={birthdate}
              onChange={(date) => setBirthdate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Click to select a date"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              required
            />
          </label>
          <br />
          <label>
            Country:
            <Select
              value={country}
              onChange={handleCountryChange}
              options={countryOptions}
              placeholder="Select a country"
              required
            />
          </label>
          <br />
          <label>
            State:
            <Select
              value={locale}
              onChange={handleLocaleChange}
              options={localeOptions}
              placeholder="Select a state"
              isDisabled={!country}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <br />
          <label>
            Profile Picture:
            <input type="file" onChange={handleFileChange} />
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
              required
            />{' '}
            I agree to terms and conditions
          </label>
          <br />
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
        </form>
        <div className="centered">
          <button onClick={handleAlreadyHaveAccountClick} className="link-button">
            Already have an account? Sign in
          </button>
        </div>       
      </section>
    </div>
  );
}

export default SignUpPage;

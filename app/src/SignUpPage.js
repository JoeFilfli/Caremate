import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, autoSignIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import { uploadData } from 'aws-amplify/storage';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import './SignUpPage.css';
import { generateClient } from 'aws-amplify/api';
import { createUser } from './graphql/mutations';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

async function handleAutoSignIn() {
  try {
    await autoSignIn();
    // handle sign-in steps
  } catch (error) {
    console.log(error);
  }
}

function SignUpPage() {
  const [isSenior, setIsSenior] = useState(null); // Changed to null to track if selection is made
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
  const client = generateClient();

  const handleAlreadyHaveAccountClick = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        // If the user is already signed in, navigate to the forum or another page
        navigate('/forum');
      } else {
        // If the user is not signed in, navigate to the sign-in page
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error checking current user:', error);
      // Navigate to sign-in page if there's an error
      navigate('/signin');
    }
  };

  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const img = document.createElement('img');
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          callback(blob);
        }, file.type, 0.8); // Adjust quality as needed
      };
    };
    
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImage(file, 500, 500, (resizedBlob) => {
        setProfilePicture(resizedBlob);
      });
    }
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setLocale(null); // Reset locale selection when country changes
  };

  const handleLocaleChange = (selectedLocale) => {
    setLocale(selectedLocale);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error message
    setError('');

    // Validate role selection
    if (isSenior === null) {
      setError('Please select whether you are a Senior or a Volunteer.');
      return;
    }

    // Validate phone number format
    const formatPhoneNumber = (phoneNumber, countryCode) => {
      const phoneNumberObject = parsePhoneNumberFromString(phoneNumber, countryCode);
      if (phoneNumberObject && phoneNumberObject.isValid()) {
        return phoneNumberObject.format('E.164');
      }
      throw new Error('Invalid phone number');
    };

    // Validate password length
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    try {
      const role = isSenior ? 'senior' : 'volunteer';
      const defaultPictureUrl = 'https://example.com/default-profile-picture.png';
      let profilePictureUrl = defaultPictureUrl;

      if (profilePicture) {
        const pictureKey = `${email}`;
        try {
          const result = await uploadData({
            path: pictureKey,
            data: profilePicture,
            options: {
              contentType: profilePicture.type,
            },
          });
          console.log('Succeeded: ', result);

          profilePictureUrl = `https://app-storage-76daa9bdaba9d-dev.s3.amazonaws.com/${encodeURIComponent(pictureKey)}`;
        } catch (error) {
          console.log('Error : ', error);
        }
      }

      try {
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
      } catch (error) {
        alert(error);
        console.log(error);
      }

      // Handle auto sign-in after sign-up
      await handleAutoSignIn();

      const newUser = {
        id: email, // Use email as the unique identifier
        username: email,
        birthdate: birthdate.toISOString().split('T')[0],
        phone_number: phoneNumber,
        locale: locale.label,
        email: email,
        name: name,
        country: country.label,
        picture: profilePictureUrl,
        role: role,
        description: 'To be edited', // Add a default description or allow user to add later
        rating: 5, // Initialize rating to 5
        counter: 0, // Initialize counter to 0
      };
      await client.graphql({
        query: createUser,
        variables: { input: newUser },
      });
      // Navigate to the confirmation page
      navigate('/confirm-signup', { state: { username: email, password } });
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.errors) {
        console.log('GraphQL Error Details:', error.errors);
        error.errors.forEach(err => {
          console.log('GraphQL Error Message:', err.message);
          console.log('GraphQL Error Path:', err.path);
          console.log('GraphQL Error Extensions:', err.extensions);
        });
      }
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
        <div className="toggle-buttons">
          <button onClick={() => setIsSenior(true)} className={isSenior === true ? 'active' : ''}>
            Senior
          </button>
          <button onClick={() => setIsSenior(false)} className={isSenior === false ? 'active' : ''}>
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
              yearDropdownItemNumber={100} // Allows selecting years from the past 100 years
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

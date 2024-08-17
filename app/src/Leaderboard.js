import React, { useEffect, useState } from 'react';
import { listUsers } from './graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './Leaderboard.css';

// Manual mapping of country names to ISO 3166-1 alpha-2 codes
const countryNameToCode = {
  "Afghanistan": "AF",
  "Albania": "AL",
  "Algeria": "DZ",
  "Andorra": "AD",
  "Angola": "AO",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cabo Verde": "CV",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo, Democratic Republic of the": "CD",
  "Congo, Republic of the": "CG",
  "Costa Rica": "CR",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czech Republic": "CZ",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Eswatini": "SZ",
  "Ethiopia": "ET",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Greece": "GR",
  "Grenada": "GD",
  "Guatemala": "GT",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Honduras": "HN",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Korea, North": "KP",
  "Korea, South": "KR",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Laos": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mexico": "MX",
  "Micronesia": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "North Macedonia": "MK",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Poland": "PL",
  "Portugal": "PT",
  "Qatar": "QA",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syria": "SY",
  "Taiwan": "TW",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turkmenistan": "TM",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Vatican City": "VA",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW",
};

const Leaderboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filterCountry, setFilterCountry] = useState('All Countries');
  const client = generateClient();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const filter = { role: { eq: "volunteer" } };
      const { data } = await client.graphql({ query: listUsers, variables: { filter } });
      const sortedVolunteers = data.listUsers.items.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.counter - a.counter;
        }
        return b.rating - a.rating;
      });
      setVolunteers(sortedVolunteers);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const handleCountryChange = (selectedOption) => {
    setFilterCountry(selectedOption ? selectedOption.value : 'All Countries');
  };

  const filteredVolunteers = filterCountry !== 'All Countries'
    ? volunteers.filter(volunteer => volunteer.country === filterCountry)
    : volunteers;

  const countryOptions = [
    { value: 'All Countries', label: 'All Countries' },
    ...[...new Set(volunteers.map(volunteer => volunteer.country))].map(country => ({
      value: country,
      label: country
    }))
  ];

  const getFlagUrl = (countryName) => {
    const countryCode = countryNameToCode[countryName.trim()] || null;
    return countryCode ? `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` : null;
  };

  return (
    <div className="leaderboard-page">
      <header className="leaderboard-header">
        <h1 className="leaderboard-title">Volunteer Leaderboard</h1>
        <button onClick={() => navigate('/requests')} className="back-button">
          Back to Community Requests
        </button>
        <Select
          value={countryOptions.find(option => option.value === filterCountry)}
          onChange={handleCountryChange}
          options={countryOptions}
          placeholder="Filter by Country"
          className="country-select"
        />
      </header>
      <main className="leaderboard-main">
        <ul className="leaderboard-list">
          {filteredVolunteers.map((volunteer, index) => (
            <li key={volunteer.id} className="leaderboard-item">
              <span className="leaderboard-rank">{index + 1}</span>
              <img src={volunteer.picture} alt={volunteer.name} className="leaderboard-picture" />
              <div className="leaderboard-details">
                <h2>{volunteer.name}</h2>
                <p>Rating: {volunteer.rating}</p>
                <p>Contributions: {volunteer.counter}</p>
              </div>
              {getFlagUrl(volunteer.country) && (
                <img 
                  src={getFlagUrl(volunteer.country)} 
                  alt={`${volunteer.country} flag`} 
                  className="country-flag" 
                />
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Leaderboard;

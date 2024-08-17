import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import Modal from 'react-modal';
import { listRequests } from './graphql/queries';
import { createResponse } from './graphql/mutations';
import './CommunityRequests.css';
import { getUser } from './graphql/queries';
import Select from 'react-select';

Modal.setAppElement('#root'); // Adjust if your app root is different

function CommunityRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [message, setMessage] = useState('');
  const client = generateClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [role, setRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterUrgent, setFilterUrgent] = useState(false);
  const [filterCountry, setFilterCountry] = useState(null);
  const [filterLocale, setFilterLocale] = useState(null);
  const [filterTags, setFilterTags] = useState([]);
  const [isPageVisible, setIsPageVisible] = useState(false); // New state for page visibility
  const [roleLoading, setRoleLoading] = useState(true); // New state to track role loading

  const tagOptions = [
    { value: 'All', label: 'All' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'physical', label: 'Physical' },
    { value: 'gardening', label: 'Gardening' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'technology', label: 'Technology' },
    { value: 'medical', label: 'Medical' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'other', label: 'Other' }
  ];

  const categorizeTag = (tags) => {
    return tags.map(tag =>
      tagOptions.some(option => option.value === tag) ? tag : 'other'
    );
  };

  const handleTagChange = (selectedOptions) => {
    setFilterTags(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsPageVisible(true);
    }, 1000); // Delay of 1 second
    fetchUser();
    fetchRequests();
  }, []);

  const fetchUser = async () => {
    try {
      const user = await fetchUserAttributes();
      const response = await client.graphql({
        query: getUser,
        variables: { id: user.email },
      });
      const userData = response.data.getUser;
      setRole(userData.role);
      setUserEmail(userData.email);
      setLoading(false);
      setRoleLoading(false); // Role has been loaded
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const result = await client.graphql({
        query: listRequests,
        variables: {
          filter: { status: { eq: "open" } },
        },
      });
      setRequests(result.data.listRequests.items);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleRespond = async (requestID) => {
    if (role === 'senior') {
      alert("Seniors cannot respond to their own requests.");
      return;
    }
    try {
      const response = await client.graphql({
        query: getUser,
        variables: { id: userEmail }
      });
  
      const user = response.data.getUser;
      const volunteerID = user.email;
      const email = user.email || '';
      const name = user.name;
    
      const input = {
        requestID,
        volunteerID,
        message,
        email,
        name
      };
  
      await client.graphql({
        query: createResponse,
        variables: { input }
      });
  
      setModalIsOpen(false);
      setMessage('');
    } catch (error) {
      console.error('Error responding to request:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRequest(null);
    setMessage('');
  };

  const filteredRequests = requests.filter((request) => {
    const matchesUrgent = filterUrgent ? request.urgent === filterUrgent : true;
    const matchesCountry = filterCountry ? request.country === filterCountry.value : true;
    const matchesLocale = filterLocale ? request.locale === filterLocale.value : true;
    const categorizedTags = categorizeTag(request.tags || []);
    const matchesTags = filterTags.includes('All') || filterTags.length === 0
      ? true
      : filterTags.some(tag => categorizedTags.includes(tag));
    return matchesUrgent && matchesCountry && matchesLocale && matchesTags;
  });

  const sortedRequests = filteredRequests.sort((a, b) => new Date(a.date) - new Date(b.date));

  const countryOptions = requests.map(request => ({ value: request.country, label: request.country })).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i);
  const localeOptions = requests.map(request => ({ value: request.locale, label: request.locale })).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i);

  return (
    <div className="community-page">
      <header className="community-header">
        <h1 className="community-title">Community Requests</h1>
        <nav className="community-nav">
          <Link to="/forum" className="community-nav-button">
            Go to Community Forum
          </Link>
          <Link to="/leaderboard" className="community-nav-button">
            Leaderboard
          </Link>
          <Link to="/profile" className="community-nav-button">
            View Profile
          </Link>
          <button onClick={handleSignOut} className="community-signout-button">
            Sign Out
          </button>
        </nav>
      </header>

      {isPageVisible ? (
        <main className="community-main">
          {!roleLoading && ( // Render after role is loaded
            <div className="community-actions">
              {role === 'volunteer' && (
                <Link to="/volunteer-responses" className="community-action-button">
                  Responses
                </Link>
              )}
              {role === 'senior' && (
                <Link to="/senior-responses" className="community-action-button">
                  My requests
                </Link>
              )}
              {role !== 'volunteer' && (
                <Link to="/post-request" className="community-action-button">
                  Post a Request
                </Link>
              )}
            </div>
          )}
          <div className="community-filters">
            <label>
              Urgent:
              <input
                type="checkbox"
                checked={filterUrgent}
                onChange={(e) => setFilterUrgent(e.target.checked)}
              />
            </label>
            <label>
              Country:
              <Select
                value={filterCountry}
                onChange={setFilterCountry}
                options={countryOptions}
                placeholder="Select a country"
              />
            </label>
            <label>
              State:
              <Select
                value={filterLocale}
                onChange={setFilterLocale}
                options={localeOptions}
                placeholder="Select a state"
              />
            </label>
            <label>
              Tags:
              <Select
                isMulti
                value={tagOptions.filter(option => filterTags.includes(option.value))}
                onChange={handleTagChange}
                options={tagOptions}
                placeholder="Select tags"
                className="community-tag-select"
              />
            </label>
          </div>
          <ul className="community-request-list">
            {sortedRequests.map((request) => (
              <li key={request.id} className={`community-request-item ${request.urgent ? 'urgent-request' : ''}`}>
                {request.picture && <img src={request.picture} alt={`${request.name}'s profile`} className="community-request-picture" />}
                <h3>{request.name}</h3>
                <h4>{request.title}</h4>
                <p>{request.description}</p>
                <p><strong>Due date:</strong> {request.date ? new Date(request.date).toLocaleString() : 'No date provided'}</p>
                <p>{request.country || 'No country provided'}</p>
                <p>{request.locale || 'No locale provided'}</p>
                {request.tags && request.tags.length > 0 && (
                  <div className="community-tags">
                    <strong>Tags:</strong>
                    <ul className="community-tag-list">
                      {request.tags.map((tag, index) => (
                        <li key={index} className="community-tag">{tag}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(request.pictures) && request.pictures.length > 0 && (
                  <div className="community-request-pictures">
                    {request.pictures.map((pic, index) => (
                      <img key={index} src={pic} alt={`Request picture ${index + 1}`} className="community-request-pictures" />
                    ))}
                  </div>
                )}
                {request.urgent && <p className="urgent-text">This request is urgent!</p>}
                {role === 'senior' ? null : (
                  <button 
                    onClick={() => openModal(request)} 
                    className="community-request-button"
                  >
                    Respond
                  </button>
                )}
              </li>
            ))}
          </ul>
        </main>
      ) : (
        <p>Loading...</p> // Placeholder content while waiting
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Response Modal"
        className="response-modal"
      >
        <h2>Respond to Request</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleRespond(selectedRequest.id); }}>
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit Response</button>
          <button type="button" onClick={closeModal}>Close</button>
        </form>
      </Modal>
    </div>
  );
}

export default CommunityRequests;

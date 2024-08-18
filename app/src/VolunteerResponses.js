import React, { useEffect, useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { responsesByVolunteerIDAndId, getRequest } from './graphql/queries';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import './VolunteerResponses.css';

const VolunteerResponses = () => {
  const [responses, setResponses] = useState([]);
  const [requests, setRequests] = useState({});
  const client = generateClient();
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchUserAndResponses();
  }, []);

  const fetchUserAndResponses = async () => {
    try {
      const user = await fetchUserAttributes();
      setCurrentUserId(user.email);
      const response = await client.graphql({
        query: responsesByVolunteerIDAndId,
        variables: { volunteerID: user.email },
      });
      const responseData = response.data.responsesByVolunteerIDAndId.items;
      setResponses(responseData);

      // Fetch request details for each response
      const requestDetails = await Promise.all(
        responseData.map(async (response) => {
          const requestResponse = await client.graphql({
            query: getRequest,
            variables: { id: response.requestID },
          });
          return { requestID: response.requestID, ...requestResponse.data.getRequest };
        })
      );

      // Map requests by their IDs
      const requestMap = {};
      requestDetails.forEach((request) => {
        requestMap[request.requestID] = request;
      });
      setRequests(requestMap);
    } catch (error) {
      console.error('Error fetching responses or requests:', error);
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

  return (
    <div className="vr-page">
      <header className="vr-header">
        <h1 className="vr-title">Responses</h1>
        <nav className="vr-nav">
          <Link to="/forum" className="vr-nav-button">
            Go to Community Forum
          </Link>
          <Link to="/requests" className="vr-nav-button">
            Go to Community Requests
          </Link>
          <button onClick={handleSignOut} className="vr-signout-button">
            Sign Out
          </button>
        </nav>
      </header>
      <main className="vr-main">
        <ul className="vr-response-list">
          {responses
            .sort((a, b) => {
              const requestA = requests[a.requestID];
              const requestB = requests[b.requestID];
              if (requestA && requestB) {
                return requestA.status === 'open' && requestB.status !== 'open' ? -1 : 1;
              }
              return 0;
            })
            .map((response) => {
              const request = requests[response.requestID];
              const getBackgroundColor = () => {
                if (request.status === 'closed' && request.volunteerID !== currentUserId) {
                  return 'lightcoral'; // Light red color for mismatch
                } else if (request.status === 'closed') {
                  return 'lightgreen'; // Light green color for match
                }
                return 'white';
              };
              return (
                <li key={response.id} className="vr-response-item">
                  {request && (
                    <div
                      className="vr-request-details"
                      style={{ backgroundColor: getBackgroundColor(), padding: '10px', borderRadius: '5px' }}
                    >
                      {request.picture && (
                        <img src={request.picture} alt={`${request.name}'s profile`} className="vr-request-picture" />
                      )}
                       
                      <h3>{request.title}</h3>
                      <p><strong>Name:</strong> {request.name}</p>
                      <p><strong>Description:</strong> {request.description}</p>
                      <p><strong>Date:</strong> {new Date(request.date).toLocaleString()}</p>
                      <p><strong>Location:</strong> {request.location}</p>
                      <p>
                      {request.compensations ? 
                        `Compensation: ${request.compensations}$` : 
                        ''}
                    </p>
                      {request.updatedAt && <p><strong>Updated at:</strong> {new Date(request.updatedAt).toLocaleString()}</p>}
                      <p><strong>Status:</strong> {request.status}</p>
                      {request.pictures && Array.isArray(request.pictures) && (
                        <div className="request-pictures">
                          {request.pictures.map((pic, index) => (
                            <img key={index} src={pic} alt={`Request picture ${index + 1}`} className="request-picture" />
                          ))}
                        </div>
                      )}
                      <ul>
                        <li>{'Message: ' + response.message}</li>
                        <li>{'Sent at: ' + new Date(response.createdAt).toLocaleString()}</li>
                      </ul>
                      {request.status === 'closed' && (
                        <>
                          {(request.volunteerID === currentUserId) ? (
                            <>
                              <p><strong>Senior Feedback:</strong> {request.seniorFeedback || 'No feedback provided'}</p>
                              <p><strong>Rating:</strong> {request.rate || 'No rating provided'}</p>
                            </>
                          ) : (
                            <p>This request is closed and you are not the assigned volunteer.</p>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  <div className="vr-response-details"></div>
                </li>
              );
            })}
        </ul>
      </main>
    </div>
  );
};

export default VolunteerResponses;

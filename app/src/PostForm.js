import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { createPost, createComment } from './graphql/mutations'; // Import createComment for auto comment
import { uploadData } from 'aws-amplify/storage';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import Google Generative AI
import './PostForm.css';

const client = generateClient();
const genAI = new GoogleGenerativeAI("AIzaSyAt68qPaTE-cVY0UcmbqhNhWPvIawAx8_Y");

const predefinedTags = ["Medical", "News", "Hobbies", "Other"];

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pictures, setPictures] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedPredefinedTag, setSelectedPredefinedTag] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = await fetchUserAttributes();
      setCurrentUserId(user.email);
    } catch (error) {
      console.error('Error fetching user:', error);
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
    const files = Array.from(e.target.files);

    files.forEach(file => {
      resizeImage(file, 800, 800, (resizedBlob) => {
        const previewUrl = URL.createObjectURL(resizedBlob);
        setPictures(prevPictures => [...prevPictures, { file: resizedBlob, preview: previewUrl }]);
      });
    });
  };

  const handleRemovePhoto = (index) => {
    setPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
  };

  const handleTagAddition = () => {
    if (selectedPredefinedTag && selectedPredefinedTag !== 'Other') {
      setTags([...tags, selectedPredefinedTag]);
      setSelectedPredefinedTag('');
    } else if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const createAutoComment = async (postDescription) => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent([postDescription]);
      return result.response.text();
    } catch (error) {
      console.error('Error generating comment:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pictureUrls = await Promise.all(
      pictures.map(async (picture) => {
        if (picture && picture.file) {
          const pictureKey = `${Date.now()}_${picture.file.name}`;
          try {
            const result = await uploadData({
              path: pictureKey,
              data: picture.file,
              options: {
                contentType: picture.file.type,
              },
            });
            return `https://app-storage-76daa9bdaba9d-dev.s3.amazonaws.com/${encodeURIComponent(pictureKey)}`;
          } catch (error) {
            console.log('Error : ', error);
            return null;
          }
        }
        return null;
      })
    );

    const validPictureUrls = pictureUrls.filter((url) => url !== null);

    const input = {
      title,
      content,
      pictures: validPictureUrls,
      likes: 0,
      tags,
      authorID: currentUserId,
    };

    try {
      // Create the post
      const postResult = await client.graphql({ query: createPost, variables: { input } });
      const createdPost = postResult.data.createPost;

      // Generate an auto-comment using the description of the post
      const autoComment = await createAutoComment(content);
      if (autoComment) {
        const commentInput = {
          postID: createdPost.id,
          content: autoComment,
          authorID: 'jrf07@mail.aub.edu', // Use a specific authorID for the bot-generated comment
        };
        await client.graphql({ query: createComment, variables: { input: commentInput } });
      }

      navigate('/forum');
    } catch (error) {
      console.error('Error posting request:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        // Handle GraphQL errors
        setErrorMessage(error.response.data.errors[0].message);
      } else if (error.message) {
        // Handle other errors (e.g., network errors)
        setErrorMessage(error.message);
      } else {
        // Generic fallback error message
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const startListening = () => {
    if (!recognition) {
      console.warn('Speech recognition is not supported in this browser.');
      return;
    }

    recognition.lang = 'en-US';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const speechResult = event.results[last][0].transcript;
      setContent(prev => prev + ' ' + speechResult);
    };

    recognition.start();
  };

  return (
    <div className="pr-page">
      <form onSubmit={handleSubmit} className="pr-form">
        <h2>Post to Forum</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="pr-input"
        />
        <textarea
          placeholder="Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="pr-textarea"
        />
        <button
          type="button"
          onClick={startListening}
          disabled={listening || !recognition}
          className="pr-add-button voice-button"
        >
          {listening ? 'Listening...' : 'Add Description by Voice'}
        </button>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="pr-input"
        />

        <div className="pr-photo-thumbnails">
          {pictures.map((picture, index) => (
            <div key={index} className="pr-photo-thumbnail">
              <img src={picture.preview} alt={`Preview ${index}`} className="pr-thumbnail-image" />
              <button type="button" className="pr-remove-thumbnail" onClick={() => handleRemovePhoto(index)}>
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="pr-tag-input">
          <select
            value={selectedPredefinedTag}
            onChange={(e) => setSelectedPredefinedTag(e.target.value)}
            className="pr-input"
          >
            <option value="">Choose a tag</option>
            {predefinedTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {selectedPredefinedTag === 'Other' && (
            <input
              type="text"
              placeholder="Enter your tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="pr-input"
            />
          )}
          <button
            type="button"
            onClick={handleTagAddition}
            className="pr-add-button"
          >
            Add Tag
          </button>
        </div>

        <div className="pr-tags-list">
          {tags.map((tag, index) => (
            <div key={index} className="pr-tag">
              {tag}
              <button type="button" className="pr-remove-tag" onClick={() => handleTagRemove(index)}>
                &times;
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="pr-button">
          Post Request
        </button>
      </form>
    </div>
  );
};

export default PostForm;

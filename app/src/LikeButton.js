import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { updatePost } from './graphql/mutations';
import { fetchUserAttributes } from 'aws-amplify/auth';

const client = generateClient();

const LikeButton = ({ postId, likes, likedBy = [] }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserAttributes();
        setUserId(user.email);
        setIsLiked(Array.isArray(likedBy) && likedBy.includes(user.email));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [likedBy]);

  const handleLikeToggle = async () => {
    const updatedLikedBy = isLiked
      ? likedBy.filter(id => id !== userId)
      : [...likedBy, userId];

    const input = {
      id: postId,
      likes: isLiked ? currentLikes - 1 : currentLikes + 1,
      likedBy: updatedLikedBy,
    };

    try {
      await client.graphql({ query: updatePost, variables: { input } });
      setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <button onClick={handleLikeToggle}>
      {isLiked ? 'Unlike' : 'Like'} ({currentLikes})
    </button>
  );
};

export default LikeButton;

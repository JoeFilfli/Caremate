import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { listPosts, getUser, commentsByPostIDAndId, repliesByCommentIDAndId } from './graphql/queries';
import { createComment, createReply, createPost } from './graphql/mutations';
import LikeButton from './LikeButton';
import './ForumPage.css';
import Modal from 'react-modal';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';
import Select from 'react-select';

const client = generateClient();

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedCommentReplies, setSelectedCommentReplies] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [replyModalIsOpen, setReplyModalIsOpen] = useState(false);
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [repliesModalIsOpen, setRepliesModalIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [showMyPostsOnly, setShowMyPostsOnly] = useState(false);
  const navigate = useNavigate();

  const tagOptions = [
    { value: 'All', label: 'All' },
    { value: 'medical', label: 'Medical' },
    { value: 'news', label: 'News' },
    { value: 'hobbies', label: 'Hobbies' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchPosts();
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

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };


  const fetchPosts = async () => {
    try {
      const result = await client.graphql({ query: listPosts, variables: { sortDirection: 'DESC' } });
      const posts = result.data.listPosts.items;

      const postsWithAuthors = await Promise.all(
        posts.map(async (post) => {
          try {
            const userResult = await client.graphql({ query: getUser, variables: { id: post.authorID } });
            post.author = userResult.data.getUser;
            return post;
          } catch (error) {
            console.error('Error fetching user:', error);
            return post;
          }
        })
      );

      setPosts(postsWithAuthors);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchCommentsByPost = async (postID) => {
    try {
      const result = await client.graphql({ query: commentsByPostIDAndId, variables: { postID } });
      const comments = result.data.commentsByPostIDAndId.items;

      const commentsWithAuthors = await Promise.all(
        comments.map(async (comment) => {
          try {
            const userResult = await client.graphql({ query: getUser, variables: { id: comment.authorID } });
            comment.author = userResult.data.getUser;
            comment.replies = await fetchRepliesByComment(comment.id);
            return comment;
          } catch (error) {
            console.error('Error fetching user:', error);
            return comment;
          }
        })
      );

      return commentsWithAuthors;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const fetchRepliesByComment = async (commentID) => {
    try {
      const result = await client.graphql({ query: repliesByCommentIDAndId, variables: { commentID } });
      const replies = result.data.repliesByCommentIDAndId.items;

      const repliesWithAuthors = await Promise.all(
        replies.map(async (reply) => {
          try {
            const userResult = await client.graphql({ query: getUser, variables: { id: reply.authorID } });
            reply.author = userResult.data.getUser;
            return reply;
          } catch (error) {
            console.error('Error fetching user:', error);
            return reply;
          }
        })
      );

      return repliesWithAuthors;
    } catch (error) {
      console.error('Error fetching replies:', error);
      return [];
    }
  };

  const openCommentModal = (post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeCommentModal = () => {
    setSelectedPost(null);
    setCommentContent('');
    setModalIsOpen(false);
  };

  const openReplyModal = (comment) => {
    setSelectedComment(comment);
    setReplyModalIsOpen(true);
  };

  const closeReplyModal = () => {
    setSelectedComment(null);
    setReplyContent('');
    setReplyModalIsOpen(false);
  };

  const openCommentsModal = async (post) => {
    const comments = await fetchCommentsByPost(post.id);
    post.comments = comments;
    setSelectedPost(post);
    setCommentsModalIsOpen(true);
  };

  const closeCommentsModal = () => {
    setSelectedPost(null);
    setCommentsModalIsOpen(false);
  };

  const openRepliesModal = async (comment) => {
    const replies = await fetchRepliesByComment(comment.id);
    comment.replies = replies;
    setSelectedComment(comment);
    setSelectedCommentReplies(replies);
    setRepliesModalIsOpen(true);
  };

  const closeRepliesModal = () => {
    setSelectedComment(null);
    setSelectedCommentReplies([]);
    setRepliesModalIsOpen(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const input = {
      postID: selectedPost.id,
      content: commentContent,
      authorID: currentUserId
    };

    try {
      await client.graphql({ query: createComment, variables: { input } });
      setCommentContent('');
      closeCommentModal();
      await openCommentsModal(selectedPost);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const input = {
      commentID: selectedComment.id,
      content: replyContent,
      authorID: currentUserId
    };

    try {
      await client.graphql({ query: createReply, variables: { input } });
      setReplyContent('');
      await openCommentsModal(selectedPost);
      closeReplyModal();
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const categorizeTag = (tags) => {
    return tags.includes('medical') || tags.includes('news') || tags.includes('hobbies')
      ? tags
      : [...tags, 'other'];
  };

  const filteredPosts = selectedTag && selectedTag.value !== 'All'
    ? posts.filter(post => {
        const categorizedTags = categorizeTag(post.tags || []);
        return categorizedTags.includes(selectedTag.value);
      })
    : posts;

  const myPosts = showMyPostsOnly
    ? filteredPosts.filter(post => post.authorID === currentUserId)
    : filteredPosts;

  return (
    <div className="forum-page">
      <header className="forum-header">
        <h1>Community Forum</h1>
        <div className="header-buttons">
          <Link to="/requests" className="community-nav-button">Go to Community Requests</Link>
          <Link to="/profile" className="community-nav-button">View Profile</Link>
          <button onClick={handleSignOut} className="community-signout-button">Sign Out</button>
        </div>
      </header>

      <div className="tag-filter">
        <Select
          value={selectedTag}
          onChange={setSelectedTag}
          options={tagOptions}
          placeholder="Select a tag"
          className="tag-select"
        />
        <Link to="/post-form" className="forum-button">Post To Forum</Link>
        <label>
          <input
            type="checkbox"
            checked={showMyPostsOnly}
            onChange={(e) => setShowMyPostsOnly(e.target.checked)}
          />
          Show My Posts Only
        </label>
      </div>

      <section className="forum-posts">
        {myPosts.map(post => (
          <div key={post.id} className="forum-post">
            <div className="author-info">
              {post.author && (
                <>
                  <img src={post.author.picture} alt={`${post.author.name}'s profile`} className="author-picture" />
                  <p className="author-name">{post.author.name}</p>
                </>
              )}
            </div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p className="post-date">Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            <div className="post-pictures">
              {Array.isArray(post.pictures) && post.pictures.map((picture, index) => (
                <img key={index} src={picture} alt={`Post picture ${index + 1}`} className="post-picture" />
              ))}
            </div>
            <div className="post-tags">
              {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                <span key={index} className="post-tag">{tag}</span>
              ))}
            </div>
            <LikeButton postId={post.id} likes={post.likes} likedBy={post.likedBy || []} />
            <button type="button" onClick={() => openCommentModal(post)}>Comment</button>
            <button type="button" onClick={() => openCommentsModal(post)}>View Comments</button>
          </div>
        ))}
      </section>

      {/* Comment Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeCommentModal} contentLabel="Add Comment">
        <h2>Add a Comment</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write your comment here..."
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={closeCommentModal}>Cancel</button>
        </form>
      </Modal>

      {/* Comments Modal */}
      <Modal isOpen={commentsModalIsOpen} onRequestClose={closeCommentsModal} contentLabel="View Comments">
        <div className="modal-header">
          <h2>Comments</h2>
          <button type="button" className="close-button" onClick={closeCommentsModal}>Close</button>
        </div>
        {selectedPost && Array.isArray(selectedPost.comments) && selectedPost.comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="author-info">
              {comment.author && (
                <>
                  <img src={comment.author.picture} alt={`${comment.author.name}'s profile`} className="author-picture" />
                  <p className="author-name">{comment.author.name}</p>
                </>
              )}
            </div>
            <p>{comment.content}</p>
            <div className="replies">
              <p>Replies:</p>
              <ul>
                {Array.isArray(comment.replies) && comment.replies.map(reply => (
                  <li key={reply.id} className="reply">
                    <div className="author-info">
                      {reply.author && (
                        <>
                          <img src={reply.author.picture} alt={`${reply.author.name}'s profile`} className="author-picture" />
                          <p className="author-name">{reply.author.name}</p>
                        </>
                      )}
                    </div>
                    <p>{reply.content}</p>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={() => openReplyModal(comment)}>Reply</button>
          </div>
        ))}
      </Modal>

      {/* Reply Modal */}
      <Modal isOpen={replyModalIsOpen} onRequestClose={closeReplyModal} contentLabel="Add Reply">
        <h2>Add a Reply</h2>
        <form onSubmit={handleReplySubmit}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply here..."
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={closeReplyModal}>Cancel</button>
        </form>
      </Modal>

      {/* Replies Modal */}
      <Modal isOpen={repliesModalIsOpen} onRequestClose={closeRepliesModal} contentLabel="View Replies">
        <h2>Replies</h2>
        {selectedComment && Array.isArray(selectedCommentReplies) && selectedCommentReplies.map(reply => (
          <div key={reply.id} className="reply">
            <div className="author-info">
              {reply.author && (
                <>
                  <img src={reply.author.picture} alt={`${reply.author.name}'s profile`} className="author-picture" />
                  <p className="author-name">{reply.author.name}</p>
                </>
              )}
            </div>
            <p>{reply.content}</p>
          </div>
        ))}
        <button type="button" onClick={closeRepliesModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ForumPage;

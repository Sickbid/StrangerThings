import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Profile.css';

const COHORT_NAME = '2302-ACC-ET-WEB-PT-D';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function Profile({ token }) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setProfileData(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchProfile();
  }, [token]);

  const renderPosts = () => {
    if (!profileData.posts || profileData.posts.length === 0) {
      return <p>You have no posts yet.</p>;
    }

    return (
      <ul>
        {profileData.posts.map(post => (
          <li key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    );
  };

  if (!profileData) return <div>Loading...</div>;

  return (
      <div className="App">
        <Router>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        </Router>
      <h2>Your Profile</h2>
      <p>Username: {profileData.username}</p>
      <h3>Your Posts</h3>
      {renderPosts()}
    </div>
  );
}

export default Profile;
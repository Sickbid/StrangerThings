import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Logout from './components/Logout';
import Posts from './components/Posts';
import Profile from './components/Profile';
import React, { useState } from "react";

const COHORT_NAME = '2302-ACC-ET-WEB-PT-D';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const registerUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setToken(result.data.token);
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setToken(result.data.token);
      }
      return result;
    } catch (err) {
      console.error(err);
    }
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }
  }

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/logout">Logout</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/logout" element={<Logout setToken={setToken} />} />
            <Route path="/profile" element={<Profile token={token} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { registerUser } from './api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleRegister = async () => {
    const token = await registerUser(username, password);
    if (token) {
      setToken(token);
      localStorage.setItem('userToken', token);
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;

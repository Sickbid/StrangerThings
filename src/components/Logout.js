import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

function Logout() {
    const navigate = useNavigate();

    function handleLogout() {

function logIn(token) {
    sessionStorage.setItem('authToken', token);
}

function logOut() {
    sessionStorage.removeItem('authToken');
}

function isLoggedIn() {
    const token = sessionStorage.getItem('authToken');
    return token !== null;
}

function makeHeaders() {
    const token = sessionStorage.getItem('authToken');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
}

        sessionStorage.removeItem('authToken');
        navigate('/');
    }

    return (
        <div>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;

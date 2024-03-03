import React, { useState } from 'react';
import './Navbar.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const isHomeScreen = window.location.href.includes("/book");
const isBookScreen = window.location.href.includes("/download/");
const isDownloadScreen = window.location.href.includes("/list");
const isMainscreen= window.location.href.includes("/home")

const TopNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate =useNavigate();
  const user = JSON.parse(localStorage.getItem('currentuser'));

  const handleLogout = () => {
    localStorage.removeItem('currentuser');
    navigate('/login');
    // Implement your logout logic here
    console.log("Logout clicked");
    // For demonstration, let's hide the dropdown after logout
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (isHomeScreen || isBookScreen || isDownloadScreen || isMainscreen) {
    return (
      <nav className="top-navbar">
        <div className="navbar-heading">ELibrary</div>
        <ul className="navbar-menu">
          <li className="navbar-menu-item"><a href="/home">Home</a></li>
          <li className="navbar-menu-item"><a href="/list">Downloads</a></li>
          <li className="navbar-menu-item">
            <div className="user-icon" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faUser} />
              {showDropdown && (
                <div className="dropdown-content">
                  <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    );
  } else {
    return null;
  }
};

export default TopNavbar;

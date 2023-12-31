import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';
import '../css/header.css';
import logo from '../assets/logo.png';

const Header = () => {
  let { user, logout } = useContext(AuthContext)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isMobileMenuOpen ? 'open' : ''}`}>
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
          <img src={logo} alt="DHVSU Archives Logo" className="logo-image" />
          </Link>
          <Link to="/">
          <span className="logo-text hover:color-[#fbbf24]"><strong>REPOSITORY</strong></span>
          </Link>
        </div>
        
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <div className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </button>
      </div>
      <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">
          Home
        </Link>
        {
          user && user.is_staff === true && (
            <Link to="/upload" className="nav-link">
              Upload
            </Link>
          )
        }
        
        <Link to="/library" className="nav-link">
          Browse
        </Link>
        
        {
          user ? (
            <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <p onClick={logout} className="nav-link logout-link hover:cursor-pointer">Logout</p>
            </>
            
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )
        }
      </nav>
    </header>
  );
};

export default Header;

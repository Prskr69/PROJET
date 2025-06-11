import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <header>

      <Link to="/accueil" className="logo">Khayr El Blad</Link>
      <nav className="navbar">
        <Link to="/accueil">Accueil</Link>
        <Link to="/categories">Catégories</Link>
        <Link to="/apropos">À propos</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="icons">
        <span
          className="fas fa-user"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        ></span>
      </div>
    </header>
  );
}

export default Navbar;
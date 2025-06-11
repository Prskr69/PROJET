import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="ouverture"
      style={{
        background: `url(${process.env.PUBLIC_URL + '/ab.png'}) center/cover no-repeat`
      }}
    >
      <h1>Bienvenue sur notre site Khayr El Blad !</h1>
      <button className="btn" onClick={() => navigate('/accueil')}>
        Entrer sur le site
      </button>
    </div>
  );
}

export default Welcome;
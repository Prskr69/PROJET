import React, { useState } from 'react';
import './Don.css';

function Don() {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);
  };

  return (
    <div className="don-page">
      <div className="don-container">
        {!showMessage ? (
          <form onSubmit={handleSubmit} className="don-form">
            <h2>Faire un Don</h2>
            <input type="text" placeholder="Nom complet" required />
            <input type="email" placeholder="votre-email@exemple.com" required />
            <input type="number" placeholder="Montant du don (DH)" min="1" required />
            <input type="text" placeholder="Numéro de carte bancaire" required />
            <input type="text" placeholder="Date d'expiration (MM/AA)" required />
            <input type="text" placeholder="Code de sécurité (CVV)" required />
            <button type="submit">Donner</button>
          </form>
        ) : (
          <div className="don-message">Merci pour votre don ❤️</div>
        )}
      </div>
    </div>
  );
}

export default Don;
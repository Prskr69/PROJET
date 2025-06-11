import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Paiement.css';

const Paiement = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    region: '',
    codePostal: '',
    instructions: ''
  });

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Récupérer les informations utilisateur depuis localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      // Charger les infos utilisateur
      axios.get(`http://localhost:5000/api/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const user = response.data;
        setFormData({
          nom: user.name || '',
          email: user.email || '',
          telephone: user.phone || '',
          adresse: user.street || '',
          ville: user.city || '',
          region: user.country || '',
          codePostal: user.zip || '',
          instructions: ''
        });
      })
      .catch(error => console.log('Erreur lors du chargement des infos utilisateur:', error));
    }

    // Récupérer le panier depuis localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        alert('Vous devez être connecté pour passer une commande');
        setLoading(false);
        window.location.href = '/login';
        return;
      }

      // Préparer les données de la commande
      const orderData = {
        orderItems: cartItems.map(item => ({
          quantity: item.quantity,
          product: item._id // Assurez-vous que vos items du panier ont un productId
        })),
        shippingAddress1: formData.adresse,
        city: formData.ville,
        zip: formData.codePostal,
        country: formData.region,
        phone: formData.telephone,
        status: 'En attente',
        user: userId
      };

      // Envoyer la commande à l'API
      const response = await axios.post('http://localhost:5000/api/v1/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data) {
        alert('✅ Votre commande a été enregistrée avec succès ! Vous paierez à la livraison.');
        
        // Vider le panier après commande réussie
        localStorage.removeItem('cart');
        setCartItems([]);
        window.location.href = '/accueil';
      }

    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      alert('❌ Erreur lors de l\'enregistrement de la commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="paiement-page">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="form-column">
              <h2>📍 ADRESSE DE LIVRAISON</h2>
              
              <div className="form-group">
                <label>Nom Complet :</label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Brahim Soumia"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  placeholder="exemple@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Téléphone :</label>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="06 12 34 56 78"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Adresse :</label>
                <input
                  type="text"
                  name="adresse"
                  placeholder="Appartement - rue - quartier"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ville :</label>
                <input
                  type="text"
                  name="ville"
                  placeholder="Souk El Arbaa"
                  value={formData.ville}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Pays :</label>
                  <input
                    type="text"
                    name="region"
                    placeholder="Maroc"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group half">
                  <label>Code Postal :</label>
                  <input
                    type="text"
                    name="codePostal"
                    placeholder="20000"
                    value={formData.codePostal}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="form-column">
              <h2>💰 MODE DE PAIEMENT</h2>
              
              <div className="payment-method">
                <div className="payment-option selected">
                  <div className="payment-header">
                    <i className="fas fa-truck"></i>
                    <h3>Paiement à la livraison</h3>
                  </div>
                  <p>Vous paierez en espèces lors de la réception de votre commande.</p>
                </div>
              </div>

              <div className="delivery-info">
                <h3>📦 Informations de livraison</h3>
                <ul>
                  <li>✅ Livraison dans un délai de 2-5 jours</li>
                  <li>✅ Frais de livraison : 15 DH</li>
                  <li>✅ Paiement en espèces uniquement</li>
                  <li>✅ Vérification du produit avant paiement</li>
                </ul>
              </div>

              
            </div>
          </div>

          <div className="order-summary">
            <h3>📋 Résumé de la commande</h3>
            {cartItems.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <ul>
                {cartItems.map(item => (
                  <li key={item._id}>
                    {item.name} × {item.quantity} = {(item.price * item.quantity).toFixed(2)} DH
                  </li>
                ))}
              </ul>
            )}
            <p style={{ fontWeight: 'bold', marginTop: 10 }}>
              Total à payer : {totalPrice.toFixed(2)} DH
            </p>
            <p>⚠️ Vous confirmerez le montant total lors de la livraison</p>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            <i className="fas fa-check-circle"></i>
            {loading ? 'Enregistrement...' : 'Confirmer la commande (Paiement à la livraison)'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Paiement;
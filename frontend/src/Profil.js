// Profil.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profil.css';

function Profil() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    codepostal: '',
    adresse: '',
    pays: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  // Récupère le token et l'userId (ex: depuis localStorage)
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // à stocker au login

  useEffect(() => {
    if (!token || !userId) return;
    axios.get(`http://localhost:5000/api/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const user = res.data;
      setForm({
        nom: user.name || '',
        email: user.email || '',
        telephone: user.phone || '',
        codepostal: user.zip || '',
        adresse: user.street || '',
        pays: user.country || '',
      });
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [token, userId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      name: form.nom,
      email: form.email,
      phone: form.telephone,
      zip: form.codepostal,
      street: form.adresse,
      country: form.pays,
    };
    if (form.motdepasse) payload.password = form.motdepasse; // <-- ici

    axios.put(`http://localhost:5000/api/v1/users/${userId}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setMessage('✅ Modifications enregistrées !'))
      .catch(() => setMessage('❌ Erreur lors de la sauvegarde.'));
    setTimeout(() => setMessage(''), 4000);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <main 
      className="profil-root"
      style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '/profil.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <h1 className="profil-title">Mon Profil</h1>
      <section className="profile-info">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom complet</label>
          <input type="text" id="nom" name="nom" value={form.nom} onChange={handleChange} required />



          <label htmlFor="motdepasse">Mot de passe</label>
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <input
              type={showPwd ? 'text' : 'password'}
              id="motdepasse"
              name="motdepasse"
              value={form.motdepasse || ''}
              onChange={handleChange}
              style={{ paddingRight: 40, width: '100%' }}
            />
            <i
              className={`fa ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPwd(s => !s)}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#555'
              }}
            ></i>
          </div>
          
          <label htmlFor="email">Adresse e-mail</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="telephone">Numéro de téléphone</label>
          <input type="tel" id="telephone" name="telephone" value={form.telephone} onChange={handleChange} required />

          <label htmlFor="codepostal">Code postal</label>
          <input type="number" id="codepostal" name="codepostal" value={form.codepostal} onChange={handleChange} required />

          <label htmlFor="adresse">Adresse</label>
          <input type="text" id="adresse" name="adresse" value={form.adresse} onChange={handleChange} required />

          <label htmlFor="pays">Pays</label>
          <input type="text" id="pays" name="pays" value={form.pays} onChange={handleChange} required />

          <button type="submit">Enregistrer les modifications</button>
        </form>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = '/accueil';
          }}
        >
          Se déconnecter
        </button>
        {message && <p className="message">{message}</p>}
      </section>
    </main>
  );
}

export default Profil;
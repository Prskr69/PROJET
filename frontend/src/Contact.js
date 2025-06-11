import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Récupère les valeurs du formulaire (adapte selon tes champs)
    const nom = form.nom;
    const email = form.email;
    const contenu = form.message;

    // Envoie le message au backend
    await fetch('http://localhost:5000/api/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, contenu }),
    });

    // Optionnel : afficher un message de succès ou vider le formulaire
    alert('Votre message a bien été envoyé !');
    setForm({ nom: '', email: '', message: '' });
  };

  return (
    <div className="contact-bg">
      <div className="container">
        <div className="content">
          <div className="image-box">
            <img src={process.env.PUBLIC_URL + '/contact.jpg'} alt="Contact" />
          </div>
          <form id="contact-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="topic">Envoyez-nous un message</div>
            <div className="input-box">
              <input
                type="text"
                name="nom"
                required
                value={form.nom}
                onChange={handleChange}
              />
              <label>Entrez votre nom</label>
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <label>Entrez votre adresse e-mail</label>
            </div>
            <div className="message-box">
              <textarea
                id="message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
              />
              <label htmlFor="message">Entrez votre message</label>
            </div>
            <div className="input-box">
              <input type="submit" value="Envoyer le message" />
            </div>
          </form>
          {sent && (
            <div
              id="confirmation-message"
              style={{ color: 'green', marginTop: 20 }}
            >
              Votre message a été envoyé avec succès !
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
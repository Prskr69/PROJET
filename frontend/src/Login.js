import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    zip: '',
    city: '',
    country: ''
  });
  const [registerError, setRegisterError] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profil');
    }
  }, [navigate]);

  // Pour afficher un message lors de la création de compte
  const handleRegister = (e) => {
    e.preventDefault();
    alert("👋 Bienvenue ! Votre compte a été créé avec succès !");
    setShowRegister(false);
  };

  const token = localStorage.getItem('token');

  const handleLoginClick = () => {
    if (token) {
      // Déjà connecté, va sur le profil
      window.location.href = '/profil';
      // ou navigate('/profil') si tu utilises useNavigate
    } else {
      // Pas connecté, va sur la page login
      window.location.href = '/login';
      // ou navigate('/login')
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${process.env.PUBLIC_URL + '/the.png'}) center/cover no-repeat`
      }}
    >
      <div className="login-page">
        <div className="form">
          {/* Formulaire d'inscription */}
          {showRegister ? (
            <form className="register-form" onSubmit={async (e) => {
              e.preventDefault();
              setRegisterError('');
              try {
                const res = await fetch('http://localhost:5000/api/v1/users/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(registerData)
                });
                if (res.ok) {
                  alert("👋 Bienvenue ! Votre compte a été créé avec succès !");
                  setShowRegister(false);
                } else {
                  const data = await res.json();
                  setRegisterError(data.message || "Erreur lors de l'inscription");
                }
              } catch {
                setRegisterError("Erreur serveur");
              }
            }}>
              <input type="text" required placeholder="Nom complet"
                value={registerData.name}
                onChange={e => setRegisterData({ ...registerData, name: e.target.value })} />
              <input type="text" required placeholder="Adresse e-mail"
                value={registerData.email}
                onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
              <div style={{ position: "relative" }}>
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  required
                  placeholder="Mot de passe"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  style={{ paddingRight: 40 }}
                />
                <i
                  className={`fa ${showRegisterPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#555",
                    fontSize: 16
                  }}
                  aria-label={showRegisterPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  tabIndex={0}
                ></i>
              </div>
              <input type="tel" required placeholder="Numéro de téléphone"
                value={registerData.phone}
                onChange={e => setRegisterData({ ...registerData, phone: e.target.value })} />
              <input type="text" name="street" placeholder="Adresse" required
                value={registerData.street}
                onChange={e => setRegisterData({ ...registerData, street: e.target.value })} />
              <input type="text" name="zip" placeholder="Code postal" required
                value={registerData.zip}
                onChange={e => setRegisterData({ ...registerData, zip: e.target.value })} />
              <input type="text" name="city" placeholder="Ville" required
                value={registerData.city}
                onChange={e => setRegisterData({ ...registerData, city: e.target.value })} />
              <input type="text" name="country" placeholder="Pays" required
                value={registerData.country}
                onChange={e => setRegisterData({ ...registerData, country: e.target.value })} />
              <button type="submit">créer</button>
              {registerError && <div style={{ color: 'red' }}>{registerError}</div>}
              <p className="message">
                Déjà inscrit ?{" "}
                <span style={{ cursor: "pointer", color: "#4caf50" }} onClick={() => setShowRegister(false)}>
                  Se connecter
                </span>
              </p>
            </form>
          ) : (
            // Formulaire de connexion
            <form className="login-form" onSubmit={async (e) => {
              e.preventDefault();
              setLoginError('');
              try {
                const res = await fetch('http://localhost:5000/api/v1/users/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(loginData)
                });
                const data = await res.json();
                if (res.ok) {
                  alert('Connexion réussie !');
                  localStorage.setItem('token', data.token);
                  // Si tu veux l'id utilisateur, il faut le renvoyer dans la réponse backend !
                  localStorage.setItem('userId', data.userId);
                  // Redirige vers la page d'accueil
                  navigate('/accueil');
                } else {
                  setLoginError(data.message || "Erreur de connexion");
                }
              } catch {
                setLoginError("Erreur serveur");
              }
            }}>
              <input type="text" required placeholder="adresse e-mail"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="mot de passe"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  style={{ paddingRight: 40 }}
                />
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#555",
                    fontSize: 16
                  }}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  tabIndex={0}
                ></i>
              </div>
              <button>connexion</button>
              {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
              <p className="message">
                Pas encore inscrit ?{" "}
                <span style={{ cursor: "pointer", color: "#4caf50" }} onClick={() => setShowRegister(true)}>
                  Créer un compte
                </span>
              </p>
            </form>
          )}
        </div>
      </div>

      {!showRegister && (
        <div className="welcome-message">
          <p>Chaque connexion commence par</p>
          <p>un sourire et une tasse de thé.</p>
        </div>
      )}
      
    </div>
  );
}

export default Login;
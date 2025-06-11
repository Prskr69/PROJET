import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Accueil from './Accueil';
import Login from './Login';
import Categories from './Categories';
import Contact from './Contact';
import Apropos from './Apropos';
import Profil from './Profil';
import Paiement from './Paiement';
import Don from './Don';

function AppContent() {
  const location = useLocation();
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  
  // Déterminer si nous sommes sur des pages sans navbar
  const isWelcomePage = location.pathname === '/';
  const isPaiementPage = location.pathname === '/paiement';
  const isDonPage = location.pathname === '/don';
  
  // Afficher la navbar sauf sur Welcome, Paiement et Don
  const showNavbar = !isWelcomePage && !isPaiementPage && !isDonPage;

  useEffect(() => {
    if (showNavbar && navRef.current) {
      const updateNavHeight = () => {
        setNavHeight(navRef.current.offsetHeight);
      };
      
      // Mettre à jour la hauteur initiale
      updateNavHeight();
      
      // Ajouter un écouteur pour les redimensionnements
      window.addEventListener('resize', updateNavHeight);
      
      // Nettoyer l'écouteur
      return () => window.removeEventListener('resize', updateNavHeight);
    } else {
      setNavHeight(0); // Réinitialiser sur les pages sans navbar
    }
  }, [showNavbar, location.pathname]);

  return (
    <>
      {showNavbar && <Navbar ref={navRef} />}
      <div style={showNavbar ? { paddingTop: `${navHeight}px` } : {}}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/don" element={<Don />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/paiement" element={<Paiement />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
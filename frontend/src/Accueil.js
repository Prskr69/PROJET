import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Accueil.css';

function Accueil() {
  const navigate = useNavigate();

  return (
    <>
    
      <section
        className="intro-banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/zelij.png'})`
        }}
      >
        <div className="intro-contenu">
          <h1 className="titre-principal">🌟 Bienvenue à vous !</h1>
          <p className="texte-intro">
            Ici, chaque achat a du sens. En explorant notre boutique, vous
            soutenez non seulement les <strong>artisans locaux</strong>, mais vous
            changez aussi des vies.
          </p>
          <p className="texte-intro">
            Notre mission est simple : faire découvrir la
            <span className="highlight"> culture marocaine </span> à travers des
            produits authentiques, tout en tissant des liens de solidarité. Chaque
            geste compte. 💛
          </p>
        </div>

        <div className="participation-contenu">
          <h2>✨ Envie de participer ?</h2>
          <p>
            Découvrez nos produits et trouvez celui qui résonne avec votre cœur.
            Chaque achat est un acte de partage et de bienveillance.
          </p>
          <a
            href="#"
            className="btn"
            onClick={e => { e.preventDefault(); navigate('/categories'); }}
          >
            Découvrir les produits
          </a>
        </div>

        <div className="en-savoir-plus-contenu">
          <h2>👉 Vous voulez en savoir plus ?</h2>
          <p>
            Plongez dans notre histoire et notre impact sur la page <em>À propos</em>.
          </p>
          <a 
          href="#"
            className="btn"
            onClick={e => { e.preventDefault(); navigate('/apropos'); }}
          >
          À propos</a>
        </div>

        <div className="contact-contenu">
          <h2>📩 Une question ? Un message ?</h2>
          <p>Nous sommes à votre écoute et toujours heureux de vous répondre !</p>
          <a
            href="#"
            className="btn"
            onClick={e => { e.preventDefault(); navigate('/contact'); }}
          >
            Nous contacter
          </a>
        </div>
      </section>
    </>
  );
}

export default Accueil;
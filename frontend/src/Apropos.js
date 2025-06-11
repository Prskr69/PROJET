import React from 'react';
import './Apropos.css';

function Apropos() {

  const img = (name) => process.env.PUBLIC_URL + '/' + name;

  return (
    <div className="apropos-root">
      <h1>Culture Marocaine &amp; Solidarité</h1>

      <div className="intro">
        <p>
          Bienvenue sur notre plateforme dédiée à la richesse de la culture marocaine et à la solidarité humaine. Chaque objet ici a une histoire, chaque achat est un acte de générosité.
        </p>
        <p>
          À travers ce site, nous vous invitons à découvrir les trésors du Maroc — poterie, vêtements, huiles, artisanat… — tout en participant à une cause juste. Acheter ici, c’est aussi aider. Ensemble, rendons chaque geste d’achat utile pour les autres.
        </p>
      </div>

      <h2>But du site</h2>
      <div className="goal">
        <p>
          Ce site a pour but de valoriser le patrimoine culturel marocain tout en soutenant des projets solidaires concrets. Chaque produit vendu permet de venir en aide à des familles en difficulté, à des malades, ou à des artisans qui vivent de leur passion. C’est une passerelle entre la tradition et la générosité, entre culture et humanité.
        </p>
      </div>

      <h2>Nos catégories et leurs objectifs</h2>

      <div className="category">
        <img src={img('V1.png')} alt="Vêtements traditionnels - image 1" />
        <div className="category-content">
          <h3>1. Vêtements traditionnels</h3>
          <p>Des tenues marocaines transmises avec fierté et élégance.</p>
          <div className="arrow-text">Chaque achat soutient une association qui offre des habits aux plus démunis, avec dignité et respect.</div>
        </div>
        <img src={img('V2.png')} alt="Vêtements traditionnels - image 2" />
      </div>

      <div className="category">
        <img src={img('P1.png')} alt="Poterie traditionnelle - image 1" />
        <div className="category-content">
          <h3>2. Poterie traditionnelle</h3>
          <p>Objets en argile fabriqués à la main dans les villages marocains.</p>
          <div className="arrow-text">Les ventes servent à financer la construction de puits dans les zones rurales, pour un accès à l’eau potable durable.</div>
        </div>
        <img src={img('P2.png')} alt="Poterie traditionnelle - image 2" />
      </div>

      <div className="category">
        <img src={img('A1.png')} alt="Produits alimentaires - image 1" />
        <div className="category-content">
          <h3>3. Produits alimentaires</h3>
          <p>Les essentiels pour nourrir les cœurs et les foyers.</p>
          <div className="arrow-text">Les aliments sont livrés directement à des familles en difficulté grâce à une association engagée contre la faim.</div>
        </div>
        <img src={img('A2.png')} alt="Produits alimentaires - image 2" />
      </div>

      <div className="category">
        <img src={img('H1.png')} alt="Huiles naturelles - image 1" />
        <div className="category-content">
          <h3>4. Huiles naturelles</h3>
          <p>Huiles précieuses aux vertus ancestrales, issues du terroir marocain.</p>
          <div className="arrow-text">Ces huiles sont offertes comme aide naturelle à des malades dans le besoin.</div>
        </div>
        <img src={img('H2.png')} alt="Huiles naturelles - image 2" />
      </div>

      <div className="category">
        <img src={img('L1.png')} alt="Linge de maison et couvertures - image 1" />
        <div className="category-content">
          <h3>5. Linge et couvertures</h3>
          <p>Des tissus doux pour offrir chaleur et réconfort.</p>
          <div className="arrow-text">Vos achats permettent d’équiper des foyers démunis avec du linge propre et des couvertures.</div>
        </div>
        <img src={img('L2.png')} alt="Linge de maison et couvertures - image 2" />
      </div>

      <div className="category">
        <img src={img('C1.png')} alt="Accessoires artisanaux - image 1" />
        <div className="category-content">
          <h3>6. Accessoires artisanaux</h3>
          <p>Créations originales réalisées par des femmes marocaines.</p>
          <div className="arrow-text">Les ventes soutiennent leur autonomie financière et renforcent leur rôle dans la société.</div>
        </div>
        <img src={img('C2.png')} alt="Accessoires artisanaux - image 2" />
      </div>

      <div className="category">
        <img src={img('B1.png')} alt="Beauté et Hygiène - image 1" />
        <div className="category-content">
          <h3>7. Beauté et Hygiène</h3>
          <p>Produits naturels pour prendre soin de soi en respectant la tradition.</p>
          <div className="arrow-text">Chaque achat permet de financer des actions d’hygiène et de santé pour les populations vulnérables.</div>
        </div>
        <img src={img('B2.png')} alt="Beauté et Hygiène - image 2" />
      </div>

      <div className="category">
        <img src={img('D1.png')} alt="Dons libres - image 1" />
        <div className="category-content">
          <h3>8. Dons libres</h3>
          <p>Vous n’achetez pas ? Offrez un geste libre, mais plein de sens.</p>
          <div className="arrow-text">Ces dons soutiennent divers projets solidaires à travers le Maroc.</div>
        </div>
        <img src={img('D2.png')} alt="Dons libres - image 2" />
      </div>

      <div className="closing-text">
        Le fond clair rouge rappelle la chaleur, l’hospitalité marocaine, et invite chacun à contribuer à un Maroc solidaire et humain.
      </div>
    </div>
  );
}

export default Apropos;
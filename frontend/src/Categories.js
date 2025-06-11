import React, { useEffect, useState } from 'react';
import './Categories.css';
import { useNavigate } from 'react-router-dom';

// Utilitaire pour charger FontAwesome si besoin
const loadFontAwesome = () => {
  if (!document.getElementById('fa-css')) {
    const link = document.createElement('link');
    link.id = 'fa-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);
  }
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  // Panier et favoris
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  // Feedback "Ajouté !" sur bouton
  const [addedProductId, setAddedProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadFontAwesome();
    // Récupère les catégories
    fetch('http://localhost:5000/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
        // Pour chaque catégorie, récupère ses produits
        data.forEach(cat => {
          fetch(`http://localhost:5000/api/v1/products?categories=${cat._id}`)
            .then(res => res.json())
            .then(products => {
              setProductsByCategory(prev => ({
                ...prev,
                [cat._id]: products
              }));
            });
        });
      });
  }, []);

  // Ajout au panier
  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item._id === product._id);
      if (found) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
    setAddedProductId(product._id);
    setTimeout(() => setAddedProductId(null), 1000);
  };

  // Changer quantité panier
  const changeQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item =>
          item._id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Supprimer du panier
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  // Vider panier
  const clearCart = () => setCart([]);

  // Ajout/suppression favoris
  const toggleFavorite = (product) => {
    setFavorites(prev => {
      if (prev.find(item => item._id === product._id)) {
        return prev.filter(item => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  // Supprimer des favoris
  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item._id !== productId));
  };

  // Vider favoris
  const clearFavorites = () => setFavorites([]);

  // Total panier
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="categories-bg">
      {/* Icône favoris */}
      <div id="favorites-icon" onClick={() => setFavoritesOpen(true)}>
        <i className="fas fa-heart" data-count={favorites.length}></i>
      </div>
      {/* Sidebar favoris */}
      <div id="favorites-sidebar" className={favoritesOpen ? 'active' : ''}>
        <div className="cart-header favorites-header">
          <h3>Vos Favoris ❤️</h3>
          <button id="close-favorites" className="cart-icon" onClick={() => setFavoritesOpen(false)}>&times;</button>
        </div>
        <div className="favorites-items cart-items">
          {favorites.length === 0 ? (
            <p className="empty-favorites">Aucun favori pour le moment</p>
          ) : (
            favorites.map((item) => (
              <div className="favorite-item" key={item._id}>
                {item.image && <img src={item.image} width="50" alt={item.name} />}
                <span>{item.name}</span>
                <button className="remove-favorite" style={{color: 'red', border: 'none', background: 'none', fontSize: 18, cursor: 'pointer'}} onClick={() => removeFromFavorites(item._id)}>X</button>
              </div>
            ))
          )}
        </div>
        <button id="clear-favorites" className="cart-icon" style={{background:'#ff6b6b'}} onClick={clearFavorites}>Vider</button>
      </div>

      {/* Icône panier */}
      <div id="cart-icon" onClick={() => setCartOpen(true)}>
        <i className="fas fa-shopping-cart" data-count={cart.reduce((sum, item) => sum + item.quantity, 0)}></i>
      </div>
      {/* Sidebar panier */}
      <div id="cart-sidebar" className={cartOpen ? 'active' : ''}>
        <div className="cart-header">
          <h3>Votre Panier</h3>
          <button id="close-cart" className="cart-icon" onClick={() => setCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Votre panier est vide</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item._id}>
                {item.image && <img src={item.image} width="50" alt={item.name} />}
                <span>{item.name}</span>
                <div>
                  <button className="change-quantity" onClick={() => changeQuantity(item._id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="change-quantity" onClick={() => changeQuantity(item._id, 1)}>+</button>
                </div>
                <span>{(item.price * item.quantity).toFixed(2)} DH</span>
                <button className="remove-item" style={{color: 'red', border: 'none', background: 'none', fontSize: 18, cursor: 'pointer'}} onClick={() => removeFromCart(item._id)}>X</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">Total: <span id="cart-total">{cartTotal.toFixed(2)}</span> DH</div>
        <button id="validate-cart" className="cart-icon" onClick={() => {
          if (cart.length === 0) {
            alert('Votre panier est vide !');
            return;
          }
          navigate('/paiement');
        }}>Valider</button>
        <button id="clear-favorites" className="cart-icon" style={{background:'#ff6b6b', marginTop: 8}} onClick={clearCart}>Vider le panier</button>
      </div>

      <div className="categories-container">
        <h1>Nos Catégories Solidaires</h1>
        <h3>Pour chaque produit acheté, 10 % du prix sont reversés à une action caritative.</h3>
        {categories.map(cat => (
          <section className="category" key={cat._id}>
            <h2>
              {cat.icon ? <span>{cat.icon} </span> : null}
              {cat.name}
            </h2>
            {(productsByCategory[cat._id] || []).map(product => (
              <div className="product" key={product._id}>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={e => { e.target.src = '/logo192.png'; }}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">Prix : {product.price} DH</p>
                <span
                  className={`favori${favorites.find(f => f._id === product._id) ? ' active' : ''}`}
                  onClick={() => toggleFavorite(product)}
                  title="Ajouter/Retirer des favoris"
                >
                  <i className="fas fa-heart"></i>
                </span>
                <button
                  className="add-to-cart"
                  data-price={product.price}
                  onClick={() => addToCart(product)}
                  disabled={addedProductId === product._id}
                >
                  {addedProductId === product._id ? 'Ajouté !' : 'Acheter ce produit'}
                </button>
              </div>
            ))}
          </section>
        ))}
        {/* Section Don */}
        <section className="category">
          <h2>❤️🤝💖 Don</h2>
          <div className="product">
            <p>Contribuez sans achat, soutenez directement les causes.</p>
            <button className="btn-don" onClick={() => navigate('/don')}>Faire un Don</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Categories;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    console.log('Add to Cart clicked:', product);
    // Later: save to context/localStorage/state
  };

  return (
    <div className="products-wrapper">
      <h2 className="section-title">🐾 Our Meowlicious Meals</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id || product._id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="card-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">৳{product.price}</span>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

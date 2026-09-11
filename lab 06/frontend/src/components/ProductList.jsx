import { Link } from 'react-router-dom';

export default function ProductList({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return <p className="empty-message">No products available right now.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-content">
            <span className="product-category">{product.category}</span>
            <h3>{product.name}</h3>
            <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <p className="product-description">{product.description}</p>
          </div>

          <div className="product-actions">
            <Link to={`/products/${product.id}`} className="secondary-button">
              View Details
            </Link>
            <button type="button" onClick={() => onAddToCart(product)} className="primary-button">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

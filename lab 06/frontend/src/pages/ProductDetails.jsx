import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api';

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProductById(id);

        if (isMounted) {
          setProduct(data);
          setQuantity(1);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError.message || 'Product not found.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const requestedQuantity = Number(quantity);

    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      setMessage('Quantity must be at least 1.');
      return;
    }

    if (requestedQuantity > product.stock) {
      setMessage(`Insufficient stock. Only ${product.stock} item(s) are available.`);
      return;
    }

    const result = onAddToCart(product, requestedQuantity);
    setMessage(result.message);
  };

  if (loading) return <div className="info-box">Loading product details...</div>;
  if (error) return <div className="error-box">{error}</div>;
  if (!product) return <div className="error-box">Product not found.</div>;

  return (
    <div className="product-details-page">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="product-detail-card">
        <div className="product-detail-image">
          <span>{product.category}</span>
        </div>

        <div className="product-detail-content">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.name}</h2>
          <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="product-stock">Stock: {product.stock}</p>
          <p className="product-description">{product.description}</p>

          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {message && <div className="status-message">{message}</div>}

          <button type="button" className="primary-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

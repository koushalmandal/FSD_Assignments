import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../api';

export default function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProducts();

        if (isMounted) {
          setProducts(data);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError.message || 'Unable to load products. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddToCart = (product) => {
    const result = onAddToCart(product, 1);
    if (result.success) {
      setStatusMessage(result.message);
    } else {
      setStatusMessage(result.message);
    }
  };

  return (
    <div className="products-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Explore collection</p>
          <h2>Our Products</h2>
        </div>
      </div>

      {statusMessage && <div className="status-message">{statusMessage}</div>}

      {loading && <div className="info-box">Loading products...</div>}
      {error && <div className="error-box">{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div className="empty-message">No products available right now.</div>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductList products={products} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
}

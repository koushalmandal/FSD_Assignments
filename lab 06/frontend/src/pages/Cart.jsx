import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { placeOrder } from '../api';

export default function Cart({ cart, updateCartQuantity, removeFromCart, clearCart, isAuthenticated, token }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const handlePlaceOrder = async () => {
    setError('');
    setSuccess('');

    if (!isAuthenticated) {
      setError('Please login before placing an order.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    for (const item of cart) {
      if (item.quantity < 1 || item.quantity > item.stock) {
        setError(`Invalid quantity for ${item.name}. Please check stock.`);
        return;
      }
    }

    try {
      setSubmitting(true);
      const payload = {
        cartItems: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      await placeOrder(payload.cartItems, token);
      setSuccess('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (apiError) {
      setError(apiError.message || 'Unable to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart-box">
        <h2>Your cart is empty.</h2>
        <Link to="/products" className="primary-button">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your selection</p>
          <h2>Shopping Cart</h2>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}
      {success && <div className="success-box">{success}</div>}

      <div className="cart-layout">
        <div className="cart-items-list">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateCartQuantity}
              removeItem={removeFromCart}
            />
          ))}
        </div>

        <aside className="checkout-panel">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
          </div>

          {!isAuthenticated && (
            <div className="login-required-box">
              <p>Please login before placing an order.</p>
              <Link to="/login" className="primary-button">
                Login
              </Link>
            </div>
          )}

          <button
            type="button"
            className="primary-button full-width"
            onClick={handlePlaceOrder}
            disabled={submitting}
          >
            {submitting ? 'Processing...' : 'Place Order'}
          </button>
        </aside>
      </div>
    </div>
  );
}

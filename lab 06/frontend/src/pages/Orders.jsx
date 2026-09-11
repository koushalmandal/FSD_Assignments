import { useEffect, useState } from 'react';
import { fetchOrders } from '../api';

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setOrders([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchOrders(token);

        if (isMounted) {
          setOrders(data);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError.message || 'Unable to load orders.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (loading) return <div className="info-box">Loading your orders...</div>;
  if (error) return <div className="error-box">{error}</div>;

  if (orders.length === 0) {
    return (
      <div className="empty-message">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">My purchases</p>
          <h2>Order History</h2>
        </div>
      </div>

      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <span className="order-status">{order.status}</span>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.productId}`} className="order-item-row">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price.toLocaleString('en-IN')} each</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <strong>Total: ₹{order.total.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

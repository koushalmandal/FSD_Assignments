import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Smart shopping starts here</p>
          <h1>Find the latest gadgets and everyday essentials.</h1>
          <p>
            Explore premium electronics, accessories, and personal tech products designed to make your life easier.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="primary-button">
              Shop Now
            </Link>
            <Link to="/login" className="secondary-button">
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Quick and reliable shipping for all your orders.</p>
        </div>
        <div className="feature-card">
          <h3>Verified Products</h3>
          <p>Only genuine products with quality assurance.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Checkout</h3>
          <p>Simple account login and secure order placement.</p>
        </div>
      </section>
    </div>
  );
}

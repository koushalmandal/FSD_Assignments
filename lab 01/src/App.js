import { useState } from 'react';
import './App.css';

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Thank you, ${formData.name || 'visitor'}! We received your message.`);
    setFormData({ name: '', email: '' });
  };

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="brand">Responsive Lab</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="about">
          <div className="hero-copy">
            <span className="eyebrow">Web Development Practice</span>
            <h1>Build responsive pages with modern HTML, CSS, and React</h1>
            <p>
              This sample app demonstrates responsive layout, accessible styles, and an
              interactive form using React state.
            </p>
            <div className="hero-actions">
              <button onClick={() => setShowDetails((current) => !current)}>
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
              <a href="#contact" className="secondary-button">
                Contact Us
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="feature-card">
              <h2>Responsive layout</h2>
              <p>Resize the browser to see the page adjust for desktop, tablet, and mobile.</p>
            </div>
          </div>
        </section>

        {showDetails && (
          <section className="details-panel">
            <h2>Interactive learning experience</h2>
            <p>
              The page includes a button toggle, responsive grid, and a contact form to
              practice modern front-end development techniques.
            </p>
          </section>
        )}

        <section className="features" id="features">
          <article className="feature">
            <h3>Responsive design</h3>
            <p>Flexible layout and typography that adapts to different screen sizes.</p>
          </article>
          <article className="feature">
            <h3>Modern styling</h3>
            <p>Clean color palette, contrast-safe buttons, and spacing for readability.</p>
          </article>
          <article className="feature">
            <h3>Browser-based interaction</h3>
            <p>React state enables interactivity without page reloads.</p>
          </article>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy">
            <h2>Get in touch</h2>
            <p>Fill out the form to send a quick message and practice form interaction.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                placeholder="you@example.com"
              />
            </label>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>Designed for responsive web development practice.</p>
      </footer>
    </div>
  );
}

export default App;

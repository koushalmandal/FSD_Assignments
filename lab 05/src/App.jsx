import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import "./App.css";

/* =========================
   PRODUCTS DATA
========================= */

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 499,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Comfortable cotton t-shirt for everyday wear.",
  },
  {
    id: 2,
    name: "Running Sneakers",
    price: 1499,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Lightweight sneakers designed for comfortable walking and running.",
  },
  {
    id: 3,
    name: "Travel Backpack",
    price: 899,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description: "Spacious backpack suitable for college and travel.",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 1999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Wireless headphones with comfortable ear cushions.",
  },
  {
    id: 5,
    name: "Classic Watch",
    price: 2499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    description: "Elegant watch suitable for casual and formal occasions.",
  },
  {
    id: 6,
    name: "Comfort Hoodie",
    price: 999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    description: "Warm and comfortable hoodie for everyday use.",
  },
];


/* =========================
   HEADER
========================= */

function Header({ cart }) {
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">

      <Link to="/" className="logo">
        ShopEasy
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart ({cartCount})
        </Link>
      </nav>

    </header>
  );
}


/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <footer className="footer">

      <h2>ShopEasy</h2>

      <p>
        Your simple online shopping destination.
      </p>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p className="copyright">
        © 2026 ShopEasy. All rights reserved.
      </p>

    </footer>
  );
}


/* =========================
   PRODUCT CARD
========================= */

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">

        <h3>{product.name}</h3>

        <p className="category">
          {product.category}
        </p>

        <h4>₹{product.price}</h4>

        <div className="product-buttons">

          <button
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            View Details
          </button>

          <button
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}


/* =========================
   HOME PAGE
========================= */

function Home({ addToCart }) {
  return (
    <div>

      <section className="hero">

        <h1>Welcome to ShopEasy</h1>

        <p>
          Find great products at affordable prices.
        </p>

        <Link
          to="/products"
          className="shop-button"
        >
          Shop Now
        </Link>

      </section>


      <section className="page-section">

        <h2>Featured Products</h2>

        <div className="products-grid">

          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}

        </div>

      </section>

    </div>
  );
}


/* =========================
   PRODUCTS PAGE
========================= */

function Products({ addToCart }) {
  return (
    <div className="page-section">

      <h1>Our Products</h1>

      <p className="page-description">
        Explore our collection of products.
      </p>

      <div className="products-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}

      </div>

    </div>
  );
}


/* =========================
   PRODUCT DETAILS
========================= */

function ProductDetails({ addToCart }) {

  const { id } = useParams();

  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="page-section">
        <h1>Product not found</h1>

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="details-info">

        <p className="category">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p>
          {product.description}
        </p>

        <button
          className="add-button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <button
          className="back-button"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>

      </div>

    </div>
  );
}


/* =========================
   CART PAGE
========================= */

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="empty-cart">

        <h1>Your Cart is Empty</h1>

        <p>Add some products to your cart.</p>

        <Link
          to="/products"
          className="shop-button"
        >
          Start Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="page-section">

      <h1>Your Cart</h1>

      <div className="cart-container">

        {cart.map((item) => (

          <div
            className="cart-item"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-info">

              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <div className="quantity">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

              </div>

              <button
                className="remove-button"
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>


      <div className="cart-total">

        <h2>
          Total: ₹{total}
        </h2>

        <button
          onClick={() =>
            alert("Checkout feature coming soon!")
          }
        >
          Checkout
        </button>

      </div>

    </div>
  );
}


/* =========================
   ABOUT PAGE
========================= */

function About() {
  return (
    <div className="simple-page">

      <h1>About ShopEasy</h1>

      <p>
        ShopEasy is a simple online shopping application
        created using React.
      </p>

      <p>
        This project demonstrates React routing,
        components, props, state management and
        event handling.
      </p>

    </div>
  );
}


/* =========================
   CONTACT PAGE
========================= */

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    setShowToast(true);

    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="contact-page">

      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        ></textarea>

        <button type="submit">
          Send Message
        </button>

      </form>


      {showToast && (
        <div className="toast">
          ✓ Message sent successfully!
        </div>
      )}

    </div>
  );
}


/* =========================
   MAIN APP
========================= */

function App() {

  const [cart, setCart] = useState([]);


  /* ADD TO CART */

  const addToCart = (product) => {

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) => item.id === product.id
        );

      if (existingProduct) {

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };


  /* REMOVE */

  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };


  /* INCREASE */

  const increaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };


  /* DECREASE */

  const decreaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


  return (
    <BrowserRouter>

      <Header cart={cart} />

      <main>

        <Routes>

          <Route
            path="/"
            element={
              <Home addToCart={addToCart} />
            }
          />

          <Route
            path="/products"
            element={
              <Products addToCart={addToCart} />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            }
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Routes>

      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
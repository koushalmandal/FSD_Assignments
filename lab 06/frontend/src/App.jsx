import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('miniCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('miniAuth');
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  useEffect(() => {
    localStorage.setItem('miniCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('miniAuth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('miniAuth');
    }
  }, [auth]);

  const addToCart = (product, quantity = 1) => {
    const selectedQty = Number(quantity);

    if (!product || selectedQty < 1) {
      return { success: false, message: 'Invalid quantity selected.' };
    }

    if (product.stock < selectedQty) {
      return {
        success: false,
        message: `Insufficient stock. Only ${product.stock} item(s) are available.`
      };
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedQty = existingItem.quantity + selectedQty;

        if (updatedQty > product.stock) {
          return currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: product.stock }
              : item
          );
        }

        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: updatedQty }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: selectedQty }];
    });

    return { success: true, message: `${product.name} added to cart.` };
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== productId) return item;

          const safeQty = Math.min(Math.max(newQuantity, 1), item.stock);
          return { ...item, quantity: safeQty };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const logout = () => {
    setAuth(null);
    setCart([]);
  };

  return (
    <div className="app-shell">
      <Navbar cartCount={cart.reduce((total, item) => total + item.quantity, 0)} auth={auth} logout={logout} />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Products cart={cart} onAddToCart={addToCart} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetails onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                isAuthenticated={Boolean(auth)}
                token={auth?.token}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isAuthenticated={Boolean(auth)}>
                <Orders token={auth?.token} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<Login setAuth={setAuth} />}
          />
          <Route
            path="/account"
            element={<Account auth={auth} logout={logout} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

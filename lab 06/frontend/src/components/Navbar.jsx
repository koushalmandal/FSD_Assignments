import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ cartCount, auth, logout }) {
  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active-link' : 'nav-link';

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand-name">
          MiniCart
        </Link>

        <nav className="nav-menu">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/orders" className={navLinkClass}>
            Orders
          </NavLink>

          {auth ? (
            <>
              <NavLink to="/account" className={navLinkClass}>
                Account
              </NavLink>
              <button type="button" className="logout-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

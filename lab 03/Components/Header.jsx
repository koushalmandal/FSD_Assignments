import "./Header.css";

function Header() {
  return (
    <header className="header">

      <div className="logo">
        MyWebsite
      </div>

      <nav className="navbar">

        <a href="#">Home</a>

        <a href="#">About</a>

        <a href="#">Services</a>

        <a href="#">Products</a>

        <a href="#">Contact</a>

      </nav>

      <button className="login-btn">
        Login
      </button>

    </header>
  );
}

export default Header;
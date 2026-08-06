import "./Footer.css";

function Footer() {
  return (

    <footer className="footer">

      <div className="footer-top">

        <div>
          <h3>Company</h3>
          <p>About</p>
          <p>Careers</p>
          <p>Blog</p>
        </div>

        <div>
          <h3>Support</h3>
          <p>Help Center</p>
          <p>Privacy Policy</p>
          <p>Terms</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>support@mywebsite.com</p>
          <p>+91 9876543210</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 MyWebsite. All Rights Reserved.
      </p>

    </footer>

  );
}

export default Footer;
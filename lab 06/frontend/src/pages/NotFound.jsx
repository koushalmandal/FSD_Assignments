import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="primary-button">
        Go Home
      </Link>
    </div>
  );
}

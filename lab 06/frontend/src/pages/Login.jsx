import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../api';

export default function Login({ setAuth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/products';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      return 'Email is required.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    if (!formData.password) {
      return 'Password is required.';
    }

    if (formData.password.length < 4) {
      return 'Password must be at least 4 characters long.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationMessage = validateForm();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const result = await loginUser(formData.email, formData.password);

      const authData = {
        token: result.token,
        user: result.user
      };

      setAuth(authData);
      navigate(from, { replace: true });
    } catch (apiError) {
      setError(apiError.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </label>

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <p>Demo login:</p>
          <p>Email: student@example.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}

import { Navigate } from 'react-router-dom';

export default function Account({ auth, logout }) {
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="account-page">
      <div className="auth-card">
        <h2>Account</h2>
        <p><strong>Name:</strong> {auth.user?.name}</p>
        <p><strong>Email:</strong> {auth.user?.email}</p>
        <p><strong>Login Status:</strong> Logged In</p>

        <button type="button" className="primary-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

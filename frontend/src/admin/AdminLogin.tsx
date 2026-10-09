import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useTheme } from '../hooks/useTheme';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@priya.dev');
  const [password, setPassword] = useState('Admin@12345');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await authService.login({ email, password });

      if (res.data.success && res.data.token) {
        localStorage.setItem('priya_portfolio_token', res.data.token);
        if (res.data.user) {
          localStorage.setItem('priya_portfolio_user', JSON.stringify(res.data.user));
        }
        navigate('/admin/dashboard');
      } else {
        setError(res.data.message || 'Login failed. Please verify credentials.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Login failed. Ensure backend server is running.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center py-5 bg-body-tertiary">
      {/* Top Bar with Home & Theme */}
      <div className="container position-absolute top-0 start-50 translate-middle-x py-3 d-flex justify-content-between align-items-center">
        <Link to="/" className="btn btn-outline-secondary btn-sm rounded-pill d-inline-flex align-items-center gap-1">
          <i className="bi bi-arrow-left"></i>
          <span>Return to Public Website</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '36px', height: '36px' }}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <i className="bi bi-sun-fill text-warning"></i> : <i className="bi bi-moon-stars-fill text-primary"></i>}
        </button>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5 col-xl-4">
            <div className="card portfolio-card shadow-lg p-4 p-md-5 border-0">
              {/* Header Icon */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                  style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)' }}
                >
                  <i className="bi bi-shield-lock-fill fs-3"></i>
                </div>
                <h3 className="fw-bold mb-1">Admin Portal</h3>
                <p className="text-muted small">Priya P Full-Stack Dynamic CMS</p>
              </div>

              {/* Error feedback */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 small mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Admin Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-body">
                      <i className="bi bi-envelope text-muted"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control bg-body"
                      required
                      placeholder="admin@priya.dev"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold small">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-body">
                      <i className="bi bi-key text-muted"></i>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control bg-body"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary-gradient w-100 py-2 rounded-pill fw-semibold mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right"></i>
                      <span>Sign In to Dashboard</span>
                    </>
                  )}
                </button>
              </form>

              {/* Default Credentials Helper */}
              <div className="mt-3 p-3 rounded-3 bg-body-tertiary border text-center small">
                <span className="text-muted d-block mb-1">Seeded Administrator Credentials:</span>
                <code className="text-primary d-block fw-semibold">admin@priya.dev</code>
                <code className="text-muted d-block">Admin@12345</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

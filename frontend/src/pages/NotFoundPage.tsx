import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center p-4 bg-body-tertiary">
      <div className="display-1 fw-bold gradient-text mb-2">404</div>
      <h2 className="fw-bold mb-3">Page Not Found</h2>
      <p className="text-body-secondary mb-4" style={{ maxWidth: '480px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary-gradient rounded-pill px-4 py-2">
        <i className="bi bi-house-door-fill me-2"></i>
        Return to Portfolio
      </Link>
    </div>
  );
};
